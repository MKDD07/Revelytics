import React from "react";

export interface TpBannerThumbProps {
  imageQuery?: string;
  altText?: string;
  service?: any;
}

export const TpBannerThumb: React.FC<TpBannerThumbProps> = ({
  imageQuery,
  altText,
  service,
}) => {
  return (
<>
  {/* tp-banner-area-start */}
  <div className="tp-banner-thumb fix w-100 scale-up-img">
    <img
      data-speed="0.4"
      className="img-cover scale-up"
      src="assets/img/banner/thumb-5.jpg"
      alt=""
    />
  </div>
  {/* tp-banner-area-end */}
</>

  );
};

export default TpBannerThumb;
