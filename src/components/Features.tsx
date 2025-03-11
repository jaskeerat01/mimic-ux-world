
import React from "react";
import { cn } from "@/lib/utils";
import { AnimateInView } from "@/components/ui/motion";
import { ArrowUpRight, Compass, Lightbulb, Layers, Code } from "lucide-react";

interface FeaturesProps {
  className?: string;
}

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
}

function FeatureCard({ title, description, icon, delay }: FeatureCardProps) {
  return (
    <AnimateInView
      animation="fade-in"
      delay={delay}
      className="group p-8 bg-secondary/50 rounded-2xl relative overflow-hidden transition-all duration-500 hover:bg-white hover:shadow-lg"
    >
      <div className="mb-6 p-3 inline-flex items-center justify-center bg-white rounded-xl">
        {icon}
      </div>
      <h3 className="text-xl font-normal mb-3">{title}</h3>
      <p className="text-muted-foreground mb-6">{description}</p>
      <div className="inline-flex items-center text-sm">
        Learn more
        <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
      </div>
      <div className="absolute bottom-0 left-0 h-1 w-0 bg-primary transition-all duration-300 group-hover:w-full opacity-10"></div>
    </AnimateInView>
  );
}

export function Features({ className }: FeaturesProps) {
  const features = [
    {
      title: "Strategic Thinking",
      description:
        "We approach each project with strategic thinking, ensuring that every design decision aligns with your business goals.",
      icon: <Compass className="h-6 w-6" />,
    },
    {
      title: "Creative Solutions",
      description:
        "Our team of experts combines creativity with technical expertise to deliver innovative solutions to complex problems.",
      icon: <Lightbulb className="h-6 w-6" />,
    },
    {
      title: "Design Excellence",
      description:
        "We craft beautiful, intuitive interfaces that enhance user experience while maintaining visual coherence.",
      icon: <Layers className="h-6 w-6" />,
    },
    {
      title: "Technical Mastery",
      description:
        "Our development team ensures that every line of code is optimized for performance, security, and scalability.",
      icon: <Code className="h-6 w-6" />,
    },
  ];

  return (
    <section
      id="features"
      className={cn("py-20 md:py-32 bg-accent/50", className)}
    >
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <AnimateInView animation="fade-in">
            <span className="inline-block px-3 py-1 mb-2 text-xs tracking-widest uppercase bg-secondary rounded-full">
              What we do
            </span>
          </AnimateInView>
          
          <AnimateInView animation="fade-in" delay={200}>
            <h2 className="heading-lg mb-6">
              Our approach to creating exceptional experiences
            </h2>
          </AnimateInView>
          
          <AnimateInView animation="fade-in" delay={400}>
            <p className="text-muted-foreground">
              We combine strategic thinking, creative design, and technical expertise
              to create digital experiences that exceed expectations.
            </p>
          </AnimateInView>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              delay={200 * (index + 1)}
            />
          ))}
        </div>
        
        <div className="mt-24 md:mt-32">
          <div className="marquee">
            <div className="marquee-content py-3">
              {Array(4).fill(
                "Strategic Design • Technical Excellence • Creative Solutions • User Experience • "
              ).join("")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
