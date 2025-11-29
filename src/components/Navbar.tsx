import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Phone, MessageCircle, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACT_INFO } from "@/config/contact";
import logo from "@/assets/logo.png";
import { motion, AnimatePresence } from "framer-motion";
import { scrollToSection } from "@/utils/scrollToSection";
import { useScrollSpy } from "@/hooks/useScrollSpy";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const sections = ["home", "services", "pricing", "amc", "service-areas", "about", "faqs", "gallery", "contact"];
  const activeSection = useScrollSpy(sections, 100);

  const handleCall = () => {
    window.location.href = `tel:${CONTACT_INFO.phone}`;
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent("Hello! I would like to know more about your AC services.");
    window.open(`https://wa.me/${CONTACT_INFO.whatsapp}?text=${message}`, "_blank");
  };

  const navLinks = [
    { name: "Home", section: "home" },
    { name: "Services", section: "services" },
    { name: "Pricing", section: "pricing" },
    { name: "AMC Plans", section: "amc" },
    { name: "Service Areas", section: "service-areas" },
    { name: "About", section: "about" },
    { name: "FAQs", section: "faqs" },
    { name: "Gallery", section: "gallery" },
    { name: "Contact", section: "contact" },
  ];

  const handleNavClick = (section: string) => {
    if (location.pathname !== "/") {
      window.location.href = `/#${section}`;
    } else {
      scrollToSection(section);
    }
    setIsOpen(false);
  };

  const isActive = (section: string) => {
    if (location.pathname === "/") {
      return activeSection === section;
    }
    return false;
  };

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Handle hash on page load
  useEffect(() => {
    if (location.hash && location.pathname === "/") {
      const section = location.hash.replace("#", "");
      setTimeout(() => scrollToSection(section), 100);
    }
  }, [location]);

  return (
    <nav className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container-wide">
        <div className="flex justify-between items-center h-14">
          <button 
            onClick={() => handleNavClick("home")}
            className="hover:opacity-80 transition-opacity flex-shrink-0 flex items-center gap-2"
          >
            <img src={logo} alt={CONTACT_INFO.companyName} className="h-8 sm:h-10 w-auto" />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.section)}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive(link.section)
                    ? "text-primary bg-primary/5"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <Button onClick={handleCall} variant="ghost" size="sm" className="gap-1.5 h-8 text-sm">
              <Phone className="w-4 h-4" />
              <span className="hidden xl:inline">Call</span>
            </Button>
            <Button onClick={handleWhatsApp} size="sm" className="gap-1.5 h-8 bg-[#25D366] hover:bg-[#20BA5A] text-white">
              <MessageCircle className="w-4 h-4" />
              <span className="hidden xl:inline">WhatsApp</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="lg:hidden p-2 rounded-md hover:bg-accent transition-colors relative w-10 h-10 flex items-center justify-center" 
            aria-label="Toggle menu"
          >
            <motion.div
              animate={isOpen ? "open" : "closed"}
              className="relative w-5 h-5"
            >
              <motion.span
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: 45, y: 8 }
                }}
                transition={{ duration: 0.2 }}
                className="absolute top-0 left-0 w-5 h-0.5 bg-foreground block"
              />
              <motion.span
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 }
                }}
                transition={{ duration: 0.2 }}
                className="absolute top-2 left-0 w-5 h-0.5 bg-foreground block"
              />
              <motion.span
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: -45, y: -8 }
                }}
                transition={{ duration: 0.2 }}
                className="absolute top-4 left-0 w-5 h-0.5 bg-foreground block"
              />
            </motion.div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="lg:hidden border-t border-border bg-background overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <motion.div 
              className="container-wide py-3 space-y-1"
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: {
                  transition: { staggerChildren: 0.05, delayChildren: 0.1 }
                },
                closed: {
                  transition: { staggerChildren: 0.03, staggerDirection: -1 }
                }
              }}
            >
              {navLinks.map((link) => (
                <motion.div
                  key={link.name}
                  variants={{
                    open: { opacity: 1, x: 0 },
                    closed: { opacity: 0, x: -20 }
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <button 
                    onClick={() => handleNavClick(link.section)}
                    className={`w-full text-left block px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      isActive(link.section)
                        ? "text-primary bg-primary/5"
                        : "text-foreground hover:bg-accent"
                    }`}
                  >
                    {link.name}
                  </button>
                </motion.div>
              ))}
              <motion.div 
                className="pt-3 flex gap-2 border-t border-border mt-3"
                variants={{
                  open: { opacity: 1, y: 0 },
                  closed: { opacity: 0, y: -10 }
                }}
                transition={{ duration: 0.2, delay: 0.2 }}
              >
                <Button onClick={handleCall} variant="outline" size="sm" className="flex-1 gap-2">
                  <Phone className="w-4 h-4" />
                  Call Now
                </Button>
                <Button onClick={handleWhatsApp} size="sm" className="flex-1 gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white">
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
