import { Users, Award, Clock, ThumbsUp, Building2, FileText, Shield, Rocket, Target, Star, TrendingUp } from "lucide-react";
import { CONTACT_INFO } from "@/config/contact";
import { motion } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";

const About = () => {
  const stats = [
    { icon: Award, label: "Years Experience", value: 7, suffix: "+" },
    { icon: Users, label: "AC Units Serviced", value: 10000, suffix: "+" },
    { icon: ThumbsUp, label: "Google Reviews", value: 57, suffix: "" },
    { icon: Clock, label: "Google Rating", value: 5.0, suffix: "/5", isDecimal: true }
  ];

  const milestones = [
    { year: "2018", title: "Foundation", description: "Started Comfort Technical Services in Pune with a vision to provide reliable AC services", icon: Rocket },
    { year: "2019", title: "First 500 Customers", description: "Reached our first 500 satisfied customers and expanded service coverage across Pune", icon: Target },
    { year: "2020", title: "GST Registration", description: "Became a registered GST business, offering professional invoices to all customers", icon: FileText },
    { year: "2021", title: "PCMC Expansion", description: "Extended services to PCMC area including Akurdi, Chinchwad, and surrounding regions", icon: TrendingUp },
    { year: "2023", title: "10,000+ Services", description: "Crossed the milestone of 10,000+ AC units serviced with 5-star customer ratings", icon: Star },
    { year: "2024", title: "AMC Programs", description: "Launched comprehensive Annual Maintenance Contract programs for homes and businesses", icon: Award }
  ];

  return (
    <div className="min-h-screen section-padding">
      <div className="container-wide">
        <div className="text-center mb-10">
          <h1 className="mb-2">About {CONTACT_INFO.companyName}</h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm">Your trusted partner for professional air conditioning services in Pune & PCMC</p>
          {CONTACT_INFO.ownerName && <p className="text-muted-foreground text-sm mt-1">Proprietor: <span className="font-medium text-foreground">{CONTACT_INFO.ownerName}</span></p>}
        </div>

        <div className="max-w-2xl mx-auto mb-12">
          <div className="bg-accent rounded-lg p-6">
            <h2 className="mb-3">Our Story</h2>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>{CONTACT_INFO.companyName} has been providing professional AC services in the Pune region since 2018. {CONTACT_INFO.experienceText}, delivering reliable installation, maintenance, and repair services with outstanding customer care.</p>
              <p>We place a high priority on providing outstanding customer service through prompt and dependable repairs, open communication, and affordable prices.</p>
              <p>We facilitate flawless living and operational excellence; we are more than just a repair service. We want to create long-lasting connections that endure by keeping the greatest standards of professionalism, ethics, and customer care.</p>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-center mb-8">Our Journey</h2>
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-3 sm:left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-px" />
            {milestones.map((milestone, index) => (
              <div key={milestone.year} className={`relative flex items-start mb-6 last:mb-0 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                <div className={`ml-8 sm:ml-10 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8"}`}>
                  <div className="bg-card border border-border rounded-lg p-3 sm:p-4 card-hover">
                    <span className="inline-block px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded mb-1">{milestone.year}</span>
                    <h3 className="text-sm font-semibold mb-1">{milestone.title}</h3>
                    <p className="text-xs text-muted-foreground">{milestone.description}</p>
                  </div>
                </div>
                <div className="absolute left-3 sm:left-4 md:left-1/2 w-6 h-6 sm:w-8 sm:h-8 bg-primary rounded-full flex items-center justify-center -translate-x-1/2 border-2 sm:border-4 border-background">
                  <milestone.icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary-foreground" />
                </div>
                <div className="hidden md:block md:w-1/2" />
              </div>
            ))}
          </div>
        </div>

        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            visible: {
              transition: { staggerChildren: 0.1 }
            }
          }}
        >
          {stats.map((stat, index) => {
            const StatCounter = () => {
              const { count, ref } = useCountUp(stat.value, 2000);
              return (
                <div ref={ref} className="text-2xl font-bold text-primary mb-0.5">
                  {stat.isDecimal ? count.toFixed(1) : count.toLocaleString()}{stat.suffix}
                </div>
              );
            };

            const isGoogleStat = stat.label === "Google Reviews" || stat.label === "Google Rating";
            const content = (
              <>
                <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                <StatCounter />
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </>
            );

            return (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: { opacity: 1, scale: 1 }
                }}
                transition={{ duration: 0.4 }}
                className="text-center p-4 bg-card rounded-lg border border-border"
              >
                {isGoogleStat ? (
                  <a 
                    href="https://www.google.com/search?q=comfort+technical+services+pune" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block hover:scale-105 transition-transform"
                  >
                    {content}
                  </a>
                ) : content}
              </motion.div>
            );
          })}
        </motion.div>

        <div className="mb-12">
          <h2 className="text-center mb-8">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: ThumbsUp, title: "Quality First", desc: "We never compromise on the quality of our work. Every service is performed with precision and care." },
              { icon: Users, title: "Customer Focused", desc: "Your satisfaction is our priority. We listen to your needs and provide tailored solutions." },
              { icon: Award, title: "Transparency", desc: "Honest pricing, clear communication, and no hidden charges." }
            ].map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <value.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-sm font-semibold mb-2">{value.title}</h3>
                <p className="text-xs text-muted-foreground">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-accent rounded-lg p-6 text-center mb-12">
          <h2 className="mb-2">Expert Technicians</h2>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto">Our team consists of certified and experienced AC technicians who undergo regular training to stay updated with the latest technologies.</p>
        </div>

        <div>
          <h2 className="text-center mb-6">Registered & Verified Business</h2>
          <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <Building2 className="w-8 h-8 text-primary mx-auto mb-2" />
              <h3 className="text-sm font-semibold mb-1">GSTIN Registered</h3>
              <p className="text-xs text-muted-foreground font-mono">{CONTACT_INFO.gstin}</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <FileText className="w-8 h-8 text-primary mx-auto mb-2" />
              <h3 className="text-sm font-semibold mb-1">PAN Verified</h3>
              <p className="text-xs text-muted-foreground font-mono">{CONTACT_INFO.pan}</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
              <h3 className="text-sm font-semibold mb-1">GST Invoices</h3>
              <p className="text-xs text-muted-foreground">Proper GST invoices provided</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;