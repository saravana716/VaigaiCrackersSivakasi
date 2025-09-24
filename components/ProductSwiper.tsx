import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Sparkles, Eye } from 'lucide-react';

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
  },
  {
    id: 7,
    name: "Crystal Fountain Deluxe",
    price: 399,
    originalPrice: 549,
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=400&q=80",
    rating: 4.7,
    reviews: 142,
    category: "Fountains",
    badge: "Popular",
    badgeColor: "bg-indigo-500"
  },
  {
    id: 8,
    name: "Sky Thunder Rocket",
    price: 699,
    originalPrice: 899,
    image: "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?auto=format&fit=crop&w=400&q=80",
    rating: 4.8,
    reviews: 178,
    category: "Rockets",
    badge: "Top Rated",
    badgeColor: "bg-teal-500"
  }
];

export function ProductSwiper() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const swiperRef = useRef<HTMLDivElement>(null);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Responsive slides per page
  const SLIDES_PER_PAGE = isMobile ? 2 : 4;
  
  // Calculate total number of slides based on screen size
  const totalSlides = Math.ceil(products.length / SLIDES_PER_PAGE);

  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlay, totalSlides]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <>
    
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 opacity-0 animate-fade-in">
          <h2 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-red-600 via-orange-600 to-blue-600 bg-clip-text text-transparent">
            New Arrivals
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our most popular fireworks that light up celebrations across the nation
          </p>
        </div>

        {/* Swiper Container */}
        <div 
          className="relative"
          onMouseEnter={() => setIsAutoPlay(false)}
          onMouseLeave={() => setIsAutoPlay(true)}
        >
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm text-gray-800 p-2 md:p-3 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all"
          >
            <ChevronLeft className="h-4 w-4 md:h-6 md:w-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm text-gray-800 p-2 md:p-3 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all"
          >
            <ChevronRight className="h-4 w-4 md:h-6 md:w-6" />
          </button>

          {/* Products Slider */}
          <div className="overflow-hidden rounded-2xl" ref={swiperRef}>
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {/* Group products into slides based on screen size */}
              {Array.from({ length: totalSlides }, (_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0 flex">
                  {products
                    .slice(slideIndex * SLIDES_PER_PAGE, (slideIndex + 1) * SLIDES_PER_PAGE)
                    .map((product, productIndex) => (
                    <div
                      key={product.id}
                      className={`${isMobile ? 'w-1/2' : 'w-1/4'} flex-shrink-0 px-2 md:px-3 opacity-0 animate-fade-in-up hover:-translate-y-2 transition-all duration-300`}
                      style={{ animationDelay: `${productIndex * 100}ms` }}
                    >
                      <div className="bg-white border border-gray-200 shadow-xl rounded-lg overflow-hidden hover:shadow-2xl transition-all group h-full">
                        <div className="relative overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=400&q=80';
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                          
                          {/* Badge */}
                          <span className={`absolute top-2 left-2 md:top-4 md:left-4 text-xs px-2 py-1 rounded-full font-medium ${product.badgeColor} text-white border-0`}>
                            {product.badge}
                          </span>

                          {/* Quick View Button - Hidden on mobile for better UX */}
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 md:opacity-0 hover:opacity-100 transition-opacity">
                            <button
                              className="bg-white/90 text-gray-800 hover:bg-white text-xs px-3 py-2 rounded-md font-medium transition-colors"
                              onClick={() => window.location.hash = 'product-page'}
                            >
                              <Eye className="mr-1 h-3 w-3 inline" />
                              Quick View
                            </button>
                          </div>

                          {/* Discount Badge */}
                          {product.originalPrice > product.price && (
                            <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4 bg-red-500 text-white px-1.5 py-0.5 md:px-2 md:py-1 rounded-full text-xs font-medium">
                              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                            </div>
                          )}
                        </div>

                        <div className="p-3 md:p-4">
                          <h3 className="text-sm md:text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                            {product.name}
                          </h3>

                          {/* Rating */}
                          <div className="flex items-center gap-1 mb-2 md:mb-3">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-2.5 w-2.5 md:h-3 md:w-3 ${
                                    i < Math.floor(product.rating)
                                      ? 'text-yellow-500 fill-current'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-gray-600">
                              {product.rating} ({product.reviews})
                            </span>
                          </div>

                          {/* Price */}
                          <div className="flex items-center gap-2 mb-2 md:mb-3">
                            <span className="text-sm md:text-lg font-bold text-red-600">
                              ₹{product.price}
                            </span>
                            {product.originalPrice > product.price && (
                              <span className="text-xs md:text-sm text-gray-500 line-through">
                                ₹{product.originalPrice}
                              </span>
                            )}
                          </div>

                          {/* Category */}
                          <span className="inline-block bg-gray-100 text-gray-800 mb-2 md:mb-3 text-xs px-2 py-1 rounded-full">
                            {product.category}
                          </span>

                          {/* Action Button */}
                          <button 
                            className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold text-xs px-4 py-2 rounded-md transition-all duration-200"
                            onClick={() => window.location.hash = 'product-page'}
                          >
                            <Sparkles className="mr-1 h-3 w-3 inline" />
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {/* Fill empty slots if needed */}
                  {Array.from({ 
                    length: SLIDES_PER_PAGE - products.slice(slideIndex * SLIDES_PER_PAGE, (slideIndex + 1) * SLIDES_PER_PAGE).length 
                  }, (_, emptyIndex) => (
                    <div key={`empty-${emptyIndex}`} className={`${isMobile ? 'w-1/2' : 'w-1/4'} flex-shrink-0 px-2 md:px-3`} />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 md:mt-8 space-x-2">
            {Array.from({ length: totalSlides }, (_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all hover:scale-125 ${
                  currentIndex === index 
                    ? 'bg-red-600 w-6 md:w-8' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 md:mt-16 opacity-0 animate-fade-in" style={{ animationDelay: '200ms' }}>
          <button 
            className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg rounded-lg font-medium transition-all duration-200 hover:scale-105"
            onClick={() => window.location.hash = 'products'}
          >
            <Sparkles className="mr-2 h-4 w-4 md:h-5 md:w-5 inline" />
            Explore All Products
          </button>
        </div>
      </div>
    </section>
    </>
  );
}