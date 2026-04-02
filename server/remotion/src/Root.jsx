const React = require('react');
const { Composition } = require('remotion');
const { DemoVideo } = require('./DemoVideo');

const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="DemoVideo"
        component={DemoVideo}
        durationInFrames={300} // 10 seconds at 30fps
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          screenshots: [],
          script: {
            scenes: []
          },
          audioUrl: null
        }}
      />
      <Composition
        id="DemoVideoSquare"
        component={DemoVideo}
        durationInFrames={300}
        fps={30}
        width={1080}
        height={1080}
        defaultProps={{
          screenshots: [],
          script: {
            scenes: []
          },
          audioUrl: null
        }}
      />
    </>
  );
};

module.exports = { RemotionRoot };
