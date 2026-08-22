import React from "react";

export const ServiceBannerSection: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => {
  return (
    <>
      {/* inner-service-banner-area-start */}
      <div className="inner-service-banner-area about-us-spacing pb-140">
        <div className="container">
          <div className="row">
            <div className="col-xxl-8 offset-xxl-2 col-xl-10">
              <div className="inner-service-banner-title-wrap tp_fade_anim" data-delay=".3">
                <h2 className="about-us-title tp-ff-sequel-medium">{title}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="inner-service-banner-bottom">
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <div className="inner-service-banner-scroll smooth mb-10">
                <a className="tp-ff-sequel-semi-bold text-uppercase tp-smooth" href="#service">
                  scroll to explore
                  <span>
                    <svg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14.75 0.75L7.75 7.75L0.75 0.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </a>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="inner-service-banner-scroll smooth mb-10 text-sm-end">
                <span className="tp-ff-sequel-semi-bold text-uppercase">{subtitle}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* inner-service-banner-area-end */}
    </>
  );
};
