# Remotion Video Rendering

## Status

✅ Remotion project structure is complete and functional
✅ Video compositions with animations are implemented
✅ Base64 image encoding working correctly
✅ Bundling and composition selection successful

## Components Implemented

1. **DemoVideo.jsx** - Main composition with scene sequencing
2. **Scene.jsx** - Individual scene with animations (zoomIn, zoomOut, panLeft, panRight, fadeIn)
3. **TextOverlay.jsx** - Animated text overlays with positioning
4. **Root.jsx** - Remotion root with two compositions (16:9 and 1:1)

## System Requirements

⚠️ **IMPORTANT**: Remotion v4 requires macOS 15.0 (Sequoia) or newer for the bundled FFmpeg binaries.

Current system: **macOS 13 (Ventura)**
Required: **macOS 15.0+ (Sequoia)**

## Error Details

The bundled `@remotion/compositor-darwin-x64` package includes FFmpeg/ffprobe binaries that are compiled for macOS 15.0+. When running on macOS 13, you'll see:

```
dyld: Symbol not found: _AVCaptureDeviceTypeContinuityCamera
Referenced from: libavdevice.dylib (built for macOS 15.0 which is newer than running OS)
```

## Solutions

### Option 1: Upgrade macOS (Recommended)
Upgrade to macOS 15.0 (Sequoia) or newer to use the bundled Remotion binaries.

### Option 2: Use System FFmpeg
Install FFmpeg via Homebrew and configure Remotion to use it:

```bash
brew install ffmpeg
```

Then update `remotion.service.js` to set custom FFmpeg paths:

```javascript
await renderMedia({
  composition: mp4Composition,
  serveUrl: bundleLocation,
  codec: 'h264',
  outputLocation: path.join(outputDir, 'video.mp4'),
  inputProps,
  ffmpegExecutable: '/usr/local/bin/ffmpeg', // or /opt/homebrew/bin/ffmpeg on M1/M2
  ffprobeExecutable: '/usr/local/bin/ffprobe',
});
```

### Option 3: Use Remotion Lambda (Cloud Rendering)
Use Remotion Lambda to render videos in the cloud (requires AWS setup).

## Testing on Compatible System

On a macOS 15+ system, you can test the Remotion setup:

```bash
node test-remotion.js
```

This will:
1. Create test screenshots and audio
2. Bundle the Remotion project
3. Render both MP4 formats (16:9 and 1:1)
4. Generate a GIF preview
5. Output files to `public/videos/test-{timestamp}/`

## Next Steps

1. Upgrade to macOS 15+ OR install system FFmpeg
2. Test video rendering with `node test-remotion.js`
3. Start the server and test end-to-end video generation
4. Deploy to production server (ensure macOS 15+ or system FFmpeg available)

## Files Created

```
server/
├── remotion/
│   ├── src/
│   │   ├── index.js          # Entry point
│   │   ├── Root.jsx          # Remotion root
│   │   ├── DemoVideo.jsx     # Main composition
│   │   ├── Scene.jsx         # Scene component with animations
│   │   └── TextOverlay.jsx   # Text overlay component
│   └── remotion.config.js    # Remotion configuration
├── services/
│   └── remotion.service.js   # Updated with real rendering
└── test-remotion.js          # Test script
```

## Architecture

The video rendering pipeline:

1. **Screenshot Service** → Captures website screenshots with Puppeteer
2. **Script Service** → Generates AI-powered script with Groq
3. **Voiceover Service** → Synthesizes audio with Groq Orpheus
4. **Remotion Service** → Renders video with animations
   - Converts images/audio to base64 data URLs
   - Bundles Remotion project
   - Renders 16:9 MP4 (1920x1080)
   - Renders 1:1 MP4 (1080x1080)
   - Generates GIF preview with FFmpeg
5. **Viral Score Service** → Analyzes video potential

All services are orchestrated by the BullMQ video worker.
