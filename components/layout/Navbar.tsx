import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUI, useCart, useWishlist } from '@/lib/context/AppContext';
import { useLenis } from '@/components/animations/LenisProvider';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { openOverlay, closeAllOverlays, currentUser, setCurrentUser, showToast } = useUI();
  const [searchInput, setSearchQuery] = useState('');
  const { lenis, scroll } = useLenis();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const prevScroll = useRef(0);
  const forceOpaque = location.pathname === '/brands' || location.pathname.startsWith('/brand/');

  useEffect(() => {
    setScrolled(scroll > 60);
    const delta = scroll - prevScroll.current;
    if (scroll > 200 && delta > 5) {
      setHidden(true);
    } else if (delta < -5 || scroll < 200) {
      setHidden(false);
    }
    prevScroll.current = scroll;
  }, [scroll]);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    closeAllOverlays();
    navigate('/');
    if (lenis) {
      lenis.scrollTo(0, { immediate: false });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (!el) return;
    const top = el.getBoundingClientRect().top + (lenis ? lenis.scroll : window.scrollY) - 80;
    if (lenis) {
      lenis.scrollTo(top, { immediate: false });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavLinkClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    closeAllOverlays();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => scrollToSection(sectionId), 150);
    } else {
      scrollToSection(sectionId);
    }
  };

  const executeSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim() === '') return;
    closeAllOverlays();
    // Pre-populate search query and open the search catalog overlay
    openOverlay('catalogOverlay');
  };

  const handleSignOut = () => {
    if (window.confirm('Log out of 10KICKS Portfolio?')) {
      setCurrentUser(null);
      showToast('Signed out of portfolio.');
    }
  };

  return (
    <header className={`nav${scrolled || forceOpaque ? ' scrolled' : ''}${hidden ? ' nav-hidden' : ''}`} id="mainNav">
      <a href="/" className="nav-logo" onClick={handleLogoClick}>
        10<span>K</span>ICKS
      </a>
      
      <nav className="nav-links">
        <a href="#drops" onClick={(e) => handleNavLinkClick(e, 'drops')}>Drops</a>
        <a href="/brands" onClick={(e) => { e.preventDefault(); closeAllOverlays(); navigate('/brands'); }}>Brands</a>
        <a href="#culture" onClick={(e) => handleNavLinkClick(e, 'culture')}>Stories</a>
        <a href="#" onClick={(e) => { e.preventDefault(); openOverlay('aboutOverlay'); }}>About</a>
      </nav>
      

      <div className="nav-actions">
        <form onSubmit={executeSearch} className="search-box">
          <input 
            type="text" 
            placeholder="Search..." 
            value={searchInput}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </form>
        
        <button 
          className="icon-btn" 
          onClick={() => openOverlay('catalogOverlay')} 
          title="Search Archives"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
        
        <button 
          className="icon-btn" 
          onClick={() => openOverlay('wishlistOverlay')} 
          title="Saved Collection"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
          {wishlistCount > 0 && <span className="icon-cnt">{wishlistCount}</span>}
        </button>
        
        <button 
          className="icon-btn" 
          onClick={() => openOverlay('cartOverlay')} 
          title="Locker"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          {cartCount > 0 && <span className="icon-cnt">{cartCount}</span>}
        </button>
        
        {/* Drawer menu trigger */}
        <button 
          className="hamburger-toggle" 
          id="hamburgerToggle" 
          onClick={() => openOverlay('hamburgerOverlay')} 
          aria-label="Open menu"
          style={{ cursor: 'pointer' }}
        >
          <svg viewBox="0 0 24 24">
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        
        {currentUser ? (
          <button 
            type="button" 
            className="btn-nav-auth" 
            id="btn-user" 
            onClick={handleSignOut}
            style={{ borderColor: 'var(--color-gold)', color: 'var(--color-gold)', display: 'inline-flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
          >
            <svg viewBox="0 0 24 24" style={{ width: '13px', height: '13px', stroke: 'currentColor', strokeWidth: 2, fill: 'none' }}>
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span>{currentUser.name.split(' ')[0]}</span>
          </button>
        ) : (
          <button 
            type="button" 
            className="btn-nav-auth" 
            id="btn-login" 
            onClick={() => openOverlay('authOverlay')}
            style={{ cursor: 'pointer' }}
          >
            Access
          </button>
        )}
      </div>
    </header>
  );
}
