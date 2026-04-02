import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  Stack,
  Grid,
  Paper,
  Avatar,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
  Chip,
  Divider,
} from '@mui/material';
import {
  Sparkles,
  ArrowRight,
  Link as LinkIcon,
  Video,
  Zap,
  TrendingUp,
  Users,
  Shield,
  CheckCircle2,
  Star,
  Mail,
  Twitter,
  Linkedin,
  Github,
  Play,
  Clock,
  Target,
  Award,
} from 'lucide-react';
import dashboardImage from '../assets/dashboard.png';

export default function Landing() {
  const navigate = useNavigate();
  const [url, setUrl] = useState('');
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  const handleGetStarted = () => {
    if (url) {
      // Store URL in sessionStorage to pass to dashboard
      sessionStorage.setItem('pendingUrl', url);
      navigate('/dashboard');
    } else {
      navigate('/dashboard');
    }
  };

  const handleSignIn = () => {
    navigate('/login');
  };

  const features = [
    {
      icon: Video,
      title: 'AI-Powered Video Creation',
      description: 'Transform any website into engaging viral videos in minutes using advanced AI',
      color: '#6366f1',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Generate professional videos in under 60 seconds with our optimized pipeline',
      color: '#a855f7',
    },
    {
      icon: TrendingUp,
      title: 'Viral Optimization',
      description: 'AI-driven viral score analysis ensures maximum engagement potential',
      color: '#f97316',
    },
    {
      icon: Users,
      title: 'Multi-Platform Ready',
      description: 'Perfect format for Instagram, TikTok, YouTube Shorts, and more',
      color: '#10b981',
    },
  ];

  const plans = [
    {
      name: 'Starter',
      price: '$29',
      period: '/month',
      description: 'Perfect for individuals and small projects',
      features: [
        '10 videos per month',
        'HD quality exports',
        'Basic analytics',
        'Email support',
        'Watermark removal',
      ],
      popular: false,
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    {
      name: 'Professional',
      price: '$79',
      period: '/month',
      description: 'Ideal for content creators and marketers',
      features: [
        '50 videos per month',
        '4K quality exports',
        'Advanced analytics',
        'Priority support',
        'Custom branding',
        'API access',
        'Webhook notifications',
      ],
      popular: true,
      color: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
    },
    {
      name: 'Enterprise',
      price: '$299',
      period: '/month',
      description: 'For agencies and large teams',
      features: [
        'Unlimited videos',
        '8K quality exports',
        'Real-time analytics',
        '24/7 dedicated support',
        'White-label solution',
        'Custom AI training',
        'Advanced API features',
        'Team management',
      ],
      popular: false,
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Content Creator',
      avatar: 'SJ',
      content:
        'ViralShots transformed my content strategy. I create 10x more engaging videos in half the time!',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'Marketing Director',
      avatar: 'MC',
      content:
        'The AI-powered viral score is incredibly accurate. Our engagement rates increased by 300%.',
      rating: 5,
    },
    {
      name: 'Emily Rodriguez',
      role: 'Social Media Manager',
      avatar: 'ER',
      content:
        'Best investment for our agency. The quality and speed are unmatched in the industry.',
      rating: 5,
    },
  ];

  const stats = [
    { value: '10M+', label: 'Videos Created' },
    { value: '500K+', label: 'Happy Users' },
    { value: '99.9%', label: 'Uptime' },
    { value: '4.9/5', label: 'User Rating' },
  ];

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', overflow: 'hidden' }}>
      {/* Navigation */}
      <Box
        component="nav"
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          bgcolor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid',
          borderColor: 'rgba(0, 0, 0, 0.05)',
        }}
      >
        <Container maxWidth="lg">
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ py: 2 }}
          >
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
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

            <Stack direction="row" spacing={2} alignItems="center" sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Button
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                sx={{ color: 'text.secondary', textTransform: 'none', fontWeight: 500 }}
              >
                Features
              </Button>
              <Button
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                sx={{ color: 'text.secondary', textTransform: 'none', fontWeight: 500 }}
              >
                Pricing
              </Button>
              <Button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                sx={{ color: 'text.secondary', textTransform: 'none', fontWeight: 500 }}
              >
                Contact
              </Button>
              <Button
                onClick={handleSignIn}
                variant="outlined"
                sx={{
                  textTransform: 'none',
                  fontWeight: 600,
                  borderRadius: 2,
                  borderColor: 'primary.main',
                  color: 'primary.main',
                  px: 3,
                }}
              >
                Sign In
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* Hero Section */}
      <Box
        component={motion.div}
        style={{ opacity, scale }}
        sx={{
          pt: { xs: 15, md: 20 },
          pb: { xs: 8, md: 12 },
          background: 'linear-gradient(180deg, #f8fafc 0%, rgba(243, 232, 255, 0.3) 50%, rgba(239, 246, 255, 0.3) 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Animated background elements */}
        <Box
          component={motion.div}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          sx={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <Box
          component={motion.div}
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
          sx={{
            position: 'absolute',
            bottom: -100,
            left: -100,
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative' }}>
          <Stack spacing={6} alignItems="center" textAlign="center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Chip
                icon={<Award size={16} />}
                label="🎉 New: AI Voice Models + Advanced Editing"
                sx={{
                  bgcolor: 'rgba(99, 102, 241, 0.1)',
                  color: 'primary.main',
                  fontWeight: 600,
                  px: 1,
                  '& .MuiChip-icon': { color: 'primary.main' },
                }}
              />
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                  fontWeight: 800,
                  lineHeight: 1.1,
                  mb: 3,
                  background: 'linear-gradient(135deg, #1e293b 0%, #4f46e5 50%, #9333ea 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Turn Any Website Into
                <br />
                Viral Video Content
              </Typography>
            </motion.div>

            {/* Subheading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Typography
                variant="h5"
                color="text.secondary"
                sx={{ maxWidth: 700, fontSize: { xs: '1.1rem', md: '1.3rem' }, fontWeight: 400 }}
              >
                AI-powered platform that transforms URLs into engaging videos in seconds.
                Perfect for social media, marketing, and content creation.
              </Typography>
            </motion.div>

            {/* Input Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{ width: '100%', maxWidth: 600 }}
            >
              <Paper
                elevation={8}
                sx={{
                  p: 1,
                  borderRadius: 3,
                  bgcolor: 'white',
                  border: '2px solid',
                  borderColor: 'primary.main',
                  boxShadow: '0 10px 40px rgba(99, 102, 241, 0.2)',
                }}
              >
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                  <TextField
                    fullWidth
                    placeholder="Enter website URL (e.g., https://example.com)"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
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
                        '& fieldset': { border: 'none' },
                      },
                    }}
                  />
                  <Button
                    variant="contained"
                    size="large"
                    endIcon={<ArrowRight size={20} />}
                    onClick={handleGetStarted}
                    sx={{
                      background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                      color: 'white',
                      px: 4,
                      py: 1.5,
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 700,
                      fontSize: '1rem',
                      whiteSpace: 'nowrap',
                      boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #4f46e5 0%, #9333ea 100%)',
                        boxShadow: '0 6px 16px rgba(99, 102, 241, 0.5)',
                      },
                    }}
                  >
                    Get Started Free
                  </Button>
                </Stack>
              </Paper>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                🎁 No credit card required • Start with 3 free videos
              </Typography>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              style={{ width: '100%' }}
            >
              <Grid container spacing={4} sx={{ mt: 4 }}>
                {stats.map((stat, index) => (
                  <Grid item xs={6} md={3} key={index}>
                    <Stack spacing={0.5} alignItems="center">
                      <Typography
                        variant="h3"
                        fontWeight="bold"
                        sx={{
                          background: 'linear-gradient(135deg, #4f46e5 0%, #9333ea 100%)',
                          backgroundClip: 'text',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }}
                      >
                        {stat.value}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" fontWeight={500}>
                        {stat.label}
                      </Typography>
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            </motion.div>

            {/* Dashboard Mockup */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              style={{ width: '100%', maxWidth: 1000 }}
            >
              <Box
                sx={{
                  position: 'relative',
                  borderRadius: 4,
                  overflow: 'hidden',
                  boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
                  border: '8px solid white',
                  background: 'white',
                  mt: 6,
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    paddingTop: '56.25%', // 16:9 aspect ratio
                    bgcolor: '#f8fafc',
                  }}
                >
                  <Box
                    component="img"
                    src={dashboardImage}
                    alt="ViralShots Dashboard"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  {/* Play button overlay */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <IconButton
                      sx={{
                        width: 80,
                        height: 80,
                        bgcolor: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(10px)',
                        '&:hover': {
                          bgcolor: 'white',
                          transform: 'scale(1.1)',
                        },
                        transition: 'all 0.3s ease',
                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
                      }}
                    >
                      <Play size={36} fill="#6366f1" color="#6366f1" />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </motion.div>
          </Stack>
        </Container>
      </Box>

      {/* Features Section */}
      <Box
        id="features"
        sx={{
          py: { xs: 8, md: 12 },
          bgcolor: 'white',
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={2} alignItems="center" textAlign="center" sx={{ mb: 8 }}>
            <Chip
              label="FEATURES"
              size="small"
              sx={{
                bgcolor: 'rgba(99, 102, 241, 0.1)',
                color: 'primary.main',
                fontWeight: 700,
                letterSpacing: 1,
              }}
            />
            <Typography variant="h2" fontWeight="bold">
              Everything You Need to Go Viral
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600 }}>
              Powerful features designed to help you create scroll-stopping content
            </Typography>
          </Stack>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      borderRadius: 3,
                      border: '1px solid',
                      borderColor: 'grey.100',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)',
                        borderColor: feature.color,
                      },
                    }}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <Box
                        sx={{
                          width: 56,
                          height: 56,
                          borderRadius: 2,
                          background: `linear-gradient(135deg, ${feature.color}20 0%, ${feature.color}10 100%)`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mb: 3,
                        }}
                      >
                        <feature.icon size={28} color={feature.color} />
                      </Box>
                      <Typography variant="h6" fontWeight="bold" gutterBottom>
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          {/* Additional Features */}
          <Box sx={{ mt: 8 }}>
            <Grid container spacing={3}>
              {[
                { icon: Clock, text: 'Generate videos in under 60 seconds' },
                { icon: Target, text: 'AI-powered viral score prediction' },
                { icon: Shield, text: 'Enterprise-grade security & privacy' },
                { icon: CheckCircle2, text: 'No watermarks on paid plans' },
              ].map((item, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: 1.5,
                        bgcolor: 'rgba(99, 102, 241, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <item.icon size={20} color="#6366f1" />
                    </Box>
                    <Typography variant="body2" fontWeight={500}>
                      {item.text}
                    </Typography>
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>

      {/* About Section */}
      <Box
        id="about"
        sx={{
          py: { xs: 8, md: 12 },
          background: 'linear-gradient(180deg, #f8fafc 0%, white 100%)',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                <Chip
                  label="ABOUT US"
                  size="small"
                  sx={{
                    bgcolor: 'rgba(168, 85, 247, 0.1)',
                    color: 'secondary.main',
                    fontWeight: 700,
                    letterSpacing: 1,
                    width: 'fit-content',
                  }}
                />
                <Typography variant="h2" fontWeight="bold">
                  Empowering Creators Worldwide
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                  ViralShots was born from a simple idea: make professional video creation
                  accessible to everyone. Our AI-powered platform has helped over 500,000
                  creators, marketers, and businesses transform their content strategy.
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                  We believe that great content shouldn't require expensive equipment or technical
                  expertise. With ViralShots, anyone can create scroll-stopping videos that drive
                  real engagement and results.
                </Typography>
                <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleGetStarted}
                    sx={{
                      background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                      color: 'white',
                      px: 4,
                      py: 1.5,
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 600,
                      boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #4f46e5 0%, #9333ea 100%)',
                      },
                    }}
                  >
                    Start Creating
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    sx={{
                      borderColor: 'primary.main',
                      color: 'primary.main',
                      px: 4,
                      py: 1.5,
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 600,
                      '&:hover': {
                        borderColor: 'primary.dark',
                        bgcolor: 'rgba(99, 102, 241, 0.05)',
                      },
                    }}
                  >
                    Watch Demo
                  </Button>
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: 'relative',
                  borderRadius: 4,
                  overflow: 'hidden',
                }}
              >
                <Grid container spacing={2}>
                  {[
                    { value: '500K+', label: 'Active Users', color: '#6366f1' },
                    { value: '10M+', label: 'Videos Created', color: '#a855f7' },
                    { value: '150+', label: 'Countries', color: '#f97316' },
                    { value: '99.9%', label: 'Satisfaction', color: '#10b981' },
                  ].map((stat, index) => (
                    <Grid item xs={6} key={index}>
                      <Paper
                        elevation={2}
                        sx={{
                          p: 4,
                          borderRadius: 3,
                          textAlign: 'center',
                          background: `linear-gradient(135deg, ${stat.color}15 0%, ${stat.color}05 100%)`,
                          border: '1px solid',
                          borderColor: `${stat.color}30`,
                        }}
                      >
                        <Typography
                          variant="h3"
                          fontWeight="bold"
                          sx={{
                            background: `linear-gradient(135deg, ${stat.color} 0%, ${stat.color}CC 100%)`,
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            mb: 1,
                          }}
                        >
                          {stat.value}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" fontWeight={500}>
                          {stat.label}
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Testimonials */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'white' }}>
        <Container maxWidth="lg">
          <Stack spacing={2} alignItems="center" textAlign="center" sx={{ mb: 8 }}>
            <Chip
              label="TESTIMONIALS"
              size="small"
              sx={{
                bgcolor: 'rgba(16, 185, 129, 0.1)',
                color: 'success.main',
                fontWeight: 700,
                letterSpacing: 1,
              }}
            />
            <Typography variant="h2" fontWeight="bold">
              Loved by Creators Worldwide
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600 }}>
              See what our community has to say about ViralShots
            </Typography>
          </Stack>

          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      borderRadius: 3,
                      border: '1px solid',
                      borderColor: 'grey.100',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
                      },
                    }}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <Stack spacing={3}>
                        <Stack direction="row" spacing={0.5}>
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} size={18} fill="#f59e0b" color="#f59e0b" />
                          ))}
                        </Stack>
                        <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                          "{testimonial.content}"
                        </Typography>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Avatar
                            sx={{
                              width: 48,
                              height: 48,
                              bgcolor: 'primary.main',
                              fontWeight: 700,
                            }}
                          >
                            {testimonial.avatar}
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle1" fontWeight={600}>
                              {testimonial.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {testimonial.role}
                            </Typography>
                          </Box>
                        </Stack>
                      </Stack>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Pricing Section */}
      <Box
        id="pricing"
        sx={{
          py: { xs: 8, md: 12 },
          background: 'linear-gradient(180deg, #f8fafc 0%, white 100%)',
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={2} alignItems="center" textAlign="center" sx={{ mb: 8 }}>
            <Chip
              label="PRICING"
              size="small"
              sx={{
                bgcolor: 'rgba(249, 115, 22, 0.1)',
                color: 'accent.main',
                fontWeight: 700,
                letterSpacing: 1,
              }}
            />
            <Typography variant="h2" fontWeight="bold">
              Choose Your Plan
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600 }}>
              Start free, upgrade as you grow. All plans include a 14-day money-back guarantee.
            </Typography>
          </Stack>

          <Grid container spacing={4} alignItems="stretch">
            {plans.map((plan, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  style={{ height: '100%' }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      borderRadius: 4,
                      border: plan.popular ? '2px solid' : '1px solid',
                      borderColor: plan.popular ? 'primary.main' : 'grey.100',
                      position: 'relative',
                      transition: 'all 0.3s ease',
                      transform: plan.popular ? 'scale(1.05)' : 'scale(1)',
                      '&:hover': {
                        transform: plan.popular ? 'scale(1.08)' : 'scale(1.02)',
                        boxShadow: plan.popular
                          ? '0 20px 40px rgba(99, 102, 241, 0.3)'
                          : '0 12px 24px rgba(0, 0, 0, 0.1)',
                      },
                    }}
                  >
                    {plan.popular && (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: -12,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          bgcolor: 'primary.main',
                          color: 'white',
                          px: 3,
                          py: 0.5,
                          borderRadius: 2,
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          letterSpacing: 1,
                          boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)',
                        }}
                      >
                        MOST POPULAR
                      </Box>
                    )}
                    <CardContent sx={{ p: 4 }}>
                      <Stack spacing={3}>
                        <Box>
                          <Typography variant="h5" fontWeight="bold" gutterBottom>
                            {plan.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {plan.description}
                          </Typography>
                        </Box>
                        <Box>
                          <Stack direction="row" alignItems="baseline" spacing={0.5}>
                            <Typography
                              variant="h2"
                              fontWeight="bold"
                              sx={{
                                background: plan.color,
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                              }}
                            >
                              {plan.price}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                              {plan.period}
                            </Typography>
                          </Stack>
                        </Box>
                        <Button
                          variant={plan.popular ? 'contained' : 'outlined'}
                          size="large"
                          fullWidth
                          onClick={handleGetStarted}
                          sx={{
                            py: 1.5,
                            borderRadius: 2,
                            textTransform: 'none',
                            fontWeight: 600,
                            ...(plan.popular
                              ? {
                                  background: plan.color,
                                  color: 'white',
                                  boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)',
                                  '&:hover': {
                                    boxShadow: '0 6px 16px rgba(99, 102, 241, 0.5)',
                                  },
                                }
                              : {
                                  borderColor: 'grey.300',
                                  color: 'text.primary',
                                  '&:hover': {
                                    borderColor: 'primary.main',
                                    bgcolor: 'rgba(99, 102, 241, 0.05)',
                                  },
                                }),
                          }}
                        >
                          {plan.popular ? 'Get Started' : 'Choose Plan'}
                        </Button>
                        <Divider />
                        <Stack spacing={2}>
                          {plan.features.map((feature, i) => (
                            <Stack direction="row" spacing={2} alignItems="flex-start" key={i}>
                              <CheckCircle2 size={20} color="#10b981" style={{ flexShrink: 0 }} />
                              <Typography variant="body2" color="text.secondary">
                                {feature}
                              </Typography>
                            </Stack>
                          ))}
                        </Stack>
                      </Stack>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Contact Section */}
      <Box
        id="contact"
        sx={{
          py: { xs: 8, md: 12 },
          bgcolor: 'white',
        }}
      >
        <Container maxWidth="md">
          <Stack spacing={2} alignItems="center" textAlign="center" sx={{ mb: 6 }}>
            <Chip
              label="CONTACT US"
              size="small"
              sx={{
                bgcolor: 'rgba(99, 102, 241, 0.1)',
                color: 'primary.main',
                fontWeight: 700,
                letterSpacing: 1,
              }}
            />
            <Typography variant="h2" fontWeight="bold">
              Get In Touch
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 500 }}>
              Have questions? We'd love to hear from you. Send us a message and we'll respond as
              soon as possible.
            </Typography>
          </Stack>

          <Paper
            elevation={4}
            sx={{
              p: 4,
              borderRadius: 4,
              border: '1px solid',
              borderColor: 'grey.100',
            }}
          >
            <Stack spacing={3}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    placeholder="John"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    placeholder="Doe"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      },
                    }}
                  />
                </Grid>
              </Grid>
              <TextField
                fullWidth
                label="Email"
                type="email"
                placeholder="john@example.com"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Mail size={20} color="#6366f1" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
              <TextField
                fullWidth
                label="Message"
                multiline
                rows={5}
                placeholder="Tell us how we can help you..."
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
              <Button
                variant="contained"
                size="large"
                fullWidth
                endIcon={<ArrowRight size={20} />}
                sx={{
                  background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                  color: 'white',
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '1rem',
                  boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #4f46e5 0%, #9333ea 100%)',
                    boxShadow: '0 6px 16px rgba(99, 102, 241, 0.5)',
                  },
                }}
              >
                Send Message
              </Button>
            </Stack>
          </Paper>

          {/* Social Links */}
          <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 6 }}>
            {[
              { icon: Twitter, color: '#1DA1F2' },
              { icon: Linkedin, color: '#0A66C2' },
              { icon: Github, color: '#181717' },
              { icon: Mail, color: '#EA4335' },
            ].map((social, index) => (
              <IconButton
                key={index}
                sx={{
                  bgcolor: `${social.color}15`,
                  color: social.color,
                  '&:hover': {
                    bgcolor: social.color,
                    color: 'white',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <social.icon size={20} />
              </IconButton>
            ))}
          </Stack>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          py: 6,
          bgcolor: '#0f172a',
          color: 'white',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Stack spacing={2}>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: 2,
                      background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Sparkles size={20} color="white" />
                  </Box>
                  <Typography variant="h6" fontWeight="bold">
                    ViralShots
                  </Typography>
                </Stack>
                <Typography variant="body2" color="grey.400" sx={{ maxWidth: 300 }}>
                  Transform any website into viral video content with AI-powered automation.
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={8}>
              <Grid container spacing={4}>
                <Grid item xs={6} sm={3}>
                  <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                    Product
                  </Typography>
                  <Stack spacing={1}>
                    {['Features', 'Pricing', 'Demo', 'API'].map((item) => (
                      <Typography
                        key={item}
                        variant="body2"
                        color="grey.400"
                        sx={{
                          cursor: 'pointer',
                          '&:hover': { color: 'white' },
                        }}
                      >
                        {item}
                      </Typography>
                    ))}
                  </Stack>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                    Company
                  </Typography>
                  <Stack spacing={1}>
                    {['About', 'Blog', 'Careers', 'Press'].map((item) => (
                      <Typography
                        key={item}
                        variant="body2"
                        color="grey.400"
                        sx={{
                          cursor: 'pointer',
                          '&:hover': { color: 'white' },
                        }}
                      >
                        {item}
                      </Typography>
                    ))}
                  </Stack>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                    Resources
                  </Typography>
                  <Stack spacing={1}>
                    {['Documentation', 'Tutorials', 'Support', 'FAQ'].map((item) => (
                      <Typography
                        key={item}
                        variant="body2"
                        color="grey.400"
                        sx={{
                          cursor: 'pointer',
                          '&:hover': { color: 'white' },
                        }}
                      >
                        {item}
                      </Typography>
                    ))}
                  </Stack>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                    Legal
                  </Typography>
                  <Stack spacing={1}>
                    {['Privacy', 'Terms', 'Security', 'Cookies'].map((item) => (
                      <Typography
                        key={item}
                        variant="body2"
                        color="grey.400"
                        sx={{
                          cursor: 'pointer',
                          '&:hover': { color: 'white' },
                        }}
                      >
                        {item}
                      </Typography>
                    ))}
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <Typography variant="body2" color="grey.400">
              © 2026 ViralShots. All rights reserved.
            </Typography>
            <Stack direction="row" spacing={1}>
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item, index) => (
                <Typography
                  key={item}
                  variant="caption"
                  color="grey.400"
                  sx={{
                    cursor: 'pointer',
                    '&:hover': { color: 'white' },
                    '&:not(:last-child)::after': {
                      content: '"•"',
                      marginLeft: 8,
                    },
                  }}
                >
                  {item}
                </Typography>
              ))}
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
