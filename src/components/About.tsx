
import React from "react";
import { cn } from "@/lib/utils";
import { AnimateInView } from "@/components/ui/motion";

interface AboutProps {
  className?: string;
}

export function About({ className }: AboutProps) {
  return (
    <section
      id="about"
      className={cn("py-20 md:py-32 overflow-hidden", className)}
    >
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
          <div className="space-y-6">
            <AnimateInView animation="slide-in-left">
              <span className="inline-block px-3 py-1 mb-2 text-xs tracking-widest uppercase bg-secondary rounded-full">
                About us
              </span>
            </AnimateInView>
            
            <AnimateInView animation="slide-in-left" delay={200}>
              <h2 className="heading-lg">
                Crafting immersive digital experiences
              </h2>
            </AnimateInView>
            
            <AnimateInView animation="slide-in-left" delay={400}>
              <div className="space-y-4 text-muted-foreground">
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
            </AnimateInView>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <AnimateInView animation="fade-in" delay={200} className="space-y-6">
              <div className="p-6 bg-accent rounded-2xl">
                <div className="text-4xl font-light mb-3">98%</div>
                <div className="text-sm text-muted-foreground">Client satisfaction rate</div>
              </div>
              
              <div className="p-6 bg-accent rounded-2xl">
                <div className="text-4xl font-light mb-3">12+</div>
                <div className="text-sm text-muted-foreground">Years of excellence</div>
              </div>
            </AnimateInView>
            
            <AnimateInView animation="fade-in" delay={400} className="space-y-6 mt-12">
              <div className="p-6 bg-accent rounded-2xl">
                <div className="text-4xl font-light mb-3">250+</div>
                <div className="text-sm text-muted-foreground">Projects completed</div>
              </div>
              
              <div className="p-6 bg-accent rounded-2xl">
                <div className="text-4xl font-light mb-3">24</div>
                <div className="text-sm text-muted-foreground">Design awards</div>
              </div>
            </AnimateInView>
          </div>
        </div>
      </div>
    </section>
  );
}
