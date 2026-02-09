import { motion } from 'framer-motion';
import heroVideo from "../assets/vi.mp4";

export function HeroVideo() {
  return (
    <section className="relative w-full overflow-hidden bg-logo-dark">
      <div className="relative h-[550px] md:h-[700px] lg:h-[850px] w-full">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-logo-dark/40 via-transparent to-logo-dark/60"></div>
        <div className="absolute inset-0 bg-logo-blue/5 backdrop-brightness-90"></div>

        {/* Content (Optional, can be used for text overlay if needed) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-center px-4"
          >
            {/* You can add text here if wanted, or leave it for just the video */}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
