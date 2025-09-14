import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import companyLogo from '../assets/1000035182.png';
import elephantImage from "../assets/output-onlinegiftools.gif";

interface FireworkProps {
  x: number;
  y: number;
  delay: number;
}

const Firework = ({ x, y, delay }: FireworkProps) => {
  return (
    <motion.div
      className="absolute w-3 h-3 rounded-full"
      style={{ left: `${x}%`, top: `${y}%` }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: [0, 1.5, 0.5, 2, 0],
        opacity: [0, 1, 0.8, 1, 0],
        backgroundColor: [
          '#ff6b6b',
          '#4ecdc4',
          '#45b7d1',
          '#96ceb4',
          '#ffeaa7',
          '#dda0dd',
          '#ff1744',
          '#00bcd4',
          '#ff6b6b'
        ],
        boxShadow: [
          '0 0 0px #ff6b6b',
          '0 0 20px #4ecdc4',
          '0 0 30px #45b7d1',
          '0 0 40px #ffeaa7',
          '0 0 0px transparent'
        ]
      }}
      transition={{
        duration: 2.5,
        delay: delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 2 + 1,
        ease: "easeOut"
      }}
    />
  );
};

const ElephantSide = ({ side }: { side: 'left' | 'right' }) => {
  return (
    <motion.div
      className={`absolute top-1/2 -translate-y-1/2 ${
        side === 'left' ? 'left-4 md:left-8' : 'right-4 md:right-8'
      }`}
      initial={{ 
        x: side === 'left' ? -200 : 200, 
        opacity: 0,
        scale: 0 
      }}
      animate={{ 
        x: 0, 
        opacity: 1,
        scale: 1
      }}
      transition={{
        x: { duration: 1.5, delay: 4, ease: "backOut" },
        opacity: { duration: 1, delay: 4 },
        scale: { duration: 1.2, delay: 4, ease: "backOut" }
      }}
    >
      {/* Enhanced Walking Animation Container */}
      <motion.div
        animate={{
          // Walking step motion with elevation changes
          y: [0, -15, 0, -8, 0],
          // Side to side walking sway
          x: side === 'left' ? [-10, 10, -10] : [10, -10, 10],
          // Body tilt during walking
          rotate: side === 'left' ? [-3, 3, -3, 2, -3] : [3, -3, 3, -2, 3],
        }}
        transition={{
          duration: 2.5,
          delay: 5.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Walking Elephant with Enhanced Animation */}
        <motion.div
          className="relative"
          animate={{
            // Enhanced walking bounce for static image
            scaleY: [1, 0.98, 1, 0.99, 1],
            scaleX: [1, 1.02, 1, 1.01, 1],
            // Trunk swing during walking motion
            skewX: side === 'left' ? [0, 2, 0, -1, 0] : [0, -2, 0, 1, 0],
            // Walking rotation
            rotate: side === 'left' ? [0, 1, 0, -1, 0] : [0, -1, 0, 1, 0]
          }}
          transition={{
            duration: 2.5,
            delay: 5.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            background: 'transparent',
            isolation: 'isolate'
          }}
        >
          {/* Background removal overlay */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle, transparent 30%, rgba(255,255,255,0) 70%)',
              mixBlendMode: 'screen',
              zIndex: 1
            }}
          />
          <img
            src={elephantImage}
            alt={`Walking Elephant ${side}`}
            className={`w-50 h-50 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 xl:w-[28rem] xl:h-[28rem] 2xl:w-[32rem] 2xl:h-[32rem] object-contain ${
              side === 'right' ? 'scale-x-[-1]' : ''
            }`}
            style={{
              mixBlendMode: 'multiply',
              filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.4)) contrast(1.2) brightness(0.9) saturate(1.1)',
              background: 'transparent',
              position: 'relative',
              zIndex: 2
            }}
          />
          
          {/* Additional white background removal layer */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.001), transparent)',
              mixBlendMode: 'difference',
              zIndex: 3
            }}
          />
        </motion.div>
      </motion.div>

      {/* Walking dust particles behind feet */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{
          opacity: [0, 0.6, 0],
          scale: [0.5, 1.2, 0.5],
        }}
        transition={{
          duration: 2.5,
          delay: 5.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-amber-200 rounded-full opacity-40"
            style={{
              left: `${i * 8 - 20}px`,
              top: `${Math.random() * 10}px`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0, 0.6, 0],
              scale: [0.3, 1, 0.3]
            }}
            transition={{
              duration: 1.5,
              delay: 5.5 + (i * 0.2),
              repeat: Infinity,
              repeatDelay: 1
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

const TitleCard = () => {
  const [fireworks, setFireworks] = useState<FireworkProps[]>([]);

  useEffect(() => {
    const generateFireworks = () => {
      const newFireworks: FireworkProps[] = [];
      for (let i = 0; i < 80; i++) {
        newFireworks.push({
          x: Math.random() * 100,
          y: Math.random() * 100,
          delay: Math.random() * 12,
        });
      }
      setFireworks(newFireworks);
    };

    generateFireworks();
  }, []);

  return (
    <div className="relative w-full h-screen min-h-[100vh] overflow-hidden bg-transparent">

      {/* Enhanced Animated Fireworks */}
      <div className="absolute inset-0">
        {fireworks.map((firework, index) => (
          <Firework
            key={index}
            x={firework.x}
            y={firework.y}
            delay={firework.delay}
          />
        ))}
      </div>

      {/* Enhanced Blinking Stars & Crackers */}
      <motion.div className="absolute inset-0">
        {Array.from({ length: 150 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.3, 2, 0.3],
              backgroundColor: [
                '#ffffff',
                '#ffeb3b',
                '#ff5722',
                '#4caf50',
                '#2196f3',
                '#e91e63',
                '#ff9800',
                '#9c27b0',
                '#ffffff'
              ],
              boxShadow: [
                '0 0 0px transparent',
                '0 0 15px currentColor',
                '0 0 25px currentColor',
                '0 0 35px currentColor',
                '0 0 0px transparent'
              ]
            }}
            transition={{
              duration: Math.random() * 3 + 1,
              delay: Math.random() * 8,
              repeat: Infinity,
              repeatDelay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>

      {/* Additional Firecracker Bursts */}
      <motion.div className="absolute inset-0">
        {Array.from({ length: 60 }).map((_, i) => (
          <motion.div
            key={`burst-${i}`}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 3, 0],
              opacity: [0, 0.8, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: Math.random() * 2 + 1.5,
              delay: Math.random() * 10,
              repeat: Infinity,
              repeatDelay: Math.random() * 4 + 2,
              ease: "easeOut"
            }}
          >
            <div className="w-1 h-1 bg-yellow-400 rounded-full shadow-lg shadow-yellow-400/50" />
            <div className="absolute top-0 left-0 w-1 h-1 bg-red-400 rounded-full shadow-lg shadow-red-400/50 translate-x-2" />
            <div className="absolute top-0 left-0 w-1 h-1 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50 -translate-x-2" />
            <div className="absolute top-0 left-0 w-1 h-1 bg-green-400 rounded-full shadow-lg shadow-green-400/50 translate-y-2" />
            <div className="absolute top-0 left-0 w-1 h-1 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50 -translate-y-2" />
          </motion.div>
        ))}
      </motion.div>

      {/* Left Elephant */}
      <ElephantSide side="left" />

      {/* Right Elephant */}
      <ElephantSide side="right" />

      {/* Center Logo with Enhanced Depth and Larger Size */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0, opacity: 0, z: 0 }}
          animate={{ 
            scale: [0, 1.2, 1], 
            opacity: [0, 0.9, 0.85],
            rotate: [0, 0, 360, 360],
            z: [0, 50, 30]
          }}
          transition={{
            scale: { duration: 2, delay: 0.5, times: [0, 0.7, 1], ease: "backOut" },
            opacity: { duration: 1.5, delay: 0.5 },
            rotate: { duration: 2, delay: 2, ease: "easeInOut" },
            z: { duration: 2, delay: 0.5, ease: "backOut" }
          }}
          className="relative"
          style={{
            transformStyle: 'preserve-3d',
            perspective: '2000px'
          }}
        >
          {/* Background Shadow Layers for Depth */}
          <motion.div
            className="absolute inset-0 -z-10"
            animate={{
              y: [-8, 12, -8],
              scale: [0.98, 1.03, 0.98],
            }}
            transition={{
              duration: 4,
              delay: 4.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <img
              src={companyLogo}
              alt="Logo Shadow"
              className="w-[32rem] h-auto sm:w-[36rem] md:w-[40rem] lg:w-[44rem] opacity-20 blur-md filter brightness-0"
              style={{ transform: 'translateZ(-20px)' }}
            />
          </motion.div>

          <motion.div
            className="absolute inset-0 -z-5"
            animate={{
              y: [-6, 8, -6],
              scale: [0.99, 1.02, 0.99],
            }}
            transition={{
              duration: 4,
              delay: 4.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <img
              src={companyLogo}
              alt="Logo Shadow"
              className="w-[32rem] h-auto sm:w-[36rem] md:w-[40rem] lg:w-[44rem] opacity-30 blur-sm filter brightness-50"
              style={{ transform: 'translateZ(-10px)' }}
            />
          </motion.div>

          {/* Main Logo - Enlarged */}
          <motion.div
            animate={{
              y: [-10, 10, -10],
              scale: [1, 1.05, 1],
              rotateX: [0, 5, 0, -5, 0],
              rotateY: [0, -5, 0, 5, 0]
            }}
            transition={{
              duration: 4,
              delay: 4.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{ transformStyle: 'preserve-3d' }}
            className="relative z-10"
          >
            <img
              src={companyLogo}
              alt="Vaigai Company Logo"
              className="w-[32rem] h-auto sm:w-[36rem] md:w-[40rem] lg:w-[44rem] drop-shadow-2xl"
              style={{ 
                transform: 'translateZ(0px)',
                filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.4)) drop-shadow(0 10px 20px rgba(0,0,0,0.3)) contrast(1.1) brightness(1.1)'
              }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Sparkle particles & Crackers Effect */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 60 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${5 + Math.random() * 90}%`,
              top: `${5 + Math.random() * 90}%`,
              width: `${Math.random() * 8 + 3}px`,
              height: `${Math.random() * 8 + 3}px`,
            }}
            animate={{
              scale: [0, 2, 0],
              rotate: [0, 180, 360],
              opacity: [0, 1, 0],
              backgroundColor: [
                '#ffeb3b',
                '#ff5722',
                '#4caf50',
                '#2196f3',
                '#e91e63',
                '#ff9800',
                '#9c27b0',
                '#00bcd4',
                '#ffeb3b'
              ],
              boxShadow: [
                '0 0 0px transparent',
                '0 0 20px currentColor',
                '0 0 40px currentColor',
                '0 0 0px transparent'
              ]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              delay: Math.random() * 8,
              repeat: Infinity,
              repeatDelay: Math.random() * 4 + 1,
              ease: "backOut"
            }}
          >
            <div className="w-full h-full rotate-45 rounded-sm blur-[1px]" />
          </motion.div>
        ))}
      </div>

      {/* Mega Firecracker Explosions */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={`explosion-${i}`}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 4, 1, 0],
              opacity: [0, 1, 0.5, 0],
              rotate: [0, 720],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              delay: Math.random() * 12,
              repeat: Infinity,
              repeatDelay: Math.random() * 6 + 3,
              ease: "easeOut"
            }}
          >
            {/* Central burst */}
            <div className="absolute w-2 h-2 bg-white rounded-full blur-sm" />
            
            {/* Radiating sparks */}
            {Array.from({ length: 8 }).map((_, sparkIndex) => (
              <motion.div
                key={sparkIndex}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  backgroundColor: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd', '#ff1744', '#00bcd4'][sparkIndex],
                  transform: `rotate(${sparkIndex * 45}deg) translateX(${Math.random() * 20 + 10}px)`
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  x: [0, Math.random() * 40 - 20],
                  y: [0, Math.random() * 40 - 20]
                }}
                transition={{
                  duration: Math.random() * 2 + 1,
                  delay: sparkIndex * 0.1,
                  ease: "easeOut"
                }}
              />
            ))}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TitleCard;