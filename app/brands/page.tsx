import BrandDirectory from '@/components/brands/BrandDirectory';

export default function BrandsPage() {
  return (
    <div className="section" style={{ paddingTop: 'var(--space-32)', paddingBottom: 'var(--space-20)', minHeight: '80vh' }}>
      <div className="section-label" style={{ color: 'var(--color-gold)' }}>Brand Directory</div>
      <h2 className="section-title">Explore The Archives</h2>
      <p className="section-desc" style={{ marginBottom: 'var(--space-8)' }}>
        Select a design house to view its complete historical archive and curated catalogue.
      </p>
      
      {/* Brands listing matrix */}
      <BrandDirectory />
    </div>
  );
}
export { BrandsPage };
