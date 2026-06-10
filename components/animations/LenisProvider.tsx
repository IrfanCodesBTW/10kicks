import { useEffect, ReactNode, createContext, useContext, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface LenisContextValue {
  lenis: Lenis | null;
  scroll: number;
  isScrolling: boolean;
}

const LenisContext = createContext<LenisContextValue>({
  lenis: null,
  scroll: 0,
  isScrolling: false,
});

export default function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const [scroll, setScroll] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const rafRef = useRef<number>(0);
  const scrollEndTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;

    const raf = (time: number) => {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    };
    rafRef.current = requestAnimationFrame(raf);

    const scrollHandler = () => {
      const s = lenis.scroll;
      setScroll(s);

      setIsScrolling(true);
      if (scrollEndTimerRef.current) clearTimeout(scrollEndTimerRef.current);
      scrollEndTimerRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);

      const nav = document.getElementById('mainNav');
      if (nav) {
        nav.classList.toggle('nav-scrolled', s > 60);
        nav.classList.toggle('scrolled', s > 60);
      }

      const topBtn = document.getElementById('scrollTopBtn');
      if (topBtn) {
        topBtn.classList.toggle('visible', s > 400);
      }

      ScrollTrigger.update();
    };

    lenis.on('scroll', scrollHandler);

    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value!, { immediate: false });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      fixedMarkers: true,
    });

    ScrollTrigger.addEventListener('refresh', () => lenis.resize());
    ScrollTrigger.refresh();

    const handleResize = () => {
      lenis.resize();
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (scrollEndTimerRef.current) clearTimeout(scrollEndTimerRef.current);
      window.removeEventListener('resize', handleResize);
      lenis.off('scroll', scrollHandler);
      ScrollTrigger.scrollerProxy(document.documentElement, null);
      lenis.destroy();
    };
  }, []);

  return (
    <LenisContext.Provider value={{ lenis: lenisRef.current, scroll, isScrolling }}>
      {children}
    </LenisContext.Provider>
  );
}

export function useLenis() {
  return useContext(LenisContext);
}