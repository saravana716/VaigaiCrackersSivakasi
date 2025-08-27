import { motion } from 'framer-motion';
import { Shield, Truck, Award, Users, Clock, Sparkles } from 'lucide-react';
import { Card, CardContent } from './ui/card';

const benefits = [
  {
    icon: Shield,
    title: 'Safety First',
    description: 'All our products meet strict safety standards and come with detailed safety instructions.',
    color: 'from-green-400 to-emerald-500'
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Quick and secure shipping nationwide with special handling for fireworks safety.',
    color: 'from-blue-400 to-cyan-500'
  },
  {
    icon: Award,
    title: 'Premium Quality',
    description: 'Hand-selected fireworks from trusted manufacturers for consistent, spectacular displays.',
    color: 'from-yellow-400 to-orange-500'
  },
  {
    icon: Users,
    title: 'Expert Support',
    description: 'Our team of pyrotechnic experts is here to help you choose the perfect fireworks.',
    color: 'from-purple-400 to-pink-500'
  },
  {
    icon: Clock,
    title: '24/7 Service',
    description: 'Round-the-clock customer support for all your fireworks needs and questions.',
    color: 'from-red-400 to-rose-500'
  },
  {
    icon: Sparkles,
    title: 'Memorable Moments',
    description: 'Creating unforgettable experiences with spectacular displays that light up the night.',
    color: 'from-indigo-400 to-purple-500'
  }
];

export function WhyChooseUs() {
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
            Why Choose Twin Elephant Brand?
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            With over 50 years of experience, we're your trusted partner for all fireworks needs
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

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {[
            { number: '50,000+', label: 'Festival Celebrations' },
            { number: '500+', label: 'Cracker Varieties' },
            { number: '50+', label: 'Years in Fireworks' },
            { number: '25+', label: 'Safety Awards' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent mb-2"
              >
                {stat.number}
              </motion.div>
              <div className="text-gray-400 text-lg">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}