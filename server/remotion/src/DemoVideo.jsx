const React = require('react');
const { AbsoluteFill, Audio, useCurrentFrame, useVideoConfig, Sequence, continueRender, delayRender } = require('remotion');
const { Scene } = require('./Scene');

const DemoVideo = ({ screenshots, script, audioUrl }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  // Validate required props
  if (!script || !script.scenes || !Array.isArray(script.scenes) || script.scenes.length === 0) {
    console.error('DemoVideo: Invalid or missing script prop', { script });
    return (
      <AbsoluteFill style={{ backgroundColor: '#000', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div>Error: Invalid script data</div>
      </AbsoluteFill>
    );
  }

  if (!screenshots || !Array.isArray(screenshots) || screenshots.length === 0) {
    console.error('DemoVideo: Invalid or missing screenshots prop', { screenshots });
    return (
      <AbsoluteFill style={{ backgroundColor: '#000', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div>Error: Invalid screenshots data</div>
      </AbsoluteFill>
    );
  }

  // Calculate duration per scene based on script timing
  const getSceneDuration = (sceneIndex) => {
    const scene = script.scenes[sceneIndex];
    if (!scene) return fps * 2; // Default 2 seconds

    // Estimate based on text length (rough approximation: 150 words per minute)
    const text = scene.voiceover || scene.narration || '';
    const wordCount = text.split(' ').length;
    const durationInSeconds = Math.max(2, (wordCount / 150) * 60);
    return Math.floor(durationInSeconds * fps);
  };

  // Build scene sequence
  let currentFrame = 0;
  const scenes = script.scenes.map((scene, index) => {
    const duration = getSceneDuration(index);
    const sceneData = {
      from: currentFrame,
      durationInFrames: duration,
      scene,
      screenshot: screenshots[index] || screenshots[0], // Fallback to first screenshot
      index
    };
    currentFrame += duration;
    return sceneData;
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#000' }}>
      {/* Render each scene */}
      {scenes.map((sceneData) => (
        <Sequence
          key={sceneData.index}
          from={sceneData.from}
          durationInFrames={sceneData.durationInFrames}
        >
          <Scene
            screenshot={sceneData.screenshot}
            scene={sceneData.scene}
            duration={sceneData.durationInFrames}
          />
        </Sequence>
      ))}

      {/* Audio track - commented out temporarily due to ffprobe compatibility issue */}
      {/* {audioUrl && (
        <Audio src={audioUrl} />
      )} */}
    </AbsoluteFill>
  );
};

module.exports = { DemoVideo };
