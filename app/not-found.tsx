import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="section" style={{ paddingTop: 'var(--space-32)', textAlign: 'center', minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <svg viewBox="0 0 24 24" style={{ width: '48px', height: '48px', fill: 'none', stroke: 'var(--color-gold)', strokeWidth: 1.5, marginBottom: '20px' }}>
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
        <line x1="12" y1="9" x2="12" y2="13"></line>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
      </svg>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>
        Page Not Located
      </h2>
      <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', maxWidth: '40ch', lineHeight: 1.6, marginBottom: '32px', fontFamily: 'var(--font-editorial)', fontStyle: 'italic' }}>
        The requested archival link is missing or has been de-registered from our sneaker directories.
      </p>
      <Link to="/" className="btn-luxury-cta" style={{ width: 'fit-content', padding: '0 var(--space-8)' }}>
        Back to Showroom
      </Link>
    </div>
  );
}
export { NotFound };
