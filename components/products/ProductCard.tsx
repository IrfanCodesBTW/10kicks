import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useUI, useWishlist } from '@/lib/context/AppContext';
import { usePrefersReducedMotion, useIsTouch } from '@/lib/hooks/useMediaQuery';
import { Product } from '@/lib/data/products';

interface ProductCardProps {
  product: Product;
  tag?: string;
}

export default function ProductCard({ product, tag }: ProductCardProps) {
  const { toggleWishlist, isSaved } = useWishlist();
  const { openOverlay, setSelectedProductId, setSelectedSize, setDetailQuantity } = useUI();
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isTouch = useIsTouch();

  const isItemSaved = isSaved(product.id);
  const displayPrice = '₹' + product.price.toLocaleString('en-IN');

  useGSAP(() => {
    if (prefersReducedMotion || isTouch || !cardRef.current) return;

    const card = cardRef.current;
    const img = card.querySelector('.product-image-wrap img') as HTMLElement;
    const actions = card.querySelector('.product-hover-actions') as HTMLElement;
    const quickAdd = card.querySelector('.product-card-quickadd') as HTMLElement;

    const handleMouseEnter = () => {
      gsap.to(img, { scale: 1.05, duration: 0.5, ease: 'power2.out', overwrite: 'auto' });
      if (actions) gsap.to(actions, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
      if (quickAdd) gsap.to(quickAdd, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out', delay: 0.05, overwrite: 'auto' });
    };

    const handleMouseLeave = () => {
      gsap.to(img, { scale: 1, duration: 0.5, ease: 'power2.out', overwrite: 'auto' });
      if (actions) gsap.to(actions, { opacity: 0, y: 4, duration: 0.25, ease: 'power2.out', overwrite: 'auto' });
      if (quickAdd) gsap.to(quickAdd, { opacity: 0, y: 4, duration: 0.25, ease: 'power2.out', overwrite: 'auto' });
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, { scope: cardRef, dependencies: [prefersReducedMotion, isTouch] });

  const handleProductClick = () => {
    setSelectedProductId(product.id);
    setSelectedSize(null);
    setDetailQuantity(1);
    openOverlay('detailOverlay');
  };

  return (
    <div
      className="product-card reveal"
      ref={cardRef}
      onClick={handleProductClick}
    >
      <div className="product-image-wrap">
        <div className="product-hover-actions">
          <button
            className={`card-action-btn ${isItemSaved ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
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

        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=600';
          }}
        />

        <div
          className="product-card-quickadd"
          onClick={(e) => {
            e.stopPropagation();
            handleProductClick();
          }}
        >
          Reserve Pair +
        </div>
      </div>

      <div className="product-meta-block">
        <div className="product-brand-tag">
          {product.brand.toUpperCase()} {tag ? `• ${tag}` : ''}
        </div>
        <div className="product-title-row">
          <h4 className="product-name-label">{product.name}</h4>
          <span className="product-price-label">{displayPrice}</span>
        </div>
      </div>
    </div>
  );
}