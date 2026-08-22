import React from "react";
import { PageWrapper } from "../../layouts/PageWrapper";
import {
  ServiceBannerSection,
  ServiceListSection,
  ServiceGallerySection,
  ServicePricingSection,
  ServiceCtaSection,
} from "../../components/sections/service";

const TRAVEL_SERVICES = [
  { title: "Travel Destination Branding", href: "/services/service-details", imgQuery: "india travel destination branding heritage" },
  { title: "Tourism SEO & Content Strategy", href: "/services/service-details", imgQuery: "travel blog content writing mountains india" },
  { title: "Google & Meta Travel Ads", href: "/services/service-details", imgQuery: "google ads travel campaign performance analytics" },
  { title: "Influencer & Creator Campaigns", href: "/services/service-details", imgQuery: "travel influencer camera filming scenic india" },
  { title: "Direct Booking Growth", href: "/services/service-details", imgQuery: "hotel online direct booking resort website" },
  { title: "Social Media for Tourism", href: "/services/service-details", imgQuery: "instagram reels travel tourism india viral" },
];

const TRAVEL_GALLERY = [
  { query: "kerala backwaters tropical houseboat", alt: "Kerala Backwaters", fallback: "thumb.jpg" },
  { query: "taj mahal sunrise india tourism", alt: "Taj Mahal", fallback: "thumb-2.jpg" },
  { query: "himalayas trekking adventure India", alt: "Himalayas Trek", fallback: "thumb-3.jpg" },
  { query: "goa beach resort luxury sunset", alt: "Goa Beach", fallback: "thumb-4.jpg" },
  { query: "rajasthan camel safari desert sunset", alt: "Rajasthan Desert", fallback: "thumb-5.jpg" },
  { query: "andaman turquoise water beach paradise", alt: "Andaman Islands", fallback: "thumb-6.jpg" },
  { query: "ladakh pangong lake mountain reflection", alt: "Ladakh Mountains", fallback: "thumb-7.jpg" },
  { query: "varanasi ganga aarti ceremony river", alt: "Varanasi Culture", fallback: "thumb-8.jpg" },
  { query: "darjeeling toy train himalayan scenic", alt: "Darjeeling", fallback: "thumb-9.jpg" },
  { query: "udaipur city palace india lake", alt: "Udaipur Palace", fallback: "thumb-10.jpg" },
  { query: "rishikesh yoga ashram river mountains", alt: "Rishikesh Spiritual", fallback: "thumb-11.jpg" },
  { query: "coorg misty coffee plantation south india", alt: "Coorg Estate", fallback: "thumb-12.jpg" },
  { query: "spiti key monastery valley himalaya", alt: "Spiti Valley", fallback: "thumb.jpg" },
  { query: "meghalaya living root bridge jungle", alt: "Meghalaya Jungle", fallback: "thumb-2.jpg" },
  { query: "jaipur elephant festival pink city", alt: "Jaipur Festival", fallback: "thumb-3.jpg" },
  { query: "manali snow mountain road winter", alt: "Manali Winter", fallback: "thumb-4.jpg" },
  { query: "lakshadweep coral reef diving turquoise", alt: "Lakshadweep Dive", fallback: "thumb-5.jpg" },
  { query: "ooty nilgiri hills tea garden mist", alt: "Ooty Hills", fallback: "thumb-6.jpg" },
];

const PRICING_MONTHLY = [
  {
    name: "Explorer",
    price: "₹19,999",
    period: "/month",
    features: ["Travel Brand Identity", "Tourism Website (5 pages)", "Local SEO Basics", "Instagram Content (12 posts)", "Monthly Analytics Report"],
  },
  {
    name: "Discovery",
    price: "₹49,999",
    period: "/month",
    popular: true,
    features: ["Full Travel Brand Strategy", "Google & Meta Ads Management", "Travel SEO Blog (4 articles)", "Influencer Campaign (2 creators)", "Bi-weekly Performance Reports"],
  },
  {
    name: "Pinnacle",
    price: "Custom",
    period: "/month",
    features: ["Dedicated Travel Marketing Team", "Multi-destination Campaigns", "Direct Booking Funnel Build", "PR & OTA Partnership Strategy", "Real-time Dashboard Access"],
  },
];

const PRICING_YEARLY = PRICING_MONTHLY.map((p) => ({
  ...p,
  price: p.price === "Custom" ? "Custom" : p.price.replace(/[\d,]+/, (n) => String(Math.round(Number(n.replace(/,/g, "")) * 10))),
  period: p.price === "Custom" ? "/year" : "/year (save 20%)",
}));

const ServiceTravelPage: React.FC = () => (
  <PageWrapper>
    <ServiceBannerSection
      title="Travel & Tourism Marketing Services — Drive Bookings &amp; Brand Awareness"
      subtitle="India's #1 travel marketing specialists"
    />
    <ServiceListSection
      heading="We specialize in travel & tourism marketing — connecting destinations, hotels, and tour operators with their ideal travellers."
      bannerImageQuery="india travel destination tourism landscape aerial"
      services={TRAVEL_SERVICES}
    />
    <ServiceGallerySection images={TRAVEL_GALLERY} />
    <ServicePricingSection monthly={PRICING_MONTHLY} yearly={PRICING_YEARLY} />
    <ServiceCtaSection />
  </PageWrapper>
);

export default ServiceTravelPage;
