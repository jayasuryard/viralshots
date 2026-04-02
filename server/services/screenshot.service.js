const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const logger = require('../config/logger');
const { isValidUrl } = require('../utils/url-validator.util');

async function captureScreenshots(url, jobId) {
  logger.info(`[Screenshot] Starting capture for ${url}`);
  
  if (!isValidUrl(url)) {
    throw new Error('Invalid or blocked URL');
  }
  
  const screenshotDir = path.join(process.env.SCREENSHOT_DIR || './temp/screenshots', jobId);
  
  // Create directory
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }
  
  let browser;
  const screenshots = [];
  
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-web-security',
        '--disable-features=IsolateOrigins,site-per-process',
      ],
    });
    
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    
    // Navigate with timeout
    await page.goto(url, {
      waitUntil: 'networkidle2',
      timeout: 30000,
    });
    
    // Wait a bit for dynamic content
    await page.waitForTimeout(2000);
    
    // Get page height
    const bodyHandle = await page.$('body');
    const { height: pageHeight } = await bodyHandle.boundingBox();
    
    // Capture hero (full viewport)
    const heroPath = path.join(screenshotDir, 'scene_1.png');
    await page.screenshot({ path: heroPath, type: 'png' });
    screenshots.push({
      id: 1,
      path: heroPath,
      relativePath: `temp/screenshots/${jobId}/scene_1.png`,
    });
    
    logger.info(`[Screenshot] Captured hero section`);
    
    // Scroll and capture sections
    const viewportHeight = 1080;
    const scrollSteps = Math.min(11, Math.ceil(pageHeight / (viewportHeight * 0.8)));
    
    for (let i = 1; i < scrollSteps; i++) {
      await page.evaluate((scrollAmount) => {
        window.scrollBy(0, scrollAmount);
      }, viewportHeight * 0.8);
      
      await page.waitForTimeout(500);
      
      const scenePath = path.join(screenshotDir, `scene_${i + 1}.png`);
      await page.screenshot({ path: scenePath, type: 'png' });
      
      screenshots.push({
        id: i + 1,
        path: scenePath,
        relativePath: `temp/screenshots/${jobId}/scene_${i + 1}.png`,
      });
    }
    
    logger.info(`[Screenshot] Captured ${screenshots.length} screenshots`);
    
    return {
      screenshots,
      count: screenshots.length,
      directory: screenshotDir,
    };
    
  } catch (error) {
    logger.error(`[Screenshot] Error capturing ${url}:`, error);
    throw new Error(`Failed to capture screenshots: ${error.message}`);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

module.exports = { captureScreenshots };
