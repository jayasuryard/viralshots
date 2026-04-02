import { Box } from '@mui/material';

export default function HexGrid() {
  return (
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(30deg, rgba(59,130,246,0.05) 12%, transparent 12.5%, transparent 87%, rgba(59,130,246,0.05) 87.5%, rgba(59,130,246,0.05)),
          linear-gradient(150deg, rgba(59,130,246,0.05) 12%, transparent 12.5%, transparent 87%, rgba(59,130,246,0.05) 87.5%, rgba(59,130,246,0.05)),
          linear-gradient(30deg, rgba(59,130,246,0.05) 12%, transparent 12.5%, transparent 87%, rgba(59,130,246,0.05) 87.5%, rgba(59,130,246,0.05)),
          linear-gradient(150deg, rgba(59,130,246,0.05) 12%, transparent 12.5%, transparent 87%, rgba(59,130,246,0.05) 87.5%, rgba(59,130,246,0.05))
        `,
        backgroundSize: '80px 140px',
        backgroundPosition: '0 0, 0 0, 40px 70px, 40px 70px',
        maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 20%, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 20%, transparent 80%)',
        pointerEvents: 'none',
      }}
    />
  );
}
