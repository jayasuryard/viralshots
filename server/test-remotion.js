const { renderVideo } = require('./services/remotion.service');
const fs = require('fs');
const path = require('path');

async function testRemotion() {
  console.log('Testing Remotion setup...');
  
  // Create test data
  const testScript = {
    title: 'Test Demo Video',
    scenes: [
      {
        text: 'Welcome to ViralShots',
        narration: 'Welcome to ViralShots, the easiest way to create demo videos.',
        animation: 'fadeIn',
        textPosition: 'bottom'
      },
      {
        text: 'Create stunning videos in seconds',
        narration: 'Just paste your website URL and we will handle the rest.',
        animation: 'zoomIn',
        textPosition: 'center'
      },
      {
        text: 'Share anywhere',
        narration: 'Export to MP4, square format, or GIF and share on social media.',
        animation: 'panRight',
        textPosition: 'bottom'
      }
    ]
  };
  
  // Create dummy screenshot (1920x1080 black image)
  const createDummyImage = () => {
    // Simple BMP header for a black 1920x1080 image (very basic)
    const width = 1920;
    const height = 1080;
    const buffer = Buffer.alloc(54 + width * height * 3);
    
    // BMP header
    buffer.write('BM', 0); // Signature
    buffer.writeUInt32LE(buffer.length, 2); // File size
    buffer.writeUInt32LE(54, 10); // Pixel data offset
    buffer.writeUInt32LE(40, 14); // Header size
    buffer.writeInt32LE(width, 18); // Width
    buffer.writeInt32LE(height, 22); // Height
    buffer.writeUInt16LE(1, 26); // Planes
    buffer.writeUInt16LE(24, 28); // Bits per pixel
    
    return buffer;
  };
  
  const screenshotsData = [
    createDummyImage(),
    createDummyImage(),
    createDummyImage()
  ];
  
  // Create dummy audio (silent MP3 header - minimal valid MP3)
  const audioData = Buffer.from([
    0xFF, 0xFB, 0x90, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
  ]);
  
  const jobId = 'test-' + Date.now();
  
  try {
    const result = await renderVideo(testScript, audioData, screenshotsData, jobId);
    console.log('✅ Remotion test successful!');
    console.log('Generated videos:', result);
    
    // Verify files exist
    const videoDir = path.join(process.env.VIDEO_DIR || './public/videos', jobId);
    console.log('\nGenerated files:');
    console.log('- MP4:', fs.existsSync(path.join(videoDir, 'video.mp4')) ? '✅' : '❌');
    console.log('- Square:', fs.existsSync(path.join(videoDir, 'square.mp4')) ? '✅' : '❌');
    console.log('- GIF:', fs.existsSync(path.join(videoDir, 'preview.gif')) ? '✅' : '❌');
    
  } catch (error) {
    console.error('❌ Remotion test failed:', error);
    process.exit(1);
  }
}

testRemotion();
