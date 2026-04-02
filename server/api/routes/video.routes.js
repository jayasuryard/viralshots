const express = require('express');
const prisma = require('../../config/database');
const { videoQueue } = require('../../config/queue');
const { verifyToken } = require('../../middleware/auth.middleware');
const { checkCredits } = require('../../middleware/credits.middleware');
const { createVideoValidation } = require('../../middleware/validate.middleware');
const { isValidUrl } = require('../../utils/url-validator.util');

const router = express.Router();

// Create video
router.post('/create', verifyToken, checkCredits(1), createVideoValidation, async (req, res) => {
  try {
    const { url, videoLength = 'medium', webhookUrl } = req.body;
    
    // Validate URL
    if (!isValidUrl(url)) {
      return res.status(400).json({ error: 'Invalid or blocked URL' });
    }
    
    // Deduct credit
    await prisma.user.update({
      where: { id: req.user.id },
      data: { credits: { decrement: 1 } },
    });
    
    // Create video record
    const video = await prisma.video.create({
      data: {
        userId: req.user.id,
        url,
        videoLength,
        webhookUrl,
        status: 'pending',
      },
    });
    
    // Add to queue
    const job = await videoQueue.add('generate', {
      videoId: video.id,
      url,
      videoLength,
      webhookUrl,
    });
    
    // Update jobId
    await prisma.video.update({
      where: { id: video.id },
      data: { jobId: job.id },
    });
    
    res.json({
      success: true,
      videoId: video.id,
      jobId: job.id,
      message: 'Video generation started',
      estimatedTime: videoLength === 'short' ? '2-3 minutes' : videoLength === 'long' ? '3-4 minutes' : '2.5-3.5 minutes',
    });
  } catch (error) {
    console.error('Create video error:', error);
    res.status(500).json({ error: 'Failed to create video' });
  }
});

// Get video status by jobId
router.get('/status/:jobId', verifyToken, async (req, res) => {
  try {
    const video = await prisma.video.findUnique({
      where: { jobId: req.params.jobId },
      select: {
        id: true,
        status: true,
        progress: true,
        errorMessage: true,
      },
    });
    
    if (!video) {
      return res.status(404).json({ error: 'Job not found' });
    }
    
    res.json(video);
  } catch (error) {
    console.error('Get status error:', error);
    res.status(500).json({ error: 'Failed to fetch status' });
  }
});

// Get video by ID
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const video = await prisma.video.findUnique({
      where: { id: req.params.id },
      include: { user: { select: { email: true } } },
    });
    
    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }
    
    if (video.userId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    res.json(video);
  } catch (error) {
    console.error('Get video error:', error);
    res.status(500).json({ error: 'Failed to fetch video' });
  }
});

// List user videos
router.get('/', verifyToken, async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const where = { userId: req.user.id };
    if (status) {
      where.status = status;
    }
    
    const videos = await prisma.video.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip,
      take: parseInt(limit),
      select: {
        id: true,
        url: true,
        status: true,
        progress: true,
        mp4Url: true,
        squareUrl: true,
        gifUrl: true,
        viralScore: true,
        createdAt: true,
        completedAt: true,
      },
    });
    
    const total = await prisma.video.count({ where });
    
    res.json({
      videos,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error('List videos error:', error);
    res.status(500).json({ error: 'Failed to fetch videos' });
  }
});

// Retry failed video
router.post('/:id/retry', verifyToken, checkCredits(1), async (req, res) => {
  try {
    const video = await prisma.video.findUnique({
      where: { id: req.params.id },
    });
    
    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }
    
    if (video.userId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    if (video.status !== 'failed') {
      return res.status(400).json({ error: 'Only failed videos can be retried' });
    }
    
    // Deduct credit
    await prisma.user.update({
      where: { id: req.user.id },
      data: { credits: { decrement: 1 } },
    });
    
    // Re-add to queue
    const job = await videoQueue.add('generate', {
      videoId: video.id,
      url: video.url,
      videoLength: video.videoLength,
      webhookUrl: video.webhookUrl,
    });
    
    await prisma.video.update({
      where: { id: video.id },
      data: {
        status: 'pending',
        jobId: job.id,
        errorMessage: null,
        progress: 0,
      },
    });
    
    res.json({ success: true, jobId: job.id, message: 'Video retry started' });
  } catch (error) {
    console.error('Retry video error:', error);
    res.status(500).json({ error: 'Failed to retry video' });
  }
});

// Delete video
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const video = await prisma.video.findUnique({
      where: { id: req.params.id },
    });
    
    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }
    
    if (video.userId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    await prisma.video.delete({
      where: { id: req.params.id },
    });
    
    res.json({ success: true, message: 'Video deleted' });
  } catch (error) {
    console.error('Delete video error:', error);
    res.status(500).json({ error: 'Failed to delete video' });
  }
});

module.exports = router;
