import { useState, useEffect } from 'react';
import { Menu, X} from 'lucide-react';
import { Button } from './ui/button';
import logoImage from '../assets/download.jpeg';


export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'products', label: 'Products', href: '#products' },
    { id: 'gallery', label: 'Gallery', href: '#gallery' },
    { id: 'about', label: 'About', href: '#about' },
    { id: 'contact', label: 'Contact', href: '#contact' }
  ];

  const handleNavClick = (id: string, href: string) => {
    setActiveSection(id);
    window.location.hash = href.substring(1);
    setIsMenuOpen(false);
  };

  return (
    <header 
      className={`bg-logo-dark border-b border-logo-red/30 sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'shadow-md shadow-logo-red/20' : ''
      }`}
    >
      {/* Top contact bar */}
      <div className="bg-logo-dark text-logo-white py-2 border-b border-logo-red/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <span className="flex items-center">
                📞 +91-9876543210
              </span>
              <span className="hidden md:flex items-center">
                📍 Sivakasi, Tamil Nadu
              </span>
            </div>
            <div className="text-logo-orange">
              🏆 50+ Years of Excellence
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => handleNavClick('home', '#home')}
          >
            <img 
              src={logoImage} 
              alt="Twin Elephant Brand" 
              className="h-10 w-10 object-contain"
            />
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-logo-white">
                Twin Elephant
              </span>
              <span className="text-xs text-logo-light-gray hidden sm:block">
                Premium Fireworks Since 1970
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className={`text-sm font-medium transition-colors duration-200 hover:text-logo-orange relative py-2 ${
                  activeSection === item.id 
                    ? 'text-logo-orange' 
                    : 'text-logo-white'
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id, item.href);
                }}
              >
                {item.label}
                {activeSection === item.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-logo-orange" />
                )}
              </a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Button 
              variant="outline" 
              size="sm"
              className="border-logo-orange text-logo-orange hover:bg-logo-orange/10"
              onClick={() => handleNavClick('products', '#products')}
            >
              View Catalog
            </Button>
            <Button 
              size="sm"
              className="bg-logo-gradient-primary hover:opacity-90 text-logo-white"
              onClick={() => handleNavClick('contact', '#contact')}
            >
              Get Quote
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-logo-red/10 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5 text-logo-white" />
            ) : (
              <Menu className="h-5 w-5 text-logo-white" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-logo-red/30 py-4">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className={`text-sm font-medium py-2 px-3 rounded-md transition-colors ${
                    activeSection === item.id 
                      ? 'text-logo-orange bg-logo-orange/10' 
                      : 'text-logo-white hover:text-logo-orange hover:bg-logo-red/10'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.id, item.href);
                  }}
                >
                  {item.label}
                </a>
              ))}
              <div className="flex flex-col space-y-2 pt-3 border-t border-logo-red/30">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-logo-orange text-logo-orange hover:bg-logo-orange/10 w-full justify-center"
                  onClick={() => handleNavClick('products', '#products')}
                >
                  View Catalog
                </Button>
                <Button 
                  size="sm"
                  className="bg-logo-gradient-primary hover:opacity-90 text-logo-white w-full justify-center"
                  onClick={() => handleNavClick('contact', '#contact')}
                >
                  Get Quote
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}