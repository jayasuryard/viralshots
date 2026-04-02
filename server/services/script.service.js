const Groq = require('groq-sdk');
const logger = require('../config/logger');
const { VIDEO_LENGTHS } = require('../utils/constants');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function generateScript(screenshotsData, url, videoLength = 'medium') {
  logger.info(`[Script] Generating ${videoLength} script for ${url}`);
  
  const lengthConfig = VIDEO_LENGTHS[videoLength] || VIDEO_LENGTHS.medium;
  const { screenshots, count } = screenshotsData;
  
  const prompt = `You are a viral video script writer specialized in creating engaging SaaS demo videos.

Generate a scene-by-scene JSON script for a ${videoLength} video (approximately ${lengthConfig.duration} seconds).

INPUT:
- URL: ${url}
- Number of screenshots captured: ${count}
- Available scene images: ${screenshots.map((s, i) => `scene_${i + 1}.png`).join(', ')}

OUTPUT FORMAT (JSON only, no markdown):
{
  "hook": "Compelling 3-5 word hook that grabs attention",
  "scenes": [
    {
      "id": 1,
      "screenshot": "scene_1.png",
      "duration": 4,
      "voiceover": "Write conversational, engaging voiceover text (15-25 words)",
      "animation": "zoomIn",
      "textOverlay": "Short impactful text (2-5 words)",
      "textPosition": "center"
    }
  ],
  "totalDuration": ${lengthConfig.duration}
}

RULES:
1. First scene MUST have a strong hook in the voiceover (question or bold statement)
2. Use ${Math.min(count, Math.ceil(lengthConfig.duration / lengthConfig.sceneDuration))} scenes
3. Each scene: ${lengthConfig.sceneDuration} seconds
4. Last scene MUST have a clear CTA in voiceover
5. Voiceover: Conversational, benefit-focused, not salesy
6. Text overlays: Maximum 5 words, key phrases only
7. Animations: Use variety (zoomIn, zoomOut, panLeft, panRight, fadeIn)
8. Text positions: center, top, or bottom
9. Make it feel native to social media (LinkedIn/Twitter)
10. Focus on solving problems, not just features

Generate the script now:`;

  try {
    const response = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [
        {
          role: 'system',
          content: 'You are an expert viral video script writer. Return ONLY valid JSON, no markdown or explanations.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
      response_format: { type: 'json_object' },
    });
    
    const scriptText = response.choices[0].message.content;
    const script = JSON.parse(scriptText);
    
    // Validate script structure
    if (!script.scenes || !Array.isArray(script.scenes)) {
      throw new Error('Invalid script structure');
    }
    
    logger.info(`[Script] Generated script with ${script.scenes.length} scenes`);
    
    return script;
    
  } catch (error) {
    logger.error('[Script] Error generating script:', error);
    throw new Error(`Failed to generate script: ${error.message}`);
  }
}

module.exports = { generateScript };
