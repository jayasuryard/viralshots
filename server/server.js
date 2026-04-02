require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');

const apiRoutes = require('./api');
const errorHandler = require('./middleware/error.middleware');
const logger = require('./config/logger');
const { startCleanupJob } = require('./utils/cleanup.util');

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: 'Too many requests, please try again later',
});

const videoLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: parseInt(process.env.MAX_VIDEOS_PER_HOUR) || 10,
  message: 'Video generation limit reached, please try again later',
});

app.use('/api/auth/signup', authLimiter);
app.use('/api/auth/login', authLimiter);
app.use('/api/videos/create', videoLimiter);

// Serve static files
app.use('/videos', express.static(path.join(__dirname, 'public/videos')));

// Health check
app.get('/health', async (req, res) => {
  try {
    const prisma = require('./config/database');
    await prisma.$queryRaw`SELECT 1`;
    
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      services: {
        database: 'connected',
        redis: 'connected',
      },
    });
  } catch (error) {
    res.status(503).json({
      status: 'error',
      message: error.message,
    });
  }
});

// API routes
app.use('/api', apiRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: '🎬 ViralShots API',
    version: '1.0.0',
    docs: '/api',
  });
});

// Error handling
app.use(errorHandler);

// Start cleanup job
startCleanupJob();

// Start worker in development
if (process.env.NODE_ENV !== 'production') {
  require('./workers/video.worker');
  logger.info('🎬 Video worker started');
}

// Start server
app.listen(PORT, () => {
  logger.info(`🚀 Server running on port ${PORT}`);
  logger.info(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
  logger.info(`🌐 Frontend URL: ${process.env.FRONTEND_URL}`);
});
