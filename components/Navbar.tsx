import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Search, 
  ShoppingBag, 
  Phone, 
  Mail,
  MapPin,
  Star,
  Sparkles,
  Zap,
  Home,
  Images,
  Info,
  MessageCircle,
  Shield,
  Award,
  Clock
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

interface NavbarProps {
  onNavigate?: (page: string) => void;
  currentPage?: string;
}

export function Navbar({ onNavigate, currentPage = 'home' }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation items
  const navItems = [
    { 
      id: 'home', 
      label: 'Home', 
      icon: Home,
      href: '#home',
      description: 'Welcome to Twin Elephant'
    },
    // { 
    //   id: 'products', 
    //   label: 'Products', 
    //   icon: Package,
    //   href: '#products',
    //   description: 'Explore our fireworks collection',
    //   hasDropdown: true,
    //   dropdownItems: [
    //     { label: 'Sparklers', href: '#sparklers' },
    //     { label: 'Fountains', href: '#fountains' },
    //     { label: 'Rockets', href: '#rockets' },
    //     { label: 'Roman Candles', href: '#roman-candles' },
    //     { label: 'Premium Sets', href: '#premium-sets' }
    //   ]
    // },
    // { 
    //   id: 'gallery', 
    //   label: 'Gallery', 
    //   icon: Images,
    //   href: '#gallery',
    //   description: 'View our product gallery'
    // },
    { 
      id: 'about', 
      label: 'About', 
      icon: Info,
      href: '#about',
      description: 'Learn about our company'
    },
    { 
      id: 'contact', 
      label: 'Contact', 
      icon: MessageCircle,
      href: '#contact',
      description: 'Get in touch with us'
    }
  ];

  const handleNavClick = (id: string, href: string) => {
    if (onNavigate) {
      onNavigate(id);
    }
    window.location.hash = href.substring(1);
    setIsMenuOpen(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      // Implement search functionality here
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      {/* Top Info Bar */}
      <motion.div 
        className="bg-slate-800 border-b border-red-600/20 py-2 hidden md:block"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <motion.div 
                className="flex items-center text-gray-300 hover:text-white transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                <Phone className="h-4 w-4 mr-2 text-blue-400" />
                <span>+91-9876543210</span>
              </motion.div>
              <motion.div 
                className="flex items-center text-gray-300 hover:text-white transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                <Mail className="h-4 w-4 mr-2 text-orange-400" />
                <span>info@twinelephant.com</span>
              </motion.div>
              <motion.div 
                className="flex items-center text-gray-300 hover:text-white transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                <MapPin className="h-4 w-4 mr-2 text-red-400" />
                <span>Sivakasi, Tamil Nadu</span>
              </motion.div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-3 py-1">
                <Award className="h-3 w-3 mr-1" />
                50+ Years Excellence
              </Badge>
              <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1">
                <Shield className="h-3 w-3 mr-1" />
                ISO Certified
              </Badge>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Navbar */}
      <motion.nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-red-600/10 border-b border-red-600/30' 
            : 'bg-slate-800 border-b border-red-600/20'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo Section */}
            <motion.div 
              className="flex items-center space-x-3 cursor-pointer group"
              onClick={() => handleNavClick('home', '#home')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-500 rounded-full opacity-20 blur-xl group-hover:opacity-40 transition-opacity"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <div className={`relative backdrop-blur-sm p-3 rounded-full border transition-colors ${
                  isScrolled 
                    ? 'bg-gray-100 border-red-600/30 group-hover:border-orange-500/50' 
                    : 'bg-white/10 border-red-600/30 group-hover:border-orange-500/50'
                }`}>
                  <div className="h-10 w-10 bg-gradient-to-r from-red-600 to-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-lg font-bold">TE</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <span className={`text-xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent`}>
                  Twin Elephant
                </span>
                <span className={`text-xs transition-colors ${
                  isScrolled 
                    ? 'text-gray-600 group-hover:text-orange-500' 
                    : 'text-gray-300 group-hover:text-orange-400'
                }`}>
                  Premium Fireworks Since 1970
                </span>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                
                return (
                  <motion.div
                    key={item.id}
                    className="relative"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  >
                    <motion.a
                      href={item.href}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 group ${
                        isActive 
                          ? (isScrolled 
                              ? 'text-orange-600 bg-orange-100' 
                              : 'text-orange-400 bg-orange-400/10'
                            )
                          : (isScrolled 
                              ? 'text-black hover:text-orange-600 hover:bg-red-50' 
                              : 'text-white hover:text-orange-400 hover:bg-red-600/10'
                            )
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.id, item.href);
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="font-medium">{item.label}</span>
                      {/* {item.hasDropdown && (
                        <ChevronDown className="h-3 w-3 group-hover:rotate-180 transition-transform" />
                      )} */}
                    </motion.a>
                    
                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 rounded-full ${
                          isScrolled ? 'bg-orange-600' : 'bg-orange-400'
                        }`}
                        layoutId="activeTab"
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Search */}
              <motion.div className="relative">
                <AnimatePresence>
                  {isSearchOpen ? (
                    <motion.form
                      onSubmit={handleSearch}
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 280, opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center"
                    >
                      <Input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={`border-red-600/30 focus:border-orange-500 pr-10 ${
                          isScrolled 
                            ? 'bg-gray-100 text-black placeholder:text-gray-500' 
                            : 'bg-gray-700 text-white placeholder:text-gray-300'
                        }`}
                        autoFocus
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className={`absolute right-1 transition-colors ${
                          isScrolled 
                            ? 'text-gray-500 hover:text-orange-600' 
                            : 'text-gray-300 hover:text-orange-400'
                        }`}
                        onClick={() => {
                          setIsSearchOpen(false);
                          setSearchQuery('');
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </motion.form>
                  ) : (
                    <motion.button
                      onClick={() => setIsSearchOpen(true)}
                      className={`p-3 rounded-lg transition-colors ${
                        isScrolled 
                          ? 'text-gray-600 hover:text-orange-600 hover:bg-red-50' 
                          : 'text-gray-300 hover:text-orange-400 hover:bg-red-600/10'
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {/* <Search className="h-5 w-5" /> */}
                    </motion.button>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* User Account */}
              <motion.button
                className={`p-3 rounded-lg transition-colors ${
                  isScrolled 
                    ? 'text-gray-600 hover:text-orange-600 hover:bg-red-50' 
                    : 'text-gray-300 hover:text-orange-400 hover:bg-red-600/10'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {/* <User className="h-5 w-5" /> */}
              </motion.button>

              {/* Cart */}
              <motion.button
                className={`relative p-3 rounded-lg transition-colors ${
                  isScrolled 
                    ? 'text-gray-600 hover:text-orange-600 hover:bg-red-50' 
                    : 'text-gray-300 hover:text-orange-400 hover:bg-red-600/10'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {/* <ShoppingBag className="h-5 w-5" /> */}
                {/* <Badge className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1.5 py-0.5 min-w-[20px]">
                  3
                </Badge> */}
              </motion.button>

              {/* CTA Buttons */}
              {/* <Button 
                variant="outline" 
                size="sm"
                className="border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white transition-all duration-300"
                onClick={() => handleNavClick('gallery', '#gallery')}
              >
                <Images className="h-4 w-4 mr-2" />
                View Gallery
              </Button>
               */}
              <Button 
                size="sm"
                className="bg-gradient-to-r from-red-600 to-orange-500 hover:opacity-90 text-white shadow-lg transition-all duration-300"
                onClick={() => handleNavClick('contact', '#contact')}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Get Quote
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                isScrolled 
                  ? 'text-black hover:text-orange-600 hover:bg-red-50' 
                  : 'text-white hover:text-orange-400 hover:bg-red-600/10'
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-slate-800/80 backdrop-blur-sm z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
            />
            
            <motion.div
              className="fixed top-0 right-0 h-full w-80 bg-slate-800 border-l border-red-600/30 z-50 lg:hidden overflow-y-auto"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Mobile Menu Header */}
              <div className="p-6 border-b border-red-600/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="bg-gradient-to-r from-red-600 to-orange-500 p-2 rounded-lg">
                        <div className="h-8 w-8 bg-white rounded flex items-center justify-center">
                          <span className="text-red-600 font-bold">TE</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">Twin Elephant</h3>
                      <p className="text-xs text-gray-300">Premium Fireworks</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 rounded-lg text-gray-300 hover:text-orange-400 hover:bg-red-600/10"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Mobile Search */}
              <div className="p-6 border-b border-red-600/20">
                <form onSubmit={handleSearch} className="relative">
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-gray-700 border-red-600/30 text-white placeholder:text-gray-300 pr-10"
                  />
                  <Button
                    type="submit"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-orange-400"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </form>
              </div>

              {/* Mobile Navigation */}
              <div className="p-6">
                <nav className="space-y-2">
                  {navItems.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = currentPage === item.id;
                    
                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 * index }}
                      >
                        <a
                          href={item.href}
                          className={`flex items-center space-x-3 p-4 rounded-xl transition-all duration-300 ${
                            isActive 
                              ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-lg' 
                              : 'text-gray-300 hover:text-white hover:bg-red-600/10'
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            handleNavClick(item.id, item.href);
                          }}
                        >
                          <Icon className="h-5 w-5" />
                          <div className="flex-1">
                            <div className="font-medium">{item.label}</div>
                            <div className="text-xs opacity-75">{item.description}</div>
                          </div>
                          {isActive && <Star className="h-4 w-4" />}
                        </a>
                      </motion.div>
                    );
                  })}
                </nav>

                <Separator className="my-6 bg-red-600/20" />

                {/* Mobile Actions */}
                <div className="space-y-4">
                  <Button 
                    className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:opacity-90 text-white"
                    onClick={() => handleNavClick('contact', '#contact')}
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Get Quote Now
                  </Button>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      variant="outline" 
                      className="border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white"
                      onClick={() => handleNavClick('gallery', '#gallery')}
                    >
                      <Images className="h-4 w-4 mr-2" />
                      Gallery
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white"
                    >
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      Cart (3)
                    </Button>
                  </div>
                </div>

                <Separator className="my-6 bg-red-600/20" />

                {/* Contact Info */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-white">Quick Contact</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 text-sm">
                      <Phone className="h-4 w-4 text-blue-400" />
                      <span className="text-gray-300">+91-9876543210</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                      <Mail className="h-4 w-4 text-orange-400" />
                      <span className="text-gray-300">info@twinelephant.com</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                      <Clock className="h-4 w-4 text-red-400" />
                      <span className="text-gray-300">Mon-Sat: 9AM-6PM</span>
                    </div>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t border-red-600/20">
                  <div className="grid grid-cols-2 gap-2">
                    <Badge className="bg-blue-600/20 text-blue-400 border-blue-600/30 justify-center py-2">
                      <Shield className="h-3 w-3 mr-1" />
                      ISO Certified
                    </Badge>
                    <Badge className="bg-orange-600/20 text-orange-400 border-orange-600/30 justify-center py-2">
                      <Award className="h-3 w-3 mr-1" />
                      50+ Years
                    </Badge>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating Action Button (Mobile) */}
      <AnimatePresence>
        {!isMenuOpen && (
          <motion.div
            className="fixed bottom-6 right-6 z-40 lg:hidden"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <motion.button
              className="bg-gradient-to-r from-red-600 to-orange-500 text-white p-4 rounded-full shadow-lg"
              onClick={() => handleNavClick('contact', '#contact')}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              animate={{ 
                boxShadow: [
                  "0 4px 20px rgba(220, 38, 38, 0.3)",
                  "0 4px 30px rgba(234, 88, 12, 0.4)",
                  "0 4px 20px rgba(220, 38, 38, 0.3)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Zap className="h-6 w-6" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}