import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TpButton from "../../common/TpButton";

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
              <TpButton to="/services" text="More Services" wrapperClassName="tp-service-btn pt-30" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
