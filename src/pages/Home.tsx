import { Phone, MessageCircle, CheckCircle, Clock, Shield, Users, Award, ThumbsUp, TrendingUp, X, ChevronLeft, ChevronRight, Rocket, Target, FileText, Star, Sparkles, Zap, HeartHandshake, Quote, Flag, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { LazyImage } from "@/components/LazyImage";
import { CONTACT_INFO, SERVICES } from "@/config/contact";
import { serviceAreas, faqItems, galleryImages, testimonials } from "@/data/staticData";
import { useServices, useAmcPlans } from "@/contexts/DataStoreContext";
import { useCountUp } from "@/hooks/useCountUp";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { scrollToSection } from "@/utils/scrollToSection";
import { useState, useEffect } from "react";
import { toast } from "sonner";

const Home = () => {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  const [services] = useServices();
  const [amcPlans] = useAmcPlans();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [lightboxImageLoading, setLightboxImageLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: "", phone: "", email: "", serviceType: "", acType: "", units: "1",
    preferredDate: "", preferredTimeSlot: "", address: "", city: "", pincode: "",
    preferredContactMode: "Call", notes: ""
  });

  // Prepare data
  const activePlans = amcPlans.filter(plan => plan.isActive).sort((a, b) => a.displayOrder - b.displayOrder);
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
    { year: "2018", title: "Foundation", description: "Started Comfort Technical Services in Pune with a vision to provide reliable AC services", icon: Flag, gradient: "from-blue-500 to-cyan-500", side: "left" },
    { year: "2019", title: "First 500 Customers", description: "Reached our first 500 satisfied customers and expanded service coverage across Pune", icon: Users, gradient: "from-purple-500 to-pink-500", side: "right" },
    { year: "2020", title: "GST Registration", description: "Became a registered GST business, offering professional invoices to all customers", icon: FileText, gradient: "from-orange-500 to-red-500", side: "left" },
    { year: "2021", title: "PCMC Expansion", description: "Extended services to PCMC area including Akurdi, Chinchwad, and surrounding regions", icon: TrendingUp, gradient: "from-green-500 to-emerald-500", side: "right" },
    { year: "2023", title: "10,000+ Services", description: "Crossed the milestone of 10,000+ AC units serviced with 5-star customer ratings", icon: Award, gradient: "from-indigo-500 to-purple-500", side: "left" },
    { year: "2024", title: "AMC Programs", description: "Launched comprehensive Annual Maintenance Contract programs for homes and businesses", icon: Calendar, gradient: "from-rose-500 to-pink-500", side: "right" }
  ];

  const handleCall = () => window.location.href = `tel:${CONTACT_INFO.phone}`;
  const handleWhatsApp = (customMessage?: string) => {
    const message = encodeURIComponent(customMessage || "Hello! I would like to book an AC service.");
    window.open(`https://wa.me/${CONTACT_INFO.whatsapp}?text=${message}`, "_blank");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.serviceType || !formData.acType || !formData.address || !formData.city) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }

    const messageParts = [
      "*New Service Booking*", "",
      `*Name:* ${formData.name}`,
      `*Phone:* ${formData.phone}`,
      formData.email && `*Email:* ${formData.email}`,
      `*Service:* ${formData.serviceType}`,
      `*AC Type:* ${formData.acType}`,
      `*Units:* ${formData.units}`,
      formData.preferredDate && `*Date:* ${formData.preferredDate}`,
      formData.preferredTimeSlot && `*Time:* ${formData.preferredTimeSlot}`,
      `*Address:* ${formData.address}, ${formData.city}${formData.pincode ? ` - ${formData.pincode}` : ''}`,
      `*Contact Via:* ${formData.preferredContactMode}`,
      formData.notes && `*Notes:* ${formData.notes}`
    ].filter(Boolean).join("%0A");

    window.open(`https://wa.me/${CONTACT_INFO.whatsapp}?text=${messageParts}`, "_blank");
    toast.success("Opening WhatsApp... Please send the message to complete your booking.");
    
    setFormData({
      name: "", phone: "", email: "", serviceType: "", acType: "", units: "1",
      preferredDate: "", preferredTimeSlot: "", address: "", city: "", pincode: "",
      preferredContactMode: "Call", notes: ""
    });
  };

  // Gallery handlers
  const handlePrevious = () => {
    if (selectedImageIndex === null) return;
    setLightboxImageLoading(true);
    setSelectedImageIndex(prev => prev === null || prev === 0 ? galleryImages.length - 1 : prev - 1);
  };

  const handleNext = () => {
    if (selectedImageIndex === null) return;
    setLightboxImageLoading(true);
    setSelectedImageIndex(prev => prev === null || prev === galleryImages.length - 1 ? 0 : prev + 1);
  };

  const selectedImage = selectedImageIndex !== null ? galleryImages[selectedImageIndex] : null;

  useEffect(() => {
    if (selectedImageIndex === null) return;
    const preload = (index: number) => {
      if (index >= 0 && index < galleryImages.length) {
        const img = new Image();
        img.src = galleryImages[index].image_url;
      }
    };
    preload(selectedImageIndex - 1);
    preload(selectedImageIndex + 1);
  }, [selectedImageIndex]);

  useEffect(() => {
    if (selectedImageIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImageIndex(null);
      else if (e.key === "ArrowLeft") handlePrevious();
      else if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex]);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    visible: { transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden scroll-mt-20 bg-gradient-hero pattern-dots">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <motion.div 
          className="container-wide relative z-10 section-padding"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Badge className="mb-4 px-4 py-1.5 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                <Sparkles className="w-3.5 h-3.5 mr-1" />
                7+ Years of Excellence
              </Badge>
              <h1 className="mb-4 text-gradient leading-tight">
                Fast, Reliable AC Service in Pune & PCMC
              </h1>
              <p className="text-muted-foreground mb-8 text-base sm:text-lg max-w-2xl mx-auto">
                Same-day service • Expert technicians • Transparent pricing • Service warranty
              </p>
            </motion.div>
            
            <motion.div 
              className="flex flex-wrap justify-center gap-3 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Button onClick={() => scrollToSection("contact")} size="lg" className="group shadow-primary">
                <span>Book Service</span>
                <Zap className="w-4 h-4 ml-2 group-hover:scale-110 transition-transform" />
              </Button>
              <Button onClick={handleCall} variant="outline" size="lg" className="gap-2 group">
                <Phone className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                Call Now
              </Button>
              <Button onClick={() => handleWhatsApp()} size="lg" className="gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white group">
                <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                WhatsApp
              </Button>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {[
                { label: "AC Units Serviced", value: "10,000+" },
                { label: "Happy Customers", value: "5,000+" },
                { label: "Google Rating", value: "5.0/5" },
                { label: "Same Day Service", value: "Available" }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding-sm bg-background scroll-mt-20">
        <div className="container-wide">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="mb-3">Why Choose Us?</h2>
            <p className="text-muted-foreground text-base max-w-2xl mx-auto">
              Trusted by thousands in Pune & PCMC for professional AC services
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {[
              { icon: Clock, title: "Same-Day Service", desc: "Quick response for urgent repairs", gradient: "from-blue-500 to-cyan-500" },
              { icon: Shield, title: "Warranty Assured", desc: "Service warranty on all work", gradient: "from-purple-500 to-pink-500" },
              { icon: Users, title: "Expert Team", desc: "Certified technicians", gradient: "from-orange-500 to-red-500" },
              { icon: TrendingUp, title: "Best Rates", desc: "Transparent pricing", gradient: "from-green-500 to-teal-500" }
            ].map((item, index) => (
              <motion.div key={index} variants={fadeInUp} transition={{ duration: 0.5 }}>
                <Card className="text-center card-hover card-glow h-full border-0 shadow-md bg-gradient-card">
                  <CardHeader className="pb-4">
                    <div className={`mx-auto w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center mb-4 icon-container-glow shadow-colored`}>
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-lg mb-2">{item.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Journey Timeline */}
      <section className="section-padding-sm bg-gradient-to-b from-accent/20 to-background relative overflow-hidden scroll-mt-20">
        <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent pointer-events-none" />
        
        <div className="container-wide relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 px-4 py-1.5 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
              <Zap className="w-3.5 h-3.5 mr-1" />
              Our Story
            </Badge>
            <h2 className="mb-3">Our <span className="text-gradient">Journey</span></h2>
            <p className="text-muted-foreground text-base max-w-2xl mx-auto">
              Growing together with our customers, one milestone at a time
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto relative">
            {/* Timeline Line - Desktop */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent hidden md:block" />

            {/* Timeline Items */}
            <div className="space-y-12 md:space-y-24">
              {milestones.map((milestone, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="relative"
                >
                  <div className={`flex flex-col md:flex-row items-center gap-6 ${milestone.side === 'left' ? 'md:flex-row-reverse' : ''}`}>
                    {/* Content Card */}
                    <div className={`w-full md:w-[calc(50%-2rem)] ${milestone.side === 'left' ? 'md:text-right' : ''}`}>
                      <Card className="card-hover card-glow bg-gradient-card border-0 shadow-lg group">
                        <CardHeader className="pb-3">
                          <div className="flex items-center gap-3 mb-2 md:hidden">
                            <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${milestone.gradient} flex items-center justify-center shadow-lg`}>
                              <milestone.icon className="w-6 h-6 text-white" />
                            </div>
                            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                              {milestone.year}
                            </Badge>
                          </div>
                          
                          <Badge variant="outline" className="hidden md:inline-block w-fit bg-primary/10 text-primary border-primary/20 mb-3">
                            {milestone.year}
                          </Badge>
                          
                          <CardTitle className="text-xl group-hover:text-primary transition-colors">
                            {milestone.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {milestone.description}
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Icon Node - Desktop Only */}
                    <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary/60 items-center justify-center shadow-xl z-10 ring-4 ring-background group-hover:scale-110 transition-transform">
                      <milestone.icon className="w-7 h-7 text-primary-foreground" />
                    </div>

                    {/* Spacer for layout */}
                    <div className="hidden md:block w-[calc(50%-2rem)]" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services & Pricing Section */}
      <section id="services" className="section-padding-sm bg-gradient-to-b from-background to-accent/30 scroll-mt-20">
        <div className="container-wide">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="mb-3">Our Services & Pricing</h2>
            <p className="text-muted-foreground text-base max-w-2xl mx-auto">
              Complete AC solutions with transparent pricing. No hidden charges, just honest service.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {services.sort((a, b) => a.displayOrder - b.displayOrder).map((service, index) => (
              <motion.div key={service.id} variants={fadeInUp} transition={{ duration: 0.5 }}>
                <Card className="h-full card-hover card-glow border-0 shadow-md bg-gradient-card overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full transform translate-x-8 -translate-y-8" />
                  <CardHeader className="pb-3 relative">
                    <CardTitle className="text-base group-hover:text-primary transition-colors">{service.name}</CardTitle>
                    <p className="text-xs text-muted-foreground mt-1.5">{service.description}</p>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="mb-3">
                      <div className="text-2xl font-bold text-gradient">{service.priceLabel}</div>
                    </div>
                    {service.covered && service.covered.length > 0 && (
                      <div className="pt-3 border-t border-border/50">
                        <span className="text-xs font-semibold text-foreground block mb-2 flex items-center gap-1.5">
                          <CheckCircle className="w-3.5 h-3.5 text-primary" />
                          What's Covered:
                        </span>
                        <ul className="space-y-1.5">
                          {service.covered.slice(0, 3).map((item, idx) => (
                            <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                              <span className="text-primary flex-shrink-0 mt-0.5">✓</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="gap-2 pt-0">
                    <Button onClick={() => scrollToSection("contact")} size="sm" className="flex-1 shadow-primary">
                      Book Now
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1.5" onClick={() => handleWhatsApp(`Hi! I'd like to know more about ${service.name}.`)}>
                      <MessageCircle className="w-3.5 h-3.5" />
                      Ask
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Important Notes & GST Info */}
          <motion.div 
            className="grid md:grid-cols-2 gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-background border-border shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  Important Notes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Final pricing confirmed after free inspection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Parts & materials charged separately if needed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>All services include warranty</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>AMC customers get priority support & discounts</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20 shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-base text-primary flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  GST Invoice Available
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  GST registered business providing official invoices for all services.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Official invoices for all services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Claim input tax credit on business expenses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-mono text-foreground">GSTIN: {CONTACT_INFO.gstin}</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding-sm bg-background scroll-mt-20">
        <div className="container-wide">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 px-4 py-1.5 bg-primary/10 text-primary border-primary/20">
              <HeartHandshake className="w-3.5 h-3.5 mr-1" />
              Customer Testimonials
            </Badge>
            <h2 className="mb-3">What Our Customers Say</h2>
            <p className="text-muted-foreground text-base max-w-2xl mx-auto">
              Real reviews from real customers across Pune & PCMC
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {testimonials.filter(t => t.show_on_home).map((testimonial, index) => (
              <motion.div key={testimonial.id} variants={fadeInUp} transition={{ duration: 0.5 }}>
                <Card className="h-full card-hover card-glow border-0 shadow-md bg-gradient-card">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <CardTitle className="text-base mb-1">{testimonial.name}</CardTitle>
                        <p className="text-xs text-muted-foreground">{testimonial.city}</p>
                      </div>
                      <Quote className="w-8 h-8 text-primary/20" />
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      "{testimonial.review_text}"
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="text-center mt-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Button
              onClick={() => window.open("https://www.google.com/search?q=comfort+technical+services+pune", "_blank")}
              variant="outline"
              size="lg"
              className="gap-2 group"
            >
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 group-hover:scale-110 transition-transform" />
              Read More Reviews on Google
            </Button>
          </motion.div>
        </div>
      </section>


      {/* AMC Plans */}
      <section id="amc" className="section-padding-sm bg-gradient-to-b from-accent/30 to-background scroll-mt-20">
        <div className="container-wide">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 px-4 py-1.5 bg-secondary/10 text-secondary border-secondary/20">
              <Award className="w-3.5 h-3.5 mr-1" />
              AMC Plans
            </Badge>
            <h2 className="mb-3">Annual Maintenance Plans</h2>
            <p className="text-muted-foreground text-base max-w-2xl mx-auto">
              Keep your AC running efficiently year-round with our comprehensive maintenance plans
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {activePlans.map((plan, index) => (
              <motion.div key={plan.id} variants={fadeInUp} transition={{ duration: 0.5 }}>
                <Card className={`card-hover card-glow h-full border-0 shadow-md relative overflow-hidden ${
                  index === 1 ? 'ring-2 ring-primary shadow-primary' : 'bg-gradient-card'
                }`}>
                  {index === 1 && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-primary text-primary-foreground shadow-primary">
                        Popular
                      </Badge>
                    </div>
                  )}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-primary" />
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl mb-1">{plan.name}</CardTitle>
                    <CardDescription className="text-sm">{plan.targetCustomer}</CardDescription>
                    <div className="mt-4 p-4 bg-accent/50 rounded-lg">
                      <div className="text-3xl font-bold text-gradient mb-1">{plan.priceLabel}</div>
                      <p className="text-sm text-muted-foreground">{plan.visitsPerYear} visits/year</p>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <ul className="space-y-2.5">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button onClick={() => scrollToSection("contact")} className="flex-1 shadow-primary">
                      Enquire Now
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => handleWhatsApp(`Hi! I'm interested in the ${plan.name} AMC plan.`)}>
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Service Areas */}
      <section id="service-areas" className="section-padding-sm bg-background scroll-mt-20">
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
            <Button variant={selectedCity === null ? "default" : "outline"} size="sm" onClick={() => setSelectedCity(null)}>
              All Areas
            </Button>
            {cities.map(city => (
              <Button key={city} variant={selectedCity === city ? "default" : "outline"} size="sm" onClick={() => setSelectedCity(city)}>
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
                  <Badge variant="secondary" className="px-3 py-1.5 text-xs">{area.area_name}</Badge>
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
              <Button onClick={() => handleWhatsApp("Hi! I'd like to check if you service my area.")} className="gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white">
                <MessageCircle className="w-4 h-4" />Check Availability
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="section-padding-sm bg-background scroll-mt-20">
        <div className="container-wide">
          <h2 className="text-center mb-2">Our Work Gallery</h2>
          <p className="text-center text-muted-foreground text-sm mb-6">
            Professional AC services in action
          </p>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.id}
                variants={fadeInUp}
                transition={{ duration: 0.3 }}
                className="group relative overflow-hidden rounded-lg cursor-pointer aspect-[4/3]"
                onClick={() => setSelectedImageIndex(index)}
              >
                <LazyImage
                  src={image.image_url}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end">
                  <div className="p-3 text-background">
                    <h3 className="font-medium text-sm">{image.title}</h3>
                    <p className="text-xs opacity-80 line-clamp-2">{image.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              className="fixed inset-0 bg-foreground/95 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedImageIndex(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.button
                className="absolute top-4 right-4 text-background hover:text-background/70 z-10"
                onClick={(e) => { e.stopPropagation(); setSelectedImageIndex(null); }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <X className="w-6 h-6" />
              </motion.button>

              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 text-background hover:text-background/70 bg-foreground/50 rounded-full p-2"
                onClick={(e) => { e.stopPropagation(); handlePrevious(); }}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 text-background hover:text-background/70 bg-foreground/50 rounded-full p-2"
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <motion.div 
                className="max-w-4xl max-h-[90vh] flex flex-col items-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                {lightboxImageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-background/30 border-t-background rounded-full animate-spin" />
                  </div>
                )}
                <img
                  src={selectedImage.image_url}
                  alt={selectedImage.title}
                  className={`max-w-full max-h-[80vh] object-contain rounded-lg ${lightboxImageLoading ? 'opacity-0' : 'opacity-100'}`}
                  onLoad={() => setLightboxImageLoading(false)}
                />
                <div className="text-background mt-3 text-center">
                  <p className="text-sm font-medium">{selectedImage.title}</p>
                  <p className="text-xs opacity-70">
                    {selectedImageIndex !== null && `${selectedImageIndex + 1} / ${galleryImages.length}`}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* About & FAQs Section */}
      <section id="about" className="section-padding-sm bg-accent/50 scroll-mt-20">
        <div className="container-wide">
          <h2 className="text-center mb-2">About Us</h2>
          <p className="text-center text-muted-foreground text-sm mb-6 max-w-xl mx-auto">
            Your trusted AC service partner in Pune & PCMC since 2018
          </p>

          <div className="max-w-2xl mx-auto mb-8">
            <Card className="bg-background">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Our Story</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>Since 2018, we've been providing professional AC services in Pune & PCMC. With 7+ years of experience, we deliver reliable installation, maintenance, and repair services to homes and businesses.</p>
                  <p>We prioritize outstanding customer service through prompt repairs, clear communication, and affordable pricing. We've worked with multiple companies in Pune, building lasting relationships through professionalism and quality care.</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
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
                  <Card className="text-center p-4">
                    <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                    <StatCounter />
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <h3 className="text-base font-semibold text-center mb-4">Our Journey</h3>
            <div className="space-y-3">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <Card className="bg-background">
                    <CardContent className="p-4 flex items-start gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <milestone.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-baseline gap-2 mb-1">
                          <span className="text-xs font-bold text-primary">{milestone.year}</span>
                          <span className="text-sm font-semibold">{milestone.title}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{milestone.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* FAQs */}
          <div className="mt-10">
            <h3 className="text-lg font-semibold text-center mb-2">Frequently Asked Questions</h3>
            <p className="text-center text-muted-foreground text-xs mb-6 max-w-xl mx-auto">
              Common questions about our AC services
            </p>

            <div className="flex flex-wrap justify-center gap-2 mb-5 max-w-2xl mx-auto">
              <Button variant={selectedCategory === null ? "default" : "outline"} size="sm" onClick={() => setSelectedCategory(null)}>
                All
              </Button>
              {categories.map(category => (
                <Button key={category} variant={selectedCategory === category ? "default" : "outline"} size="sm" onClick={() => setSelectedCategory(category)}>
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
                      <AccordionTrigger className="text-sm text-left py-3">{faq.question}</AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground pb-4">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            </AnimatePresence>

            <Card className="mt-6 bg-background text-center max-w-lg mx-auto">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Still Have Questions?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-3">
                  Contact us directly for any queries
                </p>
                <Button onClick={() => scrollToSection("contact")} size="sm">Contact Us</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section-padding bg-accent/50 scroll-mt-20">
        <div className="container-wide">
          <h2 className="text-center mb-2">Contact Us & Book Service</h2>
          <p className="text-center text-muted-foreground text-sm mb-6">
            Get in touch or book your service online
          </p>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Get In Touch</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Phone</p>
                      <a href={`tel:${CONTACT_INFO.phone}`} className="text-xs text-primary hover:underline block">{CONTACT_INFO.phone}</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MessageCircle className="w-4 h-4 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">WhatsApp</p>
                      <button onClick={() => handleWhatsApp()} className="text-xs text-primary hover:underline">Chat on WhatsApp</button>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Working Hours</p>
                      <p className="text-xs text-muted-foreground">{CONTACT_INFO.workingHours}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Quick Enquiry</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground mb-3">For quick assistance, reach us on WhatsApp</p>
                  <Button onClick={() => handleWhatsApp()} className="w-full gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white">
                    <MessageCircle className="w-4 h-4" />Open WhatsApp
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Book a Service</CardTitle>
                <CardDescription className="text-xs">Fill details and we'll contact you</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <Label htmlFor="name" className="text-xs">Full Name *</Label>
                    <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Your name" required className="h-9" />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-xs">Mobile Number *</Label>
                    <Input id="phone" type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="10-digit number" required className="h-9" />
                  </div>

                  <div>
                    <Label htmlFor="serviceType" className="text-xs">Service Type *</Label>
                    <Select value={formData.serviceType} onValueChange={(value) => setFormData({ ...formData, serviceType: value })}>
                      <SelectTrigger className="h-9"><SelectValue placeholder="Select service" /></SelectTrigger>
                      <SelectContent>
                        {SERVICES.map((service) => <SelectItem key={service.id} value={service.name}>{service.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="acType" className="text-xs">AC Type *</Label>
                      <Select value={formData.acType} onValueChange={(value) => setFormData({ ...formData, acType: value })}>
                        <SelectTrigger className="h-9"><SelectValue placeholder="Select type" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Split">Split AC</SelectItem>
                          <SelectItem value="Window">Window AC</SelectItem>
                          <SelectItem value="Cassette">Cassette AC</SelectItem>
                          <SelectItem value="Central">Central AC</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="units" className="text-xs">Units *</Label>
                      <Input id="units" type="number" min="1" value={formData.units} onChange={(e) => setFormData({ ...formData, units: e.target.value })} className="h-9" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address" className="text-xs">Address *</Label>
                    <Textarea id="address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} placeholder="Full address" required className="min-h-[60px]" />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="city" className="text-xs">City *</Label>
                      <Input id="city" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} placeholder="e.g., Pune" required className="h-9" />
                    </div>
                    <div>
                      <Label htmlFor="pincode" className="text-xs">Pincode</Label>
                      <Input id="pincode" value={formData.pincode} onChange={(e) => setFormData({ ...formData, pincode: e.target.value })} placeholder="6 digits" className="h-9" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="preferredContactMode" className="text-xs">Contact Via *</Label>
                    <Select value={formData.preferredContactMode} onValueChange={(value) => setFormData({ ...formData, preferredContactMode: value })}>
                      <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Call">Call</SelectItem>
                        <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button type="submit" className="w-full">Submit Booking Request</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-accent border-t">
        <div className="container-wide py-6">
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div>
              <h3 className="font-semibold mb-2 text-sm">{CONTACT_INFO.companyName}</h3>
              <p className="text-xs text-muted-foreground">{CONTACT_INFO.experienceText}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-sm">Contact</h3>
              <div className="space-y-1 text-xs text-muted-foreground">
                <p>Phone: {CONTACT_INFO.phone}</p>
                <p>Email: {CONTACT_INFO.email}</p>
                <p>{CONTACT_INFO.workingHours}</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-sm">Business Details</h3>
              <div className="space-y-1 text-xs text-muted-foreground">
                <p>GSTIN: {CONTACT_INFO.gstin}</p>
                <p>PAN: {CONTACT_INFO.pan}</p>
              </div>
            </div>
          </div>
          <div className="text-center text-xs text-muted-foreground border-t pt-4">
            © {new Date().getFullYear()} {CONTACT_INFO.companyName}. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
