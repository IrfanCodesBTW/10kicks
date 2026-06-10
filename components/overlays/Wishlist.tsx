import { useRef } from 'react';
import { useWishlist, useUI } from '@/lib/context/AppContext';
import { useOverlayAnimation } from '@/lib/animations/hooks/useOverlayAnimation';

export default function Wishlist() {
  const { wishlist, toggleWishlist } = useWishlist();
  const { activeOverlay, closeOverlay, openOverlay, setSelectedProductId, setSelectedSize, setDetailQuantity } = useUI();
  const containerRef = useRef<HTMLDivElement>(null);

  const isActive = activeOverlay === 'wishlistOverlay';
  useOverlayAnimation(containerRef, isActive);

  const handleBrowseCollection = () => {
    closeOverlay('wishlistOverlay');
    setTimeout(() => {
      const el = document.getElementById('drops');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 450);
  };

  const handleSelectSize = (id: string) => {
    closeOverlay('wishlistOverlay');
    setSelectedProductId(id);
    setSelectedSize(null);
    setDetailQuantity(1);
    openOverlay('detailOverlay');
  };

  return (
    <div 
      ref={containerRef}
      className={`overlay-backdrop ${isActive ? 'active' : ''}`} 
      onClick={(e) => {
        if (e.target === e.currentTarget) closeOverlay('wishlistOverlay');
      }}
    >
      <div className="overlay-drawer">
        <div className="overlay-header">
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg viewBox="0 0 24 24" style={{ width: '20px', height: '20px', fill: 'none', stroke: 'currentColor', strokeWidth: 2 }}>
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            Saved Collections
          </h2>
          <button 
            type="button" 
            className="overlay-close" 
            onClick={() => closeOverlay('wishlistOverlay')} 
            aria-label="Close wishlist drawer"
          >
            &times;
          </button>
        </div>
        
        <div className="overlay-content">
          {wishlist.length === 0 ? (
            <div className="empty-state">
              <svg viewBox="0 0 24 24" style={{ width: '48px', height: '48px', fill: 'none', stroke: 'var(--color-text-faint)', strokeWidth: 1.5, margin: '0 auto 16px' }}>
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              <div className="empty-state-text" style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.15rem', fontStyle: 'italic', textAlign: 'center' }}>
                Your saved collection is empty.
              </div>
            </div>
          ) : (
            <div className="cart-drawer-list">
              {wishlist.map((item) => (
                <div key={item.id} className="cart-drawer-item">
                  <div 
                    className="cart-drawer-img-wrap" 
                    onClick={() => handleSelectSize(item.id)} 
                    style={{ cursor: 'pointer' }}
                  >
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="cart-drawer-details">
                    <div 
                      className="cart-drawer-name" 
                      onClick={() => handleSelectSize(item.id)} 
                      style={{ cursor: 'pointer', fontWeight: 700, textTransform: 'uppercase' }}
                    >
                      {item.name}
                    </div>
                    <div className="cart-drawer-price">₹{item.price.toLocaleString('en-IN')}</div>
                    
                    <button 
                      className="btn-luxury-cta" 
                      style={{ height: '28px', fontSize: '9px', marginTop: '6px', padding: '0 8px', width: 'fit-content', cursor: 'pointer' }} 
                      onClick={() => handleSelectSize(item.id)}
                    >
                      Select Size & Locker
                    </button>
                  </div>
                  <span 
                    className="cart-drawer-remove" 
                    onClick={() => toggleWishlist(item.id)} 
                    title="Remove Saved"
                    style={{ cursor: 'pointer' }}
                  >
                    &times;
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="overlay-footer">
          <button 
            className="btn-luxury-outline" 
            style={{ width: '100%', cursor: 'pointer' }} 
            onClick={handleBrowseCollection} 
            type="button"
          >
            Browse Collection
          </button>
        </div>
      </div>
    </div>
  );
}
