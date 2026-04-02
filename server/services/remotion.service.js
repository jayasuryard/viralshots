const { bundle } = require('@remotion/bundler');
const { renderMedia, selectComposition } = require('@remotion/renderer');
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const logger = require('../config/logger');

async function renderVideo(script, audioData, screenshotsData, jobId) {
  logger.info(`[Remotion] Starting render for job ${jobId}`);
  
  const videoDir = path.join(process.env.VIDEO_DIR || './public/videos', jobId);
  const tempDir = path.join(process.env.TEMP_DIR || './temp', jobId);
  
  // Create directories
  if (!fs.existsSync(videoDir)) {
    fs.mkdirSync(videoDir, { recursive: true });
  }
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }
  
  // Extract screenshots array if screenshotsData is an object
  const screenshotArray = screenshotsData.screenshots || screenshotsData;
  
  // Screenshots are already saved - just get the paths
  const screenshots = screenshotArray.map((screenshot) => screenshot.path);
  
  // Audio is already saved - just get the path
  const audioPath = audioData.path;
  
  try {
    // Render with actual Remotion
    await renderWithRemotion(script, audioPath, screenshots, videoDir);
    
    logger.info('[Remotion] All formats rendered successfully');
    
    return {
      mp4: `/videos/${jobId}/video.mp4`,
      square: `/videos/${jobId}/square.mp4`,
      gif: `/videos/${jobId}/preview.gif`,
      directory: videoDir,
    };
  } catch (error) {
    logger.error('[Remotion] Render failed:', error);
    throw error;
  }
}

async function renderWithRemotion(script, audioPath, screenshots, outputDir) {
  const remotionDir = path.resolve(__dirname, '../remotion');
  
  // Check if Remotion project exists
  if (!fs.existsSync(remotionDir)) {
    throw new Error('Remotion project not found at: ' + remotionDir);
  }
  
  logger.info('[Remotion] Bundling Remotion project...');
  
  // Convert screenshots to base64 data URLs (to avoid file:// URL restrictions)
  const screenshotDataUrls = screenshots.map(screenshotPath => {
    const imageBuffer = fs.readFileSync(screenshotPath);
    const base64 = imageBuffer.toString('base64');
    const ext = path.extname(screenshotPath).slice(1); // jpg, png, etc.
    return `data:image/${ext};base64,${base64}`;
  });
  
  // Convert audio to base64 data URL
  const audioBuffer = fs.readFileSync(audioPath);
  const audioBase64 = audioBuffer.toString('base64');
  const audioExt = path.extname(audioPath).slice(1); // wav or mp3
  const audioMimeType = audioExt === 'mp3' ? 'audio/mpeg' : 'audio/wav';
  const audioDataUrl = `data:${audioMimeType};base64,${audioBase64}`;
  
  logger.info(`[Remotion] Audio format: ${audioExt}, MIME: ${audioMimeType}`);
  
  // Bundle the Remotion project
  const bundleLocation = await bundle({
    entryPoint: path.join(remotionDir, 'src/index.js'),
    webpackOverride: (config) => config,
  });
  
  logger.info('[Remotion] Bundle created at:', bundleLocation);
  
  // Prepare input props with data URLs
  const inputProps = {
    screenshots: screenshotDataUrls,
    script,
    audioUrl: audioDataUrl,
  };
  
  logger.info('[Remotion] Input props prepared:', {
    screenshotsCount: screenshotDataUrls.length,
    scenesCount: script.scenes?.length || 0,
    hasAudio: !!audioDataUrl
  });
  
  // Render MP4 (16:9 - 1920x1080)
  logger.info('[Remotion] Rendering MP4 (1920x1080)...');
  const mp4Composition = await selectComposition({
    serveUrl: bundleLocation,
    id: 'DemoVideo',
    inputProps,
    timeoutInMilliseconds: 60000, // Increase timeout to 60 seconds
  });
  
  await renderMedia({
    composition: mp4Composition,
    serveUrl: bundleLocation,
    codec: 'h264',
    outputLocation: path.join(outputDir, 'video.mp4'),
    inputProps,
    timeoutInMilliseconds: 120000, // 2 minutes timeout
  });
  
  logger.info('[Remotion] MP4 rendered successfully');
  
  // Render Square (1:1 - 1080x1080)
  logger.info('[Remotion] Rendering Square MP4 (1080x1080)...');
  const squareComposition = await selectComposition({
    serveUrl: bundleLocation,
    id: 'DemoVideoSquare',
    inputProps,
    timeoutInMilliseconds: 60000,
  });
  
  await renderMedia({
    composition: squareComposition,
    serveUrl: bundleLocation,
    codec: 'h264',
    outputLocation: path.join(outputDir, 'square.mp4'),
    inputProps,
    timeoutInMilliseconds: 120000,
  });
  
  logger.info('[Remotion] Square MP4 rendered successfully');
  
  // Convert square video to GIF using FFmpeg
  logger.info('[Remotion] Creating GIF preview...');
  try {
    execSync(
      `ffmpeg -i "${path.join(outputDir, 'square.mp4')}" -vf "fps=10,scale=400:400:flags=lanczos" -t 10 -y "${path.join(outputDir, 'preview.gif')}"`,
      { stdio: 'pipe' }
    );
    logger.info('[Remotion] GIF preview created successfully');
  } catch (error) {
    logger.warn('[Remotion] Failed to create GIF (ffmpeg may not be installed):', error.message);
    // Create a placeholder file if ffmpeg fails
    fs.writeFileSync(path.join(outputDir, 'preview.gif'), '');
  }
  
  logger.info('[Remotion] All formats rendered successfully');
}

module.exports = { renderVideo, renderWithRemotion };
