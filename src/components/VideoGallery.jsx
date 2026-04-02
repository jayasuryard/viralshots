import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Stack,
  Paper
} from '@mui/material';
import { Video, Loader2, AlertCircle, TrendingUp, Calendar } from 'lucide-react';
import apiClient from '../api/client';

export default function VideoGallery({ refreshKey = 0 }) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchVideos() {
      try {
        const { data } = await apiClient.get('/videos');
        setVideos(data.videos);
      } catch (error) {
        console.error('Failed to fetch videos:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchVideos();
  }, [refreshKey]);
  
  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', py: 6 }}>
        <CircularProgress size={48} />
        <Typography variant="body1" color="text.secondary" fontWeight={500} sx={{ mt: 2 }}>
          Loading your videos...
        </Typography>
      </Box>
    );
  }
  
  if (videos.length === 0) {
    return (
      <Paper
        sx={{
          textAlign: 'center',
          py: 8,
          bgcolor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(8px)',
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'grey.100',
        }}
      >
        <Box
          sx={{
            width: 80,
            height: 80,
            mx: 'auto',
            mb: 3,
            borderRadius: 3,
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Video size={40} color="#6366f1" />
        </Box>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
          No videos yet
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Create your first viral video above!
        </Typography>
      </Paper>
    );
  }
  
  return (
    <Box sx={{ mt: 6 }}>
      <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 3 }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 2,
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Video size={20} color="#4f46e5" />
        </Box>
        <Typography variant="h5" fontWeight="bold">
          Your Videos
        </Typography>
        <Chip
          label={videos.length}
          size="small"
          sx={{
            bgcolor: 'grey.100',
            fontWeight: 600,
            color: 'text.secondary',
          }}
        />
      </Stack>
      
      <Grid container spacing={3}>
        {videos.map((video, index) => (
          <Grid item xs={12} md={6} lg={4} key={video.id}>
            <RouterLink to={`/videos/${video.id}`} style={{ textDecoration: 'none' }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -4, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(8px)',
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: 'grey.100',
                    transition: 'all 0.3s ease-in-out',
                    cursor: 'pointer',
                    '&:hover': {
                      boxShadow: 4,
                    },
                  }}
                >
                  {video.gifUrl && video.status === 'completed' && (
                    <Box sx={{ position: 'relative', overflow: 'hidden', bgcolor: 'grey.100' }}>
                      <CardMedia
                        component="img"
                        image={`http://localhost:3000${video.gifUrl}`}
                        alt="Video preview"
                        sx={{
                          height: 192,
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease-in-out',
                          '&:hover': {
                            transform: 'scale(1.05)',
                          },
                        }}
                      />
                    </Box>
                  )}
                  
                  {video.status === 'processing' && (
                    <Box
                      sx={{
                        height: 192,
                        background: 'linear-gradient(135deg, #e0e7ff 0%, #e9d5ff 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Stack spacing={1} alignItems="center">
                        <CircularProgress size={48} />
                        <Typography variant="body2" fontWeight={600} color="primary.main">
                          {video.progress}%
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Processing...
                        </Typography>
                      </Stack>
                    </Box>
                  )}
                  
                  {video.status === 'failed' && (
                    <Box
                      sx={{
                        height: 192,
                        bgcolor: '#fef2f2',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Stack spacing={1.5} alignItems="center">
                        <Box
                          sx={{
                            width: 64,
                            height: 64,
                            borderRadius: '50%',
                            bgcolor: '#fee2e2',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <AlertCircle size={32} color="#ef4444" />
                        </Box>
                        <Typography variant="body2" fontWeight={600} color="error.main">
                          Generation failed
                        </Typography>
                      </Stack>
                    </Box>
                  )}
                  
                  <CardContent sx={{ p: 2.5 }}>
                    <Typography
                      variant="body1"
                      fontWeight={600}
                      sx={{
                        mb: 1.5,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {video.url}
                    </Typography>
                    
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
                      <Calendar size={16} color="#6b7280" />
                      <Typography variant="body2" color="text.secondary">
                        {new Date(video.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </Typography>
                    </Stack>
                    
                    {video.viralScore && (
                      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
                        <TrendingUp size={16} color="#6366f1" />
                        <Chip
                          label={`Viral Score: ${video.viralScore.toFixed(1)}/10`}
                          size="small"
                          sx={{
                            bgcolor: '#eef2ff',
                            color: '#4f46e5',
                            fontWeight: 700,
                            fontSize: '0.75rem',
                          }}
                        />
                      </Stack>
                    )}
                    
                    <Chip
                      label={video.status.charAt(0).toUpperCase() + video.status.slice(1)}
                      size="small"
                      icon={
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            bgcolor:
                              video.status === 'completed' ? '#10b981' :
                              video.status === 'failed' ? '#ef4444' :
                              '#eab308',
                            animation: video.status === 'processing' ? 'pulse 2s infinite' : 'none',
                          }}
                        />
                      }
                      sx={{
                        bgcolor:
                          video.status === 'completed' ? '#dcfce7' :
                          video.status === 'failed' ? '#fee2e2' :
                          '#fef9c3',
                        color:
                          video.status === 'completed' ? '#15803d' :
                          video.status === 'failed' ? '#b91c1c' :
                          '#854d0e',
                        border: '1px solid',
                        borderColor:
                          video.status === 'completed' ? '#86efac' :
                          video.status === 'failed' ? '#fecaca' :
                          '#fde047',
                        fontWeight: 600,
                        fontSize: '0.75rem',
                      }}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            </RouterLink>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
