import { motion } from 'framer-motion';
import { Sparkles, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Separator } from './ui/separator';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-logo-dark text-logo-white border-t border-logo-red/30">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2">
              <Sparkles className="h-8 w-8 text-logo-yellow" />
              <span className="text-2xl font-bold bg-gradient-to-r from-logo-orange to-logo-red bg-clip-text text-transparent">
                Twin Elephant
              </span>
            </div>
            <p className="text-logo-light-gray leading-relaxed">
              Creating spectacular moments with premium quality fireworks for over 50 years. 
              Your trusted partner for celebrations that light up the night.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Facebook, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: Instagram, href: '#' },
                { icon: Youtube, href: '#' }
              ].map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.2 }}
                    className="text-logo-light-gray hover:text-logo-orange transition-colors"
                  >
                    <IconComponent className="h-6 w-6" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-6 text-logo-orange">Quick Links</h3>
            <ul className="space-y-3">
              {[
                'Home', 'Products', 'Gallery', 'Safety Guide', 
                'About Us', 'Contact', 'FAQ', 'Blog'
              ].map((link, index) => (
                <li key={index}>
                  <a 
                    href={`#${link.toLowerCase().replace(' ', '-')}`}
                    className="text-logo-light-gray hover:text-logo-white transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Product Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-6 text-logo-orange">Categories</h3>
            <ul className="space-y-3">
              {[
                'Sparklers', 'Fountains', 'Rockets', 'Roman Candles',
                'Crackers', 'Premium Sets', 'Wedding Collection', 'Party Packs'
              ].map((category, index) => (
                <li key={index}>
                  <a 
                    href="#"
                    className="text-logo-light-gray hover:text-logo-white transition-colors"
                  >
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-6 text-logo-orange">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-logo-yellow" />
                <div>
                  <p className="text-logo-white">+91-9876543210</p>
                  <p className="text-logo-light-gray text-sm">+91-9876543211</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-logo-yellow" />
                <div>
                  <p className="text-logo-white">info@twinelephant.com</p>
                  <p className="text-logo-light-gray text-sm">24/7 Customer Support</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-logo-yellow mt-1" />
                <div>
                  <p className="text-logo-white">123 Fireworks Street</p>
                  <p className="text-logo-light-gray text-sm">Sivakasi, Tamil Nadu 626123</p>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="mt-6 p-4 bg-logo-gray/20 rounded-lg border border-logo-red/20">
              <h4 className="font-semibold text-logo-orange mb-2">Business Hours</h4>
              <div className="text-sm text-logo-light-gray space-y-1">
                <p>Mon - Sat: 9:00 AM - 6:00 PM</p>
                <p>Sunday: 10:00 AM - 4:00 PM</p>
                <p>Festivals: Extended Hours</p>
              </div>
            </div>
          </motion.div>
        </div>

        <Separator className="my-12 bg-logo-red/30" />

        {/* Bottom Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        >
          <div className="text-logo-light-gray text-sm">
            © {currentYear} Twin Elephant Brand - Vijai Sparklers. All rights reserved.
          </div>
          
          <div className="flex flex-wrap gap-6 text-sm">
            <a href="#" className="text-logo-light-gray hover:text-logo-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-logo-light-gray hover:text-logo-white transition-colors">Terms of Service</a>
            <a href="#" className="text-logo-light-gray hover:text-logo-white transition-colors">Shipping Policy</a>
            <a href="#" className="text-logo-light-gray hover:text-logo-white transition-colors">Return Policy</a>
          </div>
        </motion.div>

        {/* Safety Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-8 p-4 bg-logo-red/20 border border-logo-red/50 rounded-lg"
        >
          <p className="text-logo-white text-sm text-center">
            <strong className="text-logo-orange">Safety Reminder:</strong> Fireworks are explosive devices. Use only as directed, 
            follow all safety instructions, and comply with local laws. Must be 18+ to purchase.
          </p>
        </motion.div>

        {/* Company Credentials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-6 text-center"
        >
          <div className="flex flex-wrap justify-center gap-4 text-sm text-logo-light-gray">
            <span className="px-3 py-1 bg-logo-blue/20 rounded-full">Licensed by Government of Tamil Nadu</span>
            <span className="px-3 py-1 bg-logo-green/20 rounded-full">ISO 9001:2015 Certified</span>
            <span className="px-3 py-1 bg-logo-orange/20 rounded-full">Est. 1970</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}