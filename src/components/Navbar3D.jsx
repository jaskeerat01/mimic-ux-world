
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SmoothScrollLink } from '@/components/ui/motion';
import { Menu, X } from 'lucide-react';

export function Navbar3D() {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show navbar after scrolling down a bit
      const scrollPosition = window.scrollY;
      
      if (scrollPosition > 100) {
        setIsVisible(true);
        
        if (scrollPosition > 200) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      } else {
        setIsVisible(false);
        setIsScrolled(false);
      }
    };

    // Show navbar on hover near top of screen
    const handleMouseNearTop = (e: MouseEvent) => {
      if (e.clientY < 100) {
        setIsVisible(true);
      } else if (!isScrolled && e.clientY > 200) {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseNearTop);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseNearTop);
    };
  }, [isScrolled]);

  const navVariants = {
    hidden: { 
      y: '-100%',
      opacity: 0
    },
    visible: { 
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20
      }
    }
  };

  const navItems = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#features', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <AnimatePresence>
      {(isVisible || isMobileMenuOpen) && (
        <motion.header
          className={`fixed top-0 left-0 right-0 z-50 ${isScrolled ? 'glass' : 'bg-transparent'}`}
          variants={navVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <div className="container mx-auto px-6 py-4">
            <nav className="flex items-center justify-between">
              <div className="flex items-center">
                <a href="#" className="text-2xl font-aeroport font-light tracking-widest text-white">
                  <span className="text-corp-cyan glow-text">IN</span>COGNITA
                </a>
              </div>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center space-x-8">
                {navItems.map((item) => (
                  <SmoothScrollLink
                    key={item.href}
                    to={item.href}
                    className="nav-link"
                  >
                    {item.label}
                  </SmoothScrollLink>
                ))}
              </div>

              {/* Mobile Menu Toggle */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="text-white p-2"
                >
                  {isMobileMenuOpen ? (
                    <X size={24} className="text-corp-cyan" />
                  ) : (
                    <Menu size={24} />
                  )}
                </button>
              </div>
            </nav>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                className="md:hidden glass"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="container mx-auto px-6 py-4 space-y-4">
                  {navItems.map((item) => (
                    <SmoothScrollLink
                      key={item.href}
                      to={item.href}
                      className="block nav-link py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </SmoothScrollLink>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
