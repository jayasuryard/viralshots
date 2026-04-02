import { motion } from 'framer-motion';
import { Box, Typography, Stack } from '@mui/material';

export default function ViralScoreCard({ score, tips }) {
  function getScoreColor(score) {
    if (score >= 8) return '#059669';
    if (score >= 6) return '#ca8a04';
    return '#ea580c';
  }
  
  function getScoreLabel(score) {
    if (score >= 9) return 'Excellent';
    if (score >= 8) return 'Great';
    if (score >= 7) return 'Good';
    if (score >= 6) return 'Decent';
    return 'Needs Work';
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Box
        sx={{
          mt: 4,
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)',
          borderRadius: 3,
          p: 3,
        }}
      >
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
          📊 Viral Potential Analysis
        </Typography>
        
        {/* Score Display */}
        <Stack direction="row" spacing={2} alignItems="flex-end" sx={{ mb: 3 }}>
          <Typography
            variant="h1"
            fontWeight="bold"
            sx={{ fontSize: '3.75rem', color: getScoreColor(score), lineHeight: 1 }}
          >
            {score.toFixed(1)}
          </Typography>
          <Box sx={{ pb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              /10
            </Typography>
            <Typography variant="h6" fontWeight={600} sx={{ color: getScoreColor(score) }}>
              {getScoreLabel(score)}
            </Typography>
          </Box>
        </Stack>
        
        {/* Progress Bar */}
        <Box
          sx={{
            width: '100%',
            height: 12,
            bgcolor: 'grey.200',
            borderRadius: 3,
            mb: 3,
            overflow: 'hidden',
          }}
        >
          <motion.div
            style={{
              height: '100%',
              backgroundColor: getScoreColor(score),
              borderRadius: 12,
            }}
            initial={{ width: 0 }}
            animate={{ width: `${(score / 10) * 100}%` }}
            transition={{ duration: 1, delay: 0.3 }}
          />
        </Box>
        
        {/* Improvement Tips */}
        <Box>
          <Typography variant="body1" fontWeight={600} sx={{ mb: 1.5 }}>
            💡 Improvement Tips:
          </Typography>
          <Stack spacing={1}>
            {tips.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <Stack direction="row" spacing={1.5} alignItems="flex-start">
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ color: 'primary.main', lineHeight: 1.5 }}
                  >
                    •
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {tip}
                  </Typography>
                </Stack>
              </motion.div>
            ))}
          </Stack>
        </Box>
      </Box>
    </motion.div>
  );
}
