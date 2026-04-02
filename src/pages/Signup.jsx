import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Alert, 
  Link,
  Paper,
  Stack,
  Chip
} from '@mui/material';
import { Sparkles, Mail, Lock, AlertCircle, Gift, ArrowRight } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();
  
  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      setLoading(false);
      return;
    }
    
    try {
      const data = await signup(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #f97316 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated Background Elements */}
      <Box sx={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <Box
          sx={{
            position: 'absolute',
            top: '25%',
            left: '25%',
            width: 384,
            height: 384,
            bgcolor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
            filter: 'blur(80px)',
            animation: 'pulse 2s infinite',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '25%',
            right: '25%',
            width: 384,
            height: 384,
            bgcolor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
            filter: 'blur(80px)',
            animation: 'pulse 2s infinite',
            animationDelay: '1s',
          }}
        />
      </Box>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ width: '100%', maxWidth: 448, position: 'relative', zIndex: 10 }}
      >
        <Paper
          elevation={6}
          sx={{
            p: { xs: 4, sm: 5 },
            borderRadius: 4,
            bgcolor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          }}
        >
          <Stack spacing={3} alignItems="center" sx={{ mb: 4 }}>
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: 3,
                background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 2,
              }}
            >
              <Sparkles size={32} color="white" />
            </Box>
            <Typography variant="h4" fontWeight="bold" color="text.primary">
              Create Account
            </Typography>
            <Chip
              icon={<Gift size={16} color="#059669" />}
              label="Get 1 free video to start!"
              sx={{
                background: 'linear-gradient(135deg, #dcfce7 0%, #d1fae5 100%)',
                border: '2px solid #86efac',
                color: '#047857',
                fontWeight: 600,
                fontSize: '0.875rem',
              }}
            />
            <Link
              component={RouterLink}
              to="/"
              sx={{
                textDecoration: 'none',
                color: 'primary.main',
                fontWeight: 600,
                fontSize: '0.9rem',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              ← Back to Home
            </Link>
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
            <Stack spacing={2.5}>
              <Box>
                <Typography 
                  variant="body2" 
                  fontWeight={600} 
                  color="text.primary"
                  sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}
                >
                  <Mail size={16} color="#6366f1" />
                  Email
                </Typography>
                <TextField
                  fullWidth
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  variant="outlined"
                />
              </Box>
              
              <Box>
                <Typography 
                  variant="body2" 
                  fontWeight={600} 
                  color="text.primary"
                  sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}
                >
                  <Lock size={16} color="#6366f1" />
                  Password
                </Typography>
                <TextField
                  fullWidth
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  variant="outlined"
                  inputProps={{ minLength: 8 }}
                  helperText="Minimum 8 characters"
                />
              </Box>
              
              <Button
                type="submit"
                fullWidth
                disabled={loading}
                variant="contained"
                size="large"
                endIcon={!loading && <ArrowRight size={20} />}
                sx={{
                  py: 1.75,
                  mt: 1,
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
                {loading ? 'Creating account...' : 'Create Account'}
              </Button>
            </Stack>
          </Box>
          
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 3 }}>
            Already have an account?{' '}
            <Link 
              component={RouterLink} 
              to="/login" 
              fontWeight={600}
              sx={{ 
                color: 'primary.main',
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' }
              }}
            >
              Sign in
            </Link>
          </Typography>
        </Paper>
      </motion.div>
    </Box>
  );
}
