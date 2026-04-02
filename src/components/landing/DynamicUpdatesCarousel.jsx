import { useState, useRef, useEffect } from 'react';
import { Box, Paper, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { Flame, Crown, Swords, Rocket, Award, Bolt } from 'lucide-react';
import GsapReveal from './GsapReveal';

export default function DynamicUpdatesCarousel() {
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  const updates = [
    { icon: Flame, title: 'NEW FEATURE', desc: 'AI Voice Cloning 2.0', color: '#ef4444' },
    { icon: Crown, title: 'TOP RATED', desc: '4.9★ on Product Hunt', color: '#facc15' },
    { icon: Swords, title: 'BATTLE TESTED', desc: '500K+ Videos Generated', color: '#3b82f6' },
    { icon: Rocket, title: 'LAUNCH', desc: 'API v2 Now Live', color: '#a855f7' },
    { icon: Award, title: 'ACHIEVEMENT', desc: '2,000+ Teams Onboard', color: '#10b981' },
    { icon: Bolt, title: 'SPEED', desc: '60-Second Generation', color: '#facc15' },
  ];

  useEffect(() => {
    if (!scrollRef.current || isPaused) return;

    const scrollWidth = scrollRef.current.scrollWidth;
    const clientWidth = scrollRef.current.clientWidth;
    
    const scroll = () => {
      if (!scrollRef.current) return;
      if (scrollRef.current.scrollLeft >= scrollWidth - clientWidth) {
        scrollRef.current.scrollLeft = 0;
      } else {
        scrollRef.current.scrollLeft += 1;
      }
    };

    const interval = setInterval(scroll, 30);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <GsapReveal delay={0.3}>
      <Box sx={{ position: 'relative', mb: 8 }}>
        <Box
          ref={scrollRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          sx={{
            display: 'flex',
            gap: 3,
            overflowX: 'auto',
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
            pb: 2,
          }}
        >
          {[...updates, ...updates, ...updates].map((update, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8, scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Paper
                sx={{
                  minWidth: 320,
                  p: 4,
                  borderRadius: 3,
                  background: `linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)`,
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: `0 8px 32px rgba(0,0,0,0.4), inset 0 0 60px rgba(${
                    update.color === '#facc15' ? '250,204,21' :
                    update.color === '#3b82f6' ? '59,130,246' :
                    update.color === '#ef4444' ? '239,68,68' :
                    update.color === '#a855f7' ? '168,85,247' :
                    '16,185,129'
                  },0.05)`,
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                  '&:hover': {
                    borderColor: `${update.color}60`,
                    boxShadow: `0 16px 48px rgba(0,0,0,0.6), 0 0 40px ${update.color}40`,
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: `linear-gradient(90deg, transparent, ${update.color}, transparent)`,
                  },
                }}
              >
                <Stack direction="row" spacing={3} alignItems="center">
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: 2,
                      background: `linear-gradient(135deg, ${update.color}30, ${update.color}10)`,
                      border: `1px solid ${update.color}40`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: `0 0 24px ${update.color}30`,
                    }}
                  >
                    <update.icon size={28} color={update.color} />
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        color: update.color,
                        fontWeight: 800,
                        fontSize: '0.75rem',
                        letterSpacing: 2,
                        mb: 0.5,
                      }}
                    >
                      {update.title}
                    </Typography>
                    <Typography sx={{ color: 'white', fontWeight: 700, fontSize: '1.1rem' }}>
                      {update.desc}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            </motion.div>
          ))}
        </Box>
        
        <Box
          sx={{
            height: 2,
            bgcolor: 'rgba(255,255,255,0.05)',
            borderRadius: 1,
            overflow: 'hidden',
            mt: 3,
          }}
        >
          <Box
            component={motion.div}
            animate={isPaused ? {} : { x: ['-100%', '200%'] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            sx={{
              height: '100%',
              width: '50%',
              background: 'linear-gradient(90deg, transparent, #facc15, #3b82f6, transparent)',
            }}
          />
        </Box>
      </Box>
    </GsapReveal>
  );
}
