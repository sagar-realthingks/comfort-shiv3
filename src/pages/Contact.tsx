import { useState } from "react";
import { Phone, Mail, MapPin, MessageCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { CONTACT_INFO, SERVICES } from "@/config/contact";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleWhatsApp = () => {
    const message = encodeURIComponent("Hello! I would like to book an AC service.");
    window.open(`https://wa.me/${CONTACT_INFO.whatsapp}?text=${message}`, "_blank");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.serviceType || !formData.acType || !formData.address || !formData.city) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Validate phone number (10 digits)
    if (!/^\d{10}$/.test(formData.phone)) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }

    // Validate pincode if provided (6 digits)
    if (formData.pincode && !/^\d{6}$/.test(formData.pincode)) {
      toast.error("Please enter a valid 6-digit pincode");
      return;
    }

    // Build WhatsApp message with properly encoded form details
    const messageParts = [
      "*New Service Booking Request*",
      "",
      `*Name:* ${encodeURIComponent(formData.name)}`,
      `*Phone:* ${encodeURIComponent(formData.phone)}`,
    ];

    if (formData.email) {
      messageParts.push(`*Email:* ${encodeURIComponent(formData.email)}`);
    }

    messageParts.push(
      `*Service:* ${encodeURIComponent(formData.serviceType)}`,
      `*AC Type:* ${encodeURIComponent(formData.acType)}`,
      `*Units:* ${encodeURIComponent(formData.units)}`
    );

    if (formData.preferredDate) {
      messageParts.push(`*Preferred Date:* ${encodeURIComponent(formData.preferredDate)}`);
    }

    if (formData.preferredTimeSlot) {
      messageParts.push(`*Time Slot:* ${encodeURIComponent(formData.preferredTimeSlot)}`);
    }

    const fullAddress = `${formData.address}, ${formData.city}${formData.pincode ? ` - ${formData.pincode}` : ''}`;
    messageParts.push(
      `*Address:* ${encodeURIComponent(fullAddress)}`,
      `*Contact Via:* ${encodeURIComponent(formData.preferredContactMode)}`
    );

    if (formData.notes) {
      messageParts.push(`*Notes:* ${encodeURIComponent(formData.notes)}`);
    }

    const message = messageParts.join("%0A");

    // Open WhatsApp with pre-filled message
    window.open(`https://wa.me/${CONTACT_INFO.whatsapp}?text=${message}`, "_blank");
    
    toast.success("Opening WhatsApp... Please send the message to complete your booking request.");
    
    // Reset form
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

  return (
    <div className="min-h-screen section-padding">
      <div className="container-wide">
        <div className="text-center mb-8">
          <h1 className="mb-2">Contact Us & Book Service</h1>
          <p className="text-muted-foreground text-sm">
            Get in touch or book your AC service online
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Contact Information */}
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Get In Touch</CardTitle>
                <CardDescription className="text-xs">Reach us through any of these channels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Address</p>
                    <p className="text-xs text-muted-foreground">{CONTACT_INFO.address}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Phone</p>
                    <a href={`tel:${CONTACT_INFO.phone}`} className="text-xs text-primary hover:underline block">
                      {CONTACT_INFO.phone}
                    </a>
                    {CONTACT_INFO.phone2 && (
                      <a href={`tel:${CONTACT_INFO.phone2}`} className="text-xs text-primary hover:underline block">
                        {CONTACT_INFO.phone2}
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MessageCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">WhatsApp</p>
                    <button onClick={handleWhatsApp} className="text-xs text-primary hover:underline">
                      Chat on WhatsApp
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <a href={`mailto:${CONTACT_INFO.email}`} className="text-xs text-primary hover:underline">
                      {CONTACT_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Working Hours</p>
                    <p className="text-xs text-muted-foreground">{CONTACT_INFO.workingHours}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Quick Enquiry</CardTitle>
                <CardDescription className="text-xs">Prefer WhatsApp?</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-3">
                  For quick questions or immediate assistance, reach us on WhatsApp.
                </p>
                <Button onClick={handleWhatsApp} className="w-full gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white">
                  <MessageCircle className="w-4 h-4" />
                  Open WhatsApp
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Booking Form */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Book a Service</CardTitle>
              <CardDescription className="text-xs">Fill in the details and we'll get back to you</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <Label htmlFor="name" className="text-xs">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    required
                    className="h-9"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-xs">Mobile Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="10-digit number"
                    required
                    className="h-9"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-xs">Email (Optional)</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    className="h-9"
                  />
                </div>

                <div>
                  <Label htmlFor="serviceType" className="text-xs">Service Type *</Label>
                  <Select value={formData.serviceType} onValueChange={(value) => setFormData({ ...formData, serviceType: value })}>
                    <SelectTrigger className="h-9">
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent>
                      {SERVICES.map((service) => (
                        <SelectItem key={service.id} value={service.name}>
                          {service.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="acType" className="text-xs">AC Type *</Label>
                    <Select value={formData.acType} onValueChange={(value) => setFormData({ ...formData, acType: value })}>
                      <SelectTrigger className="h-9">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Split">Split AC</SelectItem>
                        <SelectItem value="Window">Window AC</SelectItem>
                        <SelectItem value="Cassette">Cassette AC</SelectItem>
                        <SelectItem value="Central">Central AC</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="units" className="text-xs">Number of Units *</Label>
                    <Input
                      id="units"
                      type="number"
                      min="1"
                      value={formData.units}
                      onChange={(e) => setFormData({ ...formData, units: e.target.value })}
                      className="h-9"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="preferredDate" className="text-xs">Preferred Date</Label>
                    <Input
                      id="preferredDate"
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="h-9"
                    />
                  </div>
                  <div>
                    <Label htmlFor="preferredTimeSlot" className="text-xs">Time Slot</Label>
                    <Select value={formData.preferredTimeSlot} onValueChange={(value) => setFormData({ ...formData, preferredTimeSlot: value })}>
                      <SelectTrigger className="h-9">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Morning">Morning (9AM - 12PM)</SelectItem>
                        <SelectItem value="Afternoon">Afternoon (12PM - 4PM)</SelectItem>
                        <SelectItem value="Evening">Evening (4PM - 8PM)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="address" className="text-xs">Address *</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Full address with landmarks"
                    required
                    className="min-h-[60px]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="city" className="text-xs">City *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="e.g., Pune"
                      required
                      className="h-9"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pincode" className="text-xs">Pincode</Label>
                    <Input
                      id="pincode"
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      placeholder="6-digit pincode"
                      className="h-9"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="preferredContactMode" className="text-xs">Preferred Contact Mode *</Label>
                  <Select value={formData.preferredContactMode} onValueChange={(value) => setFormData({ ...formData, preferredContactMode: value })}>
                    <SelectTrigger className="h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Call">Phone Call</SelectItem>
                      <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="notes" className="text-xs">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Any specific requirements or issues..."
                    className="min-h-[60px]"
                  />
                </div>

                <Button type="submit" className="w-full">
                  Send via WhatsApp
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  This will open WhatsApp with your booking details pre-filled
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
