const React = require('react');
const { AbsoluteFill, useCurrentFrame, interpolate, Easing, Img } = require('remotion');
const { TextOverlay } = require('./TextOverlay');

const Scene = ({ screenshot, scene, duration }) => {
  const frame = useCurrentFrame();

  // Animation configurations based on scene type
  const getAnimationStyle = () => {
    const animationType = scene.animation || 'zoomIn';
    
    switch (animationType) {
      case 'zoomIn':
        const zoomInScale = interpolate(
          frame,
          [0, duration],
          [1, 1.2],
          {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.4, 0, 0.2, 1)
          }
        );
        return {
          transform: `scale(${zoomInScale})`,
        };

      case 'zoomOut':
        const zoomOutScale = interpolate(
          frame,
          [0, duration],
          [1.2, 1],
          {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.4, 0, 0.2, 1)
          }
        );
        return {
          transform: `scale(${zoomOutScale})`,
        };

      case 'panLeft':
        const panLeftX = interpolate(
          frame,
          [0, duration],
          [0, -10],
          {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.4, 0, 0.2, 1)
          }
        );
        return {
          transform: `translateX(${panLeftX}%)`,
        };

      case 'panRight':
        const panRightX = interpolate(
          frame,
          [0, duration],
          [0, 10],
          {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.4, 0, 0.2, 1)
          }
        );
        return {
          transform: `translateX(${panRightX}%)`,
        };

      case 'fadeIn':
        const fadeInOpacity = interpolate(
          frame,
          [0, duration * 0.3],
          [0, 1],
          {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.4, 0, 0.2, 1)
          }
        );
        return {
          opacity: fadeInOpacity,
        };

      default:
        return {};
    }
  };

  // Fade in/out for smooth transitions
  const opacity = interpolate(
    frame,
    [0, 15, duration - 15, duration],
    [0, 1, 1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  return (
    <AbsoluteFill style={{ opacity }}>
      <AbsoluteFill
        style={{
          ...getAnimationStyle(),
        }}
      >
        <Img
          src={screenshot}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </AbsoluteFill>

      {/* Text overlay */}
      <TextOverlay
        text={scene.text}
        position={scene.textPosition || 'bottom'}
        frame={frame}
        duration={duration}
      />
    </AbsoluteFill>
  );
};

module.exports = { Scene };
