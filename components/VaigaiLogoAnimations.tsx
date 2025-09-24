import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import vaigaiLogo from '../assets/1000035181.png';
import elephantImage from '../assets/op-removebg-preview.png';

// Sparkler particle for firecracker effect
// const SparklerParticle = ({ delay = 0, size = 'small' }: { delay?: number; size?: 'small' | 'medium' | 'large' }) => {
//   const sizeClasses = {
//     small: 'w-0.5 h-8',
//     medium: 'w-1 h-12', 
//     large: 'w-1.5 h-16'
//   };

//   return (
//     <motion.div
//       className={`absolute ${sizeClasses[size]} bg-gradient-to-t from-yellow-400 via-orange-500 to-red-500 rounded-full`}
//       initial={{ opacity: 0, scale: 0, rotate: Math.random() * 360 }}
//       animate={{
//         opacity: [0, 1, 0.8, 0],
//         scale: [0, 1, 0.8, 0],
//         y: [0, -100, -200, -300],
//         x: [0, (Math.random() - 0.5) * 100],
//         rotate: [Math.random() * 360, Math.random() * 360 + 180]
//       }}
//       transition={{
//         duration: 4,
//         delay,
//         repeat: Infinity,
//         repeatDelay: Math.random() * 3 + 2,
//         ease: "easeOut"
//       }}
//     />
//   );
// };

// Sparkler/Firecracker animation
// const SparklerAnimation = ({ className, intensity = 'normal' }: { className?: string; intensity?: 'low' | 'normal' | 'high' }) => {
//   const particleCounts = {
//     low: 8,
//     normal: 15,
//     high: 25
//   };

//   return (
//     <div className={`relative ${className}`}>
//       {[...Array(particleCounts[intensity])].map((_, i) => (
//         <SparklerParticle 
//           key={i} 
//           delay={i * 0.2} 
//           size={Math.random() > 0.7 ? 'large' : Math.random() > 0.4 ? 'medium' : 'small'}
//         />
//       ))}
//       <motion.div
//         className="w-3 h-3 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full shadow-lg"
//         animate={{
//           scale: [1, 1.8, 1],
//           opacity: [0.8, 1, 0.8],
//           boxShadow: [
//             '0 0 15px rgba(251, 191, 36, 0.8)',
//             '0 0 30px rgba(251, 191, 36, 1)',
//             '0 0 15px rgba(251, 191, 36, 0.8)'
//           ]
//         }}
//         transition={{
//           duration: 2,
//           repeat: Infinity,
//           ease: "easeInOut"
//         }}
//       />
//     </div>
//   );
// };

// Floating sparkler embers
// const FloatingSparkler = ({ delay = 0 }: { delay?: number }) => (
//   <motion.div
//     className="absolute w-1 h-6 bg-gradient-to-t from-yellow-300 via-orange-400 to-red-400 rounded-full opacity-70"
//     animate={{
//       y: [100, -100],
//       x: [0, Math.random() * 100 - 50],
//       opacity: [0, 1, 0.6, 0],
//       scale: [0.3, 1, 0.7, 0],
//       rotate: [0, Math.random() * 180]
//     }}
//     transition={{
//       duration: Math.random() * 6 + 4,
//       delay,
//       repeat: Infinity,
//       ease: "easeOut"
//     }}
//     style={{
//       left: `${Math.random() * 100}%`,
//       bottom: '0%'
//     }}
//   />
// );

// Animated text component


  
const AnimatedText = ({ text, delay = 0 }: { text: string; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, delay }}
    className="text-center"
  >
    <motion.h1 
      className="text-2xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent mb-4"
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "linear"
      }}
      style={{
        backgroundSize: '200% 200%'
      }}
    >
      {text}
    </motion.h1>
  </motion.div>
);

export const VaigaiLogoAnimation: React.FC = () => {
const [animationPhase, setAnimationPhase] = useState(0);
const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Check if desktop on mount and resize
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768); // md breakpoint
    };
    
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    
    // Start logo animation immediately when component mounts
    const timer1 = setTimeout(() => setAnimationPhase(1), 500);
    // Start text animations
    const timer2 = setTimeout(() => setAnimationPhase(2), 2500);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener('resize', checkDesktop);
    };
  }, []);

  useEffect(() => {
    // Start logo animation immediately when component mounts
    const timer1 = setTimeout(() => setAnimationPhase(1), 500);
    // Start text animations
    const timer2 = setTimeout(() => setAnimationPhase(2), 2500);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <section id="home" className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-black flex items-center justify-center relative overflow-hidden pt-16">


      {/* Radial gradient background */}
      <div className="absolute inset-0 bg-gradient-radial from-blue-500/20 via-transparent to-transparent" />

      {/* Main content container */}
      <div className="relative w-full max-w-7xl mx-auto px-4 flex items-center justify-center">
        
        {/* Left Elephant */}
        {isDesktop && (<motion.div
          className="absolute left-4 md:left-12 lg:left-20 top-1/2 transform -translate-y-1/2 z-10"
          initial={{ x: -200, opacity: 0 }}
          animate={{ 
            x: animationPhase >= 1 ? -80 : -200,
            opacity: animationPhase >= 1 ? 1 : 0
          }}
          transition={{ 
            duration: 1.2,
            delay: 1,
            ease: "easeOut"
          }}
        >
          <motion.img
            src={elephantImage}
            alt="Left Elephant"
            className="w-300 h-100 md:w-32 lg:w-100 drop-shadow-2xl transform scale-x-[-1]"
            animate={{
              y: [0, -8, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>)}

        {/* Right Elephant */}
       {isDesktop && ( <motion.div
          className="absolute right-4 md:right-12 lg:right-20 top-1/2 transform -translate-y-1/2 z-10"
          initial={{ x: 200, opacity: 0 }}
          animate={{ 
            x: animationPhase >= 1 ? 80 : 200,
            opacity: animationPhase >= 1 ? 1 : 0
          }}
          transition={{ 
            duration: 1.2,
            delay: 1.2,
            ease: "easeOut"
          }}
        >
          <motion.img
            src={elephantImage}
            alt="Right Elephant"
            className="w-300 h-100 md:w-32 lg:w-100 drop-shadow-2xl"
            animate={{
              y: [0, -8, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </motion.div>
)}
        {/* Center Logo */}
        <div className="flex flex-col items-center justify-center space-y-35">
          
          {/* Main Logo Animation */}
          <motion.div
            className="relative flex items-center justify-center"
            initial={{ 
              opacity: 0, 
              scale: 10,
              rotate: 0
            }}
            animate={{ 
              opacity: animationPhase >= 1 ? 1 : 0,
              scale: animationPhase >= 1 ? 1 : 10,
              rotate: 0
            }}
            transition={{ 
              opacity: { duration: 0.8, delay: 0.5 },
              scale: { 
                duration: 1.5, 
                delay: 0.5,
                ease: "easeOut"
              }
            }}
          >
            {/* White background circle for logo */}
            <motion.div
              className="absolute bg-white rounded-full shadow-2xl"
              style={{
                width: '270px',
                height: '270px'
              }}
              initial={{ scale: 0 }}
              animate={{ scale: animationPhase >= 1 ? 1 : 0 }}
              transition={{ 
                duration: 1.2, 
                delay: 0.8,
                ease: "easeOut"
              }}
            />
            
            {/* White border ring around logo */}
            <motion.div
              className="absolute rounded-full border-4 border-white shadow-lg"
              style={{
                width: '290px',
                height: '290px'
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: animationPhase >= 1 ? 1 : 0,
                opacity: animationPhase >= 1 ? 1 : 0
              }}
              transition={{ 
                duration: 1, 
                delay: 1,
                ease: "easeOut"
              }}
            />
            
           {!isDesktop && (
             <motion.img
              src={vaigaiLogo}
              alt="Vaigai Sparklers Logo"
              className="relative z-10 w-90 md:w-90 lg:w-90 h-90"
              style={{
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))'
              }}
            />
           )}
           
            {isDesktop && (
                  <motion.img
              src={vaigaiLogo}
              alt="Vaigai Sparklers Logo"
              className="relative z-10 w-50 md:w-44 lg:w-90 h-90"
              style={{
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))'
              }}
            />
            )}
          </motion.div>

          {/* Animated Company Text */}
          {animationPhase >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: -120 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-center space-y-4"
            >
              <AnimatedText text="Vaigai Sparklers" delay={0}/>
              
              <motion.p 
                className="text-lg md:text-xl text-cyan-300 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
              >
                Twin Elephants Brand
              </motion.p>
              
              <motion.div
                className="flex items-center justify-center space-x-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
              >
                <span className="text-blue-400">🎆</span>
                <motion.p 
                  className="text-gray-300 text-sm md:text-base"
                  animate={{
                    color: ['#d1d5db', '#60a5fa', '#d1d5db']
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity
                  }}
                >
                  Lighting celebrations since 2013
                </motion.p>
                <span className="text-blue-400">🎆</span>
              </motion.div>

              {/* Scroll down indicator */}
              <motion.div
                className="mt-8 flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.5 }}
              >
                <motion.div
                  className="text-cyan-400 text-sm mb-2"
                  animate={{
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity
                  }}
                >
                  Scroll to explore
                </motion.div>
                <motion.div
                  className="w-6 h-10 border-2 border-cyan-400 rounded-full flex justify-center"
                  animate={{
                    y: [0, 10, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity
                  }}
                >
                  <motion.div
                    className="w-1 h-3 bg-cyan-400 rounded-full mt-2"
                    animate={{
                      y: [0, 12, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity
                    }}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>


    </section>
  );
};