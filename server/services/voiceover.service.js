const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');
const logger = require('../config/logger');

const execAsync = promisify(exec);

// TTS Provider: Groq Orpheus (Premium - requires API key)
async function generateWithGroq(fullScript, audioPath) {
  logger.info('[Voiceover] Using Groq Orpheus TTS');
  
  const response = await fetch('https://api.groq.com/openai/v1/audio/speech', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'canopylabs/orpheus-v1-english',
      voice: 'troy',
      input: fullScript,
      response_format: 'wav'
    })
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Groq API error: ${response.status} ${response.statusText} - ${errorText}`);
  }
  
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  await fs.promises.writeFile(audioPath, buffer);
}

// TTS Provider: Edge TTS (Free - Microsoft Edge TTS)
async function generateWithEdgeTTS(fullScript, audioPath) {
  logger.info('[Voiceover] Using Edge TTS (Free)');
  
  // Escape single quotes in the text
  const escapedText = fullScript.replace(/'/g, "'\\''");
  
  // Use edge-tts CLI - will use system PATH or fallback to common locations
  const voice = 'en-US-GuyNeural'; // Male voice, can also use en-US-JennyNeural for female
  const command = `edge-tts --text '${escapedText}' --voice ${voice} --write-media "${audioPath}"`;
  
  await execAsync(command);
}

// TTS Provider: Google TTS (Free - gTTS)
async function generateWithGTTS(fullScript, audioPath) {
  logger.info('[Voiceover] Using Google TTS (Free)');
  
  const gTTS = require('gtts');
  
  return new Promise((resolve, reject) => {
    const gtts = new gTTS(fullScript, 'en');
    const mp3Path = audioPath.replace('.wav', '.mp3');
    
    gtts.save(mp3Path, async (err) => {
      if (err) {
        reject(err);
        return;
      }
      
      // Try to convert MP3 to WAV using ffmpeg
      try {
        await execAsync(`ffmpeg -i "${mp3Path}" -acodec pcm_s16le -ar 44100 "${audioPath}"`);
        fs.unlinkSync(mp3Path); // Clean up MP3
        resolve();
      } catch (error) {
        // If ffmpeg not available, just rename to .mp3 and use it
        logger.warn('[Voiceover] ffmpeg not available, using MP3 format directly');
        const finalMp3Path = audioPath.replace('.wav', '.mp3');
        if (mp3Path !== finalMp3Path) {
          fs.renameSync(mp3Path, finalMp3Path);
        }
        resolve();
      }
    });
  });
}

async function generateVoiceover(script, jobId) {
  // Combine all scene voiceovers with pauses
  const fullScript = script.scenes
    .map((scene) => scene.voiceover)
    .join(' ... ');
  
  const audioDir = path.join(process.env.AUDIO_DIR || './temp/audio', jobId);
  
  // Create directory
  if (!fs.existsSync(audioDir)) {
    fs.mkdirSync(audioDir, { recursive: true });
  }
  
  const audioPath = path.join(audioDir, 'voiceover.wav');
  
  // Determine TTS provider from environment variable
  const ttsProvider = process.env.TTS_PROVIDER || 'edge'; // Options: groq, edge, gtts
  
  logger.info(`[Voiceover] Generating audio for job ${jobId} using ${ttsProvider.toUpperCase()}`);
  logger.info(`[Voiceover] Text: ${fullScript.substring(0, 100)}...`);
  
  try {
    // Try providers in order of preference
    if (ttsProvider === 'groq' && process.env.GROQ_API_KEY) {
      await generateWithGroq(fullScript, audioPath);
    } else if (ttsProvider === 'edge') {
      await generateWithEdgeTTS(fullScript, audioPath);
    } else if (ttsProvider === 'gtts') {
      await generateWithGTTS(fullScript, audioPath);
    } else {
      // Fallback chain: edge -> gtts
      try {
        logger.warn('[Voiceover] Primary provider unavailable, trying Edge TTS');
        await generateWithEdgeTTS(fullScript, audioPath);
      } catch (edgeError) {
        logger.warn('[Voiceover] Edge TTS failed, falling back to Google TTS');
        await generateWithGTTS(fullScript, audioPath);
      }
    }
    
    // Check if file was created (might be .wav or .mp3)
    let finalAudioPath = audioPath;
    if (!fs.existsSync(audioPath)) {
      const mp3Path = audioPath.replace('.wav', '.mp3');
      if (fs.existsSync(mp3Path)) {
        finalAudioPath = mp3Path;
      }
    }
    
    logger.info(`[Voiceover] Audio saved to ${finalAudioPath}`);
    
    const relativePath = finalAudioPath.replace(process.cwd() + '/', '');
    
    return {
      path: finalAudioPath,
      relativePath: relativePath,
      text: fullScript,
    };
    
  } catch (error) {
    logger.error('[Voiceover] Error generating audio:', error.message);
    logger.error('[Voiceover] Error details:', error);
    throw new Error(`Failed to generate voiceover: ${error.message}`);
  }
}

module.exports = { generateVoiceover };
