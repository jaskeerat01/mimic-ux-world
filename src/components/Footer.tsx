
import React from "react";
import { cn } from "@/lib/utils";
import { SmoothScrollLink } from "@/components/ui/motion";

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  return (
    <footer
      className={cn(
        "py-12 md:py-20 border-t border-border",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          <div className="md:col-span-2">
            <a href="#" className="inline-block font-medium text-xl tracking-tight mb-4">
              incognita
            </a>
            <p className="text-muted-foreground max-w-md mb-6">
              We craft exceptional digital experiences that embody simplicity, 
              clarity, and purpose. Our work is defined by a relentless pursuit of 
              quality and attention to detail.
            </p>
            <div className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Incognita. All rights reserved.
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium uppercase tracking-wider mb-4">Navigation</h4>
            <ul className="space-y-3">
              {[
                { name: "Home", href: "#home" },
                { name: "About", href: "#about" },
                { name: "Features", href: "#features" },
                { name: "Contact", href: "#contact" },
              ].map((item) => (
                <li key={item.name}>
                  <SmoothScrollLink
                    to={item.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </SmoothScrollLink>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-medium uppercase tracking-wider mb-4">Legal</h4>
            <ul className="space-y-3">
              {[
                { name: "Privacy Policy", href: "#" },
                { name: "Terms of Service", href: "#" },
                { name: "Cookie Policy", href: "#" },
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
