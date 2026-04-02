import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Chip,
  IconButton,
  Collapse,
  Alert,
  LinearProgress,
  Card,
  CardContent,
  InputAdornment,
} from '@mui/material';
import {
  Sparkles,
  Link as LinkIcon,
  Video,
  Wand2,
  ChevronDown,
  ChevronRight,
  Volume2,
  Palette,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Zap,
  Settings,
} from 'lucide-react';
import apiClient from '../api/client';
import { useAuth } from '../hooks/useAuth';

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [url, setUrl] = useState('');
  const [videoLength, setVideoLength] = useState('medium');
  const [voiceModel, setVoiceModel] = useState('alloy');
  const [style, setStyle] = useState('modern');
  const [webhookUrl, setWebhookUrl] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [jobId, setJobId] = useState(null);

  // Check for pending URL from landing page
  useEffect(() => {
    const pendingUrl = sessionStorage.getItem('pendingUrl');
    if (pendingUrl) {
      setUrl(pendingUrl);
      sessionStorage.removeItem('pendingUrl');
    }
  }, []);

  const voiceModels = [
    { value: 'alloy', label: 'Alloy - Neutral & Clear', icon: '🎯' },
    { value: 'echo', label: 'Echo - Warm & Friendly', icon: '🌟' },
    { value: 'fable', label: 'Fable - Engaging & Story', icon: '📖' },
    { value: 'onyx', label: 'Onyx - Deep & Professional', icon: '💼' },
    { value: 'nova', label: 'Nova - Energetic & Dynamic', icon: '⚡' },
    { value: 'shimmer', label: 'Shimmer - Soft & Elegant', icon: '✨' },
  ];

  const videoStyles = [
    { value: 'modern', label: 'Modern', color: '#6366f1' },
    { value: 'professional', label: 'Professional', color: '#0f172a' },
    { value: 'vibrant', label: 'Vibrant', color: '#f97316' },
    { value: 'minimal', label: 'Minimal', color: '#64748b' },
  ];

  const videoLengths = [
    { value: 'short', label: 'Short (15-30s)', duration: '15-30s', icon: Zap },
    { value: 'medium', label: 'Medium (30-60s)', duration: '30-60s', icon: Video },
    { value: 'long', label: 'Long (60-90s)', duration: '60-90s', icon: Clock },
  ];

  const handleGenerate = async () => {
    if (!url) {
      setError('Please enter a website URL');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const { data } = await apiClient.post('/videos/create', {
        url,
        videoLength,
        webhookUrl: webhookUrl || undefined,
      });

      setJobId(data.jobId);
      // Navigate to video detail to show progress
      navigate(`/videos/${data.videoId}`, { state: { jobId: data.jobId } });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create video');
      setLoading(false);
    }
  };

  const statsCards = [
    {
      label: 'Videos Created',
      value: user?.totalVideos || 0,
      icon: Video,
      color: '#6366f1',
      trend: '+12%',
    },
    {
      label: 'Credits Remaining',
      value: user?.credits || 0,
      icon: Sparkles,
      color: '#a855f7',
      trend: '',
    },
    {
      label: 'Avg Viral Score',
      value: user?.avgViralScore || 0,
      icon: TrendingUp,
      color: '#10b981',
      trend: '+8%',
    },
  ];

  return (
    <Box>
      {/* Header */}
      <Stack spacing={1} sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold">
          AI Video Generator
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Transform any website into engaging viral content with AI
        </Typography>
      </Stack>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statsCards.map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
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
                      <Stack direction="row" alignItems="baseline" spacing={1}>
                        <Typography variant="h4" fontWeight="bold">
                          {stat.value}
                        </Typography>
                        {stat.trend && (
                          <Chip
                            label={stat.trend}
                            size="small"
                            sx={{
                              height: 20,
                              fontSize: '0.7rem',
                              bgcolor: 'rgba(16, 185, 129, 0.1)',
                              color: 'success.main',
                              fontWeight: 600,
                            }}
                          />
                        )}
                      </Stack>
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

      {/* Main Generator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper
          elevation={2}
          sx={{
            p: 4,
            borderRadius: 4,
            border: '2px solid',
            borderColor: 'primary.main',
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.02) 0%, rgba(168, 85, 247, 0.02) 100%)',
          }}
        >
          <Stack spacing={4}>
            {/* Header */}
            <Stack direction="row" spacing={2} alignItems="center">
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
                }}
              >
                <Wand2 size={24} color="white" />
              </Box>
              <Box>
                <Typography variant="h5" fontWeight="bold">
                  Create Your Viral Video
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Configure your video settings and let AI do the magic
                </Typography>
              </Box>
            </Stack>

            {error && (
              <Alert
                severity="error"
                icon={<AlertCircle size={20} />}
                onClose={() => setError('')}
                sx={{ borderRadius: 2 }}
              >
                {error}
              </Alert>
            )}

            {/* Website URL Input */}
            <FormControl fullWidth>
              <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                Website URL <span style={{ color: '#ef4444' }}>*</span>
              </Typography>
              <TextField
                fullWidth
                placeholder="https://example.com or https://example.com/blog/article"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={loading}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LinkIcon size={20} color="#6366f1" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    bgcolor: 'white',
                  },
                }}
              />
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                Enter the URL of the website you want to transform into a video
              </Typography>
            </FormControl>

            {/* Voice Model Selection */}
            <FormControl fullWidth>
              <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                AI Voice Model
              </Typography>
              <Select
                value={voiceModel}
                onChange={(e) => setVoiceModel(e.target.value)}
                disabled={loading}
                sx={{
                  borderRadius: 2,
                  bgcolor: 'white',
                }}
              >
                {voiceModels.map((model) => (
                  <MenuItem key={model.value} value={model.value}>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <span style={{ fontSize: '1.2rem' }}>{model.icon}</span>
                      <Typography>{model.label}</Typography>
                    </Stack>
                  </MenuItem>
                ))}
              </Select>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
                <Volume2 size={14} color="#6366f1" />
                <Typography variant="caption" color="text.secondary">
                  Choose the AI voice that best fits your content style
                </Typography>
              </Stack>
            </FormControl>

            {/* Video Length Selection */}
            <Box>
              <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                Video Length
              </Typography>
              <Grid container spacing={2}>
                {videoLengths.map((length) => (
                  <Grid item xs={12} sm={4} key={length.value}>
                    <Paper
                      onClick={() => !loading && setVideoLength(length.value)}
                      sx={{
                        p: 2.5,
                        borderRadius: 2,
                        border: '2px solid',
                        borderColor:
                          videoLength === length.value ? 'primary.main' : 'grey.200',
                        bgcolor:
                          videoLength === length.value
                            ? 'rgba(99, 102, 241, 0.05)'
                            : 'white',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          borderColor: 'primary.main',
                          transform: loading ? 'none' : 'translateY(-2px)',
                          boxShadow: loading ? 'none' : '0 4px 12px rgba(0, 0, 0, 0.08)',
                        },
                      }}
                    >
                      <Stack spacing={1.5} alignItems="center" textAlign="center">
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: 2,
                            bgcolor:
                              videoLength === length.value
                                ? 'primary.main'
                                : 'rgba(99, 102, 241, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <length.icon
                            size={20}
                            color={videoLength === length.value ? 'white' : '#6366f1'}
                          />
                        </Box>
                        <Box>
                          <Typography
                            variant="subtitle2"
                            fontWeight={600}
                            color={
                              videoLength === length.value ? 'primary.main' : 'text.primary'
                            }
                          >
                            {length.label}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {length.duration}
                          </Typography>
                        </Box>
                      </Stack>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Video Style Selection */}
            <Box>
              <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                Video Style
              </Typography>
              <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                {videoStyles.map((styleOption) => (
                  <Chip
                    key={styleOption.value}
                    label={styleOption.label}
                    onClick={() => !loading && setStyle(styleOption.value)}
                    icon={
                      <Palette
                        size={16}
                        color={style === styleOption.value ? 'white' : styleOption.color}
                      />
                    }
                    sx={{
                      px: 2,
                      py: 2.5,
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      cursor: loading ? 'not-allowed' : 'pointer',
                      bgcolor:
                        style === styleOption.value
                          ? styleOption.color
                          : `${styleOption.color}10`,
                      color: style === styleOption.value ? 'white' : styleOption.color,
                      border: '2px solid',
                      borderColor:
                        style === styleOption.value
                          ? styleOption.color
                          : `${styleOption.color}30`,
                      '&:hover': {
                        bgcolor:
                          style === styleOption.value
                            ? styleOption.color
                            : `${styleOption.color}20`,
                      },
                      '& .MuiChip-icon': {
                        color: style === styleOption.value ? 'white' : styleOption.color,
                      },
                    }}
                  />
                ))}
              </Stack>
            </Box>

            {/* Advanced Options */}
            <Box>
              <Button
                onClick={() => setShowAdvanced(!showAdvanced)}
                endIcon={showAdvanced ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                sx={{
                  textTransform: 'none',
                  color: 'text.secondary',
                  fontWeight: 500,
                  '&:hover': {
                    bgcolor: 'transparent',
                    color: 'primary.main',
                  },
                }}
              >
                Advanced Options
              </Button>
              <Collapse in={showAdvanced}>
                <Stack spacing={3} sx={{ mt: 2, p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
                  <FormControl fullWidth>
                    <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                      Webhook URL (Optional)
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="https://your-webhook-url.com"
                      value={webhookUrl}
                      onChange={(e) => setWebhookUrl(e.target.value)}
                      disabled={loading}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          bgcolor: 'white',
                        },
                      }}
                    />
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                      Receive a notification when your video is ready
                    </Typography>
                  </FormControl>

                  <Alert
                    severity="info"
                    icon={<Settings size={18} />}
                    sx={{ borderRadius: 2 }}
                  >
                    More advanced options coming soon: custom branding, AI training, and more!
                  </Alert>
                </Stack>
              </Collapse>
            </Box>

            {/* Action Buttons */}
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              justifyContent="space-between"
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <Chip
                  icon={<Sparkles size={16} />}
                  label={`${user?.credits || 0} credits available`}
                  sx={{
                    bgcolor: 'rgba(168, 85, 247, 0.1)',
                    color: 'secondary.main',
                    fontWeight: 600,
                  }}
                />
                <Typography variant="caption" color="text.secondary">
                  1 video = 1 credit
                </Typography>
              </Stack>
              <Button
                variant="contained"
                size="large"
                onClick={handleGenerate}
                disabled={loading || !url}
                endIcon={loading ? null : <Sparkles size={20} />}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                  color: 'white',
                  fontWeight: 600,
                  textTransform: 'none',
                  fontSize: '1rem',
                  boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #4f46e5 0%, #9333ea 100%)',
                    boxShadow: '0 6px 16px rgba(99, 102, 241, 0.5)',
                  },
                  '&:disabled': {
                    background: 'rgba(0, 0, 0, 0.12)',
                    color: 'rgba(0, 0, 0, 0.26)',
                  },
                }}
              >
                {loading ? 'Generating...' : 'Generate Video'}
              </Button>
            </Stack>

            {loading && (
              <Box>
                <LinearProgress
                  sx={{
                    borderRadius: 1,
                    height: 8,
                    bgcolor: 'rgba(99, 102, 241, 0.1)',
                    '& .MuiLinearProgress-bar': {
                      background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                    },
                  }}
                />
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: 'block', mt: 1, textAlign: 'center' }}
                >
                  AI is analyzing the website and generating your video...
                </Typography>
              </Box>
            )}
          </Stack>
        </Paper>
      </motion.div>

      {/* Quick Tips */}
      <Grid container spacing={3} sx={{ mt: 4 }}>
        {[
          {
            icon: TrendingUp,
            title: 'Viral Score Analysis',
            description: 'Get AI-powered predictions on your video engagement potential',
          },
          {
            icon: Zap,
            title: 'Lightning Fast',
            description: 'Generate professional videos in under 60 seconds',
          },
          {
            icon: CheckCircle2,
            title: 'No Watermarks',
            description: 'All generated videos are watermark-free on your plan',
          },
        ].map((tip, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Card
              sx={{
                height: '100%',
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'grey.100',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Stack spacing={2}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      bgcolor: 'rgba(99, 102, 241, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <tip.icon size={24} color="#6366f1" />
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                      {tip.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {tip.description}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
