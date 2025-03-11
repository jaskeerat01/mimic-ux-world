import React, { useEffect, useState } from "react";
import { Navbar3D } from "@/components/Navbar3D";
import { Hero3D } from "@/components/Hero3D";
import { About3D } from "@/components/About3D";
import { Features3D } from "@/components/Features3D";
import { Contact3D } from "@/components/Contact3D";
import { Footer3D } from "@/components/Footer3D";
import { ParticleBackground } from "@/components/ParticleBackground";
import { motion, AnimatePresence } from "framer-motion";

const Index = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorHover, setCursorHover] = useState(false);

  useEffect(() => {
    // Initialize global mouse positions
    window.mouseX = 0;
    window.mouseY = 0;
    
    // Mouse tracker for cursor effect
    const updateMousePosition = (e) => {
      window.mouseX = e.clientX;
      window.mouseY = e.clientY;
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', updateMousePosition);
    
    // Check for hoverable elements
    const handleElementHover = () => {
      document.querySelectorAll('a, button, input, textarea, .hover-trigger').forEach(el => {
        el.addEventListener('mouseenter', () => setCursorHover(true));
        el.addEventListener('mouseleave', () => setCursorHover(false));
      });
    };
    
    handleElementHover();
    
    // Smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (href) {
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth'
            });
          }
        }
      });
    });
    
    // Scroll position tracking for parallax and section detection
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
      
      // Determine active section for animation triggers
      const sections = ["home", "about", "features", "contact"];
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            setActiveSection(section);
          }
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Preload WebGL context
    const preloadWebGL = () => {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (gl) {
        console.log('WebGL preloaded successfully');
      }
    };
    
    preloadWebGL();
    
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('scroll', handleScroll);
      
      document.querySelectorAll('a, button, input, textarea, .hover-trigger').forEach(el => {
        el.removeEventListener('mouseenter', () => setCursorHover(true));
        el.removeEventListener('mouseleave', () => setCursorHover(false));
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-corp-dark overflow-hidden">
      {/* Custom Cursor */}
      <motion.div 
        className={`custom-cursor ${cursorHover ? 'hover' : ''}`}
        animate={{
          x: cursorPosition.x,
          y: cursorPosition.y,
          scale: cursorHover ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 200,
          mass: 0.5,
        }}
      />
      
      {/* Animated Cursor Light Effect */}
      <motion.div 
        className="cursor-glow fixed w-[300px] h-[300px] rounded-full pointer-events-none mix-blend-screen opacity-20 z-0 bg-corp-cyan blur-[100px] hidden md:block" 
        animate={{
          x: cursorPosition.x - 150,
          y: cursorPosition.y - 150,
          opacity: [0.2, 0.3, 0.2],
          scale: [1, 1.1, 1],
        }}
        transition={{
          x: { type: "spring", damping: 30, stiffness: 200 },
          y: { type: "spring", damping: 30, stiffness: 200 },
          opacity: { duration: 2, repeat: Infinity },
          scale: { duration: 3, repeat: Infinity },
        }}
      />
      
      {/* Particle Background */}
      <ParticleBackground intensity={scrollPosition > 500 ? 0.6 : 1} />
      
      {/* Section Indicator */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 space-y-4 z-50 hidden lg:block">
        {["home", "about", "features", "contact"].map((section) => (
          <motion.a
            key={section}
            href={`#${section}`}
            className="w-2 h-2 block rounded-full border border-corp-cyan/30 hover-trigger"
            animate={{ 
              scale: activeSection === section ? 1.5 : 1,
              backgroundColor: activeSection === section ? 'rgba(0, 255, 255, 0.5)' : 'transparent'
            }}
            whileHover={{ scale: 1.8 }}
          />
        ))}
      </div>
      
      {/* Main Content */}
      <Navbar3D scrollPosition={scrollPosition} />
      <main>
        <Hero3D />
        <About3D />
        <Features3D />
        <Contact3D />
      </main>
      <Footer3D />
      
      {/* Ambient Noise Audio (muted by default) */}
      <audio id="ambient-sound" loop preload="auto">
        <source src="https://assets.mixkit.co/sfx/preview/mixkit-futuristic-technology-hum-2127.mp3" type="audio/mp3" />
      </audio>
      
      {/* Sound Toggle */}
      <motion.button
        className="fixed bottom-6 left-6 z-50 w-10 h-10 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/70 hover:text-corp-cyan hover:border-corp-cyan/50 transition-colors duration-300 hover-trigger"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          const audio = document.getElementById('ambient-sound');
          if (audio) {
            if (audio.paused) {
              audio.volume = 0.1;
              audio.play();
            } else {
              audio.pause();
            }
          }
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
        </svg>
      </motion.button>
    </div>
  );
};

export default Index;
