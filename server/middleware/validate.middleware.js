const { body, validationResult } = require('express-validator');

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const signupValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  validateRequest,
];

const loginValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('password').notEmpty().withMessage('Password required'),
  validateRequest,
];

const createVideoValidation = [
  body('url').isURL().withMessage('Valid URL required'),
  body('videoLength').optional().isIn(['short', 'medium', 'long']).withMessage('Invalid video length'),
  body('webhookUrl').optional().isURL().withMessage('Valid webhook URL required'),
  validateRequest,
];

module.exports = {
  validateRequest,
  signupValidation,
  loginValidation,
  createVideoValidation,
};
