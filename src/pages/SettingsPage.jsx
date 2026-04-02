import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Paper,
  Typography,
  Button,
  Stack,
  Grid,
  TextField,
  Avatar,
  Divider,
  Switch,
  FormControlLabel,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Card,
  CardContent,
  Chip,
  IconButton,
} from '@mui/material';
import {
  User,
  Mail,
  Lock,
  Bell,
  Palette,
  Globe,
  Shield,
  Trash2,
  Save,
  AlertTriangle,
  CheckCircle2,
  Camera,
  Key,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function Settings() {
  const { user, logout } = useAuth();
  
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    company: user?.company || '',
  });
  
  const [notifications, setNotifications] = useState({
    email: true,
    webhook: false,
    marketing: false,
  });
  
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

  const handleProfileChange = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  const handleNotificationChange = (field) => {
    setNotifications({ ...notifications, [field]: !notifications[field] });
  };

  const handleSaveProfile = () => {
    // In a real app, this would call an API to save the profile
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleDeleteAccount = () => {
    if (deleteConfirmText === 'DELETE') {
      // In a real app, this would call an API to delete the account
      logout();
    }
  };

  const settingsSections = [
    {
      title: 'Profile Settings',
      icon: User,
      color: '#6366f1',
      content: (
        <Stack spacing={3}>
          <Box sx={{ textAlign: 'center' }}>
            <Box sx={{ position: 'relative', display: 'inline-block' }}>
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                  fontSize: '3rem',
                  fontWeight: 700,
                }}
              >
                {user?.email?.charAt(0).toUpperCase() || 'U'}
              </Avatar>
              <IconButton
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  bgcolor: 'white',
                  boxShadow: 2,
                  '&:hover': {
                    bgcolor: 'grey.100',
                  },
                }}
              >
                <Camera size={20} />
              </IconButton>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Click to change profile picture
            </Typography>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Full Name"
                value={profile.name}
                onChange={(e) => handleProfileChange('name', e.target.value)}
                InputProps={{
                  startAdornment: <User size={20} color="#6366f1" style={{ marginRight: 8 }} />,
                }}
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
                label="Email"
                value={profile.email}
                onChange={(e) => handleProfileChange('email', e.target.value)}
                type="email"
                InputProps={{
                  startAdornment: <Mail size={20} color="#6366f1" style={{ marginRight: 8 }} />,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Company (Optional)"
                value={profile.company}
                onChange={(e) => handleProfileChange('company', e.target.value)}
                InputProps={{
                  startAdornment: <Globe size={20} color="#6366f1" style={{ marginRight: 8 }} />,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>
          </Grid>

          {saveSuccess && (
            <Alert
              severity="success"
              icon={<CheckCircle2 size={20} />}
              sx={{ borderRadius: 2 }}
            >
              Profile updated successfully!
            </Alert>
          )}

          <Button
            variant="contained"
            size="large"
            onClick={handleSaveProfile}
            startIcon={<Save size={20} />}
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
            Save Changes
          </Button>
        </Stack>
      ),
    },
    {
      title: 'Security',
      icon: Shield,
      color: '#10b981',
      content: (
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Password
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <TextField
                fullWidth
                type="password"
                placeholder="••••••••"
                disabled
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
              <Button
                variant="outlined"
                startIcon={<Lock size={18} />}
                sx={{
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                }}
              >
                Change Password
              </Button>
            </Stack>
          </Box>

          <Divider />

          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Two-Factor Authentication
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Add an extra layer of security to your account
            </Typography>
            <Button
              variant="outlined"
              startIcon={<Key size={18} />}
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
              }}
            >
              Enable 2FA
            </Button>
          </Box>

          <Divider />

          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Active Sessions
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Manage your active sessions across devices
            </Typography>
            <Card
              variant="outlined"
              sx={{
                borderRadius: 2,
                borderColor: 'grey.200',
              }}
            >
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Current Session
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      macOS • Chrome • San Francisco, CA
                    </Typography>
                  </Box>
                  <Chip label="Active" color="success" size="small" />
                </Stack>
              </CardContent>
            </Card>
          </Box>
        </Stack>
      ),
    },
    {
      title: 'Notifications',
      icon: Bell,
      color: '#f59e0b',
      content: (
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Email Notifications
            </Typography>
            <Stack spacing={2}>
              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.email}
                    onChange={() => handleNotificationChange('email')}
                    color="primary"
                  />
                }
                label="Video completion notifications"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.webhook}
                    onChange={() => handleNotificationChange('webhook')}
                    color="primary"
                  />
                }
                label="Webhook delivery notifications"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.marketing}
                    onChange={() => handleNotificationChange('marketing')}
                    color="primary"
                  />
                }
                label="Product updates and tips"
              />
            </Stack>
          </Box>

          <Divider />

          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Notification Preferences
            </Typography>
            <Alert severity="info" icon={<Bell size={20} />} sx={{ borderRadius: 2, mt: 2 }}>
              Stay updated with real-time notifications about your video generation status
            </Alert>
          </Box>
        </Stack>
      ),
    },
    {
      title: 'Danger Zone',
      icon: AlertTriangle,
      color: '#ef4444',
      content: (
        <Stack spacing={3}>
          <Alert severity="warning" icon={<AlertTriangle size={20} />} sx={{ borderRadius: 2 }}>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Warning
            </Typography>
            <Typography variant="body2">
              These actions are irreversible. Please proceed with caution.
            </Typography>
          </Alert>

          <Card
            variant="outlined"
            sx={{
              borderRadius: 2,
              borderColor: 'error.main',
              bgcolor: 'rgba(239, 68, 68, 0.05)',
            }}
          >
            <CardContent>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="subtitle2" fontWeight={600} color="error.main" gutterBottom>
                    Delete Account
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Permanently delete your account and all associated data. This action cannot be
                    undone.
                  </Typography>
                </Box>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<Trash2 size={18} />}
                  onClick={() => setDeleteDialogOpen(true)}
                  sx={{
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                    alignSelf: 'flex-start',
                  }}
                >
                  Delete Account
                </Button>
              </Stack>
            </CardContent>
          </Card>

          <Card
            variant="outlined"
            sx={{
              borderRadius: 2,
              borderColor: 'grey.300',
            }}
          >
            <CardContent>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                    Sign Out Everywhere
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Sign out from all devices and sessions
                  </Typography>
                </Box>
                <Button
                  variant="outlined"
                  startIcon={<LogOut size={18} />}
                  onClick={logout}
                  sx={{
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                    alignSelf: 'flex-start',
                  }}
                >
                  Sign Out All Devices
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      ),
    },
  ];

  return (
    <Box>
      {/* Header */}
      <Stack spacing={1} sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold">
          Settings
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your account settings and preferences
        </Typography>
      </Stack>

      {/* Settings Sections */}
      <Stack spacing={3}>
        {settingsSections.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Paper
              elevation={2}
              sx={{
                p: 4,
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'grey.100',
              }}
            >
              <Stack spacing={3}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      background: `linear-gradient(135deg, ${section.color}20 0%, ${section.color}10 100%)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <section.icon size={24} color={section.color} />
                  </Box>
                  <Typography variant="h6" fontWeight="bold">
                    {section.title}
                  </Typography>
                </Stack>
                <Divider />
                {section.content}
              </Stack>
            </Paper>
          </motion.div>
        ))}
      </Stack>

      {/* Delete Account Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
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
                bgcolor: 'error.light',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <AlertTriangle size={24} color="#ef4444" />
            </Box>
            <Typography variant="h6" fontWeight="bold">
              Delete Account
            </Typography>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3}>
            <Alert severity="error" icon={<AlertTriangle size={20} />} sx={{ borderRadius: 2 }}>
              <Typography variant="body2" fontWeight={600}>
                This action is permanent and cannot be undone
              </Typography>
            </Alert>

            <DialogContentText>
              Deleting your account will:
            </DialogContentText>
            <Box component="ul" sx={{ pl: 3, color: 'text.secondary' }}>
              <li>Permanently delete all your videos</li>
              <li>Cancel your subscription immediately</li>
              <li>Remove all your personal data</li>
              <li>Revoke all API keys and access tokens</li>
            </Box>

            <Box>
              <Typography variant="body2" fontWeight={600} gutterBottom>
                To confirm, type "DELETE" in the box below:
              </Typography>
              <TextField
                fullWidth
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                placeholder="DELETE"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button
            onClick={() => {
              setDeleteDialogOpen(false);
              setDeleteConfirmText('');
            }}
            sx={{ textTransform: 'none', fontWeight: 600 }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteAccount}
            disabled={deleteConfirmText !== 'DELETE'}
            startIcon={<Trash2 size={18} />}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Delete Account
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
