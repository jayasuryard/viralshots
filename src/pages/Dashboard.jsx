import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, AppBar, Toolbar, Typography, Button, Container, Stack } from '@mui/material';
import { LogOut, Sparkles } from 'lucide-react';
import VideoCreator from '../components/VideoCreator';
import VideoGallery from '../components/VideoGallery';
import CreditDisplay from '../components/CreditDisplay';
import { useAuth } from '../hooks/useAuth';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [refreshGallery, setRefreshGallery] = useState(0);
  const navigate = useNavigate();
  
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, rgba(243, 232, 255, 0.3) 50%, rgba(239, 246, 255, 0.3) 100%)',
      }}
    >
      {/* Header */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid',
          borderColor: 'grey.100',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ py: 1 }}>
            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ flexGrow: 1 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 2,
                }}
              >
                <Sparkles size={24} color="white" />
              </Box>
              <Typography
                variant="h5"
                fontWeight="bold"
                sx={{
                  background: 'linear-gradient(135deg, #4f46e5 0%, #9333ea 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                ViralShots
              </Typography>
            </Stack>
            
            <Stack direction="row" spacing={1.5} alignItems="center">
              <CreditDisplay credits={user?.credits || 0} />
              <Button
                onClick={logout}
                startIcon={<LogOut size={16} />}
                sx={{
                  color: 'text.secondary',
                  '&:hover': {
                    bgcolor: 'grey.100',
                    color: 'text.primary',
                  },
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 500,
                }}
                aria-label="Logout"
              >
                <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                  Logout
                </Box>
              </Button>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
      
      {/* Main Content */}
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <VideoCreator onSuccess={() => setRefreshGallery(r => r + 1)} />
        <VideoGallery refreshKey={refreshGallery} />
      </Container>
    </Box>
  );
}
