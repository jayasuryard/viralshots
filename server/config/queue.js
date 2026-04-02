const { Queue } = require('bullmq');
const redisClient = require('./redis');

const videoQueue = new Queue('video-generation', {
  connection: redisClient,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 5000,
    },
    removeOnComplete: {
      age: 86400,
      count: 100,
    },
    removeOnFail: {
      age: 604800,
    },
  },
});

videoQueue.on('error', (err) => {
  console.error('❌ Queue error:', err);
});

module.exports = { videoQueue };
