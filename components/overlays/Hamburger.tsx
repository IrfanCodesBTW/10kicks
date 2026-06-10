import { useRef } from 'react';
import { useUI } from '@/lib/context/AppContext';
import { useNavigate } from 'react-router-dom';
import { useOverlayAnimation } from '@/lib/animations/hooks/useOverlayAnimation';

export default function Hamburger() {
  const { activeOverlay, closeOverlay, openOverlay } = useUI();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  const isActive = activeOverlay === 'hamburgerOverlay';
  useOverlayAnimation(containerRef, isActive);

  const handleLinkClick = (path: string, hash?: string) => {
    closeOverlay('hamburgerOverlay');
    navigate(path);
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`overlay-backdrop ${isActive ? 'active' : ''}`} 
      onClick={(e) => {
        if (e.target === e.currentTarget) closeOverlay('hamburgerOverlay');
      }}
    >
      <div className="overlay-drawer luxury-menu-drawer">
        <div className="overlay-header">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-1px' }}>
            Menu
          </h2>
          <button 
            type="button" 
            className="overlay-close" 
            onClick={() => closeOverlay('hamburgerOverlay')} 
            aria-label="Close menu"
          >
            &times;
          </button>
        </div>
        
        <div className="overlay-content" style={{ padding: 'var(--space-6) var(--space-8)' }}>
          <div className="bottom-sheet-handle"></div>
          <nav className="hamburger-menu-links" role="navigation" aria-label="Hamburger menu">
            <button 
              style={{ background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer' }}
              onClick={() => handleLinkClick('/')}
            >
              Home
            </button>
            <button 
              style={{ background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer' }}
              onClick={() => handleLinkClick('/', 'drops')}
            >
              Drops
            </button>
            <button 
              style={{ background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer' }}
              onClick={() => handleLinkClick('/brands')}
            >
              Brands
            </button>
            <button 
              style={{ background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer' }}
              onClick={() => handleLinkClick('/', 'culture')}
            >
              Stories
            </button>
            <button 
              style={{ background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer' }}
              onClick={() => {
                closeOverlay('hamburgerOverlay');
                openOverlay('aboutOverlay');
              }}
            >
              About
            </button>
          </nav>
          
          <div style={{ marginTop: 'var(--space-10)', borderTop: '1px solid var(--color-divider)', paddingTop: 'var(--space-6)' }}>
            <button 
              className="btn-luxury-cta" 
              style={{ width: '100%', cursor: 'pointer' }} 
              onClick={() => {
                closeOverlay('hamburgerOverlay');
                openOverlay('authOverlay');
              }}
            >
              Access Portfolio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
