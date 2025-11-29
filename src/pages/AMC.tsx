import { Check, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PricingCardSkeleton } from "@/components/PricingCardSkeleton";
import { CONTACT_INFO } from "@/config/contact";
import { Link } from "react-router-dom";
import { useAmcPlans } from "@/contexts/DataStoreContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const AMC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [amcPlans] = useAmcPlans();
  
  // Filter active plans and sort by display order
  const activePlans = amcPlans
    .filter(plan => plan.isActive)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);
  const handleWhatsApp = (planName: string) => {
    const message = encodeURIComponent(`Hi! I'm interested in the ${planName} AMC plan. Please provide more details.`);
    window.open(`https://wa.me/${CONTACT_INFO.whatsapp}?text=${message}`, "_blank");
  };

  const amcFaqs = [
    {
      q: "What is AMC and why do I need it?",
      a: "Annual Maintenance Contract (AMC) ensures regular servicing and maintenance of your AC units, reducing breakdowns and extending equipment life. It's cost-effective for homes and offices with multiple units."
    },
    {
      q: "Can I upgrade my AMC plan later?",
      a: "Yes, you can upgrade your AMC plan at any time. The price difference will be calculated on a pro-rata basis."
    },
    {
      q: "What happens if my AC needs major repairs?",
      a: "Minor repairs are covered in Standard and Premium plans. Major repairs are provided at discounted rates for AMC customers."
    }
  ];

  return (
    <div className="min-h-screen section-padding">
      <div className="container-wide">
        <div className="text-center mb-8">
          <h1 className="mb-2">Annual Maintenance Plans</h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm">
            Keep your AC running efficiently year-round with our comprehensive AMC plans.
            Save money on repairs and enjoy priority support.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
            {Array.from({ length: 3 }).map((_, index) => (
              <PricingCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: { staggerChildren: 0.12 }
              }
            }}
          >
            {activePlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { opacity: 1, scale: 1 }
              }}
              transition={{ duration: 0.4 }}
            >
              <Card className="card-hover">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{plan.name}</CardTitle>
                <CardDescription className="text-xs">{plan.targetCustomer}</CardDescription>
                <div className="mt-3">
                  <span className="text-2xl font-bold text-primary">{plan.priceLabel}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{plan.visitsPerYear} visits per year</p>
              </CardHeader>
              <CardContent className="pb-3">
                <ul className="space-y-2">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-xs">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="flex gap-2 pt-0">
                <Button asChild size="sm" className="flex-1">
                  <Link to="/contact">Enquire Now</Link>
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleWhatsApp(plan.name)}>
                  <MessageCircle className="w-4 h-4" />
                </Button>
              </CardFooter>
              </Card>
            </motion.div>
            ))}
          </motion.div>
        )}

        <div className="bg-accent rounded-lg p-5 mb-8">
          <h2 className="mb-4">AMC Benefits</h2>
          <div className="grid md:grid-cols-2 gap-3">
            <ul className="space-y-2">
              <li className="flex gap-2 text-sm"><Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" /> Regular preventive maintenance</li>
              <li className="flex gap-2 text-sm"><Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" /> Priority scheduling for service calls</li>
              <li className="flex gap-2 text-sm"><Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" /> Reduced breakdown frequency</li>
            </ul>
            <ul className="space-y-2">
              <li className="flex gap-2 text-sm"><Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" /> Extended AC equipment life</li>
              <li className="flex gap-2 text-sm"><Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" /> Discounted repair rates</li>
              <li className="flex gap-2 text-sm"><Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" /> Dedicated support team</li>
            </ul>
          </div>
        </div>

        <div>
          <h2 className="mb-4">AMC FAQs</h2>
          <Accordion type="single" collapsible className="w-full">
            {amcFaqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-sm text-left">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default AMC;
