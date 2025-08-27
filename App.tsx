import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { OffersBanner } from './components/OffersBanner';
import { ProductCategories } from './components/ProductCategories';
import { ProductSwiper } from './components/ProductSwiper';
import { FeaturedProducts } from './components/FeaturedProducts';
import { WhyChooseUs } from './components/WhyChooseUs';
import { SafetySection } from './components/SafetySection';
import { ContactPage } from './components/ContactPage';
import { AboutPage } from './components/AboutPage';
import { Footer } from './components/Footer';
import { ProductPage } from './components/ProductPage';
import { CategoryPage } from './components/CategoryPage';
import { GalleryPage } from './components/GalleryPage';
import './index.css'
export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [product, setproduct] = useState<string>("")

  // Simple navigation handler
  const handleNavigation = (page: string) => {
    setCurrentPage(page);
  };

  // Category navigation handler
  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentPage('category');
  };
  const handleproductClick = (productId: string) => {
    setproduct(productId)
    setCurrentPage('product-page');
  };
  // Back to home handler
  const handleBackToHome = () => {
    setCurrentPage('home');
    setSelectedCategory('');
  };

  // Listen for hash changes to enable navigation
  if (typeof window !== 'undefined') {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.substring(1);
      if (hash === 'product-page' || hash === 'products') {
        setCurrentPage('product-page');
      } else if (hash === 'gallery') {
        setCurrentPage('gallery');
      } else if (hash === 'contact') {
        setCurrentPage('contact');
      } else if (hash === 'about') {
        setCurrentPage('about');
      } else {
        setCurrentPage('home');
      }
    });
  }

  return (
    <div className="min-h-screen bg-logo-dark">
      <Navbar onNavigate={handleNavigation} currentPage={currentPage} />
      <main>
        {currentPage === 'category' ? (
          <CategoryPage category={selectedCategory} onBack={handleBackToHome} handleproductClick={handleproductClick}/>
        ) : currentPage === 'gallery' ? (
          <GalleryPage onBack={handleBackToHome} />
        ) : currentPage === 'product-page' ? (
          <ProductPage />
        ) : currentPage === 'contact' ? (
          <ContactPage />
        ) : currentPage === 'about' ? (
          <AboutPage />
        ) : (
          <>
            <OffersBanner />

            <Hero />
            <ProductCategories onCategoryClick={handleCategoryClick}  />
            <ProductSwiper />
            <FeaturedProducts />
            <WhyChooseUs />
            <SafetySection />
          </>
        )}
      </main>
      {(currentPage === 'home' || currentPage === 'contact') && <Footer />}
    </div>
  );
}