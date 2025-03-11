import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

function ProjectCard3D({ title, description, image, category, link }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  
  // Motion values for the tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Spring physics for smoother animation
  const springConfig = { damping: 15, stiffness: 150 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  // Transform mouse movement to rotation
  const rotateX = useTransform(ySpring, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], [-15, 15]);
  
  // Lighting effect - simulate light moving across the surface
  const [lightPos, setLightPos] = useState({ x: 0, y: 0 });
  
  // Gradient position
  const gradientX = useTransform(xSpring, [-0.5, 0.5], [0, 100]);
  const gradientY = useTransform(ySpring, [-0.5, 0.5], [0, 100]);
  
  // Handle card hover
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    
    // Calculate normalized position (0 to 1)
    const xPos = (e.clientX - rect.left) / rect.width - 0.5;
    const yPos = (e.clientY - rect.top) / rect.height - 0.5;
    
    // Update motion values
    x.set(xPos);
    y.set(yPos);
    
    // Update light position
    setLightPos({ 
      x: (e.clientX - rect.left) / rect.width * 100, 
      y: (e.clientY - rect.top) / rect.height * 100 
    });
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative h-full perspective"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        className="gradient-border h-full"
        style={{
          background: isHovered ? 
            `radial-gradient(circle at ${lightPos.x}% ${lightPos.y}%, rgba(0,255,255,0.2) 0%, rgba(0,0,0,0) 60%)` : 
            'none',
        }}
      >
        <motion.div
          className="relative h-full overflow-hidden rounded-xl bg-corp-element border border-white/5"
          style={{
            transformStyle: "preserve-3d",
            rotateX: rotateX,
            rotateY: rotateY,
          }}
        >
          {/* Card image */}
          <div className="relative h-[200px] overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-transparent to-corp-dark/80 z-10"
              style={{
                opacity: isHovered ? 0.5 : 0.8,
                transition: "opacity 0.3s ease-out",
              }}
            />
            <motion.img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
              style={{
                scale: isHovered ? 1.05 : 1,
                transition: "transform 0.3s ease-out",
              }}
            />
            
            {/* Category tag */}
            <div className="absolute top-4 left-4 z-20">
              <span className="text-xs uppercase tracking-wider bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
                {category}
              </span>
            </div>
            
            {/* Highlight effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-tr from-transparent via-corp-cyan/0 to-corp-cyan/20 z-10"
              style={{
                opacity: isHovered ? 1 : 0,
                background: isHovered ? 
                  `linear-gradient(to bottom right, 
                    rgba(0,255,255,0) 0%, 
                    rgba(0,255,255,0.1) ${gradientX}%, 
                    rgba(0,255,255,0) 100%)` : 
                  'none',
              }}
            />
          </div>
          
          {/* Card content */}
          <div className="p-6 relative z-20 bg-gradient-to-t from-corp-element to-transparent">
            <h3 className="text-xl font-light mb-2">{title}</h3>
            <p className="text-sm text-white/70 mb-4">{description}</p>
            
            <a 
              href={link} 
              className="inline-flex items-center text-corp-cyan text-sm"
            >
              View Project
              <motion.span
                animate={{ x: isHovered ? 5 : 0, y: isHovered ? -5 : 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </motion.span>
            </a>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export { ProjectCard3D };
