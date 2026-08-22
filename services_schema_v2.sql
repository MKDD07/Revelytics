-- ============================================================
-- REVELYTICS CLOUDFLARE D1 SERVICES SCHEMA & SEED DATA (v2)
-- Database: revelytics-db (6f0f1928-9284-4184-8b0e-333ada672515)
-- ============================================================

DROP TABLE IF EXISTS service_sections;
DROP TABLE IF EXISTS services;

-- 1. SERVICES TABLE
CREATE TABLE services (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  parent_slug TEXT,
  title TEXT NOT NULL,
  short_desc TEXT,
  hero_pexels_query TEXT NOT NULL DEFAULT 'travel destination',
  og_pexels_query TEXT NOT NULL DEFAULT 'travel destination',
  cta_text TEXT DEFAULT 'Schedule Consultation',
  cta_url TEXT DEFAULT '/contact-us',
  display_order INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,

  -- SEO & Meta Fields
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT,
  canonical_url TEXT,
  meta_robots TEXT DEFAULT 'index, follow',
  focus_keyword TEXT,

  -- OpenGraph Social Tags
  og_title TEXT,
  og_description TEXT,
  og_type TEXT DEFAULT 'website',
  og_url TEXT,
  og_site_name TEXT DEFAULT 'Revelytics',
  og_locale TEXT DEFAULT 'en_US',

  -- Twitter Card
  twitter_card TEXT DEFAULT 'summary_large_image',
  twitter_title TEXT,
  twitter_description TEXT,
  twitter_site TEXT DEFAULT '@revelytics_in',
  twitter_creator TEXT DEFAULT '@revelytics_in',

  -- Structured Schema & Breadcrumbs
  schema_type TEXT DEFAULT 'Service',
  schema_json TEXT,
  hreflang TEXT DEFAULT 'en',
  breadcrumb_title TEXT,
  sitemap_priority REAL DEFAULT 0.8,
  sitemap_changefreq TEXT DEFAULT 'weekly',
  noindex INTEGER DEFAULT 0,

  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_services_parent ON services(parent_slug);
CREATE INDEX idx_services_active ON services(is_active, display_order);
CREATE INDEX idx_services_slug ON services(slug);

-- 2. SERVICE SECTIONS TABLE
CREATE TABLE service_sections (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  service_id INTEGER NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  heading TEXT NOT NULL,
  body TEXT,
  pexels_query TEXT NOT NULL DEFAULT 'hotel resort luxury',
  icon_pexels_query TEXT,
  image_alt TEXT,
  display_order INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1
);

CREATE INDEX idx_service_sections_service ON service_sections(service_id, display_order);

-- ============================================================
-- SEED DATA: TOP LEVEL & SPECIALIZED SERVICES
-- ============================================================

INSERT INTO services (
  slug, parent_slug, title, short_desc, hero_pexels_query, og_pexels_query,
  cta_text, cta_url, display_order, is_active,
  meta_title, meta_description, meta_keywords, focus_keyword, canonical_url
) VALUES
(
  'hotel-revenue-management-company-in-india',
  NULL,
  'Hotel Revenue Management',
  'Maximize RevPAR, ARR, and direct occupancy through proprietary dynamic pricing algorithms and 24/7 yield management.',
  'hotel revenue analytics laptop luxury room',
  'luxury hotel room sunset',
  'Request Revenue Audit',
  '/contact-us',
  1,
  1,
  'Hotel Revenue Management Company in India | RevPAR Growth | Revelytics',
  'Partner with India’s leading hotel revenue management specialists. Algorithmic dynamic pricing, OTA yield optimization, and measurable direct booking gains.',
  'hotel revenue management, revpar optimization, hotel dynamic pricing india, hospitality yield management',
  'hotel revenue management company in india',
  'https://www.revlytics.in/services/hotel-revenue-management-company-in-india'
),
(
  'digital-marketing-company-in-india',
  NULL,
  'Hospitality Digital Marketing',
  'Full-funnel digital marketing engineered exclusively for luxury hotels, boutique resorts, and multi-property hospitality chains across India.',
  'hotel digital marketing agency team',
  'resort pool aerial view',
  'Get Custom Marketing Plan',
  '/contact-us',
  2,
  1,
  'Digital Marketing Company in India for Hotels & Resorts | Revelytics',
  'Drive high-intent direct guest bookings with 360-degree digital marketing, performance ads, influencer campaigns, and localized hotel SEO.',
  'hotel digital marketing, resort marketing agency, hospitality performance marketing india',
  'digital marketing company in india for hotels',
  'https://www.revlytics.in/services/digital-marketing-company-in-india'
),
(
  'booking-engine-for-hotels-in-india',
  NULL,
  'Commission-Free Booking Engine',
  'Fast, mobile-first direct booking engine with seamless UPI, credit card, and multi-currency international payment gateway integrations.',
  'booking engine hotel checkout screen software',
  'hotel reception checkin desk',
  'Get Booking Engine Demo',
  '/contact-us',
  3,
  1,
  'Best Booking Engine for Hotels in India | Zero Commission | Revelytics',
  'Eliminate 20%+ OTA commissions with Revelytics direct booking engine. 3-step mobile reservation flow, instant WhatsApp vouchers, and automated upselling.',
  'hotel booking engine india, commission free booking engine, direct booking system for resorts',
  'booking engine for hotels in india',
  'https://www.revlytics.in/services/booking-engine-for-hotels-in-india'
),
(
  'channel-manager-for-hotels-in-india',
  NULL,
  'Hotel Channel Manager',
  'Instant two-way synchronization of rates, room inventory, and bookings across 100+ global OTAs with 99.8% rate parity accuracy.',
  'hotel channel manager dashboard synchronization',
  'laptop analytics hotel distribution',
  'Connect Channel Manager',
  '/contact-us',
  4,
  1,
  'Hotel Channel Manager Solutions in India | Revelytics',
  'Prevent overbookings, eliminate rate discrepancy penalties, and centralize all OTA channels through our real-time cloud distribution platform.',
  'channel manager for hotels, ota channel manager india, rate parity software hotels',
  'channel manager for hotels in india',
  'https://www.revlytics.in/services/channel-manager-for-hotels-in-india'
),
(
  'best-social-media-marketing-company-for-hotel-in-india',
  'digital-marketing-company-in-india',
  'Social Media Marketing for Hotels',
  'Viral reel creation, cinematic drone tours, and influencer collaborations that turn casual viewers into high-paying weekend guests.',
  'hotel instagram photography camera pool',
  'resort sunset cocktails',
  'Scale Social Reach',
  '/contact-us',
  5,
  1,
  'Best Social Media Marketing Company for Hotels in India | Revelytics',
  'Captivate travelers on Instagram and YouTube with high-production visual storytelling tailored for luxury hotels and experiential retreats.',
  'hotel social media marketing, resort instagram marketing, hospitality reels agency',
  'social media marketing for hotel in india',
  'https://www.revlytics.in/services/best-social-media-marketing-company-for-hotel-in-india'
),
(
  'seo-marketing-company-for-hotels-in-india',
  'digital-marketing-company-in-india',
  'Search Engine Optimization (SEO)',
  'Rank #1 on Google for high-intent queries like luxury stays, wedding banquets, weekend getaways, and corporate retreats.',
  'seo analytics google ranking laptop',
  'luxury hotel lobby',
  'Request Free SEO Audit',
  '/contact-us',
  6,
  1,
  'SEO Marketing Company for Hotels & Resorts in India | Revelytics',
  'Dominating localized search, Google Maps, and high-converting commercial keywords for hospitality properties.',
  'hotel seo company, resort search engine optimization, hospitality local seo india',
  'seo marketing company for hotels in india',
  'https://www.revlytics.in/services/seo-marketing-company-for-hotels-in-india'
),
(
  'performance-marketing-company-for-hotels-and-resorts-in-india',
  'digital-marketing-company-in-india',
  'Hospitality Performance Marketing',
  'High-ROAS Google Hotel Ads, Meta retargeting, and programmatic PPC campaigns delivering direct bookings at low customer acquisition cost.',
  'digital ad performance charts analytics',
  'hotel guest checkin tablet',
  'Launch Direct Booking Ads',
  '/contact-us',
  7,
  1,
  'Performance Marketing for Hotels and Resorts in India | Revelytics',
  'Achieve 8x to 14x ROAS on direct reservation campaigns. Google Hotel Ads, Meta dynamic remarketing, and audience segmentation.',
  'hotel performance marketing, google hotel ads agency, resort ppc marketing india',
  'performance marketing company for hotels and resorts in india',
  'https://www.revlytics.in/services/performance-marketing-company-for-hotels-and-resorts-in-india'
),
(
  'hotel-audit-company-in-india',
  NULL,
  'Hotel Mystery Audit & Operational Review',
  'Uncover revenue leakage, service bottlenecks, and guest satisfaction gaps through certified mystery audits and operational diagnostics.',
  'hotel inspection clipboard manager audit',
  'luxury hotel bedroom clean',
  'Schedule Mystery Audit',
  '/contact-us',
  8,
  1,
  'Hotel Audit Company in India | Mystery Audits & Diagnostics | Revelytics',
  'Comprehensive 360-degree hotel audits covering front desk operations, revenue yield, F&B margins, and online review sentiment.',
  'hotel audit company india, mystery guest audit, hotel operational audit',
  'hotel audit company in india',
  'https://www.revlytics.in/services/hotel-audit-company-in-india'
),
(
  'online-reputation-management-company-in-india',
  NULL,
  'Online Reputation Management (ORM)',
  'Proactive TripAdvisor, Google, and OTA review monitoring, automated sentiment analysis, and professional review response management.',
  'hotel customer review five stars smartphone',
  'happy hotel guests pool vacation',
  'Boost TripAdvisor Rank',
  '/contact-us',
  9,
  1,
  'Online Reputation Management for Hotels in India | Revelytics',
  'Improve TripAdvisor rankings and Google review scores to attract premium corporate and leisure travelers.',
  'hotel online reputation management, tripadvisor rating growth, hotel review management india',
  'online reputation management company in india',
  'https://www.revlytics.in/services/online-reputation-management-company-in-india'
),
(
  'best-hotels-and-resorts-photography-company-in-india',
  NULL,
  'Architectural & Resort Photography',
  'Award-winning architectural photography, twilight drone panoramas, and culinary styling that dramatically elevate perceived room value.',
  'luxury resort sunset pool architectural photography',
  'luxury villa ocean view',
  'Book Photo & Drone Shoot',
  '/contact-us',
  10,
  1,
  'Best Hotel & Resort Photography Company in India | Revelytics',
  'Showcase your property with magazine-grade visual photography designed to maximize website and OTA booking conversion rates.',
  'hotel photography company india, resort drone videography, hospitality architectural photography',
  'best hotels and resorts photography company in india',
  'https://www.revlytics.in/services/best-hotels-and-resorts-photography-company-in-india'
);

-- ============================================================
-- SEED SERVICE SECTIONS
-- ============================================================

-- 1. Hotel Revenue Management Sections
INSERT INTO service_sections (service_id, heading, body, pexels_query, image_alt, display_order) VALUES
(1, 'Algorithmic Dynamic Pricing 24/7', 'Our proprietary rate engine continuously monitors regional airport arrivals, competitor rate movements, local festivities, and weather patterns to automatically update room rates across all channels for maximum RevPAR.', 'hotel revenue analytics laptop screen luxury', 'Dynamic Pricing Analytics', 1),
(1, 'OTA Yield Optimization & Direct Parity', 'We maintain strategic rate parity while deploying value-added incentives (complimentary dining credits, free room upgrades) on your direct booking engine to channel high-margin guests directly to your website.', 'luxury hotel resort pool sunset', 'OTA Channel Optimization', 2),
(1, 'Demand Forecasting & Seasonality Modeling', 'Leverage predictive modeling to anticipate off-season dips and high-season compression dates, ensuring your room inventory is priced at the exact sweet spot for maximum profitability.', 'hotel management team meeting revenue discussion', 'Demand Forecasting Framework', 3);

-- 2. Digital Marketing Sections
INSERT INTO service_sections (service_id, heading, body, pexels_query, image_alt, display_order) VALUES
(2, 'High-Intent Google Hotel Ads & Search PPC', 'Target travelers actively searching for boutique stays, heritage retreats, and weekend getaways in your destination with laser-focused Google Ads and Google Hotel Ads integration.', 'digital marketing team travel', 'Google Hotel Ads Campaigns', 1),
(2, 'Visual Storytelling on Meta & TikTok', 'Engage luxury travelers with scroll-stopping video reels, villa walkthroughs, and influencer creator content that drive impulse bookings and wedding inquiries.', 'tropical resort sunset beach', 'Social Media Storytelling', 2),
(2, 'Automated Guest Lifecycle Email & WhatsApp Journeys', 'Re-engage past guests with automated loyalty campaigns, pre-arrival concierge check-ins, and personalized anniversary booking discounts that increase repeat guest stays by 35%.', 'smartphone hotel booking app travel', 'Guest Lifecycle Marketing', 3);

-- 3. Booking Engine Sections
INSERT INTO service_sections (service_id, heading, body, pexels_query, image_alt, display_order) VALUES
(3, 'Zero-Commission 3-Step Checkout Flow', 'Eliminate OTA commissions with a lightning-fast reservation flow that converts casual website browsers into paid guests in under 60 seconds.', 'hotel reception booking counter payment', 'Direct Checkout Flow', 1),
(3, 'Multi-Currency & Instant UPI Payments', 'Support instant UPI, NetBanking, credit/debit cards, Apple Pay, and international multi-currency gateways with instant booking confirmation vouchers sent via WhatsApp and SMS.', 'online checkout payment laptop credit card', 'Payment Gateway Integration', 2),
(3, 'Smart Add-ons & Dynamic Upselling', 'Boost TrevPAR (Total Revenue Per Available Room) by presenting customizable add-ons—such as candlelit dinners, airport transfers, and spa therapies—during the checkout sequence.', 'luxury hotel room champagne breakfast', 'Hotel Upselling Engine', 3);
