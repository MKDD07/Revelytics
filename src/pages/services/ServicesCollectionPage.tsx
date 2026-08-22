import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { PageWrapper } from "../../layouts/PageWrapper";
import { TpBannerThumb } from "../../components/sections/blog/TpBannerThumb";

export interface D1ServiceItem {
  id: number;
  slug: string;
  parent_slug?: string | null;
  title: string;
  short_desc?: string;
  hero_pexels_query?: string;
  og_pexels_query?: string;
  cta_text?: string;
  cta_url?: string;
  display_order: number;
  is_active: number;
  subItems?: D1ServiceItem[];
}

const GALLERY_IMAGES = [
  { query: "luxury hotel resort pool sunset india", alt: "Resort Pool", fallback: "thumb.jpg" },
  { query: "hotel receptionist guest service luxury", alt: "Hotel Reception", fallback: "thumb-2.jpg" },
  { query: "fine dining hotel restaurant food", alt: "Hotel Restaurant", fallback: "thumb-3.jpg" },
  { query: "luxury hotel suite bedroom interior", alt: "Hotel Suite", fallback: "thumb-4.jpg" },
  { query: "hotel revenue analytics dashboard laptop", alt: "Revenue Analytics", fallback: "thumb-5.jpg" },
  { query: "beachfront resort aerial view pool", alt: "Beach Resort", fallback: "thumb-6.jpg" },
  { query: "hotel photography camera shoot resort", alt: "Photo Shoot", fallback: "thumb-7.jpg" },
  { query: "resort spa wellness massage treatment", alt: "Resort Spa", fallback: "thumb-8.jpg" },
  { query: "booking engine hotel website laptop", alt: "Booking Engine", fallback: "thumb-9.jpg" },
  { query: "heritage palace hotel rajasthan india", alt: "Heritage Palace", fallback: "thumb-10.jpg" },
  { query: "boutique hotel lobby luxury decor", alt: "Boutique Hotel", fallback: "thumb-11.jpg" },
  { query: "hotel team business discussion meeting", alt: "Hotel Team", fallback: "thumb-12.jpg" },
  { query: "hotel infinity pool mountain view sunset", alt: "Infinity Pool", fallback: "thumb.jpg" },
  { query: "hotel photographer camera lens photoshoot", alt: "Photography Shoot", fallback: "thumb-2.jpg" },
  { query: "digital marketing strategy analytics hotel", alt: "Digital Strategy", fallback: "thumb-3.jpg" },
  { query: "luxury villa ocean view terrace sunset", alt: "Luxury Villa", fallback: "thumb-4.jpg" },
  { query: "hotel guest review smartphone mobile", alt: "Guest Review", fallback: "thumb-5.jpg" },
  { query: "resort event garden wedding lighting", alt: "Resort Event", fallback: "thumb-6.jpg" },
];

export const ServicesCollectionPage: React.FC = () => {
  const [services, setServices] = useState<D1ServiceItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [hoveredImage, setHoveredImage] = useState<{ query: string; fallback: string; alt: string } | null>(null);
  const hoverImgRef = useRef<HTMLDivElement>(null);

  // Fetch all active services from Cloudflare D1
  useEffect(() => {
    setLoading(true);
    fetch("/api/services")
      .then((res) => (res.ok ? res.json() : []))
      .then((data: D1ServiceItem[]) => {
        if (Array.isArray(data)) {
          // Group root services and nested sub-services
          const rootServices = data.filter((s) => !s.parent_slug);
          const enriched = rootServices.map((root) => ({
            ...root,
            subItems: data.filter((child) => child.parent_slug === root.slug),
          }));
          setServices(enriched);
        }
      })
      .catch((err) => {
        console.error("Error fetching services from D1:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Trigger Pexels media loader once services are loaded
  useEffect(() => {
    if (!loading && (window as any).PexelsLoader) {
      setTimeout(() => {
        (window as any).PexelsLoader?.loadAll();
      }, 100);
    }
  }, [loading, services]);

  const handleMouseMove = (e: React.MouseEvent, service: D1ServiceItem, index: number) => {
    const query = service.hero_pexels_query || service.og_pexels_query || "luxury hotel resort pool";
    const fallback = `/assets/img/service/service${index > 0 ? `-${(index % 4) + 1}` : ""}.jpg`;
    const alt = service.title;

    setHoveredImage({ query, fallback, alt });

    if (hoverImgRef.current) {
      gsap.to(hoverImgRef.current, {
        x: e.clientX + 20,
        y: e.clientY + 20,
        opacity: 1,
        scale: 1,
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  };

  const handleMouseLeave = () => {
    if (hoverImgRef.current) {
      gsap.to(hoverImgRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.25,
        ease: "power2.in",
        overwrite: "auto",
        onComplete: () => setHoveredImage(null),
      });
    }
  };

  const col1 = GALLERY_IMAGES.slice(0, 6);
  const col2 = GALLERY_IMAGES.slice(6, 12);
  const col3 = GALLERY_IMAGES.slice(12, 18);

  const renderGalleryCol = (imgs: typeof GALLERY_IMAGES, speed: string) => (
    <div className="tp-gallery-item-wrapper" data-speed={speed}>
      {imgs.map((img, i) => (
        <div className="tp-gallery-item mb-30" key={i}>
          <a href="#">
            <img
              data-pexels={img.query}
              data-type="image"
              data-quality="original"
              className="w-100"
              src={`/assets/img/gallery/${img.fallback}`}
              alt={img.alt}
            />
          </a>
        </div>
      ))}
    </div>
  );

  return (
    <PageWrapper>
      {/* GSAP Floating Hover Image Reveal Container */}
      <div
        ref={hoverImgRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "280px",
          height: "190px",
          pointerEvents: "none",
          zIndex: 9999,
          borderRadius: "16px",
          overflow: "hidden",
          opacity: 0,
          boxShadow: "0 20px 40px rgba(0,0,0,0.35)",
          transform: "scale(0.8)",
          transition: "opacity 0.2s ease",
          backgroundColor: "#111",
        }}
      >
        {hoveredImage && (
          <img
            data-pexels={hoveredImage.query}
            data-type="image"
            data-quality="large"
            src={hoveredImage.fallback}
            alt={hoveredImage.alt}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        )}
      </div>

      {/* inner-service-us-area-start */}
      <div className="inner-service-banner-area about-us-spacing pb-125">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="inner-service-banner-title-wrap text-center">
                <h2 className="inner-service-2-title tp-ff-sequel-bold-head text-uppercase tp-char-animation">
                  Services &amp; Capabilities
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="inner-service-banner-bottom">
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-sm-6">
              <div className="inner-service-banner-scroll smooth mb-10">
                <a className="tp-ff-sequel-semi-bold text-uppercase tp-smooth" href="#about">
                  scroll to explore
                  <span>
                    <svg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14.75 0.75L7.75 7.75L0.75 0.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </a>
              </div>
            </div>
            <div className="col-md-4 col-sm-6">
              <div className="inner-service-banner-scroll smooth mb-10 text-sm-center">
                <span className="tp-ff-sequel-semi-bold text-uppercase">(©2021 — 2026)</span>
              </div>
            </div>
            <div className="col-md-4 col-sm-6">
              <div className="inner-service-banner-scroll smooth mb-10 text-md-end">
                <span className="tp-ff-sequel-semi-bold text-uppercase">10+ years of experience</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* service-us-area-end */}

      {/* tp-banner-area-start */}
      <TpBannerThumb
        imageQuery="luxury hotel resort aerial pool sunset"
        altText="Revelytics Services"
      />
      {/* tp-banner-area-end */}

      {/* about-me-resume-area-start */}
      <div id="about" className="about-me-resume-area pt-145 pb-160">
        <div className="container">
          <div className="row">
            <div className="col-lg-2">
              <div className="tp-about-subtitle-wrap mb-20 mt-15 tp_fade_anim" data-delay=".3">
                <span className="tp-section-subtitle text-uppercase">Specialties</span>
              </div>
            </div>
            <div className="col-lg-10">
              <div className="about-me-resume-content mb-20 tp_fade_anim" data-delay=".5">
                <h2 className="tp-section-title reveal-text">
                  At Revelytics, we don’t just<br />
                  build websites or campaigns—<br />
                  we craft revenue &amp; growth.
                </h2>
              </div>
            </div>
            <div className="col-12">
              <div className="inner-service-2-wrap about-me-resume-wrap mt-50">
                {loading ? (
                  <div className="py-80 text-center">
                    <div className="spinner-border text-danger" role="status">
                      <span className="visually-hidden">Loading services from D1...</span>
                    </div>
                    <p className="mt-3 text-muted">Fetching latest services from Cloudflare D1...</p>
                  </div>
                ) : services.length > 0 ? (
                  services.map((service, index) => (
                    <div
                      className="about-me-resume-item tp_fade_anim"
                      data-delay=".3"
                      key={service.id || index}
                      onMouseMove={(e) => handleMouseMove(e, service, index)}
                      onMouseLeave={handleMouseLeave}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="row">
                        <div className="col-lg-2">
                          <div className="about-me-resume-date mb-30">
                            <span>{index + 1 < 10 ? `0${index + 1}` : index + 1} / SERVICE</span>
                          </div>
                        </div>
                        <div className="col-lg-5">
                          <div className="about-me-resume-info ml-40 mb-30">
                            <h3 className="about-me-resume-title tp-ff-sequel-semi-bold">
                              <Link to={`/services/${service.slug}`}>
                                {service.title.split(" ").map((word, wIdx) => (
                                  <React.Fragment key={wIdx}>
                                    {word} {wIdx === 0 && service.title.split(" ").length > 1 ? <br /> : ""}
                                  </React.Fragment>
                                ))}
                              </Link>
                            </h3>
                          </div>
                        </div>
                        <div className="col-lg-5">
                          <div className="about-me-resume-dec ml-50 mb-30">
                            <p>
                              {service.short_desc ||
                                (service.subItems && service.subItems.length > 0
                                  ? `Includes: ${service.subItems.map((s) => s.title).slice(0, 4).join(", ")} and more tailored solutions.`
                                  : `Specialized ${service.title} designed for hotels, luxury resorts, and service apartments to maximize direct bookings and revenue.`)}
                            </p>
                            {service.subItems && service.subItems.length > 0 && (
                              <div className="mt-3">
                                {service.subItems.map((sub, sIdx) => (
                                  <Link
                                    to={`/services/${sub.slug}`}
                                    key={sub.id || sIdx}
                                    className="badge bg-light text-dark me-2 mb-2 p-2 text-decoration-none border"
                                  >
                                    {sub.title}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-5 text-center bg-light rounded-3">
                    <p className="text-muted mb-0">No services found in Cloudflare D1.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* about-me-resume-area-end */}

      {/* mg-gallery-area-start */}
      <div className="mg-gallery-area fix">
        <div className="container-fluid container-1886">
          <div className="tp-gallery-wrapper">
            <div className="row gx-30">
              <div className="col-lg-4 col-md-4 col-sm-4 col-4">{renderGalleryCol(col1, "-0.1")}</div>
              <div className="col-lg-4 col-md-4 col-sm-4 col-4">{renderGalleryCol(col2, "0.8")}</div>
              <div className="col-lg-4 col-md-4 col-sm-4 col-4">{renderGalleryCol(col3, "-0.1")}</div>
            </div>
          </div>
        </div>
      </div>
      {/* mg-gallery-area-end */}

      {/* tp-funfact-area-start */}
      <div className="tp-funfact-area pt-150 pb-165">
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <div className="tp-funfact-title-wrap mb-30">
                <span className="tp-section-subtitle">Fun Facts</span>
                <h2 className="tp-section-title reveal-text tp-ff-sequel-semi-bold">
                  Numbers that speak volumes
                </h2>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="tp-funfact-content-wrap mt-75">
                <div className="tp-funfact-content-dec mb-80 ml-25">
                  <p>
                    Whether you need high-converting revenue strategies for your hotel,
                    captivating video content for campaigns, or innovative booking engine
                    integrations for direct growth—our team delivers results.
                  </p>
                </div>
                <div className="tp-funfact-item-wrap">
                  <div className="tp-funfact-item d-flex align-items-center">
                    <h2 className="tp-funfact-numbar tp-ff-sequel-semi-bold mr-40 mb-20">
                      <span data-purecounter-duration="1" data-purecounter-end="120" className="purecounter">
                        0
                      </span>
                      +
                    </h2>
                    <div className="tp-funfact-info mb-20">
                      <span>[ Nice! ]</span>
                      <h5 className="tp-funfact-info-title tp-ff-sequel-semi-bold">Projects Completed</h5>
                    </div>
                  </div>
                  <div className="tp-funfact-item d-flex align-items-center">
                    <h2 className="tp-funfact-numbar tp-ff-sequel-semi-bold mr-40 mb-20">
                      <span data-purecounter-duration="1" data-purecounter-end="10" className="purecounter">
                        0
                      </span>
                      +
                    </h2>
                    <div className="tp-funfact-info mb-20">
                      <span>[ Holy Moly! ]</span>
                      <h5 className="tp-funfact-info-title tp-ff-sequel-semi-bold">Years of Experience</h5>
                    </div>
                  </div>
                  <div className="tp-funfact-item d-flex align-items-center">
                    <h2 className="tp-funfact-numbar tp-ff-sequel-semi-bold mr-40 mb-20">
                      <span data-purecounter-duration="1" data-purecounter-end="185" className="purecounter">
                        0
                      </span>
                      %
                    </h2>
                    <div className="tp-funfact-info mb-20">
                      <span>[ Ho Ho! ]</span>
                      <h5 className="tp-funfact-info-title tp-ff-sequel-semi-bold">Growing Agency</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* tp-funfact-area-end */}
    </PageWrapper>
  );
};

export default ServicesCollectionPage;
