import { useNavigate } from 'react-router-dom';
import { Brand } from '@/lib/data/brands';
import { PRODUCTS } from '@/lib/data/products';

interface BrandCardProps {
  brand: Brand;
}

export default function BrandCard({ brand }: BrandCardProps) {
  const navigate = useNavigate();
  const brandProductsCount = PRODUCTS.filter((p) => p.brand === brand.id).length;

  return (
    <div 
      className="brand-dir-card" 
      onClick={() => navigate(`/brand/${brand.id}`)}
      style={{ cursor: 'pointer', textDecoration: 'none', display: 'flex', flexDirection: 'column' }}
    >
      <h3 className="brand-dir-title">{brand.name}</h3>
      <p className="brand-dir-count">{brandProductsCount} Curated Pieces</p>
    </div>
  );
}
