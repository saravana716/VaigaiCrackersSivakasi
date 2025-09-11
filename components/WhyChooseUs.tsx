import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, Truck, Award, Users, Clock, Sparkles } from "lucide-react";
import { Card, CardContent } from "./ui/card";

// ✅ TYPE THE HOOK CORRECTLY — THIS FIXES ALL TS7006 & TS6133 ERRORS
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

const benefits = [
  {
    icon: Shield,
    title: "Safe & Certified Products",
    description: "All Vaigai sparklers are government-certified and made with non-toxic, child-friendly materials — perfect for safe, joyful celebrations.",
    color: "from-green-400 to-emerald-500",
  },
  {
    icon: Truck,
    title: "Timely Delivery & Reliable Service",
    description: "Order today, celebrate on time. We deliver your sparklers across India with care — right when you need them, every time.",
    color: "from-blue-400 to-cyan-500",
  },
  {
    icon: Award,
    title: "High-Quality Raw Materials",
    description: "We use premium-grade compounds and wires for brighter, longer-lasting sparks — no smoke, no fumes, just clean, dazzling light.",
    color: "from-yellow-400 to-orange-500",
  },
  {
    icon: Users,
    title: "Premium Packaging Boxes",
    description: "Elegant, sturdy, and gift-ready — our boxes keep sparklers protected and looking beautiful, whether for sale or gifting.",
    color: "from-purple-400 to-pink-500",
  },
  {
    icon: Clock,
    title: "Rooted in Sivakasi's Sparkler Tradition",
    description: "Born in India's sparkler capital, Vaigai carries forward Sivakasi's legacy — crafting the finest hand-twisted sparklers for generations.",
    color: "from-red-400 to-rose-500",
  },
  {
    icon: Sparkles,
    title: "Prioritise Customer Satisfaction",
    description: "Your smile matters most. From quick replies to perfect orders — we're here to make your sparkler experience simple and happy.",
    color: "from-indigo-400 to-purple-500",
  },
];

export function WhyChooseUs() {
  // Animated counters with staggered delays (triggered when stats section comes into view)
  const [statsInView, setStatsInView] = useState(false);

  const customersCount = useAnimatedCounter(statsInView ? 10000 : 0, 2500, 0);
  const varietiesCount = useAnimatedCounter(statsInView ? 50 : 0, 2000, 200);
  const yearsCount = useAnimatedCounter(statsInView ? 12 : 0, 1500, 400);
  const awardsCount = useAnimatedCounter(statsInView ? 25 : 0, 2000, 600);

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400 bg-clip-text text-transparent">
            Why Choose Vaigai?
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            With over 12 years of experience, we're your trusted partner for all
            fireworks needs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="group"
              >
                <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 h-full hover:border-gray-600 transition-all">
                  <CardContent className="p-8 text-center">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className={`inline-flex p-4 rounded-full bg-gradient-to-r ${benefit.color} mb-6`}
                    >
                      <IconComponent className="h-8 w-8 text-white" />
                    </motion.div>

                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-yellow-400 transition-colors">
                      {benefit.title}
                    </h3>

                    <p className="text-gray-400 leading-relaxed">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Stats Section with Animated Counters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.4 } }}
          onViewportEnter={() => setStatsInView(true)}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent mb-2"
            >
              <motion.span
                animate={{
                  scale: customersCount > 0 && customersCount === 10000 ? [1, 1.1, 1] : 1,
                }}
                transition={{
                  duration: 0.3,
                  delay: customersCount === 10000 ? 0.2 : 0,
                }}
              >
                {customersCount.toLocaleString()}+
              </motion.span>
            </motion.div>
            <div className="text-gray-400 text-lg">Happy Customers</div>
          </div>

          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent mb-2"
            >
              <motion.span
                animate={{
                  scale: varietiesCount > 0 && varietiesCount === 50 ? [1, 1.1, 1] : 1,
                }}
                transition={{
                  duration: 0.3,
                  delay: varietiesCount === 50 ? 0.2 : 0,
                }}
              >
                {varietiesCount}+
              </motion.span>
            </motion.div>
            <div className="text-gray-400 text-lg">Sparklers Varieties</div>
          </div>

          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent mb-2"
            >
              <motion.span
                animate={{
                  scale: yearsCount > 0 && yearsCount === 12 ? [1, 1.1, 1] : 1,
                }}
                transition={{
                  duration: 0.3,
                  delay: yearsCount === 12 ? 0.2 : 0,
                }}
              >
                {yearsCount}+
              </motion.span>
            </motion.div>
            <div className="text-gray-400 text-lg">Years in Fireworks</div>
          </div>

          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent mb-2"
            >
              <motion.span
                animate={{
                  scale: awardsCount > 0 && awardsCount === 25 ? [1, 1.1, 1] : 1,
                }}
                transition={{
                  duration: 0.3,
                  delay: awardsCount === 25 ? 0.2 : 0,
                }}
              >
                {awardsCount}+
              </motion.span>
            </motion.div>
            <div className="text-gray-400 text-lg">Safety Awards</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}