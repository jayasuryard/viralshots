import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  Typography,
  Alert,
  Stack,
  Paper,
  FormHelperText,
  InputLabel
} from '@mui/material';
import { Video, Sparkles, Link as LinkIcon, Bell, AlertCircle } from 'lucide-react';
import apiClient from '../api/client';
import JobProgress from './JobProgress';

export default function VideoCreator({ onSuccess }) {
  const [url, setUrl] = useState('');
  const [videoLength, setVideoLength] = useState('medium');
  const [webhookUrl, setWebhookUrl] = useState('');
  const [jobId, setJobId] = useState(null);
  const [videoId, setVideoId] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const { data } = await apiClient.post('/videos/create', {
        url,
        videoLength,
        webhookUrl: webhookUrl || undefined,
      });
      
      setJobId(data.jobId);
      setVideoId(data.videoId);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create video');
      setLoading(false);
    }
  }
  
  function handleReset() {
    setUrl('');
    setVideoLength('medium');
    setWebhookUrl('');
    setJobId(null);
    setVideoId(null);
    setError('');
    setLoading(false);
  }
  
  if (jobId) {
    return (
      <JobProgress 
        jobId={jobId} 
        videoId={videoId}
        onComplete={() => {
          onSuccess();
          handleReset();
        }}
        onReset={handleReset}
      />
    );
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Paper
        elevation={2}
        sx={{
          p: { xs: 3, sm: 4 },
          mb: 4,
          borderRadius: 3,
          bgcolor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(8px)',
          border: '1px solid',
          borderColor: 'grey.100',
          transition: 'box-shadow 0.3s ease-in-out',
          '&:hover': {
            boxShadow: 4,
          },
        }}
      >
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 3 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 2,
            }}
          >
            <Video size={24} color="white" />
          </Box>
          <Box>
            <Typography variant="h5" fontWeight="bold">
              Create Your Viral Video
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Transform any SaaS website into engaging content
            </Typography>
          </Box>
        </Stack>
        
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Alert
              severity="error"
              icon={<AlertCircle size={20} />}
              sx={{ mb: 3, borderRadius: 2 }}
            >
              {error}
            </Alert>
          </motion.div>
        )}
        
        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <Box>
              <Typography
                variant="body2"
                fontWeight={600}
                sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}
              >
                <LinkIcon size={16} color="#6366f1" />
                SaaS URL
              </Typography>
              <TextField
                fullWidth
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://linear.app"
                required
                disabled={loading}
                helperText="Enter any public SaaS website URL"
              />
            </Box>
            
            <Box>
              <Typography
                variant="body2"
                fontWeight={600}
                sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}
              >
                <Sparkles size={16} color="#a855f7" />
                Video Length
              </Typography>
              <FormControl fullWidth>
                <Select
                  value={videoLength}
                  onChange={(e) => setVideoLength(e.target.value)}
                  disabled={loading}
                >
                  <MenuItem value="short">Short (30-45s)</MenuItem>
                  <MenuItem value="medium">Medium (60s) - Recommended</MenuItem>
                  <MenuItem value="long">Long (90s)</MenuItem>
                </Select>
              </FormControl>
            </Box>
            
            <Box>
              <Typography
                variant="body2"
                fontWeight={600}
                sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}
              >
                <Bell size={16} color="#f97316" />
                Webhook URL
                <Typography variant="caption" color="text.secondary" fontWeight={400}>
                  (Optional)
                </Typography>
              </Typography>
              <TextField
                fullWidth
                type="url"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                placeholder="https://your-api.com/webhook"
                disabled={loading}
                helperText="Get notified when your video is ready"
              />
            </Box>
            
            <Button
              type="submit"
              fullWidth
              disabled={loading}
              variant="contained"
              size="large"
              startIcon={<Video size={20} />}
              sx={{
                py: 1.75,
                fontWeight: 700,
                fontSize: '1rem',
                background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #4f46e5 0%, #9333ea 100%)',
                  transform: 'scale(1.02)',
                },
                '&:active': {
                  transform: 'scale(0.98)',
                },
                transition: 'all 0.2s ease-in-out',
              }}
            >
              {loading ? 'Starting Generation...' : 'Generate Video (1 Credit)'}
            </Button>
          </Stack>
        </Box>
      </Paper>
    </motion.div>
  );
}
