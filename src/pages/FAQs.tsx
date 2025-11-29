import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";
import { faqItems } from "@/data/staticData";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { motion, AnimatePresence } from "framer-motion";

const FAQs = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const headerRef = useScrollAnimation();

  const categories = [...new Set(faqItems.map((faq) => faq.category))];
  const filteredFaqs = selectedCategory
    ? faqItems.filter((faq) => faq.category === selectedCategory)
    : faqItems;

  return (
    <div className="min-h-screen section-padding">
      <div className="container-narrow">
        <div ref={headerRef.ref} className={`text-center mb-8 scroll-animate ${headerRef.isVisible ? 'visible' : ''}`}>
          <h1 className="mb-2">Frequently Asked Questions</h1>
          <p className="text-muted-foreground text-sm">
            Find answers to common questions about our AC services
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(null)}
          >
            All
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* FAQs */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory || "all"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Accordion type="single" collapsible className="w-full">
              {filteredFaqs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <AccordionItem value={`item-${index}`}>
                    <AccordionTrigger className="text-sm text-left py-3">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>
        </AnimatePresence>

        {/* Contact Section */}
        <div className="mt-10 bg-accent rounded-lg p-6 text-center">
          <h2 className="mb-2">Still Have Questions?</h2>
          <p className="text-muted-foreground text-sm mb-4">
            Can't find the answer you're looking for? Contact us directly and we'll be happy to help.
          </p>
          <Button asChild>
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
