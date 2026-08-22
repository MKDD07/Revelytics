import React, { useEffect } from "react";
import { Header } from "./components/header/Header";
import { Offcanvas } from "./components/header/Offcanvas";
import { Footer } from "./components/footer/Footer";
import {
  HeroSection,
  BrandSection,
  AboutSection,
  ServiceSection,
  TextSliderSection,
  GallerySection,
  PricingSection,
  PortfolioSection,
  FeaturesSection,
  FaqSection,
  CtaSection,
  ContactSection,
} from "./components/sections/index";
import { loadTemplateScripts } from "./utils/loadTemplateScripts";

export function App() {
  useEffect(() => {
    /**
     * Load ALL vendor + theme scripts AFTER React has fully rendered
     * the DOM. This guarantees GSAP, Swiper, magnific-popup and every
     * other library finds the elements it needs when main.js runs.
     */
    loadTemplateScripts().catch((err) =>
      console.error("Template script load error:", err)
    );
  }, []);

  return (
    <>
      {/* subscribe-popup */}
      <div className="subscribe-popup">
        <div className="tp-shop-popup-wrap">
          <div className="tp-shop-popup-img d-none d-md-block">
            <img
              data-pexels="A woman enjoying the golden sunset at a luxurious Bali resort poolside, capturing the essence of tropical relaxation."
              width="400"
              height="500"
              data-type="image"
              data-quality="large"
              src="assets/img/product/newsletter/window-popup.jpg"
              alt="Revelytics Travel"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="tp-shop-popup-content text-center">
            <div className="close"><i className="fa-light fa-xmark"></i></div>
            <div className="tp-shop-popup-logo">
              <img data-width="140" src="assets/img/logo/logo.svg" alt="Revelytics" />
            </div>
            <div className="tp-shop-popup-text">
              <h4>Save 15%</h4>
              <p>ON YOUR FIRST CAMPAIGN</p>
              <span>SIGN UP BELOW FOR TRAVEL MARKETING INSIGHTS</span>
            </div>
            <form action="#">
              <div className="tp-shop-popup-inputbox">
                <input type="text" placeholder="Email Address" />
                <button className="tp-btn-black-square w-100" type="submit">Subscribe</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Begin magic cursor */}
      <div id="magic-cursor" className="cursor-black-bg">
        <div id="ball"></div>
      </div>

      {/* back to top start */}
      <div className="back-to-top-wrapper">
        <button id="back_to_top" type="button" className="back-to-top-btn d-inline-flex align-items-center justify-content-center">
          <i className="fa-regular fa-arrow-up" style={{ fontSize: "16px", lineHeight: "1" }}></i>
        </button>
      </div>

      {/* Offcanvas sidebar component */}
      <Offcanvas />

      {/* Header component */}
      <Header />

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <HeroSection />
            <BrandSection />
            <AboutSection />
            <ServiceSection />
            <TextSliderSection />
            <GallerySection />
            <PricingSection />
            <PortfolioSection />
            <FeaturesSection />
            <FaqSection />
            <CtaSection />
            <ContactSection />
          </main>

          {/* Footer component */}
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
