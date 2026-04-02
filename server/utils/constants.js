const CREDIT_PACKAGES = {
  '10': { credits: 10, amount: 900 },    // ₹9
  '50': { credits: 50, amount: 3900 },   // ₹39
  '100': { credits: 100, amount: 6900 }, // ₹69
};

const VIDEO_LENGTHS = {
  short: { duration: 35, sceneDuration: 4 },
  medium: { duration: 60, sceneDuration: 5 },
  long: { duration: 90, sceneDuration: 6 },
};

const VIDEO_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
};

const WEBHOOK_STATUS = {
  PENDING: 'pending',
  SUCCESS: 'success',
  FAILED: 'failed',
};

module.exports = {
  CREDIT_PACKAGES,
  VIDEO_LENGTHS,
  VIDEO_STATUS,
  WEBHOOK_STATUS,
};
