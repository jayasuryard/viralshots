const fs = require('fs');
const path = require('path');
const logger = require('../config/logger');

function cleanupOldFiles() {
  const tempDir = process.env.TEMP_DIR || './temp';
  const maxAge = 24 * 60 * 60 * 1000; // 24 hours
  
  try {
    if (!fs.existsSync(tempDir)) {
      return;
    }
    
    const folders = fs.readdirSync(tempDir);
    
    folders.forEach((folder) => {
      const folderPath = path.join(tempDir, folder);
      
      try {
        const stats = fs.statSync(folderPath);
        
        if (stats.isDirectory() && Date.now() - stats.mtimeMs > maxAge) {
          fs.rmSync(folderPath, { recursive: true, force: true });
          logger.info(`[Cleanup] Deleted old folder: ${folder}`);
        }
      } catch (err) {
        logger.error(`[Cleanup] Error processing ${folder}:`, err);
      }
    });
  } catch (error) {
    logger.error('[Cleanup] Error during cleanup:', error);
  }
}

// Run cleanup every hour
function startCleanupJob() {
  const interval = parseInt(process.env.CLEANUP_INTERVAL_MS) || 3600000;
  setInterval(cleanupOldFiles, interval);
  logger.info('[Cleanup] Cleanup job started');
}

module.exports = { cleanupOldFiles, startCleanupJob };
