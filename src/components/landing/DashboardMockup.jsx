import { useRef } from 'react';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import dashboardImage from '../../assets/dashboard.png';

export default function DashboardMockup() {
  const ref = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: ref.current, start: 'top 80%' },
    });
    
    tl.fromTo(
      ref.current,
      { y: 120, opacity: 0, rotateX: 25, scale: 0.85 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        scale: 1,
        duration: 1.8,
        ease: 'power4.out',
      }
    )
    .to(ref.current, {
      y: -30,
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 1,
      },
    });
  }, []);

  return (
    <Box ref={ref} sx={{ perspective: '2500px', width: '100%', maxWidth: 1200, mx: 'auto', mt: 10 }}>
      <Box
        sx={{
          transform: 'rotateX(3deg) rotateY(-2deg)',
          transition: 'transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
          '&:hover': {
            transform: 'rotateX(0deg) rotateY(0deg) translateY(-12px) scale(1.02)',
          },
        }}
      >
        <Box
          sx={{
            borderRadius: '20px 20px 6px 6px',
            overflow: 'hidden',
            boxShadow: `
              0 60px 120px -30px rgba(0, 0, 0, 0.8),
              0 40px 80px -40px rgba(250, 204, 21, 0.3),
              0 0 0 1px rgba(250,204,21,0.2),
              inset 0 0 80px rgba(59,130,246,0.1)
            `,
            border: '10px solid #0a0a0a',
            borderBottom: '0',
            position: 'relative',
            background: 'linear-gradient(145deg, #0f0f0f, #000)',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 220,
              height: 32,
              bgcolor: '#000',
              borderRadius: '0 0 20px 20px',
              zIndex: 10,
              boxShadow: '0 4px 12px rgba(0,0,0,0.6)',
              border: '1px solid rgba(250,204,21,0.1)',
            }}
          />

          <Box
            sx={{
              aspectRatio: '16/10',
              bgcolor: '#080808',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <img
              src={dashboardImage}
              alt="Dashboard Preview"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                background: `
                  radial-gradient(circle at 20% 30%, rgba(250,204,21,0.08) 0%, transparent 50%),
                  radial-gradient(circle at 80% 70%, rgba(59,130,246,0.08) 0%, transparent 50%),
                  linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 50%, rgba(255,255,255,0.02) 100%)
                `,
                pointerEvents: 'none',
              }}
            />
            <Box
              component={motion.div}
              animate={{ y: ['-100%', '200%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              sx={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, transparent 0%, rgba(250,204,21,0.03) 50%, transparent 100%)',
                height: '100px',
                pointerEvents: 'none',
              }}
            />
          </Box>
        </Box>

        <Box
          sx={{
            height: 28,
            background: 'linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)',
            borderRadius: '0 0 14px 14px',
            position: 'relative',
            boxShadow: `
              0 12px 32px rgba(0,0,0,0.6),
              0 0 40px rgba(250,204,21,0.2)
            `,
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '2px',
              background: 'linear-gradient(90deg, transparent, rgba(250,204,21,0.3) 30%, rgba(59,130,246,0.3) 70%, transparent)',
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 140,
              height: 5,
              bgcolor: '#050505',
              borderRadius: '6px 6px 0 0',
              boxShadow: 'inset 0 1px 2px rgba(250,204,21,0.2)',
            },
          }}
        />

        <Box
          sx={{
            position: 'absolute',
            bottom: -60,
            left: '5%',
            right: '5%',
            height: 100,
            background: `
              radial-gradient(ellipse, rgba(250,204,21,0.15) 0%, rgba(0,0,0,0.6) 30%, transparent 70%)
            `,
            filter: 'blur(30px)',
            zIndex: -1,
          }}
        />
      </Box>
    </Box>
  );
}
