
import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Instagram } from 'lucide-react';

export function Footer3D() {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: <Github size={18} />, url: '#github', label: 'GitHub' },
    { icon: <Linkedin size={18} />, url: '#linkedin', label: 'LinkedIn' },
    { icon: <Twitter size={18} />, url: '#twitter', label: 'Twitter' },
    { icon: <Instagram size={18} />, url: '#instagram', label: 'Instagram' },
  ];
  
  const footerLinks = [
    { label: 'About', url: '#about' },
    { label: 'Projects', url: '#features' },
    { label: 'Contact', url: '#contact' },
    { label: 'Privacy Policy', url: '#privacy' },
    { label: 'Terms of Service', url: '#terms' },
  ];

  return (
    <footer className="py-16 relative overflow-hidden border-t border-white/10">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <a href="#" className="text-2xl font-aeroport font-light tracking-widest text-white mb-4 inline-block">
              <span className="text-corp-cyan glow-text">IN</span>COGNITA
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
                  className="p-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-white/70 hover:text-corp-cyan hover:border-corp-cyan/50 transition-colors duration-300"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-white text-lg mb-4">Navigation</h3>
            <ul className="space-y-2">
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.url}
                    className="text-white/70 hover:text-corp-cyan transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-white text-lg mb-4">Subscribe to our newsletter</h3>
            <p className="text-white/70 mb-4">
              Stay updated with our latest projects and innovations.
            </p>
            
            <form className="flex space-x-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-corp-cyan/50"
              />
              <motion.button
                type="submit"
                className="px-4 py-2 bg-corp-cyan/20 border border-corp-cyan/50 text-corp-cyan rounded-lg hover:bg-corp-cyan/30 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <div className="text-white/50 text-sm mb-4 md:mb-0">
            © {currentYear} INCOGNITA. All rights reserved.
          </div>
          
          <div className="text-white/50 text-sm">
            Designed with precision. Built with passion.
          </div>
        </div>
      </div>
      
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-corp-cyan/5 rounded-full blur-[100px] pointer-events-none"></div>
    </footer>
  );
}
