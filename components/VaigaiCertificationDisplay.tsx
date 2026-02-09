import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from './ui/dialog';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Award, Shield,CheckCircle, Leaf, Building,Users } from 'lucide-react';
import { motion } from 'framer-motion';
import d1 from "../assets/Scan 148_page-0001.jpg"
import d2 from "../assets/Scan 148_page-0002.jpg"
import d3 from "../assets/ppp_page-0001.jpg"
import d4 from "../assets/Scan 148_page-0004.jpg"
import d5 from "../assets/Scan 148_page-0005.jpg"
import d6 from "../assets/p_page-0001.jpg"
import d7 from "../assets/pp_page-0001.jpg"

const certificationData = [
  {
    id: 1,
    title: "ISO 9001:2015 Quality Management System",
    description: "International standard certification for quality management systems ensuring consistent production quality, customer satisfaction, and continuous improvement in manufacturing processes for fireworks and pyrotechnic articles.",
    image: d1,
    icon: Award,
    color: "from-blue-400 to-blue-600",
    category: "Quality"
  },
  {
    id: 2,
    title: "CSIR-NEERI Green Firecrackers Registration",
    description: "Registration certificate from National Environmental Engineering Research Institute for manufacturing eco-friendly green firecrackers with reduced emission formulations as per Supreme Court guidelines.",
    image: d6,
    icon: Leaf,
    color: "from-green-400 to-emerald-600",
    category: "Environment"
  },
  {
    id: 3,
    title: "Twin Elephants Trademark Registration",
    description: "Official trademark registration certificate for 'Device of Twin Elephants' brand under The Trade Marks Act, 1999, protecting our unique brand identity and intellectual property rights.",
    image: d3,
    icon: Shield,
    color: "from-purple-400 to-indigo-600",
    category: "Legal"
  },
  {
    id: 4,
    title: "ISO 45001:2018 Occupational Health & Safety",
    description: "International certification for Occupational Health and Safety Management System ensuring worker safety, risk management, and safe working conditions in fireworks manufacturing operations.",
    image: d5,
    icon: Shield,
    color: "from-orange-400 to-red-500",
    category: "Safety"
  },
  {
    id: 5,
    title: "ISO 14001:2015 Environmental Management",
    description: "Environmental Management System certification demonstrating commitment to environmental protection, waste management, and sustainable manufacturing practices in pyrotechnic production.",
    image: d4,
    icon: Leaf,
    color: "from-teal-400 to-green-600",
    category: "Environment"
  },
  {
    id: 6,
    title: "PESO Improved Formulation Certificate",
    description: "Petroleum and Explosives Safety Organisation certificate for improved formulation of sparklers and other pyrotechnic articles meeting enhanced safety and performance standards.",
    image: d2,
    icon: CheckCircle,
    color: "from-cyan-400 to-blue-500",
    category: "Safety"
  },
  {
    id: 7,
    title: "SSMA Membership Certificate",
    description: "Sivakasi Sparklers Manufacturers Association membership certificate recognizing our standing as a certified manufacturer in the fireworks industry with adherence to industry standards.",
    image: d7,
    icon: Users,
    color: "from-yellow-400 to-orange-500",
    category: "Standards"
  },
  {
    id: 8,
    title: "Factory Manufacturing License",
    description: "Government-issued manufacturing license for legal production, storage, and distribution of fireworks and explosive materials with full compliance to statutory requirements and safety regulations.",
    image: d1, // You can update this with the correct factory license image
    icon: Building,
    color: "from-red-400 to-pink-500",
    category: "Legal"
  }
];

// Animated sparkle particles for firecracker effect
// const SparkleParticle = ({ delay = 0 }: { delay?: number }) => (
//   <motion.div
//     className="absolute w-1.5 h-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
//     initial={{ opacity: 0, scale: 0 }}
//     animate={{
//       opacity: [0, 1, 1, 0],
//       scale: [0, 1.5, 1, 0],
//       y: [0, -30, -60, -90],
//       x: [0, Math.random() * 60 - 30, Math.random() * 120 - 60]
//     }}
//     transition={{
//       duration: 4,
//       delay,
//       repeat: Infinity,
//       repeatDelay: Math.random() * 3 + 2
//     }}
//   />
// );

// Enhanced firecracker animation with more sparkles
// Enhanced firecracker animation with more sparkles
// const FirecrackerAnimation = ({ 
//   className, 
//   style 
// }: { 
//   className?: string; 
//   style?: React.CSSProperties; 
// }) => (
//   <div className={`relative ${className}`} style={style}>
//     {[...Array(20)].map((_, i) => (
//       <SparkleParticle key={i} delay={i * 0.15} />
//     ))}
//     <motion.div
//       className="w-4 h-4 bg-gradient-to-r from-red-500 via-orange-400 to-yellow-500 rounded-full shadow-lg"
//       animate={{
//         scale: [1, 1.3, 1],
//         opacity: [0.7, 1, 0.7],
//         boxShadow: [
//           '0 0 10px rgba(255, 165, 0, 0.5)',
//           '0 0 20px rgba(255, 165, 0, 0.8)',
//           '0 0 10px rgba(255, 165, 0, 0.5)'
//         ]
//       }}
//       transition={{
//         duration: 2.5,
//         repeat: Infinity
//       }}
//     />
//   </div>
// );

interface CertificationCardProps {
  certification: typeof certificationData[0];
}

// Motion wrapper component with proper ref forwarding
const MotionCard = React.forwardRef<
  HTMLDivElement, 
  React.ComponentProps<typeof motion.div> & { onClick?: () => void }
>(({ onClick, ...props }, ref) => (
  <motion.div ref={ref} onClick={onClick} {...props} />
));
MotionCard.displayName = "MotionCard";

const CertificationCard: React.FC<CertificationCardProps> = ({ certification }) => {
  const IconComponent = certification.icon;
  const [open, setOpen] = useState(false);
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <MotionCard
        className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-700 via-slate-600 to-slate-700 border-2 border-slate-600 shadow-lg hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 cursor-pointer"
        whileHover={{ 
          scale: 1.03,
          y: -10
        }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setOpen(true)}
      >
          {/* Animated gradient border on hover */}
          <div className="absolute inset-0 rounded-2xl p-0.5 bg-gradient-to-r from-blue-400 via-purple-500 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-full h-full bg-gradient-to-br from-slate-700 via-slate-600 to-slate-700 rounded-2xl" />
          </div>
          
          {/* Card content */}
          <div className="relative p-8 h-full">
            {/* Icon centered at top */}
            <div className="flex justify-center mb-6">
              <motion.div 
                className={`p-4 rounded-full bg-gradient-to-r ${certification.color} shadow-xl group-hover:shadow-2xl transition-all duration-300`}
                whileHover={{ 
                  scale: 1.15,
                  rotate: [0, -5, 5, 0]
                }}
                transition={{ duration: 0.3 }}
              >
                <IconComponent className="w-8 h-8 text-white" />
              </motion.div>
            </div>
            
            {/* Title */}
            <h3 className="text-xl font-bold text-white mb-4 text-center group-hover:text-blue-300 transition-colors duration-300">
              {certification.title}
            </h3>
            
            {/* Description */}
            <p className="text-gray-300 text-sm leading-relaxed text-center mb-6 group-hover:text-gray-200 transition-colors duration-300">
              {certification.description}
            </p>
            
            {/* View button with enhanced styling */}
            <div className="flex justify-center">
              <motion.div
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg group-hover:shadow-xl group-hover:from-purple-500 group-hover:to-blue-600 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Certificate →
              </motion.div>
            </div>
            
            {/* Animated sparkles on hover */}
            {/* <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <FirecrackerAnimation />
            </div>
             */}
            {/* Corner decoration */}
            <div className="absolute bottom-4 left-4 opacity-30 group-hover:opacity-60 transition-opacity duration-300">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse" />
            </div>
          </div>
        </MotionCard>
      
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto bg-slate-800 border-slate-600">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl text-white">
            <div className={`p-3 rounded-full bg-gradient-to-r ${certification.color} shadow-lg`}>
              <IconComponent className="w-6 h-6 text-white" />
            </div>
            {certification.title}
          </DialogTitle>
          <DialogDescription className="text-gray-300 text-base">
            Complete certification details and official documentation
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-6">
          <div className="relative rounded-xl overflow-hidden shadow-2xl border-2 border-slate-600">
            <ImageWithFallback
              src={certification.image}
              alt={certification.title}
              className="h-130 md:h-96 lg:h-[650px] w-[600px] object-cover"
            />
          </div>
          
          <div className="mt-6 p-6 bg-gradient-to-r from-slate-700 to-slate-600 rounded-xl border border-slate-500">
            <p className="text-gray-200 leading-relaxed text-base mb-4">
              {certification.description}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Badge className={`bg-gradient-to-r ${certification.color} text-white shadow-lg px-4 py-2 text-sm font-semibold`}>
                {certification.category}
              </Badge>
              <span className="text-sm text-gray-400 font-medium">
                Certificate ID: VAI-{certification.id.toString().padStart(3, '0')}
              </span>
              <span className="text-sm text-gray-400">
                Verified & Authenticated
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const VaigaiCertificationDisplay: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const categories = ['All', 'Quality', 'Legal', 'Safety', 'Environment', 'Standards'];
  
  const filteredCertifications = activeCategory === 'All' 
    ? certificationData 
    : certificationData.filter(cert => cert.category === activeCategory);

  return (
    <section className="relative py-20 bg-black overflow-hidden">
      {/* Enhanced animated background elements */}
      {/* <div className="absolute inset-0 opacity-30">
        {[...Array(25)].map((_, i) => (
          <FirecrackerAnimation 
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`
            }}
          />
        ))}
      </div> */}
      
      {/* Additional floating particles */}
      {/* <div className="absolute inset-0 opacity-15">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-2 h-2 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-full"
            animate={{
              y: [0, -100, -200],
              x: [0, Math.random() * 100 - 50],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: '100%'
            }}
          />
        ))}
      </div> */}
      
      <div className="relative container mx-auto px-4">
        {/* Header with enhanced styling */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-8">
            <motion.h2 
              className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-yellow-600 bg-clip-text text-transparent mb-4"
              animate={{
                backgroundPosition: ['0%', '100%', '0%']
              }}
              transition={{
                duration: 3,
                repeat: Infinity
              }}
            >
              Our Certifications
            </motion.h2>
            <motion.div 
              className="w-32 h-1.5 bg-gradient-to-r from-orange-400 via-red-500 to-yellow-400 mx-auto rounded-full"
              animate={{
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity
              }}
            />
          </div>
          
          <p className="text-gray-300 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed font-medium">
            Verified credentials and official certifications that ensure quality, safety, and compliance in every product we manufacture
          </p>
        </motion.div>

        {/* Enhanced Category Filter */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {categories.map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant={activeCategory === category ? "default" : "outline"}
                className={`rounded-full px-8 py-3 transition-all duration-300 font-semibold ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-xl shadow-orange-500/40 transform scale-105'
                    : 'border-2 border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-orange-400 hover:text-orange-300 hover:shadow-lg'
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Certifications Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {filteredCertifications.map((certification, index) => (
            <motion.div
              key={certification.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <CertificationCard certification={certification} />
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Call to action */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p className="text-gray-300 mb-8 text-lg font-medium">
            Trusted by customers nationwide with verified certifications
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button className="bg-gradient-to-r from-orange-500 via-yellow-500 to-red-500 text-white font-bold px-12 py-4 rounded-full hover:shadow-2xl hover:shadow-orange-500/40 transition-all duration-300 text-lg">
            Shop Our Collection 
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};