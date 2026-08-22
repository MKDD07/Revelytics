DROP TABLE IF EXISTS service_sections;
DROP TABLE IF EXISTS services;

CREATE TABLE services (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  parent_slug TEXT,
  title TEXT NOT NULL,
  short_desc TEXT,
  hero_pexels_query TEXT NOT NULL DEFAULT 'travel destination',
  og_pexels_query TEXT NOT NULL DEFAULT 'travel destination',
  cta_text TEXT DEFAULT 'Contact Us',
  cta_url TEXT DEFAULT '/contact-us.html',
  display_order INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT,
  canonical_url TEXT,
  meta_robots TEXT DEFAULT 'index, follow',
  focus_keyword TEXT,
  og_title TEXT,
  og_description TEXT,
  og_type TEXT DEFAULT 'website',
  og_url TEXT,
  og_site_name TEXT DEFAULT 'Discovery Convoy',
  og_locale TEXT DEFAULT 'en_US',
  twitter_card TEXT DEFAULT 'summary_large_image',
  twitter_title TEXT,
  twitter_description TEXT,
  twitter_site TEXT,
  twitter_creator TEXT,
  schema_type TEXT DEFAULT 'Service',
  schema_json TEXT,
  hreflang TEXT DEFAULT 'en',
  breadcrumb_title TEXT,
  sitemap_priority REAL DEFAULT 0.7,
  sitemap_changefreq TEXT DEFAULT 'monthly',
  noindex INTEGER DEFAULT 0,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_services_parent ON services(parent_slug);
CREATE INDEX idx_services_active ON services(is_active, display_order);
CREATE INDEX idx_services_slug ON services(slug);

CREATE TABLE service_sections (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  service_id INTEGER NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  heading TEXT NOT NULL,
  body TEXT,
  pexels_query TEXT NOT NULL DEFAULT 'travel destination',
  icon_pexels_query TEXT,
  image_alt TEXT,
  display_order INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1
);

CREATE INDEX idx_service_sections_service ON service_sections(service_id, display_order);

-- SEED DATA FOR ALL SERVICES
INSERT INTO services (slug, parent_slug, title, short_desc, hero_pexels_query, og_pexels_query, cta_text, cta_url, display_order, is_active, meta_title, meta_description) VALUES
('hotel-revenue-management-company-in-india', NULL, 'Revenue Management', 'Maximize RevPAR, ARR, and direct occupancy through strategic dynamic pricing and OTA channel optimization.', 'hotel revenue analytics laptop luxury room', 'luxury hotel room sunset', 'Schedule Consultation', '/contact-us.html', 1, 1, 'Hotel Revenue Management Company in India | Revelytics', 'Maximize hotel revenue with AI dynamic pricing and expert revenue managers.'),

('digital-marketing-company-in-india', NULL, 'Digital Marketing', '360-degree digital marketing tailored for luxury hotels, boutique resorts, and hospitality chains across India.', 'hotel digital marketing agency team', 'resort pool aerial view', 'Get Marketing Plan', '/contact-us.html', 2, 1, 'Digital Marketing Company in India for Hotels | Revelytics', 'Full-funnel digital marketing to drive direct guest bookings and reduce OTA dependency.'),

('best-social-media-marketing-company-for-hotel-in-india', 'digital-marketing-company-in-india', 'Social Media Marketing', 'Visual storytelling, influencer collaborations, and viral short-form video content that turn followers into booked guests.', 'hotel instagram photography camera pool', 'resort sunset cocktails', 'Boost Social Reach', '/contact-us.html', 3, 1, 'Social Media Marketing for Hotels | Revelytics', 'Transform your hotel brand on Instagram and TikTok.'),

('seo-marketing-company-for-hotels-in-india', 'digital-marketing-company-in-india', 'Search Engine Optimization', 'Rank #1 on Google for high-intent hotel, resort, and destination stay searches with localized SEO.', 'seo analytics google ranking laptop', 'luxury hotel lobby', 'Start SEO Audit', '/contact-us.html', 4, 1, 'Hotel SEO Company in India | Revelytics', 'Rank #1 on Google for high-intent hotel search queries.'),

('performance-marketing-company-for-hotels-and-resorts-in-india', 'digital-marketing-company-in-india', 'Performance Marketing', 'High-ROAS Google Ads, Meta PPC, and Google Hotel Ads delivering direct reservations at low customer acquisition cost.', 'digital ad performance charts analytics', 'hotel guest checkin tablet', 'Launch Campaigns', '/contact-us.html', 5, 1, 'Performance Marketing for Hotels & Resorts | Revelytics', 'High-converting direct booking ad campaigns for hospitality.'),

('email-marketing-company-for-hotels-and-resorts-in-india', 'digital-marketing-company-in-india', 'Email Marketing', 'Automated guest retention workflows, loyalty rewards, and personalized pre/post-stay email journeys.', 'hotel welcome email tablet guest', 'boutique hotel suite', 'Automate Emails', '/contact-us.html', 6, 1, 'Email Marketing for Hotels | Revelytics', 'Turn past guests into loyal repeat visitors with automated email campaigns.'),

('graphic-designing-company-for-hotels-and-resorts-in-india', 'digital-marketing-company-in-india', 'Graphic Designing', 'Bespoke brand identities, fine dining menus, digital banners, and luxury hotel collaterals.', 'luxury hotel branding graphic design brochures', 'fine dining table luxury', 'View Design Portfolio', '/contact-us.html', 7, 1, 'Graphic Design for Hotels & Resorts | Revelytics', 'Elevate your visual identity with premium graphic design solutions.'),

('video-editing-company-in-india', 'digital-marketing-company-in-india', 'Video Editing', 'Cinematic resort tour videos, 4K drone reels, and promotional video clips engineered for conversions.', 'cinematic drone resort video production', 'infinity pool resort sunset', 'Produce Resort Video', '/contact-us.html', 8, 1, 'Video Editing Company in India | Hotel Video Tours', 'Captivate potential guests with high-production video edits.'),

('influencer-marketing-company-for-hotels-and-resorts-in-india', 'digital-marketing-company-in-india', 'Influencer Marketing', 'Connect with verified travel creators and lifestyle vloggers to showcase your property to millions.', 'travel influencer luxury resort photoshoot', 'pool breakfast floating tray', 'Partner with Creators', '/contact-us.html', 9, 1, 'Influencer Marketing for Hotels | Revelytics', 'Partner with top travel influencers to showcase your resort.'),

('pre-launch-marketing-company-for-hotels-and-resorts-in-india', 'digital-marketing-company-in-india', 'Pre-launch Marketing', 'Strategic hype creation, teaser campaigns, and launch events for new hotel and resort openings.', 'hotel grand opening ribbon luxury event', 'luxury hotel entrance night', 'Plan Grand Opening', '/contact-us.html', 10, 1, 'Hotel Pre-Launch Marketing | Revelytics', 'Generate waiting lists and full bookings before your grand opening day.'),

('digital-marketing-company-for-service-apartments', 'digital-marketing-company-in-india', 'Digital Marketing For Service Apartments', 'Targeted marketing for corporate travelers, long-stay guests, and premium serviced residences.', 'modern luxury service apartment living room', 'modern kitchen apartment city view', 'Grow Long-Stay Bookings', '/contact-us.html', 11, 1, 'Digital Marketing for Service Apartments | Revelytics', 'Target corporate travelers and long-stay guests with high-converting ads.'),

('hotel-audit-company-in-india', NULL, 'Hotel Audit', 'Comprehensive mystery audits, operational efficiency evaluations, and revenue leak diagnostics.', 'hotel inspection clipboard manager audit', 'luxury hotel bedroom clean', 'Request Hotel Audit', '/contact-us.html', 12, 1, 'Hotel Audit Company in India | Revelytics', 'Identify operational bottlenecks and revenue leakage across your property.'),

('hotel-ota-listing-company-in-india', NULL, 'Express Setup & OTA Listing', 'Rapid OTA setup and content optimization across Booking.com, Agoda, MakeMyTrip, Expedia, and Airbnb.', 'ota booking channels laptop distribution', 'hotel keycard modern room', 'Setup OTA Profiles', '/contact-us.html', 13, 1, 'Hotel OTA Listing & Setup Services | Revelytics', 'Rapid onboarding and optimal ranking on major global OTAs.'),

('hotel-content-marketing-company', NULL, 'Content Management & Shoot', 'High-resolution architectural photography, menu styling, and content creation for brand storytelling.', 'professional photographer camera hotel shoot', 'chef plating gourmet food', 'Book Photo Shoot', '/contact-us.html', 14, 1, 'Hotel Content Marketing & Shoot | Revelytics', 'High-impact visuals and content management for luxury hotels.'),

('website-development-company-for-hotels-in-india', NULL, 'Website Development', 'Ultra-fast, mobile-first hotel websites with built-in direct booking engines, SEO architecture, and CMS.', 'modern hotel website design tablet laptop', 'hotel resort beach view', 'Build Custom Website', '/contact-us.html', 15, 1, 'Hotel Website Development Company | Revelytics', 'Custom-crafted, high-converting websites designed specifically for hotels.'),

('booking-engine-for-hotels-in-india', NULL, 'Booking Engine', 'High-conversion, commission-free direct booking engine tailored for luxury hotels, resorts, and homestays.', 'booking engine hotel checkout screen software', 'hotel reception checkin desk', 'Get Booking Engine', '/contact-us.html', 16, 1, 'Best Booking Engine for Hotels in India | Revelytics', 'Maximize direct commission-free reservations with instant payment gateway integration.'),

('channel-manager-for-hotels-in-india', NULL, 'Channel Manager', 'Real-time two-way synchronization of rates, inventory, and bookings across 100+ OTA channels.', 'hotel channel manager dashboard synchronization', 'laptop analytics hotel distribution', 'Connect Channel Manager', '/contact-us.html', 17, 1, 'Hotel Channel Manager Solutions | Revelytics', 'Prevent overbookings and automate rate parity across all booking channels.'),

('sales-support-service-for-hotels-in-india', NULL, 'Sales Support', 'Dedicated B2B corporate sales, travel agent network distribution, and MICE event sales representation.', 'hotel corporate sales meeting business handshake', 'hotel conference hall banquet', 'Hire Sales Team', '/contact-us.html', 18, 1, 'Hotel Sales Support & B2B Representation | Revelytics', 'Scale B2B corporate contracts, travel agent networks, and MICE bookings.'),

('online-reputation-management-company-in-india', NULL, 'Online Reputation Management', 'Proactive TripAdvisor, Google, and OTA review monitoring, review sentiment analysis, and response automation.', 'hotel customer review five stars smartphone', 'happy hotel guests pool vacation', 'Manage Hotel Reviews', '/contact-us.html', 19, 1, 'Online Reputation Management for Hotels | Revelytics', 'Improve your TripAdvisor and Google ratings to attract more high-paying guests.'),

('best-hotels-and-resorts-photography-company-in-india', NULL, 'Hotel Photography', 'World-class architectural and drone photography showcasing your property in breathtaking detail.', 'luxury resort sunset pool architectural photography', 'luxury villa ocean view', 'Schedule Photoshoot', '/contact-us.html', 20, 1, 'Best Hotel & Resort Photography Company | Revelytics', 'Transform your hotel visual appeal with award-winning architectural photography.');

-- SEED SECTIONS FOR BOOKING ENGINE
INSERT INTO service_sections (service_id, heading, body, pexels_query, image_alt, display_order, is_active) VALUES
((SELECT id FROM services WHERE slug = 'booking-engine-for-hotels-in-india'), 'Zero Commission Direct Bookings', 'Stop giving away 20% to 25% of your hard-earned revenue to OTAs. Our modern direct booking engine seamlessly integrates into your website, providing an intuitive 3-step checkout experience that turns website visitors into paying guests.', 'hotel reception booking counter payment', 'Direct Booking Engine', 1, 1),
((SELECT id FROM services WHERE slug = 'booking-engine-for-hotels-in-india'), 'Seamless Multi-Currency & Instant Payment Gateways', 'Equipped with integrated UPI, credit/debit card processing, NetBanking, and international multi-currency gateways. Instant automated booking confirmation vouchers and SMS notifications sent to guests immediately.', 'online checkout payment laptop credit card', 'Payment Gateway Integration', 2, 1),
((SELECT id FROM services WHERE slug = 'booking-engine-for-hotels-in-india'), 'Add-ons, Promo Codes & Upselling Engine', 'Boost your Average Room Rate (ARR) and Total Revenue Per Available Room (TrevPAR) by offering room upgrades, airport transfers, candlelit dinners, and spa packages directly during the checkout flow.', 'luxury hotel room champagne breakfast', 'Hotel Upselling Engine', 3, 1),
((SELECT id FROM services WHERE slug = 'booking-engine-for-hotels-in-india'), 'Mobile-First Fast Reservation Experience', 'Over 70% of hotel reservations happen on smartphones. Our booking engine loads in milliseconds, is fully responsive, and offers one-click Google & Apple Pay checkout support.', 'smartphone hotel booking app travel', 'Mobile Booking Experience', 4, 1);

-- SEED SECTIONS FOR REVENUE MANAGEMENT
INSERT INTO service_sections (service_id, heading, body, pexels_query, image_alt, display_order, is_active) VALUES
((SELECT id FROM services WHERE slug = 'hotel-revenue-management-company-in-india'), 'Algorithmic Dynamic Pricing', 'Our proprietary rate intelligence tracks local competitors, airport arrivals, seasonal demand spikes, and city events to automatically adjust room rates 24/7 for optimal RevPAR.', 'revenue chart laptop analytics hotel', 'Dynamic Pricing Strategy', 1, 1),
((SELECT id FROM services WHERE slug = 'hotel-revenue-management-company-in-india'), 'OTA Channel Optimization & Yield Control', 'Maintain optimal rate parity, unlock preferential visibility on OTAs like Booking.com and MakeMyTrip, and minimize unsold room inventory on low-demand dates.', 'luxury resort pool sunset', 'OTA Channel Yield Management', 2, 1);

-- ============================================================
-- BLOG POSTS & COMMENTS SCHEMA
-- ============================================================
DROP TABLE IF EXISTS blog_comments;
DROP TABLE IF EXISTS blog_posts;

CREATE TABLE blog_posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,

  title TEXT NOT NULL,
  content_json TEXT NOT NULL,

  meta_title TEXT NOT NULL,
  meta_description TEXT NOT NULL,
  focus_keyword TEXT NOT NULL,
  canonical_url TEXT NOT NULL,

  og_title TEXT,
  og_description TEXT,
  og_image_query TEXT,
  og_image_alt TEXT NOT NULL,

  schema_type TEXT DEFAULT 'Article',
  author_name TEXT NOT NULL,
  author_url TEXT,
  publisher_name TEXT DEFAULT 'Discovery Convoy',
  publisher_logo_url TEXT,

  category TEXT NOT NULL,
  tags TEXT NOT NULL,

  thumb1_query TEXT,
  thumb1_alt TEXT,
  thumb2_query TEXT,
  thumb2_alt TEXT,

  prev_post_slug TEXT,
  next_post_slug TEXT,

  reading_time_minutes INTEGER,
  word_count INTEGER,

  published_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  noindex INTEGER DEFAULT 0
);

CREATE TABLE blog_comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  post_id INTEGER NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  parent_id INTEGER,
  commenter_name TEXT NOT NULL,
  commenter_img_query TEXT,
  comment_text TEXT NOT NULL,
  commented_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX idx_comments_post ON blog_comments(post_id);
CREATE INDEX idx_posts_slug ON blog_posts(slug);
CREATE INDEX idx_posts_category ON blog_posts(category);

-- SEED BLOG POSTS
INSERT INTO blog_posts (
  slug, title, content_json,
  meta_title, meta_description, focus_keyword, canonical_url,
  og_title, og_description, og_image_query, og_image_alt,
  author_name, author_url, publisher_logo_url,
  category, tags,
  thumb1_query, thumb1_alt, thumb2_query, thumb2_alt,
  prev_post_slug, next_post_slug,
  reading_time_minutes, word_count
) VALUES 
(
  'innovative-strategies-and-concepts-inspired-by-market-research',
  'Innovative Strategies and Concepts Inspired by Market Research',
  '[
    {"type": "heading", "level": 2, "text": "Using a Query to Transform Hospitality Operations"},
    {"type": "paragraph", "text": "We love to bring designs to life as a developer, and we aim to do this using whatever front-end tools are necessary. My preferred tools are modern JavaScript libraries like React.js and Cloudflare Workers, tailored to high-load scalability. There are several reasons why a hospitality business would consider a digital revamp, creating fresh direct booking streams across India and Southeast Asia."},
    {"type": "paragraph", "text": "Market research reveals that over 65% of hotel booking decisions begin with visual storytelling and responsive search engine discovery. Crafting a high-speed reservation flow is critical for capturing guest loyalty."},
    {"type": "heading", "level": 2, "text": "The Spark of an Idea in Modern Hotel Analytics"},
    {"type": "paragraph", "text": "Revenue analytics combined with targeted performance marketing allow boutique resorts and hotel chains to forecast seasonal spikes, optimize RevPAR, and maintain dynamic rate parity across 100+ OTAs effortlessly."},
    {"type": "quote", "text": "Success in modern hotel marketing is the result of deep data analytics, continuous experimentation, and delivering frictionless guest experiences.", "author": "Revelytics Strategy Team"},
    {"type": "heading", "level": 2, "text": "On the Specificity of Digital Marketing & Distribution"},
    {"type": "paragraph", "text": "A robust direct booking engine integrated with real-time UPI and card processing can eliminate heavy OTA commissions, boosting overall profitability by 18% to 32% within the first two quarters."},
    {"type": "list", "items": [
      "Targeted Google Hotel Ads with automated ROAS bidding",
      "Dynamic pricing engine responding to airport passenger inflow",
      "High-speed mobile checkout with instant WhatsApp confirmation",
      "Automated guest loyalty re-engagement email sequences"
    ]}
  ]',
  'Innovative Strategies for Hotel Marketing | Revelytics Blog',
  'Discover how data-driven market research and modern web design drive direct hotel bookings and maximize RevPAR.',
  'hotel digital marketing strategies',
  'https://www.revlytics.in/blog/innovative-strategies-and-concepts-inspired-by-market-research',
  'Innovative Strategies and Concepts Inspired by Market Research',
  'How luxury hotels and resorts in India leverage predictive data and dynamic marketing to grow ARR.',
  'luxury resort infinity pool sunset tropical',
  'Luxury Resort Sunset View',
  'Revelytics Editorial Team',
  'https://www.revlytics.in/about-us',
  'https://www.revlytics.in/assets/img/logo/logo.svg',
  'Marketing Strategy',
  'Hospitality, Digital Marketing, Revenue Management, Direct Bookings',
  'hotel revenue analytics laptop screen luxury', 'Hotel Analytics Dashboard',
  'resort guest checking in mobile smartphone', 'Seamless Guest Check-in',
  NULL,
  'transform-your-hotel-brand-into-seamless-digital-experiences',
  5,
  1250
),
(
  'transform-your-hotel-brand-into-seamless-digital-experiences',
  'Transform Your Hotel Brand into Seamless Digital Experiences',
  '[
    {"type": "heading", "level": 2, "text": "The Evolution of Hotel Digital Presence"},
    {"type": "paragraph", "text": "From architectural drone tours to lightning-fast mobile booking engines, modern hotel websites serve as the primary storefront for high-net-worth travelers and corporate event organizers."},
    {"type": "paragraph", "text": "Implementing intuitive navigation, crisp typography, and captivating visual galleries ensures potential guests spend more time exploring your suites and amenities."},
    {"type": "quote", "text": "Your website is not merely an online brochure—it is your most profitable direct sales executive working 24/7.", "author": "Discovery Convoy"},
    {"type": "heading", "level": 2, "text": "Maximizing Conversion Rates with Cloudflare-Powered Speed"},
    {"type": "paragraph", "text": "Sub-second load times powered by edge caching and Cloudflare D1 ensure guests never abandon their booking due to lag or checkout friction."}
  ]',
  'Transform Your Hotel Brand into Seamless Digital Experiences | Revelytics',
  'Learn the core principles of building high-converting luxury hotel websites with edge technology.',
  'hotel web design direct bookings',
  'https://www.revlytics.in/blog/transform-your-hotel-brand-into-seamless-digital-experiences',
  'Transform Your Hotel Brand into Seamless Digital Experiences',
  'Architecting high-converting visual websites for resorts and heritage hotels.',
  'boutique hotel lobby interior design luxury',
  'Boutique Hotel Lobby',
  'Revelytics Tech Team',
  'https://www.revlytics.in/about-us',
  'https://www.revlytics.in/assets/img/logo/logo.svg',
  'Web Design',
  'Web Development, Luxury Hotels, UI/UX, Cloudflare',
  'hotel bedroom suite ocean view terrace', 'Luxury Suite Interior',
  'fine dining hotel restaurant table setting', 'Fine Dining Experience',
  'innovative-strategies-and-concepts-inspired-by-market-research',
  'how-to-reduce-ota-commissions-and-grow-direct-bookings',
  4,
  980
),
(
  'how-to-reduce-ota-commissions-and-grow-direct-bookings',
  'How to Reduce OTA Commissions & Grow Direct Bookings in 2026',
  '[
    {"type": "heading", "level": 2, "text": "The OTA Dependency Trap"},
    {"type": "paragraph", "text": "Hotels in India routinely surrender 18% to 28% of their gross revenue in OTA commissions. By deploying a comprehensive direct booking ecosystem, properties can reclaim their margins while owning the direct guest relationship."},
    {"type": "paragraph", "text": "Offering exclusive perks like complimentary breakfast, room upgrades, flexible cancellation, and seamless UPI checkout makes booking direct the obvious choice for guests."},
    {"type": "heading", "level": 2, "text": "Key Tactics for Direct Acquisition"},
    {"type": "list", "items": [
      "Meta Search Optimization (Google Hotel Ads & Trivago)",
      "Instant WhatsApp booking confirmations and concierge support",
      "Automated post-checkout review generation workflows",
      "Retargeting website visitors with dynamic room availability ads"
    ]}
  ]',
  'How to Reduce OTA Commissions for Hotels | Revelytics Guide',
  'Practical strategies to boost direct hotel reservations and reclaim your bottom line.',
  'hotel direct booking strategies',
  'https://www.revlytics.in/blog/how-to-reduce-ota-commissions-and-grow-direct-bookings',
  'How to Reduce OTA Commissions & Grow Direct Bookings in 2026',
  'Reclaim your profit margins with direct booking optimization.',
  'hotel booking engine checkout laptop credit card',
  'Direct Booking Engine Checkout',
  'Revenue Advisory Lead',
  'https://www.revlytics.in/about-us',
  'https://www.revlytics.in/assets/img/logo/logo.svg',
  'Revenue Growth',
  'OTAs, Commission Reduction, Booking Engine, ROI',
  'hotel management team meeting revenue discussion', 'Revenue Strategy Meeting',
  'hotel guest checking into luxury resort reception', 'Hotel Checkin',
  'transform-your-hotel-brand-into-seamless-digital-experiences',
  NULL,
  6,
  1420
);

-- SEED COMMENTS
INSERT INTO blog_comments (post_id, commenter_name, commenter_img_query, comment_text) VALUES
(1, 'Harun Rashid', 'professional businessman smiling portrait', 'Outstanding breakdown! Implementing dynamic pricing directly transformed our weekend occupancy numbers.'),
(1, 'Oliver Williams', 'hotel general manager resort smiling portrait', 'The analysis on direct booking engine conversion rates is spot on. Reducing OTA dependency is our top priority this fiscal year.');

