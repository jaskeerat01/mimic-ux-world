
import React from "react";
import { cn } from "@/lib/utils";
import { AnimateInView } from "@/components/ui/motion";
import { ArrowRight } from "lucide-react";

interface ContactProps {
  className?: string;
}

export function Contact({ className }: ContactProps) {
  return (
    <section
      id="contact"
      className={cn("py-20 md:py-32", className)}
    >
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
          <div className="space-y-6">
            <AnimateInView animation="slide-in-left">
              <span className="inline-block px-3 py-1 mb-2 text-xs tracking-widest uppercase bg-secondary rounded-full">
                Contact us
              </span>
            </AnimateInView>
            
            <AnimateInView animation="slide-in-left" delay={200}>
              <h2 className="heading-lg mb-6">
                Let's create something exceptional together
              </h2>
            </AnimateInView>
            
            <AnimateInView animation="slide-in-left" delay={400}>
              <p className="text-muted-foreground mb-8">
                We're always open to discuss new projects, creative ideas or
                opportunities to be part of your vision.
              </p>
            </AnimateInView>
            
            <AnimateInView animation="slide-in-left" delay={600} className="space-y-4">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Email</div>
                <a href="mailto:hello@incognita.com" className="hover:underline">
                  hello@incognita.com
                </a>
              </div>
              
              <div>
                <div className="text-sm text-muted-foreground mb-1">Phone</div>
                <a href="tel:+12345678900" className="hover:underline">
                  +1 (234) 567-8900
                </a>
              </div>
              
              <div>
                <div className="text-sm text-muted-foreground mb-1">Address</div>
                <address className="not-italic">
                  1234 Design Street<br />
                  San Francisco, CA 94103
                </address>
              </div>
            </AnimateInView>
          </div>
          
          <AnimateInView animation="fade-in" delay={400}>
            <form className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 bg-secondary/50 border-0 rounded-lg focus:ring-1 focus:ring-primary/20 focus:outline-none"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 bg-secondary/50 border-0 rounded-lg focus:ring-1 focus:ring-primary/20 focus:outline-none"
                    placeholder="john@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-3 bg-secondary/50 border-0 rounded-lg focus:ring-1 focus:ring-primary/20 focus:outline-none resize-none"
                    placeholder="Tell us about your project..."
                  ></textarea>
                </div>
              </div>
              
              <button
                type="submit"
                className="button-hover group inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-full text-sm"
              >
                Send Message
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </form>
          </AnimateInView>
        </div>
      </div>
    </section>
  );
}
