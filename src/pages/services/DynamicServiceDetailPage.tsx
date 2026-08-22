import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { PageWrapper } from "../../layouts/PageWrapper";
import { ServiceBannerSection, ServiceGallerySection, ServicePricingSection, ServiceCtaSection } from "../../components/sections/service";

export interface ServiceSectionItem {
  id: number;
  service_id: number;
  heading: string;
  body?: string;
  pexels_query: string;
  icon_pexels_query?: string;
  image_alt?: string;
  display_order: number;
  is_active: number;
}

export interface D1Service {
  id?: number;
  slug: string;
  parent_slug?: string;
  title: string;
  short_desc?: string;
  short_description?: string;
  hero_title?: string;
  hero_description?: string;
  hero_pexels_query?: string;
  og_pexels_query?: string;
  cta_text?: string;
  cta_url?: string;
  content?: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  canonical_url?: string;
  meta_robots?: string;
  focus_keyword?: string;
  og_title?: string;
  og_description?: string;
  og_type?: string;
  og_url?: string;
  og_site_name?: string;
  og_locale?: string;
  twitter_card?: string;
  twitter_title?: string;
  twitter_description?: string;
  schema_type?: string;
  schema_json?: string;
  hreflang?: string;
  breadcrumb_title?: string;
  sections?: ServiceSectionItem[];
}

export interface ServiceListItem {
  id: number;
  slug: string;
  title: string;
  parent_slug?: string;
}

const GALLERY_IMAGES = [
  { query: "luxury resort hotel pool sunrise india", alt: "Resort Pool", fallback: "thumb.jpg" },
  { query: "hotel receptionist checkin counter luxury", alt: "Hotel Reception", fallback: "thumb-2.jpg" },
  { query: "fine dining hotel restaurant resort food", alt: "Hotel Restaurant", fallback: "thumb-3.jpg" },
  { query: "luxury hotel bedroom suite interior design", alt: "Hotel Suite", fallback: "thumb-4.jpg" },
  { query: "hotel revenue analytics laptop marketing", alt: "Revenue Analytics", fallback: "thumb-5.jpg" },
  { query: "beachfront resort aerial view tropical pool", alt: "Beach Resort", fallback: "thumb-6.jpg" },
  { query: "hotel social media photo camera shooting", alt: "Hotel Media Shoot", fallback: "thumb-7.jpg" },
  { query: "resort spa wellness relaxing treatment", alt: "Resort Spa", fallback: "thumb-8.jpg" },
  { query: "booking engine hotel website laptop screen", alt: "Booking Engine", fallback: "thumb-9.jpg" },
  { query: "heritage hotel palace rajasthan india", alt: "Heritage Palace Hotel", fallback: "thumb-10.jpg" },
  { query: "boutique hotel lobby luxury furniture", alt: "Boutique Hotel", fallback: "thumb-11.jpg" },
  { query: "hotel manager team discussion meeting", alt: "Hotel Management", fallback: "thumb-12.jpg" },
  { query: "hotel infinity pool sunset mountain view", alt: "Infinity Pool", fallback: "thumb.jpg" },
  { query: "hotel photographer camera lens photoshoot", alt: "Photography Shoot", fallback: "thumb-2.jpg" },
  { query: "digital marketing strategy charts hotel", alt: "Digital Strategy", fallback: "thumb-3.jpg" },
  { query: "luxury villa balcony ocean view sunset", alt: "Luxury Villa", fallback: "thumb-4.jpg" },
  { query: "hotel guest happy review smartphone app", alt: "Online Reviews", fallback: "thumb-5.jpg" },
  { query: "resort event garden wedding lights night", alt: "Resort Events", fallback: "thumb-6.jpg" },
];

const PRICING_MONTHLY = [
  {
    name: "Standard Package",
    price: "₹29,999",
    period: "/month",
    features: ["Dedicated Service Strategy", "Full Campaign Execution", "Monthly ROI Reporting", "Standard Support"],
  },
  {
    name: "Growth Package",
    price: "₹69,999",
    period: "/month",
    popular: true,
    features: ["Comprehensive Service Suite", "Multi-channel Management", "Bi-weekly Strategy Calls", "Priority 24/7 Support"],
  },
  {
    name: "Enterprise Package",
    price: "Custom",
    period: "/month",
    features: ["Tailored Hospitality Solutions", "Dedicated Account Lead", "Real-time Revenue Dashboard", "Full Team Onsite Support"],
  },
];

const PRICING_YEARLY = PRICING_MONTHLY.map((p) => ({
  ...p,
  price: p.price === "Custom" ? "Custom" : p.price.replace(/[\d,]+/, (n) => String(Math.round(Number(n.replace(/,/g, "")) * 10))),
  period: p.price === "Custom" ? "/year" : "/year (save 20%)",
}));

export const DynamicServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [d1Data, setD1Data] = useState<D1Service | null>(null);
  const [allServicesList, setAllServicesList] = useState<ServiceListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [notFound, setNotFound] = useState<boolean>(false);

  // 1. Fetch current service from Cloudflare D1
  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setNotFound(false);

    fetch(`/api/services/${slug}`)
      .then((res) => {
        if (res.status === 404) {
          setNotFound(true);
          return null;
        }
        if (!res.ok) throw new Error("Failed to load service");
        return res.json();
      })
      .then((data) => {
        if (data && data.title) {
          setD1Data(data);
          setNotFound(false);
        } else {
          setNotFound(true);
        }
      })
      .catch(() => {
        setNotFound(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug]);

  // 2. Fetch all services for sidebar listing directly from Cloudflare D1
  useEffect(() => {
    fetch("/api/services")
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (Array.isArray(data)) {
          setAllServicesList(data);
        }
      })
      .catch(() => {});
  }, []);

  // Update Page Title and Meta description dynamically
  useEffect(() => {
    if (d1Data) {
      document.title = d1Data.meta_title || `${d1Data.title} | Revelytics`;
      if (d1Data.meta_description) {
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
          metaDesc.setAttribute("content", d1Data.meta_description);
        }
      }
    }
  }, [d1Data]);

  if (notFound && !loading) {
    return (
      <PageWrapper>
        <div className="container py-120 text-center">
          <h2 className="tp-ff-sequel-medium fs-36 text-danger mb-3">Service Not Found</h2>
          <p className="text-secondary mb-4">
            The requested service <code>{slug}</code> is not found in the Cloudflare D1 database.
          </p>
          <Link to="/" className="tp-btn-white hover-danger text-uppercase px-4 py-2 text-decoration-none fw-bold">
            &larr; Back to Home
          </Link>
        </div>
      </PageWrapper>
    );
  }

  const title = d1Data?.title || (slug ? slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()) : "Service");
  const heroTitle = d1Data?.hero_title || `${title} for Hotels & Resorts in India`;
  const heroDescription = d1Data?.hero_description || (d1Data?.parent_slug ? `Specialized Hospitality Solution` : "Hospitality & Travel Solutions");
  const shortDescription = d1Data?.short_desc || d1Data?.short_description || "";
  const heroPexelsQuery = d1Data?.hero_pexels_query || "travel destination";

  return (
    <PageWrapper>
      <ServiceBannerSection
        title={heroTitle}
        subtitle={heroDescription}
      />

      <div className="container pt-100 pb-80">
        <div className="row">
          <div className="col-lg-8">
            <span className="text-danger fw-bold text-uppercase mb-2 d-block">Specialized Hospitality Solution</span>
            <h2 className="tp-ff-sequel-medium fs-36 mb-4">{title}</h2>
            
            {/* Main short description */}
            {shortDescription && (
              <p className="fs-18 lh-base text-secondary mb-4">{shortDescription}</p>
            )}

            {/* Dynamic Service Sections loaded 100% from D1 */}
            {d1Data?.sections && d1Data.sections.length > 0 ? (
              <div className="service-sections-wrapper mb-5">
                {d1Data.sections.map((sec, idx) => (
                  <div key={idx} className="p-4 bg-light rounded-3 mb-4 border-start border-danger border-4">
                    <h3 className="fs-22 mb-2 text-dark">{sec.heading}</h3>
                    {sec.body && <p className="mb-3 text-muted">{sec.body}</p>}
                    {sec.pexels_query && (
                      <div className="mt-3">
                        <img
                          data-pexels={sec.pexels_query}
                          data-type="image"
                          data-quality="large"
                          alt={sec.image_alt || sec.heading}
                          className="img-fluid rounded shadow-sm w-100"
                          style={{ maxHeight: "350px", objectFit: "cover" }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 bg-light rounded-3 mb-5 border-start border-danger border-4">
                <h4 className="fs-20 mb-2">Why Choose Revelytics for {title}?</h4>
                <p className="mb-0 text-muted">
                  {shortDescription || `With over 10+ years of dedicated hospitality domain expertise, we deliver measurable bookings and higher ARR for your hotel property.`}
                </p>
              </div>
            )}

            {/* CTA action button */}
            {d1Data?.cta_text && (
              <div className="mt-4 mb-5">
                <Link
                  to={d1Data.cta_url || "/contact-us.html"}
                  className="tp-btn-white hover-danger text-uppercase px-4 py-3 text-decoration-none fw-bold"
                >
                  {d1Data.cta_text} &rarr;
                </Link>
              </div>
            )}
          </div>

          <div className="col-lg-4">
            {/* All Services from D1 */}
            <div className="p-4 bg-dark text-white rounded-3 mb-4">
              <h4 className="text-white mb-3">All Services</h4>
              <ul className="list-unstyled mb-0">
                {allServicesList.length > 0 ? (
                  allServicesList.map((item, idx) => (
                    <li key={idx} className="mb-2">
                      <Link
                        to={`/services/${item.slug}`}
                        className={`text-decoration-none hover-white ${item.slug === slug ? "text-danger fw-bold" : "text-white-50"}`}
                      >
                        &rarr; {item.title}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="text-white-50 small">Loading services...</li>
                )}
              </ul>
            </div>

            {/* Dynamic Hero Media Preview Card */}
            <div className="p-3 bg-light rounded-3 text-center border">
              <span className="badge bg-danger mb-2">Featured Visual</span>
              <img
                data-pexels={heroPexelsQuery}
                data-type="image"
                data-quality="medium"
                alt={title}
                className="img-fluid rounded w-100"
                style={{ height: "200px", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </div>

      <ServiceGallerySection images={GALLERY_IMAGES} />
      <ServicePricingSection monthly={PRICING_MONTHLY} yearly={PRICING_YEARLY} />
      <ServiceCtaSection />
    </PageWrapper>
  );
};

export default DynamicServiceDetailPage;
