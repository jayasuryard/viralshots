const Groq = require('groq-sdk');
const logger = require('../config/logger');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function analyzeViralPotential(script, videoData) {
  logger.info('[ViralScore] Analyzing viral potential');
  
  const prompt = `You are a viral content analyst. Analyze this video script for viral potential.

SCRIPT:
${JSON.stringify(script, null, 2)}

EVALUATE:
1. Hook Strength (first 3 seconds) - Does it grab attention immediately?
2. CTA Clarity - Is the call-to-action clear and compelling?
3. Pacing - Are transitions smooth and scene durations optimal?
4. Text Readability - Are text overlays concise and impactful?
5. Engagement - Is the voiceover conversational and benefit-focused?

RETURN JSON ONLY:
{
  "score": 8.5,
  "breakdown": {
    "hook": 9,
    "cta": 8,
    "pacing": 8,
    "readability": 9,
    "engagement": 8
  },
  "tips": [
    "Start with a question to increase engagement by 40%",
    "Add urgency to CTA: 'Get started today' instead of 'Get started'",
    "Consider slowing down scene 3 by 1 second for better comprehension"
  ]
}

Rate 1-10 (decimals allowed). Provide 3-5 actionable tips.`;

  try {
    const response = await groq.chat.completions.create({
      model: 'mixtral-8x7b-32768',
      messages: [
        {
          role: 'system',
          content: 'You are a viral content analyst. Return ONLY valid JSON.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.5,
      max_tokens: 1000,
      response_format: { type: 'json_object' },
    });
    
    const analysisText = response.choices[0].message.content;
    const analysis = JSON.parse(analysisText);
    
    logger.info(`[ViralScore] Score: ${analysis.score}/10`);
    
    return {
      score: analysis.score,
      breakdown: analysis.breakdown,
      tips: analysis.tips,
    };
    
  } catch (error) {
    logger.error('[ViralScore] Error analyzing:', error);
    
    // Return default score on error
    return {
      score: 7.0,
      breakdown: {
        hook: 7,
        cta: 7,
        pacing: 7,
        readability: 7,
        engagement: 7,
      },
      tips: [
        'Consider starting with a compelling question',
        'Make your CTA more action-oriented',
        'Ensure text overlays are short and impactful',
      ],
    };
  }
}

module.exports = { analyzeViralPotential };
