import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calculator, MessageCircle, CheckCircle, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { openWhatsApp } from "@/utils/whatsappHelper";

interface ServiceOption {
  id: string;
  name: string;
  basePrice: number;
  maxPrice?: number;
  description: string;
  acTypes: string[];
}

const serviceOptions: ServiceOption[] = [
  { id: "basic-service", name: "Basic Service", basePrice: 349, maxPrice: 399, description: "Filter cleaning, basic inspection", acTypes: ["Split", "Window"] },
  { id: "deep-cleaning", name: "Deep Cleaning", basePrice: 699, maxPrice: 799, description: "Complete wash, coil cleaning, gas check", acTypes: ["Split", "Window"] },
  { id: "installation", name: "Installation", basePrice: 599, maxPrice: 1499, description: "Professional setup with piping & mounting", acTypes: ["Split", "Window", "Cassette"] },
  { id: "gas-refill", name: "Gas Refilling (R22/R32)", basePrice: 1499, maxPrice: 2499, description: "Per unit, includes leak check", acTypes: ["Split", "Window", "Cassette"] },
  { id: "general-repair", name: "General Troubleshooting", basePrice: 299, description: "Issue diagnosis and minor fixes", acTypes: ["Split", "Window", "Cassette"] },
  { id: "pcb-repair", name: "PCB Repair", basePrice: 799, description: "Circuit board diagnostics and repair", acTypes: ["Split", "Window"] },
  { id: "emergency", name: "Emergency Repair", basePrice: 499, description: "Same-day priority service + inspection", acTypes: ["Split", "Window", "Cassette"] },
  { id: "preventive", name: "Preventive Maintenance", basePrice: 699, description: "Comprehensive health check", acTypes: ["Split", "Window", "Cassette"] },
];

const acTypeMultipliers: Record<string, number> = {
  "Split": 1.0,
  "Window": 0.9,
  "Cassette": 1.3,
  "Central": 2.0
};

export const PriceCalculator = () => {
  const [acType, setAcType] = useState<string>("");
  const [serviceType, setServiceType] = useState<string>("");
  const [units, setUnits] = useState<string>("1");

  const availableServices = useMemo(() => {
    if (!acType) return serviceOptions;
    return serviceOptions.filter(service => service.acTypes.includes(acType));
  }, [acType]);

  const selectedService = useMemo(() => {
    return serviceOptions.find(s => s.id === serviceType);
  }, [serviceType]);

  const calculation = useMemo(() => {
    if (!acType || !selectedService || !units || parseInt(units) < 1) {
      return null;
    }

    const numUnits = parseInt(units);
    const multiplier = acTypeMultipliers[acType] || 1.0;
    
    const minPrice = Math.round(selectedService.basePrice * multiplier * numUnits);
    const maxPrice = selectedService.maxPrice 
      ? Math.round(selectedService.maxPrice * multiplier * numUnits)
      : null;

    const pricePerUnit = Math.round(selectedService.basePrice * multiplier);
    const maxPricePerUnit = selectedService.maxPrice 
      ? Math.round(selectedService.maxPrice * multiplier)
      : null;

    return {
      minPrice,
      maxPrice,
      pricePerUnit,
      maxPricePerUnit,
      numUnits,
      serviceName: selectedService.name,
      acType
    };
  }, [acType, selectedService, units]);

  const handleBooking = () => {
    if (!calculation) return;

    const priceLabel = calculation.maxPrice 
      ? `₹${calculation.minPrice.toLocaleString()} - ₹${calculation.maxPrice.toLocaleString()}`
      : `₹${calculation.minPrice.toLocaleString()}`;

    openWhatsApp({
      type: "service",
      serviceName: `${calculation.acType} AC - ${calculation.serviceName}`,
      priceLabel: `${priceLabel} (${calculation.numUnits} unit${calculation.numUnits > 1 ? 's' : ''})`,
      description: selectedService?.description || "",
      sourceSection: "Website - Price Calculator"
    });
  };

  const handleReset = () => {
    setAcType("");
    setServiceType("");
    setUnits("1");
  };

  return (
    <Card className="max-w-3xl mx-auto bg-gradient-card border-0 shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center shadow-colored">
            <Calculator className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <CardTitle className="text-xl">Price Calculator</CardTitle>
            <CardDescription className="text-sm">Get instant cost estimates for your AC service</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* AC Type Selection */}
        <div className="space-y-2">
          <Label htmlFor="ac-type" className="text-sm font-medium">AC Type *</Label>
          <Select value={acType} onValueChange={(value) => { setAcType(value); setServiceType(""); }}>
            <SelectTrigger id="ac-type" className="h-10 bg-background">
              <SelectValue placeholder="Select your AC type" />
            </SelectTrigger>
            <SelectContent className="bg-background z-50">
              <SelectItem value="Split">Split AC</SelectItem>
              <SelectItem value="Window">Window AC</SelectItem>
              <SelectItem value="Cassette">Cassette AC</SelectItem>
              <SelectItem value="Central">Central AC</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Service Type Selection */}
        <div className="space-y-2">
          <Label htmlFor="service-type" className="text-sm font-medium">Service Type *</Label>
          <Select value={serviceType} onValueChange={setServiceType} disabled={!acType}>
            <SelectTrigger id="service-type" className="h-10 bg-background">
              <SelectValue placeholder={acType ? "Select service type" : "Select AC type first"} />
            </SelectTrigger>
            <SelectContent className="bg-background z-50">
              {availableServices.map(service => (
                <SelectItem key={service.id} value={service.id}>
                  <div className="flex flex-col">
                    <span className="font-medium">{service.name}</span>
                    <span className="text-xs text-muted-foreground">{service.description}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Number of Units */}
        <div className="space-y-2">
          <Label htmlFor="units" className="text-sm font-medium">Number of Units *</Label>
          <Input 
            id="units"
            type="number" 
            min="1" 
            max="20"
            value={units} 
            onChange={(e) => setUnits(e.target.value)}
            placeholder="Enter number of AC units"
            className="h-10"
          />
        </div>

        {/* Calculation Result */}
        <AnimatePresence mode="wait">
          {calculation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mt-6 p-5 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-xl"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-1 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    Estimated Cost
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {calculation.acType} AC • {calculation.serviceName}
                  </p>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {calculation.numUnits} unit{calculation.numUnits > 1 ? 's' : ''}
                </Badge>
              </div>

              <div className="mb-4">
                <div className="text-3xl font-bold text-gradient mb-1">
                  {calculation.maxPrice 
                    ? `₹${calculation.minPrice.toLocaleString()} - ₹${calculation.maxPrice.toLocaleString()}`
                    : `₹${calculation.minPrice.toLocaleString()}`
                  }
                </div>
                <div className="text-xs text-muted-foreground">
                  {calculation.maxPricePerUnit 
                    ? `₹${calculation.pricePerUnit.toLocaleString()} - ₹${calculation.maxPricePerUnit.toLocaleString()} per unit`
                    : `₹${calculation.pricePerUnit.toLocaleString()} per unit`
                  }
                </div>
              </div>

              <div className="flex items-start gap-2 p-3 bg-background/50 rounded-lg mb-4">
                <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Final price confirmed after free inspection. Parts & materials charged separately if needed.
                </p>
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={handleBooking}
                  className="flex-1 gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  Book via WhatsApp
                </Button>
                <Button 
                  onClick={handleReset}
                  variant="outline"
                  size="sm"
                >
                  Reset
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Help Text */}
        {!calculation && (
          <div className="text-center py-6 text-sm text-muted-foreground">
            <Calculator className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>Select AC type, service, and number of units to calculate</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
