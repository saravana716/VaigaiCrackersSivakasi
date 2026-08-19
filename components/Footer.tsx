"use client";
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Separator } from './ui/separator';
import { supabase } from "../supabase";
import { useCallback } from 'react';
import { Button } from './ui/button';
import logo1 from "../assets/q__1_-removebg-preview.png"

import { useEffect, useState } from 'react';

// Enhanced gradient text animation
const AnimatedGradientText = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <motion.span
    className={`bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent ${className}`}
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
    {children}
  </motion.span>
);

interface Category {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  color: string;
  createdAt: Date;
}

interface ProductCategoriesProps {
  onCategoryClick?: (categoryId: string) => void;
}

export function Footer({ onCategoryClick }: ProductCategoriesProps) {
  const currentYear = new Date().getFullYear();
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchCategories = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("createdAt", { ascending: false });

      if (error) throw error;

      const categoriesData = (data || []).map((item) => ({
        ...item,
        createdAt: new Date(item.createdAt),
      })) as Category[];

      setCategories(categoriesData);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <>
      {/* Custom CSS for hiding scrollbar */}
      
      
      <footer className="relative bg-gradient-to-b from-slate-900 via-slate-800 to-black text-white overflow-hidden">
        
        <div className="relative container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info with enhanced styling */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex flex-col items-start justify-center space-y-3">

                {/* <motion.div 
                  className="w-20 h-20 rounded-full shadow-lg border-2 border-white bg-white flex items-center justify-center"
                  whileHover={{ 
                    scale: 1.1,
                    rotate: [0, -5, 5, 0],
                    boxShadow: '0 0 25px rgba(59, 130, 246, 0.8)'
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <img src={logo} alt="Vaigai Sparklers Logo" style={{borderRadius:"100%"}}/>
                </motion.div> */}
                <div className="p-0 rounded-xl inline-block">
                  <img src={logo1} alt="" className="w-[180px] object-contain" />
                </div>
                  <span className={`text-xs transition-colors`}>
                  Premium Sparklers Since 2010
                </span>
              </div>
              
              
              <motion.p 
                className="text-gray-300 leading-relaxed text-sm"
                whileHover={{ color: '#e5e7eb' }}
                transition={{ duration: 0.3 }}
              >
                Founded in the heart of Sivakasi, Tamil Nadu – the Fireworks capital of India – Vaigai Sparklers is a proud manufacturer of high-quality sparklers that light up celebrations across India. Since our humble Beginnings in 2010, we have grown into a trusted name in the Sparklers industry, proudly serving over 10000+ customers in the past 15 years. With a legacy rooted in tradition and a vision focused on safety and innovation, we bring joy, brightness, and brilliance to every festival, function, and moment worth celebrating.
              </motion.p>
               <a href="https://qtskyuunvtliqahyhlrl.supabase.co/storage/v1/object/public/vaigai/vaigai-2025-price-list.pdf" target='_blank' rel="noreferrer">
               <Button 
                size="sm"
                className=" mb-5 bg-gradient-to-r from-red-600 to-orange-500 hover:opacity-90 text-white shadow-lg transition-all duration-300"
                // onClick={() => handleNavClick('contact', '#contact')}
                
              >
                {/* <Sparkles className="h-4 w-4 mr-2" /> */}
                Get Brochure
              </Button>
             </a>
              <div className="flex space-x-4">
                {[
                  { icon: Facebook, href: '#', color: 'hover:text-blue-400' },
                  { icon: Twitter, href: '#', color: 'hover:text-sky-400' },
                  { icon: Instagram, href: '#', color: 'hover:text-pink-400' },
                  { icon: Youtube, href: '#', color: 'hover:text-red-400' }
                ].map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <motion.a
                      key={index}
                      href={social.href}
                      className={`text-gray-400 ${social.color} transition-colors p-2 rounded-full bg-slate-800/50 backdrop-blur-sm border border-gray-700/50`}
                      whileHover={{ 
                        scale: 1.2,
                        y: -3,
                        boxShadow: '0 5px 15px rgba(59, 130, 246, 0.3)'
                      }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <IconComponent className="h-5 w-5" />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>

            {/* Quick Links with enhanced hover effects */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold mb-6">
                <AnimatedGradientText>Quick Links</AnimatedGradientText>
              </h3>
              <ul className="space-y-3">
                {[
                  'Home', 
                  'About Us', 'Contact',
                ].map((link, index) => (
                  <motion.li 
                    key={index}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.a 
                      href={`#${link.toLowerCase().replace(' ', '-')}`}
                      className="text-gray-400 hover:text-blue-400 transition-colors flex items-center group"
                      whileHover={{ color: '#60a5fa' }}
                    >
                      <motion.span
                        className="w-2 h-2 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100"
                        animate={{
                          scale: [1, 1.2, 1]
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity
                        }}
                      />
                      {link}
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Product Categories with hidden scrollbar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold mb-6">
                <AnimatedGradientText>Categories</AnimatedGradientText>
              </h3>
              <ul className="space-y-3 h-60 overflow-y-auto hide-scrollbar rounded-lg">
                {categories.map((category, index) => (
                  <motion.li 
                    key={index}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.a 
                      href="#"
                      className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center group cursor-pointer"
                      whileHover={{ color: '#22d3ee' }}
                      onClick={() => onCategoryClick?.(category.id)}
                    >
                      <motion.span
                        className="w-2 h-2 bg-cyan-500 rounded-full mr-3 opacity-0 group-hover:opacity-100"
                        animate={{
                          scale: [1, 1.2, 1]
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity
                        }}
                      />
                      {category.name}
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info with enhanced design */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold mb-6">
                <AnimatedGradientText>Contact Us</AnimatedGradientText>
              </h3>
              <div className="space-y-4">
                <motion.a
                  href="tel:+919442167677"
                  className="flex items-center space-x-3 p-3 rounded-lg bg-slate-800/30 backdrop-blur-sm border border-gray-700/30 cursor-pointer"
                  whileHover={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.5)',
                    borderColor: 'rgba(59, 130, 246, 0.5)',
                    scale: 1.02
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Phone className="h-5 w-5 text-blue-400" />
                  <div>
                    <p className="text-white font-medium">+91-9442167677</p>
                    <p className="text-gray-400 text-sm">+91-75986 69677</p>
                  </div>
                </motion.a>
                
                <motion.a
                  href="mailto:Vaigaisparklersfactory@gmail.com"
                  className="flex items-center space-x-3 p-3 rounded-lg bg-slate-800/30 backdrop-blur-sm border border-gray-700/30 cursor-pointer"
                  whileHover={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.5)',
                    borderColor: 'rgba(59, 130, 246, 0.5)',
                    scale: 1.02
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Mail className="h-5 w-5 text-cyan-400" />
                  <div>
                    <p className="text-white font-medium">Vaigaisparklersfactory@gmail.com</p>
                    <p className="text-gray-400 text-sm">24/7 Customer Support</p>
                  </div>
                </motion.a>
                
                <motion.a
                  href="https://www.google.com/maps/search/?api=1&query=10+K%2F2%2C+Velayutham+road%2C+RKR+Complex%2C+first+floor%2C+opposite+to+HDFC+bank%2C+Sivakasi%2C+626+123"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start space-x-3 p-3 rounded-lg bg-slate-800/30 backdrop-blur-sm border border-gray-700/30 cursor-pointer"
                  whileHover={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.5)',
                    borderColor: 'rgba(59, 130, 246, 0.5)',
                    scale: 1.02
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <MapPin className="h-5 w-5 text-indigo-400 mt-1" />
                  <div>
                    <p className="text-white font-medium">Address - 10 K/2, Velayutham road, RKR Complex, first floor, opposite to HDFC bank, Sivakasi, 626 123</p>
                  </div>
                </motion.a>
              </div>

              {/* Enhanced Business Hours */}
              <motion.div 
                className="p-4 bg-gradient-to-r from-slate-800/40 to-slate-700/40 rounded-lg border border-blue-500/20 backdrop-blur-sm"
                whileHover={{ 
                  borderColor: 'rgba(59, 130, 246, 0.5)',
                  boxShadow: '0 0 20px rgba(59, 130, 246, 0.2)'
                }}
              >
                <h4 className="font-semibold text-blue-400 mb-2 flex items-center">
                  <motion.span
                    className="w-2 h-2 bg-blue-400 rounded-full mr-2"
                    animate={{
                      opacity: [1, 0.5, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity
                    }}
                  />
                  Business Hours
                </h4>
                <div className="text-sm text-gray-300 space-y-1">
                  <p>Hours - 10:00 - 6:00 from Mon to Sat</p>
                  <p>Festivals: Extended Hours</p>
                </div>
              </motion.div>
            </motion.div>
            
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Separator className="my-12 bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0" />
          </motion.div>

          {/* Enhanced Bottom Footer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
          >
            <div className="text-gray-400 text-sm">
              © {currentYear} Twin Elephant Brand - <AnimatedGradientText>Vaigai Sparklers</AnimatedGradientText>. All rights reserved.
            </div>
            
            <div className="flex flex-wrap gap-6 text-sm">
              {['Privacy Policy', 'Terms of Service', 'Shipping Policy', 'Return Policy'].map((link, index) => (
                <motion.a 
                  key={index}
                  href="#" 
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                  whileHover={{ 
                    color: '#60a5fa',
                    y: -2
                  }}
                >
                  {link}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Enhanced Safety Disclaimer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-8 p-6 bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border border-blue-500/30 rounded-xl backdrop-blur-sm"
          >
            <p className="text-white text-sm text-center">
              <strong className="text-blue-400">Safety Reminder:</strong> Fireworks are explosive devices. Use only as directed, 
              follow all safety instructions, and comply with local laws. Must be 18+ to purchase.
            </p>
          </motion.div>

          {/* Enhanced Company Credentials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            viewport={{ once: true }}
            className="mt-6 text-center"
          >
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              {[
                { text: 'Licensed by Government of Tamil Nadu', color: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30' },
                { text: 'ISO 9001:2015 Certified', color: 'from-green-500/20 to-emerald-500/20 border-green-500/30' },
                { text: 'Est. 2013', color: 'from-cyan-500/20 to-blue-500/20 border-cyan-500/30' }
              ].map((badge, index) => (
                <motion.span 
                  key={index}
                  className={`px-4 py-2 bg-gradient-to-r ${badge.color} rounded-full text-gray-300 border backdrop-blur-sm`}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 5px 15px rgba(59, 130, 246, 0.2)'
                  }}
                  animate={{
                    y: [0, -2, 0]
                  }}
                  transition={{
                    duration: 3,
                    delay: index * 0.5,
                    repeat: Infinity
                  }}
                >
                  {badge.text}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom glow effect */}
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-blue-500/10 to-transparent pointer-events-none" />
      </footer>
    </>
  );
}