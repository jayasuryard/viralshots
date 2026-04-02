const Redis = require('ioredis');

const redisClient = new Redis(process.env.REDIS_URL, {
  tls: process.env.REDIS_TLS === 'true' ? {} : undefined,
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
});

redisClient.on('connect', () => {
  console.log('✅ Connected to Upstash Redis');
});

redisClient.on('error', (err) => {
  console.error('❌ Redis connection error:', err);
});

module.exports = redisClient;
