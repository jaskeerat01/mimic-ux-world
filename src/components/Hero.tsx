
import React from "react";
import { cn } from "@/lib/utils";
import { AnimateInView, SmoothScrollLink } from "@/components/ui/motion";
import { ArrowRight } from "lucide-react";

interface HeroProps {
  className?: string;
}

export function Hero({ className }: HeroProps) {
  return (
    <section 
      id="home" 
      className={cn(
        "min-h-screen flex flex-col justify-center relative overflow-hidden",
        className
      )}
    >
      <div className="section-container flex flex-col justify-center items-center text-center relative z-10">
        <AnimateInView animation="fade-in" delay={300} duration={800}>
          <span className="inline-block px-3 py-1 mb-8 text-xs tracking-widest uppercase bg-secondary rounded-full">
            Welcome to the future
          </span>
        </AnimateInView>
        
        <AnimateInView animation="fade-in" delay={600} duration={800}>
          <h1 className="heading-xl max-w-4xl mb-6">
            Carefully crafted digital
            <span className="block font-normal">experiences that matter</span>
          </h1>
        </AnimateInView>
        
        <AnimateInView animation="fade-in" delay={900} duration={800}>
          <p className="text-muted-foreground max-w-2xl mb-12 text-lg">
            We create unique digital experiences that are thoughtfully designed, 
            meticulously crafted, and masterfully built to perform.
          </p>
        </AnimateInView>
        
        <AnimateInView animation="fade-in" delay={1200} duration={800}>
          <SmoothScrollLink
            to="#about"
            className="button-hover group inline-flex items-center px-6 py-3 border border-primary rounded-full text-sm"
          >
            Discover more
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </SmoothScrollLink>
        </AnimateInView>
      </div>
      
      {/* Background design elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.07] animate-spin-slow">
        <div className="absolute inset-0 rounded-full border border-primary/20"></div>
        <div className="absolute inset-[100px] rounded-full border border-primary/20"></div>
        <div className="absolute inset-[200px] rounded-full border border-primary/20"></div>
        <div className="absolute inset-[300px] rounded-full border border-primary/20"></div>
      </div>
      
      <div className="absolute bottom-10 left-0 right-0 flex justify-center">
        <div className="h-14 w-[1px] bg-gradient-to-b from-transparent to-primary/20"></div>
      </div>
    </section>
  );
}
