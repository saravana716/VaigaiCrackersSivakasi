import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Rocket,
  Award,
  Users,
  Factory,
  Sparkles,
  Star,
  Calendar,
  CheckCircle,
  Target,
  Eye,
  Heart,
  Zap,
  Trophy,
  Shield,
  ArrowRight,
  Flame,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import logoImage from '../assets/1000035182.png';
import { ImageWithFallback } from './figma/ImageWithFallback';
import vaigai from '../assets/1000035181.png';

// ✅ TYPE DEFINITIONS
interface Particle {
  id: number;
  x: number;
  y: number;
  delay: number;
}

// ✅ FIXED HOOK WITH TYPES + REMOVED UNUSED hasStarted
const useAnimatedCounter = (
  targetValue: number,
  duration: number = 2000,
  delay: number = 0
): number => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const startTime = Date.now();
      const startValue = 0;

      const updateCounter = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

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

export function AboutPage() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);

  // Animated counters with staggered delays for hero stats
  const sparklerCount = useAnimatedCounter(50, 2000, 1000); // 50+ sparklers
  const customerCount = useAnimatedCounter(10, 2000, 1200); // 10k+ customers
  const yearCount = useAnimatedCounter(12, 2000, 1400); // 12+ years
  const safetyCount = useAnimatedCounter(25, 2000, 1600); // 25+ safety awards

  useEffect(() => {
    // Create particle animation
    const newParticles: Particle[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
    }));
    setParticles(newParticles);
  }, []);

  const timelineData = [
    {
      year: "1970",
      title: "Company Founded",
      description: "Twin Elephant Brand was established in Sivakasi, Tamil Nadu, beginning our journey in the fireworks industry.",
      icon: Factory,
      color: "from-red-500 to-orange-500",
    },
    {
      year: "1985",
      title: "First Major Expansion",
      description: "Expanded our manufacturing facilities and introduced new product lines including sparklers and fountains.",
      icon: Rocket,
      color: "from-blue-500 to-purple-500",
    },
    {
      year: "1995",
      title: "ISO Certification",
      description: "Achieved ISO 9001 certification for quality management systems, setting industry standards.",
      icon: Award,
      color: "from-green-500 to-teal-500",
    },
    {
      year: "2005",
      title: "National Recognition",
      description: "Received national awards for excellence in fireworks manufacturing and safety protocols.",
      icon: Trophy,
      color: "from-yellow-500 to-orange-500",
    },
    {
      year: "2015",
      title: "Digital Innovation",
      description: "Embraced digital technologies and modern manufacturing processes for enhanced efficiency.",
      icon: Zap,
      color: "from-indigo-500 to-blue-500",
    },
    {
      year: "2024",
      title: "50+ Years Legacy",
      description: "Celebrating over 5 decades of bringing joy and sparkle to celebrations across India.",
      icon: Star,
      color: "from-pink-500 to-red-500",
    },
  ];

  const achievements = [
    { label: "Years of Experience", value: yearCount, suffix: "+", icon: Calendar },
    { label: "Sparkler Varieties", value: sparklerCount, suffix: "+", icon: Sparkles },
    { label: "Happy Customers", value: customerCount, suffix: "K+", icon: Users },
    { label: "Safety Awards", value: safetyCount, suffix: "+", icon: Shield },
  ];

  const teamMembers = [
    {
      name: "Rajesh Kumar",
      role: "Founder & CEO",
      experience: "50+ Years",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      specialization: "Fireworks Innovation",
    },
    {
      name: "Priya Sharma",
      role: "Head of Manufacturing",
      experience: "25+ Years",
      image: "https://images.unsplash.com/photo-1494790108755-2616b9e0ce1e?w=400&h=400&fit=crop&crop=face",
      specialization: "Quality Control",
    },
    {
      name: "Arun Patel",
      role: "Safety Director",
      experience: "30+ Years",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      specialization: "Safety Protocols",
    },
    {
      name: "Meera Reddy",
      role: "R&D Head",
      experience: "20+ Years",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      specialization: "Product Development",
    },
  ];

  const processSteps = [
    {
      step: "01",
      title: "Raw Material Selection",
      description: "Carefully sourced premium materials for optimal performance",
      icon: CheckCircle,
      color: "from-red-500 to-orange-500",
    },
    {
      step: "02",
      title: "Precision Manufacturing",
      description: "State-of-the-art machinery with strict quality controls",
      icon: Factory,
      color: "from-blue-500 to-indigo-500",
    },
    {
      step: "03",
      title: "Safety Testing",
      description: "Rigorous testing protocols ensuring complete safety",
      icon: Shield,
      color: "from-green-500 to-teal-500",
    },
    {
      step: "04",
      title: "Quality Assurance",
      description: "Final inspection and packaging for delivery",
      icon: Award,
      color: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden">
      {/* Animated Background Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-2 h-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-full opacity-20"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.6, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <motion.section
        className="relative py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden"
        style={{ y }}
      >
        {/* Explosive Background Animation */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-orange-600/20"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            {/* Animated Logo */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="flex justify-center mb-8"
            >
              <div className="relative">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-full blur-xl opacity-60"
                  animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <motion.div
                  className="relative bg-white p-8 rounded-full shadow-2xl"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img
                    src={logoImage}
                    alt="Twin Elephant Brand"
                    className="h-20 w-20 object-contain" // 👈 Fixed size: was 50 -> 20
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-5xl lg:text-7xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                Twin Elephant
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Brand Story
              </span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto mb-8"
            >
              Igniting Joy, Sparkling Dreams - For Over 12 Years
            </motion.p>

            {/* Animated Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
            >
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="text-center"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.2 + index * 0.2 }}
                  >
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                      <Icon className="h-8 w-8 mx-auto mb-2 text-orange-400" />
                      <motion.div
                        className="text-3xl font-bold text-white mb-1"
                        animate={{
                          scale: achievement.value > 0 ? [1, 1.1, 1] : 1,
                        }}
                        transition={{
                          duration: 0.3,
                          delay: achievement.value === (index === 0 ? yearCount : index === 1 ? sparklerCount : index === 2 ? customerCount : safetyCount) ? 0 : 0,
                        }}
                      >
                        {achievement.value}{achievement.suffix}
                      </motion.div>
                      <div className="text-sm text-gray-300">
                        {achievement.label}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Who We Are Section */}
      <div className="container mx-auto px-4 py-20 relative z-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-blue-950"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center space-x-2 mb-6"
            >
              <Sparkles className="h-8 w-8 text-blue-950" />
              <span className="text-blue-950 text-lg font-medium">
                Welcome to Vaigai Sparklers – Where Every Spark Tells a Story.
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-5xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent"
            >
              Who We Are
              <br />
              <span className="relative">
                <motion.div
                  className="absolute -top-2 -right-8"
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Zap className="h-12 w-12 text-blue-950" />
                </motion.div>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl mb-8 mt-12 max-w-2xl leading-relaxed text-blue-950"
            >
              At Vaigai Sparklers, we are more than just a sparklers factory - we are creators of memories. Our factory is set amidst lush green surroundings, echoing our deep commitment to sustainability and eco-friendliness. We are an ISO-Certified Company, and every product we manufacture strictly adheres to Go Green principles. Our sparklers are carefully crafted using premium materials and time-tested techniques, ensuring each piece delivers the safest and most spectacular sparkle possible.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-xl mb-8 max-w-2xl leading-relaxed text-blue-950"
            >
              We currently offer more than 50 varieties of Sparklers, each designed with a perfect balance of safety, colour, and quality. As part of a green initiative, we plant 50 new trees every year, reinforcing our promise to give back to nature.
            </motion.p>
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
                className="rounded-2xl shadow-2xl w-full border border-red-200 bg-white"
              />
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-red-500/20 to-blue-500/10 rounded-2xl"></div>
            </div>

            {/* Floating elements */}
            <motion.div
              className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-full shadow-lg"
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles className="h-6 w-6" />
            </motion.div>

            <motion.div
              className="absolute -bottom-4 -left-4 bg-gradient-to-r from-red-500 to-orange-500 text-white p-3 rounded-full shadow-lg"
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            >
              <Zap className="h-6 w-6" />
            </motion.div>

            <motion.div
              className="absolute top-1/2 -left-8 bg-yellow-400 text-slate-900 p-2 rounded-full shadow-lg"
              animate={{ x: [-5, 5, -5] }}
              transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
            >
              <Star className="h-4 w-4" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              Our Purpose
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="relative"
            >
              <Card className="h-full bg-gradient-to-br from-red-50 to-orange-50 border-red-200 shadow-xl">
                <CardHeader className="text-center pb-6">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-full">
                      <Target className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-bold text-red-600">
                    Our Mission
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-700 text-lg leading-relaxed">
                    To spark happiness in every home by delivering safe, vibrant, and eco-conscious sparklers made with care and excellence. Our Vision is to deliver the vibrance of celebration without compromising the health of our planet.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
              className="relative"
            >
              <Card className="h-full bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-xl">
                <CardHeader className="text-center pb-6">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full">
                      <Eye className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-bold text-blue-600">
                    Our Vision
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-700 text-lg leading-relaxed">
                    We aim to become one of India's most trusted names in sparklers by consistently delivering value, safety, and innovation – while staying true to our cultural roots.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Timeline */}
      <section className="py-20 bg-gradient-to-br from-slate-100 to-blue-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Five decades of innovation, growth, and excellence in fireworks manufacturing
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-red-500 to-blue-500 opacity-30" />

            {timelineData.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className={`relative flex items-center mb-16 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className={`p-6 rounded-lg shadow-xl bg-gradient-to-br ${item.color} text-white`}
                    >
                      <div className="flex items-center mb-4">
                        <Icon className="h-8 w-8 mr-4" />
                        <span className="text-2xl font-bold">{item.year}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                      <p className="text-white/90">{item.description}</p>
                    </motion.div>
                  </div>

                  {/* Timeline Dot */}
                  <div
                    className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white border-4 border-current rounded-full z-10"
                    style={{ color: `hsl(${index * 60}, 70%, 50%)` }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Manufacturing Process */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Manufacturing Excellence
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our state-of-the-art manufacturing process ensures quality, safety, and innovation
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="relative"
                >
                  <Card className="h-full bg-gradient-to-br from-white to-gray-50 border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader className="text-center pb-6">
                      <div className="flex justify-center mb-4">
                        <div className={`p-4 bg-gradient-to-r ${step.color} rounded-full`}>
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                      </div>
                      <div className="text-3xl font-bold text-gray-400 mb-2">
                        {step.step}
                      </div>
                      <CardTitle className="text-xl font-bold text-gray-900">
                        {step.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-gray-600">{step.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The passionate experts behind Twin Elephant Brand's success
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="relative group"
              >
                <Card className="h-full bg-white shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                  <div className="relative">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-bold">{member.name}</h3>
                      <p className="text-blue-200">{member.role}</p>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Badge className="bg-blue-100 text-blue-800">
                        {member.experience}
                      </Badge>
                      <Heart className="h-5 w-5 text-red-500" />
                    </div>
                    <p className="text-gray-600 text-sm">
                      Expert in {member.specialization}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="py-20 bg-gradient-to-r from-red-600 via-orange-600 to-blue-600 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0 bg-black/20"
            animate={{
              background: [
                "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
              ],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Ready to Light Up Your Celebration?
            </h2>
            <p className="text-xl lg:text-2xl mb-8 max-w-3xl mx-auto">
              Join thousands of satisfied customers who trust Twin Elephant Brand for their special moments
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-red-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                onClick={() => window.location.hash = 'contact'}
              >
                <Flame className="mr-2 h-5 w-5" />
                Contact Us Today
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-red-600 px-8 py-4 text-lg font-semibold"
                onClick={() => window.location.hash = 'products'}
              >
                <ArrowRight className="mr-2 h-5 w-5" />
                Explore Products
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}