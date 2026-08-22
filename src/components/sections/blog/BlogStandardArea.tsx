import React from "react";

interface BlogStandardAreaProps {
  title?: string;
  subtitle?: string;
}

export const BlogStandardArea: React.FC<BlogStandardAreaProps> = ({
  title = "Insights & Hospitality Strategies",
  subtitle = "Explore our latest case studies, revenue management deep-dives, and digital growth frameworks for hotels & resorts in India.",
}) => {
  return (
    <div className="blog-standard-area tp-pd-2-ptb pt-175 pb-70">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <div className="tp-pd-2-top">
              <span className="text-danger fw-bold text-uppercase mb-2 d-block tp_fade_anim" data-delay=".2">
                Revelytics Knowledge Hub
              </span>
              <h1
                className="tp-section-title tp-ff-sequel-bold-head fs-64 mb-20 tp_fade_anim"
                data-delay=".3"
              >
                {title}
              </h1>
              <p className="text-secondary fs-18 mx-auto tp_fade_anim" data-delay=".4" style={{ maxWidth: "700px" }}>
                {subtitle}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogStandardArea;
