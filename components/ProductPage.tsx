import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Star, 
  Share2, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX,
  Zap,
  Shield,
  Award,
  Calendar,
  Info,
  Heart,
  Sparkles,
  Rocket,
  Crown,
  Eye,
  Download,
  MessageCircle,
  ThumbsUp
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

// Sample product data
const product = {
  id: 1,
  name: "Twin Elephant Sky Rockets",
  category: "Rockets",
  size: "10 pieces",
  originalPrice: 299,
  offerPrice: 199,
  discount: 33,
  rating: 4.5,
  reviews: 128,
  inStock: true,
  description: "Premium quality sky rockets that create spectacular displays with vibrant colors and thunderous sounds. Perfect for celebrations and festivals.",
  features: [
    "High-quality gunpowder composition",
    "Colorful aerial displays",
    "Safe and reliable ignition",
    "Eco-friendly materials",
    "Long-lasting effects"
  ],
  specifications: {
    "Weight": "500g",
    "Duration": "30-45 seconds",
    "Height": "Up to 100 meters",
    "Colors": "Multi-color",
    "Safety Grade": "Category F3"
  },
  images: [
    "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?auto=format&fit=crop&w=800&q=80"
  ],
  videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
};

// Floating particles animation
const FloatingParticle = ({ delay = 0, size = 4, color = "bg-yellow-400" }) => (
  <motion.div
    className={`absolute ${color} rounded-full ${size === 4 ? 'w-1 h-1' : 'w-2 h-2'} opacity-60`}
    animate={{
      y: [-20, -100],
      x: [0, Math.random() * 40 - 20],
      opacity: [0.6, 0]
    }}
    transition={{
      duration: 3,
      delay,
      repeat: Infinity,
      ease: "easeOut"
    }}
    style={{
      left: `${Math.random() * 100}%`,
      bottom: 0
    }}
  />
);

export function ProductPage({}) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % product.features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <FloatingParticle 
            key={i} 
            delay={i * 0.5} 
            size={Math.random() > 0.5 ? 4 : 8}
            color={`bg-${['yellow', 'orange', 'red', 'blue', 'purple'][Math.floor(Math.random() * 5)]}-400`}
          />
        ))}
      </div>

      {/* Header */}
      <div className="relative bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 p-6 overflow-hidden">
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
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Button>
          
          <div className="flex items-center space-x-3 text-white/90">
            <motion.span whileHover={{ scale: 1.05 }} className="hover:text-white transition-colors cursor-pointer">Home</motion.span>
            <span className="text-white/60">/</span>
            <motion.span whileHover={{ scale: 1.05 }} className="hover:text-white transition-colors cursor-pointer">Products</motion.span>
            <span className="text-white/60">/</span>
            <span className="text-white font-medium">{product.category}</span>
          </div>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Product Images & Video */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-none shadow-2xl overflow-hidden">
                <CardContent className="p-0 relative">
                  {showVideo ? (
                    <div className="relative aspect-square">
                      <video
                        className="w-full h-full object-cover"
                        src={product.videoUrl}
                        autoPlay={isVideoPlaying}
                        muted={isVideoMuted}
                        loop
                        controls={false}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                      <div className="absolute bottom-4 left-4 flex space-x-3">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.8 }}
                          onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                          className="bg-white/20 backdrop-blur-md rounded-full p-3 text-white hover:bg-white/30 transition-colors"
                        >
                          {isVideoPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setIsVideoMuted(!isVideoMuted)}
                          className="bg-white/20 backdrop-blur-md rounded-full p-3 text-white hover:bg-white/30 transition-colors"
                        >
                          {isVideoMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                        </motion.button>
                      </div>
                    </div>
                  ) : (
                    <div className="relative aspect-square">
                      <ImageWithFallback
                        src={product.images[selectedImage]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 via-transparent to-orange-500/10"></div>
                      
                      {/* Floating action buttons */}
                      <div className="absolute top-4 right-4 flex flex-col space-y-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setIsLiked(!isLiked)}
                          className={`p-3 rounded-full backdrop-blur-md transition-all ${
                            isLiked 
                              ? 'bg-red-500/80 text-white' 
                              : 'bg-white/20 text-white hover:bg-white/30'
                          }`}
                        >
                          <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-3 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-colors"
                        >
                          <Eye className="h-5 w-5" />
                        </motion.button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Image/Video Toggle */}
              <div className="flex justify-center mt-6 space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowVideo(false)}
                  className={`px-6 py-3 rounded-full font-medium transition-all ${
                    !showVideo 
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg' 
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  Photos
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowVideo(true)}
                  className={`px-6 py-3 rounded-full font-medium transition-all flex items-center ${
                    showVideo 
                      ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg' 
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Video
                </motion.button>
              </div>
            </motion.div>

            {/* Image Thumbnails */}
            {!showVideo && (
              <div className="flex space-x-4 justify-center">
                {product.images.map((image, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-3 transition-all ${
                      selectedImage === index 
                        ? 'border-gradient-to-r from-blue-400 to-purple-500 shadow-lg shadow-purple-500/25' 
                        : 'border-gray-600 hover:border-gray-400'
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <ImageWithFallback
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {selectedImage === index && (
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-500/30 to-transparent"></div>
                    )}
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Product Header */}
            <div className="space-y-4">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 text-sm border-none">
                  <Rocket className="w-4 h-4 mr-2" />
                  {product.category}
                </Badge>
              </motion.div>

              <motion.h1 
                className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-yellow-200 to-orange-300 bg-clip-text text-transparent leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {product.name}
              </motion.h1>
              
              {/* Rating */}
              <motion.div 
                className="flex items-center space-x-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <div className="flex items-center space-x-1">
                  {renderStars(product.rating)}
                </div>
                <span className="text-white font-medium text-lg">{product.rating}</span>
                <span className="text-gray-400">({product.reviews} reviews)</span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="text-blue-400 hover:text-blue-300 transition-colors flex items-center"
                >
                  <MessageCircle className="w-4 h-4 mr-1" />
                  Read Reviews
                </motion.button>
              </motion.div>

              {/* Price */}
              <motion.div 
                className="flex items-center space-x-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <span className="text-5xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                  ₹{product.offerPrice}
                </span>
                <span className="text-2xl text-gray-500 line-through">
                  ₹{product.originalPrice}
                </span>
                <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 text-lg font-bold animate-pulse">
                  {product.discount}% OFF
                </Badge>
              </motion.div>

              {/* Size & Availability */}
              <motion.div 
                className="flex items-center justify-between"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-gray-400">Size:</span>
                  <Badge variant="outline" className="border-blue-400 text-blue-400 px-3 py-1">
                    {product.size}
                  </Badge>
                </div>
                <div className="flex items-center space-x-3">
                  <motion.div 
                    className={`w-4 h-4 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className={`font-medium ${product.inStock ? 'text-green-400' : 'text-red-400'}`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Action Buttons */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-3 flex-1"
                >
                  <Info className="h-5 w-5" />
                  <span>Get More Information</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-3"
                >
                  <Share2 className="h-5 w-5" />
                  <span>Share</span>
                </motion.button>
              </div>

              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-xl font-medium hover:bg-white/20 transition-all flex items-center space-x-2 flex-1"
                >
                  <Download className="h-4 w-4" />
                  <span>Download Catalog</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-xl font-medium hover:bg-white/20 transition-all flex items-center space-x-2 flex-1"
                >
                  <ThumbsUp className="h-4 w-4" />
                  <span>Recommend</span>
                </motion.button>
              </div>
            </motion.div>

            {/* Animated Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <Card className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 border-purple-500/30 backdrop-blur-md shadow-2xl">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                    <Sparkles className="h-6 w-6 mr-3 text-yellow-400" />
                    Key Features
                  </h3>
                  <div className="space-y-4">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentFeature}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center space-x-4 p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl border border-yellow-500/30"
                      >
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        >
                          <Zap className="h-6 w-6 text-yellow-400" />
                        </motion.div>
                        <span className="text-white text-lg font-medium">{product.features[currentFeature]}</span>
                      </motion.div>
                    </AnimatePresence>
                    
                    <div className="grid grid-cols-5 gap-2">
                      {product.features.map((_, index) => (
                        <motion.div
                          key={index}
                          className={`h-2 rounded-full ${
                            index === currentFeature ? 'bg-yellow-400' : 'bg-gray-600'
                          }`}
                          animate={{ scale: index === currentFeature ? 1.2 : 1 }}
                        />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Company Excellence */}
            <motion.div 
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              {[
                { icon: Shield, text: "Safety Certified", color: "from-blue-500 to-cyan-500" },
                { icon: Award, text: "Award Winning", color: "from-green-500 to-emerald-500" },
                { icon: Calendar, text: "50+ Years Experience", color: "from-orange-500 to-red-500" },
                { icon: Crown, text: "Premium Quality", color: "from-purple-500 to-pink-500" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-600/30 backdrop-blur-md hover:shadow-lg transition-all">
                    <CardContent className="p-6 text-center">
                      <motion.div
                        className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center mx-auto mb-3`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.8 }}
                      >
                        <item.icon className="h-6 w-6 text-white" />
                      </motion.div>
                      <p className="text-gray-300 font-medium">{item.text}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Description & Specifications */}
        <motion.div 
          className="mt-20 grid lg:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <Card className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border-indigo-500/30 backdrop-blur-md shadow-2xl">
            <CardContent className="p-8">
              <h3 className="text-3xl font-bold text-white mb-6 flex items-center">
                <Info className="h-7 w-7 mr-3 text-blue-400" />
                Product Description
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                {product.description}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-900/50 to-teal-900/50 border-emerald-500/30 backdrop-blur-md shadow-2xl">
            <CardContent className="p-8">
              <h3 className="text-3xl font-bold text-white mb-6 flex items-center">
                <Award className="h-7 w-7 mr-3 text-green-400" />
                Specifications
              </h3>
              <div className="space-y-4">
                {Object.entries(product.specifications).map(([key, value], index) => (
                  <motion.div 
                    key={key} 
                    className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/10"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1.3 + index * 0.1 }}
                  >
                    <span className="text-gray-400 font-medium">{key}:</span>
                    <span className="text-white font-bold">{value}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Company Information */}
        <motion.div 
          className="mt-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <Card className="bg-gradient-to-r from-orange-900/50 via-red-900/50 to-pink-900/50 border-orange-500/30 backdrop-blur-md shadow-2xl overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-red-500/10 to-pink-500/10"></div>
            <CardContent className="p-12 relative z-10">
              <div className="text-center">
                <motion.h3 
                  className="text-4xl font-bold text-white mb-6"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8, delay: 1.6 }}
                >
                  About Twin Elephant Brand
                </motion.h3>
                <p className="text-gray-300 text-xl leading-relaxed max-w-4xl mx-auto mb-12">
                  Twin Elephant Brand has been a trusted name in the fireworks industry for over five decades. 
                  Founded in 1970, we have been dedicated to creating spectacular fireworks that bring joy and 
                  celebration to communities across the nation. Our commitment to quality, safety, and innovation 
                  has made us one of the leading fireworks manufacturers in the country.
                </p>
                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    { number: "50+", label: "Years of Excellence", color: "from-red-400 to-orange-400" },
                    { number: "1000+", label: "Product Varieties", color: "from-blue-400 to-purple-400" },
                    { number: "100%", label: "Safety Certified", color: "from-green-400 to-emerald-400" }
                  ].map((stat, index) => (
                    <motion.div 
                      key={index}
                      className="text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 1.7 + index * 0.2 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <div className={`text-6xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                        {stat.number}
                      </div>
                      <div className="text-gray-400 text-lg font-medium">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}