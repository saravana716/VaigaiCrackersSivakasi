import { useState, useRef, useEffect } from 'react';
import { motion} from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Sparkles, Eye } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  badge: string;
  badgeColor: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Golden Fountain Sparkler",
    price: 299,
    originalPrice: 399,
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=400&q=80",
    rating: 4.8,
    reviews: 156,
    category: "Fountains",
    badge: "Best Seller",
    badgeColor: "bg-red-500"
  },
  {
    id: 2,
    name: "Colorful Sky Rocket",
    price: 599,
    originalPrice: 799,
    image: "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?auto=format&fit=crop&w=400&q=80",
    rating: 4.9,
    reviews: 203,
    category: "Rockets",
    badge: "Premium",
    badgeColor: "bg-blue-600"
  },
  {
    id: 3,
    name: "Twin Elephant Special",
    price: 899,
    originalPrice: 1199,
    image: "https://images.unsplash.com/photo-1542244192-bca815a5aa4b?auto=format&fit=crop&w=400&q=80",
    rating: 5.0,
    reviews: 89,
    category: "Combo Packs",
    badge: "Limited Edition",
    badgeColor: "bg-orange-500"
  },
  {
    id: 4,
    name: "Magic Sparkler Set",
    price: 199,
    originalPrice: 299,
    image: "https://images.unsplash.com/photo-1481819613568-3701caf69da8?auto=format&fit=crop&w=400&q=80",
    rating: 4.7,
    reviews: 134,
    category: "Sparklers",
    badge: "Family Pack",
    badgeColor: "bg-green-500"
  },
  {
    id: 5,
    name: "Thunder Ground Spinner",
    price: 449,
    originalPrice: 599,
    image: "https://images.unsplash.com/photo-1514195037031-83d60d7e7480?auto=format&fit=crop&w=400&q=80",
    rating: 4.6,
    reviews: 98,
    category: "Ground Spinners",
    badge: "New Arrival",
    badgeColor: "bg-purple-500"
  },
  {
    id: 6,
    name: "Celebration Multi-Shot",
    price: 1299,
    originalPrice: 1699,
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2e04?auto=format&fit=crop&w=400&q=80",
    rating: 4.9,
    reviews: 167,
    category: "Multi-Shot",
    badge: "Professional",
    badgeColor: "bg-red-600"
  }
];

export function ProductSwiper() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const swiperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % (products.length - 2));
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % (products.length - 2));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + (products.length - 2)) % (products.length - 2));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-red-600 via-orange-600 to-blue-600 bg-clip-text text-transparent">
            Trending Products
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our most popular fireworks that light up celebrations across the nation
          </p>
        </motion.div>

        {/* Swiper Container */}
        <div 
          className="relative"
          onMouseEnter={() => setIsAutoPlay(false)}
          onMouseLeave={() => setIsAutoPlay(true)}
        >
          {/* Navigation Buttons */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm text-gray-800 p-3 rounded-full shadow-lg hover:bg-white transition-all"
          >
            <ChevronLeft className="h-6 w-6" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm text-gray-800 p-3 rounded-full shadow-lg hover:bg-white transition-all"
          >
            <ChevronRight className="h-6 w-6" />
          </motion.button>

          {/* Products Slider */}
          <div className="overflow-hidden rounded-2xl" ref={swiperRef}>
            <motion.div
              className="flex"
              animate={{ x: `-${currentIndex * (100 / 3)}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {products.map((product) => (
                <motion.div
                  key={product.id}
                  className="w-1/3 flex-shrink-0 px-3"
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-white border-gray-200 shadow-xl overflow-hidden hover:shadow-2xl transition-all group">
                    <div className="relative overflow-hidden">
                      <ImageWithFallback
                        src={product.image}
                        alt={product.name}
                        className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      
                      {/* Badge */}
                      <Badge className={`absolute top-4 left-4 ${product.badgeColor} text-white border-0`}>
                        {product.badge}
                      </Badge>

                      {/* Quick View Button */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute inset-0 bg-black/20 flex items-center justify-center"
                      >
                        <Button
                          size="lg"
                          className="bg-white/90 text-gray-800 hover:bg-white"
                          onClick={() => window.location.hash = 'product-page'}
                        >
                          <Eye className="mr-2 h-5 w-5" />
                          Quick View
                        </Button>
                      </motion.div>

                      {/* Discount Badge */}
                      {product.originalPrice > product.price && (
                        <div className="absolute bottom-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                        </div>
                      )}
                    </div>

                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {product.name}
                      </h3>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(product.rating)
                                  ? 'text-yellow-500 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">
                          {product.rating} ({product.reviews} reviews)
                        </span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-2xl font-bold text-red-600">
                          ₹{product.price}
                        </span>
                        {product.originalPrice > product.price && (
                          <span className="text-lg text-gray-500 line-through">
                            ₹{product.originalPrice}
                          </span>
                        )}
                      </div>

                      {/* Category */}
                      <Badge variant="secondary" className="mb-4">
                        {product.category}
                      </Badge>

                      {/* Action Button */}
                      <Button 
                        className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold"
                        onClick={() => window.location.hash = 'product-page'}
                      >
                        <Sparkles className="mr-2 h-4 w-4" />
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: products.length - 2 }, (_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentIndex === index 
                    ? 'bg-red-600 w-8' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mt-16"
        >
          <Button 
            size="lg"
            variant="outline" 
            className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 text-lg"
            onClick={() => window.location.hash = 'products'}
          >
            <Sparkles className="mr-2 h-5 w-5" />
            Explore All Products
          </Button>
        </motion.div>
      </div>
    </section>
  );
}