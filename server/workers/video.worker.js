const { Worker } = require('bullmq');
const prisma = require('../config/database');
const redisClient = require('../config/redis');
const logger = require('../config/logger');

const screenshotService = require('../services/screenshot.service');
const scriptService = require('../services/script.service');
const voiceoverService = require('../services/voiceover.service');
const remotionService = require('../services/remotion.service');
const viralScoreService = require('../services/viral-score.service');
const webhookService = require('../services/webhook-delivery.service');

const videoWorker = new Worker(
  'video-generation',
  async (job) => {
    const { videoId, url, videoLength, webhookUrl } = job.data;
    
    try {
      logger.info(`[Worker] Starting job ${job.id} for video ${videoId}`);
      
      // Update status
      await updateVideoProgress(videoId, 'processing', 10);
      
      // Step 1: Capture screenshots (30s)
      logger.info('[Worker] Step 1: Capturing screenshots...');
      const screenshotsData = await screenshotService.captureScreenshots(url, job.id);
      await updateVideoProgress(videoId, 'processing', 30);
      
      // Step 2: Generate script (20s)
      logger.info('[Worker] Step 2: Generating script...');
      const script = await scriptService.generateScript(screenshotsData, url, videoLength);
      await updateVideoProgress(videoId, 'processing', 50);
      
      // Step 3: Generate voiceover (30s)
      logger.info('[Worker] Step 3: Generating voiceover...');
      const audioData = await voiceoverService.generateVoiceover(script, job.id);
      await updateVideoProgress(videoId, 'processing', 70);
      
      // Step 4: Render videos (90s)
      logger.info('[Worker] Step 4: Rendering videos...');
      const videoUrls = await remotionService.renderVideo(script, audioData, screenshotsData, job.id);
      await updateVideoProgress(videoId, 'processing', 90);
      
      // Step 5: Calculate viral score (10s)
      logger.info('[Worker] Step 5: Analyzing viral potential...');
      const viralAnalysis = await viralScoreService.analyzeViralPotential(script, videoUrls);
      await updateVideoProgress(videoId, 'processing', 95);
      
      // Save to database
      await prisma.video.update({
        where: { id: videoId },
        data: {
          status: 'completed',
          progress: 100,
          scriptData: script,
          audioUrl: audioData.relativePath,
          mp4Url: videoUrls.mp4,
          squareUrl: videoUrls.square,
          gifUrl: videoUrls.gif,
          viralScore: viralAnalysis.score,
          viralTips: viralAnalysis.tips,
          duration: script.totalDuration,
          screenshotCount: screenshotsData.count,
          completedAt: new Date(),
        },
      });
      
      logger.info(`[Worker] Completed job ${job.id} successfully`);
      
      // Send webhook
      if (webhookUrl) {
        await webhookService.sendWebhook(videoId, webhookUrl, {
          event: 'video.completed',
          videoId,
          urls: videoUrls,
          viralScore: viralAnalysis.score,
          tips: viralAnalysis.tips,
        });
      }
      
      return { success: true, videoId };
      
    } catch (error) {
      logger.error(`[Worker] Error in job ${job.id}:`, error);
      
      // Mark as failed
      await prisma.video.update({
        where: { id: videoId },
        data: {
          status: 'failed',
          errorMessage: error.message,
        },
      });
      
      // Refund credit
      await refundCredit(videoId);
      
      throw error;
    }
  },
  {
    connection: redisClient,
    concurrency: 2, // Process 2 videos at a time
  }
);

async function updateVideoProgress(videoId, status, progress) {
  await prisma.video.update({
    where: { id: videoId },
    data: { status, progress },
  });
  logger.info(`[Worker] Video ${videoId}: ${progress}%`);
}

async function refundCredit(videoId) {
  try {
    const video = await prisma.video.findUnique({
      where: { id: videoId },
      include: { user: true },
    });
    
    if (video) {
      await prisma.user.update({
        where: { id: video.userId },
        data: { credits: { increment: 1 } },
      });
      logger.info(`[Worker] Refunded 1 credit to user ${video.userId}`);
    }
  } catch (error) {
    logger.error('[Worker] Error refunding credit:', error);
  }
}

videoWorker.on('completed', (job) => {
  logger.info(`[Worker] Job ${job.id} completed`);
});

videoWorker.on('failed', (job, err) => {
  logger.error(`[Worker] Job ${job.id} failed:`, err.message);
});

module.exports = videoWorker;
