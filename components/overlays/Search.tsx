import { useState, useEffect, useRef } from 'react';
import { useUI, useWishlist } from '@/lib/context/AppContext';
import { PRODUCTS, Product } from '@/lib/data/products';
import { useOverlayAnimation } from '@/lib/animations/hooks/useOverlayAnimation';

export default function Search() {
  const { activeOverlay, closeOverlay, openOverlay, setSelectedProductId, setSelectedSize, setDetailQuantity } = useUI();
  const { toggleWishlist, isSaved } = useWishlist();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>(PRODUCTS);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const isActive = activeOverlay === 'catalogOverlay';
  useOverlayAnimation(containerRef, isActive);

  useEffect(() => {
    if (query.trim() === '') {
      setResults(PRODUCTS);
    } else {
      const q = query.trim().toLowerCase();
      const filtered = PRODUCTS.filter(
        (p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
      );
      setResults(filtered);
    }
  }, [query]);

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  const handleProductClick = (id: string) => {
    closeOverlay('catalogOverlay');
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
        if (e.target === e.currentTarget) closeOverlay('catalogOverlay');
      }}
    >
      <div className="overlay-drawer wide-drawer">
        <div className="overlay-header">
          <h2>Sneaker Collection Search</h2>
          <button 
            type="button" 
            className="overlay-close" 
            onClick={() => closeOverlay('catalogOverlay')} 
            aria-label="Close catalog drawer"
          >
            &times;
          </button>
        </div>
        
        <div className="overlay-content">
          <div style={{ marginBottom: 'var(--space-6)' }}>
            <input 
              ref={inputRef}
              type="text" 
              placeholder="Search within collections..." 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="luxury-form-input"
            />
          </div>
          
          {results.length === 0 ? (
            <div className="empty-state" style={{ padding: '40px 0', textAlign: 'center' }}>
              <svg viewBox="0 0 24 24" style={{ width: '36px', height: '36px', stroke: 'var(--color-text-faint)', strokeWidth: 1.5, fill: 'none', margin: '0 auto 12px' }}>
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <div className="empty-state-text">No collection items match your search.</div>
            </div>
          ) : (
            <div className="catalog-drawer-grid">
              {results.map((p) => {
                const isItemSaved = isSaved(p.id);
                const displayPrice = '₹' + p.price.toLocaleString('en-IN');
                
                return (
                  <div 
                    key={p.id} 
                    className="product-card" 
                    onClick={() => handleProductClick(p.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="product-image-wrap">
                      <div className="product-hover-actions">
                        <button 
                          className={`card-action-btn ${isItemSaved ? 'active' : ''}`} 
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWishlist(p.id);
                          }} 
                          title="Save to Collection"
                        >
                          {isItemSaved ? (
                            <svg viewBox="0 0 24 24" style={{ width: '14px', height: '14px', fill: 'var(--color-accent)', stroke: 'var(--color-accent)', strokeWidth: 2 }}>
                              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                            </svg>
                          ) : (
                            <svg viewBox="0 0 24 24" style={{ width: '14px', height: '14px', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5 }}>
                              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                            </svg>
                          )}
                        </button>
                      </div>
                      
                      <img src={p.image} alt={p.name} loading="lazy" />
                      
                      <div 
                        className="product-card-quickadd" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleProductClick(p.id);
                        }}
                      >
                        Reserve Pair +
                      </div>
                    </div>
                    
                    <div className="product-meta-block">
                      <div className="product-brand-tag">{p.brand.toUpperCase()}</div>
                      <div className="product-title-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <h4 className="product-name-label" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginRight: '8px' }}>{p.name}</h4>
                        <span className="product-price-label">{displayPrice}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
