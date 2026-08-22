import React from "react";
import TpButton from "../../common/TpButton";

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
            <TpButton to="/services" text="Discover Now" className="tp-btn-white tp-ff-inter text-uppercase" wrapperClassName="" />
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
