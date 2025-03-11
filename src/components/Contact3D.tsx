
import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Mail, Phone, MapPin } from 'lucide-react';

export function Contact3D() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  
  // Form state
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  // Handle input focus state for animations
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleFocus = (inputName: string) => {
    setFocusedInput(inputName);
  };
  
  const handleBlur = () => {
    setFocusedInput(null);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formState);
    // Here you would normally send the form data to a server
    
    // Reset form
    setFormState({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <section
      id="contact"
      className="py-20 md:py-32 relative overflow-hidden"
      ref={ref}
    >
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-3 py-1 mb-2 text-xs tracking-widest uppercase bg-white/5 border border-corp-cyan/20 rounded-full text-corp-cyan">
              Contact us
            </span>
            
            <h2 className="heading-lg text-white mb-6">
              Let's create something<br />
              <span className="text-corp-cyan glow-text">exceptional together</span>
            </h2>
            
            <p className="text-white/70 mb-8">
              We're always open to discuss new projects, creative ideas or
              opportunities to be part of your vision.
            </p>
            
            <div className="space-y-6">
              <motion.div 
                className="flex items-start space-x-4"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex-shrink-0 mt-1">
                  <div className="p-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full">
                    <Mail className="h-5 w-5 text-corp-cyan" />
                  </div>
                </div>
                <div>
                  <div className="text-sm text-white/70 mb-1">Email</div>
                  <a href="mailto:hello@incognita.com" className="text-white hover:text-corp-cyan transition-colors">
                    hello@incognita.com
                  </a>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-start space-x-4"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="flex-shrink-0 mt-1">
                  <div className="p-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full">
                    <Phone className="h-5 w-5 text-corp-cyan" />
                  </div>
                </div>
                <div>
                  <div className="text-sm text-white/70 mb-1">Phone</div>
                  <a href="tel:+12345678900" className="text-white hover:text-corp-cyan transition-colors">
                    +1 (234) 567-8900
                  </a>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-start space-x-4"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="flex-shrink-0 mt-1">
                  <div className="p-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full">
                    <MapPin className="h-5 w-5 text-corp-cyan" />
                  </div>
                </div>
                <div>
                  <div className="text-sm text-white/70 mb-1">Address</div>
                  <address className="not-italic text-white">
                    1234 Design Street<br />
                    San Francisco, CA 94103
                  </address>
                </div>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            {/* Glassmorphism container */}
            <div className="glass relative z-10 overflow-hidden">
              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="space-y-4">
                  <div className="relative">
                    <label htmlFor="name" className="block text-sm text-white/80 mb-2">
                      Your Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleInputChange}
                        onFocus={() => handleFocus('name')}
                        onBlur={handleBlur}
                        className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-corp-cyan/50 transition-all duration-300"
                        placeholder="John Doe"
                      />
                      
                      {/* Animated glow effect on focus */}
                      <motion.div 
                        className="absolute inset-0 rounded-lg pointer-events-none"
                        animate={{ 
                          boxShadow: focusedInput === 'name' 
                            ? '0 0 15px rgba(0, 255, 255, 0.3)' 
                            : '0 0 0px rgba(0, 255, 255, 0)'
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>
                  
                  <div className="relative">
                    <label htmlFor="email" className="block text-sm text-white/80 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleInputChange}
                        onFocus={() => handleFocus('email')}
                        onBlur={handleBlur}
                        className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-corp-cyan/50 transition-all duration-300"
                        placeholder="john@example.com"
                      />
                      
                      {/* Animated glow effect on focus */}
                      <motion.div 
                        className="absolute inset-0 rounded-lg pointer-events-none"
                        animate={{ 
                          boxShadow: focusedInput === 'email' 
                            ? '0 0 15px rgba(0, 255, 255, 0.3)' 
                            : '0 0 0px rgba(0, 255, 255, 0)'
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>
                  
                  <div className="relative">
                    <label htmlFor="message" className="block text-sm text-white/80 mb-2">
                      Your Message
                    </label>
                    <div className="relative">
                      <textarea
                        id="message"
                        name="message"
                        value={formState.message}
                        onChange={handleInputChange}
                        onFocus={() => handleFocus('message')}
                        onBlur={handleBlur}
                        rows={5}
                        className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-corp-cyan/50 transition-all duration-300 resize-none"
                        placeholder="Tell us about your project..."
                      />
                      
                      {/* Animated glow effect on focus */}
                      <motion.div 
                        className="absolute inset-0 rounded-lg pointer-events-none"
                        animate={{ 
                          boxShadow: focusedInput === 'message' 
                            ? '0 0 15px rgba(0, 255, 255, 0.3)' 
                            : '0 0 0px rgba(0, 255, 255, 0)'
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>
                </div>
                
                <motion.button
                  type="submit"
                  className="cyber-button group inline-flex items-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </motion.button>
              </form>
            </div>
            
            {/* Abstract background shapes */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-corp-cyan/10 rounded-full blur-[80px] z-0"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
