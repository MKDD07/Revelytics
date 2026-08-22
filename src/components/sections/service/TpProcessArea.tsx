import React from "react";

export interface TpProcessAreaProps {
  service?: any;
}

export const TpProcessArea: React.FC<TpProcessAreaProps> = ({ service }) => {
  const serviceTitle = service?.title || "Hospitality";

  // Dynamic process steps from D1 sections or strategic defaults
  const steps = [
    {
      num: "01",
      title: "Data Audit & Market Diagnostics",
      desc: `We analyze your historical booking trends, OTA yield ratios, RevPAR benchmarks, and competitor rate structures across your target market.`,
    },
    {
      num: "02",
      title: "Strategy & Custom Architecture",
      desc: `Deploy a tailored hospitality framework engineered for ${serviceTitle} to eliminate direct booking friction and maximize revenue per room.`,
    },
    {
      num: "03",
      title: "Full-Funnel Execution",
      desc: `Execute targeted campaigns, dynamic algorithm adjustments, multi-channel distribution, and automated guest nurturing journeys.`,
    },
    {
      num: "04",
      title: "Continuous Optimization & Scale",
      desc: `Bi-weekly performance audits, real-time ROI tracking, rate parity enforcement, and scaling direct guest acquisition.`,
    },
  ];

  return (
    <div className="tp-process-area pt-100 pb-90" style={{ background: "#0c0c0e" }}>
      <div className="container">
        <div className="row justify-content-center text-center mb-60">
          <div className="col-lg-8">
            <span className="text-danger fw-bold text-uppercase fs-13 d-block mb-2">
              [ Systematic Methodology ]
            </span>
            <h2 className="tp-ff-sequel-bold-head text-uppercase text-white fs-44 lh-1">
              How We Deliver Measurable ROI
            </h2>
            <p className="text-secondary fs-16 mt-3">
              Our 4-step strategic execution model refined over 10+ years across 500+ luxury hotels and boutique resorts.
            </p>
          </div>
        </div>

        <div className="row g-4">
          {steps.map((step, idx) => (
            <div key={idx} className="col-lg-3 col-md-6">
              <div
                className="p-4 rounded-4 h-100 position-relative border border-secondary"
                style={{ background: "#131316", transition: "transform 0.3s ease" }}
              >
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <span className="tp-ff-sequel-bold-head text-danger fs-36 lh-1">{step.num}</span>
                  <span className="badge bg-dark text-secondary border border-secondary px-2 py-1 fs-11">Step {idx + 1}</span>
                </div>
                <h4 className="text-white fs-20 mb-3 fw-bold">{step.title}</h4>
                <p className="text-secondary fs-14 m-0 lh-base">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TpProcessArea;
