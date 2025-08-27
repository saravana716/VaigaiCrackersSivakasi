import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle, 
  AlertCircle,
  User,
  MessageSquare,
  Building,
  Calendar,
  Star,
  Award,
  Shield,
  Sparkles,
  Users,
  Globe,
  Headphones
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import logoImage from '../assets/download.jpeg';


interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
  inquiryType: string;
  eventDate: string;
}

// Floating particles animation
const FloatingParticle = ({ delay = 0, size = 4, color = "bg-yellow-400" }) => (
  <motion.div
    className={`absolute ${color} rounded-full ${size === 4 ? 'w-1 h-1' : 'w-2 h-2'} opacity-60`}
    animate={{
      y: [-20, -80],
      x: [0, Math.random() * 30 - 15],
      opacity: [0.6, 0]
    }}
    transition={{
      duration: 3,
      delay,
      repeat: Infinity,
      ease: "easeOut"
    }}
    style={{
      left: `${Math.random() * 100}%`,
      bottom: 0
    }}
  />
);

export function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    inquiryType: '',
    eventDate: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: '',
        inquiryType: '',
        eventDate: ''
      });
    }, 5000);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      subtitle: "Speak directly with our experts",
      details: ["+91-9876543210", "+91-9876543211"],
      color: "from-blue-500 to-cyan-500",
      iconBg: "bg-blue-500"
    },
    {
      icon: Mail,
      title: "Email Us",
      subtitle: "Send us your detailed requirements",
      details: ["info@twinelephant.com", "sales@twinelephant.com"],
      color: "from-red-500 to-pink-500",
      iconBg: "bg-red-500"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      subtitle: "Come see our manufacturing facility",
      details: ["123 Fireworks Street", "Sivakasi, Tamil Nadu 626123"],
      color: "from-orange-500 to-red-500",
      iconBg: "bg-orange-500"
    },
    {
      icon: Clock,
      title: "Business Hours",
      subtitle: "We're here when you need us",
      details: ["Mon - Sat: 9:00 AM - 6:00 PM", "Sun: 10:00 AM - 4:00 PM"],
      color: "from-purple-500 to-blue-500",
      iconBg: "bg-purple-500"
    }
  ];

  const companyStats = [
    { icon: Calendar, value: "50+", label: "Years Experience", color: "text-orange-400" },
    { icon: Users, value: "10K+", label: "Happy Customers", color: "text-blue-400" },
    { icon: Star, value: "4.9", label: "Customer Rating", color: "text-yellow-400" },
    { icon: Globe, value: "15+", label: "States Served", color: "text-green-400" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Floating Background Particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <FloatingParticle 
            key={i} 
            delay={i * 0.3} 
            size={Math.random() > 0.7 ? 8 : 4}
            color={`bg-${['yellow', 'orange', 'red', 'blue', 'purple', 'pink'][Math.floor(Math.random() * 6)]}-400`}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        <div className="container mx-auto max-w-6xl">
          {/* Logo with Glowing Effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center mb-8"
          >
            <div className="relative">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-full opacity-30 blur-2xl"
                animate={{ 
                  scale: [1, 1.3, 1], 
                  rotate: [0, 180, 360] 
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <div className="relative bg-white/10 backdrop-blur-md p-8 rounded-full shadow-2xl border border-white/20">
                <img 
                  src={logoImage} 
                  alt="Twin Elephant Brand" 
                  className="h-20 w-20 object-contain"
                />
              </div>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent leading-tight">
              Let's Create Magic Together
            </h1>
            <p className="text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Connect with Twin Elephant Brand and let us help you light up your celebrations with premium fireworks
            </p>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {[
              { icon: Award, text: "ISO Certified", gradient: "from-yellow-400 to-orange-500" },
              { icon: Shield, text: "Safety Guaranteed", gradient: "from-blue-400 to-cyan-500" },
              { icon: Sparkles, text: "Premium Quality", gradient: "from-purple-400 to-pink-500" },
              { icon: Headphones, text: "24/7 Support", gradient: "from-green-400 to-emerald-500" }
            ].map((badge, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Badge className={`bg-gradient-to-r ${badge.gradient} text-white px-6 py-3 text-sm font-medium shadow-lg border-none`}>
                  <badge.icon className="w-4 h-4 mr-2" />
                  {badge.text}
                </Badge>
              </motion.div>
            ))}
          </motion.div>

          {/* Company Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {companyStats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center"
              >
                <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-xl hover:shadow-2xl transition-all">
                  <CardContent className="p-6">
                    <stat.icon className={`h-8 w-8 ${stat.color} mx-auto mb-3`} />
                    <div className={`text-3xl font-bold ${stat.color} mb-1`}>
                      {stat.value}
                    </div>
                    <div className="text-gray-300 text-sm">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Form - Takes 3 columns */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-3"
            >
              <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-2xl overflow-hidden">
                {/* Form Header */}
                <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 p-8">
                  <h2 className="text-3xl font-bold text-white mb-2 flex items-center">
                    <MessageSquare className="mr-3 h-8 w-8" />
                    Send Us a Message
                  </h2>
                  <p className="text-red-100">Tell us about your celebration needs and we'll help you create something amazing</p>
                </div>

                <CardContent className="p-8">
                  <AnimatePresence mode="wait">
                    {isSubmitted ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="text-center py-16"
                      >
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1 }}
                        >
                          <CheckCircle className="h-20 w-20 text-green-400 mx-auto mb-6" />
                        </motion.div>
                        <h3 className="text-3xl font-bold text-white mb-4">Message Sent Successfully!</h3>
                        <p className="text-gray-300 text-lg mb-6">
                          Thank you for reaching out to us. Our team will get back to you within 24 hours.
                        </p>
                        <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 max-w-md mx-auto">
                          <p className="text-green-300 text-sm">
                            ✨ We've received your inquiry and will contact you soon with personalized recommendations!
                          </p>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="form"
                        onSubmit={handleSubmit}
                        className="space-y-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        {/* Personal Information Row */}
                        <div className="grid md:grid-cols-2 gap-6">
                          <motion.div
                            className="space-y-3"
                            whileFocus={{ scale: 1.02 }}
                          >
                            <Label className="text-black font-medium flex items-center">
                              <User className="w-4 h-4 mr-2 text-blue-400" />
                              Full Name *
                            </Label>
                            <div className="relative">
                              <Input
                                value={formData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                onFocus={() => setFocusedField('name')}
                                onBlur={() => setFocusedField(null)}
                                placeholder="Enter your full name"
                                required
                                className="bg-white/10 border-gray/50 text-black placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400/50 backdrop-blur-sm transition-all"
                              />
                              {focusedField === 'name' && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                >
                                  <Sparkles className="w-4 h-4 text-blue-400" />
                                </motion.div>
                              )}
                            </div>
                          </motion.div>

                          <motion.div
                            className="space-y-3"
                            whileFocus={{ scale: 1.02 }}
                          >
                            <Label className="text-black font-medium flex items-center">
                              <Mail className="w-4 h-4 mr-2 text-red-400" />
                              Email Address *
                            </Label>
                            <div className="relative">
                              <Input
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                onFocus={() => setFocusedField('email')}
                                onBlur={() => setFocusedField(null)}
                                placeholder="your.email@example.com"
                                required
                                className="bg-white/10 border-gray/50 text-black placeholder:text-gray-400 focus:border-red-400 focus:ring-red-400/50 backdrop-blur-sm transition-all"
                              />
                              {focusedField === 'email' && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                >
                                  <Sparkles className="w-4 h-4 text-red-400" />
                                </motion.div>
                              )}
                            </div>
                          </motion.div>
                        </div>

                        {/* Contact & Company Row */}
                        <div className="grid md:grid-cols-2 gap-6">
                          <motion.div
                            className="space-y-3"
                            whileFocus={{ scale: 1.02 }}
                          >
                            <Label className="text-black font-medium flex items-center">
                              <Phone className="w-4 h-4 mr-2 text-green-400" />
                              Phone Number *
                            </Label>
                            <Input
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => handleInputChange('phone', e.target.value)}
                              placeholder="+91-9876543210"
                              required
                              className="bg-white/10 border-gray/50 text-black placeholder:text-gray-400 focus:border-green-400 focus:ring-green-400/50 backdrop-blur-sm transition-all"
                            />
                          </motion.div>

                          <motion.div
                            className="space-y-3"
                            whileFocus={{ scale: 1.02 }}
                          >
                            <Label className="text-black font-medium flex items-center">
                              <Building className="w-4 h-4 mr-2 text-purple-400" />
                              Company/Organization
                            </Label>
                            <Input
                              value={formData.company}
                              onChange={(e) => handleInputChange('company', e.target.value)}
                              placeholder="Your company name (optional)"
                              className="bg-white/10 border-gray/50 text-black placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/50 backdrop-blur-sm transition-all"
                            />
                          </motion.div>
                        </div>

                        {/* Inquiry Type & Event Date Row */}
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <Label className="text-black font-medium">
                              Inquiry Type *
                            </Label>
                            <Select
                              value={formData.inquiryType}
                              onValueChange={(value) => handleInputChange('inquiryType', value)}
                              required
                            >
                              <SelectTrigger className="bg-white/10 border-gray/50 text-black focus:border-orange-400 focus:ring-orange-400/50 backdrop-blur-sm">
                                <SelectValue placeholder="What can we help you with?" />
                              </SelectTrigger>
                              <SelectContent className="bg-gray-800 border-gray-600">
                                <SelectItem value="wedding">Wedding Celebrations</SelectItem>
                                <SelectItem value="corporate">Corporate Events</SelectItem>
                                <SelectItem value="festival">Festival Celebrations</SelectItem>
                                <SelectItem value="bulk">Bulk Orders</SelectItem>
                                <SelectItem value="wholesale">Wholesale Inquiry</SelectItem>
                                <SelectItem value="product">Product Information</SelectItem>
                                <SelectItem value="safety">Safety Guidelines</SelectItem>
                                <SelectItem value="support">Customer Support</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-3">
                            <Label className="text-black font-medium flex items-center">
                              <Calendar className="w-4 h-4 mr-2 text-yellow-400" />
                              Event Date (if applicable)
                            </Label>
                            <Input
                              type="date"
                              value={formData.eventDate}
                              onChange={(e) => handleInputChange('eventDate', e.target.value)}
                              className="bg-white/10 border-gray/50 text-black focus:border-yellow-400 focus:ring-yellow-400/50 backdrop-blur-sm transition-all"
                            />
                          </div>
                        </div>

                        {/* Subject Row */}
                        <div className="space-y-3">
                          <Label className="text-black font-medium">
                            Subject *
                          </Label>
                          <Input
                            value={formData.subject}
                            onChange={(e) => handleInputChange('subject', e.target.value)}
                            placeholder="Brief subject of your inquiry"
                            required
                            className="bg-white/10 border-gray/50 text-black placeholder:text-gray-400 focus:border-cyan-400 focus:ring-cyan-400/50 backdrop-blur-sm transition-all"
                          />
                        </div>

                        {/* Message Row */}
                        <div className="space-y-3">
                          <Label className="text-white font-medium">
                            Message *
                          </Label>
                          <Textarea
                            value={formData.message}
                            onChange={(e) => handleInputChange('message', e.target.value)}
                            placeholder="Tell us about your celebration plans, requirements, budget, guest count, or any specific questions you have. The more details you provide, the better we can help you!"
                            rows={6}
                            required
                            className="bg-white/10 border-gray/50 text-black placeholder:text-gray-400 focus:border-pink-400 focus:ring-pink-400/50 backdrop-blur-sm transition-all resize-none"
                          />
                        </div>

                        {/* Submit Button */}
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:from-orange-600 hover:via-red-600 hover:to-pink-600 text-white font-bold py-4 text-lg shadow-2xl border-none transition-all duration-300"
                          >
                            {isSubmitting ? (
                              <div className="flex items-center justify-center">
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                  className="h-6 w-6 border-2 border-white border-t-transparent rounded-full mr-3"
                                />
                                Sending Your Message...
                              </div>
                            ) : (
                              <>
                                <Send className="mr-3 h-6 w-6" />
                                Send Message & Get Quote
                              </>
                            )}
                          </Button>
                        </motion.div>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information - Takes 2 columns */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:col-span-2 space-y-8"
            >
              {/* Section Header */}
              <div className="text-center lg:text-left">
                <h2 className="text-4xl font-bold text-white mb-4">
                  Get in Touch
                </h2>
                <p className="text-gray-300 text-lg">
                  Multiple ways to reach us for your convenience
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                      whileHover={{ scale: 1.03, y: -5 }}
                      className="group"
                    >
                      <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-4">
                            <motion.div
                              className={`p-4 rounded-xl ${info.iconBg} shadow-lg group-hover:scale-110 transition-transform`}
                              whileHover={{ rotate: 15 }}
                            >
                              <Icon className="h-6 w-6 text-white" />
                            </motion.div>
                            <div className="flex-1">
                              <h3 className="text-xl font-bold text-gray-700 mb-1">
                                {info.title}
                              </h3>
                              <p className="text-gray-400 text-sm mb-3">
                                {info.subtitle}
                              </p>
                              <div className="space-y-1">
                                {info.details.map((detail, i) => (
                                  <p key={i} className="text-gray-300 font-medium">
                                    {detail}
                                  </p>
                                ))}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>

              {/* Emergency Contact */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                whileHover={{ scale: 1.03, y: -5 }}
              >
                <Card className="bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-2xl border-none overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                    <motion.div
  animate={{ scale: [1, 1.2, 1] }}
  transition={{ duration: 2, repeat: Infinity }}
>
  <AlertCircle className="h-10 w-10 text-white" />
</motion.div>
                      <div>
                        <h3 className="text-xl font-bold mb-1">
                          Emergency Support
                        </h3>
                        <p className="text-red-100 font-medium text-lg">
                          📞 +91-9876543299
                        </p>
                        <p className="text-red-100 text-sm">
                          24/7 for urgent safety concerns & technical support
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Company Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <Card className="bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-2xl border-none overflow-hidden">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-3 flex items-center">
                      <Star className="h-6 w-6 mr-2 text-yellow-400" />
                      Twin Elephant Brand - Vijai Sparklers
                    </h3>
                    <p className="text-blue-100 mb-3 leading-relaxed">
                      Established in 1970, we are one of India's leading fireworks manufacturers based in Sivakasi, Tamil Nadu. 
                      Trusted by thousands of customers for over five decades.
                    </p>
                    <div className="space-y-2">
                      <p className="text-blue-100 flex items-center">
                        <Shield className="h-4 w-4 mr-2" />
                        Licensed by Government of Tamil Nadu
                      </p>
                      <p className="text-blue-100 flex items-center">
                        <Award className="h-4 w-4 mr-2" />
                        ISO 9001:2015 Certified
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}