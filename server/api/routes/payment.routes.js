const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const prisma = require('../../config/database');
const { verifyToken } = require('../../middleware/auth.middleware');
const { CREDIT_PACKAGES } = require('../../utils/constants');

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create order
router.post('/create-order', verifyToken, async (req, res) => {
  try {
    const { package: packageId } = req.body;
    
    const packageInfo = CREDIT_PACKAGES[packageId];
    if (!packageInfo) {
      return res.status(400).json({ error: 'Invalid package' });
    }
    
    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: packageInfo.amount,
      currency: 'INR',
      receipt: `order_${Date.now()}`,
    });
    
    // Store transaction
    await prisma.transaction.create({
      data: {
        userId: req.user.id,
        razorpayOrderId: order.id,
        amount: packageInfo.amount,
        credits: packageInfo.credits,
        status: 'created',
      },
    });
    
    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
      credits: packageInfo.credits,
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Verify payment
router.post('/verify', verifyToken, async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    
    // Verify signature
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');
    
    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ error: 'Invalid payment signature' });
    }
    
    // Find transaction
    const transaction = await prisma.transaction.findUnique({
      where: { razorpayOrderId: razorpay_order_id },
    });
    
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    
    if (transaction.status === 'paid') {
      return res.status(400).json({ error: 'Payment already processed' });
    }
    
    // Update transaction and add credits
    await prisma.$transaction([
      prisma.transaction.update({
        where: { razorpayOrderId: razorpay_order_id },
        data: {
          razorpayPaymentId: razorpay_payment_id,
          razorpaySignature: razorpay_signature,
          status: 'paid',
        },
      }),
      prisma.user.update({
        where: { id: req.user.id },
        data: {
          credits: { increment: transaction.credits },
        },
      }),
    ]);
    
    // Fetch updated user
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { credits: true },
    });
    
    res.json({
      success: true,
      message: `Payment successful! ${transaction.credits} credits added.`,
      credits: user.credits,
    });
  } catch (error) {
    console.error('Verify payment error:', error);
    res.status(500).json({ error: 'Payment verification failed' });
  }
});

// Get transaction history
router.get('/history', verifyToken, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const transactions = await prisma.transaction.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
      skip,
      take: parseInt(limit),
      select: {
        id: true,
        amount: true,
        credits: true,
        status: true,
        createdAt: true,
      },
    });
    
    const total = await prisma.transaction.count({
      where: { userId: req.user.id },
    });
    
    res.json({
      transactions,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error('Get history error:', error);
    res.status(500).json({ error: 'Failed to fetch transaction history' });
  }
});

module.exports = router;
