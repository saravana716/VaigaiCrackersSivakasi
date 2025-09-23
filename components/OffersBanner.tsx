import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Zap, Sparkles, Clock, Gift, ShoppingBag } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import ban1 from "../assets/banner1.webp"
import ban4 from "../assets/banner4.webp"
import ban5 from "../assets/banner5.webp"
import ban6 from "../assets/banner6.webp"
import ban7 from "../assets/banner7.webp"
interface Offer {
  id: string;
  title: string;
  subtitle: string;
  discount: string;
  description: string;
  image: string;
  color: string;
  textColor: string;
  buttonText: string;
  validUntil: string;
  popular?: boolean;
  limitedTime?: boolean;
}

const offers: Offer[] = [
  {
    id: '1',
    title: 'Diwali Mega Sale',
    subtitle: 'Premium Sparklers Collection',
    discount: 'UP TO 40% OFF',
    description: 'Light up your Diwali with our premium sparklers collection. Get the best quality crackers at unbeatable prices.',
    image: ban4,
    color: 'from-logo-red via-logo-orange to-logo-red',
    textColor: 'text-logo-white',
    buttonText: 'Shop Sparklers',
    validUntil: 'Nov 15, 2024',
    popular: true,
    limitedTime: true
  },
  {
    id: '2',
    title: 'Festival Combo Pack',
    subtitle: 'Complete Celebration Bundle',
    discount: 'SAVE ₹500',
    description: 'Get everything you need for your celebration! Sparklers, fountains, rockets and more in one amazing bundle.',
    image: ban5,
    color: 'from-logo-blue via-logo-cyan to-logo-blue',
    textColor: 'text-logo-white',
    buttonText: 'View Bundle',
    validUntil: 'Dec 31, 2024',
    popular: true
  },
  {
    id: '3',
    title: 'New Year Special',
    subtitle: 'Premium Rockets & Roman Candles',
    discount: '25% OFF',
    description: 'Welcome the new year with spectacular fireworks. Premium quality rockets and roman candles at special prices.',
    image: ban6,
    color: 'from-logo-blue via-logo-cyan to-logo-blue',
    textColor: 'text-logo-white',
    buttonText: 'Explore Rockets',
    validUntil: 'Jan 10, 2025'
  },
  {
    id: '4',
    title: 'Wedding Collection',
    subtitle: 'Elegant Sparklers for Special Moments',
    discount: 'BUY 2 GET 1 FREE',
    description: 'Make your wedding magical with our premium wedding sparklers. Perfect for photos and celebrations.',
    image: ban7,
    color: 'from-logo-red via-logo-orange to-logo-yellow',
    textColor: 'text-logo-white',
    buttonText: 'Wedding Collection',
    validUntil: 'Ongoing'
  },
  {
    id: '5',
    title: 'Twin Elephant Premium',
    subtitle: 'Exclusive Quality Collection',
    discount: 'PREMIUM QUALITY',
    description: 'Experience the finest quality fireworks with our exclusive Twin Elephant premium collection.',
    image: ban1,
    color: 'from-logo-orange via-logo-red to-logo-orange',
    textColor: 'text-logo-white',
    buttonText: 'View Premium',
    validUntil: 'Always Available'
  }
];

export function OffersBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % offers.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % offers.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + offers.length) % offers.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative w-full overflow-hidden bg-logo-dark">
      {/* Main Swiper */}
      <div className="relative h-[500px] md:h-[600px] lg:h-[650px]">
        <AnimatePresence mode="wait">
          {offers.map((offer, index) => (
            index === currentSlide && (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0"
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <ImageWithFallback
                    src={offer.image}
                    alt={offer.title}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-r ${offer.color} opacity-85`}></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-logo-dark/80 via-transparent to-logo-dark/40"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
                  <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
                    {/* Text Content */}
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      className={`${offer.textColor} text-center lg:text-left`}
                    >
                      {/* Badges */}
                      <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-6">
                        {offer.popular && (
                          <Badge className="bg-logo-yellow text-logo-dark px-4 py-2 text-sm font-bold">
                            <Star className="w-4 h-4 mr-1" />
                            Most Popular
                          </Badge>
                        )}
                        {offer.limitedTime && (
                          <Badge className="bg-logo-red text-logo-white px-4 py-2 text-sm font-bold">
                            <Clock className="w-4 h-4 mr-1" />
                            Limited Time
                          </Badge>
                        )}
                      </div>

                      {/* Discount */}
                      <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-logo-yellow"
                      >
                        {offer.discount}
                      </motion.div>

                      {/* Title */}
                      <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-3 text-logo-white">
                        {offer.title}
                      </h2>

                      {/* Subtitle */}
                      <h3 className="text-xl md:text-2xl lg:text-3xl font-medium mb-6 text-logo-light-gray">
                        {offer.subtitle}
                      </h3>

                      {/* Description */}
                      <p className="text-lg md:text-xl mb-8 text-logo-light-gray max-w-2xl mx-auto lg:mx-0">
                        {offer.description}
                      </p>

                      {/* Call to Action */}
                      <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <Button 
                          size="lg" 
                          className="bg-logo-white text-logo-dark hover:bg-logo-light-gray font-bold px-8 py-4 text-lg shadow-xl transition-all duration-300"
                        >
                          <ShoppingBag className="mr-2 h-5 w-5" />
                          {offer.buttonText}
                        </Button>
                        <Button 
                          size="lg" 
                          variant="outline" 
                          className="border-logo-white text-logo-white hover:bg-logo-white hover:text-logo-dark px-8 py-4 text-lg transition-all duration-300"
                        >
                          <Gift className="mr-2 h-5 w-5" />
                          View Details
                        </Button>
                      </div>

                      {/* Valid Until */}
                      <div className="mt-6 flex items-center justify-center lg:justify-start gap-2 text-sm text-logo-light-gray">
                        <Clock className="w-4 h-4" />
                        <span>Valid until: {offer.validUntil}</span>
                      </div>
                    </motion.div>

                    {/* Decorative Elements */}
                   
                  </div>
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>

        {/* Navigation Arrows */}
        <Button
          onClick={prevSlide}
          variant="ghost"
          size="lg"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-logo-dark/50 hover:bg-logo-dark/70 text-logo-white rounded-full p-3 border border-logo-red/30"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <Button
          onClick={nextSlide}
          variant="ghost"
          size="lg"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-logo-dark/50 hover:bg-logo-dark/70 text-logo-white rounded-full p-3 border border-logo-red/30"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-3">
          {offers.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-logo-orange scale-125 shadow-lg' 
                  : 'bg-logo-white/50 hover:bg-logo-white/75'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      {/* <div className="absolute bottom-0 left-0 w-full h-10 bg-logo-dark/50">
        <motion.div
          className="h-full bg-logo-gradient-primary"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 5, ease: "linear" }}
          key={currentSlide}
        />
      </div> */}
    </section>
  );
}