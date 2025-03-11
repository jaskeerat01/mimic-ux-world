
import React, { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Features } from "@/components/Features";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    // Preloading animations
    const preloadAnimations = () => {
      const animations = [
        "fade-in",
        "slide-in-up",
        "slide-in-down",
        "slide-in-left",
        "slide-in-right",
      ];
      
      // Create a hidden div with all animations for preloading
      const preloadDiv = document.createElement("div");
      preloadDiv.style.position = "absolute";
      preloadDiv.style.width = "0";
      preloadDiv.style.height = "0";
      preloadDiv.style.opacity = "0";
      preloadDiv.style.pointerEvents = "none";
      
      animations.forEach((animation) => {
        const el = document.createElement("div");
        el.classList.add(`animate-${animation}`);
        preloadDiv.appendChild(el);
      });
      
      document.body.appendChild(preloadDiv);
      
      // Remove after animations are loaded (5s should be enough)
      setTimeout(() => {
        document.body.removeChild(preloadDiv);
      }, 5000);
    };
    
    preloadAnimations();
    
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
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Features />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
