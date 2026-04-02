const axios = require('axios');
const prisma = require('../config/database');
const logger = require('../config/logger');

async function sendWebhook(videoId, url, payload) {
  logger.info(`[Webhook] Sending webhook for video ${videoId} to ${url}`);
  
  // Create webhook log
  const webhookLog = await prisma.webhookLog.create({
    data: {
      videoId,
      url,
      status: 'pending',
    },
  });
  
  // Attempt delivery
  await attemptDelivery(webhookLog.id, url, payload);
}

async function attemptDelivery(webhookLogId, url, payload, attempt = 1) {
  const maxAttempts = 3;
  
  try {
    const response = await axios.post(url, payload, {
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'ViralShots-Webhook/1.0',
        'X-Webhook-Attempt': attempt.toString(),
      },
    });
    
    // Mark as success
    await prisma.webhookLog.update({
      where: { id: webhookLogId },
      data: {
        status: 'success',
        attempts: attempt,
        lastAttemptAt: new Date(),
        lastResponse: JSON.stringify({
          status: response.status,
          data: response.data,
        }),
      },
    });
    
    logger.info(`[Webhook] Successfully delivered to ${url}`);
    
  } catch (error) {
    logger.error(`[Webhook] Attempt ${attempt} failed for ${url}:`, error.message);
    
    const errorMessage = error.response?.data 
      ? JSON.stringify(error.response.data)
      : error.message;
    
    if (attempt < maxAttempts) {
      // Calculate exponential backoff delay
      const delayMs = Math.pow(2, attempt) * 5000; // 5s, 10s, 20s
      const nextRetry = new Date(Date.now() + delayMs);
      
      await prisma.webhookLog.update({
        where: { id: webhookLogId },
        data: {
          attempts: attempt,
          lastAttemptAt: new Date(),
          lastResponse: errorMessage,
          nextRetryAt: nextRetry,
        },
      });
      
      logger.info(`[Webhook] Retrying in ${delayMs / 1000}s...`);
      
      // Schedule retry
      setTimeout(() => {
        attemptDelivery(webhookLogId, url, payload, attempt + 1);
      }, delayMs);
      
    } else {
      // Mark as failed after max attempts
      await prisma.webhookLog.update({
        where: { id: webhookLogId },
        data: {
          status: 'failed',
          attempts: attempt,
          lastAttemptAt: new Date(),
          lastResponse: errorMessage,
        },
      });
      
      logger.error(`[Webhook] Failed after ${maxAttempts} attempts: ${url}`);
    }
  }
}

module.exports = { sendWebhook };
