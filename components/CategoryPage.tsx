import { useState} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Search, Grid, List, Star, Sparkles, Flame,} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Product {
  id: string;
  name: string;
  price: string;
  rating: number;
  image: string;
  popular?: boolean;
}

interface SubCategory {
  id: string;
  name: string;
  description: string;
  products: Product[];
}

interface CategoryData {
  name: string;
  description: string;
  icon: any;
  color: string;
  image: string;
  subCategories: SubCategory[];
}

const categoryData: Record<string, CategoryData> = {
  sparklers: {
    name: 'Sparklers',
    description: 'Beautiful handheld sparklers perfect for weddings, celebrations, and intimate gatherings. Our premium quality sparklers provide bright, long-lasting sparkles.',
    icon: Sparkles,
    color: 'from-blue-400 to-blue-600',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=1200&q=80',
    subCategories: [
      {
        id: '7-inch',
        name: '7 Inch Sparklers',
        description: 'Perfect for intimate celebrations',
        products: [
          { id: '1', name: 'Golden Rain 7"', price: '₹125', rating: 4.8, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=300&q=80', popular: true },
          { id: '2', name: 'Silver Star 7"', price: '₹110', rating: 4.6, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=300&q=80' },
          { id: '3', name: 'Color Mix 7"', price: '₹140', rating: 4.7, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=300&q=80' },
          { id: '4', name: 'Premium Gold 7"', price: '₹165', rating: 4.9, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=300&q=80' }
        ]
      },
      {
        id: '10-inch',
        name: '10 Inch Sparklers',
        description: 'Medium size for parties and events',
        products: [
          { id: '5', name: 'Twin Elephant Gold 10"', price: '₹185', rating: 4.9, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=300&q=80', popular: true },
          { id: '6', name: 'Rainbow Sparkler 10"', price: '₹195', rating: 4.8, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=300&q=80' },
          { id: '7', name: 'Electric Blue 10"', price: '₹175', rating: 4.7, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=300&q=80' },
          { id: '8', name: 'Royal Silver 10"', price: '₹160', rating: 4.6, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=300&q=80' }
        ]
      },
      {
        id: '12-inch',
        name: '12 Inch Sparklers',
        description: 'Long-lasting sparklers for grand celebrations',
        products: [
          { id: '9', name: 'Majestic Gold 12"', price: '₹245', rating: 4.9, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=300&q=80', popular: true },
          { id: '10', name: 'Platinum Special 12"', price: '₹275', rating: 4.8, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=300&q=80' },
          { id: '11', name: 'Festival King 12"', price: '₹225', rating: 4.7, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=300&q=80' }
        ]
      },
      {
        id: '15-inch',
        name: '15 Inch Sparklers',
        description: 'Professional grade for weddings and special events',
        products: [
          { id: '12', name: 'Wedding Bliss 15"', price: '₹325', rating: 5.0, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=300&q=80', popular: true },
          { id: '13', name: 'Golden Anniversary 15"', price: '₹295', rating: 4.9, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=300&q=80' },
          { id: '14', name: 'Celebration Elite 15"', price: '₹340', rating: 4.8, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=300&q=80' }
        ]
      }
    ]
  },
  fountains: {
    name: 'Fountains',
    description: 'Ground-based fountains that create stunning vertical displays with colorful sparks and effects.',
    icon: Flame,
    color: 'from-red-400 to-orange-500',
    image: 'https://images.unsplash.com/photo-1514820720066-ed8784479467?auto=format&fit=crop&w=1200&q=80',
    subCategories: [
      {
        id: 'small',
        name: 'Small Fountains',
        description: 'Perfect for home celebrations',
        products: [
          { id: '15', name: 'Garden Fountain', price: '₹85', rating: 4.6, image: 'https://images.unsplash.com/photo-1514820720066-ed8784479467?auto=format&fit=crop&w=300&q=80' },
          { id: '16', name: 'Mini Volcano', price: '₹95', rating: 4.5, image: 'https://images.unsplash.com/photo-1514820720066-ed8784479467?auto=format&fit=crop&w=300&q=80' },
          { id: '17', name: 'Color Burst', price: '₹110', rating: 4.7, image: 'https://images.unsplash.com/photo-1514820720066-ed8784479467?auto=format&fit=crop&w=300&q=80' }
        ]
      },
      {
        id: 'medium',
        name: 'Medium Fountains',
        description: 'Great for parties and gatherings',
        products: [
          { id: '18', name: 'Twin Elephant Fountain', price: '₹185', rating: 4.8, image: 'https://images.unsplash.com/photo-1514820720066-ed8784479467?auto=format&fit=crop&w=300&q=80', popular: true },
          { id: '19', name: 'Rainbow Cascade', price: '₹195', rating: 4.7, image: 'https://images.unsplash.com/photo-1514820720066-ed8784479467?auto=format&fit=crop&w=300&q=80' },
          { id: '20', name: 'Golden Shower', price: '₹175', rating: 4.6, image: 'https://images.unsplash.com/photo-1514820720066-ed8784479467?auto=format&fit=crop&w=300&q=80' }
        ]
      }
    ]
  }
};

interface CategoryPageProps {
  category: string;
  onBack: () => void;
  handleproductClick:(productId: string) => void;
}

export function CategoryPage({ category, onBack,handleproductClick }: CategoryPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('all');
  
  const data = categoryData[category];
  
  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Category not found</h2>
          <Button onClick={onBack} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const IconComponent = data.icon;
  
  const filteredSubCategories = selectedSubCategory === 'all' 
    ? data.subCategories 
    : data.subCategories.filter(sub => sub.id === selectedSubCategory);

  const allProducts = data.subCategories.flatMap(sub => sub.products);
  const filteredProducts = searchTerm 
    ? allProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : allProducts;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Header */}
      <section className="relative bg-black text-white overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={data.image}
            alt={data.name}
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Button 
              onClick={onBack}
              variant="ghost" 
              className="text-white hover:bg-white/20 mb-6"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Categories
            </Button>
            
            <div className="flex items-center space-x-4 mb-6">
              <div className={`p-4 rounded-2xl bg-gradient-to-r ${data.color}`}>
                <IconComponent className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-5xl font-bold mb-2">{data.name}</h1>
                <p className="text-xl text-gray-300 max-w-2xl">{data.description}</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 text-sm">
              <Badge variant="secondary" className="bg-white/20 text-white">
                {allProducts.length} Products Available
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white">
                Premium Quality
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white">
                Twin Elephant Brand
              </Badge>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Controls */}
      <section className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <select
                value={selectedSubCategory}
                onChange={(e) => setSelectedSubCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {data.subCategories.map(sub => (
                  <option key={sub.id} value={sub.id}>{sub.name}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="container mx-auto px-4 py-12">
        <AnimatePresence mode="wait">
          {searchTerm ? (
            // Search Results
            <motion.div
              key="search-results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Search Results ({filteredProducts.length})
              </h2>
              
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                  : 'grid-cols-1'
              }`}>
                {filteredProducts.map((product, index) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    viewMode={viewMode}
                    index={index}
                    color={data.color}
                    handleproductClick={handleproductClick}
                  />
                ))}
              </div>
            </motion.div>
          ) : (
            // Category View
            <motion.div
              key="category-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {filteredSubCategories.map((subCategory, categoryIndex) => (
                <motion.div
                  key={subCategory.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
                  className="mb-16"
                >
                  <div className="flex items-center space-x-4 mb-8">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${data.color} flex items-center justify-center text-white font-bold text-lg`}>
                      {subCategory.products.length}
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900">{subCategory.name}</h3>
                      <p className="text-gray-600">{subCategory.description}</p>
                    </div>
                  </div>
                  
                  <div className={`grid gap-6 ${
                    viewMode === 'grid' 
                      ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                      : 'grid-cols-1'
                  }`}>
                    {subCategory.products.map((product, index) => (
                      <ProductCard 
                        key={product.id} 
                        product={product} 
                        viewMode={viewMode}
                        index={index}
                        color={data.color}
                        handleproductClick={handleproductClick}
                      />
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}

interface ProductCardProps {
  product: Product;
  viewMode: 'grid' | 'list';
  index: number;
  color: string;
  handleproductClick:(productId: string) => void;
}

function ProductCard({ product, viewMode, index, color, handleproductClick}: ProductCardProps) {
  console.log("Product data:", product);

  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ scale: 1.02 }}
        className="group"
      >
        <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-l-4 border-l-transparent hover:border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center space-x-6">
              <div className="relative w-24 h-24 rounded-lg overflow-hidden">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {product.popular && (
                  <Badge className={`absolute top-2 left-2 bg-gradient-to-r ${color} text-white border-none`}>
                    Popular
                  </Badge>
                )}
              </div>
              
              <div className="flex-1">
                <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h4>
                <div className="flex items-center space-x-2 mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating) 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">({product.rating})</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600">{product.price}</span>
                  <Button 
                    className={`bg-gradient-to-r ${color} hover:opacity-90 text-white`}
                    onClick={() => handleproductClick(product.id)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-0 bg-white">
        <div className="relative">
          <div className="aspect-square overflow-hidden">
            <ImageWithFallback
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          
          {product.popular && (
            <Badge className={`absolute top-3 left-3 bg-gradient-to-r ${color} text-white border-none shadow-lg`}>
              <Star className="w-3 h-3 mr-1" />
              Popular
            </Badge>
          )}
          
          <div className={`absolute inset-0 bg-gradient-to-t ${color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
        </div>
        
        <CardContent className="p-6">
          <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
            {product.name}
          </h4>
          
          <div className="flex items-center space-x-2 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating) 
                      ? 'text-yellow-400 fill-current' 
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">({product.rating})</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-blue-600">{product.price}</span>
            <Button 
              size="sm" 
              className={`bg-gradient-to-r ${color} hover:opacity-90 text-white`}
              onClick={() => handleproductClick(product.id)}
            >
              View Details
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}