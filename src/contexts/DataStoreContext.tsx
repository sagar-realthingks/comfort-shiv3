import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

export interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  priceLabel: string;
  showOnHome: boolean;
  displayOrder: number;
  covered?: string[];
}

export interface AMCPlan {
  id: string;
  name: string;
  visitsPerYear: number;
  targetCustomer: string;
  priceLabel: string;
  features: string[];
  displayOrder: number;
  isActive: boolean;
}

interface DataStoreContextType {
  services: Service[];
  amcPlans: AMCPlan[];
  updateServices: (services: Service[]) => void;
  updateAmcPlans: (plans: AMCPlan[]) => void;
}

const DataStoreContext = createContext<DataStoreContextType | undefined>(undefined);

const defaultServices: Service[] = [
  {
    id: 'svc-1',
    name: 'Split AC - Deep Cleaning',
    description: 'Complete wash, coil cleaning, gas pressure check',
    category: 'AC Servicing',
    priceLabel: '₹799',
    showOnHome: true,
    displayOrder: 1,
    covered: ['Indoor coil deep cleaning with jet wash', 'Outdoor condenser coil cleaning', 'Blower fan cleaning', 'Gas pressure check', 'Drain pipe cleaning', 'Filter sanitization', 'Thermostat calibration', 'Overall cooling performance check']
  },
  {
    id: 'svc-2',
    name: 'Split AC - Basic Service',
    description: 'Filter cleaning, basic inspection',
    category: 'AC Servicing',
    priceLabel: '₹399',
    showOnHome: false,
    displayOrder: 2,
    covered: ['Air filter cleaning & sanitization', 'Drain pipe check', 'Remote battery check', 'Basic cooling test', 'Visual inspection of unit']
  },
  {
    id: 'svc-3',
    name: 'Window AC - Deep Cleaning',
    description: 'Complete cleaning with coil wash',
    category: 'AC Servicing',
    priceLabel: '₹699',
    showOnHome: false,
    displayOrder: 3,
    covered: ['Complete coil washing', 'Fan blade cleaning', 'Drain system cleaning', 'Body panel cleaning', 'Cooling efficiency test', 'Noise level check']
  },
  {
    id: 'svc-4',
    name: 'Window AC - Basic Service',
    description: 'Filter cleaning, basic inspection',
    category: 'AC Servicing',
    priceLabel: '₹349',
    showOnHome: false,
    displayOrder: 4,
    covered: ['Filter mesh cleaning', 'Cooling check', 'Drain tray cleaning', 'Knob/button functionality check', 'Unit exterior cleaning']
  },
  {
    id: 'svc-5',
    name: 'Gas Refilling (R22/R32)',
    description: 'Per 100g, includes leak check',
    category: 'Repair & Gas Refill',
    priceLabel: '₹1,499 - ₹2,499',
    showOnHome: true,
    displayOrder: 5,
    covered: ['Complete gas evacuation', 'Leak detection & sealing', 'Vacuum pump treatment', 'Fresh gas charging (R22/R32/R410A)', 'Pressure testing', 'Cooling performance check', '3-month gas warranty']
  },
  {
    id: 'svc-6',
    name: 'Split AC Installation',
    description: 'Includes piping up to 3 meters, wall mounting',
    category: 'Installation & Uninstallation',
    priceLabel: '₹799 - ₹1,499',
    showOnHome: true,
    displayOrder: 6,
    covered: ['Indoor unit wall mounting with bracket', 'Outdoor unit stand/bracket installation', 'Copper piping up to 3 meters', 'Electrical wiring connection', 'Gas charging & leak testing', 'Drainage pipe setup', 'Final cooling test', 'Demo & usage instructions']
  },
  {
    id: 'svc-7',
    name: 'Window AC Installation',
    description: 'Standard window bracket installation',
    category: 'Installation & Uninstallation',
    priceLabel: '₹599 - ₹999',
    showOnHome: false,
    displayOrder: 7,
    covered: ['Window bracket/frame installation', 'Unit mounting & leveling', 'Electrical connection', 'Drain pipe setup', 'Sealing & weatherproofing', 'Cooling test', 'Usage instructions']
  },
  {
    id: 'svc-8',
    name: 'AC Uninstallation',
    description: 'Safe removal with gas recovery',
    category: 'Installation & Uninstallation',
    priceLabel: '₹499 - ₹799',
    showOnHome: false,
    displayOrder: 8,
    covered: ['Safe gas recovery', 'Electrical disconnection', 'Unit dismounting', 'Piping removal', 'Bracket removal (optional)', 'Safe packaging for transport', 'Area cleaning post-removal']
  },
  {
    id: 'svc-9',
    name: 'General Troubleshooting',
    description: 'Issue diagnosis and minor fixes',
    category: 'Repair & Gas Refill',
    priceLabel: '₹299 onwards',
    showOnHome: false,
    displayOrder: 9,
    covered: ['Complete AC inspection', 'Problem diagnosis', 'Minor electrical fixes', 'Capacitor replacement (if needed)', 'Thermostat issues', 'Remote issues', 'Basic repairs']
  },
  {
    id: 'svc-10',
    name: 'PCB Repair',
    description: 'Circuit board diagnostics and repair',
    category: 'Repair & Gas Refill',
    priceLabel: '₹799 onwards',
    showOnHome: false,
    displayOrder: 10,
    covered: ['PCB diagnostics with multimeter', 'Faulty component identification', 'Component replacement/repair', 'Soldering work', 'Functionality testing', '30-day repair warranty']
  },
  {
    id: 'svc-11',
    name: 'Compressor Repair',
    description: 'Major component repair/replacement',
    category: 'Repair & Gas Refill',
    priceLabel: '₹1,999 onwards',
    showOnHome: false,
    displayOrder: 11,
    covered: ['Compressor diagnostics', 'Compressor replacement/repair', 'Gas charging', 'Electrical connection work', 'Cooling test', 'Warranty on compressor work']
  }
];

const defaultAmcPlans: AMCPlan[] = [
  {
    id: 'amc-1',
    name: 'Basic Plan',
    visitsPerYear: 2,
    targetCustomer: 'Home',
    priceLabel: 'From ₹2,999/year',
    features: [
      '2 scheduled service visits per year',
      'Filter cleaning & sanitization',
      'Gas pressure check',
      'General inspection',
      'Priority booking',
      '10% discount on repairs'
    ],
    displayOrder: 1,
    isActive: true
  },
  {
    id: 'amc-2',
    name: 'Standard Plan',
    visitsPerYear: 3,
    targetCustomer: 'Home',
    priceLabel: 'From ₹4,999/year',
    features: [
      '3 scheduled service visits per year',
      'Deep cleaning included',
      'Gas pressure check & top-up',
      'Coil cleaning',
      'Priority booking',
      '15% discount on repairs',
      'Free emergency visit'
    ],
    displayOrder: 2,
    isActive: true
  },
  {
    id: 'amc-3',
    name: 'Premium Plan',
    visitsPerYear: 4,
    targetCustomer: 'Office',
    priceLabel: 'From ₹7,999/year',
    features: [
      '4 scheduled service visits per year',
      'Complete deep cleaning',
      'Gas refill included (up to 200g)',
      'Indoor & outdoor coil cleaning',
      'Priority emergency response',
      '20% discount on repairs',
      '2 free emergency visits',
      'Extended warranty on repairs'
    ],
    displayOrder: 3,
    isActive: true
  }
];

export const DataStoreProvider = ({ children }: { children: ReactNode }) => {
  const [services, setServices] = useState<Service[]>([]);
  const [amcPlans, setAmcPlans] = useState<AMCPlan[]>([]);

  // Function to load data from localStorage
  const loadData = useCallback(() => {
    console.log('[DataStore] Loading data from localStorage...');
    const storedServices = localStorage.getItem('cts_services');
    const storedAmcPlans = localStorage.getItem('cts_amc_plans');

    if (storedServices) {
      try {
        const parsedServices = JSON.parse(storedServices);
        console.log('[DataStore] Loaded services:', parsedServices.length);
        setServices(parsedServices);
      } catch (e) {
        console.log('[DataStore] Error parsing services, using defaults');
        setServices(defaultServices);
        localStorage.setItem('cts_services', JSON.stringify(defaultServices));
      }
    } else {
      console.log('[DataStore] No stored services, using defaults');
      setServices(defaultServices);
      localStorage.setItem('cts_services', JSON.stringify(defaultServices));
    }

    if (storedAmcPlans) {
      try {
        const parsedPlans = JSON.parse(storedAmcPlans);
        console.log('[DataStore] Loaded AMC plans:', parsedPlans.length);
        setAmcPlans(parsedPlans);
      } catch (e) {
        console.log('[DataStore] Error parsing AMC plans, using defaults');
        setAmcPlans(defaultAmcPlans);
        localStorage.setItem('cts_amc_plans', JSON.stringify(defaultAmcPlans));
      }
    } else {
      console.log('[DataStore] No stored AMC plans, using defaults');
      setAmcPlans(defaultAmcPlans);
      localStorage.setItem('cts_amc_plans', JSON.stringify(defaultAmcPlans));
    }
  }, []);

  useEffect(() => {
    // Initial load
    console.log('[DataStore] Initializing DataStoreProvider');
    loadData();

    // Listen for custom storage events (within same tab)
    const handleStorageUpdate = () => {
      console.log('[DataStore] Received storage-update event, reloading data...');
      loadData();
    };

    window.addEventListener('storage-update', handleStorageUpdate);
    console.log('[DataStore] Event listener added for storage-update');

    return () => {
      console.log('[DataStore] Cleaning up event listener');
      window.removeEventListener('storage-update', handleStorageUpdate);
    };
  }, [loadData]);

  const updateServices = (newServices: Service[]) => {
    console.log('[DataStore] Updating services:', newServices.length);
    setServices(newServices);
    localStorage.setItem('cts_services', JSON.stringify(newServices));
    console.log('[DataStore] Services saved to localStorage, dispatching event...');
    // Dispatch custom event to notify other parts of the app
    window.dispatchEvent(new Event('storage-update'));
  };

  const updateAmcPlans = (newPlans: AMCPlan[]) => {
    console.log('[DataStore] Updating AMC plans:', newPlans.length);
    setAmcPlans(newPlans);
    localStorage.setItem('cts_amc_plans', JSON.stringify(newPlans));
    console.log('[DataStore] AMC plans saved to localStorage, dispatching event...');
    // Dispatch custom event to notify other parts of the app
    window.dispatchEvent(new Event('storage-update'));
  };

  return (
    <DataStoreContext.Provider value={{ services, amcPlans, updateServices, updateAmcPlans }}>
      {children}
    </DataStoreContext.Provider>
  );
};

export const useServices = () => {
  const context = useContext(DataStoreContext);
  if (!context) {
    throw new Error('useServices must be used within DataStoreProvider');
  }
  return [context.services, context.updateServices] as const;
};

export const useAmcPlans = () => {
  const context = useContext(DataStoreContext);
  if (!context) {
    throw new Error('useAmcPlans must be used within DataStoreProvider');
  }
  return [context.amcPlans, context.updateAmcPlans] as const;
};
