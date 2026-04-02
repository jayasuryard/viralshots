import { motion } from 'framer-motion';

export default function FloatingOrb({ size, color, top, left, delay = 0, blur = 100 }) {
  return (
    <motion.div
      animate={{
        y: [0, -40, 0],
        x: [0, 20, -20, 0],
        scale: [1, 1.2, 0.9, 1],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        delay,
        ease: 'easeInOut',
      }}
      style={{
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: '50%',
        background: color,
        top,
        left,
        filter: `blur(${blur}px)`,
        pointerEvents: 'none',
        willChange: 'transform',
        opacity: 0.6,
      }}
    />
  );
}
