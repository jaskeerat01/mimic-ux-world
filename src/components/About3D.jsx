
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Layers, Globe, Code, Shield } from 'lucide-react';

export function About3D() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };
  
  const staggerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const statsData = [
    { value: '98%', label: 'Client satisfaction rate' },
    { value: '12+', label: 'Years of excellence' },
    { value: '250+', label: 'Projects completed' },
    { value: '24', label: 'Design awards' },
  ];

  const values = [
    { 
      icon: <Layers className="h-6 w-6 text-corp-cyan" />,
      title: 'Strategic Design',
      description: 'We approach each project with strategic thinking, ensuring every design decision aligns with business goals.'
    },
    { 
      icon: <Globe className="h-6 w-6 text-corp-cyan" />,
      title: 'Global Perspective',
      description: 'Our team brings diverse viewpoints from around the world to create solutions that transcend cultural boundaries.'
    },
    { 
      icon: <Code className="h-6 w-6 text-corp-cyan" />,
      title: 'Technical Mastery',
      description: 'Our development team ensures that every line of code is optimized for performance, security, and scalability.'
    },
    { 
      icon: <Shield className="h-6 w-6 text-corp-cyan" />,
      title: 'Future-Proof',
      description: 'We build systems that anticipate technological evolution, ensuring long-term viability and adaptability.'
    }
  ];

  return (
    <section
      id="about"
      className="py-20 md:py-32 relative overflow-hidden"
      ref={ref}
    >
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
          <motion.div
            className="space-y-6"
            variants={fadeUpVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <span className="inline-block px-3 py-1 mb-2 text-xs tracking-widest uppercase bg-white/5 border border-corp-cyan/20 rounded-full text-corp-cyan">
              About us
            </span>
            
            <h2 className="heading-lg text-white">
              Crafting immersive<br />
              <span className="text-corp-cyan glow-text">digital experiences</span>
            </h2>
            
            <div className="space-y-4 text-white/70">
              <p>
                At the intersection of design and technology, we create digital 
                experiences that are not only visually stunning but also 
                functionally seamless.
              </p>
              <p>
                Our approach is rooted in minimalism, allowing the content and 
                functionality to take center stage. Every pixel, every interaction
                is meticulously crafted with purpose.
              </p>
            </div>
            
            {/* Stats */}
            <motion.div 
              className="grid grid-cols-2 gap-4 mt-10"
              variants={staggerContainerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {statsData.map((stat, index) => (
                <motion.div 
                  key={index}
                  className="glassmorphism bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
                  variants={fadeUpVariants}
                >
                  <div className="text-3xl font-light text-corp-cyan mb-2">{stat.value}</div>
                  <div className="text-sm text-white/70">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          <motion.div
            className="grid grid-cols-1 gap-6"
            variants={staggerContainerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="gradient-border"
                variants={fadeUpVariants}
                whileHover={{ 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
              >
                <div className="glassmorphism bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 h-full">
                  <div className="mb-4 p-3 inline-flex items-center justify-center bg-white/10 rounded-xl">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-light text-white mb-2">{value.title}</h3>
                  <p className="text-white/70">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute -top-1/3 -right-1/3 w-[800px] h-[800px] bg-corp-cyan/5 rounded-full blur-[150px] pointer-events-none"></div>
    </section>
  );
}
