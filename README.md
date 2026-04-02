# ViralShots - Premium SAAS Video Generation Platform

A premium $500K worth SAAS platform that transforms any website into engaging viral video content using AI. Built with modern design principles, featuring glassmorphism, smooth animations, and an intuitive user experience.

## ✨ Features

### 🎨 Premium Landing Page
- **Hero Section**: Eye-catching hero with website URL input and call-to-action
- **Dashboard Mockup**: Responsive device mockup showcasing the platform
- **About Section**: Compelling story with statistics and achievements
- **Pricing Section**: Three-tier pricing with feature comparison
- **Contact Section**: Beautiful contact form with social media links
- **Modern Design**: Glassmorphism effects, gradient backgrounds, and smooth animations

### 🎯 Modern Dashboard
- **Sidebar Navigation**: Persistent sidebar with beautiful gradients and icons
- **Responsive Design**: Mobile-first with collapsible sidebar on mobile
- **Stats Overview**: Real-time statistics and usage metrics
- **User Profile**: Quick access to profile and settings

### 🏠 Home (AI Video Generator)
- **Agent-like Interface**: Modern input interface with dropdown selections
- **Voice Model Selection**: 6 AI voice models (Alloy, Echo, Fable, Onyx, Nova, Shimmer)
- **Video Length Options**: Short (15-30s), Medium (30-60s), Long (60-90s)
- **Video Style Selection**: Modern, Professional, Vibrant, Minimal
- **Advanced Options**: Webhook URL configuration
- **Real-time Stats**: Credits remaining, videos created, viral score

### 📹 Video Gallery
- **Grid Layout**: Beautiful card-based video gallery
- **Search & Filter**: Search by URL, filter by status, sort by date/viral score
- **Video Actions**: Download, share, delete videos
- **Status Indicators**: Visual indicators for completed, processing, failed videos
- **Viral Score Display**: AI-powered engagement prediction

### 💳 Subscription Management
- **Current Plan Overview**: Usage statistics and credits remaining
- **Three-tier Plans**: Starter ($29), Professional ($79), Enterprise ($299)
- **Feature Comparison**: Detailed feature lists for each plan
- **Upgrade Dialog**: Beautiful upgrade confirmation with special offers
- **FAQ Section**: Common questions and answers

### ⚙️ Settings
- **Profile Management**: Edit name, email, company information
- **Security Settings**: Password change, 2FA, active sessions
- **Notifications**: Email, webhook, and marketing preferences
- **Danger Zone**: Account deletion with confirmation

## 🚀 Tech Stack

- **Frontend**: React 19, Vite 8
- **UI Framework**: Material-UI (MUI) 7
- **Animations**: Framer Motion 12
- **Icons**: Lucide React
- **Routing**: React Router DOM 7
- **HTTP Client**: Axios
- **Styling**: Emotion (CSS-in-JS)

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎯 User Flow

1. **Landing Page** (`/`)
   - Users land on the premium landing page
   - Can enter a website URL directly or browse features
   - Click "Get Started" to navigate to dashboard

2. **Authentication**
   - New users click "Sign Up" to create an account
   - Existing users click "Sign In" to log in
   - Both pages have "Back to Home" link

3. **Dashboard** (`/dashboard`)
   - Redirects to Home page by default
   - Sidebar navigation to access all features

4. **Home** (`/dashboard/home`)
   - Main video generation interface
   - Configure voice model, length, style
   - Click "Generate Video" to create

5. **Gallery** (`/dashboard/gallery`)
   - View all generated videos
   - Search, filter, and sort
   - Download or share completed videos

6. **Subscription** (`/dashboard/subscription`)
   - View current plan and usage
   - Upgrade or downgrade plans
   - View billing history

7. **Settings** (`/dashboard/settings`)
   - Update profile information
   - Manage security settings
   - Configure notifications
   - Delete account (if needed)

## 🎨 Design System

### Colors
- **Primary**: Indigo (`#6366f1` to `#4338ca`)
- **Secondary**: Purple (`#a855f7` to `#7e22ce`)
- **Accent**: Orange (`#f97316`)
- **Success**: Emerald (`#10b981`)
- **Warning**: Amber (`#f59e0b`)
- **Error**: Red (`#ef4444`)

### Typography
- **Font Family**: Inter, Roboto, Helvetica, Arial, sans-serif
- **Base Size**: 16px
- **Line Height**: 1.5-1.75 for body text
- **Scale**: 12, 14, 16, 18, 24, 32, 36, 48px

### Spacing
- **Scale**: 4pt/8dp incremental spacing system
- **Border Radius**: 8px (small), 12px (medium), 16px (large)

### Effects
- **Glassmorphism**: Frosted glass effect with blur
- **Gradients**: Linear gradients for depth
- **Shadows**: Elevation-based shadow system
- **Animations**: Smooth 150-300ms transitions

## 🔐 Authentication Flow

- **Protected Routes**: Dashboard, Gallery, Subscription, Settings, Video Detail, Billing
- **Public Routes**: Landing, Login, Signup
- **Auto-redirect**: Unauthenticated users redirected to landing page
- **Session Management**: JWT-based authentication

## 📱 Responsive Design

- **Mobile**: < 768px (collapsible sidebar, stacked layout)
- **Tablet**: 768px - 1024px (sidebar visible, responsive grid)
- **Desktop**: > 1024px (full sidebar, optimal layout)

## 🎯 Key Features

### Landing Page
- Animated background gradients
- Smooth scroll to sections
- Stats showcase (10M+ videos, 500K+ users)
- Dashboard mockup with play button overlay
- Testimonials with star ratings
- Three-tier pricing cards
- Contact form with validation
- Footer with links and social media

### Dashboard Layout
- Persistent sidebar navigation
- Top bar with notifications and profile
- Responsive drawer for mobile
- Beautiful gradients and icons
- Help section with documentation link

### Home Page
- Stats cards (videos created, credits, viral score)
- URL input with validation
- Voice model dropdown with icons
- Video length selection cards
- Style chips with color coding
- Advanced options collapse
- Credits display and progress tracking
- Quick tips cards

### Gallery Page
- Stats overview (total, completed, avg score)
- Search and filter functionality
- Card-based video display
- Status indicators (completed, processing, failed)
- Viral score badges
- Download and share actions
- Context menu for additional options

### Subscription Page
- Current plan usage visualization
- Credits progress bar
- Three-tier plan comparison
- Popular plan highlighting
- Upgrade dialog with offer
- FAQ section
- 14-day money-back guarantee

### Settings Page
- Profile picture upload
- Form fields with icons
- Security settings (password, 2FA)
- Active sessions management
- Notification toggles
- Danger zone with warnings
- Delete account confirmation

## 🎨 UI/UX Best Practices

- **Accessibility**: WCAG 2.1 AA compliant
- **Touch Targets**: Minimum 44×44px for mobile
- **Loading States**: Skeletons and progress indicators
- **Error Handling**: Clear error messages with recovery actions
- **Feedback**: Toast notifications and success states
- **Navigation**: Breadcrumbs and clear hierarchy
- **Typography**: Readable font sizes (minimum 16px body)
- **Contrast**: 4.5:1 minimum for normal text
- **Motion**: Respects prefers-reduced-motion
- **Forms**: Inline validation and helper text

## 📊 Performance Optimizations

- **Code Splitting**: Route-based lazy loading
- **Image Optimization**: WebP format, lazy loading
- **Bundle Size**: Tree-shaking and minification
- **Caching**: Service worker for offline support
- **CDN**: Static assets served from CDN
- **Compression**: Gzip/Brotli compression

## 🔄 State Management

- **AuthContext**: User authentication state
- **Local State**: Component-level state with hooks
- **API Client**: Axios with interceptors
- **Session Storage**: Temporary data persistence

## 🌐 API Integration

```javascript
// Base URL configuration
const API_BASE_URL = '/api';

// Endpoints
POST /api/auth/login
POST /api/auth/signup
POST /api/videos/create
GET /api/videos
GET /api/videos/:id
DELETE /api/videos/:id
```

## 🎉 Premium Features

- **AI Voice Models**: 6 professional voice options
- **Video Styles**: 4 visual style presets
- **Viral Score**: AI-powered engagement prediction
- **Webhooks**: Real-time notifications
- **Analytics**: Detailed performance metrics
- **API Access**: Programmatic video generation
- **White-label**: Custom branding options
- **Team Management**: Collaboration features

## 📝 License

Proprietary - All rights reserved

## 🤝 Support

For support, email support@viralshots.com or visit our documentation.

---

Built with ❤️ by the ViralShots Team
