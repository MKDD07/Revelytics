import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export interface D1HomeServiceItem {
  id: number;
  slug: string;
  title: string;
  hero_pexels_query?: string;
  og_pexels_query?: string;
  parent_slug?: string | null;
}

export const ServiceSection: React.FC = () => {
  const [services, setServices] = useState<D1HomeServiceItem[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    fetch("/api/services")
      .then((res) => (res.ok ? res.json() : []))
      .then((data: D1HomeServiceItem[]) => {
        if (Array.isArray(data) && data.length > 0) {
          // Filter root level services or top 10
          const roots = data.filter((s) => !s.parent_slug);
          setServices(roots.length > 0 ? roots : data);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="tp-service-area tp-panel-pin-area tp-bg-grey pt-120 pb-120">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="tp-service-subtitle-wrap tp-about-border pt-25 d-flex justify-content-between gap-3 mb-50">
              <span className="tp-section-subtitle tp-ff-sequel-roman">Our latest Services</span>
              <span className="tp-section-subtitle tp-ff-sequel-roman">( {services.length} )</span>
            </div>
          </div>
          <div className="col-lg-4 mb-40">
            <div className="tp-service-content mr-60 mt-20">
              <div className="tp-service-sales-wrap tp-panel-pin fix p-relative">
                <div
                  className="tp-service-img-wrapper image-container"
                  style={{ position: "relative", minHeight: "450px", overflow: "hidden", borderRadius: "16px" }}
                >
                  {services.map((item, idx) => {
                    const fallbackImg = `assets/img/service/service${idx > 0 ? `-${(idx % 4) + 1}` : ""}.jpg`;
                    const query = item.hero_pexels_query || item.og_pexels_query || "luxury hotel travel marketing";
                    const isCurrent = activeIndex === idx;

                    return (
                      <div
                        className={`hover-image ${isCurrent ? "active" : ""}`}
                        key={item.id || idx}
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          opacity: isCurrent ? 1 : 0,
                          visibility: isCurrent ? "visible" : "hidden",
                          transition: "opacity 0.4s ease, transform 0.4s ease",
                          transform: isCurrent ? "scale(1)" : "scale(1.05)",
                          zIndex: isCurrent ? 2 : 1,
                        }}
                      >
                        <img
                          data-pexels={query}
                          data-type="image"
                          data-quality="large"
                          className="thumb"
                          src={fallbackImg}
                          alt={item.title}
                          style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "16px" }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-8 mb-40">
            <div className="tp-service-list-wrap ml-60">
              {services.map((service, index) => (
                <div
                  className={`tp-service-item service-item mb-5${activeIndex === index ? " active" : ""}`}
                  key={service.id || index}
                  onMouseEnter={() => setActiveIndex(index)}
                  onTouchStart={() => setActiveIndex(index)}
                >
                  <h2 className="tp-service-title tp-ff-sequel-roman d-inline-block">
                    <Link to={`/services/${service.slug}`}>
                      {service.title}
                      <span className="tp-service-icon d-inline-block">
                        <i className="fa-regular fa-arrow-up-right ms-2"></i>
                      </span>
                    </Link>
                  </h2>
                </div>
              ))}
              <div className="tp-service-btn pt-30">
                <Link className="tp-btn" to="/services">
                  <span>
                    <span className="text-1">More Services</span>
                    <span className="text-2">More Services</span>
                  </span>
                  <i>
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0.21967 9.40717C-0.0732232 9.70006 -0.0732232 10.1749 0.21967 10.4678C0.512563 10.7607 0.987437 10.7607 1.28033 10.4678L0.21967 9.40717ZM10.6875 0.75C10.6875 0.335786 10.3517 2.97145e-09 9.9375 1.50485e-07L3.1875 -2.70983e-07C2.77329 -2.70983e-07 2.4375 0.335786 2.4375 0.75C2.4375 1.16421 2.77329 1.5 3.1875 1.5H9.1875V7.5C9.1875 7.91421 9.52329 8.25 9.9375 8.25C10.3517 8.25 10.6875 7.91421 10.6875 7.5L10.6875 0.75ZM0.75 9.9375L1.28033 10.4678L10.4678 1.28033L9.9375 0.75L9.40717 0.21967L0.21967 9.40717L0.75 9.9375Z" fill="currentColor" />
                    </svg>
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0.21967 9.40717C-0.0732232 9.70006 -0.0732232 10.1749 0.21967 10.4678C0.512563 10.7607 0.987437 10.7607 1.28033 10.4678L0.21967 9.40717ZM10.6875 0.75C10.6875 0.335786 10.3517 2.97145e-09 9.9375 1.50485e-07L3.1875 -2.70983e-07C2.77329 -2.70983e-07 2.4375 0.335786 2.4375 0.75C2.4375 1.16421 2.77329 1.5 3.1875 1.5H9.1875V7.5C9.1875 7.91421 9.52329 8.25 9.9375 8.25C10.3517 8.25 10.6875 7.91421 10.6875 7.5L10.6875 0.75ZM0.75 9.9375L1.28033 10.4678L10.4678 1.28033L9.9375 0.75L9.40717 0.21967L0.21967 9.40717L0.75 9.9375Z" fill="currentColor" />
                    </svg>
                  </i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
