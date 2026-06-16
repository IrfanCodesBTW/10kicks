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
  const [errors, setErrors] = useState<Record<string, string>>({});

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
    // Reset errors when overlay is opened
    if (activeOverlay === 'checkoutOverlay') {
      setErrors({});
    }
  }, [activeOverlay, currentUser]);

  const isActive = activeOverlay === 'checkoutOverlay';
  useOverlayAnimation(containerRef, isActive);

  // Format Helpers
  const formatCardInput = (val: string) => {
    const v = val.replace(/\D/g, '').slice(0, 16);
    const formatted = v.match(/.{1,4}/g)?.join(' ') || v;
    setCardNum(formatted);
    // Validate cardNum progressively
    validateField('cardNum', formatted);
  };

  const formatCardExpInput = (val: string) => {
    let v = val.replace(/\D/g, '').slice(0, 4);
    if (v.length >= 3) {
      v = v.slice(0, 2) + '/' + v.slice(2);
    }
    setCardExp(v);
    // Validate cardExp progressively
    validateField('cardExp', v);
  };

  const calculateFinalTotal = () => {
    const sub = cartSubtotal;
    const gstValue = cartGST;
    const isCod = payTab === 'cod';
    const codFee = isCod ? 49 : 0;
    return sub + gstValue + codFee;
  };

  // Form Field Validation Logic
  const validateField = (name: string, value: string) => {
    let err = '';
    if (name === 'fn' && !value.trim()) {
      err = 'First Name is required.';
    } else if (name === 'email') {
      if (!value.trim()) {
        err = 'Email Address is required.';
      } else if (!value.includes('@') || value.length < 5) {
        err = 'Please enter a valid email address.';
      }
    } else if (name === 'phone') {
      const parsed = value.replace(/\D/g, '');
      if (!value.trim()) {
        err = 'Phone contact is required.';
      } else if (parsed.length < 10) {
        err = 'Phone number must be at least 10 digits.';
      }
    } else if (name === 'address' && !value.trim()) {
      err = 'Delivery Address is required.';
    } else if (name === 'city' && !value.trim()) {
      err = 'City is required.';
    } else if (name === 'pincode') {
      if (!value.trim()) {
        err = 'Pincode is required.';
      } else if (value.length < 6) {
        err = 'Pincode must be 6 digits.';
      }
    } else if (payTab === 'card') {
      if (name === 'cardNum') {
        const parsed = value.replace(/\s/g, '');
        if (!value.trim()) {
          err = 'Card number is required.';
        } else if (parsed.length < 16) {
          err = 'Card number must be 16 digits.';
        }
      } else if (name === 'cardExp') {
        if (!value.trim()) {
          err = 'Expiry MM/YY is required.';
        } else if (value.length < 5) {
          err = 'Format must be MM/YY.';
        } else {
          const [m, y] = value.split('/');
          const month = parseInt(m, 10);
          const year = parseInt(y, 10);
          const now = new Date();
          const curMonth = now.getMonth() + 1;
          const curYear = parseInt(now.getFullYear().toString().slice(-2), 10);
          if (isNaN(month) || isNaN(year) || month < 1 || month > 12) {
            err = 'Invalid expiry date.';
          } else if (year < curYear || (year === curYear && month < curMonth)) {
            err = 'Card has expired.';
          }
        }
      } else if (name === 'cardCvv') {
        if (!value.trim()) {
          err = 'CVV Key is required.';
        } else if (value.length < 3) {
          err = 'CVV must be 3 digits.';
        }
      }
    } else if (payTab === 'upi' && name === 'upiId') {
      if (!value.trim()) {
        err = 'UPI Address VPA is required.';
      } else if (!value.includes('@')) {
        err = 'Invalid UPI VPA (must contain @).';
      }
    }

    setErrors((prev) => {
      if (err) {
        return { ...prev, [name]: err };
      } else {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      }
    });
    return !err;
  };

  const validateForm = () => {
    let isValid = true;
    if (!validateField('fn', fn)) isValid = false;
    if (!validateField('email', email)) isValid = false;
    if (!validateField('phone', phone)) isValid = false;
    if (!validateField('address', address)) isValid = false;
    if (!validateField('city', city)) isValid = false;
    if (!validateField('pincode', pincode)) isValid = false;

    if (payTab === 'card') {
      if (!validateField('cardNum', cardNum)) isValid = false;
      if (!validateField('cardExp', cardExp)) isValid = false;
      if (!validateField('cardCvv', cardCvv)) isValid = false;
    } else if (payTab === 'upi') {
      if (!validateField('upiId', upiId)) isValid = false;
    } else if (payTab === 'net' && !selectedBank) {
      setErrors(prev => ({ ...prev, selectedBank: 'Please select a Netbanking bank option.' }));
      isValid = false;
    }
    return isValid;
  };

  const handlePlaceOrder = () => {
    if (!validateForm()) {
      showToast('⚠️ Please fix validation errors before confirmation.');
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
      setErrors({});
      
      clearCart();
      closeOverlay('checkoutOverlay');
      openOverlay('successOverlay');
    }, 2000);
  };

  // Keyboard navigation for accessible payment tabs
  const handleTabKeyDown = (e: React.KeyboardEvent, currentTab: 'card' | 'upi' | 'net' | 'cod') => {
    const tabs: ('card' | 'upi' | 'net' | 'cod')[] = ['card', 'upi', 'net', 'cod'];
    const idx = tabs.indexOf(currentTab);
    let nextIdx = idx;

    if (e.key === 'ArrowRight') {
      nextIdx = (idx + 1) % tabs.length;
    } else if (e.key === 'ArrowLeft') {
      nextIdx = (idx - 1 + tabs.length) % tabs.length;
    } else if (e.key === 'Home') {
      nextIdx = 0;
    } else if (e.key === 'End') {
      nextIdx = tabs.length - 1;
    } else {
      return;
    }

    e.preventDefault();
    setPayTab(tabs[nextIdx]);
    
    // Reset payment-specific errors
    setErrors(prev => {
      const copy = { ...prev };
      delete copy.cardNum;
      delete copy.cardExp;
      delete copy.cardCvv;
      delete copy.upiId;
      delete copy.selectedBank;
      return copy;
    });

    // Focus on DOM element of the selected tab
    setTimeout(() => {
      const nextTabEl = document.getElementById(`tab-${tabs[nextIdx]}`);
      nextTabEl?.focus();
    }, 50);
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
                      onChange={(e) => { setFn(e.target.value); if (errors.fn) validateField('fn', e.target.value); }}
                      onBlur={() => validateField('fn', fn)}
                    />
                    {errors.fn && <span className="field-error-message">{errors.fn}</span>}
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
                    onChange={(e) => { setEmail(e.target.value); if (errors.email) validateField('email', e.target.value); }}
                    onBlur={() => validateField('email', email)}
                  />
                  {errors.email && <span className="field-error-message">{errors.email}</span>}
                </div>
                
                <div className="luxury-form-group">
                  <label className="luxury-form-label" htmlFor="chkPhone">Phone Contact</label>
                  <input 
                    type="tel" 
                    id="chkPhone" 
                    placeholder="+91 98765 43210" 
                    className="luxury-form-input"
                    value={phone}
                    onChange={(e) => { setPhone(e.target.value); if (errors.phone) validateField('phone', e.target.value); }}
                    onBlur={() => validateField('phone', phone)}
                  />
                  {errors.phone && <span className="field-error-message">{errors.phone}</span>}
                </div>
                
                <div className="luxury-form-group">
                  <label className="luxury-form-label" htmlFor="chkAddress">Full Address</label>
                  <input 
                    type="text" 
                    id="chkAddress" 
                    placeholder="Street name, apartment, flat no." 
                    className="luxury-form-input"
                    value={address}
                    onChange={(e) => { setAddress(e.target.value); if (errors.address) validateField('address', e.target.value); }}
                    onBlur={() => validateField('address', address)}
                  />
                  {errors.address && <span className="field-error-message">{errors.address}</span>}
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
                      onChange={(e) => { setCity(e.target.value); if (errors.city) validateField('city', e.target.value); }}
                      onBlur={() => validateField('city', city)}
                    />
                    {errors.city && <span className="field-error-message">{errors.city}</span>}
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
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '');
                        setPincode(val);
                        if (errors.pincode) validateField('pincode', val);
                      }}
                      onBlur={() => validateField('pincode', pincode)}
                    />
                    {errors.pincode && <span className="field-error-message">{errors.pincode}</span>}
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
                
                <div className="payment-tabs" role="tablist" aria-label="Settlement Method" style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
                  <button 
                    type="button"
                    role="tab"
                    id="tab-card"
                    aria-controls="panel-card"
                    aria-selected={payTab === 'card'}
                    tabIndex={payTab === 'card' ? 0 : -1}
                    className={`payment-tab ${payTab === 'card' ? 'active' : ''}`} 
                    style={{ padding: '6px 12px', border: '1px solid var(--color-border)', cursor: 'pointer', background: 'none' }} 
                    onClick={() => {
                      setPayTab('card');
                      setErrors(prev => { const copy = { ...prev }; delete copy.upiId; delete copy.selectedBank; return copy; });
                    }}
                    onKeyDown={(e) => handleTabKeyDown(e, 'card')}
                  >
                    Credit Card
                  </button>
                  <button 
                    type="button"
                    role="tab"
                    id="tab-upi"
                    aria-controls="panel-upi"
                    aria-selected={payTab === 'upi'}
                    tabIndex={payTab === 'upi' ? 0 : -1}
                    className={`payment-tab ${payTab === 'upi' ? 'active' : ''}`} 
                    style={{ padding: '6px 12px', border: '1px solid var(--color-border)', cursor: 'pointer', background: 'none' }} 
                    onClick={() => {
                      setPayTab('upi');
                      setErrors(prev => { const copy = { ...prev }; delete copy.cardNum; delete copy.cardExp; delete copy.cardCvv; delete copy.selectedBank; return copy; });
                    }}
                    onKeyDown={(e) => handleTabKeyDown(e, 'upi')}
                  >
                    UPI
                  </button>
                  <button 
                    type="button"
                    role="tab"
                    id="tab-net"
                    aria-controls="panel-net"
                    aria-selected={payTab === 'net'}
                    tabIndex={payTab === 'net' ? 0 : -1}
                    className={`payment-tab ${payTab === 'net' ? 'active' : ''}`} 
                    style={{ padding: '6px 12px', border: '1px solid var(--color-border)', cursor: 'pointer', background: 'none' }} 
                    onClick={() => {
                      setPayTab('net');
                      setErrors(prev => { const copy = { ...prev }; delete copy.cardNum; delete copy.cardExp; delete copy.cardCvv; delete copy.upiId; return copy; });
                    }}
                    onKeyDown={(e) => handleTabKeyDown(e, 'net')}
                  >
                    Netbanking
                  </button>
                  <button 
                    type="button"
                    role="tab"
                    id="tab-cod"
                    aria-controls="panel-cod"
                    aria-selected={payTab === 'cod'}
                    tabIndex={payTab === 'cod' ? 0 : -1}
                    className={`payment-tab ${payTab === 'cod' ? 'active' : ''}`} 
                    style={{ padding: '6px 12px', border: '1px solid var(--color-border)', cursor: 'pointer', background: 'none' }} 
                    onClick={() => {
                      setPayTab('cod');
                      setErrors(prev => { const copy = { ...prev }; delete copy.cardNum; delete copy.cardExp; delete copy.cardCvv; delete copy.upiId; delete copy.selectedBank; return copy; });
                    }}
                    onKeyDown={(e) => handleTabKeyDown(e, 'cod')}
                  >
                    COD
                  </button>
                </div>
                
                {/* Credit Card panel */}
                {payTab === 'card' && (
                  <div id="panel-card" role="tabpanel" aria-labelledby="tab-card" tabIndex={0} style={{ outline: 'none' }}>
                    <div className="luxury-form-group">
                      <label className="luxury-form-label" htmlFor="chkCardNum">Card Number</label>
                      <input 
                        type="text" 
                        id="chkCardNum" 
                        placeholder="4000 1234 5678 9010" 
                        className="luxury-form-input"
                        value={cardNum}
                        onChange={(e) => formatCardInput(e.target.value)}
                        onBlur={() => validateField('cardNum', cardNum)}
                      />
                      {errors.cardNum && <span className="field-error-message">{errors.cardNum}</span>}
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
                          onBlur={() => validateField('cardExp', cardExp)}
                        />
                        {errors.cardExp && <span className="field-error-message">{errors.cardExp}</span>}
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
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '');
                            setCardCvv(val);
                            if (errors.cardCvv) validateField('cardCvv', val);
                          }}
                          onBlur={() => validateField('cardCvv', cardCvv)}
                        />
                        {errors.cardCvv && <span className="field-error-message">{errors.cardCvv}</span>}
                      </div>
                    </div>
                  </div>
                )}
                
                {/* UPI panel */}
                {payTab === 'upi' && (
                  <div id="panel-upi" role="tabpanel" aria-labelledby="tab-upi" tabIndex={0} style={{ outline: 'none' }}>
                    <div className="upi-checkout-row" style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
                      {['GPay', 'PhonePe', 'Paytm', 'BHIM'].map((app) => (
                        <button 
                          key={app}
                          type="button"
                          className={`upi-checkout-btn ${selectedUpiApp === app ? 'selected' : ''}`} 
                          onClick={() => setSelectedUpiApp(app)}
                          style={{ padding: '6px 12px', border: '1px solid var(--color-border)', cursor: 'pointer', background: selectedUpiApp === app ? 'var(--color-text)' : 'none', color: selectedUpiApp === app ? 'var(--color-bg)' : 'inherit' }}
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
                        onChange={(e) => { setUpiId(e.target.value); if (errors.upiId) validateField('upiId', e.target.value); }}
                        onBlur={() => validateField('upiId', upiId)}
                      />
                      {errors.upiId && <span className="field-error-message">{errors.upiId}</span>}
                    </div>
                  </div>
                )}
                
                {/* Netbanking panel */}
                {payTab === 'net' && (
                  <div id="panel-net" role="tabpanel" aria-labelledby="tab-net" tabIndex={0} style={{ outline: 'none' }}>
                    <div className="bank-checkout-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
                      {['SBI', 'HDFC', 'ICICI', 'Axis Bank'].map((bank) => (
                        <button 
                          key={bank}
                          type="button"
                          className={`bank-checkout-btn ${selectedBank === bank ? 'selected' : ''}`} 
                          onClick={() => {
                            setSelectedBank(bank);
                            setErrors((prev) => { const copy = { ...prev }; delete copy.selectedBank; return copy; });
                          }}
                          style={{ padding: '8px', border: '1px solid var(--color-border)', cursor: 'pointer', background: selectedBank === bank ? 'var(--color-text)' : 'none', color: selectedBank === bank ? 'var(--color-bg)' : 'inherit' }}
                        >
                          {bank}
                        </button>
                      ))}
                    </div>
                    {errors.selectedBank && <span className="field-error-message" style={{ display: 'block', marginBottom: '12px' }}>{errors.selectedBank}</span>}
                  </div>
                )}
                
                {/* COD panel */}
                {payTab === 'cod' && (
                  <div id="panel-cod" role="tabpanel" aria-labelledby="tab-cod" tabIndex={0} style={{ outline: 'none' }}>
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
