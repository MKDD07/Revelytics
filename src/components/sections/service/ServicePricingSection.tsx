import React from "react";
import TpButton from "../../common/TpButton";

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="11" viewBox="0 0 13 11" fill="none">
    <path d="M4.44737 11L0 5.66667L4.44737 8.33333L13 0L4.44737 11Z" fill="currentColor" fillOpacity="0.8" />
  </svg>
);

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  popular?: boolean;
  features: string[];
}

interface ServicePricingSectionProps {
  monthly: PricingPlan[];
  yearly: PricingPlan[];
}

const PlanCard: React.FC<{ plan: PricingPlan }> = ({ plan }) => (
  <div className={`ds-price-item${plan.popular ? " active" : ""} mb-30`}>
    {plan.popular && <div className="ds-price-item-tag"><span>popular</span></div>}
    <div className="ds-price-item-head">
      <span>{plan.name}</span>
      <p>Ideal for growing travel & tourism brands.</p>
      <h4>{plan.price} <i> {plan.period}</i></h4>
    </div>
    <div className="ds-price-item-list">
      <h4 className="ds-price-item-list-title">Includes:</h4>
      <ul>
        {plan.features.map((f, i) => (
          <li key={i}><span><CheckIcon /></span>{f}</li>
        ))}
      </ul>
    </div>
    <div className="ds-price-item-btn">
      <TpButton
        to="/contact-us"
        text="Choose your plan"
        className="tp-btn-border tp-btn-xxl w-100 justify-content-center"
        wrapperClassName=""
      />
    </div>
  </div>
);

export const ServicePricingSection: React.FC<ServicePricingSectionProps> = ({ monthly, yearly }) => {
  return (
    <div className="tp-pricing-ptb pt-155 pb-130">
      <div className="container container-1480">
        <div className="row align-items-end">
          <div className="col-lg-8">
            <div className="tp-pricing-heading mb-65">
              <span className="tp-section-subtitle fs-20 fw-500 mb-10 d-inline-block">Revelytics Plan</span>
              <h2 className="tp-section-title reveal-text">Special Offer! choose<br /> your pack today</h2>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="tp-pricing-nav-wrapper p-relative mb-80 d-flex justify-content-lg-end align-items-center">
              <label className="tp-toggler-pre" id="tp-nav-monthly">Monthly</label>
              <div className="tp-toggle-input-wrap">
                <input type="checkbox" id="tp-switcher-input" className="tp-input-check" />
                <b className="tp-switch-toggle"></b>
              </div>
              <label className="tp-toggler-post is-active" id="tp-nav-yearly">Yearly</label>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div id="tp-tab-monthly" className="tp-pricing-tab-item tp-tab-hide">
              <div className="row">
                {monthly.map((p, i) => (
                  <div className="col-xl-4 col-md-6" key={i}><PlanCard plan={p} /></div>
                ))}
              </div>
            </div>
            <div id="tp-tab-yearly" className="tp-pricing-tab-item">
              <div className="row">
                {yearly.map((p, i) => (
                  <div className="col-xl-4 col-md-6" key={i}><PlanCard plan={p} /></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
