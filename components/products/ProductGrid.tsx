import { Product } from '@/lib/data/products';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="empty-state" style={{ padding: '60px 0', textAlign: 'center' }}>
        <svg viewBox="0 0 24 24" style={{ width: '36px', height: '36px', stroke: 'var(--color-text-faint)', strokeWidth: 1.5, fill: 'none', margin: '0 auto 12px' }}>
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <div className="empty-state-text">No collectibles found.</div>
      </div>
    );
  }

  return (
    <div className="catalog-drawer-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
      {products.map((p, idx) => (
        <ProductCard key={p.id} product={p} tag={`DROP 0${idx + 1}`} />
      ))}
    </div>
  );
}
