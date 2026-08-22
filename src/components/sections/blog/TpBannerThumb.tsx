import React from "react";

interface TpBannerThumbProps {
  imageQuery?: string;
  altText?: string;
  fallbackSrc?: string;
}

export const TpBannerThumb: React.FC<TpBannerThumbProps> = ({
  imageQuery = "luxury hotel resort aerial pool sunset",
  altText = "Revelytics Blog Featured Image",
  fallbackSrc = "/assets/img/banner/thumb-7.jpg",
}) => {
  return (
    <div className="tp-banner-thumb fix w-100 scale-up-img">
      <img
        data-speed="0.4"
        data-pexels={imageQuery}
        data-type="image"
        data-quality="original"
        className="img-cover scale-up"
        style={{ width: "100%", maxHeight: "550px", objectFit: "cover" }}
        src={fallbackSrc}
        alt={altText}
      />
    </div>
  );
};

export default TpBannerThumb;
