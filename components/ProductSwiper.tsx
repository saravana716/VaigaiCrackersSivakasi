import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { db } from "../firebase"; // Ensure firebase.ts is configured
import { collection, getDocs } from "firebase/firestore";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  images: string[]; // ✅ Changed from 'image: string' to 'images: string[]'
  rating: number;
  reviews: number;
  category: string;
  badge: string;
  badgeColor: string;
}

export function ProductSwiper({
  handleproductClick,
}: {
  handleproductClick: (productId: string) => void;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const swiperRef = useRef<HTMLDivElement>(null);

  // ✅ Fetch all products from Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const fetched: Product[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[];
        setProducts(fetched);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // ✅ Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // ✅ Responsive slides per page
  const SLIDES_PER_PAGE = isMobile ? 2 : 4;
  const totalSlides = Math.ceil(products.length / SLIDES_PER_PAGE);

  // ✅ Auto play slides
  useEffect(() => {
    if (!isAutoPlay || totalSlides <= 1) return;

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

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-600">Loading products...</div>
    );
  }

  if (!products.length) {
    return (
      <div className="py-20 text-center text-gray-600">No products found.</div>
    );
  }
  
  console.log(products, "products");
  
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 opacity-0 animate-fade-in">
          <h2 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-red-600 via-orange-600 to-blue-600 bg-clip-text text-transparent">
            Trending Products
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our most popular fireworks that light up celebrations
            across the nation
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
              {Array.from({ length: totalSlides }, (_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0 flex">
                  {products
                    .slice(
                      slideIndex * SLIDES_PER_PAGE,
                      (slideIndex + 1) * SLIDES_PER_PAGE
                    )
                    .map((product, productIndex) => (
                      <div
                        key={product.id}
                        className={`${
                          isMobile ? "w-1/2" : "w-1/4"
                        } flex-shrink-0 px-2 md:px-3 opacity-0 animate-fade-in-up hover:-translate-y-2 transition-all duration-300`}
                        style={{ animationDelay: `${productIndex * 100}ms` }}
                      >
                        <div className="bg-white border border-gray-200 shadow-xl rounded-lg overflow-hidden hover:shadow-2xl transition-all group h-full">
                          <div className="relative overflow-hidden">
                            <img
                              src={product.images?.[0] || "https://via.placeholder.com/400x400?text=No+Image"}
                              alt={product.name}
                              className="w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src =
                                  "https://via.placeholder.com/400x400?text=No+Image";
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                            {/* Quick View Button */}
                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 md:opacity-0 hover:opacity-100 transition-opacity">
                              <button
                                className="bg-white/90 text-gray-800 hover:bg-white text-xs px-3 py-2 rounded-md font-medium transition-colors"
                                onClick={() => {
                                  sessionStorage.setItem(
                                    "productId",
                                    product.id
                                  );
                                  handleproductClick(product.id);
                                }}
                              >
                                <Eye className="mr-1 h-3 w-3 inline" />
                                Quick View
                              </button>
                            </div>
                          </div>

                          <div className="p-3 md:p-4">
                            <h3 className="text-sm md:text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                              {product.name}
                            </h3>

                            <span className="inline-block bg-gray-100 text-gray-800 mb-2 md:mb-3 text-xs px-2 py-1 rounded-full">
                              {product.category}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}

                  {/* Fill empty slots if needed */}
                  {Array.from(
                    {
                      length:
                        SLIDES_PER_PAGE -
                        products.slice(
                          slideIndex * SLIDES_PER_PAGE,
                          (slideIndex + 1) * SLIDES_PER_PAGE
                        ).length,
                    },
                    (_, emptyIndex) => (
                      <div
                        key={`empty-${emptyIndex}`}
                        className={`${
                          isMobile ? "w-1/2" : "w-1/4"
                        } flex-shrink-0 px-2 md:px-3`}
                      />
                    )
                  )}
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
                    ? "bg-red-600 w-6 md:w-8"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}