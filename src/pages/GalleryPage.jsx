import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Box,
  Typography,
  Stack,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  InputAdornment,
  Select,
  FormControl,
  CircularProgress,
  Alert,
  Paper,
} from '@mui/material';
import {
  Video,
  Play,
  Download,
  Share2,
  Trash2,
  MoreVertical,
  Search,
  Filter,
  Calendar,
  TrendingUp,
  Eye,
  Clock,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import apiClient from '../api/client';

export default function GalleryPage() {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const { data } = await apiClient.get('/videos');
      setVideos(data.videos || []);
    } catch (err) {
      setError('Failed to load videos');
    } finally {
      setLoading(false);
    }
  };

  const handleMenuOpen = (event, video) => {
    setAnchorEl(event.currentTarget);
    setSelectedVideo(video);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedVideo(null);
  };

  const handleDownload = (video) => {
    // In a real app, this would download the video
    window.open(video.videoUrl, '_blank');
    handleMenuClose();
  };

  const handleShare = (video) => {
    // In a real app, this would open a share dialog
    navigator.clipboard.writeText(video.videoUrl);
    handleMenuClose();
  };

  const handleDelete = async (video) => {
    try {
      await apiClient.delete(`/videos/${video.id}`);
      setVideos(videos.filter((v) => v.id !== video.id));
      handleMenuClose();
    } catch (err) {
      console.error('Failed to delete video');
    }
  };

  const handleVideoClick = (videoId) => {
    navigate(`/videos/${videoId}`);
  };

  const filteredVideos = videos
    .filter((video) => {
      if (filterBy === 'all') return true;
      return video.status === filterBy;
    })
    .filter((video) => {
      if (!searchQuery) return true;
      return video.url?.toLowerCase().includes(searchQuery.toLowerCase());
    })
    .sort((a, b) => {
      if (sortBy === 'recent') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortBy === 'oldest') {
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else if (sortBy === 'viralScore') {
        return (b.viralScore || 0) - (a.viralScore || 0);
      }
      return 0;
    });

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'processing':
        return 'warning';
      case 'failed':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 size={16} />;
      case 'processing':
        return <Clock size={16} />;
      case 'failed':
        return <AlertCircle size={16} />;
      default:
        return <Video size={16} />;
    }
  };

  const stats = [
    {
      label: 'Total Videos',
      value: videos.length,
      icon: Video,
      color: '#6366f1',
    },
    {
      label: 'Completed',
      value: videos.filter((v) => v.status === 'completed').length,
      icon: CheckCircle2,
      color: '#10b981',
    },
    {
      label: 'Avg. Viral Score',
      value: Math.round(
        videos.reduce((acc, v) => acc + (v.viralScore || 0), 0) / videos.length || 0
      ),
      icon: TrendingUp,
      color: '#f59e0b',
    },
  ];

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Stack spacing={1} sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold">
          Video Gallery
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Browse and manage all your generated videos
        </Typography>
      </Stack>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card
                sx={{
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: 'grey.100',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {stat.label}
                      </Typography>
                      <Typography variant="h4" fontWeight="bold">
                        {stat.value}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: 2,
                        background: `linear-gradient(135deg, ${stat.color}20 0%, ${stat.color}10 100%)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <stat.icon size={28} color={stat.color} />
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Filters and Search */}
      <Paper
        elevation={1}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'grey.100',
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={20} color="#6366f1" />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <Select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                startAdornment={<Filter size={20} color="#6366f1" style={{ marginRight: 8, marginLeft: 8 }} />}
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="all">All Videos</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
                <MenuItem value="processing">Processing</MenuItem>
                <MenuItem value="failed">Failed</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                startAdornment={<Calendar size={20} color="#6366f1" style={{ marginRight: 8, marginLeft: 8 }} />}
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="recent">Most Recent</MenuItem>
                <MenuItem value="oldest">Oldest First</MenuItem>
                <MenuItem value="viralScore">Highest Viral Score</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 4, borderRadius: 2 }}>
          {error}
        </Alert>
      )}

      {/* Videos Grid */}
      {filteredVideos.length === 0 ? (
        <Paper
          elevation={0}
          sx={{
            p: 8,
            textAlign: 'center',
            borderRadius: 3,
            border: '2px dashed',
            borderColor: 'grey.300',
            bgcolor: 'grey.50',
          }}
        >
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              bgcolor: 'rgba(99, 102, 241, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto',
              mb: 3,
            }}
          >
            <Video size={40} color="#6366f1" />
          </Box>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            No videos yet
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Create your first viral video to get started
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/dashboard/home')}
            sx={{
              background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
              color: 'white',
              px: 4,
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Create Video
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {filteredVideos.map((video, index) => (
            <Grid item xs={12} sm={6} md={4} key={video.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card
                  sx={{
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: 'grey.100',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)',
                    },
                  }}
                  onClick={() => video.status === 'completed' && handleVideoClick(video.id)}
                >
                  <Box sx={{ position: 'relative', paddingTop: '56.25%', bgcolor: 'grey.900' }}>
                    {video.thumbnailUrl ? (
                      <CardMedia
                        component="img"
                        image={video.thumbnailUrl}
                        alt={`Video ${video.id}`}
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    ) : (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                        }}
                      >
                        <Video size={48} color="white" />
                      </Box>
                    )}
                    
                    {video.status === 'completed' && (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          width: 60,
                          height: 60,
                          borderRadius: '50%',
                          bgcolor: 'rgba(255, 255, 255, 0.9)',
                          backdropFilter: 'blur(10px)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            bgcolor: 'white',
                            transform: 'translate(-50%, -50%) scale(1.1)',
                          },
                        }}
                      >
                        <Play size={24} fill="#6366f1" color="#6366f1" style={{ marginLeft: 4 }} />
                      </Box>
                    )}

                    <Chip
                      icon={getStatusIcon(video.status)}
                      label={video.status}
                      size="small"
                      color={getStatusColor(video.status)}
                      sx={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        fontWeight: 600,
                        textTransform: 'capitalize',
                      }}
                    />

                    {video.viralScore && (
                      <Chip
                        icon={<TrendingUp size={14} />}
                        label={`${video.viralScore}/100`}
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: 12,
                          right: 12,
                          bgcolor: 'rgba(16, 185, 129, 0.9)',
                          color: 'white',
                          fontWeight: 600,
                        }}
                      />
                    )}
                  </Box>

                  <CardContent sx={{ p: 2.5 }}>
                    <Typography
                      variant="subtitle2"
                      fontWeight={600}
                      gutterBottom
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {video.url || `Video ${video.id}`}
                    </Typography>
                    <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <Clock size={14} color="#64748b" />
                        <Typography variant="caption" color="text.secondary">
                          {new Date(video.createdAt).toLocaleDateString()}
                        </Typography>
                      </Stack>
                      {video.views !== undefined && (
                        <Stack direction="row" spacing={0.5} alignItems="center">
                          <Eye size={14} color="#64748b" />
                          <Typography variant="caption" color="text.secondary">
                            {video.views || 0}
                          </Typography>
                        </Stack>
                      )}
                    </Stack>
                  </CardContent>

                  <CardActions sx={{ px: 2.5, pb: 2.5, pt: 0 }}>
                    <Stack direction="row" spacing={1} sx={{ width: '100%' }}>
                      {video.status === 'completed' && (
                        <>
                          <Button
                            size="small"
                            startIcon={<Download size={16} />}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDownload(video);
                            }}
                            sx={{
                              flex: 1,
                              borderRadius: 1.5,
                              textTransform: 'none',
                              fontWeight: 600,
                            }}
                          >
                            Download
                          </Button>
                          <Button
                            size="small"
                            startIcon={<Share2 size={16} />}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleShare(video);
                            }}
                            sx={{
                              flex: 1,
                              borderRadius: 1.5,
                              textTransform: 'none',
                              fontWeight: 600,
                            }}
                          >
                            Share
                          </Button>
                        </>
                      )}
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMenuOpen(e, video);
                        }}
                        sx={{
                          borderRadius: 1.5,
                          border: '1px solid',
                          borderColor: 'grey.200',
                        }}
                      >
                        <MoreVertical size={16} />
                      </IconButton>
                    </Stack>
                  </CardActions>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Context Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        sx={{
          '& .MuiPaper-root': {
            borderRadius: 2,
            minWidth: 200,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        {selectedVideo?.status === 'completed' && (
          <MenuItem onClick={() => handleDownload(selectedVideo)}>
            <Download size={18} style={{ marginRight: 12 }} />
            Download
          </MenuItem>
        )}
        {selectedVideo?.status === 'completed' && (
          <MenuItem onClick={() => handleShare(selectedVideo)}>
            <Share2 size={18} style={{ marginRight: 12 }} />
            Share
          </MenuItem>
        )}
        <MenuItem onClick={() => handleDelete(selectedVideo)} sx={{ color: 'error.main' }}>
          <Trash2 size={18} style={{ marginRight: 12 }} />
          Delete
        </MenuItem>
      </Menu>
    </Box>
  );
}
