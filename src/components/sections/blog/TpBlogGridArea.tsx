import React from "react";

interface TpBlogGridAreaProps {
  title?: string;
  authorName?: string;
  publishedAt?: string;
  category?: string;
  readingTime?: number;
}

export const TpBlogGridArea: React.FC<TpBlogGridAreaProps> = ({
  title = "Innovative Strategies and Concepts Inspired by Market Research",
  authorName = "Revelytics Editorial Team",
  publishedAt = "2026",
  category = "Hospitality Strategy",
  readingTime = 5,
}) => {
  const displayYear = publishedAt.length > 4 ? new Date(publishedAt).getFullYear() : publishedAt;

  return (
    <div className="tp-blog-grid-area tp-pd-2-ptb pt-175 pb-70">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="tp-pd-2-top">
              {category && (
                <span className="badge bg-danger text-white px-3 py-2 text-uppercase mb-3 d-inline-block">
                  {category}
                </span>
              )}
              <h1
                className="tp-section-title tp-ff-sequel-bold-head fs-56 mb-20 tp_fade_anim"
                data-delay=".3"
              >
                {title}
              </h1>
              <span
                className="mp-blog-date mb-10 d-block tp_fade_anim d-flex align-items-center gap-3"
                data-delay=".4"
              >
                <span>By</span> {authorName} — {displayYear}
                {readingTime && (
                  <span className="badge bg-light text-dark border">
                    {readingTime} min read
                  </span>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TpBlogGridArea;
