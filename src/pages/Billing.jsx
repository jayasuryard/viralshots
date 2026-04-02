import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Stack,
  Chip
} from '@mui/material';
import apiClient from '../api/client';
import { useAuth } from '../hooks/useAuth';

const PACKAGES = [
  { id: '10', credits: 10, price: 9, popular: false },
  { id: '50', credits: 50, price: 39, popular: true },
  { id: '100', credits: 100, price: 69, popular: false },
];

export default function Billing() {
  const { user, fetchUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  async function handlePurchase(pkg) {
    setLoading(true);
    
    try {
      // Create Razorpay order
      const { data } = await apiClient.post('/payments/create-order', {
        package: pkg.id,
      });
      
      // Load Razorpay script if not already loaded
      if (!window.Razorpay) {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
        
        await new Promise((resolve) => {
          script.onload = resolve;
        });
      }
      
      // Open Razorpay checkout
      const options = {
        key: data.keyId,
        amount: data.amount,
        currency: 'INR',
        order_id: data.orderId,
        name: 'ViralShots',
        description: `${pkg.credits} Video Credits`,
        image: '/vite.svg',
        handler: async function (response) {
          try {
            // Verify payment
            await apiClient.post('/payments/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            
            // Refresh user credits
            await fetchUser();
            
            alert(`Payment successful! ${pkg.credits} credits added to your account.`);
            navigate('/dashboard');
          } catch (error) {
            alert('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          email: user?.email || '',
        },
        theme: {
          color: '#6366f1',
        },
      };
      
      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response) {
        alert('Payment failed. Please try again.');
      });
      
      rzp.open();
    } catch (error) {
      alert('Failed to create order. Please try again.');
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50', py: 6 }}>
      <Container maxWidth="xl">
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
        
        <Stack spacing={2} alignItems="center" sx={{ mb: 6, textAlign: 'center' }}>
          <Typography variant="h3" fontWeight="bold">
            Buy Credits
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Choose a package and start creating viral videos
          </Typography>
          {user && (
            <Typography variant="body1" fontWeight={600} color="primary.main">
              Current balance: {user.credits} credits
            </Typography>
          )}
        </Stack>
        
        <Grid container spacing={4} sx={{ maxWidth: 1200, mx: 'auto', mb: 6 }}>
          {PACKAGES.map((pkg) => (
            <Grid item xs={12} md={4} key={pkg.id}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card
                  sx={{
                    position: 'relative',
                    p: 4,
                    borderRadius: 3,
                    boxShadow: 4,
                    border: pkg.popular ? '4px solid' : 'none',
                    borderColor: pkg.popular ? 'primary.main' : 'transparent',
                  }}
                >
                  {pkg.popular && (
                    <Chip
                      label="Most Popular"
                      sx={{
                        position: 'absolute',
                        top: -16,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                        color: 'white',
                        fontWeight: 600,
                        px: 2,
                      }}
                    />
                  )}
                  
                  <CardContent sx={{ textAlign: 'center', p: 0 }}>
                    <Typography
                      variant="h2"
                      fontWeight="bold"
                      sx={{
                        mb: 1,
                        background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {pkg.credits}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" fontWeight={500} sx={{ mb: 3 }}>
                      Video Credits
                    </Typography>
                    
                    <Typography variant="h3" fontWeight="bold" sx={{ mb: 1 }}>
                      ₹{pkg.price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                      ₹{(pkg.price / pkg.credits).toFixed(1)} per video
                    </Typography>
                    
                    <Button
                      onClick={() => handlePurchase(pkg)}
                      disabled={loading}
                      fullWidth
                      size="large"
                      variant="contained"
                      sx={{
                        py: 1.75,
                        fontWeight: 700,
                        fontSize: '1.125rem',
                        borderRadius: 2,
                        ...(pkg.popular
                          ? {
                              background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                              '&:hover': {
                                background: 'linear-gradient(135deg, #4f46e5 0%, #9333ea 100%)',
                              },
                            }
                          : {
                              bgcolor: 'grey.200',
                              color: 'text.primary',
                              '&:hover': {
                                bgcolor: 'grey.300',
                              },
                            }),
                      }}
                    >
                      {loading ? 'Processing...' : 'Purchase Now'}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
        
        <Paper
          sx={{
            maxWidth: 800,
            mx: 'auto',
            p: 4,
            borderRadius: 3,
          }}
        >
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
            Why Buy Credits?
          </Typography>
          <Stack spacing={2}>
            <Stack direction="row" spacing={2} alignItems="flex-start">
              <Typography variant="h4">🎬</Typography>
              <Typography variant="body1" color="text.secondary">
                Generate professional demo videos in minutes
              </Typography>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="flex-start">
              <Typography variant="h4">🤖</Typography>
              <Typography variant="body1" color="text.secondary">
                AI-powered scripts and voiceovers
              </Typography>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="flex-start">
              <Typography variant="h4">📊</Typography>
              <Typography variant="body1" color="text.secondary">
                Get viral potential scores and improvement tips
              </Typography>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="flex-start">
              <Typography variant="h4">💾</Typography>
              <Typography variant="body1" color="text.secondary">
                Credits never expire - use them anytime
              </Typography>
            </Stack>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
