import { motion } from 'framer-motion';
import { Shield, AlertTriangle, Eye, Users, Flame, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';

const safetyTips = [
  {
    icon: Shield,
    title: 'Adult Supervision',
    description: 'Always have a responsible adult present when using fireworks.',
    color: 'text-green-400'
  },
  {
    icon: Eye,
    title: 'Safety Gear',
    description: 'Wear safety glasses and keep a safe distance from fireworks.',
    color: 'text-blue-400'
  },
  {
    icon: Flame,
    title: 'Fire Safety',
    description: 'Keep water or fire extinguisher nearby and never relight duds.',
    color: 'text-red-400'
  },
  {
    icon: Users,
    title: 'Clear Area',
    description: 'Ensure all spectators are at a safe distance before lighting.',
    color: 'text-yellow-400'
  }
];

const guidelines = [
  'Read all instructions carefully before use',
  'Never modify or attempt to relight fireworks',
  'Store fireworks in a cool, dry place away from heat sources',
  'Dispose of used fireworks properly by soaking in water',
  'Only use fireworks outdoors in open areas',
  'Check local laws and regulations before purchasing'
];

export function SafetySection() {
  return (
    <section id="safety" className="py-20 bg-gradient-to-br from-gray-900 to-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <Shield className="h-12 w-12 text-green-400 mr-4" />
            <h2 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-green-300 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Safety First
            </h2>
          </div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Your safety is our top priority. Follow these essential guidelines for a safe and spectacular fireworks experience.
          </p>
        </motion.div>

        {/* Safety Alert */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <Alert className="border-yellow-500 bg-yellow-500/10">
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
            <AlertDescription className="text-yellow-200">
              <strong>Important:</strong> Fireworks are regulated products. You must be 18+ to purchase and comply with local laws and regulations.
            </AlertDescription>
          </Alert>
        </motion.div>

        {/* Safety Tips Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {safetyTips.map((tip, index) => {
            const IconComponent = tip.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="bg-gray-800/50 border-gray-700 h-full hover:border-gray-600 transition-all">
                  <CardContent className="p-6 text-center">
                    <IconComponent className={`h-12 w-12 ${tip.color} mx-auto mb-4`} />
                    <h3 className="text-xl font-bold text-black mb-3">{tip.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{tip.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Detailed Guidelines */}
        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl text-black flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-400 mr-3" />
                  Safety Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {guidelines.map((guideline, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start space-x-3"
                    >
                      <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{guideline}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Card className="bg-gradient-to-br from-red-900/20 to-orange-900/20 border-red-700/50">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center">
                  <AlertTriangle className="h-6 w-6 text-red-400 mr-3" />
                  Emergency Preparedness
                </CardTitle>
              </CardHeader>
              <CardContent className="text-black space-y-4">
                <p>
                  Always have emergency measures ready before using fireworks:
                </p>
                <ul className="space-y-2 text-sm">
                  <li>• Keep a fire extinguisher or water source nearby</li>
                  <li>• Have a first aid kit accessible</li>
                  <li>• Know your local emergency numbers</li>
                  <li>• Plan escape routes in advance</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-700/50">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center">
                  <Shield className="h-6 w-6 text-blue-400 mr-3" />
                  Legal Compliance
                </CardTitle>
              </CardHeader>
              <CardContent className="text-black space-y-4">
                <p className="text-sm">
                  Fireworks laws vary by location. It's your responsibility to:
                </p>
                <ul className="space-y-2 text-sm">
                  <li>• Check local and state regulations</li>
                  <li>• Obtain necessary permits if required</li>
                  <li>• Respect noise ordinances and time restrictions</li>
                  <li>• Consider your neighbors and environment</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-400 text-lg">
            For more detailed safety information, download our comprehensive safety guide or contact our experts.
          </p>
        </motion.div>
      </div>
    </section>
  );
}