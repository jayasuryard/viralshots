import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Box,
  Container,
  Typography,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  CircularProgress,
  Paper,
  Stack,
  Grid
} from '@mui/material';
import apiClient from '../api/client';
import ViralScoreCard from '../components/ViralScoreCard';

export default function VideoDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [format, setFormat] = useState('mp4');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchVideo() {
      try {
        const { data } = await apiClient.get(`/videos/${id}`);
        setVideo(data);
      } catch (error) {
        console.error('Failed to fetch video:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchVideo();
  }, [id]);
  
  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: 'grey.50',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Stack spacing={2} alignItems="center">
          <CircularProgress size={64} />
          <Typography variant="body1" color="text.secondary">
            Loading video...
          </Typography>
        </Stack>
      </Box>
    );
  }
  
  if (!video) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: 'grey.50',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Stack spacing={2} alignItems="center">
          <Typography variant="h1">😕</Typography>
          <Typography variant="h5" fontWeight="bold">
            Video not found
          </Typography>
          <Button
            onClick={() => navigate('/dashboard')}
            variant="contained"
            sx={{
              mt: 2,
              background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #4f46e5 0%, #9333ea 100%)',
              },
            }}
          >
            Back to Dashboard
          </Button>
        </Stack>
      </Box>
    );
  }
  
  const videoUrl = format === 'mp4' ? video.mp4Url : video.squareUrl;
  
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50', py: 4 }}>
      <Container maxWidth="lg">
        {/* Back Button */}
        <Button
          onClick={() => navigate('/dashboard')}
          sx={{
            mb: 3,
            color: 'text.secondary',
            '&:hover': { color: 'text.primary' },
          }}
        >
          ← Back to Dashboard
        </Button>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Paper sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
              {video.url}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Created {new Date(video.createdAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </Typography>
            
            {video.status === 'completed' && (
              <>
                {/* Format Selector */}
                <ToggleButtonGroup
                  value={format}
                  exclusive
                  onChange={(e, newFormat) => newFormat && setFormat(newFormat)}
                  sx={{ mb: 2 }}
                >
                  <ToggleButton
                    value="mp4"
                    sx={{
                      px: 3,
                      py: 1,
                      fontWeight: 600,
                      borderRadius: 2,
                      '&.Mui-selected': {
                        background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                        color: 'white',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #4f46e5 0%, #9333ea 100%)',
                        },
                      },
                    }}
                  >
                    MP4 (16:9)
                  </ToggleButton>
                  <ToggleButton
                    value="square"
                    sx={{
                      px: 3,
                      py: 1,
                      fontWeight: 600,
                      borderRadius: 2,
                      '&.Mui-selected': {
                        background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                        color: 'white',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #4f46e5 0%, #9333ea 100%)',
                        },
                      },
                    }}
                  >
                    Square (1:1)
                  </ToggleButton>
                </ToggleButtonGroup>
                
                {/* Video Player */}
                <Box
                  component="video"
                  key={videoUrl}
                  controls
                  src={`http://localhost:3000${videoUrl}`}
                  sx={{
                    width: '100%',
                    borderRadius: 2,
                    mb: 2,
                  }}
                />
                
                {/* Download Buttons */}
                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid item xs={12} sm={4}>
                    <Button
                      component="a"
                      href={`http://localhost:3000${video.mp4Url}`}
                      download
                      fullWidth
                      variant="contained"
                      startIcon={<span>📥</span>}
                      sx={{
                        py: 1.5,
                        fontWeight: 600,
                        background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #4f46e5 0%, #9333ea 100%)',
                        },
                      }}
                    >
                      Download MP4
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Button
                      component="a"
                      href={`http://localhost:3000${video.squareUrl}`}
                      download
                      fullWidth
                      variant="contained"
                      startIcon={<span>📥</span>}
                      sx={{
                        py: 1.5,
                        fontWeight: 600,
                        background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #4f46e5 0%, #9333ea 100%)',
                        },
                      }}
                    >
                      Download Square
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Button
                      component="a"
                      href={`http://localhost:3000${video.gifUrl}`}
                      download
                      fullWidth
                      variant="contained"
                      startIcon={<span>📥</span>}
                      sx={{
                        py: 1.5,
                        fontWeight: 600,
                        bgcolor: 'grey.800',
                        '&:hover': {
                          bgcolor: 'grey.900',
                        },
                      }}
                    >
                      Download GIF
                    </Button>
                  </Grid>
                </Grid>
                
                {/* Viral Score */}
                {video.viralScore && video.viralTips && (
                  <ViralScoreCard score={video.viralScore} tips={video.viralTips} />
                )}
              </>
            )}
            
            {video.status === 'processing' && (
              <Stack spacing={2} alignItems="center" sx={{ py: 6 }}>
                <CircularProgress size={64} />
                <Typography variant="h6" color="text.secondary">
                  Still processing... {video.progress}%
                </Typography>
              </Stack>
            )}
            
            {video.status === 'failed' && (
              <Paper
                sx={{
                  bgcolor: '#fef2f2',
                  border: '1px solid #fecaca',
                  borderRadius: 2,
                  p: 3,
                }}
              >
                <Stack spacing={2} alignItems="center">
                  <Typography variant="h2">❌</Typography>
                  <Typography variant="h6" fontWeight={600} color="error.dark">
                    Generation Failed
                  </Typography>
                  <Typography variant="body2" color="error.main" align="center">
                    {video.errorMessage || 'An error occurred during generation'}
                  </Typography>
                  <Typography variant="caption" color="error.main">
                    Your credit has been refunded.
                  </Typography>
                </Stack>
              </Paper>
            )}
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
}
