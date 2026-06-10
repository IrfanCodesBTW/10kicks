import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RootLayout from '@/app/layout';
import Page from '@/app/page';
import BrandsPage from '@/app/brands/page';
import BrandCatalogPage from '@/app/brand/[slug]/page';
import NotFound from '@/app/not-found';
import '@/app/globals.css';

export default function App() {
  return (
    <BrowserRouter>
      <RootLayout>
        <Routes>
          <Route path="/" element={<Page />} />
          <Route path="/brands" element={<BrandsPage />} />
          <Route path="/brand/:slug" element={<BrandCatalogPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </RootLayout>
    </BrowserRouter>
  );
}
