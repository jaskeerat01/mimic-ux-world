
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Twitter, Instagram, ExternalLink, Plus } from 'lucide-react';

export function Footer3D() {
  const currentYear = new Date().getFullYear();
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const socialLinks = [
    { icon: <Github size={18} />, url: '#github', label: 'GitHub', color: '#333' },
    { icon: <Linkedin size={18} />, url: '#linkedin', label: 'LinkedIn', color: '#0077b5' },
    { icon: <Twitter size={18} />, url: '#twitter', label: 'Twitter', color: '#1da1f2' },
    { icon: <Instagram size={18} />, url: '#instagram', label: 'Instagram', color: '#e1306c' },
  ];
  
  const footerLinks = [
    { label: 'About', url: '#about' },
    { label: 'Projects', url: '#features' },
    { label: 'Contact', url: '#contact' },
    { label: 'Privacy Policy', url: '#privacy' },
    { label: 'Terms of Service', url: '#terms' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setIsSubmitted(true);
      setTimeout(() => {
        setNewsletterEmail('');
        setIsSubmitted(false);
      }, 3000);
    }
  };

  return (
    <footer className="py-16 relative overflow-hidden border-t border-white/10">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <a href="#" className="text-2xl font-aeroport font-light tracking-widest text-white mb-4 inline-block group perspective">
              <span className="relative inline-block text-corp-cyan glow-text group-hover:animate-pulse transition-all duration-1000">IN</span>
              <motion.span 
                className="relative inline-block"
                animate={{ rotateY: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              >COGNITA</motion.span>
            </a>
            <p className="text-white/70 mb-6">
              Crafting exceptional digital experiences 
              for forward-thinking organizations.
            </p>
            
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  aria-label={link.label}
                  className="p-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-white/70 hover:text-corp-cyan hover:border-corp-cyan/50 transition-colors duration-300 relative"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  onHoverStart={() => setHoveredSocial(link.label)}
                  onHoverEnd={() => setHoveredSocial(null)}
                >
                  {link.icon}
                  <AnimatePresence>
                    {hoveredSocial === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md px-2 py-1 rounded text-xs whitespace-nowrap"
                      >
                        {link.label}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-white text-lg mb-4">Navigation</h3>
            <ul className="space-y-2">
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <motion.a 
                    href={link.url}
                    className="text-white/70 hover:text-corp-cyan transition-colors duration-300 flex items-center group"
                    whileHover={{ x: 5 }}
                  >
                    <span className="opacity-0 group-hover:opacity-100 mr-2 text-corp-cyan transition-opacity duration-300">
                      <ExternalLink size={12} />
                    </span>
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
            
            {/* Interactive 3D Toggle Grid */}
            <div className="mt-6 grid grid-cols-4 gap-2">
              {Array.from({ length: 16 }).map((_, index) => (
                <motion.div
                  key={index}
                  className="w-full aspect-square bg-white/5 rounded-sm"
                  whileHover={{ 
                    backgroundColor: "rgba(0, 255, 255, 0.2)",
                    scale: 1.1,
                    rotate: Math.random() * 20 - 10
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-white text-lg mb-4">Subscribe to our newsletter</h3>
            <p className="text-white/70 mb-4">
              Stay updated with our latest projects and innovations.
            </p>
            
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="relative perspective">
                <input
                  type="email"
                  placeholder="Your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-corp-cyan/50 transition-all duration-300"
                />
                <div className="absolute inset-0 rounded-lg shadow-md pointer-events-none opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
              </div>
              
              <motion.button
                type="submit"
                className="w-full px-4 py-2 bg-corp-cyan/20 border border-corp-cyan/50 text-corp-cyan rounded-lg hover:bg-corp-cyan/30 transition-colors duration-300 relative overflow-hidden group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitted}
              >
                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.span
                      key="submitted"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      className="flex items-center justify-center"
                    >
                      Thanks for subscribing!
                    </motion.span>
                  ) : (
                    <motion.span
                      key="subscribe"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      className="flex items-center justify-center"
                    >
                      Subscribe
                      <Plus className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.span>
                  )}
                </AnimatePresence>
                
                {/* Animated background effect */}
                <motion.div
                  className="absolute inset-0 bg-corp-cyan/10"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.4 }}
                />
              </motion.button>
            </form>
            
            {/* Animated decorative element */}
            <div className="mt-8 relative h-12">
              <motion.div
                className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-corp-cyan/50 to-transparent"
                animate={{
                  opacity: [0.3, 0.8, 0.3],
                  scaleX: [0.8, 1, 0.8]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute bottom-0 right-0 w-24 h-[1px] bg-corp-cyan/30"
                animate={{
                  width: ["30%", "80%", "30%"]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />
              <motion.div
                className="absolute top-4 left-8 w-2 h-2 rounded-full bg-corp-cyan/50"
                animate={{
                  x: [0, 100, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <div className="text-white/50 text-sm mb-4 md:mb-0">
            © {currentYear} INCOGNITA. All rights reserved.
          </div>
          
          <div className="text-white/50 text-sm">
            <motion.span
              initial={{ backgroundPosition: "0% 50%" }}
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(90deg, rgba(255,255,255,0.5) 0%, rgba(0,255,255,0.5) 50%, rgba(255,255,255,0.5) 100%)" }}
            >
              Designed with precision. Built with passion.
            </motion.span>
          </div>
        </div>
      </div>
      
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-corp-cyan/5 rounded-full blur-[100px] pointer-events-none"></div>
      
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-corp-cyan/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              y: [0, -100],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>
    </footer>
  );
}
