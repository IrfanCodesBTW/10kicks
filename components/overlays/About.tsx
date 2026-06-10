import { useRef } from 'react';
import { useUI } from '@/lib/context/AppContext';
import { useOverlayAnimation } from '@/lib/animations/hooks/useOverlayAnimation';

export default function About() {
  const { activeOverlay, closeOverlay } = useUI();
  const containerRef = useRef<HTMLDivElement>(null);

  const isActive = activeOverlay === 'aboutOverlay';
  useOverlayAnimation(containerRef, isActive);

  return (
    <div 
      ref={containerRef}
      className={`overlay-backdrop center-align ${isActive ? 'active' : ''}`} 
      onClick={(e) => {
        if (e.target === e.currentTarget) closeOverlay('aboutOverlay');
      }}
    >
      <div className="overlay-modal" style={{ width: '550px', maxHeight: '85vh' }}>
        <div className="overlay-header">
          <h2>About 10KICKS</h2>
          <button 
            type="button" 
            className="overlay-close" 
            onClick={() => closeOverlay('aboutOverlay')} 
            aria-label="Close about modal"
          >
            &times;
          </button>
        </div>
        
        <div className="overlay-content" style={{ padding: 'var(--space-6) var(--space-8)' }}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '14px', lineHeight: 1.7, marginBottom: 'var(--space-6)', fontFamily: 'var(--font-editorial)', fontStyle: 'italic' }}>
            Where Kicks Become Culture. An interactive digital catalogue showcasing rare sneakers curated from street archives, shipped securely across India.
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', padding: 'var(--space-6)' }}>
              <h4 style={{ fontFamily: 'var(--font-header)', fontWeight: 800, fontSize: '16px', color: 'var(--color-text)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                The Architecture
              </h4>
              <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                10KICKS is a meticulously engineered single-page application built to deliver a premium, seamless e-commerce experience. The platform utilizes a sophisticated dynamic overlay system, ensuring instantaneous transitions without page reloads. This guarantees a cinematic, buttery-smooth browsing experience across our entire catalogue.
              </p>
            </div>
            
            <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', padding: 'var(--space-6)' }}>
              <h4 style={{ fontFamily: 'var(--font-header)', fontWeight: 800, fontSize: '16px', color: 'var(--color-text)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                The Founder
              </h4>
              <div style={{ display: 'inline-block', background: 'rgba(199, 163, 106, 0.1)', color: 'var(--color-gold)', fontSize: '10px', fontWeight: 800, padding: '4px 8px', marginBottom: '12px', letterSpacing: '1px', textTransform: 'uppercase' }}>
                Shaik Irfan • Site Owner
              </div>
              <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                Driven by a passion for both street culture and high-end software architecture, Irfan conceptualized and engineered 10KICKS. The vision was to elevate the standard sneaker shopping experience into an immersive digital museum—where every product is treated as an archival artifact of luxury streetwear.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
