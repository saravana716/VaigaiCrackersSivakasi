import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Zap, Star } from "lucide-react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import vaigai from "../assets/1000035181.png";

// Custom hook for animated counter
const useAnimatedCounter = (targetValue, duration = 2000, delay = 0) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
console.log(hasStarted);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasStarted(true);
      
      const startTime = Date.now();
      const startValue = 0;
      
      const updateCounter = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(startValue + (targetValue - startValue) * easeOutQuart);
        
        setCount(currentValue);
        
        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          setCount(targetValue);
        }
      };
      
      updateCounter();
    }, delay);

    return () => clearTimeout(timer);
  }, [targetValue, duration, delay]);

  return count;
};

export function Hero() {
  const [sparkles, setSparkles] = useState([]);

  // Animated counters with staggered delays
  const sparklerCount = useAnimatedCounter(50, 2000, 1000); // 50+ sparklers
  const customerCount = useAnimatedCounter(10, 2000, 1200); // 10k+ customers  
  const yearCount = useAnimatedCounter(12, 2000, 1400); // 12+ years

  useEffect(() => {
    // Generate random sparkle positions
    const newSparkles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
    }));
    setSparkles(newSparkles);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen bg-logo-dark overflow-hidden"
    >
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
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            delay: sparkle.delay,
            repeat: Infinity,
            repeatDelay: 1,
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
              <span className="text-logo-blue text-lg font-medium">
                Welcome to Vaigai Sparklers – Where Every Spark Tells a Story.
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-logo-red via-logo-orange to-logo-yellow bg-clip-text text-red"
            >
              Vaigai Sparklers
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
              Founded in the heart of Sivakasi, Tamil Nadu – the fireworks
              capital of India – Vaigai Sparklers is a proud manufacturer of
              high-quality sparklers that light up celebrations across India.
              Since our humble Beginnings in 2013, we have grown into a trusted
              name in the fireworks industry, proudly serving over 10000+
              customers in the past 12 years. With a legacy rooted in tradition
              and a vision focused on safety and innovation, we bring joy,
              brightness, and brilliance to every festival, function, and moment
              worth celebrating.
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
                onClick={() => (window.location.hash = "products")}
              >
                Explore Products
                <Sparkles className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-logo-blue text-logo-blue hover:bg-logo-blue hover:text-logo-white px-8 py-3 text-lg transition-all duration-300"
                onClick={() => (window.location.hash = "gallery")}
              >
                View Gallery
              </Button>
            </motion.div>

            {/* Animated Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-wrap gap-8 mt-12"
            >
              <motion.div 
                className="text-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
              >
                <motion.div 
                  className="text-3xl font-bold text-logo-red"
                  animate={{ 
                    scale: sparklerCount > 0 ? [1, 1.1, 1] : 1 
                  }}
                  transition={{ 
                    duration: 0.3,
                    delay: sparklerCount === 50 ? 0 : 0
                  }}
                >
                  {sparklerCount}+
                </motion.div>
                <div className="text-logo-light-gray">Sparklers Varieties</div>
              </motion.div>
              
              <motion.div 
                className="text-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.4 }}
              >
                <motion.div 
                  className="text-3xl font-bold text-logo-orange"
                  animate={{ 
                    scale: customerCount > 0 ? [1, 1.1, 1] : 1 
                  }}
                  transition={{ 
                    duration: 0.3,
                    delay: customerCount === 10 ? 0 : 0
                  }}
                >
                  {customerCount}k+
                </motion.div>
                <div className="text-logo-light-gray">Happy Customers</div>
              </motion.div>
              
              <motion.div 
                className="text-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.6 }}
              >
                <motion.div 
                  className="text-3xl font-bold text-logo-blue"
                  animate={{ 
                    scale: yearCount > 0 ? [1, 1.1, 1] : 1 
                  }}
                  transition={{ 
                    duration: 0.3,
                    delay: yearCount === 12 ? 0 : 0
                  }}
                >
                  {yearCount}+
                </motion.div>
                <div className="text-logo-light-gray">Years in Fireworks</div>
              </motion.div>
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
                src={vaigai}
                alt="Colorful Fireworks Crackers and Sparklers"
                className="rounded-2xl shadow-2xl w-full border border-logo-red/20 bg-white"
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