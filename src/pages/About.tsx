import { MessageCircle, Award, Users, ThumbsUp, Clock, Rocket, Target, FileText, Star, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { serviceAreas, faqItems } from "@/data/staticData";
import { useCountUp } from "@/hooks/useCountUp";
import { motion, AnimatePresence } from "framer-motion";
import { scrollToSection } from "@/utils/scrollToSection";
import { openWhatsApp } from "@/utils/whatsappHelper";
import { useState } from "react";

const About = () => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const cities = [...new Set(serviceAreas.map(area => area.city))];
  const filteredAreas = selectedCity ? serviceAreas.filter(area => area.city === selectedCity) : serviceAreas;
  const categories = [...new Set(faqItems.map(faq => faq.category))];
  const filteredFaqs = selectedCategory ? faqItems.filter(faq => faq.category === selectedCategory) : faqItems;

  const stats = [
    { icon: Award, label: "Years Experience", value: 7, suffix: "+" },
    { icon: Users, label: "AC Units Serviced", value: 10000, suffix: "+" },
    { icon: ThumbsUp, label: "Google Reviews", value: 57, suffix: "" },
    { icon: Clock, label: "Google Rating", value: 5.0, suffix: "/5", isDecimal: true }
  ];

  const milestones = [
    {
      year: "2018",
      title: "Foundation",
      description: "Started Comfort Technical Services in Pune with a vision to provide reliable AC services",
      icon: Rocket
    },
    {
      year: "2019",
      title: "First 500 Customers",
      description: "Reached our first 500 satisfied customers and expanded service coverage across Pune",
      icon: Target
    },
    {
      year: "2020",
      title: "GST Registration",
      description: "Became a registered GST business, offering professional invoices to all customers",
      icon: FileText
    },
    {
      year: "2021",
      title: "PCMC Expansion",
      description: "Extended services to PCMC area including Akurdi, Chinchwad, and surrounding regions",
      icon: TrendingUp
    },
    {
      year: "2023",
      title: "10,000+ Services",
      description: "Crossed the milestone of 10,000+ AC units serviced with 5-star customer ratings",
      icon: Star
    }
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding-sm bg-gradient-hero">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="mb-4">About Comfort Technical Services</h1>
            <p className="text-muted-foreground text-lg">
              Your trusted AC service partner in Pune & PCMC since 2018. Serving thousands with professional installation, maintenance, and repair services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story & Stats */}
      <section className="section-padding-sm bg-background">
        <div className="container-wide">
          <div className="max-w-2xl mx-auto mb-12">
            <Card className="bg-gradient-card border-0 shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl">Our Story</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>Since 2018, we've been providing professional AC services in Pune & PCMC. With 7+ years of experience, we deliver reliable installation, maintenance, and repair services to homes and businesses.</p>
                  <p>We prioritize outstanding customer service through prompt repairs, clear communication, and affordable pricing. We've worked with multiple companies in Pune, building lasting relationships through professionalism and quality care.</p>
                  <p>Our certified technicians are trained to handle all types of AC units with precision and care, ensuring your comfort is never compromised.</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {stats.map((stat, index) => {
              const StatCounter = () => {
                const { count, ref } = useCountUp(stat.value, 2000);
                return (
                  <div ref={ref} className="text-2xl font-bold text-primary mb-1">
                    {stat.isDecimal ? count.toFixed(1) : count.toLocaleString()}{stat.suffix}
                  </div>
                );
              };

              return (
                <motion.div key={index} variants={fadeInUp} transition={{ duration: 0.3 }}>
                  <Card className="text-center p-4 card-hover bg-gradient-card border-0 shadow-md">
                    <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                    <StatCounter />
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Our Journey Timeline */}
          <div className="max-w-5xl mx-auto">
            <h2 className="text-center mb-12">Our Journey</h2>
            <div className="relative">
              {/* Center vertical line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-primary transform -translate-x-1/2 hidden md:block" />

              <div className="space-y-12">
                {milestones.map((milestone, index) => {
                  const isLeft = index % 2 === 0;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15, duration: 0.5 }}
                      className="relative"
                    >
                      <div className={`flex items-center gap-8 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                        {/* Card */}
                        <div className="flex-1">
                          <Card className="bg-background border-primary/20 shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <CardContent className="p-6">
                              <div className={`flex items-start gap-4 ${isLeft ? '' : 'md:flex-row-reverse md:text-right'}`}>
                                <Badge className="bg-primary/10 text-primary border-primary/20 text-sm px-3 py-1 shrink-0">
                                  {milestone.year}
                                </Badge>
                                <div className="flex-1">
                                  <h4 className="text-lg font-bold mb-2">{milestone.title}</h4>
                                  <p className="text-sm text-muted-foreground leading-relaxed">
                                    {milestone.description}
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>

                        {/* Center icon */}
                        <div className="hidden md:flex items-center justify-center w-16 h-16 rounded-full bg-primary shadow-lg shadow-primary/30 flex-shrink-0 relative z-10 border-4 border-background">
                          <milestone.icon className="w-7 h-7 text-primary-foreground" />
                        </div>

                        {/* Spacer for alignment */}
                        <div className="flex-1 hidden md:block" />
                      </div>

                      {/* Mobile icon */}
                      <div className="md:hidden absolute -left-4 top-6">
                        <div className="w-10 h-10 rounded-full bg-primary shadow-md flex items-center justify-center">
                          <milestone.icon className="w-5 h-5 text-primary-foreground" />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="section-padding-sm bg-accent/30">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="mb-3">Service Areas</h2>
            <p className="text-muted-foreground text-base max-w-2xl mx-auto">
              Serving Pune and Pimpri Chinchwad with fast, reliable AC service
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-2 mb-5">
            <Button
              variant={selectedCity === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCity(null)}
            >
              All Areas
            </Button>
            {cities.map(city => (
              <Button
                key={city}
                variant={selectedCity === city ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCity(city)}
              >
                {city}
              </Button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCity || "all"}
              className="flex flex-wrap gap-2 justify-center mb-6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
            >
              {filteredAreas.map((area, index) => (
                <motion.div
                  key={area.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.02, duration: 0.25 }}
                >
                  <Badge variant="secondary" className="px-3 py-1.5 text-xs">
                    {area.area_name}
                  </Badge>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          <Card className="max-w-lg mx-auto text-center">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Don't See Your Area?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground mb-3">
                Contact us to check if we serve your location
              </p>
              <Button
                onClick={() => openWhatsApp({
                  type: "general",
                  sourceSection: "Website - About Page - Service Areas",
                  customMessage: "*Service Area Enquiry*\n\nI'd like to check if you service my area.\n\nMy Location: (please specify)\n\nName: \nMobile Number: \n\n*Source:* Website - About Page - Service Areas"
                })}
                className="gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white"
              >
                <MessageCircle className="w-4 h-4" />
                Check Availability
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="section-padding-sm bg-background">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="mb-3">Frequently Asked Questions</h2>
            <p className="text-muted-foreground text-base max-w-2xl mx-auto">
              Common questions about our AC services
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-6 max-w-2xl mx-auto">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(null)}
            >
              All
            </Button>
            {categories.map(category => (
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

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory || "all"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              className="max-w-2xl mx-auto"
            >
              <Accordion type="single" collapsible className="w-full">
                {filteredFaqs.map((faq, index) => (
                  <AccordionItem key={faq.id} value={`item-${index}`}>
                    <AccordionTrigger className="text-sm text-left py-3">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </AnimatePresence>

          <Card className="mt-8 bg-gradient-card border-0 shadow-md text-center max-w-lg mx-auto">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Still Have Questions?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground mb-3">
                Contact us directly for any queries
              </p>
              <Button onClick={() => window.location.href = "/#contact"} size="sm">
                Contact Us
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default About;
