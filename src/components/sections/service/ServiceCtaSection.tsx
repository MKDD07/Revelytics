import React from "react";
import TpButton from "../../common/TpButton";

export const ServiceCtaSection: React.FC = () => (
  <div className="ca-testimonial-spacing fix" data-bg-color="#09090b">
    <div className="ca-cta-area ca-cta-spacing pt-180 pb-120 p-relative z-index-1">
      <div className="mil-scale-img ca-cta-scale" data-value-1="1.45" data-value-2="1">
        <img className="ca-cta-shape" src="assets/img/cta/shape.png" alt="" />
      </div>
      <div className="container">
        <div className="row align-content-end">
          <div className="col-lg-7">
            <div className="ca-cta-title-wrap p-relative mb-40">
              <h2 className="ca-section-title fs-100 text-white lh-1 mb-50 reveal-text">Ready to grow<br /> your travel brand?</h2>
              <div className="tp_fade_anim" data-delay=".4" data-fade-from="bottom" data-ease="bounce">
                <TpButton to="/contact-us" text="Contact Us" className="tp-btn-red tp-ff-inter" wrapperClassName="" />
              </div>
              <img className="ca-cta-shape-2 d-none d-sm-inline-block" src="assets/img/cta/shape-3.png" alt="" />
            </div>
          </div>
          <div className="col-lg-5">
            <div className="ca-cta-thumb ml-100">
              <img src="assets/img/cta/shape-2.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
