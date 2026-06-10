import { useState, useEffect, useRef } from 'react';
import { useCart, useUI } from '@/lib/context/AppContext';
import { useOverlayAnimation } from '@/lib/animations/hooks/useOverlayAnimation';

export default function Checkout() {
  const { cart, cartSubtotal, cartGST, clearCart } = useCart();
  const { activeOverlay, closeOverlay, openOverlay, currentUser, setCreatedOrderId, showToast } = useUI();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Tab can be 'card' | 'upi' | 'net' | 'cod'
  const [payTab, setPayTab] = useState<'card' | 'upi' | 'net' | 'cod'>('card');
  
  // Shipping Form State
  const [fn, setFn] = useState('');
  const [ln, setLn] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');

  // Payment inputs State
  const [cardNum, setCardNum] = useState('');
  const [cardExp, setCardExp] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [upiId, setUpiId] = useState('');
  const [selectedUpiApp, setSelectedUpiApp] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [isSubmitting, setIsOrdering] = useState(false);

  useEffect(() => {
    if (activeOverlay === 'checkoutOverlay' && currentUser) {
      if (currentUser.email) {
        setEmail(currentUser.email);
      }
      if (currentUser.name && currentUser.name !== 'Guest Collector') {
        const parts = currentUser.name.split(' ');
        setFn(parts[0] || '');
        setLn(parts.slice(1).join(' ') || '');
      }
    }
  }, [activeOverlay, currentUser]);

  const isActive = activeOverlay === 'checkoutOverlay';
  useOverlayAnimation(containerRef, isActive);

  // Format Helpers
  const formatCardInput = (val: string) => {
    const v = val.replace(/\D/g, '').slice(0, 16);
    const formatted = v.match(/.{1,4}/g)?.join(' ') || v;
    setCardNum(formatted);
  };

  const formatCardExpInput = (val: string) => {
    let v = val.replace(/\D/g, '').slice(0, 4);
    if (v.length >= 3) {
      v = v.slice(0, 2) + '/' + v.slice(2);
    }
    setCardExp(v);
  };

  const calculateFinalTotal = () => {
    const sub = cartSubtotal;
    const gstValue = cartGST;
    const isCod = payTab === 'cod';
    const codFee = isCod ? 49 : 0;
    return sub + gstValue + codFee;
  };

  const handlePlaceOrder = () => {
    if (!fn.trim() || !address.trim() || !phone.trim() || !city.trim() || !pincode.trim()) {
      showToast('⚠️ Complete shipping details.');
      return;
    }
    if (phone.replace(/\D/g, '').length < 10) {
      showToast('⚠️ Enter a valid contact phone.');
      return;
    }

    if (payTab === 'card') {
      const parsedCard = cardNum.replace(/\s/g, '');
      if (parsedCard.length < 16) {
        showToast('⚠️ Enter a valid 16-digit card number.');
        return;
      }
      if (cardExp.length < 5) {
        showToast('⚠️ Enter solid card expiry MM/YY.');
        return;
      }
      if (cardCvv.length < 3) {
        showToast('⚠️ Enter valid 3-digit CVV key.');
        return;
      }
    } else if (payTab === 'upi') {
      if (!upiId.includes('@')) {
        showToast('⚠️ Enter a valid UPI Address identifier.');
        return;
      }
    } else if (payTab === 'net' && !selectedBank) {
      showToast('⚠️ Please select a bank.');
      return;
    }

    // Process placing order
    setIsOrdering(true);
    setTimeout(() => {
      setIsOrdering(false);
      const randomId = '10K' + Date.now().toString().slice(-8).toUpperCase();
      setCreatedOrderId(randomId);
      
      // Clear forms
      setCardNum('');
      setCardExp('');
      setCardCvv('');
      setUpiId('');
      setSelectedUpiApp('');
      setSelectedBank('');
      
      clearCart();
      closeOverlay('checkoutOverlay');
      openOverlay('successOverlay');
    }, 2000);
  };

  return (
    <div 
      ref={containerRef}
      className={`overlay-backdrop center-align ${isActive ? 'active' : ''}`} 
      onClick={(e) => {
        if (e.target === e.currentTarget) closeOverlay('checkoutOverlay');
      }}
    >
      <div className="overlay-modal" style={{ width: '950px', maxHeight: '85vh' }}>
        <div className="overlay-header">
          <h2>Secure Placement</h2>
          <button 
            type="button" 
            className="overlay-close" 
            onClick={() => closeOverlay('checkoutOverlay')} 
            aria-label="Close checkout modal"
          >
            &times;
          </button>
        </div>
        
        <div className="overlay-content">
          <div className="checkout-split-layout">
            {/* Left side details */}
            <div>
              <div className="checkout-card-box">
                <h3 className="checkout-card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg viewBox="0 0 24 24" style={{ width: '18px', height: '18px', fill: 'none', stroke: 'currentColor', strokeWidth: 2 }}>
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                  </svg>
                  Delivery Destination
                </h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
                  <div className="luxury-form-group">
                    <label className="luxury-form-label" htmlFor="chkFn">First Name</label>
                    <input 
                      type="text" 
                      id="chkFn" 
                      placeholder="Irfan" 
                      className="luxury-form-input"
                      value={fn}
                      onChange={(e) => setFn(e.target.value)}
                    />
                  </div>
                  <div className="luxury-form-group">
                    <label className="luxury-form-label" htmlFor="chkLn">Last Name</label>
                    <input 
                      type="text" 
                      id="chkLn" 
                      placeholder="Ahmed" 
                      className="luxury-form-input"
                      value={ln}
                      onChange={(e) => setLn(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="luxury-form-group">
                  <label className="luxury-form-label" htmlFor="chkEmail">Email Address</label>
                  <input 
                    type="email" 
                    id="chkEmail" 
                    placeholder="collector@archive.com" 
                    className="luxury-form-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                
                <div className="luxury-form-group">
                  <label className="luxury-form-label" htmlFor="chkPhone">Phone Contact</label>
                  <input 
                    type="tel" 
                    id="chkPhone" 
                    placeholder="+91 98765 43210" 
                    className="luxury-form-input"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                
                <div className="luxury-form-group">
                  <label className="luxury-form-label" htmlFor="chkAddress">Full Address</label>
                  <input 
                    type="text" 
                    id="chkAddress" 
                    placeholder="Street name, apartment, flat no." 
                    className="luxury-form-input"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
                  <div className="luxury-form-group">
                    <label className="luxury-form-label" htmlFor="chkCity">City</label>
                    <input 
                      type="text" 
                      id="chkCity" 
                      placeholder="Bengaluru" 
                      className="luxury-form-input"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                  <div className="luxury-form-group">
                    <label className="luxury-form-label" htmlFor="chkPin">Pincode</label>
                    <input 
                      type="text" 
                      id="chkPin" 
                      placeholder="560001" 
                      maxLength={6} 
                      className="luxury-form-input"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                    />
                  </div>
                </div>
              </div>
              
              <div className="checkout-card-box">
                <h3 className="checkout-card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg viewBox="0 0 24 24" style={{ width: '18px', height: '18px', fill: 'none', stroke: 'currentColor', strokeWidth: 2 }}>
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                    <line x1="1" y1="10" x2="23" y2="10"></line>
                  </svg>
                  Secure Settlement
                </h3>
                
                <div className="payment-tabs" style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
                  <div 
                    className={`payment-tab ${payTab === 'card' ? 'active' : ''}`} 
                    style={{ padding: '6px 12px', border: '1px solid var(--color-border)', cursor: 'pointer' }} 
                    onClick={() => setPayTab('card')}
                  >
                    Credit Card
                  </div>
                  <div 
                    className={`payment-tab ${payTab === 'upi' ? 'active' : ''}`} 
                    style={{ padding: '6px 12px', border: '1px solid var(--color-border)', cursor: 'pointer' }} 
                    onClick={() => setPayTab('upi')}
                  >
                    UPI
                  </div>
                  <div 
                    className={`payment-tab ${payTab === 'net' ? 'active' : ''}`} 
                    style={{ padding: '6px 12px', border: '1px solid var(--color-border)', cursor: 'pointer' }} 
                    onClick={() => setPayTab('net')}
                  >
                    Netbanking
                  </div>
                  <div 
                    className={`payment-tab ${payTab === 'cod' ? 'active' : ''}`} 
                    style={{ padding: '6px 12px', border: '1px solid var(--color-border)', cursor: 'pointer' }} 
                    onClick={() => setPayTab('cod')}
                  >
                    COD
                  </div>
                </div>
                
                {/* Credit Card panels */}
                {payTab === 'card' && (
                  <div id="chkPayCard">
                    <div className="luxury-form-group">
                      <label className="luxury-form-label" htmlFor="chkCardNum">Card Number</label>
                      <input 
                        type="text" 
                        id="chkCardNum" 
                        placeholder="4000 1234 5678 9010" 
                        className="luxury-form-input"
                        value={cardNum}
                        onChange={(e) => formatCardInput(e.target.value)}
                      />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
                      <div className="luxury-form-group">
                        <label className="luxury-form-label" htmlFor="chkCardExp">Expiry Date</label>
                        <input 
                          type="text" 
                          id="chkCardExp" 
                          placeholder="MM/YY" 
                          className="luxury-form-input"
                          value={cardExp}
                          onChange={(e) => formatCardExpInput(e.target.value)}
                        />
                      </div>
                      <div className="luxury-form-group">
                        <label className="luxury-form-label" htmlFor="chkCardCvv">CVV Key</label>
                        <input 
                          type="password" 
                          id="chkCardCvv" 
                          placeholder="•••" 
                          maxLength={3}
                          className="luxury-form-input"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                {/* UPI panels */}
                {payTab === 'upi' && (
                  <div id="chkPayUpi">
                    <div className="upi-checkout-row">
                      {['GPay', 'PhonePe', 'Paytm', 'BHIM'].map((app) => (
                        <button 
                          key={app}
                          className={`upi-checkout-btn ${selectedUpiApp === app ? 'selected' : ''}`} 
                          onClick={() => setSelectedUpiApp(app)}
                        >
                          {app}
                        </button>
                      ))}
                    </div>
                    <div className="luxury-form-group">
                      <label className="luxury-form-label" htmlFor="chkUpiId">UPI VPA</label>
                      <input 
                        type="text" 
                        id="chkUpiId" 
                        placeholder="username@upi" 
                        className="luxury-form-input"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                      />
                    </div>
                  </div>
                )}
                
                {/* Netbanking panels */}
                {payTab === 'net' && (
                  <div id="chkPayNet">
                    <div className="bank-checkout-grid">
                      {['SBI', 'HDFC', 'ICICI', 'Axis Bank'].map((bank) => (
                        <button 
                          key={bank}
                          className={`bank-checkout-btn ${selectedBank === bank ? 'selected' : ''}`} 
                          onClick={() => setSelectedBank(bank)}
                        >
                          {bank}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* COD panels */}
                {payTab === 'cod' && (
                  <div id="chkPayCod">
                    <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                      💵 Pay cash when Bluedart logistics courier arrives. Additional <strong>₹49 collection handling charge</strong> is applied to cash payments.
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Right side Order summary */}
            <div>
              <div className="checkout-card-box" style={{ position: 'sticky', top: 0 }}>
                <h3 className="checkout-card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg viewBox="0 0 24 24" style={{ width: '18px', height: '18px', fill: 'none', stroke: 'currentColor', strokeWidth: 2 }}>
                    <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1z"></path>
                    <path d="M16 8H8M16 12H8M13 16H8"></path>
                  </svg>
                  Placement Portfolio
                </h3>
                
                <div id="checkoutItemsSummary" style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                  {cart.map((item) => (
                    <div key={item.key} className="checkout-totals-row" style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>{item.name.split(' ').slice(0, 3).join(' ')} ×{item.qty} (UK {item.size})</span>
                      <span>₹{(item.price * item.qty).toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>
                
                <div className="checkout-totals-block">
                  <div className="checkout-totals-row" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Subtotal</span>
                    <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="checkout-totals-row" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Shipping Carrier</span>
                    <span style={{ color: '#16a34a', fontWeight: '700' }}>FREE</span>
                  </div>
                  <div className="checkout-totals-row" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Import Duties / GST (18%)</span>
                    <span>₹{cartGST.toLocaleString('en-IN')}</span>
                  </div>
                  {payTab === 'cod' && (
                    <div className="checkout-totals-row" style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>COD Fee</span>
                      <span>₹49</span>
                    </div>
                  )}
                  <div className="checkout-totals-row grand-total" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Grand Total</span>
                    <span>₹{calculateFinalTotal().toLocaleString('en-IN')}</span>
                  </div>
                </div>
                
                <button 
                  className="btn-luxury-cta" 
                  id="btnPayNow" 
                  style={{ width: '100%', marginTop: 'var(--space-6)', cursor: 'pointer' }} 
                  onClick={handlePlaceOrder}
                  disabled={isSubmitting || cart.length === 0}
                >
                  {isSubmitting ? 'Verifying Transaction...' : 'Confirm Reservation'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
