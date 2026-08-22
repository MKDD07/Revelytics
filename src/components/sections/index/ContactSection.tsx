import React from "react";

export const ContactSection: React.FC = () => {
  return (
    <div id="contact" className="tp-contact-area pt-160 pb-110">
      <div className="container">
        <div className="tp-contact-bg">
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="tp-contact-author-wrap d-flex align-items-center mb-30">
                <div className="tp-contact-author-thumb mr-15">
                  <img data-pexels="indian professional business man portrait" data-type="image" data-quality="large" src="assets/img/contact/author.png" alt="Aarav Sharma" width="65" height="65" style={{ borderRadius: "50%", objectFit: "cover" }} />
                </div>
                <div className="tp-contact-author-content">
                  <h6>Aarav Sharma</h6>
                  <span>Head of Travel Strategy</span>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="tp-contact-info mb-30">
                <div className="mb-20">
                  <a className="tp-contact-tel" href="tel:+919876543210">+91 98765 43210</a>
                </div>
                <div className="mb-30">
                  <a className="tp-contact-mail" href="mailto:hello@revelytics.in">hello@revelytics.in</a>
                </div>
                <div className="tp-contact-address mb-30">
                  <h4>Headquarters</h4>
                  <a href="https://www.google.com/maps" className="common-underline" target="_blank" rel="noreferrer">Cyber City, DLF Phase 2,<br /> Gurugram, Delhi NCR, India</a>
                </div>
                <div className="tp-contact-address">
                  <h4>Tech Hub Office</h4>
                  <a href="https://www.google.com/maps" className="common-underline" target="_blank" rel="noreferrer">100 Feet Rd, Indiranagar,<br /> Bengaluru, Karnataka, India</a>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="tp-contact-form-wrap ml-95 mb-30">
                <form id="contact-form" action="assets/mail-contact-us.php" method="POST">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="tp-contact-form-input mb-20">
                        <label>Full name*</label>
                        <input name="name" type="text" placeholder="Your Name" />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="tp-contact-form-input mb-20">
                        <label>Email address*</label>
                        <input name="email" type="email" placeholder="email@domain.com" />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="tp-contact-form-input mb-20">
                        <label>Website link</label>
                        <input name="website" type="text" placeholder="https://yourbrand.com" />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="tp-contact-form-input mb-20">
                        <label>How Can We Help You*</label>
                        <textarea name="message" placeholder="Tell us about your travel marketing goals..."></textarea>
                      </div>
                      <div className="tp-contact-form-btn">
                        <button type="submit" className="tp-btn tp-btn-xxl tp-btn-red d-inline-flex align-items-center w-100">
                          <span>
                            <span className="text-1">Send Message</span>
                            <span className="text-2">Send Message</span>
                          </span>
                        </button>
                        <p className="ajax-response mt-5"></p>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
