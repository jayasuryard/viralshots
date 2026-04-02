import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Box, Typography, Stack } from '@mui/material';
import { Sparkles } from 'lucide-react';

export default function CreditDisplay({ credits }) {
  const isLowCredits = credits < 3;
  
  return (
    <RouterLink to="/billing" style={{ textDecoration: 'none' }}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.25,
            px: 2,
            py: 1.25,
            borderRadius: 2,
            cursor: 'pointer',
            boxShadow: 1,
            transition: 'all 0.2s ease-in-out',
            bgcolor: isLowCredits ? '#fef2f2' : '#eef2ff',
            border: 2,
            borderColor: isLowCredits ? '#fecaca' : '#c7d2fe',
            '&:hover': {
              bgcolor: isLowCredits ? '#fee2e2' : '#e0e7ff',
            },
          }}
          aria-label={`Credits: ${credits}`}
        >
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: 1.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: isLowCredits ? '#ef4444' : undefined,
              background: !isLowCredits ? 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)' : undefined,
            }}
          >
            <Sparkles size={16} color="white" />
          </Box>
          <Stack spacing={0}>
            <Typography variant="caption" fontWeight={500} color="text.secondary">
              Credits
            </Typography>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{
                lineHeight: 1,
                color: isLowCredits ? '#dc2626' : '#4f46e5',
              }}
            >
              {credits}
            </Typography>
          </Stack>
        </Box>
      </motion.div>
    </RouterLink>
  );
}
