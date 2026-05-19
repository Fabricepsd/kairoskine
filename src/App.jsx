import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BrignaisPage from '@/pages/BrignaisPage';
import BlogPage from '@/pages/BlogPage';
import BlogArticlePage from '@/pages/BlogArticlePage';
import LegalNotices from '@/components/LegalNotices';
import PrivacyPolicy from '@/components/PrivacyPolicy';
import { Toaster } from '@/components/ui/toaster';
import ContactHub from '@/components/ContactHub';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-deep-black text-off-white">
        <Header />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<BrignaisPage />} />
            <Route path="/brignais" element={<BrignaisPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogArticlePage />} />
            <Route path="/mentions-legales" element={<LegalNotices />} />
            <Route path="/confidentialite" element={<PrivacyPolicy />} />
          </Routes>
        </main>

        <Footer />
        <ContactHub />

        <Toaster />
      </div>
    </BrowserRouter>
  );
}

export default App;