import { useRef, useCallback } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useMediaQuery } from '@/lib/hooks/useMediaQuery';
import { useLenis } from '@/components/animations/LenisProvider';
import MagneticButton from '@/components/ui/MagneticButton';
import HeroVideo from './HeroVideo';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const { lenis } = useLenis();

  const scrollToSection = useCallback((targetId: string) => {
    const el = document.getElementById(targetId);
    if (!el) return;
    const top = el.getBoundingClientRect().top + (lenis ? lenis.scroll : window.scrollY) - 80;
    if (lenis) {
      lenis.scrollTo(top, { immediate: false });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [lenis]);

  useGSAP(() => {
    if (prefersReducedMotion) return;

    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: isMobile ? 0.6 : 1 } });

    tl.to('.hero-line span', { y: '0%', stagger: isMobile ? 0.08 : 0.15, delay: isMobile ? 0.2 : 0.4 })
      .from('.hero-subtitle', { opacity: 0, y: isMobile ? 10 : 15, duration: isMobile ? 0.5 : 0.8 }, '-=0.6')
      .from('.hero-btn-wrap', { opacity: 0, y: isMobile ? 10 : 15, duration: isMobile ? 0.4 : 0.6 }, '-=0.5');
  }, { scope: containerRef, dependencies: [isMobile, prefersReducedMotion] });

  return (
    <section className="hero" id="hero" ref={containerRef}>
      <HeroVideo />

      <div className="hero-content">
        <div className="hero-editorial-titles">
          <h1 className="hero-line">
            <span style={{ display: 'block' }}>Where Kicks</span>
          </h1>
          <h1 className="hero-line">
            <span style={{ display: 'block' }}>Become <em>Culture</em></span>
          </h1>

          <p className="hero-subtitle">
            Your premier destination for discovering, collecting, and securing the world's most sought-after sneaker grails.
          </p>

          <div className="hero-btn-wrap" style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center' }}>
            <MagneticButton
              as="a"
              href="#drops"
              className="btn-luxury-cta"
              style={{ padding: '0 var(--space-8)' }}
              onClick={(e) => { e.preventDefault(); scrollToSection('drops'); }}
              magneticOptions={{ strength: 0.35, area: 160 }}
            >
              Enter The Archive &nbsp; &rarr;
            </MagneticButton>
            <MagneticButton
              as="a"
              href="#rare-drops"
              className="btn-luxury-outline"
              style={{ padding: '0 var(--space-8)', borderColor: 'rgba(255,255,255,0.3)', color: '#fff' }}
              onClick={(e) => { e.preventDefault(); scrollToSection('rare-drops'); }}
              magneticOptions={{ strength: 0.25, area: 120 }}
            >
              View Rare Drops
            </MagneticButton>
          </div>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 'var(--space-8)', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-2)', opacity: 0.5, zIndex: 5, pointerEvents: 'none' }}>
        <span style={{ fontFamily: 'var(--font-header)', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#fff' }}>Scroll Down</span>
        <div style={{ width: '1px', height: '32px', background: 'linear-gradient(#fff, transparent)', animation: 'scroll-line-motion 1.8s ease-in-out infinite' }}></div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scroll-line-motion {
          0%, 100% { transform: scaleY(1); transform-origin: top; }
          50% { transform: scaleY(1.4); transform-origin: top; }
        }
      `}} />
    </section>
  );
}
