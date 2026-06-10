import { useEffect, RefObject } from 'react';
import gsap from 'gsap';
import { useMediaQuery } from '@/lib/hooks/useMediaQuery';

export interface MagneticOptions {
  strength?: number;
  area?: number;
  ease?: string;
  releaseEase?: string;
  disabled?: boolean;
}

export function useMagnetic(
  ref: RefObject<HTMLElement>,
  options: MagneticOptions = {}
) {
  const {
    strength = 0.35,
    area = 150,
    ease = 'power2.out',
    releaseEase = 'elastic.out(1, 0.4)',
    disabled = false,
  } = options;

  const isMobile = useMediaQuery('(pointer: coarse)');
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  useEffect(() => {
    if (disabled || isMobile || prefersReducedMotion || !ref.current) return;

    const el = ref.current;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      if (distance > area) return;

      const x = distanceX * strength;
      const y = distanceY * strength;

      gsap.to(el, { x, y, duration: 0.3, ease, overwrite: true });
    };

    const handleMouseLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: releaseEase, overwrite: true });
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, [ref, strength, area, ease, releaseEase, disabled, isMobile, prefersReducedMotion]);
}

export function useMagneticGroup(
  refs: RefObject<HTMLElement>[],
  options: MagneticOptions = {}
) {
  refs.forEach(ref => useMagnetic(ref, options));
}