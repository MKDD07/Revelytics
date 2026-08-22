import React from "react";

export const FaqSection: React.FC = () => {
  return (
    <div className="ca-faq-area pt-135 pb-145">
      <div className="container">
        <div className="row">
          <div className="col-lg-5">
            <div className="ca-faq-title-wrap mb-40 tp_fade_anim" data-delay=".3">
              <span className="ca-team-subtitle text-uppercase d-block mb-15"><span>[ </span>Our Faq<span> ]</span></span>
              <img className="mb-10" src="assets/img/faq/faq-thumb.png" alt="" width="300" />
              <h2 className="ca-section-title mb-15">Have Questions</h2>
              <p className="tp-faq-dec mb-35">Let us Know how we can assist</p>
              <a href="contact-us-light.html" className="tp-btn tp-btn-xl tp-btn-grey tp-btn-switch-animation">
                <span className="d-flex align-items-center justify-content-center">
                  <span className="btn-text">Contact Me</span>
                  <span className="btn-icon">
                    <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 6.36401C0.447715 6.36401 1.67492e-07 6.81173 1.19209e-07 7.36401C7.0927e-08 7.9163 0.447715 8.36401 1 8.36401L1 7.36401L1 6.36401ZM16.7071 8.07112C17.0976 7.6806 17.0976 7.04743 16.7071 6.65691L10.3431 0.292948C9.95262 -0.0975769 9.31946 -0.0975769 8.92893 0.292947C8.53841 0.683472 8.53841 1.31664 8.92893 1.70716L14.5858 7.36401L8.92893 13.0209C8.53841 13.4114 8.53841 14.0446 8.92893 14.4351C9.31946 14.8256 9.95262 14.8256 10.3431 14.4351L16.7071 8.07112ZM1 7.36401L1 8.36401L16 8.36401L16 7.36401L16 6.36402L1 6.36401L1 7.36401Z" fill="currentColor" />
                    </svg>
                  </span>
                  <span className="btn-icon">
                    <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 6.36401C0.447715 6.36401 1.67492e-07 6.81173 1.19209e-07 7.36401C7.0927e-08 7.9163 0.447715 8.36401 1 8.36401L1 7.36401L1 6.36401ZM16.7071 8.07112C17.0976 7.6806 17.0976 7.04743 16.7071 6.65691L10.3431 0.292948C9.95262 -0.0975769 9.31946 -0.0975769 8.92893 0.292947C8.53841 0.683472 8.53841 1.31664 8.92893 1.70716L14.5858 7.36401L8.92893 13.0209C8.53841 13.4114 8.53841 14.0446 8.92893 14.4351C9.31946 14.8256 9.95262 14.8256 10.3431 14.4351L16.7071 8.07112ZM1 7.36401L1 8.36401L16 8.36401L16 7.36401L16 6.36402L1 6.36401L1 7.36401Z" fill="currentColor" />
                    </svg>
                  </span>
                </span> 
              </a>
            </div>
          </div>
          <div className="col-xl-7">
            <div className="tp-faq ml-115">
              <div className="accordion" id="accordionExample">
                <div className="tp-faq-item tp_fade_anim" data-delay=".3">
                  <h2 className="accordion-header">
                    <button className="tp-faq-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">What is Revelytics?</button>
                  </h2>
                  <div id="collapseOne" className="tp-faq-collapse collapse show" data-bs-parent="#accordionExample">
                    <div className="tp-faq-body">
                      <p>Revelytics is an India-based premier digital marketing agency specializing in travel &amp; tourism branding, performance advertising, SEO, and booking growth.</p>
                    </div>
                  </div>
                </div>
                <div className="tp-faq-item tp_fade_anim" data-delay=".3">
                  <h2 className="accordion-header">
                    <button className="tp-faq-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">How long does a travel marketing campaign take to launch?</button>
                  </h2>
                  <div id="collapseTwo" className="tp-faq-collapse collapse" data-bs-parent="#accordionExample">
                    <div className="tp-faq-body">
                      <p>Most strategy and campaign setups are executed within 1 to 2 weeks, ensuring rapid deployment and measurable ROI.</p>
                    </div>
                  </div>
                </div>
                <div className="tp-faq-item tp_fade_anim" data-delay=".3">
                  <h2 className="accordion-header">
                    <button className="tp-faq-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">What makes Revelytics different from other agencies?</button>
                  </h2>
                  <div id="collapseThree" className="tp-faq-collapse collapse" data-bs-parent="#accordionExample">
                    <div className="tp-faq-body">
                      <p>We combine deep travel industry insights with data-driven performance marketing to turn wanderlust into direct travel bookings.</p>
                    </div>
                  </div>
                </div>
                <div className="tp-faq-item tp_fade_anim" data-delay=".3">
                  <h2 className="accordion-header">
                    <button className="tp-faq-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">Can you handle both brand design and booking tech?</button>
                  </h2>
                  <div id="collapseFour" className="tp-faq-collapse collapse" data-bs-parent="#accordionExample">
                    <div className="tp-faq-body">
                      <p>Yes! We provide end-to-end solutions, from destination branding and video content to custom booking web platforms.</p>
                    </div>
                  </div>
                </div>
                <div className="tp-faq-item tp_fade_anim" data-delay=".3">
                  <h2 className="accordion-header">
                    <button className="tp-faq-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">Do you offer ongoing campaign management and optimization?</button>
                  </h2>
                  <div id="collapseFive" className="tp-faq-collapse collapse" data-bs-parent="#accordionExample">
                    <div className="tp-faq-body">
                      <p>Absolutely. We continuously monitor ad performance, track conversions, and optimize ROAS for ongoing brand growth.</p>
                    </div>
                  </div>
                </div>
                <div className="tp-faq-item tp_fade_anim" data-delay=".3">
                  <h2 className="accordion-header">
                    <button className="tp-faq-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">Do you work with international travel brands outside India?</button>
                  </h2>
                  <div id="collapseSix" className="tp-faq-collapse collapse" data-bs-parent="#accordionExample">
                    <div className="tp-faq-body">
                      <p>Yes, while we are proudly based in India, we partner with tourism boards, luxury resorts, and tour operators worldwide.</p>
                    </div>
                  </div>
                </div>
                <div className="tp-faq-item tp_fade_anim" data-delay=".3">
                  <h2 className="accordion-header">
                    <button className="tp-faq-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSaven" aria-expanded="false" aria-controls="collapseSaven">How do we get started with Revelytics?</button>
                  </h2>
                  <div id="collapseSaven" className="tp-faq-collapse collapse" data-bs-parent="#accordionExample">
                    <div className="tp-faq-body">
                      <p>Simply reach out via our contact page or email us directly at hello@revelytics.in to schedule a strategy consultation.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
