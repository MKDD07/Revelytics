import React from "react";
import { TpBannerThumb } from "../blog/TpBannerThumb";

const arrowIcon = (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.17157 41.1716C-0.390524 42.7337 -0.390524 45.2663 1.17157 46.8284C2.73367 48.3905 5.26633 48.3905 6.82843 46.8284L4 44L1.17157 41.1716ZM48 4C48 1.79086 46.2091 -2.03428e-06 44 -3.48405e-07L8 1.57357e-07C5.79087 -1.19134e-06 4.00001 1.79086 4.00001 4C4.00001 6.20914 5.79087 8 8.00001 8L40 8L40 40C40 42.2091 41.7909 44 44 44C46.2091 44 48 42.2091 48 40L48 4ZM4 44L6.82843 46.8284L46.8284 6.82843L44 4L41.1716 1.17157L1.17157 41.1716L4 44Z" fill="currentColor" />
  </svg>
);

interface ServiceItem {
  title: string;
  href: string;
  imgQuery: string;
}

interface ServiceListSectionProps {
  heading: string;
  bannerImageQuery: string;
  services: ServiceItem[];
}

export const ServiceListSection: React.FC<ServiceListSectionProps> = ({ heading, bannerImageQuery, services }) => {
  return (
    <>
      {/* tp-banner-thumb */}
      <TpBannerThumb
        imageQuery={bannerImageQuery}
        altText={heading}
      />

      {/* tp-service-area-start */}
      <div id="service" className="tp-service-area tp-panel-pin-area tp-bg-grey pt-145 pb-90">
        <div className="container">
          <div className="row align-items-end">
            <div className="col-xxl-11 col-xl-12">
              <div className="tp-about-title-wrap mb-30">
                <h2 className="tp-section-title reveal-text">{heading}</h2>
              </div>
            </div>
          </div>
          <div className="tp-about-border mt-20 pt-40">
            <div className="row">
              {/* Hover images column */}
              <div className="col-lg-4 mb-40">
                <div className="tp-service-content mr-60 mt-20">
                  <div className="tp-service-sales-wrap tp-panel-pin fix p-relative">
                    <div className="tp-service-img-wrapper image-container">
                      {services.map((s, i) => (
                        <div className="hover-image" key={i}>
                          <img
                            data-pexels={s.imgQuery}
                            data-type="image"
                            data-quality="original"
                            className="thumb"
                            src={`assets/img/service/service${i > 0 ? `-${i + 1}` : ""}.jpg`}
                            alt={s.title}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {/* Service list column */}
              <div className="col-lg-8 mb-40">
                <div className="tp-service-list-wrap ml-60">
                  {services.map((s, i) => (
                    <div className={`tp-service-item service-item mb-5${i === 0 ? " active" : ""}`} key={i} data-img={`assets/img/service/service${i > 0 ? `-${i + 1}` : ""}.jpg`}>
                      <h2 className="tp-service-title tp-ff-sequel-roman d-inline-block">
                        <a href={s.href}>
                          {s.title}
                          <span className="tp-service-icon d-inline-block">{arrowIcon}</span>
                        </a>
                      </h2>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* tp-service-area-end */}
    </>
  );
};
