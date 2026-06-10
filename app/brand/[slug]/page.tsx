import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '@/lib/data/products';
import { BRANDS } from '@/lib/data/brands';
import ProductGrid from '@/components/products/ProductGrid';

export default function BrandCatalogPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [innerQuery, setInnerQuery] = useState('');

  const activeBrand = BRANDS.find((b) => b.id === slug);
  const brandProducts = PRODUCTS.filter((p) => p.brand === slug);

  if (!activeBrand) {
    return (
      <div className="section" style={{ paddingTop: 'var(--space-32)', textAlign: 'center', minHeight: '80vh' }}>
        <h2 className="section-title">Archive Not Found</h2>
        <p className="section-desc" style={{ margin: '0 auto var(--space-8)' }}>
          The requested sneaker label design archive has not been registered in our index.
        </p>
        <Link to="/brands" className="btn-luxury-outline">
          &larr; Return to Directory
        </Link>
      </div>
    );
  }

  // Filter products on-the-fly dynamically
  const filtered = brandProducts.filter((p) =>
    p.name.toLowerCase().includes(innerQuery.toLowerCase())
  );

  return (
    <div className="section" style={{ paddingTop: 'var(--space-32)', paddingBottom: 'var(--space-20)', minHeight: '80vh' }}>
      
      {/* Return link */}
      <Link 
        to="/brands" 
        style={{ 
          fontSize: '12px', 
          fontFamily: 'var(--font-header)', 
          textTransform: 'uppercase', 
          letterSpacing: '0.1em', 
          color: 'var(--color-text-muted)', 
          textDecoration: 'none', 
          transition: 'color 0.2s',
          display: 'inline-block',
          marginBottom: 'var(--space-4)'
        }} 
        onMouseOver={(e) => (e.currentTarget.style.color = 'var(--color-gold)')} 
        onMouseOut={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}
      >
        &larr; Back to Directory
      </Link>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexDirection: 'column', gap: '8px', marginBottom: 'var(--space-8)' }}>
        <div>
          <h2 className="section-title" style={{ marginTop: 'var(--space-1)', marginBottom: 'var(--space-2)' }}>
            {activeBrand.name} Archive
          </h2>
          <p className="section-desc" style={{ margin: 0 }}>
            {activeBrand.tagline} Discover rare historical releases and curated collectibles.
          </p>
        </div>
        
        {/* Inner Search Box */}
        <div style={{ marginTop: 'var(--space-6)', width: '100%', maxWidth: '400px' }}>
          <input 
            type="text" 
            placeholder="Search within this collection..." 
            value={innerQuery}
            onChange={(e) => setInnerQuery(e.target.value)}
            className="luxury-form-input"
          />
        </div>
      </div>
      
      {/* Grid displays filtered results */}
      <ProductGrid products={filtered} />
    </div>
  );
}
export { BrandCatalogPage };
