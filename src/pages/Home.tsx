import { Phone, MessageCircle, CheckCircle, Clock, Shield, Users, Award, ThumbsUp, TrendingUp, X, ChevronLeft, ChevronRight, FileText, Star, Sparkles, Zap, HeartHandshake, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { LazyImage } from "@/components/LazyImage";
import { PriceCalculator } from "@/components/PriceCalculator";
import { CONTACT_INFO, SERVICES } from "@/config/contact";
import { galleryImages, testimonials } from "@/data/staticData";
import { useServices, useAmcPlans } from "@/contexts/DataStoreContext";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { scrollToSection } from "@/utils/scrollToSection";
import { openWhatsApp, buildWhatsAppUrl } from "@/utils/whatsappHelper";
import { useState, useEffect } from "react";
import { toast } from "sonner";
const Home = () => {
  const {
    scrollY
  } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const [services] = useServices();
  const [amcPlans] = useAmcPlans();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [lightboxImageLoading, setLightboxImageLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    serviceType: "",
    acType: "",
    units: "1",
    preferredDate: "",
    preferredTimeSlot: "",
    address: "",
    city: "",
    pincode: "",
    preferredContactMode: "Call",
    notes: ""
  });

  // Prepare data
  const activePlans = amcPlans.filter(plan => plan.isActive).sort((a, b) => a.displayOrder - b.displayOrder);
  const selectedImage = selectedImageIndex !== null ? galleryImages[selectedImageIndex] : null;
  const handleCall = () => window.location.href = `tel:${CONTACT_INFO.phone}`;
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

    // Validate input lengths for security
    if (formData.name.length > 100) {
      toast.error("Name must be less than 100 characters");
      return;
    }
    if (formData.notes && formData.notes.length > 500) {
      toast.error("Notes must be less than 500 characters");
      return;
    }

    // Use the WhatsApp helper with form payload
    openWhatsApp({
      type: "form",
      formData: {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email?.trim(),
        serviceType: formData.serviceType,
        acType: formData.acType,
        units: formData.units,
        preferredDate: formData.preferredDate,
        preferredTimeSlot: formData.preferredTimeSlot,
        address: formData.address.trim(),
        city: formData.city.trim(),
        pincode: formData.pincode?.trim(),
        preferredContactMode: formData.preferredContactMode,
        notes: formData.notes?.trim()
      }
    });
    toast.success("Opening WhatsApp... Please send the message to complete your booking.");
    setFormData({
      name: "",
      phone: "",
      email: "",
      serviceType: "",
      acType: "",
      units: "1",
      preferredDate: "",
      preferredTimeSlot: "",
      address: "",
      city: "",
      pincode: "",
      preferredContactMode: "Call",
      notes: ""
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
      if (e.key === "Escape") setSelectedImageIndex(null);else if (e.key === "ArrowLeft") handlePrevious();else if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex]);

  // Animation variants
  const fadeInUp = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0
    }
  };
  const staggerContainer = {
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  return <div className="min-h-screen">
      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden scroll-mt-20 bg-gradient-hero pattern-dots">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <motion.div className="container-wide relative z-10 section-padding" style={{
        y: heroY,
        opacity: heroOpacity
      }}>
          <div className="text-center max-w-4xl mx-auto">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            ease: "easeOut"
          }}>
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
            
            <motion.div className="flex flex-wrap justify-center gap-3 mb-8" initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            delay: 0.2
          }}>
              <Button onClick={() => scrollToSection("contact")} size="lg" className="group shadow-primary">
                <span>Book Service</span>
                <Zap className="w-4 h-4 ml-2 group-hover:scale-110 transition-transform" />
              </Button>
              <Button onClick={handleCall} variant="outline" size="lg" className="gap-2 group">
                <Phone className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                Call Now
              </Button>
              <Button onClick={() => openWhatsApp({
              type: "general",
              sourceSection: "Website - Hero Section"
            })} size="lg" className="gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white group">
                <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                WhatsApp
              </Button>
            </motion.div>

            <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto" initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            duration: 0.8,
            delay: 0.4
          }}>
              {[{
              label: "AC Units Serviced",
              value: "10,000+"
            }, {
              label: "Happy Customers",
              value: "5,000+"
            }, {
              label: "Google Rating",
              value: "5.0/5"
            }, {
              label: "Same Day Service",
              value: "Available"
            }].map((stat, i) => <div key={i} className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                </div>)}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding-sm bg-background scroll-mt-20">
        <div className="container-wide">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }} className="text-center mb-12">
            <h2 className="mb-3">Why Choose Us?</h2>
            <p className="text-muted-foreground text-base max-w-2xl mx-auto">
              Trusted by thousands in Pune & PCMC for professional AC services
            </p>
          </motion.div>
          
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" initial="hidden" whileInView="visible" viewport={{
          once: true,
          margin: "-100px"
        }} variants={staggerContainer}>
            {[{
            icon: Clock,
            title: "Same-Day Service",
            desc: "Quick response for urgent repairs",
            gradient: "from-blue-500 to-cyan-500"
          }, {
            icon: Shield,
            title: "Warranty Assured",
            desc: "Service warranty on all work",
            gradient: "from-purple-500 to-pink-500"
          }, {
            icon: Users,
            title: "Expert Team",
            desc: "Certified technicians",
            gradient: "from-orange-500 to-red-500"
          }, {
            icon: TrendingUp,
            title: "Best Rates",
            desc: "Transparent pricing",
            gradient: "from-green-500 to-teal-500"
          }].map((item, index) => <motion.div key={index} variants={fadeInUp} transition={{
            duration: 0.5
          }}>
                <Card className="text-center card-hover card-glow h-full border-0 shadow-md bg-gradient-card">
                  <CardHeader className="pb-4">
                    <div className={`mx-auto w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center mb-4 icon-container-glow shadow-colored`}>
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-lg mb-2">{item.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </CardHeader>
                </Card>
              </motion.div>)}
          </motion.div>
        </div>
      </section>

      {/* Services & Pricing Section */}
      <section id="services" className="section-padding-sm bg-gradient-to-b from-background to-accent/30 scroll-mt-20">
        <div className="container-wide">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }} className="text-center mb-12">
            <h2 className="mb-3">Our Services & Pricing</h2>
            <p className="text-muted-foreground text-base max-w-2xl mx-auto">
              Complete AC solutions with transparent pricing. No hidden charges, just honest service.
            </p>
          </motion.div>
          
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10" initial="hidden" whileInView="visible" viewport={{
          once: true
        }} variants={staggerContainer}>
            {services.sort((a, b) => a.displayOrder - b.displayOrder).map((service, index) => <motion.div key={service.id} variants={fadeInUp} transition={{
            duration: 0.5
          }}>
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
                    {service.covered && service.covered.length > 0 && <div className="pt-3 border-t border-border/50">
                        <span className="text-xs font-semibold text-foreground block mb-2 flex items-center gap-1.5">
                          <CheckCircle className="w-3.5 h-3.5 text-primary" />
                          What's Covered:
                        </span>
                        <ul className="space-y-1.5">
                          {service.covered.slice(0, 3).map((item, idx) => <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                              <span className="text-primary flex-shrink-0 mt-0.5">✓</span>
                              <span>{item}</span>
                            </li>)}
                        </ul>
                      </div>}
                  </CardContent>
                  <CardFooter className="gap-2 pt-0">
                    <Button onClick={() => openWhatsApp({
                  type: "service",
                  serviceName: service.name,
                  priceLabel: service.priceLabel,
                  description: service.description,
                  sourceSection: "Website - Services Section (Book Now)"
                })} size="sm" className="flex-1 shadow-primary">
                      Book Now
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1.5" onClick={() => openWhatsApp({
                  type: "service",
                  serviceName: service.name,
                  priceLabel: service.priceLabel,
                  description: service.description,
                  sourceSection: "Website - Services Section (Ask)"
                })}>
                      <MessageCircle className="w-3.5 h-3.5" />
                      Ask
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>)}
          </motion.div>

          {/* Important Notes & GST Info */}
          <motion.div className="grid md:grid-cols-2 gap-6" initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }}>
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
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }} className="text-center mb-12">
            <Badge className="mb-4 px-4 py-1.5 bg-primary/10 text-primary border-primary/20">
              <HeartHandshake className="w-3.5 h-3.5 mr-1" />
              Customer Testimonials
            </Badge>
            <h2 className="mb-3">What Our Customers Say</h2>
            <p className="text-muted-foreground text-base max-w-2xl mx-auto">
              Real reviews from real customers across Pune & PCMC
            </p>
          </motion.div>

          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" initial="hidden" whileInView="visible" viewport={{
          once: true
        }} variants={staggerContainer}>
            {testimonials.filter(t => t.show_on_home).map((testimonial, index) => <motion.div key={testimonial.id} variants={fadeInUp} transition={{
            duration: 0.5
          }}>
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
                      {Array.from({
                    length: testimonial.rating
                  }).map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      "{testimonial.review_text}"
                    </p>
                  </CardContent>
                </Card>
              </motion.div>)}
          </motion.div>

          <motion.div className="text-center mt-10" initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6,
          delay: 0.2
        }}>
            <Button onClick={() => window.open("https://www.google.com/search?q=comfort+technical+services+pune", "_blank")} variant="outline" size="lg" className="gap-2 group">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 group-hover:scale-110 transition-transform" />
              Read More Reviews on Google
            </Button>
          </motion.div>
        </div>
      </section>


      {/* AMC Plans */}
      <section id="amc" className="section-padding-sm bg-gradient-to-b from-accent/30 to-background scroll-mt-20">
        <div className="container-wide">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }} className="text-center mb-12">
            <Badge className="mb-4 px-4 py-1.5 bg-secondary/10 text-secondary border-secondary/20">
              <Award className="w-3.5 h-3.5 mr-1" />
              AMC Plans
            </Badge>
            <h2 className="mb-3">Annual Maintenance Plans</h2>
            <p className="text-muted-foreground text-base max-w-2xl mx-auto">
              Keep your AC running efficiently year-round with our comprehensive maintenance plans
            </p>
          </motion.div>

          <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6" initial="hidden" whileInView="visible" viewport={{
          once: true
        }} variants={staggerContainer}>
            {activePlans.map((plan, index) => <motion.div key={plan.id} variants={fadeInUp} transition={{
            duration: 0.5
          }}>
                <Card className={`card-hover card-glow h-full border-0 shadow-md relative overflow-hidden ${index === 1 ? 'ring-2 ring-primary shadow-primary' : 'bg-gradient-card'}`}>
                  {index === 1 && <div className="absolute top-4 right-4">
                      <Badge className="bg-primary text-primary-foreground shadow-primary">
                        Popular
                      </Badge>
                    </div>}
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
                      {plan.features.map((feature, idx) => <li key={idx} className="flex items-start gap-2.5">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-foreground">{feature}</span>
                        </li>)}
                    </ul>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button onClick={() => openWhatsApp({
                  type: "amc",
                  planName: plan.name,
                  visitsPerYear: plan.visitsPerYear,
                  priceLabel: plan.priceLabel,
                  targetCustomer: plan.targetCustomer,
                  sourceSection: "Website - AMC Plans Section (Enquire Now)"
                })} className="flex-1 shadow-primary">
                      Enquire Now
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => openWhatsApp({
                  type: "amc",
                  planName: plan.name,
                  visitsPerYear: plan.visitsPerYear,
                  priceLabel: plan.priceLabel,
                  targetCustomer: plan.targetCustomer,
                  sourceSection: "Website - AMC Plans Section (Quick Ask)"
                })}>
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>)}
          </motion.div>
        </div>
      </section>

      {/* Price Calculator Section */}
      <section className="section-padding-sm bg-gradient-to-b from-background via-primary/5 to-background scroll-mt-20">
        <div className="container-wide">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }} className="text-center mb-12">
            <Badge className="mb-4 px-4 py-1.5 bg-primary/10 text-primary border-primary/20">
              <Zap className="w-3.5 h-3.5 mr-1" />
              Instant Estimates
            </Badge>
            <h2 className="mb-3">Calculate Your Service Cost</h2>
            <p className="text-muted-foreground text-base max-w-2xl mx-auto">
              Get transparent pricing estimates instantly. Select your AC type and service for accurate cost calculation.
            </p>
          </motion.div>

          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6,
          delay: 0.2
        }}>
            <PriceCalculator />
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="section-padding-sm bg-background scroll-mt-20">
        <div className="container-wide">
          <h2 className="text-center mb-2">Our Work Gallery</h2>
          <p className="text-center text-muted-foreground text-sm mb-6">
            Professional AC services in action
          </p>

          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" initial="hidden" whileInView="visible" viewport={{
          once: true
        }} variants={staggerContainer}>
            {galleryImages.map((image, index) => <motion.div key={image.id} variants={fadeInUp} transition={{
            duration: 0.3
          }} className="group relative overflow-hidden rounded-lg cursor-pointer aspect-[4/3]" onClick={() => setSelectedImageIndex(index)}>
                <LazyImage src={image.image_url} alt={image.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end">
                  <div className="p-3 text-background">
                    <h3 className="font-medium text-sm">{image.title}</h3>
                    <p className="text-xs opacity-80 line-clamp-2">{image.description}</p>
                  </div>
                </div>
              </motion.div>)}
          </motion.div>
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && <motion.div className="fixed inset-0 bg-foreground/95 z-50 flex items-center justify-center p-4" onClick={() => setSelectedImageIndex(null)} initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} transition={{
          duration: 0.2
        }}>
              <motion.button className="absolute top-4 right-4 text-background hover:text-background/70 z-10" onClick={e => {
            e.stopPropagation();
            setSelectedImageIndex(null);
          }} initial={{
            scale: 0
          }} animate={{
            scale: 1
          }} exit={{
            scale: 0
          }}>
                <X className="w-6 h-6" />
              </motion.button>

              <button className="absolute left-4 top-1/2 -translate-y-1/2 text-background hover:text-background/70 bg-foreground/50 rounded-full p-2" onClick={e => {
            e.stopPropagation();
            handlePrevious();
          }}>
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button className="absolute right-4 top-1/2 -translate-y-1/2 text-background hover:text-background/70 bg-foreground/50 rounded-full p-2" onClick={e => {
            e.stopPropagation();
            handleNext();
          }}>
                <ChevronRight className="w-6 h-6" />
              </button>

              <motion.div className="max-w-4xl max-h-[90vh] flex flex-col items-center" initial={{
            scale: 0.8,
            opacity: 0
          }} animate={{
            scale: 1,
            opacity: 1
          }} exit={{
            scale: 0.8,
            opacity: 0
          }} onClick={e => e.stopPropagation()}>
                {lightboxImageLoading && <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-background/30 border-t-background rounded-full animate-spin" />
                  </div>}
                <img src={selectedImage.image_url} alt={selectedImage.title} className={`max-w-full max-h-[80vh] object-contain rounded-lg ${lightboxImageLoading ? 'opacity-0' : 'opacity-100'}`} onLoad={() => setLightboxImageLoading(false)} />
                <div className="text-background mt-3 text-center">
                  <p className="text-sm font-medium">{selectedImage.title}</p>
                  <p className="text-xs opacity-70">
                    {selectedImageIndex !== null && `${selectedImageIndex + 1} / ${galleryImages.length}`}
                  </p>
                </div>
              </motion.div>
            </motion.div>}
        </AnimatePresence>
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
                      <button onClick={() => openWhatsApp({
                      type: "general",
                      sourceSection: "Website - Contact Section (Quick Chat)"
                    })} className="text-xs text-primary hover:underline">
                        Chat on WhatsApp
                      </button>
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
                  <Button onClick={() => openWhatsApp({
                  type: "general",
                  sourceSection: "Website - Contact Section (Quick Enquiry)"
                })} className="w-full gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white">
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
                    <Input id="name" value={formData.name} onChange={e => setFormData({
                    ...formData,
                    name: e.target.value
                  })} placeholder="Your name" required className="h-9" />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-xs">Mobile Number *</Label>
                    <Input id="phone" type="tel" value={formData.phone} onChange={e => setFormData({
                    ...formData,
                    phone: e.target.value
                  })} placeholder="10-digit number" required className="h-9" />
                  </div>

                  <div>
                    <Label htmlFor="serviceType" className="text-xs">Service Type *</Label>
                    <Select value={formData.serviceType} onValueChange={value => setFormData({
                    ...formData,
                    serviceType: value
                  })}>
                      <SelectTrigger className="h-9"><SelectValue placeholder="Select service" /></SelectTrigger>
                      <SelectContent>
                        {SERVICES.map(service => <SelectItem key={service.id} value={service.name}>{service.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="acType" className="text-xs">AC Type *</Label>
                      <Select value={formData.acType} onValueChange={value => setFormData({
                      ...formData,
                      acType: value
                    })}>
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
                      <Input id="units" type="number" min="1" value={formData.units} onChange={e => setFormData({
                      ...formData,
                      units: e.target.value
                    })} className="h-9" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address" className="text-xs">Address *</Label>
                    <Textarea id="address" value={formData.address} onChange={e => setFormData({
                    ...formData,
                    address: e.target.value
                  })} placeholder="Full address" required className="min-h-[60px]" />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="city" className="text-xs">City *</Label>
                      <Input id="city" value={formData.city} onChange={e => setFormData({
                      ...formData,
                      city: e.target.value
                    })} placeholder="e.g., Pune" required className="h-9" />
                    </div>
                    <div>
                      <Label htmlFor="pincode" className="text-xs">Pincode</Label>
                      <Input id="pincode" value={formData.pincode} onChange={e => setFormData({
                      ...formData,
                      pincode: e.target.value
                    })} placeholder="6 digits" className="h-9" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="preferredContactMode" className="text-xs">Contact Via *</Label>
                    <Select value={formData.preferredContactMode} onValueChange={value => setFormData({
                    ...formData,
                    preferredContactMode: value
                  })}>
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
      
    </div>;
};
export default Home;