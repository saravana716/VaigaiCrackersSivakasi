import { motion } from 'framer-motion';
import { Star, Eye, Sparkles } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

const featuredProducts = [
  {
    id: 1,
    name: 'Golden Fountain Deluxe',
    price: 49.99,
    originalPrice: 59.99,
    rating: 4.8,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1467810563316-b5476525c0f9?auto=format&fit=crop&w=400&q=80',
    badge: 'Best Seller',
    badgeColor: 'bg-yellow-500'
  },
  {
    id: 2,
    name: 'Rainbow Rocket Pack',
    price: 89.99,
    originalPrice: 109.99,
    rating: 4.9,
    reviews: 203,
    image: 'https://images.unsplash.com/photo-1521671413015-ce2b0103c8c7?auto=format&fit=crop&w=400&q=80',
    badge: 'Premium',
    badgeColor: 'bg-purple-500'
  },
  {
    id: 3,
    name: 'Sparkler Wedding Set',
    price: 24.99,
    originalPrice: 34.99,
    rating: 4.7,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1635322966219-b75ed372eb01?auto=format&fit=crop&w=400&q=80',
    badge: 'Popular',
    badgeColor: 'bg-green-500'
  },
  {
    id: 4,
    name: 'Thunder Cracker Bundle',
    price: 34.99,
    originalPrice: 44.99,
    rating: 4.6,
    reviews: 127,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80',
    badge: 'Sale',
    badgeColor: 'bg-red-500'
  },
  {
    id: 5,
    name: 'Star Burst Roman Candles',
    price: 67.99,
    originalPrice: 79.99,
    rating: 4.8,
    reviews: 178,
    image: 'https://images.unsplash.com/photo-1532635270-c90cd58c1e2b?auto=format&fit=crop&w=400&q=80',
    badge: 'New',
    badgeColor: 'bg-blue-500'
  },
  {
    id: 6,
    name: 'Celebration Mega Pack',
    price: 199.99,
    originalPrice: 249.99,
    rating: 4.9,
    reviews: 94,
    image: 'https://images.unsplash.com/photo-1514472606653-6628a1b8b3c0?auto=format&fit=crop&w=400&q=80',
    badge: 'Limited',
    badgeColor: 'bg-orange-500'
  }
];

export function FeaturedProducts() {
  return (
    <section id="products" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-red-600 to-orange-600 bg-clip-text text-transparent">
            Featured Products
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our most popular fireworks, loved by customers nationwide for their spectacular displays and reliable performance
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="group"
            >
              <Card className="bg-white border-gray-200 shadow-lg overflow-hidden hover:shadow-xl transition-all">
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  
                  {/* Badge */}
                  <Badge className={`absolute top-4 left-4 ${product.badgeColor} text-white border-0`}>
                    {product.badge}
                  </Badge>

                  {/* Quick Actions */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button 
                      size="sm" 
                      variant="secondary" 
                      className="h-8 w-8 p-0 bg-white/90 hover:bg-white text-gray-800"
                      onClick={() => window.location.hash = 'product-page'}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Discount Badge */}
                  {product.originalPrice > product.price && (
                    <div className="absolute bottom-4 left-4 bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </div>
                  )}
                </div>

                <CardContent className="p-6">
                  <h3 
                    className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors cursor-pointer"
                    onClick={() => window.location.hash = 'product-page'}
                  >
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
                    <span className="text-2xl font-bold text-blue-600">
                      ₹{product.price}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-lg text-gray-500 line-through">
                        ₹{product.originalPrice}
                      </span>
                    )}
                  </div>

                  {/* View Details Button */}
                  <div className="flex gap-2">
                    <Button 
                      className="flex-1 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold"
                      onClick={() => window.location.hash = 'product-page'}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Button 
            size="lg"
            variant="outline" 
            className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 text-lg"
          >
            <Sparkles className="mr-2 h-5 w-5" />
            View All Products
          </Button>
        </motion.div>
      </div>
    </section>
  );
}