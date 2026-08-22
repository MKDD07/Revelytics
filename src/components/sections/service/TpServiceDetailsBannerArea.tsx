import React from "react";
import { Link } from "react-router-dom";

export interface TpServiceDetailsBannerAreaProps {
  title?: string;
  subtitle?: string;
  service?: any;
}

export const TpServiceDetailsBannerArea: React.FC<TpServiceDetailsBannerAreaProps> = ({
  title,
  subtitle,
  service,
}) => {
  const displayTitle = service?.title || title || "Hospitality Service";
  const displayDesc = service?.short_desc || service?.short_description || subtitle || "Elevating hotels & resorts with data-driven revenue management and digital marketing across India.";
  const parentCategory = service?.parent_slug ? service.parent_slug.replace(/-/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase()) : "Hospitality Solution";

  return (
    <div className="tp-service-details-banner-area pt-130 pb-60">
      <div className="container">
        <div className="row align-items-end">
          <div className="col-lg-3 col-md-4">
            <div className="tp-service-details-hero-subtitle mb-30">
              <span className="text-uppercase fw-bold">
                {parentCategory}
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 10L10 1M10 1H1M10 1V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </div>
          <div className="col-lg-6 col-md-8">
            <div className="tp-service-details-hero-title mb-30">
              <h2 className="tp-ff-sequel-bold-head text-uppercase text-white lh-1">
                {displayTitle}
              </h2>
            </div>
          </div>
          <div className="col-lg-3 col-md-12">
            <div className="tp-service-details-hero-link mb-30">
              <p className="tp-service-details-dec text-secondary mb-3">
                {displayDesc}
              </p>
              <div className="d-flex align-items-center gap-2">
                <span className="badge bg-danger text-uppercase px-2 py-1 fs-11">Verified ROI</span>
                <span className="badge bg-dark border border-secondary text-secondary px-2 py-1 fs-11">India &amp; Global</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TpServiceDetailsBannerArea;
