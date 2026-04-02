const prisma = require('../config/database');

function checkCredits(requiredCredits) {
  return async (req, res, next) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.user.id },
        select: { credits: true },
      });
      
      if (!user || user.credits < requiredCredits) {
        return res.status(402).json({ 
          error: 'Insufficient credits',
          required: requiredCredits,
          available: user?.credits || 0,
        });
      }
      
      next();
    } catch (error) {
      return res.status(500).json({ error: 'Failed to check credits' });
    }
  };
}

module.exports = { checkCredits };
