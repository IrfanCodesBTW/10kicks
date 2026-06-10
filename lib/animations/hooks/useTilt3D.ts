import { useEffect, RefObject } from 'react';
import gsap from 'gsap';
import { usePrefersReducedMotion, useIsTouch } from '@/lib/hooks/useMediaQuery';

export function useTilt3D(ref: RefObject<HTMLElement>, sensitivity: number = 15) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const isTouch = useIsTouch();

  useEffect(() => {
    if (prefersReducedMotion || isTouch || !ref.current) return;

    const el = ref.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      const rotateY = (x - 0.5) * sensitivity;
      const rotateX = (0.5 - y) * sensitivity;

      gsap.to(el, {
        rotateX,
        rotateY,
        duration: 0.4,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.4)',
        overwrite: 'auto',
      });
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref, sensitivity, prefersReducedMotion, isTouch]);
}