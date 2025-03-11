
import React, { useEffect } from "react";
import { Navbar3D } from "@/components/Navbar3D";
import { Hero3D } from "@/components/Hero3D";
import { About3D } from "@/components/About3D";
import { Features3D } from "@/components/Features3D";
import { Contact3D } from "@/components/Contact3D";
import { Footer3D } from "@/components/Footer3D";
import { ParticleBackground } from "@/components/ParticleBackground";

const Index = () => {
  useEffect(() => {
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
    
    // Preload WebGL context
    const preloadWebGL = () => {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (gl) {
        console.log('WebGL preloaded successfully');
      }
    };
    
    preloadWebGL();
  }, []);

  return (
    <div className="min-h-screen bg-corp-dark overflow-hidden">
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Main Content */}
      <Navbar3D />
      <main>
        <Hero3D />
        <About3D />
        <Features3D />
        <Contact3D />
      </main>
      <Footer3D />
    </div>
  );
};

export default Index;
