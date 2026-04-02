import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function GsapReveal({ children, delay = 0 }) {
  const ref = useRef(null);
  
  useGSAP(() => {
    gsap.fromTo(
      ref.current,
      { y: 80, opacity: 0, rotateX: 5 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 1.2,
        delay,
        ease: 'power4.out',
        scrollTrigger: { trigger: ref.current, start: 'top 85%' },
      }
    );
  }, [delay]);
  
  return <div ref={ref} style={{ perspective: '1000px' }}>{children}</div>;
}
