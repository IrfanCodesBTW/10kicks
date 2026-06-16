import { useEffect, RefObject, useRef } from 'react';
import gsap from 'gsap';
import { usePrefersReducedMotion } from '@/lib/hooks/useMediaQuery';
import { useUI } from '@/lib/context/AppContext';

export function useOverlayAnimation(
  containerRef: RefObject<HTMLDivElement>,
  isActive: boolean
) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const prevActiveRef = useRef(isActive);
  const { closeAllOverlays } = useUI();

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const header = container.querySelector('.overlay-header') as HTMLElement;
    const content = container.querySelector('.overlay-content') as HTMLElement;
    const footer = container.querySelector('.overlay-footer') as HTMLElement;

    if (isActive && !prevActiveRef.current) {
      document.body.style.overflow = 'hidden';

      if (!prefersReducedMotion && header) {
        gsap.fromTo(header, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', delay: 0.25 });
      }
      if (!prefersReducedMotion && content) {
        gsap.fromTo(content, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', delay: 0.3 });
      }
      if (!prefersReducedMotion && footer) {
        gsap.fromTo(footer, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', delay: 0.35 });
      }
    }

    if (!isActive && prevActiveRef.current) {
      document.body.style.overflow = '';
    }

    prevActiveRef.current = isActive;
  }, [isActive, prefersReducedMotion, containerRef]);

  // Keydown Escape event listener registered when this overlay is active
  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeAllOverlays();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isActive, closeAllOverlays]);
}