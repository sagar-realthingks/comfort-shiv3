import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CONTACT_INFO } from "@/config/contact";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useServices } from "@/contexts/DataStoreContext";

const Services = () => {
  const headerRef = useScrollAnimation();
  const servicesRef = useScrollAnimation();
  const [isLoading, setIsLoading] = useState(true);
  const [services] = useServices();

  // Group services by category
  const servicesData = services.reduce((acc, service) => {
    const existingCategory = acc.find(cat => cat.category === service.category);
    if (existingCategory) {
      existingCategory.items.push(service);
    } else {
      acc.push({
        category: service.category,
        description: '',
        items: [service]
      });
    }
    return acc;
  }, [] as Array<{ category: string; description: string; items: typeof services }>);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleWhatsApp = (service: string) => {
    const message = encodeURIComponent(`Hi! I'd like to know more about ${service}.`);
    window.open(`https://wa.me/${CONTACT_INFO.whatsapp}?text=${message}`, "_blank");
  };

  return (
    <div className="min-h-screen section-padding">
      <div className="container-wide">
        {/* Header */}
        <div ref={headerRef.ref} className={`text-center mb-10 scroll-animate ${headerRef.isVisible ? 'visible' : ''}`}>
          <h1 className="mb-2">AC Services & Pricing</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm">
            Transparent pricing for all AC services in Pune & PCMC. No hidden charges, free inspection included.
          </p>
        </div>

        {/* All Services with Pricing */}
        <div ref={servicesRef.ref} className={`scroll-animate ${servicesRef.isVisible ? 'visible' : ''}`}>
          {isLoading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <Card key={index}>
                  <CardHeader className="pb-3">
                    <div className="h-6 w-40 bg-muted rounded animate-pulse" />
                    <div className="h-4 w-full bg-muted rounded animate-pulse mt-2" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {Array.from({ length: 3 }).map((_, idx) => (
                        <div key={idx} className="h-16 bg-muted rounded animate-pulse" />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-2 gap-4"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: { staggerChildren: 0.1 }
                }
              }}
            >
              {servicesData.map((category, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <Card className="h-full">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">{category.category}</CardTitle>
                      <CardDescription className="text-xs">{category.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {category.items.map((item, idx) => (
                          <div key={idx} className="p-3 bg-accent/50 rounded-lg">
                            <div className="flex flex-col gap-2">
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex-1 min-w-0">
                                  <span className="text-sm font-medium block">{item.name}</span>
                                  <span className="text-xs text-muted-foreground block mt-0.5">{item.description}</span>
                                </div>
                                 <span className="text-primary font-semibold text-sm whitespace-nowrap">{item.priceLabel}</span>
                              </div>
                              
                              {item.covered && item.covered.length > 0 && (
                                <div className="mt-1 pt-2 border-t border-border/50">
                                  <span className="text-xs font-medium text-foreground block mb-1.5">What's Covered:</span>
                                  <ul className="space-y-1">
                                    {item.covered.map((coveredItem, covIdx) => (
                                      <li key={covIdx} className="text-xs text-muted-foreground flex items-start gap-1.5">
                                        <span className="text-primary mt-0.5">•</span>
                                        <span>{coveredItem}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              <div className="flex gap-2 mt-1">
                                <Button asChild size="sm" className="flex-1 h-8 text-xs">
                                  <Link to="/contact">Book Now</Link>
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-8 gap-1.5"
                                  onClick={() => handleWhatsApp(item.name)}
                                >
                                  <MessageCircle className="w-3.5 h-3.5" />
                                  <span className="text-xs">Ask</span>
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>


        {/* Additional Information */}
        <div className="mt-8 grid md:grid-cols-2 gap-4">
          <Card className="bg-accent/50 border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Important Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                <li>• Final pricing confirmed after free inspection</li>
                <li>• Parts & materials charged separately if needed</li>
                <li>• All services include warranty</li>
                <li>• No work without your approval</li>
                <li>• AMC customers get priority support & discounts</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="bg-primary/5 border border-primary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-primary">GST Invoice Available</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground mb-2">
                GST registered business providing official invoices for all services.
              </p>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                <li>• Claim input tax credit on business expenses</li>
                <li>• Proper documentation for corporate clients</li>
                <li>• GSTIN: <span className="font-mono text-foreground">{CONTACT_INFO.gstin}</span></li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Services;
