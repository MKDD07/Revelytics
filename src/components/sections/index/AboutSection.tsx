import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TpButton from "../../common/TpButton";

gsap.registerPlugin(ScrollTrigger);

export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sec = sectionRef.current;
    if (!sec) return;

    const ctx = gsap.context(() => {
      sec.querySelectorAll(".tp-about-thumb img").forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -12, scale: 1.15 },
          {
            yPercent: 12,
            scale: 1.0,
            ease: "none",
            scrollTrigger: {
              trigger: img.parentElement || img,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          }
        );
      });
    }, sec);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="tp-about-area pt-85">
      <div className="container">
        <div className="row align-items-end">
          <div className="col-xxl-10 col-xl-12">
            <div className="tp-about-title-wrap mb-30">
              <h2 className="tp-section-title tp-text-perspective">At Revelytics, we don’t just launch campaigns<br />
                or websites — we craft purpose-driven
                digital travel journeys.
                <span className="tp-about-btn-transform d-inline-block ml-20">
                  <TpButton to="/about" text="About Us" className="tp-ff-inter" wrapperClassName="" />
                </span>
              </h2>
            </div>
          </div>
        </div>
        <div className="tp-about-border mt-20 pt-55">
          <div className="row">
            <div className="col-lg-4">
              <div className="tp-about-subtitle-wrap mb-30">
                <span className="tp-about-subtitle">
                  <svg width="23" height="20" viewBox="0 0 23 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1V13.8182H20.7232" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M23 13.8182L15.0349 19.1718L15.0349 8.46456L23 13.8182Z" fill="currentColor" />
                  </svg>
                  About Us
                </span>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="tp-about-thumb-wrap ml-75">
                <div className="row gx-80">
                  <div className="col-lg-6 col-md-6">
                    <div className="tp-about-item anim-zoomin-wrap mb-40">
                      <div className="mb-35">
                        <div className="tp-about-thumb fix anim-zoomin">
                          <img data-pexels="digital marketing team travel" data-type="image" data-quality="large" data-speed=".8" src="assets/img/about/thumb.jpg" alt="Travel Marketing Strategy" />
                        </div>
                      </div>
                      <div className="tp-about-content">
                        <h3 className="tp-about-title mb-10">Travel-First Strategy</h3>
                        <p className="tp-about-dec">Every campaign starts with data-driven insights tailored<br /> to the travel and hospitality industry.</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <div className="tp-about-item anim-zoomin-wrap mb-40">
                      <div className="mb-35">
                        <div className="tp-about-thumb fix anim-zoomin">
                          <img data-pexels="tropical resort sunset beach" data-type="image" data-quality="large" data-speed=".8" src="assets/img/about/thumb-2.jpg" alt="Tourism Growth" />
                        </div>
                      </div>
                      <div className="tp-about-content">
                        <h3 className="tp-about-title mb-10">Tailored Tourism Growth</h3>
                        <p className="tp-about-dec">From destination branding to targeted ad campaigns,<br /> we power global bookings for travel brands.</p>
                      </div>
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
