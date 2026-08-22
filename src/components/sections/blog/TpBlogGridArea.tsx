import React from "react";

interface TpBlogGridAreaProps {
  title?: string;
  authorName?: string;
  publishedAt?: string;
}

export const TpBlogGridArea: React.FC<TpBlogGridAreaProps> = ({
  title = "Innovative Strategies\nand Concepts Inspired by\nMarket Research",
  authorName = "Cunnet",
  publishedAt = "2024",
}) => {
  const displayYear = publishedAt.length > 4 ? new Date(publishedAt).getFullYear() : publishedAt;

  return (
    <div className="tp-blog-grid-area tp-pd-2-ptb pt-175 pb-90">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="tp-pd-2-top">
              <h3
                className="tp-section-title tp-ff-sequel-bold-head fs-72 mb-20 tp_fade_anim"
                data-delay=".3"
              >
                {title}
              </h3>
              <span
                className="mp-blog-date mb-10 d-block tp_fade_anim"
                data-delay=".4"
              >
                <span>By</span> {authorName} - {displayYear}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TpBlogGridArea;
