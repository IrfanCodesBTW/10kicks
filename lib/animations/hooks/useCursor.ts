import { useEffect, useRef, RefObject } from 'react';
import { useMediaQuery } from '@/lib/hooks/useMediaQuery';

export function useCursor(
  cursorRef: RefObject<HTMLDivElement>,
  ringRef: RefObject<HTMLDivElement>
) {
  const isMobile = useMediaQuery('(pointer: coarse)');
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  useEffect(() => {
    if (isMobile || prefersReducedMotion) {
      if (cursorRef.current) cursorRef.current.style.display = 'none';
      if (ringRef.current) ringRef.current.style.display = 'none';
      return;
    }

    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let isMoving = false;
    let moveTimeout: ReturnType<typeof setTimeout>;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isMoving) {
        document.body.classList.add('mouse-moving');
        isMoving = true;
      }

      clearTimeout(moveTimeout);
      moveTimeout = setTimeout(() => {
        document.body.classList.remove('mouse-moving');
        isMoving = false;
      }, 1500);

      cursor.style.left = `${mouseX}px`;
      cursor.style.top = `${mouseY}px`;
    };

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;

      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;

      rafId = requestAnimationFrame(animateRing);
    };

    const interactiveSelectors = [
      'a', 'button', '.product-card', '.brand-logo-card',
      '.universe-panel', '.gallery-thumbnail', '.magnetic-btn',
      '[onclick]', '.card-action-btn', '.detail-size-btn',
      '.qty-ctrl-btn', '.overlay-close', '.nav-links a',
      '.icon-btn', '.mob-nav-item', '.pagination button'
    ].join(', ');

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(interactiveSelectors)) {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        ring.style.transform = 'translate(-50%, -50%) scale(1.2)';
        ring.style.borderColor = 'var(--color-accent)';
        ring.style.backgroundColor = 'rgba(255, 90, 31, 0.05)';
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(interactiveSelectors)) {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        ring.style.transform = 'translate(-50%, -50%) scale(1)';
        ring.style.borderColor = 'var(--color-accent)';
        ring.style.backgroundColor = 'transparent';
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    rafId = requestAnimationFrame(animateRing);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(rafId);
      clearTimeout(moveTimeout);
    };
  }, [isMobile, prefersReducedMotion, cursorRef, ringRef]);
}

export function useCursorRefs() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  return { cursorRef, ringRef };
}