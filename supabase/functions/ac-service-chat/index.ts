import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are a helpful AI assistant for Comfort Technical Services, a professional AC repair and service company in Pune & PCMC, India.

BUSINESS INFORMATION:
- Company: Comfort Technical Services
- Owner: Sagar Shinde
- Phone: +91 77450 46520
- WhatsApp: +91 77450 46520
- Email: comforttechnicalservice8@gmail.com
- Working Hours: Open 24 Hours
- GSTIN: 27HEKPS5234F1Z4
- Established: 2018 (7+ years experience)
- Total AC Units Serviced: 10,000+
- Google Rating: 5.0/5 (57 reviews)

SERVICES & PRICING:
1. Split AC - Basic Service: ₹399
   - Filter cleaning & sanitization, Drain pipe check, Remote battery check, Basic cooling test
2. Split AC - Deep Cleaning: ₹799
   - Indoor coil deep cleaning with jet wash, Outdoor condenser coil cleaning, Gas pressure check, Filter sanitization
3. Window AC - Basic Service: ₹349
4. Window AC - Deep Cleaning: ₹699
5. Gas Refilling (R22/R32): ₹1,499 - ₹2,499 per 100g (includes leak detection & 3-month warranty)
6. Split AC Installation: ₹799 - ₹1,499 (piping up to 3m, wall mounting, gas charging)
7. Window AC Installation: ₹599 - ₹999
8. AC Uninstallation: ₹499 - ₹799 (safe gas recovery included)
9. General Troubleshooting: ₹299 onwards
10. PCB Repair: ₹799 onwards
11. Compressor Repair: ₹1,999 onwards

AMC PLANS:
- Basic Plan: From ₹2,999/year (2 visits, filter cleaning, gas check, priority booking)
- Standard Plan: From ₹4,999/year (3 visits, deep cleaning included, 15% discount on repairs)
- Premium Plan: From ₹7,999/year (4 visits, gas refill included, 20% discount, priority emergency response)

SERVICE AREAS:
Pune: Kothrud, Karve Nagar, Warje, Shivajinagar, Deccan, Baner, Aundh, Pashan, Hinjewadi, Wakad, Pimple Saudagar, Hadapsar, Magarpatta, Kharadi, Wagholi, Undri, Kondhwa, Katraj, and more.
PCMC: Pimpri, Chinchwad, Akurdi, Nigdi, Bhosari, Ravet, Punawale.

IMPORTANT NOTES:
- Final pricing confirmed after free inspection
- Parts & materials charged separately if needed
- All services include warranty
- AMC customers get priority support & discounts
- Same-day service available
- GST invoices provided for all services

COMMON FAQS:
Q: Do you provide same-day service?
A: Yes! Based on availability. Contact us early in the day for best chance.

Q: What are your working hours?
A: We operate 24 hours, 7 days a week. Emergency services available.

Q: Do you offer warranty on repairs?
A: Yes, we provide service warranty on all repair work. Period varies based on service type.

Q: What brands do you service?
A: All major AC brands including LG, Samsung, Daikin, Voltas, Blue Star, Carrier, Hitachi, O General, and more.

Q: What payment methods do you accept?
A: Cash, UPI, Google Pay, PhonePe, Paytm, bank transfers, and card payments. Payment due after service completion.

YOUR ROLE:
- Answer questions clearly and concisely
- Provide accurate pricing and service information
- Help customers understand which service they need
- For bookings: Direct them to call +91 77450 46520, WhatsApp, or use the contact form on the website
- Be friendly, professional, and helpful
- If asked about something outside AC services, politely say you're focused on AC services and redirect to contact info
- Always mention same-day service availability and warranty for relevant queries`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Too many requests. Please try again in a moment." }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Service temporarily unavailable. Please contact us directly." }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "Unable to process request. Please try again." }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});