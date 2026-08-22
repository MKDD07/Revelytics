import React from "react";
import TpButton from "../../common/TpButton";

export interface TpServiceOverviewAreaProps {
  service?: any;
}

export const TpServiceOverviewArea: React.FC<TpServiceOverviewAreaProps> = ({ service }) => {
  const title = service?.title || "Specialized Hospitality Solution";
  const shortDesc = service?.short_desc || service?.short_description || "";
  const sections = service?.sections || [];

  return (
    <div className="tp-service-overview-area pt-110 pb-100" style={{ background: "#09090b" }}>
      <div className="container">
        <div className="row">
          {/* Main Left Content */}
          <div className="col-lg-8 mb-5 mb-lg-0">
            <div className="pe-lg-4">
              <span className="text-danger fw-bold text-uppercase fs-13 d-block mb-2">
                [ Deep Dive Overview ]
              </span>
              <h2 className="tp-ff-sequel-bold-head text-white fs-40 text-uppercase mb-4 lh-1">
                Strategic Deliverables &amp; Solutions
              </h2>

              {shortDesc && (
                <p className="text-secondary fs-18 lh-base mb-5 pb-3 border-bottom border-secondary">
                  {shortDesc}
                </p>
              )}

              {/* Dynamic Service Sections from D1 */}
              {sections.length > 0 ? (
                <div className="service-sections-list">
                  {sections.map((sec: any, idx: number) => (
                    <div
                      key={sec.id || idx}
                      className="p-4 p-md-5 rounded-4 mb-4 border border-secondary"
                      style={{ background: "#121215" }}
                    >
                      <div className="d-flex align-items-center gap-3 mb-3">
                        <span className="badge bg-danger rounded-circle p-2 fs-12" style={{ width: "32px", height: "32px", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                          0{idx + 1}
                        </span>
                        <h3 className="fs-24 text-white m-0 fw-bold">{sec.heading}</h3>
                      </div>

                      {sec.body && (
                        <p className="text-secondary fs-15 lh-lg mb-4">{sec.body}</p>
                      )}

                      {sec.pexels_query && (
                        <div className="mt-3 overflow-hidden rounded-3">
                          <img
                            data-pexels={sec.pexels_query}
                            data-type="image"
                            data-quality="large"
                            alt={sec.image_alt || sec.heading}
                            className="w-100 img-fluid"
                            style={{ maxHeight: "360px", objectFit: "cover", borderRadius: "16px" }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 p-md-5 rounded-4 mb-4 border border-secondary" style={{ background: "#121215" }}>
                  <h3 className="fs-24 text-white mb-3 fw-bold">Why Top Hotels Partner with Revelytics for {title}</h3>
                  <p className="text-secondary fs-15 lh-lg mb-4">
                    Our dedicated revenue managers, digital strategists, and performance marketers ensure your property scales ARR, maintains rate parity, and eliminates heavy OTA commissions.
                  </p>
                  <ul className="list-unstyled text-secondary fs-15 m-0 d-flex flex-column gap-2">
                    <li className="d-flex align-items-center gap-2">
                      <span className="text-danger">✓</span> 100% Commission-free direct booking engine optimization
                    </li>
                    <li className="d-flex align-items-center gap-2">
                      <span className="text-danger">✓</span> High-ROAS localized Google Hotel Ads &amp; Meta campaigns
                    </li>
                    <li className="d-flex align-items-center gap-2">
                      <span className="text-danger">✓</span> Real-time competitor rate tracking and dynamic yield adjustments
                    </li>
                  </ul>
                </div>
              )}

              {/* Action CTA */}
              <div className="mt-5 pt-3">
                <TpButton
                  to={service?.cta_url || "/contact-us"}
                  text={service?.cta_text || "Schedule Free Strategy Consultation"}
                  className="tp-btn-red"
                  wrapperClassName=""
                />
              </div>
            </div>
          </div>

          {/* Right Sidebar: Key Value Props & Quick Form */}
          <div className="col-lg-4">
            <div className="p-4 rounded-4 border border-secondary mb-4" style={{ background: "#131316" }}>
              <h4 className="text-white fs-20 fw-bold mb-3">Core Performance Metrics</h4>
              <div className="d-flex flex-column gap-3">
                <div className="p-3 rounded-3 bg-black border border-secondary">
                  <span className="text-secondary fs-12 text-uppercase d-block">Average ARR Growth</span>
                  <strong className="text-danger fs-24 fw-bold">+28.4%</strong>
                  <p className="text-secondary fs-12 m-0 mt-1">Achieved within first 90 days of onboarding</p>
                </div>
                <div className="p-3 rounded-3 bg-black border border-secondary">
                  <span className="text-secondary fs-12 text-uppercase d-block">Direct Booking Share</span>
                  <strong className="text-white fs-24 fw-bold">42% &rarr; 68%</strong>
                  <p className="text-secondary fs-12 m-0 mt-1">Significant drop in OTA commission payout</p>
                </div>
                <div className="p-3 rounded-3 bg-black border border-secondary">
                  <span className="text-secondary fs-12 text-uppercase d-block">Rate Parity Accuracy</span>
                  <strong className="text-success fs-24 fw-bold">99.8%</strong>
                  <p className="text-secondary fs-12 m-0 mt-1">Automated two-way channel synchronization</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-4 border border-danger border-opacity-50" style={{ background: "radial-gradient(circle at top right, rgba(220,53,69,0.15), #131316)" }}>
              <span className="badge bg-danger mb-2">Hospitality Advisory</span>
              <h4 className="text-white fs-20 fw-bold mb-2">Need a Custom Audit?</h4>
              <p className="text-secondary fs-14 mb-4">
                Speak directly with a senior revenue strategist to review your property's current distribution and pricing leakage.
              </p>
              <TpButton
                to="/contact-us"
                text="Request Property Audit"
                className="w-100 justify-content-center"
                wrapperClassName=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TpServiceOverviewArea;
