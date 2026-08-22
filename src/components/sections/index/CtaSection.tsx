import React from "react";

export const CtaSection: React.FC = () => {
  return (
    <div className="ca-testimonial-spacing fix" data-bg-color="#09090b">
      <div className="ca-cta-area ca-cta-spacing pt-180 pb-120 p-relative z-index-1">
        <div className="mil-scale-img ca-cta-scale" data-value-1="1.45" data-value-2="1">
          <img className="ca-cta-shape" src="assets/img/cta/shape.png" alt="" />
        </div>
        <div className="container">
          <div className="row align-content-end">
            <div className="col-lg-7">
              <div className="ca-cta-title-wrap p-relative mb-40">
                <h2 className="ca-section-title fs-100 text-white lh-1 mb-50 reveal-text">Lets talk about<br /> your project!</h2>
                <div className="tp_fade_anim" data-delay=".4" data-fade-from="bottom" data-ease="bounce">
                  <a className="tp-btn tp-btn-red tp-ff-inter" href="contact-us-light.html">
                    <span>
                      <span className="text-1">Contact Me</span>
                      <span className="text-2">Contact Me</span>
                    </span>
                    <i>
                      <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.21967 9.40717C-0.0732232 9.70006 -0.0732232 10.1749 0.21967 10.4678C0.512563 10.7607 0.987437 10.7607 1.28033 10.4678L0.21967 9.40717ZM10.6875 0.75C10.6875 0.335786 10.3517 2.97145e-09 9.9375 1.50485e-07L3.1875 -2.70983e-07C2.77329 -2.70983e-07 2.4375 0.335786 2.4375 0.75C2.4375 1.16421 2.77329 1.5 3.1875 1.5H9.1875V7.5C9.1875 7.91421 9.52329 8.25 9.9375 8.25C10.3517 8.25 10.6875 7.91421 10.6875 7.5L10.6875 0.75ZM0.75 9.9375L1.28033 10.4678L10.4678 1.28033L9.9375 0.75L9.40717 0.21967L0.21967 9.40717L0.75 9.9375Z" fill="currentColor" />
                      </svg>
                      <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.21967 9.40717C-0.0732232 9.70006 -0.0732232 10.1749 0.21967 10.4678C0.512563 10.7607 0.987437 10.7607 1.28033 10.4678L0.21967 9.40717ZM10.6875 0.75C10.6875 0.335786 10.3517 2.97145e-09 9.9375 1.50485e-07L3.1875 -2.70983e-07C2.77329 -2.70983e-07 2.4375 0.335786 2.4375 0.75C2.4375 1.16421 2.77329 1.5 3.1875 1.5H9.1875V7.5C9.1875 7.91421 9.52329 8.25 9.9375 8.25C10.3517 8.25 10.6875 7.91421 10.6875 7.5L10.6875 0.75ZM0.75 9.9375L1.28033 10.4678L10.4678 1.28033L9.9375 0.75L9.40717 0.21967L0.21967 9.40717L0.75 9.9375Z" fill="currentColor" />
                      </svg>
                    </i>
                  </a>
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
};
