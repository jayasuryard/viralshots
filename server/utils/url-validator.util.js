function isValidUrl(urlString) {
  try {
    const url = new URL(urlString);
    
    // Check protocol
    if (!['http:', 'https:'].includes(url.protocol)) {
      return false;
    }
    
    // Block private IPs
    const hostname = url.hostname;
    const privateIpPatterns = [
      /^localhost$/i,
      /^127\./,
      /^10\./,
      /^172\.(1[6-9]|2[0-9]|3[01])\./,
      /^192\.168\./,
      /^0\.0\.0\.0$/,
      /^::1$/,
      /^fe80:/i,
    ];
    
    for (const pattern of privateIpPatterns) {
      if (pattern.test(hostname)) {
        return false;
      }
    }
    
    return true;
  } catch (error) {
    return false;
  }
}

module.exports = { isValidUrl };
