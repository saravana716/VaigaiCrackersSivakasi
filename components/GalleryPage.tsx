import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import { 
  ArrowLeft, 
  Star, 
  Heart, 
  Share2, 
  Eye, 
  Sparkles, 
  Flame, 
  Rocket, 
  Zap, 
  Crown, 
  Search,
  X,
  Info,
  Award,
  Shield,
  Calendar
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { ImageWithFallback } from './figma/ImageWithFallback';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

interface Product {
  id: string;
  name: string;
  price: string;
  originalPrice: string;
  discount: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  description: string;
  features: string[];
  specifications: Record<string, string>;
  inStock: boolean;
  popular?: boolean;
  new?: boolean;
}

interface Category {
  id: string;
  name: string;
  description: string;
  icon: any;
  color: string;
  products: Product[];
}

const categories: Category[] = [
  {
    id: 'sparklers',
    name: 'Sparklers',
    description: 'Beautiful handheld sparklers for celebrations',
    icon: Sparkles,
    color: 'from-blue-400 to-blue-600',
    products: [
      {
        id: '1',
        name: 'Golden Rain 7" Sparklers',
        price: '₹125',
        originalPrice: '₹180',
        discount: 30,
        rating: 4.8,
        reviews: 156,
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80',
        category: 'Sparklers',
        description: 'Premium golden sparklers that create beautiful cascading effects perfect for weddings and celebrations.',
        features: ['Long burning time', 'Safe ignition', 'Bright golden sparks', 'Eco-friendly'],
        specifications: { 'Length': '7 inches', 'Duration': '45 seconds', 'Pack': '10 pieces' },
        inStock: true,
        popular: true
      },
      {
        id: '2',
        name: 'Silver Star 7" Sparklers',
        price: '₹110',
        originalPrice: '₹150',
        discount: 27,
        rating: 4.6,
        reviews: 89,
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80',
        category: 'Sparklers',
        description: 'Brilliant silver sparklers with consistent spark patterns and reliable performance.',
        features: ['Consistent sparks', 'Easy to light', 'Weather resistant', 'Safe handling'],
        specifications: { 'Length': '7 inches', 'Duration': '40 seconds', 'Pack': '10 pieces' },
        inStock: true
      },
      {
        id: '3',
        name: 'Rainbow Mix 10" Sparklers',
        price: '₹195',
        originalPrice: '₹250',
        discount: 22,
        rating: 4.9,
        reviews: 234,
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80',
        category: 'Sparklers',
        description: 'Multi-colored sparklers that change colors during burning for a magical display.',
        features: ['Color-changing effect', 'Extended duration', 'Premium quality', 'Party favorite'],
        specifications: { 'Length': '10 inches', 'Duration': '60 seconds', 'Pack': '8 pieces' },
        inStock: true,
        new: true
      },
      {
        id: '4',
        name: 'Wedding Special 12" Sparklers',
        price: '₹295',
        originalPrice: '₹380',
        discount: 22,
        rating: 5.0,
        reviews: 89,
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80',
        category: 'Sparklers',
        description: 'Elegant long-burning sparklers designed specially for wedding photography and celebrations.',
        features: ['Photo-friendly', 'Smokeless', 'Long duration', 'Premium packaging'],
        specifications: { 'Length': '12 inches', 'Duration': '90 seconds', 'Pack': '6 pieces' },
        inStock: true,
        popular: true
      }
    ]
  },
  {
    id: 'fountains',
    name: 'Fountains',
    description: 'Ground-based fountains with spectacular displays',
    icon: Flame,
    color: 'from-red-400 to-orange-500',
    products: [
      {
        id: '5',
        name: 'Mini Volcano Fountain',
        price: '₹85',
        originalPrice: '₹120',
        discount: 29,
        rating: 4.5,
        reviews: 76,
        image: 'https://images.unsplash.com/photo-1514820720066-ed8784479467?auto=format&fit=crop&w=400&q=80',
        category: 'Fountains',
        description: 'Compact fountain perfect for home celebrations with colorful sparks.',
        features: ['Compact size', 'Colorful display', 'Safe for home use', 'Easy setup'],
        specifications: { 'Height': '15 cm', 'Duration': '25 seconds', 'Colors': 'Multi' },
        inStock: true
      },
      {
        id: '6',
        name: 'Garden Fountain Deluxe',
        price: '₹145',
        originalPrice: '₹200',
        discount: 28,
        rating: 4.7,
        reviews: 123,
        image: 'https://images.unsplash.com/photo-1514820720066-ed8784479467?auto=format&fit=crop&w=400&q=80',
        category: 'Fountains',
        description: 'Medium-sized fountain with beautiful cascading sparks in multiple colors.',
        features: ['Medium height', 'Color variation', 'Stable base', 'Weather resistant'],
        specifications: { 'Height': '25 cm', 'Duration': '40 seconds', 'Colors': 'Red, Gold, Green' },
        inStock: true,
        popular: true
      }
    ]
  },
  {
    id: 'rockets',
    name: 'Rockets',
    description: 'High-flying rockets with aerial displays',
    icon: Rocket,
    color: 'from-blue-500 to-cyan-500',
    products: [
      {
        id: '7',
        name: 'Sky Rocket Premium',
        price: '₹199',
        originalPrice: '₹280',
        discount: 29,
        rating: 4.8,
        reviews: 167,
        image: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=400&q=80',
        category: 'Rockets',
        description: 'Premium quality rockets that soar high and burst into beautiful patterns.',
        features: ['High altitude', 'Colorful burst', 'Loud whistle', 'Professional grade'],
        specifications: { 'Height': '100m+', 'Duration': '3-5 seconds', 'Pack': '5 pieces' },
        inStock: true,
        popular: true
      },
      {
        id: '8',
        name: 'Thunder Rocket',
        price: '₹165',
        originalPrice: '₹220',
        discount: 25,
        rating: 4.6,
        reviews: 94,
        image: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=400&q=80',
        category: 'Rockets',
        description: 'Powerful rockets with thunderous sound effects and brilliant colors.',
        features: ['Thunder sound', 'Bright colors', 'Reliable ignition', 'Impact resistant'],
        specifications: { 'Height': '80m+', 'Duration': '4-6 seconds', 'Pack': '6 pieces' },
        inStock: true
      }
    ]
  },
  {
    id: 'roman-candles',
    name: 'Roman Candles',
    description: 'Multi-shot candles with sequential bursts',
    icon: Star,
    color: 'from-purple-500 to-pink-500',
    products: [
      {
        id: '9',
        name: '10-Shot Roman Candle',
        price: '₹225',
        originalPrice: '₹300',
        discount: 25,
        rating: 4.7,
        reviews: 142,
        image: 'https://images.unsplash.com/photo-1567336272704-7ba7147b98b9?auto=format&fit=crop&w=400&q=80',
        category: 'Roman Candles',
        description: 'Classic roman candle with 10 consecutive colorful shots.',
        features: ['10 shots', 'Sequential firing', 'Multiple colors', 'Stable base'],
        specifications: { 'Shots': '10', 'Interval': '2 seconds', 'Height': '30m' },
        inStock: true,
        popular: true
      }
    ]
  },
  {
    id: 'crackers',
    name: 'Crackers',
    description: 'Traditional crackers and sound makers',
    icon: Zap,
    color: 'from-yellow-500 to-red-500',
    products: [
      {
        id: '10',
        name: 'Sound Crackers Pack',
        price: '₹75',
        originalPrice: '₹100',
        discount: 25,
        rating: 4.4,
        reviews: 89,
        image: 'https://images.unsplash.com/photo-1481819613568-3701cbc70156?auto=format&fit=crop&w=400&q=80',
        category: 'Crackers',
        description: 'Traditional sound crackers for festive celebrations.',
        features: ['Loud sound', 'Quick ignition', 'Bulk pack', 'Festival favorite'],
        specifications: { 'Sound': 'High', 'Pack': '50 pieces', 'Type': 'Single shot' },
        inStock: true
      }
    ]
  },
  {
    id: 'premium-sets',
    name: 'Premium Sets',
    description: 'Curated collections for special occasions',
    icon: Crown,
    color: 'from-purple-600 to-indigo-600',
    products: [
      {
        id: '11',
        name: 'Wedding Celebration Pack',
        price: '₹899',
        originalPrice: '₹1200',
        discount: 25,
        rating: 4.9,
        reviews: 234,
        image: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?auto=format&fit=crop&w=400&q=80',
        category: 'Premium Sets',
        description: 'Complete wedding celebration package with sparklers, fountains, and rockets.',
        features: ['Complete package', 'Wedding themed', 'Premium quality', 'Gift packaging'],
        specifications: { 'Items': '25+ pieces', 'Duration': '10+ minutes', 'Occasion': 'Wedding' },
        inStock: true,
        popular: true,
        new: true
      }
    ]
  }
];

interface GalleryPageProps {
  onBack: () => void;
}

export function GalleryPage({ onBack }: GalleryPageProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const toggleFavorite = (productId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavorites(newFavorites);
  };

  const filteredCategories = selectedCategory === 'all' 
    ? categories 
    : categories.filter(cat => cat.id === selectedCategory);

  const allProducts = categories.flatMap(cat => cat.products);
  const searchResults = searchTerm 
    ? allProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-yellow-400 rounded-full opacity-30"
            animate={{
              y: [0, -100],
              x: [0, Math.random() * 50 - 25],
              opacity: [0.3, 0]
            }}
            transition={{
              duration: 4,
              delay: i * 0.5,
              repeat: Infinity,
              ease: "easeOut"
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: '100%'
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="relative bg-gradient-to-r from-orange-600 via-red-500 to-pink-600 p-6 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <motion.div 
          className="container mx-auto relative z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20 mb-4 backdrop-blur-sm"
            onClick={onBack}
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Button>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-5xl font-bold text-white mb-2">Product Gallery</h1>
              <p className="text-xl text-white/80">Discover our complete collection of premium fireworks</p>
            </div>
            
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-md">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 h-5 w-5" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/60 backdrop-blur-sm"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white backdrop-blur-sm focus:ring-2 focus:ring-white/50 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id} className="text-gray-900">{cat.name}</option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Search Results */}
      {searchTerm && (
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              Search Results ({searchResults.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {searchResults.map((product, index) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onSelect={setSelectedProduct}
                  onToggleFavorite={toggleFavorite}
                  isFavorite={favorites.has(product.id)}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* Categories */}
      {!searchTerm && (
        <div className="container mx-auto px-4 py-12 space-y-16">
          {filteredCategories.map((category, categoryIndex) => (
            <motion.section
              key={category.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
              className="space-y-8"
            >
              {/* Category Header */}
              <div className="flex items-center space-x-4">
                <div className={`p-4 rounded-2xl bg-gradient-to-r ${category.color}`}>
                  <category.icon className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-4xl font-bold text-white">{category.name}</h2>
                  <p className="text-xl text-gray-300">{category.description}</p>
                </div>
                <div className="flex-1"></div>
                <Badge className={`bg-gradient-to-r ${category.color} text-white px-4 py-2 text-lg`}>
                  {category.products.length} Products
                </Badge>
              </div>

              {/* Product Swiper */}
              <div className="relative">
                <Swiper
                  modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
                  spaceBetween={30}
                  slidesPerView={1}
                  navigation={{
                    prevEl: `.swiper-button-prev-${category.id}`,
                    nextEl: `.swiper-button-next-${category.id}`,
                  }}
                  pagination={{ 
                    clickable: true,
                    el: `.swiper-pagination-${category.id}`
                  }}
                  autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                  }}
                  effect="coverflow"
                  coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                  }}
                  breakpoints={{
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                  }}
                  className="pb-12"
                >
                  {category.products.map((product, index) => (
                    <SwiperSlide key={product.id}>
                      <ProductCard 
                        product={product} 
                        onSelect={setSelectedProduct}
                        onToggleFavorite={toggleFavorite}
                        isFavorite={favorites.has(product.id)}
                        index={index}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* Custom Navigation */}
                <button className={`swiper-button-prev-${category.id} absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 backdrop-blur-md rounded-full p-3 text-white hover:bg-white/30 transition-colors`}>
                  <ArrowLeft className="h-6 w-6" />
                </button>
                <button className={`swiper-button-next-${category.id} absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 backdrop-blur-md rounded-full p-3 text-white hover:bg-white/30 transition-colors`}>
                  <ArrowLeft className="h-6 w-6 rotate-180" />
                </button>

                {/* Custom Pagination */}
                <div className={`swiper-pagination-${category.id} flex justify-center mt-6`}></div>
              </div>
            </motion.section>
          ))}
        </div>
      )}

      {/* Product Popup Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductPopup 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)}
            onToggleFavorite={toggleFavorite}
            isFavorite={favorites.has(selectedProduct.id)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onToggleFavorite: (id: string) => void;
  isFavorite: boolean;
  index: number;
}

function ProductCard({ product, onSelect, onToggleFavorite, isFavorite, index }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="group cursor-pointer"
      onClick={() => onSelect(product)}
    >
      <Card className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-none backdrop-blur-md shadow-2xl overflow-hidden h-full">
        <div className="relative">
          <div className="aspect-square overflow-hidden">
            <ImageWithFallback
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>

          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.popular && (
              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-2 py-1 text-xs font-bold">
                <Star className="w-3 h-3 mr-1" />
                Popular
              </Badge>
            )}
            {product.new && (
              <Badge className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-2 py-1 text-xs font-bold">
                New
              </Badge>
            )}
            {product.discount > 0 && (
              <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 text-xs font-bold">
                {product.discount}% OFF
              </Badge>
            )}
          </div>

          {/* Actions */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(product.id);
              }}
              className={`p-2 rounded-full backdrop-blur-md transition-all ${
                isFavorite 
                  ? 'bg-red-500/80 text-white' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Eye className="h-4 w-4" />
            </motion.button>
          </div>

          {/* Stock Status */}
          <div className="absolute bottom-3 right-3">
            <Badge variant={product.inStock ? "default" : "destructive"} className="text-xs">
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </Badge>
          </div>
        </div>

        <CardContent className="p-6">
          <div className="space-y-3">
            <div>
              <h3 className="text-lg font-bold text-white group-hover:text-yellow-400 transition-colors line-clamp-2">
                {product.name}
              </h3>
              <p className="text-sm text-gray-400">{product.category}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating) 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-600'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-300">({product.reviews})</span>
            </div>

            {/* Price */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-green-400">{product.price}</span>
                {product.discount > 0 && (
                  <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                )}
              </div>
              <Button 
                size="sm" 
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 text-white"
                onClick={(e) => e.stopPropagation()}
              >
                View Details
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface ProductPopupProps {
  product: Product;
  onClose: () => void;
  onToggleFavorite: (id: string) => void;
  isFavorite: boolean;
}

function ProductPopup({ product, onClose, onToggleFavorite, isFavorite }: ProductPopupProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 50 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 p-6">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Badge className="bg-white/20 text-white px-3 py-1">
                {product.category}
              </Badge>
              {product.popular && (
                <Badge className="bg-yellow-500 text-black px-3 py-1">
                  <Star className="w-4 h-4 mr-1" />
                  Popular
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onToggleFavorite(product.id)}
                className={`p-2 rounded-full transition-all ${
                  isFavorite 
                    ? 'bg-red-500 text-white' 
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
              >
                <X className="h-5 w-5" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="aspect-square rounded-2xl overflow-hidden bg-gray-700">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Product Details */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              {/* Title & Rating */}
              <div>
                <h2 className="text-3xl font-bold text-white mb-3">{product.name}</h2>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating) 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-white">{product.rating}</span>
                  <span className="text-gray-400">({product.reviews} reviews)</span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-4">
                <span className="text-4xl font-bold text-green-400">{product.price}</span>
                {product.discount > 0 && (
                  <>
                    <span className="text-xl text-gray-500 line-through">{product.originalPrice}</span>
                    <Badge className="bg-red-500 text-white px-3 py-1">
                      {product.discount}% OFF
                    </Badge>
                  </>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-300 leading-relaxed">{product.description}</p>

              {/* Features */}
              <div>
                <h3 className="text-xl font-bold text-white mb-3 flex items-center">
                  <Sparkles className="h-5 w-5 mr-2 text-yellow-400" />
                  Features
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specifications */}
              <div>
                <h3 className="text-xl font-bold text-white mb-3 flex items-center">
                  <Info className="h-5 w-5 mr-2 text-blue-400" />
                  Specifications
                </h3>
                <div className="space-y-2">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center py-2 border-b border-gray-700">
                      <span className="text-gray-400">{key}:</span>
                      <span className="text-white font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:opacity-90 text-white flex-1">
                  <Info className="h-5 w-5 mr-2" />
                  Get Information
                </Button>
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                  <Share2 className="h-5 w-5 mr-2" />
                  Share
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-700">
                {[
                  { icon: Shield, text: "Safety Certified" },
                  { icon: Award, text: "Premium Quality" },
                  { icon: Calendar, text: "50+ Years" }
                ].map((badge, index) => (
                  <div key={index} className="text-center">
                    <badge.icon className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                    <p className="text-xs text-gray-400">{badge.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}