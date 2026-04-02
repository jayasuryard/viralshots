import { Stack, Typography, Chip } from '@mui/material';
import GsapReveal from './GsapReveal';

export default function SectionHeader({ chip, chipColor, chipBorder, title, subtitle }) {
  return (
    <GsapReveal>
      <Stack spacing={2.5} alignItems="center" textAlign="center" sx={{ mb: { xs: 6, md: 10 } }}>
        <Chip
          label={chip}
          size="small"
          sx={{
            bgcolor: `${chipColor}15`,
            color: chipColor,
            fontWeight: 700,
            fontSize: '0.7rem',
            letterSpacing: 2,
            border: `1px solid ${chipBorder}`,
            px: 2,
            height: 32,
          }}
        />
        <Typography
          variant="h2"
          sx={{
            fontWeight: 800,
            fontSize: { xs: '2.2rem', md: '3.5rem' },
            letterSpacing: '-0.025em',
            background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.8) 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: 1.15,
          }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography
            sx={{
              color: 'rgba(255,255,255,0.45)',
              maxWidth: 600,
              fontSize: { xs: '1rem', md: '1.15rem' },
              lineHeight: 1.8,
              fontWeight: 400,
            }}
          >
            {subtitle}
          </Typography>
        )}
      </Stack>
    </GsapReveal>
  );
}
