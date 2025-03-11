
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { SmoothScrollLink } from "@/components/ui/motion";
import { X, Menu } from "lucide-react";

interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);

      // Update active section based on scroll position
      const sections = ["home", "about", "features", "contact"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Prevent scrolling when menu is open
    document.body.style.overflow = isMenuOpen ? "auto" : "hidden";
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = "auto";
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "py-4 bg-white/80 backdrop-blur-lg shadow-sm"
          : "py-6 bg-transparent",
        className
      )}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <a href="#" className="font-medium text-xl tracking-tight">
          incognita
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-8 items-center">
          {[
            { name: "Home", href: "#home" },
            { name: "About", href: "#about" },
            { name: "Features", href: "#features" },
            { name: "Contact", href: "#contact" },
          ].map((item) => (
            <li key={item.name}>
              <SmoothScrollLink
                to={item.href}
                className={cn(
                  "nav-link text-sm font-light tracking-wide",
                  activeSection === item.href.substring(1) && "active"
                )}
              >
                {item.name}
              </SmoothScrollLink>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden z-50 flex items-center"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>

        {/* Mobile Menu */}
        <div
          className={cn(
            "fixed inset-0 bg-white flex flex-col justify-center items-center md:hidden transition-all duration-500 ease-in-out z-40",
            isMenuOpen
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-full pointer-events-none"
          )}
        >
          <ul className="flex flex-col space-y-8 items-center">
            {[
              { name: "Home", href: "#home" },
              { name: "About", href: "#about" },
              { name: "Features", href: "#features" },
              { name: "Contact", href: "#contact" },
            ].map((item) => (
              <li key={item.name}>
                <SmoothScrollLink
                  to={item.href}
                  className="text-2xl font-light tracking-wide"
                  onClick={handleLinkClick}
                >
                  {item.name}
                </SmoothScrollLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
