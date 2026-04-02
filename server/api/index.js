const express = require('express');
const authRoutes = require('./routes/auth.routes');
const videoRoutes = require('./routes/video.routes');
const paymentRoutes = require('./routes/payment.routes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/videos', videoRoutes);
router.use('/payments', paymentRoutes);

module.exports = router;
