import React from "react";

interface TpBannerThumbProps {
  imageQuery?: string;
  altText?: string;
}

export const TpBannerThumb: React.FC<TpBannerThumbProps> = ({
  imageQuery = "luxury hotel resort aerial pool sunset",
  altText = "",
}) => {
  return (
    <div className="tp-banner-thumb fix w-100 scale-up-img">
      <img
        data-speed="0.4"
        data-pexels={imageQuery}
        data-type="image"
        data-quality="original"
        className="img-cover scale-up"
        src="/assets/img/banner/thumb-7.jpg"
        alt={altText}
      />
    </div>
  );
};

export default TpBannerThumb;
