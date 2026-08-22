import React from "react";
import { PageWrapper } from "../../layouts/PageWrapper";
import {
  ServiceBannerSection,
  ServiceListSection,
  ServiceGallerySection,
  ServicePricingSection,
  ServiceCtaSection,
} from "../../components/sections/service";

const DIGITAL_SERVICES = [
  { title: "Destination Branding", href: "/services/service-details", imgQuery: "destination travel branding resort experience" },
  { title: "SEO & Travel Content", href: "/services/service-details", imgQuery: "travel blog content writing laptop mountains" },
  { title: "Performance Ads & PPC", href: "/services/service-details", imgQuery: "digital advertising travel campaign analytics" },
  { title: "Social Media Campaigns", href: "/services/service-details", imgQuery: "social media travel photo video smartphone" },
  { title: "Email & CRM Marketing", href: "/services/service-details", imgQuery: "email marketing digital crm dashboard" },
  { title: "Booking & Conversion Tech", href: "/services/service-details", imgQuery: "hotel flight online direct booking laptop" },
];

const GALLERY_IMAGES = [
  { query: "taj mahal agra india monument", alt: "Taj Mahal", fallback: "thumb.jpg" },
  { query: "kerala houseboat backwaters palm trees", alt: "Kerala Backwaters", fallback: "thumb-2.jpg" },
  { query: "himalayas snowy mountain range sunset", alt: "Himalayan Treks", fallback: "thumb-3.jpg" },
  { query: "goa tropical beach resort palm tree", alt: "Goa Beach", fallback: "thumb-4.jpg" },
  { query: "varanasi ganges river ghats morning", alt: "Varanasi Heritage", fallback: "thumb-5.jpg" },
  { query: "ladakh blue pangong lake scenery", alt: "Ladakh Mountains", fallback: "thumb-6.jpg" },
  { query: "rajasthan jaipur palace architecture", alt: "Rajasthan Palace", fallback: "thumb-7.jpg" },
  { query: "andaman island tropical beach turquoise", alt: "Andaman Paradise", fallback: "thumb-8.jpg" },
  { query: "darjeeling tea garden hills mist", alt: "Darjeeling Tea Gardens", fallback: "thumb-9.jpg" },
  { query: "udaipur lake palace night reflection", alt: "Udaipur Lake Palace", fallback: "thumb-10.jpg" },
  { query: "rishikesh ganges river rafting mountains", alt: "Rishikesh Adventure", fallback: "thumb-11.jpg" },
  { query: "munnar green tea estate kerala", alt: "Munnar Hills", fallback: "thumb-12.jpg" },
  { query: "meghalaya cherrapunji waterfall jungle", alt: "Meghalaya Waterfalls", fallback: "thumb.jpg" },
  { query: "jaisalmer desert safari camel sunset", alt: "Jaisalmer Desert", fallback: "thumb-6.jpg" },
  { query: "coorg coffee plantation mist karnataka", alt: "Coorg Estates", fallback: "thumb-2.jpg" },
  { query: "spiti valley monastery snow peaks", alt: "Spiti Valley", fallback: "thumb-7.jpg" },
  { query: "alleppey backwaters coconut trees boat", alt: "Alleppey Backwaters", fallback: "thumb-3.jpg" },
  { query: "manali snow mountains pine forest", alt: "Manali Valleys", fallback: "thumb-9.jpg" },
];

const PRICING_MONTHLY = [
  {
    name: "Starter",
    price: "₹24,999",
    period: "/month",
    features: ["Destination Branding Kit", "5-Page Website Design", "Basic SEO Setup", "Social Media (2 platforms)", "Monthly Report"],
  },
  {
    name: "Growth",
    price: "₹59,999",
    period: "/month",
    popular: true,
    features: ["Full Brand Strategy & Design", "Google & Meta Ads Management", "Travel SEO & Blog Content", "Influencer Outreach (3 creators)", "Bi-weekly Performance Report"],
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "/month",
    features: ["Dedicated Account Manager", "Multi-platform Ad Management", "Custom Booking Tech Integration", "Influencer & PR Campaigns", "Real-time Analytics Dashboard"],
  },
];

const PRICING_YEARLY = PRICING_MONTHLY.map((p) => ({
  ...p,
  price: p.price === "Custom" ? "Custom" : p.price.replace(/[\d,]+/, (n) => String(Math.round(Number(n.replace(/,/g, "")) * 10))),
  period: p.price === "Custom" ? "/year" : "/year (save 20%)",
}));

const ServicesDigitalPage: React.FC = () => (
  <PageWrapper>
    <ServiceBannerSection
      title="Digital Marketing Services &amp; Full-Funnel Growth Solutions"
      subtitle="10+ years of digital marketing mastery"
    />
    <ServiceListSection
      heading="At Revelytics, we engineer digital marketing campaigns that drive brand awareness, qualified leads & revenue growth."
      bannerImageQuery="digital marketing laptop working desk creative studio"
      services={DIGITAL_SERVICES}
    />
    <ServiceGallerySection images={GALLERY_IMAGES} />
    <ServicePricingSection monthly={PRICING_MONTHLY} yearly={PRICING_YEARLY} />
    <ServiceCtaSection />
  </PageWrapper>
);

export default ServicesDigitalPage;
