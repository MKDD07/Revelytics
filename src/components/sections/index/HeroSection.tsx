import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const heroBg = heroBgRef.current;
    if (!hero || !heroBg) return;

    const ctx = gsap.context(() => {
      gsap.to(heroBg, {
        yPercent: 25,
        scale: 1.12,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    }, hero);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef} className="mg-hero-area mg-hero-spacing" style={{ overflow: "hidden" }}>
      <div className="container-fluid container-1886">
        <div className="mg-hero-spacing-inner p-relative z-index-1">
          <div ref={heroBgRef} className="mg-hero-bg" style={{ willChange: "transform" }}>
            <video
              data-pexels="Hiker trekking in foggy mountains with backpack"
              data-type="video"
              data-quality="hd"
              data-orientation="landscape"
              autoPlay
              muted
              loop
              playsInline
            ></video>
          </div>
          <div className="row p-relative z-index-1">
            <div className="col-lg-6">
              <div className="mg-hero-dec ml-70 mb-35">
                <p className="text-white">
                  Revelytics is a digital marketing<br />
                  travel-based company based in India<br />
                  we think strategically like an agency<br /> and craft powerful experiences.
                </p>
              </div>
            </div>
            <div className="col-12">
              <div className="text-lg-end">
                <div className="mp-hero-awards mg-hero-awards pp-about-awards mb-40 p-relative d-inline-block mr-70">
                  <img className="rotate-infinite" src="assets/img/hero/mg/text.png" alt="award" />
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="mg-hero-text-slider-wrap p-relative mb-45">
                <div className="swiper mg-hero-slide-active">
                  <div className="swiper-wrapper slide-transtion">
                    <div className="swiper-slide">
                      <div className="tp-title-anim pr-20">
                        <h2 className="tp-title-anim-inner mg-hero-slider-title tp-ff-sequel-bold-head text-white text-uppercase">
                          <a href="service-details-light.html" className="tp-title-text">Travel</a>
                          <span className="mg-hero-slider-symbol">P</span>
                        </h2>
                      </div>
                    </div>
                    <div className="swiper-slide">
                      <div className="tp-title-anim">
                        <h2 className="tp-title-anim-inner mg-hero-slider-title tp-ff-sequel-bold-head text-white text-uppercase">
                          <a href="service-details-light.html" className="tp-title-text">Digital</a>
                        </h2>
                      </div>
                    </div>
                    <div className="swiper-slide">
                      <div className="tp-title-anim">
                        <h2 className="tp-title-anim-inner mg-hero-slider-title tp-ff-sequel-bold-head text-white text-uppercase">
                          <a href="service-details-light.html" className="tp-title-text">Marketing</a>
                        </h2>
                      </div>
                    </div>
                    <div className="swiper-slide">
                      <div className="tp-title-anim">
                        <h2 className="tp-title-anim-inner mg-hero-slider-title tp-ff-sequel-bold-head text-white text-uppercase">
                          <a href="service-details-light.html" className="tp-title-text">Branding</a>
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xxl-5 col-xl-6 col-lg-6 col-md-7">
              <div className="mg-hero-tag mb-20 ml-65 mr-60">
                <ul>
                  <li><a href="#">Travel Marketing</a></li>
                  <li><a href="#">Digital Strategy</a></li>
                  <li><a href="#">SEO &amp; Ads</a></li>
                  <li><a href="#">Content Creation</a></li>
                  <li><a href="#">Social Media</a></li>
                  <li><a href="#">Destination Branding</a></li>
                  <li><a href="#">Lead Generation</a></li>
                  <li><a href="#">Performance Marketing</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
