import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUI } from '@/lib/context/AppContext';

export default function Footer() {
  const navigate = useNavigate();
  const { showToast, closeAllOverlays } = useUI();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    closeAllOverlays();
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavLinkClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    closeAllOverlays();
    navigate('/');
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  const handleSubscribe = () => {
    const email = newsletterEmail.trim();
    if (!email) {
      showToast('⚠️ Please enter an email address.');
      return;
    }
    if (!email.includes('@') || email.length < 5) {
      showToast('⚠️ Please enter a valid email address.');
      return;
    }
    showToast('Subscription Confirmed.');
    setNewsletterEmail('');
  };

  return (
    <footer className="footer">
      <div className="section footer-container">
        <div className="footer-grid">
          <div className="footer-info">
            <h2 className="footer-logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
              10<span>K</span>ICKS
            </h2>
            <p className="footer-desc">
              Luxury streetwear curation platform. Built by sneaker obsessives in Bengaluru, India.
            </p>
          </div>
          
          <div className="footer-links-wrap">
            <div className="footer-links-col">
              <h5 className="footer-col-title">Navigation</h5>
              <a href="#drops" onClick={(e) => handleNavLinkClick(e, 'drops')} className="footer-link">Collections</a>
              <a href="/brands" onClick={(e) => { e.preventDefault(); closeAllOverlays(); navigate('/brands'); }} className="footer-link">Universe</a>
              <a href="#culture" onClick={(e) => handleNavLinkClick(e, 'culture')} className="footer-link">Stories</a>
            </div>
            <div className="footer-links-col">
              <h5 className="footer-col-title">Legals</h5>
              <button 
                type="button" 
                onClick={() => showToast('Authenticity verified by 10KICKS tag.')} 
                className="footer-link"
                style={{ background: 'none', border: 'none', textAlign: 'left', padding: 0 }}
              >
                Authenticity
              </button>
              <button 
                type="button" 
                onClick={() => showToast('Secure shipments via Bluedart.')} 
                className="footer-link"
                style={{ background: 'none', border: 'none', textAlign: 'left', padding: 0 }}
              >
                Shipping Info
              </button>
              <button 
                type="button" 
                onClick={() => showToast('Refunds processed within 3-5 bank days.')} 
                className="footer-link"
                style={{ background: 'none', border: 'none', textAlign: 'left', padding: 0 }}
              >
                Returns Policy
              </button>
            </div>
          </div>
          
          <div className="footer-newsletter">
            <h5 className="footer-col-title">Newsletter</h5>
            <div className="footer-newsletter-row">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="footer-newsletter-input" 
                aria-label="Email Address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSubscribe();
                }}
              />
              <button 
                className="footer-newsletter-btn" 
                onClick={handleSubscribe}
              >
                Join
              </button>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom-row">
          <p>&copy; 2026 10KICKS. Curated with authentic passion.</p>
          <div className="footer-badges">
            <span>Authentic Guarantees</span>
            <span>India Shipping Hub</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
