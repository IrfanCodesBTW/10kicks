import { BRANDS } from '@/lib/data/brands';
import BrandCard from './BrandCard';

export default function BrandDirectory() {
  return (
    <div className="brands-directory-grid">
      {BRANDS.map((b) => (
        <BrandCard key={b.id} brand={b} />
      ))}
    </div>
  );
}
