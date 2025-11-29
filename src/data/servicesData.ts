export interface ServiceItem {
  name: string;
  price: string;
  details: string;
  covered: string[];
}

export interface ServiceCategory {
  category: string;
  description: string;
  items: ServiceItem[];
}

export const servicesData: ServiceCategory[] = [
  {
    category: "AC Servicing",
    description: "Regular maintenance and cleaning services for all AC types",
    items: [
      { 
        name: "Split AC - Basic Service", 
        price: "₹399", 
        details: "Filter cleaning, basic inspection",
        covered: ["Air filter cleaning & sanitization", "Drain pipe check", "Remote battery check", "Basic cooling test", "Visual inspection of unit"]
      },
      { 
        name: "Split AC - Deep Cleaning", 
        price: "₹799", 
        details: "Complete wash, coil cleaning, gas pressure check",
        covered: ["Indoor coil deep cleaning with jet wash", "Outdoor condenser coil cleaning", "Blower fan cleaning", "Gas pressure check", "Drain pipe cleaning", "Filter sanitization", "Thermostat calibration", "Overall cooling performance check"]
      },
      { 
        name: "Window AC - Basic Service", 
        price: "₹349", 
        details: "Filter cleaning, basic inspection",
        covered: ["Filter mesh cleaning", "Cooling check", "Drain tray cleaning", "Knob/button functionality check", "Unit exterior cleaning"]
      },
      { 
        name: "Window AC - Deep Cleaning", 
        price: "₹699", 
        details: "Complete cleaning with coil wash",
        covered: ["Complete coil washing", "Fan blade cleaning", "Drain system cleaning", "Body panel cleaning", "Cooling efficiency test", "Noise level check"]
      }
    ]
  },
  {
    category: "Installation & Uninstallation",
    description: "Professional setup and removal services",
    items: [
      { 
        name: "Split AC Installation", 
        price: "₹799 - ₹1,499", 
        details: "Includes piping up to 3 meters, wall mounting",
        covered: ["Indoor unit wall mounting with bracket", "Outdoor unit stand/bracket installation", "Copper piping up to 3 meters", "Electrical wiring connection", "Gas charging & leak testing", "Drainage pipe setup", "Final cooling test", "Demo & usage instructions"]
      },
      { 
        name: "Window AC Installation", 
        price: "₹599 - ₹999", 
        details: "Standard window bracket installation",
        covered: ["Window bracket/frame installation", "Unit mounting & leveling", "Electrical connection", "Drain pipe setup", "Sealing & weatherproofing", "Cooling test", "Usage instructions"]
      },
      { 
        name: "AC Uninstallation", 
        price: "₹499 - ₹799", 
        details: "Safe removal with gas recovery",
        covered: ["Safe gas recovery", "Electrical disconnection", "Unit dismounting", "Piping removal", "Bracket removal (optional)", "Safe packaging for transport", "Area cleaning post-removal"]
      }
    ]
  },
  {
    category: "Repair & Gas Refill",
    description: "Expert troubleshooting and repairs",
    items: [
      { 
        name: "Gas Refilling (R22/R32)", 
        price: "₹1,499 - ₹2,499", 
        details: "Per 100g, includes leak check",
        covered: ["Complete gas evacuation", "Leak detection & sealing", "Vacuum pump treatment", "Fresh gas charging (R22/R32/R410A)", "Pressure testing", "Cooling performance check", "3-month gas warranty"]
      },
      { 
        name: "PCB Repair", 
        price: "₹799 onwards", 
        details: "Circuit board diagnostics and repair",
        covered: ["PCB diagnostics with multimeter", "Faulty component identification", "Component replacement/repair", "Soldering work", "Functionality testing", "30-day repair warranty"]
      },
      { 
        name: "Compressor Repair", 
        price: "₹1,999 onwards", 
        details: "Major component repair/replacement",
        covered: ["Compressor diagnostics", "Compressor replacement/repair", "Gas charging", "Electrical connection work", "Cooling test", "Warranty on compressor work"]
      },
      { 
        name: "General Troubleshooting", 
        price: "₹299 onwards", 
        details: "Issue diagnosis and minor fixes",
        covered: ["Complete AC inspection", "Problem diagnosis", "Minor electrical fixes", "Capacitor replacement (if needed)", "Thermostat issues", "Remote issues", "Basic repairs"]
      }
    ]
  },
  {
    category: "Additional Services",
    description: "Specialized AC solutions",
    items: [
      { 
        name: "AC Duct Cleaning", 
        price: "₹999 onwards", 
        details: "Central AC duct sanitization",
        covered: ["Duct inspection", "Dust & debris removal", "Sanitization spray treatment", "Vent cleaning", "Air quality improvement", "Before/after report"]
      },
      { 
        name: "Thermostat Installation", 
        price: "₹599 onwards", 
        details: "Smart thermostat setup",
        covered: ["Old thermostat removal", "New thermostat installation", "Wiring connection", "Configuration & setup", "App connectivity (if smart)", "Usage training"]
      },
      { 
        name: "Emergency Repair", 
        price: "₹499 onwards", 
        details: "Same-day priority service",
        covered: ["Same-day service", "Priority slot booking", "Fast diagnosis", "On-spot repair (if possible)", "Quick fixes", "Emergency support"]
      },
      { 
        name: "Preventive Maintenance", 
        price: "₹699 onwards", 
        details: "Comprehensive health check",
        covered: ["Complete AC inspection", "Gas pressure check", "Electrical system check", "Cooling efficiency test", "Coil cleaning", "Filter cleaning", "Performance report", "Maintenance recommendations"]
      }
    ]
  }
];

// Helper functions to get specific services
export const getFeaturedServices = () => {
  return [
    {
      ...servicesData[0].items[1], // Split AC Deep Cleaning
      customers: "2,500+",
      rating: "4.9",
      highlight: "Most Booked",
      features: ["Complete coil cleaning", "Gas pressure check", "Filter sanitization", "Performance optimization"]
    },
    {
      ...servicesData[2].items[0], // Gas Refilling
      name: "AC Gas Refilling",
      customers: "1,800+",
      rating: "4.8",
      highlight: "Quick Service",
      features: ["R22/R32 gas", "Leak detection", "Pressure testing", "Cooling restored"]
    },
    {
      ...servicesData[1].items[0], // Split AC Installation
      customers: "3,200+",
      rating: "4.9",
      highlight: "Expert Setup",
      features: ["Professional mounting", "Piping up to 3m", "Safe gas handling", "Testing included"]
    }
  ];
};

export const getServiceOverview = () => {
  // Get minimum prices from each category
  const servicingMin = Math.min(...servicesData[0].items.map(i => parseInt(i.price.replace(/[^0-9]/g, ''))));
  const installationMin = Math.min(...servicesData[1].items.map(i => parseInt(i.price.split('-')[0].replace(/[^0-9]/g, ''))));
  const repairsMin = Math.min(...servicesData[2].items.map(i => parseInt(i.price.split(/[-\s]/)[0].replace(/[^0-9]/g, ''))));
  
  return [
    { label: "AC Servicing", desc: "Regular maintenance & deep cleaning", price: `From ₹${servicingMin}` },
    { label: "Installation", desc: "Professional setup for all AC types", price: `From ₹${installationMin}` },
    { label: "Repairs", desc: "Fast troubleshooting & gas refill", price: `From ₹${repairsMin}` },
    { label: "AMC Plans", desc: "Annual contracts with priority support", price: "From ₹2,999" }
  ];
};
