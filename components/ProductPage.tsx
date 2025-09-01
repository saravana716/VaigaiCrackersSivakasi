import { useState, useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Star,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Rocket,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { db } from "../firebase"; // make sure firebase.ts is configured
import { doc, getDoc } from "firebase/firestore";

// ---- Helpers ----
const COLOR_CLASSES = [
  "bg-yellow-400",
  "bg-orange-400",
  "bg-red-400",
  "bg-blue-400",
  "bg-purple-400",
];

// Floating particles animation
const FloatingParticle = ({
  delay = 0,
  size = 4,
  color = "bg-yellow-400",
}: {
  delay?: number;
  size?: 4 | 8;
  color?: string;
}) => {
  // lock initial left position so it doesn't jump on re-renders
  const initialLeft = useMemo(() => `${Math.random() * 100}%`, []);
  return (
    <motion.div
      className={`absolute ${color} rounded-full ${
        size === 4 ? "w-1 h-1" : "w-2 h-2"
      } opacity-60`}
      animate={{
        y: [-20, -100],
        x: [0, Math.random() * 40 - 20],
        opacity: [0.6, 0],
      }}
      transition={{
        duration: 3,
        delay,
        repeat: Infinity,
        ease: "easeOut",
      }}
      style={{
        left: initialLeft,
        bottom: 0,
      }}
    />
  );
};

export function ProductPage() {
  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const [selectedImage, setSelectedImage] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  // View controls (video)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [currentFeature, setCurrentFeature] = useState(0);

  // Get productId from sessionStorage (guard SSR)
  const [productId, setProductId] = useState<string | null>(null);
  useEffect(() => {
    try {
      const id = sessionStorage.getItem("productId");
      setProductId(id);
    } catch (e) {
      console.error("Unable to read sessionStorage:", e);
    }
  }, []);

  // Fetch product from Firestore
  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        console.error("No productId found in sessionStorage");
        setLoading(false);
        return;
      }
      try {
        const docRef = doc(db, "products", productId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.error("Product not found!");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  // Auto-rotate features if available
  useEffect(() => {
    if (product?.features?.length) {
      const interval = setInterval(() => {
        setCurrentFeature((prev) => (prev + 1) % product.features.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [product?.features]);

  // ---- VIDEO CONTROL SYNC ----
  // Sync play/pause with state & element
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const run = async () => {
      try {
        if (isVideoPlaying) {
          // play() must be user-gesture initiated on some browsers; we catch & ignore.
          await el.play();
        } else {
          el.pause();
        }
      } catch (e) {
        console.debug("Video play/pause blocked by browser:", e);
      }
    };
    run();
  }, [isVideoPlaying, showVideo]);

  // Sync mute
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [isVideoMuted]);

  // Reset video state when toggling off or product changes
  useEffect(() => {
    if (!showVideo) {
      setIsVideoPlaying(false);
      setIsVideoMuted(true);
    }
  }, [showVideo, product?.videoUrl]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Product not found.
      </div>
    );
  }

  const hasImages = Array.isArray(product.images) && product.images.length > 0;
  const hasVideo =
    typeof product.videoUrl === "string" && product.videoUrl.trim().length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <FloatingParticle
            key={i}
            delay={i * 0.5}
            size={Math.random() > 0.5 ? 4 : 8}
            color={
              COLOR_CLASSES[Math.floor(Math.random() * COLOR_CLASSES.length)]
            }
          />
        ))}
      </div>

      {/* Header */}
      <div className="relative bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 p-6 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
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
        </motion.div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Product Media */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-none shadow-2xl overflow-hidden">
              <CardContent className="p-0 relative">
                {showVideo && hasVideo ? (
                  <div className="relative aspect-square">
                    <video
                      ref={videoRef}
                      className="w-full h-full object-cover"
                      src={product.videoUrl}
                      playsInline
                      // autoplay/muted controlled by state & effects
                    />
                    <div className="absolute bottom-4 left-4 flex space-x-3">
                      <button
                        onClick={() => setIsVideoPlaying((p) => !p)}
                        className="bg-white/20 rounded-full p-3 text-white"
                        aria-label={
                          isVideoPlaying ? "Pause video" : "Play video"
                        }
                      >
                        {isVideoPlaying ? <Pause /> : <Play />}
                      </button>
                      <button
                        onClick={() => setIsVideoMuted((p) => !p)}
                        className="bg-white/20 rounded-full p-3 text-white"
                        aria-label={
                          isVideoMuted ? "Unmute video" : "Mute video"
                        }
                      >
                        {isVideoMuted ? <VolumeX /> : <Volume2 />}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="relative aspect-square">
                    {hasImages ? (
                      <ImageWithFallback
                        src={product.images[selectedImage]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No images available
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Toggle buttons */}
            {hasVideo && (
              <div className="flex justify-center mt-6 space-x-4">
                <button
                  onClick={() => setShowVideo(false)}
                  className={`px-6 py-3 rounded-full ${
                    !showVideo
                      ? "bg-blue-500 text-white"
                      : "bg-white/20 text-gray-300"
                  }`}
                >
                  Photos
                </button>
                <button
                  onClick={() => setShowVideo(true)}
                  className={`px-6 py-3 rounded-full ${
                    showVideo
                      ? "bg-red-500 text-white"
                      : "bg-white/20 text-gray-300"
                  }`}
                >
                  Video
                </button>
              </div>
            )}

            {/* Thumbnails */}
            {!showVideo && hasImages && (
              <div className="flex space-x-4 justify-center flex-wrap gap-3">
                {product.images.map((img: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border transition-colors ${
                      selectedImage === index
                        ? "border-blue-500"
                        : "border-gray-500 hover:border-gray-400"
                    }`}
                    aria-label={`Show image ${index + 1}`}
                  >
                    <ImageWithFallback
                      src={img}
                      alt={`${product.name} ${index + 1}`}
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="space-y-8"
          >
            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2">
              <Rocket className="w-4 h-4 mr-2" />
              {product.category || "Uncategorized"}
            </Badge>

            <h1 className="text-4xl font-bold text-white">{product.name}</h1>

            {!!product.rating && (
              <div className="flex items-center space-x-2">
                {renderStars(Number(product.rating))}
                <span className="text-white">
                  {Number(product.rating).toFixed(1)}
                </span>
              </div>
            )}

            <div className="flex items-center space-x-4">
              {product.offerPrice != null && (
                <span className="text-3xl font-bold text-green-400">
                  ₹{product.offerPrice}
                </span>
              )}
              {product.originalPrice != null && (
                <span
                  className={`text-xl text-gray-500 ${
                    product.offerPrice != null ? "line-through" : ""
                  }`}
                >
                  ₹{product.originalPrice}
                </span>
              )}
            </div>

            {product.description && (
              <p className="text-gray-300">{product.description}</p>
            )}

            {/* Optional: rotating feature highlight (if provided) */}
            {Array.isArray(product.features) && product.features.length > 0 && (
              <div className="rounded-xl border border-white/10 p-4 text-gray-200 bg-white/5">
                <div className="text-sm uppercase tracking-widest text-gray-400 mb-1">
                  Highlight
                </div>
                <div className="text-lg">
                  {product.features[currentFeature]}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
