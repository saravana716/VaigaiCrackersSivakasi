import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Star } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function  Hero() {
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    // Generate random sparkle positions
    const newSparkles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2
    }));
    setSparkles(newSparkles);
  }, []);

  return (
    <section id="home" className="relative min-h-screen bg-logo-dark overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-logo-dark via-logo-dark/95 to-logo-gray/20"></div>
      
      {/* Animated background sparkles */}
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute z-10"
          style={{ left: `${sparkle.x}%`, top: `${sparkle.y}%` }}
          animate={{
            scale: [0, 1, 0],
            rotate: [0, 180, 360],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 3,
            delay: sparkle.delay,
            repeat: Infinity,
            repeatDelay: 1
          }}
        >
          <Star className="h-4 w-4 text-logo-yellow" />
        </motion.div>
      ))}

      <div className="container mx-auto px-4 py-20 relative z-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-logo-white"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center space-x-2 mb-6"
            >
              <Sparkles className="h-8 w-8 text-logo-blue" />
              <span className="text-logo-blue text-lg font-medium">Premium Quality Fireworks</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-logo-red via-logo-orange to-logo-yellow bg-clip-text text-red"
            >
              Light Up Your
              <br />
              <span className="relative">
                Celebration
                <motion.div
                  className="absolute -top-2 -right-8"
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Zap className="h-12 w-12 text-logo-blue" />
                </motion.div>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl text-logo-light-gray mb-8 max-w-2xl leading-relaxed"
            >
              Create magical moments with our premium collection of fireworks, crackers, and sparklers. 
              From intimate gatherings to grand celebrations, we have everything to make your event spectacular.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button 
                size="lg" 
                className="bg-logo-gradient-primary hover:opacity-90 text-logo-white font-semibold px-8 py-3 text-lg shadow-xl transition-all duration-300"
                onClick={() => window.location.hash = 'products'}
              >
                Explore Products
                <Sparkles className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-logo-blue text-logo-blue hover:bg-logo-blue hover:text-logo-white px-8 py-3 text-lg transition-all duration-300"
                onClick={() => window.location.hash = 'gallery'}
              >
                View Gallery
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-wrap gap-8 mt-12"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-logo-red">500+</div>
                <div className="text-logo-light-gray">Cracker Varieties</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-logo-orange">50k+</div>
                <div className="text-logo-light-gray">Festival Celebrations</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-logo-blue">50+</div>
                <div className="text-logo-light-gray">Years in Fireworks</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80"
                alt="Colorful Fireworks Crackers and Sparklers"
                className="rounded-2xl shadow-2xl w-full border border-logo-red/20"
              />
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-logo-red/20 to-logo-blue/10 rounded-2xl"></div>
            </div>

            {/* Floating elements */}
            <motion.div
              className="absolute -top-4 -right-4 bg-logo-gradient-secondary text-logo-white p-3 rounded-full shadow-lg"
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles className="h-6 w-6" />
            </motion.div>

            <motion.div
              className="absolute -bottom-4 -left-4 bg-logo-gradient-primary text-logo-white p-3 rounded-full shadow-lg"
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            >
              <Zap className="h-6 w-6" />
            </motion.div>

            <motion.div
              className="absolute top-1/2 -left-8 bg-logo-yellow text-logo-dark p-2 rounded-full shadow-lg"
              animate={{ x: [-5, 5, -5] }}
              transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
            >
              <Star className="h-4 w-4" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-logo-dark to-transparent z-10"></div>
    </section>
  );
}