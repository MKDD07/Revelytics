import React from "react";
import TpButton from "../../common/TpButton";

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
              <TpButton to="/contact-us" text="Contact Me" className="tp-btn-grey tp-btn-switch-animation" wrapperClassName="" />
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
