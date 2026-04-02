import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, LinearProgress, Alert, Stack, Paper } from '@mui/material';
import apiClient from '../api/client';

export default function JobProgress({ jobId, videoId, onComplete, onReset }) {
  const [status, setStatus] = useState({ progress: 0, status: 'pending' });
  const [completed, setCompleted] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const { data } = await apiClient.get(`/videos/status/${jobId}`);
        setStatus(data);
        
        if (data.status === 'completed') {
          clearInterval(interval);
          setCompleted(true);
          setTimeout(() => onComplete(), 2000);
        } else if (data.status === 'failed') {
          clearInterval(interval);
        }
      } catch (error) {
        console.error('Failed to fetch status:', error);
      }
    }, 2000); // Poll every 2 seconds
    
    return () => clearInterval(interval);
  }, [jobId, onComplete]);
  
  function getStatusMessage(progress) {
    if (progress < 30) return 'Capturing screenshots... 📸';
    if (progress < 50) return 'Generating AI script... 🤖';
    if (progress < 70) return 'Creating voiceover... 🎙️';
    if (progress < 90) return 'Rendering video... 🎬';
    if (progress < 100) return 'Analyzing viral potential... 📊';
    return 'Complete! ✨';
  }
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Paper sx={{ p: 4, borderRadius: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="h5" fontWeight="bold">
            Generating Your Video...
          </Typography>
          {status.status === 'failed' && (
            <Button
              onClick={onReset}
              variant="outlined"
              size="small"
              sx={{ borderRadius: 2 }}
            >
              Try Again
            </Button>
          )}
        </Box>
        
        {/* Progress Bar */}
        <Box sx={{ mb: 2 }}>
          <Box
            sx={{
              position: 'relative',
              height: 24,
              borderRadius: 3,
              bgcolor: 'grey.200',
              overflow: 'hidden',
            }}
          >
            <motion.div
              style={{
                height: '100%',
                background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 12,
              }}
              initial={{ width: 0 }}
              animate={{ width: `${status.progress}%` }}
              transition={{ duration: 0.5 }}
            >
              {status.progress > 5 && (
                <Typography variant="body2" fontWeight={600} color="white">
                  {status.progress}%
                </Typography>
              )}
            </motion.div>
          </Box>
        </Box>
        
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 2 }}>
          {getStatusMessage(status.progress)}
        </Typography>
        
        {status.status === 'failed' && (
          <Alert severity="error" sx={{ mt: 2, borderRadius: 2 }}>
            <Typography variant="body2" fontWeight={600}>
              Generation failed
            </Typography>
            <Typography variant="body2">
              {status.errorMessage || 'An error occurred'}
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Your credit has been refunded.
            </Typography>
          </Alert>
        )}
        
        {completed && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <Stack spacing={2} alignItems="center" sx={{ mt: 3 }}>
              <Typography variant="h1">🎉</Typography>
              <Typography variant="h5" fontWeight={600}>
                Your video is ready!
              </Typography>
              <Button
                onClick={() => navigate(`/videos/${videoId}`)}
                variant="contained"
                size="large"
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #4f46e5 0%, #9333ea 100%)',
                  },
                }}
              >
                View Video
              </Button>
            </Stack>
          </motion.div>
        )}
        
        {!completed && status.status !== 'failed' && (
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
            This usually takes 2-3 minutes. Feel free to navigate away - we'll save your video!
          </Typography>
        )}
      </Paper>
    </motion.div>
  );
}
