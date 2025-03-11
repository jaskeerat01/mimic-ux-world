
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ProjectCard3D } from '@/components/ProjectCard3D';

export function Features3D() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const projects = [
    {
      title: "Neural Interface Design",
      description: "Crafting intuitive interfaces for direct neural control systems with minimalist design principles.",
      image: "https://images.unsplash.com/photo-1581092335397-9fa73b7af4b1?q=80&w=1974&auto=format&fit=crop",
      category: "UX Design",
      link: "#project1",
    },
    {
      title: "Quantum Data Visualization",
      description: "Creating visual representations of complex quantum systems for simplified interaction patterns.",
      image: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?q=80&w=2070&auto=format&fit=crop",
      category: "Data",
      link: "#project2",
    },
    {
      title: "Biometric Security Framework",
      description: "Developing adaptive security protocols using advanced biometric identification mechanisms.",
      image: "https://images.unsplash.com/photo-1590859808195-5bdb26449dd8?q=80&w=1974&auto=format&fit=crop",
      category: "Security",
      link: "#project3",
    },
    {
      title: "Autonomous System Architecture",
      description: "Designing robust architectures for self-organizing autonomous system networks.",
      image: "https://images.unsplash.com/photo-1551801691-f0bce83d4f28?q=80&w=1974&auto=format&fit=crop",
      category: "AI",
      link: "#project4",
    },
  ];
  
  return (
    <section
      id="features"
      className="py-20 md:py-32 relative overflow-hidden"
      ref={ref}
    >
      <div className="section-container">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-3 py-1 mb-2 text-xs tracking-widest uppercase bg-white/5 border border-corp-cyan/20 rounded-full text-corp-cyan">
            Our Projects
          </span>
          
          <h2 className="heading-lg mb-6 text-white">
            Advanced solutions for the future
          </h2>
          
          <p className="text-white/70">
            We combine strategic thinking, creative design, and technical expertise
            to create digital experiences that exceed expectations.
          </p>
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {projects.map((project, index) => (
            <motion.div key={index} variants={itemVariants} className="h-full">
              <ProjectCard3D
                title={project.title}
                description={project.description}
                image={project.image}
                category={project.category}
                link={project.link}
              />
            </motion.div>
          ))}
        </motion.div>
        
        {/* Background elements */}
        <div className="absolute -left-1/3 top-1/4 w-[500px] h-[500px] bg-corp-cyan/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute -right-1/3 bottom-1/4 w-[500px] h-[500px] bg-corp-cyan/5 rounded-full blur-[120px] pointer-events-none"></div>
        
        {/* Marquee effect */}
        <div className="mt-24 md:mt-32">
          <div className="marquee relative overflow-hidden py-6 bg-corp-element/30">
            <div className="marquee-content text-4xl font-light text-white/10">
              {Array(4).fill(
                "INNOVATION • TECHNOLOGY • DESIGN • FUTURE • "
              ).join("")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
