import { useState, useRef } from 'react';
import { useUI } from '@/lib/context/AppContext';
import { useOverlayAnimation } from '@/lib/animations/hooks/useOverlayAnimation';

export default function Auth() {
  const { activeOverlay, closeOverlay, setCurrentUser, showToast } = useUI();
  const containerRef = useRef<HTMLDivElement>(null);
  const [tab, setTab] = useState<'in' | 'up'>('in');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');
  const [errorWord, setErrorWord] = useState<string | null>(null);

  // Mock server accounts persistence
  const [registeredAccounts, setRegisteredAccounts] = useState<Record<string, { name: string; pass: string }>>({
    'collector@archive.com': { name: 'Irfan Ahmed', pass: '123456' },
  });

  const isActive = activeOverlay === 'authOverlay';
  useOverlayAnimation(containerRef, isActive);

  const handleSignIn = () => {
    const em = email.trim().toLowerCase();
    if (!em || !pass) {
      setErrorWord('All fields must be filled.');
      return;
    }
    const account = registeredAccounts[em];
    if (!account) {
      setErrorWord('No customer portfolio matches this email.');
      return;
    }
    if (account.pass !== pass) {
      setErrorWord('Access Denied: Incorrect passphrase.');
      return;
    }

    setCurrentUser({ name: account.name, email: em });
    showToast(`Welcome to 10KICKS, ${account.name.split(' ')[0]}`);
    closeOverlay('authOverlay');
  };

  const handleSignUp = () => {
    const em = email.trim().toLowerCase();
    if (!name.trim() || !em || !pass) {
      setErrorWord('All fields must be filled.');
      return;
    }
    if (pass.length < 6) {
      setErrorWord('Passphrase must contain at least 6 characters.');
      return;
    }
    if (registeredAccounts[em]) {
      setErrorWord('An account is already linked to this email.');
      return;
    }

    const updatedAccounts = {
      ...registeredAccounts,
      [em]: { name, pass },
    };
    setRegisteredAccounts(updatedAccounts);
    setCurrentUser({ name, email: em });
    showToast(`Portfolio Logged. Welcome ${name.split(' ')[0]}!`);
    closeOverlay('authOverlay');
  };

  const handleGuestLogin = () => {
    setCurrentUser({ name: 'Guest Collector', email: null });
    showToast('Lobby guest access authorized.');
    closeOverlay('authOverlay');
  };

  return (
    <div 
      ref={containerRef}
      className={`overlay-backdrop center-align ${isActive ? 'active' : ''}`} 
      onClick={(e) => {
        if (e.target === e.currentTarget) closeOverlay('authOverlay');
      }}
    >
      <div className="overlay-modal" style={{ width: '400px' }}>
        <div className="overlay-header">
          <h2>Portfolio Access</h2>
          <button 
            type="button" 
            className="overlay-close" 
            onClick={() => closeOverlay('authOverlay')} 
            aria-label="Close auth modal"
          >
            &times;
          </button>
        </div>
        
        <div className="overlay-content">
          <div className="auth-tab-row">
            <button 
              className={`auth-tab-btn ${tab === 'in' ? 'active' : ''}`}
              onClick={() => {
                setTab('in');
                setErrorWord(null);
              }}
            >
              Sign In
            </button>
            <button 
              className={`auth-tab-btn ${tab === 'up' ? 'active' : ''}`}
              onClick={() => {
                setTab('up');
                setErrorWord(null);
              }}
            >
              Register
            </button>
          </div>
          
          {errorWord && (
            <div 
              className="auth-error-box" 
              style={{ color: 'var(--color-accent)', fontSize: '12px', marginBottom: 'var(--space-4)', textAlign: 'center' }}
            >
              {errorWord}
            </div>
          )}
          
          {tab === 'in' ? (
            <div id="formSignIn">
              <div className="luxury-form-group">
                <label className="luxury-form-label" htmlFor="signInEmail">Email Account</label>
                <input 
                  type="email" 
                  id="signInEmail" 
                  placeholder="collector@archive.com" 
                  className="luxury-form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSignIn();
                  }}
                />
              </div>
              
              <div className="luxury-form-group">
                <label className="luxury-form-label" htmlFor="signInPass">Access Key</label>
                <input 
                  type="password" 
                  id="signInPass" 
                  placeholder="••••••••" 
                  className="luxury-form-input"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSignIn();
                  }}
                />
              </div>
              
              <button 
                className="btn-luxury-cta" 
                style={{ width: '100%', cursor: 'pointer' }} 
                onClick={handleSignIn}
              >
                Sign In
              </button>
            </div>
          ) : (
            <div id="formSignUp">
              <div className="luxury-form-group">
                <label className="luxury-form-label" htmlFor="signUpName">Collector Name</label>
                <input 
                  type="text" 
                  id="signUpName" 
                  placeholder="Irfan Ahmed" 
                  className="luxury-form-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              
              <div className="luxury-form-group">
                <label className="luxury-form-label" htmlFor="signUpEmail">Email Account</label>
                <input 
                  type="email" 
                  id="signUpEmail" 
                  placeholder="collector@archive.com" 
                  className="luxury-form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div className="luxury-form-group">
                <label className="luxury-form-label" htmlFor="signUpPass">Secret Key</label>
                <input 
                  type="password" 
                  id="signUpPass" 
                  placeholder="Min 6 characters" 
                  className="luxury-form-input"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                />
              </div>
              
              <button 
                className="btn-luxury-cta" 
                style={{ width: '100%', cursor: 'pointer' }} 
                onClick={handleSignUp}
              >
                Create Account
              </button>
            </div>
          )}
          
          <div style={{ textAlign: 'center', color: 'var(--color-text-faint)', fontSize: '11px', margin: 'var(--space-4) 0' }}>OR</div>
          <button 
            className="btn-luxury-outline" 
            style={{ width: '100%', cursor: 'pointer' }} 
            onClick={handleGuestLogin}
          >
            Lobby Guest Access
          </button>
        </div>
      </div>
    </div>
  );
}
