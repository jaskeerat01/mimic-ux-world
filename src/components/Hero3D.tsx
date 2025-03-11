
import React, { useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Globe3D } from '@/components/Globe3D';
import { SmoothScrollLink } from '@/components/ui/motion';
import { ArrowRight } from 'lucide-react';

export function Hero3D() {
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    controls.start('visible');
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const { clientX, clientY } = e;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      
      // Calculate mouse position percentage relative to container
      const x = (clientX - left) / width - 0.5;
      const y = (clientY - top) / height - 0.5;
      
      // Apply parallax effect to container children
      const elements = containerRef.current.querySelectorAll('.parallax-element');
      elements.forEach((el, i) => {
        const htmlEl = el as HTMLElement;
        const depth = parseFloat(htmlEl.getAttribute('data-depth') || '0.05');
        const translateX = x * 100 * depth;
        const translateY = y * 100 * depth;
        
        htmlEl.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [controls]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0,
      y: 20 
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, -0.01, 0.9],
      }
    },
  };

  const floatingElements = [
    { 
      top: '20%', 
      left: '10%', 
      content: '[ INCOGNITA CORP ]', 
      depth: 0.08,
      delay: 0.2
    },
    { 
      top: '30%', 
      right: '15%', 
      content: '< INNOVATION >', 
      depth: 0.12,
      delay: 0.3
    },
    { 
      bottom: '25%', 
      left: '15%', 
      content: '# FUTURE', 
      depth: 0.1,
      delay: 0.4
    },
    { 
      bottom: '35%', 
      right: '10%', 
      content: '{ DIGITAL }', 
      depth: 0.14,
      delay: 0.5
    },
  ];

  return (
    <section 
      id="home" 
      className="min-h-screen flex flex-col justify-center relative overflow-hidden"
      ref={containerRef}
    >
      <div className="section-container flex flex-col justify-center items-center text-center relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants}>
            <span className="inline-block px-4 py-1 mb-8 text-xs tracking-widest uppercase bg-white/5 border border-corp-cyan/20 rounded-full text-corp-cyan">
              Welcome to the future
            </span>
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="heading-xl mb-6 text-white">
            <span className="block">Crafting digital</span>
            <span className="block font-light text-corp-cyan glow-text">experiences that matter</span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-white/70 max-w-2xl mx-auto mb-12 text-lg">
            We create unique digital solutions that are thoughtfully designed, 
            meticulously crafted, and engineered to perform at the highest level.
          </motion.p>
          
          <motion.div variants={itemVariants}>
            <SmoothScrollLink
              to="#about"
              className="cyber-button inline-flex items-center"
            >
              Discover more
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </SmoothScrollLink>
          </motion.div>
        </motion.div>
      </div>
      
      {/* 3D Globe */}
      <div className="absolute inset-0 flex items-center justify-center z-0 opacity-80">
        <div className="w-full max-w-2xl aspect-square">
          <Globe3D />
        </div>
      </div>
      
      {/* Floating interface elements */}
      {floatingElements.map((el, index) => (
        <motion.div
          key={index}
          className="absolute hidden md:block parallax-element"
          style={{
            top: el.top,
            left: el.left,
            right: el.right,
            bottom: el.bottom,
          }}
          data-depth={el.depth}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: el.delay, duration: 1 }}
        >
          <div className="px-4 py-2 bg-corp-dark/80 backdrop-blur-sm border border-corp-cyan/30 rounded-md">
            <span className="text-corp-cyan text-xs md:text-sm tracking-wider">
              {el.content}
            </span>
          </div>
        </motion.div>
      ))}
      
      {/* Minimal background glow */}
      <div className="absolute bottom-[-300px] left-1/2 transform -translate-x-1/2 w-[600px] h-[600px] bg-cyan-glow opacity-20"></div>
      
      {/* Bottom indicator */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center">
        <motion.div 
          className="h-14 w-[1px] bg-gradient-to-b from-transparent to-corp-cyan/40"
          animate={{ 
            scaleY: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </section>
  );
}
