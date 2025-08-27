import { motion } from 'framer-motion';
import { Sparkles, Zap, Star, Flame, Rocket, Crown } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

const categories = [
  {
    id: 1,
    name: 'Sparklers',
    description: 'Beautiful handheld sparklers perfect for weddings and celebrations',
    icon: Sparkles,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80',
    color: 'from-blue-400 to-blue-500'
  },
  {
    id: 2,
    name: 'Fountains',
    description: 'Ground-based fountains that create stunning vertical displays',
    icon: Flame,
    image: 'https://images.unsplash.com/photo-1514820720066-ed8784479467?auto=format&fit=crop&w=400&q=80',
    color: 'from-red-400 to-orange-500'
  },
  {
    id: 3,
    name: 'Rockets',
    description: 'High-flying rockets that burst into colorful patterns in the sky',
    icon: Rocket,
    image: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=400&q=80',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 4,
    name: 'Roman Candles',
    description: 'Classic roman candles shooting colorful stars into the night',
    icon: Star,
    image: 'https://images.unsplash.com/photo-1567336272704-7ba7147b98b9?auto=format&fit=crop&w=400&q=80',
    color: 'from-blue-400 to-teal-500'
  },
  {
    id: 5,
    name: 'Crackers',
    description: 'Traditional crackers and firecrackers for festive celebrations',
    icon: Zap,
    image: 'https://images.unsplash.com/photo-1481819613568-3701cbc70156?auto=format&fit=crop&w=400&q=80',
    color: 'from-red-500 to-orange-400'
  },
  {
    id: 6,
    name: 'Premium Sets',
    description: 'Curated premium collections for special occasions',
    icon: Crown,
    image: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?auto=format&fit=crop&w=400&q=80',
    color: 'from-purple-500 to-indigo-600'
  }
];

interface ProductCategoriesProps {
  onCategoryClick?: (categoryId: string) => void;
}

export function ProductCategories({ onCategoryClick }: ProductCategoriesProps) {
  return (
    <section id="categories" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400 bg-clip-text text-transparent">
            Our Categories
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Discover our extensive range of premium fireworks, carefully selected to create unforgettable moments
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="group cursor-pointer"
                onClick={() => {
                  const categoryMap: Record<string, string> = {
                    'Sparklers': 'sparklers',
                    'Fountains': 'fountains',
                    'Rockets': 'rockets',
                    'Roman Candles': 'roman-candles',
                    'Crackers': 'crackers',
                    'Premium Sets': 'premium-sets'
                  };
                  const categoryId = categoryMap[category.name];
                  if (categoryId && onCategoryClick) {
                    onCategoryClick(categoryId);
                  }
                }}
              >
                <Card className="bg-gradient-to-br from-gray-900 to-black border-gray-800 overflow-hidden hover:border-gray-600 transition-colors">
                  <div className="relative h-48 overflow-hidden">
                    <ImageWithFallback
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-30 group-hover:opacity-40 transition-opacity`}></div>
                    <div className="absolute top-4 right-4">
                      <div className={`p-3 rounded-full bg-gradient-to-r ${category.color}`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {category.description}
                    </p>
                    <motion.div
                      className="mt-4 text-yellow-400 font-medium"
                      whileHover={{ x: 5 }}
                    >
                      Explore Collection →
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold px-8 py-4 rounded-lg text-lg"
          >
            View All Categories
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}