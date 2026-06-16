import { useEffect, RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useMediaQuery } from '@/lib/hooks/useMediaQuery';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export interface HorizontalScrollOptions {
  trackRef: RefObject<HTMLElement>;
  outerRef: RefObject<HTMLElement>;
  enabled?: boolean;
  dragEnabled?: boolean;
  snapOnRelease?: boolean;
  scrub?: number | boolean;
}

export function useHorizontalScroll(options: HorizontalScrollOptions) {
  const {
    trackRef,
    outerRef,
    enabled = true,
    dragEnabled = true,
    snapOnRelease = false,
    scrub = 1,
  } = options;

  const isMobile = useMediaQuery('(max-width: 768px)');
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  useGSAP(() => {
    if (!enabled || !trackRef.current || !outerRef.current) return;
    if (isMobile && !dragEnabled) return;

    const track = trackRef.current;
    const outer = outerRef.current;

    const scrollTween = gsap.to(track, {
      x: () => -(track.scrollWidth - window.innerWidth + 120),
      ease: 'none',
      scrollTrigger: {
        trigger: outer,
        pin: true,
        scrub,
        start: 'top 12%',
        end: () => '+=' + (track.scrollWidth - window.innerWidth + 150),
        invalidateOnRefresh: true,
        anticipatePin: 1,
      },
    });

    if (dragEnabled) {
      let isDragging = false;
      let startX = 0;
      let scrollStart = 0;

      const onPointerDown = (e: PointerEvent) => {
        if (prefersReducedMotion) return;
        isDragging = true;
        startX = e.clientX;
        scrollStart = gsap.getProperty(track, 'x') as number;
        track.style.cursor = 'grabbing';
        e.preventDefault();
      };

      const onPointerMove = (e: PointerEvent) => {
        if (!isDragging) return;
        const delta = startX - e.clientX;
        const newX = scrollStart - delta;
        const maxX = -(track.scrollWidth - window.innerWidth);
        const clampedX = gsap.utils.clamp(maxX, 0, newX);
        gsap.set(track, { x: clampedX });
        ScrollTrigger.update();
      };

      const onPointerUp = () => {
        if (!isDragging) return;
        isDragging = false;
        track.style.cursor = 'grab';
        if (snapOnRelease) {
          // Optional: snap to nearest panel
        }
      };

      track.addEventListener('pointerdown', onPointerDown);
      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', onPointerUp);

      // Create ResizeObserver to refresh ScrollTrigger when images load and track size changes
      const resizeObserver = new ResizeObserver(() => {
        ScrollTrigger.refresh();
      });
      resizeObserver.observe(track);

      return () => {
        track.removeEventListener('pointerdown', onPointerDown);
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerup', onPointerUp);
        resizeObserver.disconnect();
        scrollTween.kill();
        ScrollTrigger.getAll().forEach(st => st.kill());
      };
    }

    // Create ResizeObserver for non-draggable mode too
    const resizeObserver = new ResizeObserver(() => {
      ScrollTrigger.refresh();
    });
    resizeObserver.observe(track);

    return () => {
      resizeObserver.disconnect();
      scrollTween.kill();
    };
  }, { scope: outerRef, dependencies: [enabled, dragEnabled, scrub, isMobile, prefersReducedMotion] });
}