import { CONTACT_INFO } from "@/config/contact";

type WhatsAppServicePayload = {
  type: "service";
  serviceName: string;
  priceLabel: string;
  description?: string;
  sourceSection: string;
};

type WhatsAppAmcPayload = {
  type: "amc";
  planName: string;
  visitsPerYear: number;
  priceLabel: string;
  targetCustomer: string;
  sourceSection: string;
};

type WhatsAppGeneralPayload = {
  type: "general";
  sourceSection: string;
  customMessage?: string;
};

type WhatsAppFormPayload = {
  type: "form";
  formData: {
    name: string;
    phone: string;
    email?: string;
    serviceType: string;
    acType: string;
    units: string;
    preferredDate?: string;
    preferredTimeSlot?: string;
    address: string;
    city: string;
    pincode?: string;
    preferredContactMode: string;
    notes?: string;
  };
};

type WhatsAppPayload = WhatsAppServicePayload | WhatsAppAmcPayload | WhatsAppGeneralPayload | WhatsAppFormPayload;

/**
 * Builds a WhatsApp URL with a structured, custom message based on the payload type
 * @param payload - The data for building the WhatsApp message
 * @returns Complete WhatsApp URL with encoded message
 */
export const buildWhatsAppUrl = (payload: WhatsAppPayload): string => {
  let message = "";

  switch (payload.type) {
    case "service":
      message = `*AC Service Booking Enquiry*

*Service Details:*
Service Type: ${payload.serviceName}
${payload.description ? `Description: ${payload.description}` : ''}
Estimated Cost: ${payload.priceLabel}

*Customer Information:*
Number of Units: (please specify)
Preferred Date: (please specify)
Preferred Time: (Morning / Afternoon / Evening)
Location: Pune / Pimpri Chinchwad

Name: 
Mobile Number: 

*Source:* ${payload.sourceSection}`;
      break;

    case "amc":
      message = `*Annual Maintenance Contract (AMC) Enquiry*

*Plan Details:*
Plan Name: ${payload.planName}
Visits per Year: ${payload.visitsPerYear}
Estimated Cost: ${payload.priceLabel}
Suitable For: ${payload.targetCustomer}

*Customer Information:*
Number of AC Units: (please specify)
Type of AC: (Split / Window / Cassette / Other)
Location: Pune / Pimpri Chinchwad

Name: 
Mobile Number: 

*Source:* ${payload.sourceSection}`;
      break;

    case "form":
      const fd = payload.formData;
      message = `*New AC Service Booking*

*Customer Details:*
Name: ${fd.name}
Mobile Number: ${fd.phone}
Email: ${fd.email || '-'}

*Service Information:*
Service Type: ${fd.serviceType}
AC Type: ${fd.acType}
Number of Units: ${fd.units}
${fd.preferredDate ? `Preferred Date: ${fd.preferredDate}` : ''}
${fd.preferredTimeSlot ? `Preferred Time: ${fd.preferredTimeSlot}` : ''}

*Location:*
Address: ${fd.address}
City: ${fd.city}
${fd.pincode ? `Pincode: ${fd.pincode}` : ''}

*Contact Preference:* ${fd.preferredContactMode}
${fd.notes ? `*Additional Notes:* ${fd.notes}` : ''}

*Source:* Website - Contact/Book Service Form`;
      break;

    case "general":
      message = payload.customMessage || `*AC Service Enquiry*

I need help with AC service.

*I would like to:*
- Book a new service
- Enquire about AMC plans
- Get a price estimate
- Other enquiry

Location: Pune / Pimpri Chinchwad

Name: 
Mobile Number: 

*Source:* ${payload.sourceSection}`;
      break;
  }

  // Encode the message for URL
  const encodedMessage = encodeURIComponent(message);
  
  // Build and return the complete WhatsApp URL
  return `https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodedMessage}`;
};

/**
 * Opens WhatsApp with a structured message in a new window
 * @param payload - The data for building the WhatsApp message
 */
export const openWhatsApp = (payload: WhatsAppPayload): void => {
  const url = buildWhatsAppUrl(payload);
  window.open(url, "_blank");
};
