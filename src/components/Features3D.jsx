
import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ProjectCard3D } from '@/components/ProjectCard3D';
import { Sparkles, Filter, ArrowUpRight } from 'lucide-react';

export function Features3D() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const [activeFilter, setActiveFilter] = useState('All');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  
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

  const filterCategories = ['All', 'UX Design', 'Data', 'Security', 'AI'];

  const projects = [
    {
      title: "Neural Interface Design",
      description: "Crafting intuitive interfaces for direct neural control systems with minimalist design principles.",
      image: "https://images.unsplash.com/photo-1581092335397-9fa73b7af4b1?q=80&w=1974&auto=format&fit=crop",
      category: "UX Design",
      link: "#project1",
      tags: ["Neural", "Interface", "UI/UX"]
    },
    {
      title: "Quantum Data Visualization",
      description: "Creating visual representations of complex quantum systems for simplified interaction patterns.",
      image: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?q=80&w=2070&auto=format&fit=crop",
      category: "Data",
      link: "#project2",
      tags: ["Quantum", "Data", "Visualization"]
    },
    {
      title: "Biometric Security Framework",
      description: "Developing adaptive security protocols using advanced biometric identification mechanisms.",
      image: "https://images.unsplash.com/photo-1590859808195-5bdb26449dd8?q=80&w=1974&auto=format&fit=crop",
      category: "Security",
      link: "#project3",
      tags: ["Biometric", "Security", "Framework"]
    },
    {
      title: "Autonomous System Architecture",
      description: "Designing robust architectures for self-organizing autonomous system networks.",
      image: "https://images.unsplash.com/photo-1551801691-f0bce83d4f28?q=80&w=1974&auto=format&fit=crop",
      category: "AI",
      link: "#project4",
      tags: ["Autonomous", "AI", "Architecture"]
    },
  ];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);
  
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
          <div className="flex items-center justify-center mb-2">
            <span className="inline-block px-3 py-1 text-xs tracking-widest uppercase bg-white/5 border border-corp-cyan/20 rounded-full text-corp-cyan">
              Our Projects
            </span>
            <Sparkles className="h-4 w-4 text-corp-cyan ml-2 animate-pulse" />
          </div>
          
          <h2 className="heading-lg mb-6 text-white relative inline-block">
            Advanced solutions for the future
            <motion.span 
              className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-corp-cyan to-transparent" 
              initial={{ width: "0%", left: "50%" }}
              animate={isInView ? { width: "100%", left: "0%" } : { width: "0%", left: "50%" }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
          </h2>
          
          <p className="text-white/70">
            We combine strategic thinking, creative design, and technical expertise
            to create digital experiences that exceed expectations.
          </p>
          
          {/* Project filters */}
          <div className="flex flex-wrap items-center justify-center mt-10 mb-10 gap-2">
            {filterCategories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-4 py-1.5 rounded-full text-sm transition-all duration-300 ${
                  activeFilter === category 
                    ? 'bg-corp-cyan/20 text-corp-cyan border border-corp-cyan/50' 
                    : 'bg-white/5 text-white/70 border border-white/10 hover:border-corp-cyan/30'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
                {activeFilter === category && (
                  <motion.div
                    layoutId="activeFilterDot"
                    className="w-1 h-1 rounded-full bg-corp-cyan absolute -right-0.5 -top-0.5"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
            
            <motion.div
              className="ml-2 text-white/50 flex items-center"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Filter size={14} className="mr-1" />
              <span className="text-xs">Filter</span>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Project grid with animations */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {filteredProjects.map((project, index) => (
              <motion.div 
                key={project.title} 
                variants={itemVariants} 
                className="h-full"
                layoutId={`project-${project.title}`}
                onHoverStart={() => setHoveredProject(index)}
                onHoverEnd={() => setHoveredProject(null)}
              >
                <ProjectCard3D
                  title={project.title}
                  description={project.description}
                  image={project.image}
                  category={project.category}
                  link={project.link}
                />
                
                {/* Tags that appear on hover */}
                <AnimatePresence>
                  {hoveredProject === index && (
                    <motion.div 
                      className="mt-2 flex flex-wrap gap-1"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {project.tags.map((tag, i) => (
                        <motion.span 
                          key={tag}
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 5 }}
                          transition={{ duration: 0.2, delay: i * 0.1 }}
                          className="text-xs px-2 py-0.5 rounded bg-white/5 text-corp-cyan/80 border border-corp-cyan/20"
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
        
        {/* View All Projects Button */}
        <motion.div 
          className="flex justify-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <motion.a
            href="#"
            className="group flex items-center space-x-2 px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:border-corp-cyan/50 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-white/80 group-hover:text-corp-cyan transition-colors duration-300">View all projects</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowUpRight size={18} className="text-corp-cyan" />
            </motion.div>
          </motion.a>
        </motion.div>
        
        {/* Background elements */}
        <div className="absolute -left-1/3 top-1/4 w-[500px] h-[500px] bg-corp-cyan/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute -right-1/3 bottom-1/4 w-[500px] h-[500px] bg-corp-cyan/5 rounded-full blur-[120px] pointer-events-none"></div>
        
        {/* Circular floating elements */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-corp-cyan/30"
            style={{
              left: `${20 + i * 30}%`,
              top: i % 2 === 0 ? '10%' : '80%'
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
          />
        ))}
        
        {/* Marquee effect */}
        <div className="mt-24 md:mt-32 overflow-hidden">
          <motion.div 
            className="marquee relative py-6 bg-corp-element/30"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <motion.div 
              className="marquee-content text-4xl font-light text-white/10 whitespace-nowrap"
              animate={{ x: [0, -1000] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              {Array(2).fill(
                "INNOVATION • TECHNOLOGY • DESIGN • FUTURE • "
              ).join("")}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
