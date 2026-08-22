export interface ServiceNavSubItem {
  title: string;
  slug: string;
}

export interface ServiceNavItem {
  title: string;
  slug: string;
  subItems?: ServiceNavSubItem[];
}

export const servicesData: ServiceNavItem[] = [
  {
    title: "Revenue Management",
    slug: "hotel-revenue-management-company-in-india",
  },
  {
    title: "Digital Marketing",
    slug: "digital-marketing-company-in-india",
    subItems: [
      { title: "Social Media Marketing", slug: "best-social-media-marketing-company-for-hotel-in-india" },
      { title: "Search Engine Optimization", slug: "seo-marketing-company-for-hotels-in-india" },
      { title: "Performance Marketing", slug: "performance-marketing-company-for-hotels-and-resorts-in-india" },
      { title: "Email Marketing", slug: "email-marketing-company-for-hotels-and-resorts-in-india" },
      { title: "Graphic Designing", slug: "graphic-designing-company-for-hotels-and-resorts-in-india" },
      { title: "Video Editing", slug: "video-editing-company-in-india" },
      { title: "Influencer Marketing", slug: "influencer-marketing-company-for-hotels-and-resorts-in-india" },
      { title: "Pre-launch Marketing", slug: "pre-launch-marketing-company-for-hotels-and-resorts-in-india" },
      { title: "Digital Marketing For Service Apartments", slug: "digital-marketing-company-for-service-apartments" },
    ],
  },
  {
    title: "Hotel Audit",
    slug: "hotel-audit-company-in-india",
  },
  {
    title: "Express Setup",
    slug: "hotel-ota-listing-company-in-india",
  },
  {
    title: "Content Management & Shoot",
    slug: "hotel-content-marketing-company",
  },
  {
    title: "Website Development",
    slug: "website-development-company-for-hotels-in-india",
  },
  {
    title: "Booking Engine",
    slug: "booking-engine-for-hotels-in-india",
  },
  {
    title: "Channel Manager",
    slug: "channel-manager-for-hotels-in-india",
  },
  {
    title: "Sales Support",
    slug: "sales-support-service-for-hotels-in-india",
  },
  {
    title: "Online Reputation Management",
    slug: "online-reputation-management-company-in-india",
  },
  {
    title: "Hotel Photography",
    slug: "best-hotels-and-resorts-photography-company-in-india",
  },
];
