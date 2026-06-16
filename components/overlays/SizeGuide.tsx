import { useRef } from 'react';
import { useUI } from '@/lib/context/AppContext';
import { useOverlayAnimation } from '@/lib/animations/hooks/useOverlayAnimation';

interface SizeRow {
  uk: string;
  usMen: string;
  usWomen: string;
  eu: string;
  cm: string;
}

export default function SizeGuide() {
  const { activeOverlay, closeOverlay } = useUI();
  const containerRef = useRef<HTMLDivElement>(null);

  const isActive = activeOverlay === 'sizeGuideOverlay';
  useOverlayAnimation(containerRef, isActive);

  const sizeData: SizeRow[] = [
    { uk: '5.0', usMen: '5.5', usWomen: '7.0', eu: '38.0', cm: '24.0' },
    { uk: '5.5', usMen: '6.0', usWomen: '7.5', eu: '38.7', cm: '24.5' },
    { uk: '6.0', usMen: '6.5', usWomen: '8.0', eu: '39.3', cm: '25.0' },
    { uk: '6.5', usMen: '7.0', usWomen: '8.5', eu: '40.0', cm: '25.5' },
    { uk: '7.0', usMen: '7.5', usWomen: '9.0', eu: '40.7', cm: '26.0' },
    { uk: '7.5', usMen: '8.0', usWomen: '9.5', eu: '41.3', cm: '26.5' },
    { uk: '8.0', usMen: '8.5', usWomen: '10.0', eu: '42.0', cm: '27.0' },
    { uk: '8.5', usMen: '9.0', usWomen: '10.5', eu: '42.7', cm: '27.5' },
    { uk: '9.0', usMen: '9.5', usWomen: '11.0', eu: '43.3', cm: '28.0' },
    { uk: '9.5', usMen: '10.0', usWomen: '11.5', eu: '44.0', cm: '28.5' },
    { uk: '10.0', usMen: '10.5', usWomen: '12.0', eu: '44.7', cm: '29.0' },
    { uk: '10.5', usMen: '11.0', usWomen: '12.5', eu: '45.3', cm: '29.5' },
    { uk: '11.0', usMen: '11.5', usWomen: '13.0', eu: '46.0', cm: '30.0' },
    { uk: '11.5', usMen: '12.0', usWomen: '13.5', eu: '46.7', cm: '30.5' },
    { uk: '12.0', usMen: '12.5', usWomen: '14.0', eu: '47.3', cm: '31.0' },
  ];

  return (
    <div
      ref={containerRef}
      className={`overlay-backdrop center-align ${isActive ? 'active' : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeOverlay('sizeGuideOverlay');
      }}
    >
      <div className="overlay-modal" style={{ width: '600px', maxHeight: '80vh' }}>
        <div className="overlay-header">
          <h2>Size Translation Guide</h2>
          <button
            type="button"
            className="overlay-close"
            onClick={() => closeOverlay('sizeGuideOverlay')}
            aria-label="Close size guide modal"
          >
            &times;
          </button>
        </div>

        <div className="overlay-content">
          <p style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', color: 'var(--color-text-muted)', marginBottom: 'var(--space-6)', fontSize: '1.1rem' }}>
            Note: Sizing fits standard across Nike, Jordan, Adidas, and New Balance. For Yeezy, we suggest selecting half a size larger than your standard UK size.
          </p>

          <table className="size-guide-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
            <thead>
              <tr style={{ borderBottom: '1.5px solid var(--color-text)', fontFamily: 'var(--font-header)', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '0.1em' }}>
                <th style={{ padding: '12px 6px', color: 'var(--color-gold)' }}>UK</th>
                <th style={{ padding: '12px 6px' }}>US Men</th>
                <th style={{ padding: '12px 6px' }}>US Women</th>
                <th style={{ padding: '12px 6px' }}>EU</th>
                <th style={{ padding: '12px 6px' }}>CM</th>
              </tr>
            </thead>
            <tbody>
              {sizeData.map((row, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--color-divider)', fontSize: 'var(--text-sm)' }}>
                  <td style={{ padding: '10px 6px', fontWeight: 'bold', color: 'var(--color-gold)' }}>{row.uk}</td>
                  <td style={{ padding: '10px 6px' }}>{row.usMen}</td>
                  <td style={{ padding: '10px 6px' }}>{row.usWomen}</td>
                  <td style={{ padding: '10px 6px' }}>{row.eu}</td>
                  <td style={{ padding: '10px 6px' }}>{row.cm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
