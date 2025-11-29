import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { CONTACT_INFO } from "@/config/contact";
export const Footer = () => {
  const handleWhatsApp = () => {
    const message = encodeURIComponent("Hello! I have a question.");
    window.open(`https://wa.me/${CONTACT_INFO.whatsapp}?text=${message}`, "_blank");
  };
  return <footer className="bg-foreground text-background">
      <div className="container-wide py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="font-semibold mb-3">{CONTACT_INFO.companyName}</h3>
            <p className="text-sm mb-3 opacity-80">
              Professional AC service in Pune & PCMC. {CONTACT_INFO.experienceText}.
            </p>
            <div className="flex items-start gap-2 text-sm opacity-80">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{CONTACT_INFO.address}</span>
            </div>
            {CONTACT_INFO.gstin && <p className="text-xs opacity-60 mt-2">GSTIN: {CONTACT_INFO.gstin}</p>}
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-3">Contact Us</h3>
            <div className="space-y-2 text-sm">
              <a href={`tel:${CONTACT_INFO.phone}`} className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
                <Phone className="w-4 h-4" />
                {CONTACT_INFO.phone}
              </a>
              {CONTACT_INFO.phone2 && <a href={`tel:${CONTACT_INFO.phone2}`} className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
                  <Phone className="w-4 h-4" />
                  {CONTACT_INFO.phone2}
                </a>}
              <button onClick={handleWhatsApp} className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
                <MessageCircle className="w-4 h-4" />
                WhatsApp Us
              </button>
              <a href={`mailto:${CONTACT_INFO.email}`} className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
                <Mail className="w-4 h-4" />
                {CONTACT_INFO.email}
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 mt-8 pt-6 text-center text-xs opacity-60">
          <p>© {new Date().getFullYear()} {CONTACT_INFO.companyName}. All rights reserved.</p>
          
        </div>
      </div>
    </footer>;
};