import React from "react";

interface GalleryImage {
  query: string;
  alt: string;
  fallback: string;
}

interface ServiceGallerySectionProps {
  images: GalleryImage[];
}

export const ServiceGallerySection: React.FC<ServiceGallerySectionProps> = ({ images }) => {
  const col1 = images.slice(0, 6);
  const col2 = images.slice(6, 12);
  const col3 = images.slice(12, 18);

  const renderCol = (imgs: GalleryImage[], speed: string) => (
    <div className="tp-gallery-item-wrapper" data-speed={speed}>
      {imgs.map((img, i) => (
        <div className="tp-gallery-item mb-30" key={i}>
          <a href="#">
            <img
              data-pexels={img.query}
              data-type="image"
              data-quality="original"
              className="w-100"
              src={`assets/img/gallery/${img.fallback}`}
              alt={img.alt}
            />
          </a>
        </div>
      ))}
    </div>
  );

  return (
    <div className="mg-gallery-area fix">
      <div className="container-fluid container-1886">
        <div className="inner-service-gallery tp-gallery-wrapper">
          <div className="inner-service-gallery-item about-us-history-title-wrap text-center mb-30">
            <h2 className="about-us-history-title tp-ff-sequel-bold-head text-uppercase mb-50">Explore<br /> The Portfolio</h2>
            <a className="tp-btn tp-btn-white tp-ff-inter text-uppercase" href="#">
              <span>
                <span className="text-1">Discover Now</span>
                <span className="text-2">Discover Now</span>
              </span>
              <i>
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.21967 9.40717C-0.0732232 9.70006 -0.0732232 10.1749 0.21967 10.4678C0.512563 10.7607 0.987437 10.7607 1.28033 10.4678L0.21967 9.40717ZM10.6875 0.75C10.6875 0.335786 10.3517 2.97145e-09 9.9375 1.50485e-07L3.1875 -2.70983e-07C2.77329 -2.70983e-07 2.4375 0.335786 2.4375 0.75C2.4375 1.16421 2.77329 1.5 3.1875 1.5H9.1875V7.5C9.1875 7.91421 9.52329 8.25 9.9375 8.25C10.3517 8.25 10.6875 7.91421 10.6875 7.5L10.6875 0.75ZM0.75 9.9375L1.28033 10.4678L10.4678 1.28033L9.9375 0.75L9.40717 0.21967L0.21967 9.40717L0.75 9.9375Z" fill="currentColor" />
                </svg>
              </i>
            </a>
          </div>
          <div className="row gx-30">
            <div className="col-lg-4 col-md-4 col-sm-4 col-4">{renderCol(col1, "-0.1")}</div>
            <div className="col-lg-4 col-md-4 col-sm-4 col-4">{renderCol(col2, "0.8")}</div>
            <div className="col-lg-4 col-md-4 col-sm-4 col-4">{renderCol(col3, "-0.1")}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
