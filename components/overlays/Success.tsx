import { useRef } from 'react';
import { useUI } from '@/lib/context/AppContext';
import { useOverlayAnimation } from '@/lib/animations/hooks/useOverlayAnimation';

export default function Success() {
  const { activeOverlay, closeOverlay, createdOrderId } = useUI();
  const containerRef = useRef<HTMLDivElement>(null);

  const isActive = activeOverlay === 'successOverlay';
  useOverlayAnimation(containerRef, isActive);

  return (
    <div ref={containerRef} className={`overlay-backdrop center-align ${isActive ? 'active' : ''}`}>
      <div className="overlay-modal" style={{ width: '400px', textAlign: 'center' }}>
        <div className="overlay-content" style={{ padding: 'var(--space-12) var(--space-8)' }}>
          <svg viewBox="0 0 24 24" style={{ width: '50px', height: '50px', fill: 'none', stroke: 'var(--color-gold)', strokeWidth: 1.5, margin: '0 auto 16px' }}>
            <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z"></path>
            <path d="M3 20h18"></path>
          </svg>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>
            Reservation Logged
          </h2>
          <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: 'var(--space-6)' }}>
            Your placement request has been recorded into our archives. Check your email for shipping tracking logs.
          </p>
          <div 
            id="successOrderId" 
            style={{ fontFamily: 'var(--font-header)', fontSize: '14px', fontWeight: 800, color: 'var(--color-gold)', background: 'var(--color-surface)', padding: '8px', marginBottom: 'var(--space-6)', border: '1px solid var(--color-border)' }}
          >
            Collection ID: {createdOrderId || 'MOCK-10K-ID'}
          </div>
          <button 
            className="btn-luxury-cta" 
            style={{ width: '100%', cursor: 'pointer' }} 
            onClick={() => closeOverlay('successOverlay')}
          >
            Continue Browsing
          </button>
        </div>
      </div>
    </div>
  );
}
