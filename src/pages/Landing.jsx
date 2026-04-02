import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';
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
  Shield,
  CheckCircle2,
  Star,
  Mail,
  MessageCircle,
  Share2,
  Globe,
  Play,
  Target,
  Award,
  Code2,
  Layers,
  Wand2,
  ChevronRight,
  Monitor,
  Smartphone,
  BarChart3,
  Rocket,
  Flame,
  Gamepad2,
  Radio,
  Crown,
} from 'lucide-react';

// Import landing components
import {
  ScrollProgress,
  CustomCursor,
  ParticlesBackground,
  FloatingOrb,
  HexGrid,
  GsapReveal,
  DashboardMockup,
  DynamicUpdatesCarousel,
  SectionHeader,
  staggerContainer,
  staggerItem,
} from '../components/landing';

gsap.registerPlugin(ScrollTrigger);

export default function Landing() {
  const navigate = useNavigate();
  const [url, setUrl] = useState('');
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const navBg = useTransform(scrollYProgress, [0, 0.02], ['rgba(9,9,11,0)', 'rgba(9,9,11,0.95)']);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  // GSAP hero timeline
  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      tl.fromTo('.hero-badge', { y: 40, opacity: 0, scale: 0.8 }, { y: 0, opacity: 1, scale: 1, duration: 0.8 })
        .fromTo('.hero-title', { y: 100, opacity: 0, rotateX: 20 }, { y: 0, opacity: 1, rotateX: 0, duration: 1.2 }, '-=0.4')
        .fromTo('.hero-sub', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, '-=0.6')
        .fromTo('.hero-input', { y: 50, opacity: 0, scale: 0.92 }, { y: 0, opacity: 1, scale: 1, duration: 1 }, '-=0.4')
        .fromTo('.hero-trust', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.3');
    },
    { scope: heroRef }
  );

  const handleGetStarted = () => {
    if (url) sessionStorage.setItem('pendingUrl', url);
    navigate('/dashboard');
  };

  const features = [
    {
      icon: Wand2,
      title: 'AI Video Engine',
      description: 'Drop a URL. Get battle-ready content. AI reads, scripts, voices, and edits in 60 seconds.',
      color: '#facc15',
      gradient: 'linear-gradient(135deg, rgba(250,204,21,0.15), rgba(250,204,21,0.05))',
    },
    {
      icon: Zap,
      title: 'Ship in 60 Seconds',
      description: 'From URL to viral ammunition. No timelines. No editing war rooms.',
      color: '#3b82f6',
      gradient: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(59,130,246,0.05))',
    },
    {
      icon: BarChart3,
      title: 'Viral Score Intel',
      description: 'Predictive engagement scoring. Know what dominates before deployment.',
      color: '#10b981',
      gradient: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05))',
    },
    {
      icon: Code2,
      title: 'Built for Devs',
      description: 'REST API, webhooks, programmatic gen. Full tactical control.',
      color: '#ef4444',
      gradient: 'linear-gradient(135deg, rgba(239,68,68,0.15), rgba(239,68,68,0.05))',
    },
    {
      icon: Layers,
      title: 'Multi-Platform',
      description: 'One-click export for TikTok, Reels, Shorts, Stories. All battlefields.',
      color: '#a855f7',
      gradient: 'linear-gradient(135deg, rgba(168,85,247,0.15), rgba(168,85,247,0.05))',
    },
    {
      icon: Shield,
      title: 'Enterprise Fortress',
      description: 'SOC2 compliant. Military-grade encryption. Your data stays locked down.',
      color: '#06b6d4',
      gradient: 'linear-gradient(135deg, rgba(6,182,212,0.15), rgba(6,182,212,0.05))',
    },
  ];

  const plans = [
    { name: 'Indie', price: '$29', period: '/mo', description: 'For solo builders shipping fast', features: ['10 videos/month', '1080p exports', 'API access', 'Email support', 'Basic analytics'], cta: 'Start Building', popular: false },
    { name: 'Pro', price: '$79', period: '/mo', description: 'For creators & growing teams', features: ['50 videos/month', '4K exports', 'Priority API', 'Webhooks', 'Advanced analytics', 'Custom branding', 'Priority support'], cta: 'Go Pro', popular: true },
    { name: 'Scale', price: '$299', period: '/mo', description: 'For agencies & products at scale', features: ['Unlimited videos', '8K exports', 'Dedicated API', 'White-label', 'Custom AI training', 'Team seats', '24/7 SLA', 'SSO & SAML'], cta: 'Talk to Sales', popular: false },
  ];

  const testimonials = [
    { name: 'Alex Rivera', role: 'Indie Hacker @shipfast', avatar: 'AR', text: 'I killed my entire social media workflow and replaced it with ViralShots. 10x output, zero editing skills needed.', rating: 5 },
    { name: 'Priya Sharma', role: 'Head of Growth, Launchpad', avatar: 'PS', text: 'Our content engagement went up 340% in 3 weeks. The viral score prediction is scarily accurate.', rating: 5 },
    { name: 'Marcus Chen', role: 'YouTube Creator, 500K subs', avatar: 'MC', text: 'I repurpose every blog post into Shorts with one click. This is the missing tool every creator needs.', rating: 5 },
  ];

  return (
    <Box sx={{ bgcolor: '#000', color: 'white', minHeight: '100vh', overflow: 'hidden', position: 'relative' }}>
      <ScrollProgress />
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <CustomCursor />
      </Box>

      {/* Noise Texture */}
      <Box
        sx={{
          position: 'fixed',
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          opacity: 0.03,
          pointerEvents: 'none',
          zIndex: 1,
          mixBlendMode: 'overlay',
        }}
      />

      {/* Navigation */}
      <Box
        component={motion.nav}
        style={{ backgroundColor: navBg }}
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backdropFilter: 'blur(24px) saturate(180%)',
          borderBottom: '1px solid rgba(250,204,21,0.1)',
          boxShadow: '0 4px 30px rgba(0,0,0,0.3), 0 0 20px rgba(250,204,21,0.05)',
        }}
      >
        <Container maxWidth="xl">
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ py: 2.5 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box
                sx={{
                  width: 42,
                  height: 42,
                  borderRadius: 2.5,
                  background: 'linear-gradient(135deg, #facc15 0%, #f59e0b 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 30px rgba(250,204,21,0.5), inset 0 1px 1px rgba(255,255,255,0.3)',
                  border: '1px solid rgba(250,204,21,0.3)',
                }}
              >
                <Sparkles size={22} color="#000" strokeWidth={2.5} />
              </Box>
              <Typography
                sx={{
                  fontSize: '1.35rem',
                  fontWeight: 900,
                  background: 'linear-gradient(135deg, #facc15 0%, #fff 50%, #facc15 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '-0.02em',
                  textShadow: '0 0 20px rgba(250,204,21,0.3)',
                }}
              >
                ViralShots
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1} sx={{ display: { xs: 'none', md: 'flex' } }}>
              {['Features', 'Pricing', 'About', 'Contact'].map((item) => (
                <Button
                  key={item}
                  onClick={() => document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
                  sx={{
                    color: 'rgba(255,255,255,0.7)',
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    '&:hover': { color: '#facc15', bgcolor: 'rgba(250,204,21,0.08)' },
                    borderRadius: 2,
                    px: 2.5,
                    py: 1,
                  }}
                >
                  {item}
                </Button>
              ))}
            </Stack>

            <Stack direction="row" spacing={2}>
              <Button onClick={() => navigate('/login')} sx={{ color: 'rgba(255,255,255,0.75)', textTransform: 'none', fontWeight: 600, display: { xs: 'none', sm: 'block' } }}>
                Log in
              </Button>
              <Button
                onClick={() => navigate('/signup')}
                variant="contained"
                endIcon={<Play size={16} />}
                sx={{
                  background: 'linear-gradient(135deg, #facc15 0%, #f59e0b 100%)',
                  color: '#000',
                  textTransform: 'none',
                  fontWeight: 800,
                  borderRadius: 2,
                  px: 4,
                  py: 1.3,
                  boxShadow: '0 0 25px rgba(250,204,21,0.5)',
                  '&:hover': { boxShadow: '0 0 40px rgba(250,204,21,0.8)', transform: 'translateY(-2px)' },
                }}
              >
                Enter Arena
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* Hero Section */}
      <Box
        ref={heroRef}
        sx={{
          position: 'relative',
          pt: { xs: 18, md: 24 },
          pb: { xs: 12, md: 18 },
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <HexGrid />
        <ParticlesBackground />
        <FloatingOrb size={700} color="rgba(250,204,21,0.15)" top="-10%" left="-10%" delay={0} blur={120} />
        <FloatingOrb size={600} color="rgba(59,130,246,0.12)" top="20%" left="65%" delay={2} blur={110} />
        <FloatingOrb size={500} color="rgba(239,68,68,0.1)" top="60%" left="10%" delay={4} blur={100} />

        {/* Light Streaks */}
        <Box component={motion.div} animate={{ x: ['-100%', '200%'] }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }} sx={{ position: 'absolute', top: '20%', left: 0, width: '200px', height: '2px', background: 'linear-gradient(90deg, transparent, rgba(250,204,21,0.8), transparent)', transform: 'rotate(-15deg)', filter: 'blur(1px)' }} />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Stack spacing={7} alignItems="center" textAlign="center">
            <Box className="hero-badge" sx={{ opacity: 0 }}>
              <Chip icon={<Gamepad2 size={16} />} label="SEASON 2 • NOW LIVE • AI VOICE CLONING 2.0" sx={{ bgcolor: 'rgba(250,204,21,0.12)', color: '#fde047', fontWeight: 800, fontSize: '0.75rem', letterSpacing: 2, border: '1px solid rgba(250,204,21,0.3)', boxShadow: '0 0 20px rgba(250,204,21,0.2)', px: 2, py: 3 }} />
            </Box>

            <Box className="hero-title" sx={{ opacity: 0 }}>
              <Typography component="h1" sx={{ fontSize: { xs: '3.5rem', md: '7.5rem' }, fontWeight: 900, lineHeight: 0.95, letterSpacing: '-0.04em', textTransform: 'uppercase' }}>
                <Box component="span" sx={{ display: 'block', background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.85) 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  URL IN.
                </Box>
                <Box component="span" sx={{ display: 'block', background: 'linear-gradient(135deg, #facc15 0%, #fde047 30%, #3b82f6 60%, #ef4444 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', filter: 'drop-shadow(0 0 40px rgba(250,204,21,0.5))', my: 1 }}>
                  VIRAL
                </Box>
                <Box component="span" sx={{ display: 'block', background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.85) 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  OUT.
                </Box>
              </Typography>
            </Box>

            <Box className="hero-sub" sx={{ opacity: 0 }}>
              <Typography sx={{ fontSize: { xs: '1.15rem', md: '1.5rem' }, color: 'rgba(255,255,255,0.6)', maxWidth: 720, fontWeight: 500, lineHeight: 1.6 }}>
                The AAA-grade AI platform that weaponizes <br />
                any webpage into <strong style={{ color: '#facc15', fontWeight: 700 }}>60-second battle-tested</strong> viral content
              </Typography>
            </Box>

            <Box className="hero-input" sx={{ width: '100%', maxWidth: 720, opacity: 0 }}>
              <Paper elevation={0} sx={{ p: 1.5, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.04)', border: '2px solid rgba(250,204,21,0.2)', backdropFilter: 'blur(16px)', boxShadow: '0 12px 40px rgba(0,0,0,0.4)' }}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
                  <TextField
                    fullWidth
                    placeholder="Drop your URL... unleash the algorithm"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleGetStarted()}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, borderRadius: 2, background: 'linear-gradient(135deg, rgba(250,204,21,0.2), rgba(250,204,21,0.05))', border: '1px solid rgba(250,204,21,0.3)' }}>
                            <LinkIcon size={18} color="#facc15" />
                          </Box>
                        </InputAdornment>
                      ),
                    }}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2.5, color: 'white', fontSize: '1rem', fontWeight: 500, '& fieldset': { border: 'none' }, '& input::placeholder': { color: 'rgba(255,255,255,0.4)', opacity: 1 } } }}
                  />
                  <Button variant="contained" size="large" endIcon={<Zap size={20} />} onClick={handleGetStarted} sx={{ background: 'linear-gradient(135deg, #facc15 0%, #f59e0b 100%)', color: '#000', px: 6, py: 2.2, borderRadius: 2.5, textTransform: 'uppercase', fontWeight: 900, fontSize: '1rem', letterSpacing: 1, whiteSpace: 'nowrap', boxShadow: '0 0 30px rgba(250,204,21,0.6)', '&:hover': { boxShadow: '0 0 50px rgba(250,204,21,0.9)', transform: 'translateY(-2px) scale(1.02)' } }}>
                    Deploy
                  </Button>
                </Stack>
              </Paper>
              <Typography sx={{ mt: 2.5, color: 'rgba(255,255,255,0.35)', fontSize: '0.85rem' }}>
                <strong style={{ color: '#facc15' }}>Free Battle Pass</strong> • 3 Videos • No Credit Card
              </Typography>
            </Box>

            <Stack className="hero-trust" direction="row" spacing={6} flexWrap="wrap" justifyContent="center" sx={{ opacity: 0, mt: 4 }}>
              {[
                { icon: Radio, text: '2K+ IN THE ARENA', color: '#ef4444' },
                { icon: Video, text: '500K+ BATTLES WON', color: '#facc15' },
                { icon: Crown, text: '4.9★ LEGENDARY', color: '#3b82f6' },
              ].map((item, i) => (
                <Stack key={i} direction="row" spacing={1.5} alignItems="center">
                  <Box sx={{ width: 36, height: 36, borderRadius: 2, background: `linear-gradient(135deg, ${item.color}20, ${item.color}05)`, border: `1px solid ${item.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 20px ${item.color}20` }}>
                    <item.icon size={18} color={item.color} />
                  </Box>
                  <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', fontWeight: 700, letterSpacing: 1 }}>{item.text}</Typography>
                </Stack>
              ))}
            </Stack>

            <DashboardMockup />
            <DynamicUpdatesCarousel />
          </Stack>
        </Container>
      </Box>

      {/* Features Section */}
      <Box id="features" sx={{ py: { xs: 12, md: 20 }, position: 'relative', overflow: 'hidden', '&::before': { content: '""', position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, #facc15, #3b82f6, transparent)', opacity: 0.5 } }}>
        <FloatingOrb size={500} color="rgba(250,204,21,0.08)" top="30%" left="-10%" delay={1} blur={110} />
        <Container maxWidth="lg">
          <SectionHeader chip="ARSENAL" chipColor="#facc15" chipBorder="rgba(250,204,21,0.3)" title="EVERYTHING YOU NEED TO DOMINATE" subtitle="AAA-grade features engineered for maximum engagement and zero friction." />

          <Box component={motion.div} variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(6, 1fr)' }, gap: 4, gridAutoRows: 'minmax(220px, auto)' }}>
            {/* Hero Feature */}
            <motion.div variants={staggerItem} style={{ gridColumn: 'span 1', gridRow: 'span 1' }} className="md:col-span-6 md:row-span-2">
              {(() => {
                const f = features[0];
                const IconComponent = f.icon;
                return (
                  <Box sx={{ height: '100%', minHeight: 400, borderRadius: 4, background: `linear-gradient(135deg, rgba(250,204,21,0.08) 0%, rgba(0,0,0,0.6) 100%)`, border: '2px solid rgba(250,204,21,0.2)', position: 'relative', overflow: 'hidden', cursor: 'pointer', clipPath: 'polygon(0 0, 100% 0, 100% 95%, 95% 100%, 0 100%)', '&:hover': { borderColor: 'rgba(250,204,21,0.6)', transform: 'translateY(-12px)', boxShadow: '0 40px 80px -40px rgba(250,204,21,0.4)' } }}>
                    <Box sx={{ p: { xs: 5, md: 8 }, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <Box>
                        <Box sx={{ width: 80, height: 80, borderRadius: 3, background: 'linear-gradient(135deg, rgba(250,204,21,0.3), rgba(250,204,21,0.1))', border: '2px solid rgba(250,204,21,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 5, boxShadow: '0 0 40px rgba(250,204,21,0.3)' }}>
                          <IconComponent size={40} color="#facc15" strokeWidth={2.5} />
                        </Box>
                        <Typography sx={{ color: 'white', fontWeight: 900, fontSize: { xs: '2rem', md: '3rem' }, mb: 3, lineHeight: 1.1, textTransform: 'uppercase' }}>{f.title}</Typography>
                        <Typography sx={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, fontSize: { xs: '1.1rem', md: '1.3rem' }, maxWidth: 600, fontWeight: 500 }}>{f.description}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 4 }}>
                        <Typography sx={{ color: '#facc15', fontWeight: 700, fontSize: '1rem', letterSpacing: 1 }}>EXPLORE WEAPON</Typography>
                        <Box component={motion.div} animate={{ x: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                          <ChevronRight size={24} color="#facc15" />
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                );
              })()}
            </motion.div>

            {/* Other Features */}
            {features.slice(1).map((f, idx) => {
              const IconComponent = f.icon;
              const gridSpan = idx < 2 ? 3 : 2;
              return (
                <motion.div key={idx} variants={staggerItem} style={{ gridColumn: 'span 1' }} className={`md:col-span-${gridSpan}`}>
                  <Box sx={{ height: '100%', minHeight: 280, borderRadius: 4, background: `linear-gradient(135deg, ${f.color}08 0%, rgba(0,0,0,0.4) 100%)`, border: `2px solid ${f.color}20`, position: 'relative', overflow: 'hidden', cursor: 'pointer', clipPath: 'polygon(0 0, 100% 0, 100% 90%, 90% 100%, 0 100%)', '&:hover': { borderColor: `${f.color}60`, transform: 'translateY(-8px)', boxShadow: `0 24px 48px -24px ${f.color}40` } }}>
                    <Box sx={{ p: 5, height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <Box sx={{ width: 64, height: 64, borderRadius: 2.5, background: `linear-gradient(135deg, ${f.color}25, ${f.color}10)`, border: `1.5px solid ${f.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4, boxShadow: `0 0 24px ${f.color}30` }}>
                        <IconComponent size={32} color={f.color} strokeWidth={2} />
                      </Box>
                      <Typography sx={{ color: 'white', fontWeight: 800, fontSize: '1.4rem', mb: 2, lineHeight: 1.2, textTransform: 'uppercase' }}>{f.title}</Typography>
                      <Typography sx={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, fontSize: '0.95rem', flex: 1 }}>{f.description}</Typography>
                    </Box>
                  </Box>
                </motion.div>
              );
            })}
          </Box>
        </Container>
      </Box>

      {/* Platform Section */}
      <Box sx={{ py: { xs: 16, md: 24 }, position: 'relative', background: 'linear-gradient(180deg, #000 0%, #0a0a0f 50%, #000 100%)' }}>
        <Container maxWidth="lg">
          <GsapReveal>
            <Box sx={{ textAlign: 'center', mb: 12 }}>
              <Chip label="BATTLEFIELD" sx={{ bgcolor: 'rgba(59,130,246,0.12)', color: '#60a5fa', fontWeight: 800, fontSize: '0.7rem', letterSpacing: 2, border: '1px solid rgba(59,130,246,0.3)', px: 2, height: 32, mb: 4 }} />
              <Typography variant="h2" sx={{ fontWeight: 900, fontSize: { xs: '2.5rem', md: '4.5rem' }, letterSpacing: '-0.03em', textTransform: 'uppercase', background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.7) 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1.1, mb: 4 }}>
                Deploy Across
                <br />
                All Platforms
              </Typography>
            </Box>
          </GsapReveal>

          <Grid container spacing={4}>
            {[
              { name: 'TikTok', icon: Video, users: '1B+', color: '#fe2c55', engagement: '18%' },
              { name: 'Instagram', icon: Smartphone, users: '2B+', color: '#e1306c', engagement: '12%' },
              { name: 'YouTube', icon: Play, users: '2.5B+', color: '#ff0000', engagement: '8%' },
              { name: 'Twitter/X', icon: MessageCircle, users: '500M+', color: '#1da1f2', engagement: '5%' },
            ].map((platform, i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <GsapReveal delay={i * 0.1}>
                  <motion.div whileHover={{ y: -12, scale: 1.03 }}>
                    <Box sx={{ p: 5, borderRadius: 4, background: `linear-gradient(135deg, ${platform.color}08 0%, rgba(0,0,0,0.4) 100%)`, border: `2px solid ${platform.color}20`, cursor: 'pointer', '&:hover': { borderColor: `${platform.color}60`, boxShadow: `0 24px 48px -20px ${platform.color}40` } }}>
                      <Box sx={{ width: 56, height: 56, borderRadius: 2.5, background: `linear-gradient(135deg, ${platform.color}25, ${platform.color}10)`, border: `1.5px solid ${platform.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3, mx: 'auto' }}>
                        <platform.icon size={28} color={platform.color} />
                      </Box>
                      <Typography sx={{ color: 'white', fontWeight: 800, fontSize: '1.2rem', mb: 1, textAlign: 'center' }}>{platform.name}</Typography>
                      <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', textAlign: 'center', mb: 2 }}>{platform.users} Active</Typography>
                      <Box sx={{ mt: 2, pt: 2, borderTop: `1px solid ${platform.color}20`, textAlign: 'center' }}>
                        <Typography sx={{ color: platform.color, fontWeight: 700, fontSize: '0.9rem', letterSpacing: 1 }}>{platform.engagement} AVG ENGAGEMENT</Typography>
                      </Box>
                    </Box>
                  </motion.div>
                </GsapReveal>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* How It Works */}
      <Box id="about" sx={{ py: { xs: 12, md: 20 }, position: 'relative' }}>
        <Container maxWidth="lg">
          <SectionHeader chip="TACTICAL BRIEFING" chipColor="#a855f7" chipBorder="rgba(168,85,247,0.3)" title="THREE MOVES. INFINITE IMPACT." />
          <Grid container spacing={4} justifyContent="center">
            {[
              { step: '01', title: 'Paste your URL', description: 'Drop any webpage link. Our AI reads and understands the content instantly.', icon: LinkIcon, color: '#facc15' },
              { step: '02', title: 'AI generates everything', description: 'Script, voiceover, visuals, and editing happen simultaneously in under 60 seconds.', icon: Wand2, color: '#a855f7' },
              { step: '03', title: 'Publish & go viral', description: 'Download in any format. Get viral score prediction. One-click export everywhere.', icon: Rocket, color: '#3b82f6' },
            ].map((step, i) => (
              <Grid item xs={12} md={4} key={i}>
                <Box sx={{ p: 5, borderRadius: 4, height: '100%', bgcolor: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)', textAlign: 'center', '&:hover': { borderColor: `${step.color}40`, transform: 'translateY(-6px)' } }}>
                  <Typography sx={{ fontSize: '5rem', fontWeight: 900, color: `${step.color}12`, lineHeight: 1, mb: 3, fontFamily: 'monospace' }}>{step.step}</Typography>
                  <Box sx={{ width: 56, height: 56, borderRadius: 3, background: `${step.color}12`, border: `1px solid ${step.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4, mx: 'auto' }}>
                    <step.icon size={28} color={step.color} />
                  </Box>
                  <Typography sx={{ color: 'white', fontWeight: 700, fontSize: '1.4rem', mb: 2 }}>{step.title}</Typography>
                  <Typography sx={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.8 }}>{step.description}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials */}
      <Box sx={{ py: { xs: 12, md: 18 } }}>
        <Container maxWidth="lg">
          <SectionHeader chip="WALL OF LOVE" chipColor="#facc15" chipBorder="rgba(250,204,21,0.25)" title="Loved by builders worldwide" />
          <Grid container spacing={4}>
            {testimonials.map((t, i) => (
              <Grid item xs={12} md={4} key={i}>
                <Card sx={{ height: '100%', borderRadius: 4, bgcolor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', '&:hover': { borderColor: 'rgba(250,204,21,0.25)', transform: 'translateY(-4px)' } }}>
                  <CardContent sx={{ p: 5 }}>
                    <Stack spacing={3.5}>
                      <Stack direction="row" spacing={0.6}>
                        {[...Array(t.rating)].map((_, j) => (
                          <Star key={j} size={17} fill="#facc15" color="#facc15" />
                        ))}
                      </Stack>
                      <Typography sx={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.9, fontStyle: 'italic' }}>&ldquo;{t.text}&rdquo;</Typography>
                      <Stack direction="row" spacing={2.5} alignItems="center" sx={{ pt: 2 }}>
                        <Avatar sx={{ width: 46, height: 46, bgcolor: 'rgba(99,102,241,0.2)', color: '#818cf8', fontWeight: 700 }}>{t.avatar}</Avatar>
                        <Box>
                          <Typography sx={{ color: 'white', fontWeight: 600 }}>{t.name}</Typography>
                          <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>{t.role}</Typography>
                        </Box>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Pricing */}
      <Box id="pricing" sx={{ py: { xs: 12, md: 20 }, position: 'relative' }}>
        <Container maxWidth="lg">
          <SectionHeader chip="PRICING" chipColor="#fb923c" chipBorder="rgba(249,115,22,0.25)" title="Simple, transparent pricing" subtitle="Start free. Upgrade when you're ready. No surprise fees, ever." />
          <Grid container spacing={4}>
            {plans.map((plan, i) => (
              <Grid item xs={12} md={4} key={i}>
                <Card sx={{ height: '100%', borderRadius: 4, bgcolor: plan.popular ? 'rgba(99,102,241,0.06)' : 'rgba(255,255,255,0.025)', border: '1px solid', borderColor: plan.popular ? 'rgba(99,102,241,0.3)' : 'rgba(255,255,255,0.06)', position: 'relative', '&:hover': { borderColor: plan.popular ? 'rgba(99,102,241,0.5)' : 'rgba(255,255,255,0.12)', transform: 'translateY(-6px)' } }}>
                  {plan.popular && <Box sx={{ position: 'absolute', top: -1, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #6366f1, #a855f7, #6366f1)', borderRadius: '4px 4px 0 0' }} />}
                  <CardContent sx={{ p: 5 }}>
                    <Stack spacing={3.5}>
                      <Box>
                        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
                          <Typography sx={{ color: 'white', fontWeight: 700, fontSize: '1.4rem' }}>{plan.name}</Typography>
                          {plan.popular && <Chip label="Popular" size="small" sx={{ bgcolor: 'rgba(99,102,241,0.15)', color: '#818cf8', fontWeight: 700, fontSize: '0.7rem', height: 24 }} />}
                        </Stack>
                        <Typography sx={{ color: 'rgba(255,255,255,0.45)' }}>{plan.description}</Typography>
                      </Box>
                      <Stack direction="row" alignItems="baseline" spacing={0.6}>
                        <Typography sx={{ color: 'white', fontWeight: 800, fontSize: '3.5rem', lineHeight: 1 }}>{plan.price}</Typography>
                        <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontWeight: 500, fontSize: '1.1rem' }}>{plan.period}</Typography>
                      </Stack>
                      <Button fullWidth variant={plan.popular ? 'contained' : 'outlined'} onClick={handleGetStarted} sx={{ py: 2, borderRadius: 2.5, textTransform: 'none', fontWeight: 700, ...(plan.popular ? { background: 'linear-gradient(135deg, #6366f1, #a855f7)', color: 'white', boxShadow: '0 0 24px rgba(99,102,241,0.4)' } : { borderColor: 'rgba(255,255,255,0.15)', color: 'white' }) }}>
                        {plan.cta}
                      </Button>
                      <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)' }} />
                      <Stack spacing={2}>
                        {plan.features.map((f, j) => (
                          <Stack direction="row" spacing={2} alignItems="flex-start" key={j}>
                            <CheckCircle2 size={18} color="#34d399" style={{ flexShrink: 0, marginTop: 2 }} />
                            <Typography sx={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.95rem' }}>{f}</Typography>
                          </Stack>
                        ))}
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Final CTA */}
      <Box id="contact" sx={{ py: { xs: 14, md: 20 }, position: 'relative', overflow: 'hidden' }}>
        <FloatingOrb size={600} color="rgba(250,204,21,0.1)" top="-15%" left="50%" delay={0} blur={120} />
        <Container maxWidth="lg">
          <GsapReveal>
            <Box sx={{ p: { xs: 6, md: 12 }, borderRadius: 5, textAlign: 'center', position: 'relative', overflow: 'hidden', background: `linear-gradient(135deg, rgba(250,204,21,0.08), rgba(59,130,246,0.06))`, border: '3px solid', borderImage: 'linear-gradient(135deg, rgba(250,204,21,0.4), rgba(59,130,246,0.3)) 1', clipPath: 'polygon(0 0, 100% 0, 100% 92%, 96% 100%, 0 100%)', boxShadow: `0 40px 100px -30px rgba(0,0,0,0.8), 0 0 80px rgba(250,204,21,0.15)` }}>
              <Stack spacing={6} alignItems="center">
                <Chip icon={<Flame size={18} />} label="LIMITED SLOTS • DEPLOY NOW" sx={{ bgcolor: 'rgba(239,68,68,0.15)', color: '#fca5a5', fontWeight: 900, fontSize: '0.8rem', letterSpacing: 2, border: '1px solid rgba(239,68,68,0.4)', py: 3, px: 3, boxShadow: '0 0 20px rgba(239,68,68,0.3)' }} />
                <Typography variant="h1" sx={{ fontWeight: 900, fontSize: { xs: '2.8rem', md: '5rem' }, letterSpacing: '-0.03em', textTransform: 'uppercase', lineHeight: 1.05 }}>
                  <Box component="span" sx={{ display: 'block', background: 'linear-gradient(135deg, #fde047 0%, #facc15 50%, #f59e0b 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', filter: 'drop-shadow(0 0 40px rgba(250,204,21,0.5))', mb: 2 }}>
                    CLAIM YOUR
                  </Box>
                  <Box component="span" sx={{ display: 'block', background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.8) 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    BATTLE PASS
                  </Box>
                </Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.65)', maxWidth: 580, fontSize: { xs: '1.1rem', md: '1.25rem' }, lineHeight: 1.8, fontWeight: 500 }}>
                  Join <strong style={{ color: '#facc15', fontWeight: 800 }}>2,000+ warriors</strong> dominating the content battlefield.
                  <br />
                  Deploy your first 3 videos <strong style={{ color: '#60a5fa' }}>FREE</strong>. No credit card.
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ mt: 2 }}>
                  <Button variant="contained" size="large" endIcon={<Zap size={22} />} onClick={handleGetStarted} sx={{ background: 'linear-gradient(135deg, #facc15 0%, #f59e0b 100%)', color: '#000', px: 8, py: 2.8, borderRadius: 3, textTransform: 'uppercase', fontWeight: 900, fontSize: '1.1rem', letterSpacing: 1.5, boxShadow: '0 0 40px rgba(250,204,21,0.6)', '&:hover': { boxShadow: '0 0 60px rgba(250,204,21,0.9)', transform: 'translateY(-4px) scale(1.03)' } }}>
                    Enter Arena
                  </Button>
                  <Button variant="outlined" size="large" startIcon={<Target size={20} />} onClick={() => window.open('mailto:hello@viralshots.ai')} sx={{ px: 6, py: 2.8, borderRadius: 3, textTransform: 'uppercase', fontWeight: 700, fontSize: '1.1rem', letterSpacing: 1, borderWidth: 2, borderColor: 'rgba(250,204,21,0.3)', color: '#facc15', '&:hover': { borderColor: 'rgba(250,204,21,0.6)', bgcolor: 'rgba(250,204,21,0.1)' } }}>
                    Talk Strategy
                  </Button>
                </Stack>
                <Stack direction="row" spacing={4} divider={<Box sx={{ width: 1, height: 20, bgcolor: 'rgba(255,255,255,0.15)' }} />} sx={{ mt: 4, flexWrap: 'wrap', justifyContent: 'center' }}>
                  {[
                    { icon: Shield, text: 'SOC2 Secure' },
                    { icon: Zap, text: '60s Deploy' },
                    { icon: CheckCircle2, text: 'No CC Required' },
                  ].map((item, i) => (
                    <Stack key={i} direction="row" spacing={1.5} alignItems="center">
                      <item.icon size={18} color="rgba(255,255,255,0.5)" />
                      <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', fontWeight: 600 }}>{item.text}</Typography>
                    </Stack>
                  ))}
                </Stack>
              </Stack>
            </Box>
          </GsapReveal>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ py: 10, borderTop: '2px solid', borderImage: 'linear-gradient(90deg, transparent, rgba(250,204,21,0.3), transparent) 1', background: 'linear-gradient(180deg, rgba(0,0,0,0.4), #000)' }}>
        <Container maxWidth="lg">
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <Stack spacing={3}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box sx={{ width: 36, height: 36, borderRadius: 2, background: 'linear-gradient(135deg, #6366f1, #a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Sparkles size={18} color="white" />
                  </Box>
                  <Typography sx={{ fontWeight: 800, fontSize: '1.2rem', color: 'white' }}>ViralShots</Typography>
                </Stack>
                <Typography sx={{ color: 'rgba(255,255,255,0.35)', maxWidth: 300, lineHeight: 1.7 }}>The AI-powered video engine for developers, creators, and teams who ship fast.</Typography>
                <Stack direction="row" spacing={1.5} sx={{ mt: 2 }}>
                  {[MessageCircle, Share2, Globe, Mail].map((Icon, i) => (
                    <IconButton key={i} size="small" sx={{ color: 'rgba(255,255,255,0.35)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 2, '&:hover': { color: 'white', borderColor: 'rgba(255,255,255,0.25)' } }}>
                      <Icon size={17} />
                    </IconButton>
                  ))}
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={12} md={8}>
              <Grid container spacing={4}>
                {[
                  { title: 'Product', links: ['Features', 'Pricing', 'API Docs', 'Changelog'] },
                  { title: 'Company', links: ['About', 'Blog', 'Careers', 'Press'] },
                  { title: 'Resources', links: ['Documentation', 'Tutorials', 'Support', 'Status'] },
                  { title: 'Legal', links: ['Privacy', 'Terms', 'Security', 'DPA'] },
                ].map((col) => (
                  <Grid item xs={6} sm={3} key={col.title}>
                    <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontWeight: 600, fontSize: '0.85rem', letterSpacing: 0.5, mb: 2.5 }}>{col.title}</Typography>
                    <Stack spacing={1.5}>
                      {col.links.map((link) => (
                        <Typography key={link} sx={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.9rem', cursor: 'pointer', '&:hover': { color: 'white' } }}>
                          {link}
                        </Typography>
                      ))}
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
          <Divider sx={{ my: 5, borderColor: 'rgba(255,255,255,0.06)' }} />
          <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" spacing={2.5}>
            <Typography sx={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem' }}>&copy; 2026 ViralShots. All rights reserved.</Typography>
            <Stack direction="row" spacing={4}>
              {['Privacy Policy', 'Terms of Service', 'Cookies'].map((link) => (
                <Typography key={link} sx={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem', cursor: 'pointer', '&:hover': { color: 'rgba(255,255,255,0.6)' } }}>
                  {link}
                </Typography>
              ))}
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
