import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Paper,
  Typography,
  Button,
  Stack,
  Grid,
  Card,
  CardContent,
  Chip,
  Divider,
  LinearProgress,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  CreditCard,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Video,
  Clock,
  Zap,
  Crown,
  ArrowRight,
  AlertCircle,
  Rocket,
  Star,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function Subscription() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [upgradeDialogOpen, setUpgradeDialogOpen] = useState(false);

  const currentPlan = user?.plan || 'free';
  const creditsUsed = user?.creditsUsed || 0;
  const creditsTotal = user?.creditsTotal || 3;
  const creditsRemaining = user?.credits || 0;
  const usagePercentage = (creditsUsed / creditsTotal) * 100;

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: 29,
      interval: 'month',
      credits: 10,
      description: 'Perfect for individuals and small projects',
      features: [
        '10 video credits per month',
        'HD quality exports (1080p)',
        'Basic analytics dashboard',
        'Email support within 48h',
        'No watermarks',
        'Standard AI voice models',
      ],
      color: '#6366f1',
      popular: false,
    },
    {
      id: 'professional',
      name: 'Professional',
      price: 79,
      interval: 'month',
      credits: 50,
      description: 'Ideal for content creators and marketers',
      features: [
        '50 video credits per month',
        '4K quality exports (2160p)',
        'Advanced analytics & insights',
        'Priority support within 12h',
        'Custom branding options',
        'Premium AI voice models',
        'API access',
        'Webhook notifications',
        'Early access to new features',
      ],
      color: '#a855f7',
      popular: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 299,
      interval: 'month',
      credits: -1, // Unlimited
      description: 'For agencies and large teams',
      features: [
        'Unlimited video credits',
        '8K quality exports (4320p)',
        'Real-time analytics & reporting',
        '24/7 dedicated support',
        'White-label solution',
        'Custom AI model training',
        'Advanced API features',
        'Team management (unlimited)',
        'Custom integrations',
        'SLA & uptime guarantee',
      ],
      color: '#f97316',
      popular: false,
    },
  ];

  const handleUpgrade = (plan) => {
    setSelectedPlan(plan);
    setUpgradeDialogOpen(true);
  };

  const handleConfirmUpgrade = () => {
    // In a real app, this would integrate with Stripe or another payment processor
    setUpgradeDialogOpen(false);
    navigate('/billing');
  };

  return (
    <Box>
      {/* Header */}
      <Stack spacing={1} sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold">
          Subscription & Billing
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your plan and billing information
        </Typography>
      </Stack>

      {/* Current Usage Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Paper
          elevation={2}
          sx={{
            p: 4,
            mb: 4,
            borderRadius: 3,
            background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
            color: 'white',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Background decoration */}
          <Box
            sx={{
              position: 'absolute',
              top: -50,
              right: -50,
              width: 200,
              height: 200,
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.1)',
              filter: 'blur(60px)',
            }}
          />
          
          <Grid container spacing={4} alignItems="center" sx={{ position: 'relative' }}>
            <Grid item xs={12} md={8}>
              <Stack spacing={3}>
                <Box>
                  <Chip
                    label={currentPlan.toUpperCase()}
                    icon={<Crown size={16} />}
                    sx={{
                      bgcolor: 'rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      fontWeight: 700,
                      mb: 2,
                    }}
                  />
                  <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Your Current Plan
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.9 }}>
                    {currentPlan === 'free' 
                      ? 'Start creating amazing videos with your free credits'
                      : 'Thank you for being a valued member'}
                  </Typography>
                </Box>

                <Box>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ mb: 1 }}
                  >
                    <Typography variant="body2" fontWeight={600}>
                      Credits Usage
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {creditsUsed} / {creditsTotal === -1 ? '∞' : creditsTotal} used
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={creditsTotal === -1 ? 0 : Math.min(usagePercentage, 100)}
                    sx={{
                      height: 10,
                      borderRadius: 1,
                      bgcolor: 'rgba(255, 255, 255, 0.2)',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: 'white',
                        borderRadius: 1,
                      },
                    }}
                  />
                  <Typography variant="caption" sx={{ mt: 1, display: 'block', opacity: 0.8 }}>
                    {creditsRemaining} credits remaining this month
                  </Typography>
                </Box>
              </Stack>
            </Grid>

            <Grid item xs={12} md={4}>
              <Stack spacing={2}>
                <Card sx={{ bgcolor: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(10px)' }}>
                  <CardContent>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 2,
                          bgcolor: 'rgba(255, 255, 255, 0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Video size={24} color="white" />
                      </Box>
                      <Box>
                        <Typography variant="h5" fontWeight="bold" color="white">
                          {user?.totalVideos || 0}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                          Videos Created
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      </motion.div>

      {/* Plans Section */}
      <Box sx={{ mb: 4 }}>
        <Stack spacing={2} alignItems="center" textAlign="center" sx={{ mb: 4 }}>
          <Typography variant="h5" fontWeight="bold">
            Choose Your Perfect Plan
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600 }}>
            Upgrade anytime. All plans include a 14-day money-back guarantee.
          </Typography>
        </Stack>

        <Grid container spacing={3} alignItems="stretch">
          {plans.map((plan, index) => {
            const isCurrentPlan = plan.id === currentPlan;
            
            return (
              <Grid item xs={12} md={4} key={plan.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  style={{ height: '100%' }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      borderRadius: 3,
                      border: '2px solid',
                      borderColor: plan.popular ? plan.color : 'grey.200',
                      position: 'relative',
                      transform: plan.popular ? 'scale(1.05)' : 'scale(1)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: plan.popular ? 'scale(1.08)' : 'scale(1.02)',
                        boxShadow: plan.popular
                          ? `0 20px 40px ${plan.color}30`
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
                          bgcolor: plan.color,
                          color: 'white',
                          px: 3,
                          py: 0.5,
                          borderRadius: 2,
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          letterSpacing: 1,
                          boxShadow: `0 4px 12px ${plan.color}40`,
                        }}
                      >
                        MOST POPULAR
                      </Box>
                    )}

                    {isCurrentPlan && (
                      <Chip
                        label="Current Plan"
                        size="small"
                        icon={<CheckCircle2 size={14} />}
                        sx={{
                          position: 'absolute',
                          top: 16,
                          right: 16,
                          bgcolor: 'success.main',
                          color: 'white',
                          fontWeight: 600,
                        }}
                      />
                    )}

                    <CardContent sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <Stack spacing={3} sx={{ flex: 1 }}>
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
                              sx={{ color: plan.color }}
                            >
                              ${plan.price}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                              /{plan.interval}
                            </Typography>
                          </Stack>
                          <Typography variant="caption" color="text.secondary">
                            {plan.credits === -1 ? 'Unlimited credits' : `${plan.credits} credits/month`}
                          </Typography>
                        </Box>

                        <Button
                          variant={plan.popular ? 'contained' : 'outlined'}
                          size="large"
                          fullWidth
                          disabled={isCurrentPlan}
                          onClick={() => handleUpgrade(plan)}
                          endIcon={isCurrentPlan ? null : <ArrowRight size={18} />}
                          sx={{
                            py: 1.5,
                            borderRadius: 2,
                            textTransform: 'none',
                            fontWeight: 600,
                            ...(plan.popular
                              ? {
                                  background: `linear-gradient(135deg, ${plan.color} 0%, ${plan.color}DD 100%)`,
                                  color: 'white',
                                  boxShadow: `0 4px 12px ${plan.color}40`,
                                  '&:hover': {
                                    boxShadow: `0 6px 16px ${plan.color}50`,
                                  },
                                }
                              : {
                                  borderColor: 'grey.300',
                                  color: 'text.primary',
                                  '&:hover': {
                                    borderColor: plan.color,
                                    bgcolor: `${plan.color}10`,
                                  },
                                }),
                            '&:disabled': {
                              bgcolor: 'grey.100',
                              color: 'text.disabled',
                            },
                          }}
                        >
                          {isCurrentPlan ? 'Current Plan' : `Upgrade to ${plan.name}`}
                        </Button>

                        <Divider />

                        <List dense>
                          {plan.features.map((feature, i) => (
                            <ListItem key={i} sx={{ px: 0, py: 0.5 }}>
                              <ListItemIcon sx={{ minWidth: 32 }}>
                                <CheckCircle2 size={18} color={plan.color} />
                              </ListItemIcon>
                              <ListItemText
                                primary={feature}
                                primaryTypographyProps={{
                                  variant: 'body2',
                                  color: 'text.secondary',
                                }}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </Stack>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            );
          })}
        </Grid>
      </Box>

      {/* FAQ Section */}
      <Paper
        elevation={1}
        sx={{
          p: 4,
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'grey.100',
          mb: 4,
        }}
      >
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Frequently Asked Questions
        </Typography>
        <Stack spacing={3} sx={{ mt: 3 }}>
          {[
            {
              question: 'Can I change my plan at any time?',
              answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.',
            },
            {
              question: 'What happens if I run out of credits?',
              answer: 'You can purchase additional credits or upgrade to a higher plan. Your existing videos remain accessible.',
            },
            {
              question: 'Do unused credits roll over?',
              answer: 'Enterprise plan credits roll over. Starter and Professional plan credits refresh monthly.',
            },
            {
              question: 'Is there a refund policy?',
              answer: 'Yes, we offer a 14-day money-back guarantee on all paid plans. No questions asked.',
            },
          ].map((faq, index) => (
            <Box key={index}>
              <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                {faq.question}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {faq.answer}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Paper>

      {/* Additional Info */}
      <Alert
        severity="info"
        icon={<Sparkles size={20} />}
        sx={{ borderRadius: 2 }}
      >
        <Typography variant="body2" fontWeight={500}>
          Need more credits? Contact us for custom enterprise plans tailored to your needs.
        </Typography>
      </Alert>

      {/* Upgrade Dialog */}
      <Dialog
        open={upgradeDialogOpen}
        onClose={() => setUpgradeDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3 },
        }}
      >
        <DialogTitle>
          <Stack direction="row" spacing={2} alignItems="center">
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 2,
                bgcolor: selectedPlan?.color ? `${selectedPlan.color}20` : 'primary.light',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Rocket size={24} color={selectedPlan?.color || '#6366f1'} />
            </Box>
            <Box>
              <Typography variant="h6" fontWeight="bold">
                Upgrade to {selectedPlan?.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Unlock powerful features and boost your content creation
              </Typography>
            </Box>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3}>
            <Alert severity="success" icon={<Star size={20} />} sx={{ borderRadius: 2 }}>
              <Typography variant="body2" fontWeight={500}>
                Special offer: Get 20% off your first 3 months!
              </Typography>
            </Alert>

            <Box>
              <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                What you'll get:
              </Typography>
              <List dense>
                {selectedPlan?.features.slice(0, 5).map((feature, i) => (
                  <ListItem key={i} sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <CheckCircle2 size={18} color="#10b981" />
                    </ListItemIcon>
                    <ListItemText
                      primary={feature}
                      primaryTypographyProps={{
                        variant: 'body2',
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>

            <Divider />

            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="body2" color="text.secondary">
                Total today:
              </Typography>
              <Stack alignItems="flex-end">
                <Typography variant="h5" fontWeight="bold" color={selectedPlan?.color}>
                  ${selectedPlan?.price}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Billed monthly
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button
            onClick={() => setUpgradeDialogOpen(false)}
            sx={{ textTransform: 'none', fontWeight: 600 }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleConfirmUpgrade}
            sx={{
              background: `linear-gradient(135deg, ${selectedPlan?.color || '#6366f1'} 0%, ${selectedPlan?.color || '#a855f7'} 100%)`,
              color: 'white',
              px: 4,
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              '&:hover': {
                opacity: 0.9,
              },
            }}
          >
            Confirm Upgrade
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
