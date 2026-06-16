import { useState, useEffect, useRef } from 'react';
import { useUI, useCart, useWishlist } from '@/lib/context/AppContext';
import { PRODUCTS } from '@/lib/data/products';
import { useOverlayAnimation } from '@/lib/animations/hooks/useOverlayAnimation';

export default function ProductModal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { 
    activeOverlay, 
    openOverlay,
    closeOverlay, 
    selectedProductId, 
    selectedSize, 
    setSelectedSize, 
    detailQuantity, 
    setDetailQuantity,
    showToast 
  } = useUI();

  const { addToCart } = useCart();
  const { toggleWishlist, isSaved } = useWishlist();

  // Selected image gallery state
  const [activeImg, setActiveImg] = useState('');

  const p = PRODUCTS.find((x) => x.id === selectedProductId);

  useEffect(() => {
    if (p) {
      setActiveImg(p.image);
    }
  }, [p]);

  const isActive = activeOverlay === 'detailOverlay' && !!p;
  useOverlayAnimation(containerRef, isActive);

  const isItemSaved = p ? isSaved(p.id) : false;
  const displayPrice = p ? '₹' + p.price.toLocaleString('en-IN') : '';
  const SIZES = [6, 7, 8, 9, 10, 11, 12];

  const handleAddToCart = () => {
    if (!p) return;
    if (!selectedSize) {
      showToast('⚠️ Please select a size (UK) first.');
      return;
    }
    addToCart(p.id, selectedSize, detailQuantity);
    showToast(`Added to locker: ${p.name.split(' ').slice(0, 3).join(' ')}`);
    closeOverlay('detailOverlay');
  };

  return (
    <div 
      ref={containerRef}
      className={`overlay-backdrop ${isActive ? 'active' : ''}`} 
      onClick={(e) => {
        if (e.target === e.currentTarget) closeOverlay('detailOverlay');
      }}
    >
      <div className="overlay-drawer wide-drawer">
        <div className="overlay-header">
          <h2 id="detailTitle">Collectible Spotlight</h2>
          <button 
            type="button" 
            className="overlay-close" 
            onClick={() => closeOverlay('detailOverlay')} 
            aria-label="Close details drawer"
          >
            &times;
          </button>
        </div>
        
        <div className="overlay-content">
          {p && (
            <div className="detail-campaign-layout">
              {/* Gallery Left */}
              <div className="detail-campaign-media">
                <div className="campaign-gallery-hero">
                  <img src={activeImg} id="mainDetailHeroImg" alt={p.name} />
                </div>
                
                <div className="campaign-gallery-strip">
                  {p.images.map((imgUrl, idx) => (
                    <div 
                      key={idx} 
                      className={`gallery-thumbnail ${activeImg === imgUrl ? 'active' : ''}`} 
                      onClick={() => setActiveImg(imgUrl)}
                    >
                      <img src={imgUrl} alt={`Thumbnail ${idx}`} />
                    </div>
                  ))}
                  
                  {/* Fallback extra view if gallery images are limited */}
                  {p.images.length < 4 && (
                    <div 
                      className={`gallery-thumbnail ${activeImg === 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=600' ? 'active' : ''}`}
                      onClick={() => setActiveImg('https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=600')}
                    >
                      <img src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=600" alt="Alternate View" />
                    </div>
                  )}
                </div>
              </div>
              
              {/* Right Information Columns */}
              <div className="detail-campaign-info">
                <div className="detail-editorial-header">
                  <div className="detail-editorial-brand">{p.brand.toUpperCase()} &middot; ORIGINALS</div>
                  <h3 className="detail-editorial-name">{p.name}</h3>
                  
                  <div className="detail-editorial-price-row">
                    <span className="detail-editorial-price">{displayPrice}</span>
                    <span className="detail-editorial-tax">Incl. import duties & taxes</span>
                  </div>
                </div>
                
                <p className="detail-editorial-story-snippet">"{p.description}"</p>
                
                {/* Sizing Grid selection */}
                <div>
                  <div className="detail-sizes-header">
                    <span>Select Size (UK)</span>
                    <span 
                      className="size-guide-link" 
                      onClick={() => openOverlay('sizeGuideOverlay')}
                      style={{ textDecoration: 'underline', cursor: 'pointer' }}
                    >
                      Size Chart
                    </span>
                  </div>
                  <div className="detail-sizes-grid">
                    {SIZES.map((sz) => {
                      const isAvailable = p.availableSizes ? p.availableSizes.includes(sz) : true;
                      return (
                        <button 
                          key={sz}
                          type="button"
                          className={`detail-size-btn ${selectedSize === sz ? 'active' : ''} ${!isAvailable ? 'sold-out' : ''}`} 
                          onClick={() => isAvailable && setSelectedSize(sz)}
                          disabled={!isAvailable}
                          aria-disabled={!isAvailable}
                          aria-pressed={selectedSize === sz}
                        >
                          {sz}
                        </button>
                      );
                    })}
                  </div>
                </div>
                
                {/* Stylist Notes overlay */}
                <div className="detail-styling-guide">
                  <div className="detail-styling-title">Fashion Director Styling Notes</div>
                  <p>{p.styleNotes || 'Style with relaxed-fit trousers and structured knit outerwear to balance the silhouette.'}</p>
                </div>
                
                {/* Qty pickers */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '12px' }}>
                  <div className="qty-picker-container" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                    <span className="qty-label">Quantity</span>
                    <div className="qty-controller" style={{ display: 'flex', border: '1px solid var(--color-border)' }}>
                      <button 
                        className="qty-ctrl-btn" 
                        onClick={() => setDetailQuantity(Math.max(1, detailQuantity - 1))}
                        style={{ width: '32px', height: '32px', cursor: 'pointer', background: 'none', border: 'none', fontWeight: 'bold' }}
                      >
                        -
                      </button>
                      <span className="qty-ctrl-val" style={{ width: '40px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderLeft: '1px solid var(--color-border)', borderRight: '1px solid var(--color-border)', fontWeight: 'bold' }}>
                        {detailQuantity}
                      </span>
                      <button 
                        className="qty-ctrl-btn" 
                        onClick={() => setDetailQuantity(Math.min(10, detailQuantity + 1))}
                        style={{ width: '32px', height: '32px', cursor: 'pointer', background: 'none', border: 'none', fontWeight: 'bold' }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--color-gold)', fontWeight: 800, letterSpacing: '0.1em' }}>
                    In Stock // Ready to Ship
                  </span>
                </div>
                
                {/* Cart / Save button actions */}
                <div className="detail-actions-panel" style={{ display: 'grid', gridTemplateColumns: '1.4fr 0.6fr', gap: 'var(--space-3)', marginTop: 'var(--space-4)' }}>
                  <button 
                    className="btn-luxury-cta" 
                    id="detailCartBtn" 
                    onClick={handleAddToCart}
                    style={{ cursor: 'pointer' }}
                  >
                    Reserve Pair
                  </button>
                  
                  <button 
                    className="btn-luxury-outline" 
                    id="detailWishBtn" 
                    onClick={() => toggleWishlist(p.id)}
                    style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
                  >
                    {isItemSaved ? (
                      <>
                        <svg viewBox="0 0 24 24" style={{ width: '14px', height: '14px', fill: 'var(--color-accent)', stroke: 'var(--color-accent)', strokeWidth: 2 }}>
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                        </svg>
                        Saved
                      </>
                    ) : (
                      <>
                        <svg viewBox="0 0 24 24" style={{ width: '14px', height: '14px', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5 }}>
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                        Save
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
