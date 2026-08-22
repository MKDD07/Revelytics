import React, { useState } from "react";

export interface TpFaqAreaProps {
  service?: any;
}

export const TpFaqArea: React.FC<TpFaqAreaProps> = ({ service }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const title = service?.title || "Hospitality Services";

  // Tailored FAQs based on service or defaults
  const faqs = [
    {
      q: `How quickly can we see results with ${title}?`,
      a: `Most partner hotels and resorts observe measurable improvements in ARR, direct website conversion rates, and OTA ranking within the first 30 to 45 days of active deployment.`,
    },
    {
      q: `How does Revelytics handle OTA rate parity?`,
      a: `We utilize real-time algorithmic rate intelligence and two-way channel synchronization to ensure your direct booking engine always maintains an advantage (exclusive perks, room upgrades, flexible policies) while preventing OTA parity penalties.`,
    },
    {
      q: `Can this service integrate with our existing PMS and Channel Manager?`,
      a: `Yes, we integrate seamlessly with major Property Management Systems (PMS) like Opera, IDS Next, Hotelogix, eZee, and leading channel managers like SiteMinder, RateGain, and STAAH.`,
    },
    {
      q: `What contract terms and onboarding support do you provide?`,
      a: `We offer flexible monthly and quarterly engagement models. Every property is assigned a dedicated senior account strategist with 24/7 priority support.`,
    },
  ];

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="tp-faq-area pt-100 pb-120" style={{ background: "#0c0c0e" }}>
      <div className="container">
        <div className="row justify-content-center text-center mb-60">
          <div className="col-lg-8">
            <span className="text-danger fw-bold text-uppercase fs-13 d-block mb-2">
              [ Frequently Asked Questions ]
            </span>
            <h2 className="tp-ff-sequel-bold-head text-uppercase text-white fs-40 lh-1">
              Everything You Need to Know
            </h2>
            <p className="text-secondary fs-16 mt-3">
              Clear answers regarding implementation, integrations, and expected outcomes for your hotel property.
            </p>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-9">
            <div className="d-flex flex-column gap-3">
              {faqs.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-4 border border-secondary"
                    style={{
                      background: isOpen ? "#16161a" : "#101013",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <button
                      type="button"
                      className="btn w-100 text-start p-0 d-flex justify-content-between align-items-center bg-transparent border-0 text-white"
                      onClick={() => toggleFaq(idx)}
                    >
                      <span className="fs-18 fw-bold pe-3">{faq.q}</span>
                      <span
                        className="badge bg-danger rounded-circle p-2 fs-14"
                        style={{
                          width: "28px",
                          height: "28px",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                          transition: "transform 0.3s ease",
                        }}
                      >
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="mt-3 pt-3 border-top border-secondary text-secondary fs-15 lh-lg">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TpFaqArea;
