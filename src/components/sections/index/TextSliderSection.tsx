import React from "react";

export const TextSliderSection: React.FC = () => {
  return (
    <div className="shop-text-slider pp-porfolio-slider mt-160 mb-60" data-bg-color="#101012">
      <div className="swiper pp-slide-active">
        <div className="swiper-wrapper slide-transtion">
          <div className="swiper-slide">
            <span className="text-white">Strategic Travel Marketing <span></span></span>
          </div>
          <div className="swiper-slide">
            <span className="text-white">Destination Branding <span></span></span>
          </div>
          <div className="swiper-slide">
            <span className="text-white">Performance Media Ads <span></span></span>
          </div>
          <div className="swiper-slide">
            <span className="text-white">Tourism SEO &amp; Growth <span></span></span>
          </div>
          <div className="swiper-slide">
            <span className="text-white">Revelytics Studio India <span></span></span>
          </div>
          <div className="swiper-slide">
            <span className="text-white">Influencer Campaigns <span></span></span>
          </div>
          <div className="swiper-slide">
            <span className="text-white">Direct Booking Growth <span></span></span>
          </div>
          <div className="swiper-slide">
            <span className="text-white">Crafting Travel Experiences <span></span></span>
          </div>
        </div>
      </div>
    </div>
  );
};
