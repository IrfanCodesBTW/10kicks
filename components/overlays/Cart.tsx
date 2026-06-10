import { useRef } from 'react';
import { useCart, useUI } from '@/lib/context/AppContext';
import { useOverlayAnimation } from '@/lib/animations/hooks/useOverlayAnimation';

export default function Cart() {
  const { cart, cartSubtotal, cartGST, cartGrandTotal, changeCartQty, removeFromCart } = useCart();
  const { activeOverlay, closeOverlay, openOverlay } = useUI();
  const containerRef = useRef<HTMLDivElement>(null);

  const isActive = activeOverlay === 'cartOverlay';
  useOverlayAnimation(containerRef, isActive);

  return (
    <div 
      ref={containerRef}
      className={`overlay-backdrop ${isActive ? 'active' : ''}`} 
      onClick={(e) => {
        if (e.target === e.currentTarget) closeOverlay('cartOverlay');
      }}
    >
      <div className="overlay-drawer">
        <div className="overlay-header">
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg viewBox="0 0 24 24" style={{ width: '20px', height: '20px', fill: 'none', stroke: 'currentColor', strokeWidth: 2 }}>
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            Curated Locker
          </h2>
          <button 
            type="button" 
            className="overlay-close" 
            onClick={() => closeOverlay('cartOverlay')} 
            aria-label="Close cart drawer"
          >
            &times;
          </button>
        </div>
        
        <div className="overlay-content">
          {cart.length === 0 ? (
            <div className="empty-state">
              <svg viewBox="0 0 24 24" style={{ width: '48px', height: '48px', fill: 'none', stroke: 'var(--color-text-faint)', strokeWidth: 1.5, margin: '0 auto 16px' }}>
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              <div className="empty-state-text" style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.15rem', fontStyle: 'italic', textAlign: 'center' }}>
                Your luxury locker is empty.<br />Browse our collections to select.
              </div>
            </div>
          ) : (
            <div className="cart-drawer-list">
              {cart.map((item) => (
                <div key={item.key} className="cart-drawer-item">
                  <div className="cart-drawer-img-wrap">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="cart-drawer-details">
                    <div className="cart-drawer-name">{item.name}</div>
                    <div className="cart-drawer-size">Size: UK {item.size}</div>
                    <div className="cart-drawer-price">₹{(item.price * item.qty).toLocaleString('en-IN')}</div>
                    
                    <div className="cart-item-qty" style={{ marginTop: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <button 
                        className="cart-item-qty-btn" 
                        style={{ width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: 'none', border: '1px solid var(--color-border)' }} 
                        onClick={() => changeCartQty(item.key, -1)}
                      >
                        -
                      </button>
                      <span className="cart-item-qty-val" style={{ fontSize: '12px', minWidth: '14px', textAlign: 'center' }}>{item.qty}</span>
                      <button 
                        className="cart-item-qty-btn" 
                        style={{ width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: 'none', border: '1px solid var(--color-border)' }} 
                        onClick={() => changeCartQty(item.key, 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <span 
                    className="cart-drawer-remove" 
                    onClick={() => removeFromCart(item.key)} 
                    title="Remove Item"
                  >
                    &times;
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {cart.length > 0 && (
          <div className="overlay-footer">
            <div className="checkout-totals-block">
              <div className="checkout-totals-row">
                <span>Subtotal</span>
                <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="checkout-totals-row">
                <span>GST (18%)</span>
                <span>₹{cartGST.toLocaleString('en-IN')}</span>
              </div>
              <div className="checkout-totals-row grand-total">
                <span>Grand Total</span>
                <span>₹{cartGrandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>
            
            <button 
              className="btn-luxury-cta" 
              id="cartCheckoutBtn" 
              style={{ width: '100%', marginTop: 'var(--space-6)', cursor: 'pointer' }} 
              onClick={() => {
                closeOverlay('cartOverlay');
                openOverlay('checkoutOverlay');
              }}
            >
              Checkout Locker &rarr;
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
