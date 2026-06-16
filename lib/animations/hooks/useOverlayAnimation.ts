import { useEffect, RefObject, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { usePrefersReducedMotion } from '@/lib/hooks/useMediaQuery';
import { useUI } from '@/lib/context/AppContext';

export function useOverlayAnimation(
  containerRef: RefObject<HTMLDivElement>,
  isActive: boolean
) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const prevActiveRef = useRef(isActive);
  const { closeAllOverlays } = useUI();

  useGSAP(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const header = container.querySelector('.overlay-header') as HTMLElement;
    const content = container.querySelector('.overlay-content') as HTMLElement;
    const footer = container.querySelector('.overlay-footer') as HTMLElement;

    if (isActive && !prevActiveRef.current) {
      document.body.style.overflow = 'hidden';

      if (!prefersReducedMotion) {
        if (header) gsap.fromTo(header, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', delay: 0.1 });
        if (content) gsap.fromTo(content, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', delay: 0.15 });
        if (footer) gsap.fromTo(footer, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', delay: 0.2 });
      }
    }

    if (!isActive && prevActiveRef.current) {
      document.body.style.overflow = '';
    }

    prevActiveRef.current = isActive;
  }, { dependencies: [isActive, prefersReducedMotion], scope: containerRef });

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