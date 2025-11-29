export const CONTACT_INFO = {
  companyName: "Comfort Technical Services",
  ownerName: "Sagar Shinde",
  phone: "+91 77450 46520",
  phone2: "+91 82083 46628",
  whatsapp: "917745046520", // No spaces or dashes for WhatsApp API
  email: "comforttechnicalservice8@gmail.com",
  address: "COMFORT TECHNICAL SERVICES, NIKHIL NIWAS, SURVEY NO.179, SHOP NO-02, FIRST FLOOR, NEAR GA, Pune, PIMPRI CHINCHWAD, MH 411035",
  gstin: "27HEKPS5234F1Z4",
  pan: "HEKPS5234F",
  workingHours: "Open 24 Hours",
  establishedYear: 2018,
  experienceText: "Serving Pune since 2018 with 7+ years of experience",
  googleMapsUrl: "https://share.google/XJivVac422OwnkpZo",
  googleRating: 5.0,
  googleReviews: 57
};

export const SERVICES = [
  {
    id: "repair",
    name: "AC Repair & Troubleshooting",
    description: "Quick diagnosis and repair of all AC issues including cooling problems, water leakage, and unusual sounds.",
    startingPrice: "₹299"
  },
  {
    id: "servicing",
    name: "AC Servicing",
    description: "Basic and deep cleaning services to maintain optimal AC performance and air quality.",
    startingPrice: "₹399"
  },
  {
    id: "installation",
    name: "AC Installation & Uninstallation",
    description: "Professional installation and safe uninstallation of all AC types - Split AC, Commercial AC, Ductable AC, VRV systems.",
    startingPrice: "₹799"
  },
  {
    id: "gas-refill",
    name: "Gas Refilling & Leakage Fix",
    description: "Expert gas refilling and leakage detection to restore cooling efficiency.",
    startingPrice: "₹1,499"
  },
  {
    id: "buy-sell",
    name: "Buy & Sell AC Units",
    description: "Purchase new AC units or sell your old units. We deal in both old and new AC units of all types.",
    startingPrice: "Contact us"
  },
  {
    id: "fridge-cooler",
    name: "Fridge & Water Cooler Service",
    description: "Repair and maintenance services for refrigerators and water coolers of all brands.",
    startingPrice: "₹399"
  },
  {
    id: "washing-machine",
    name: "Washing Machine Service",
    description: "Expert repair and servicing for all types of washing machines - top load, front load, and semi-automatic.",
    startingPrice: "₹399"
  },
  {
    id: "electrical",
    name: "Electrical Work",
    description: "Professional electrical services including wiring, repairs, and installations for homes and offices.",
    startingPrice: "₹299"
  },
  {
    id: "amc-home",
    name: "AMC for Homes",
    description: "Annual maintenance contracts with regular servicing and priority support for residential properties.",
    startingPrice: "₹2,999/year"
  },
  {
    id: "amc-commercial",
    name: "AMC for Offices/Commercial",
    description: "Comprehensive AMC plans for offices and commercial spaces with multiple AC units.",
    startingPrice: "Contact us"
  }
];

export const AMC_PLANS = [
  {
    name: "Basic",
    subtitle: "For Small Homes",
    price: "₹2,999",
    duration: "/year",
    visits: "2 visits/year",
    features: [
      "Basic cleaning & servicing",
      "Filter cleaning",
      "Gas pressure check",
      "General inspection",
      "Priority support"
    ]
  },
  {
    name: "Standard",
    subtitle: "Most Popular",
    price: "₹4,999",
    duration: "/year",
    visits: "3 visits/year",
    features: [
      "All Basic features",
      "Deep cleaning included",
      "Minor repairs covered",
      "Gas top-up (up to 100g)",
      "24/7 emergency support",
      "10% off on parts"
    ],
    popular: true
  },
  {
    name: "Premium",
    subtitle: "For Offices",
    price: "₹7,999",
    duration: "/year",
    visits: "4 visits/year",
    features: [
      "All Standard features",
      "Free gas refill (up to 250g)",
      "All minor repairs free",
      "Same-day response",
      "Dedicated technician",
      "15% off on parts"
    ]
  }
];