import { useEffect, useRef, RefObject } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { usePrefersReducedMotion } from '@/lib/hooks/useMediaQuery';

export interface PageTransitionOptions {
  duration?: number;
  ease?: string;
}

export function usePageTransition(
  containerRef: RefObject<HTMLElement>,
  options: PageTransitionOptions = {}
) {
  const { duration = 0.4, ease = 'power3.out' } = options;
  const location = useLocation();
  const prefersReducedMotion = usePrefersReducedMotion();
  const prevPath = useRef(location.pathname);

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    if (prevPath.current === location.pathname) return;

    prevPath.current = location.pathname;
    const el = containerRef.current;

    gsap.fromTo(el,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration, ease, clearProps: 'all' }
    );
  }, [location.pathname, containerRef, duration, ease, prefersReducedMotion]);
}