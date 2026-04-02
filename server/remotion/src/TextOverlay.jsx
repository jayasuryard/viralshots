const React = require('react');
const { AbsoluteFill, interpolate, Easing } = require('remotion');

const TextOverlay = ({ text, position, frame, duration }) => {
  if (!text) return null;

  // Animate text entry
  const textOpacity = interpolate(
    frame,
    [0, 20],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.4, 0, 0.2, 1)
    }
  );

  const textTranslateY = interpolate(
    frame,
    [0, 20],
    [30, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.4, 0, 0.2, 1)
    }
  );

  // Position styles
  const getPositionStyle = () => {
    const baseStyle = {
      padding: '40px 80px',
      textAlign: 'center',
      width: '100%',
    };

    switch (position) {
      case 'top':
        return {
          ...baseStyle,
          top: '80px',
          justifyContent: 'flex-start',
        };
      case 'center':
        return {
          ...baseStyle,
          justifyContent: 'center',
        };
      case 'bottom':
      default:
        return {
          ...baseStyle,
          bottom: '80px',
          justifyContent: 'flex-end',
        };
    }
  };

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        ...getPositionStyle(),
        opacity: textOpacity,
        transform: `translateY(${textTranslateY}px)`,
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          padding: '30px 50px',
          borderRadius: '20px',
          maxWidth: '80%',
          backdropFilter: 'blur(10px)',
          border: '2px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <h2
          style={{
            fontSize: '48px',
            fontWeight: 'bold',
            color: '#ffffff',
            margin: 0,
            lineHeight: 1.4,
            textShadow: '0 4px 6px rgba(0, 0, 0, 0.5)',
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          }}
        >
          {text}
        </h2>
      </div>
    </AbsoluteFill>
  );
};

module.exports = { TextOverlay };
