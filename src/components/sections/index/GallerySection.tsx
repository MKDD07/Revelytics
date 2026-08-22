import React from "react";
import TpButton from "../../common/TpButton";

export const GallerySection: React.FC = () => {
  return (
    <div className="mg-gallery-area fix">
      <div className="container-fluid container-1886">
        <div className="inner-service-gallery tp-gallery-wrapper">
          <div className="inner-service-gallery-item about-us-history-title-wrap text-center mb-30">
            <h2 className="about-us-history-title tp-ff-sequel-bold-head text-uppercase mb-50">Explore<br /> The Portfolio</h2>
            <TpButton to="/services" text="Discover Now" className="tp-btn-white tp-ff-inter text-uppercase" wrapperClassName="" />
          </div>
          <div className="row gx-30">
            <div className="col-lg-4 col-md-4 col-sm-4 col-4">
              <div className="tp-gallery-item-wrapper" data-speed="-0.1">
                <div className="tp-gallery-item mb-30">
                  <a href="#"><img data-pexels="travel destination beach palm trees" data-type="image" data-quality="large" className="w-100" src="assets/img/gallery/thumb.jpg" alt="Travel Destination" /></a>
                </div>
                <div className="tp-gallery-item mb-30">
                  <a href="#"><img data-pexels="himalayas mountains trekker" data-type="image" data-quality="large" className="w-100" src="assets/img/gallery/thumb-2.jpg" alt="Himalayas Trekking" /></a>
                </div>
                <div className="tp-gallery-item mb-30">
                  <a href="#"><img data-pexels="taj mahal agra india" data-type="image" data-quality="large" className="w-100" src="assets/img/gallery/thumb-3.jpg" alt="Taj Mahal India" /></a>
                </div>
                <div className="tp-gallery-item mb-30">
                  <a href="#"><img data-pexels="kerala houseboat backwaters" data-type="image" data-quality="large" className="w-100" src="assets/img/gallery/thumb-4.jpg" alt="Kerala Backwaters" /></a>
                </div>
                <div className="tp-gallery-item mb-30">
                  <a href="#"><img data-pexels="varanasi ganges sunset india" data-type="image" data-quality="large" className="w-100" src="assets/img/gallery/thumb-5.jpg" alt="Varanasi India" /></a>
                </div>
                <div className="tp-gallery-item mb-30">
                  <a href="#"><img data-pexels="goa beach resort sunset" data-type="image" data-quality="large" className="w-100" src="assets/img/gallery/thumb-6.jpg" alt="Goa Beach Resort" /></a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-4 col-4">
              <div className="tp-gallery-item-wrapper" data-speed="0.8">
                <div className="tp-gallery-item mb-30">
                  <a href="#"><img data-pexels="jaipur palace rajasthan india" data-type="image" data-quality="large" className="w-100" src="assets/img/gallery/thumb-7.jpg" alt="Jaipur Palace" /></a>
                </div>
                <div className="tp-gallery-item mb-30">
                  <a href="#"><img data-pexels="ladakh mountain road trip" data-type="image" data-quality="large" className="w-100" src="assets/img/gallery/thumb-8.jpg" alt="Ladakh Mountains" /></a>
                </div>
                <div className="tp-gallery-item mb-30">
                  <a href="#"><img data-pexels="tropical island aerial view" data-type="image" data-quality="large" className="w-100" src="assets/img/gallery/thumb-9.jpg" alt="Tropical Island" /></a>
                </div>
                <div className="tp-gallery-item mb-30">
                  <a href="#"><img data-pexels="hiking mountains adventure couple" data-type="image" data-quality="large" className="w-100" src="assets/img/gallery/thumb-10.jpg" alt="Hiking Adventure" /></a>
                </div>
                <div className="tp-gallery-item mb-30">
                  <a href="#"><img data-pexels="scenic nature landscape waterfall" data-type="image" data-quality="large" className="w-100" src="assets/img/gallery/thumb-11.jpg" alt="Waterfall Nature" /></a>
                </div>
                <div className="tp-gallery-item mb-30">
                  <a href="#"><img data-pexels="luxury travel resort pool" data-type="image" data-quality="large" className="w-100" src="assets/img/gallery/thumb-12.jpg" alt="Luxury Travel Resort" /></a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-4 col-4">
              <div className="tp-gallery-item-wrapper" data-speed="-0.1">
                <div className="tp-gallery-item mb-30">
                  <a href="#"><img data-pexels="india cultural festival colorful" data-type="image" data-quality="large" className="w-100" src="assets/img/gallery/thumb.jpg" alt="India Culture" /></a>
                </div>
                <div className="tp-gallery-item mb-30">
                  <a href="#"><img data-pexels="himalayas valley landscape" data-type="image" data-quality="large" className="w-100" src="assets/img/gallery/thumb-6.jpg" alt="Himalayas Valley" /></a>
                </div>
                <div className="tp-gallery-item mb-30">
                  <a href="#"><img data-pexels="exotic tropical beach sunset" data-type="image" data-quality="large" className="w-100" src="assets/img/gallery/thumb-2.jpg" alt="Exotic Sunset" /></a>
                </div>
                <div className="tp-gallery-item mb-30">
                  <a href="#"><img data-pexels="mountain trekking backpacker" data-type="image" data-quality="large" className="w-100" src="assets/img/gallery/thumb-7.jpg" alt="Mountain Backpacker" /></a>
                </div>
                <div className="tp-gallery-item mb-30">
                  <a href="#"><img data-pexels="ancient temple architecture india" data-type="image" data-quality="large" className="w-100" src="assets/img/gallery/thumb-3.jpg" alt="Ancient Temple" /></a>
                </div>
                <div className="tp-gallery-item mb-30">
                  <a href="#"><img data-pexels="luxury safari resort desert" data-type="image" data-quality="large" className="w-100" src="assets/img/gallery/thumb-9.jpg" alt="Desert Safari" /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
