-- Create service_bookings table
CREATE TABLE public.service_bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  service_type TEXT NOT NULL,
  ac_type TEXT NOT NULL,
  units INTEGER DEFAULT 1,
  preferred_date DATE,
  preferred_time_slot TEXT,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  pincode TEXT,
  preferred_contact_mode TEXT DEFAULT 'Call',
  notes TEXT,
  status TEXT DEFAULT 'New'
);

-- Create quick_enquiries table
CREATE TABLE public.quick_enquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  message TEXT,
  source_page TEXT
);

-- Create testimonials table
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT NOT NULL,
  city TEXT,
  show_on_home BOOLEAN DEFAULT true
);

-- Create faq_items table
CREATE TABLE public.faq_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  category TEXT NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0
);

-- Create service_areas table
CREATE TABLE public.service_areas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  city TEXT NOT NULL,
  area_name TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true
);

-- Create gallery_images table
CREATE TABLE public.gallery_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  title TEXT,
  description TEXT,
  image_url TEXT NOT NULL,
  show_on_home BOOLEAN DEFAULT false
);

-- Enable Row Level Security
ALTER TABLE public.service_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quick_enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faq_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;

-- RLS Policies for public read access (these are public-facing features)
CREATE POLICY "Anyone can read testimonials"
ON public.testimonials FOR SELECT
USING (true);

CREATE POLICY "Anyone can read FAQs"
ON public.faq_items FOR SELECT
USING (true);

CREATE POLICY "Anyone can read service areas"
ON public.service_areas FOR SELECT
USING (true);

CREATE POLICY "Anyone can read gallery images"
ON public.gallery_images FOR SELECT
USING (true);

-- RLS Policies for public write access (form submissions)
CREATE POLICY "Anyone can insert service bookings"
ON public.service_bookings FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can insert quick enquiries"
ON public.quick_enquiries FOR INSERT
WITH CHECK (true);

-- Insert sample data for testimonials
INSERT INTO public.testimonials (name, rating, review_text, city, show_on_home) VALUES
('Rajesh Kumar', 5, 'Excellent service! Technician arrived on time and fixed my AC efficiently. Very professional team.', 'Pune', true),
('Priya Sharma', 5, 'Best AC service in Pune. Deep cleaning was thorough and pricing was transparent. Highly recommended!', 'Pimpri Chinchwad', true),
('Amit Patil', 4, 'Quick response and good service. Gas refilling was done properly and AC is cooling perfectly now.', 'Pune', true);

-- Insert sample FAQs
INSERT INTO public.faq_items (category, question, answer, sort_order) VALUES
('General', 'What areas do you serve?', 'We serve Pune and Pimpri Chinchwad regions. Contact us on WhatsApp to check if we cover your specific area.', 1),
('General', 'Do you provide same-day service?', 'Yes, we offer same-day and next-day service based on availability. Call us to schedule an urgent visit.', 2),
('Pricing', 'How much does AC servicing cost?', 'Basic servicing starts from ₹399 for split ACs. Final pricing depends on the AC type and condition. We provide quotes before starting work.', 3),
('Pricing', 'Do you charge for inspection?', 'Basic inspection is free. We only charge if repair work is required and approved by you.', 4),
('AMC', 'What is included in AMC plans?', 'AMC includes regular servicing visits, priority support, discounted repairs, and free gas top-ups in premium plans.', 5),
('AMC', 'Can I cancel my AMC?', 'AMC can be cancelled with 30 days notice. Unused services are not refundable.', 6),
('Service Process', 'How long does servicing take?', 'Basic servicing takes 45-60 minutes. Deep cleaning may take 1.5-2 hours per unit.', 7),
('Service Process', 'What payment modes do you accept?', 'We accept cash, UPI, credit/debit cards, and online bank transfers.', 8);

-- Insert sample service areas
INSERT INTO public.service_areas (city, area_name, is_active) VALUES
('Pune', 'Kothrud', true),
('Pune', 'Karve Nagar', true),
('Pune', 'Shivajinagar', true),
('Pune', 'Deccan', true),
('Pune', 'Warje', true),
('Pune', 'Baner', true),
('Pune', 'Aundh', true),
('Pune', 'Pashan', true),
('Pune', 'Bavdhan', true),
('Pune', 'Wakad', true),
('Pimpri Chinchwad', 'Pimpri', true),
('Pimpri Chinchwad', 'Chinchwad', true),
('Pimpri Chinchwad', 'Akurdi', true),
('Pimpri Chinchwad', 'Nigdi', true),
('Pimpri Chinchwad', 'Bhosari', true),
('Pune', 'Hadapsar', true),
('Pune', 'Magarpatta', true),
('Pune', 'Koregaon Park', true),
('Pune', 'Viman Nagar', true),
('Pune', 'Kharadi', true);