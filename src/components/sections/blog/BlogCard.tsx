import React from "react";
import { Link } from "react-router-dom";

export interface BlogPostItem {
  id: number;
  slug: string;
  title: string;
  meta_title?: string;
  meta_description?: string;
  og_image_query?: string;
  og_image_alt?: string;
  thumb1_query?: string;
  thumb1_alt?: string;
  category: string;
  tags?: string;
  author_name: string;
  reading_time_minutes?: number;
  published_at?: string;
}

interface BlogCardProps {
  post: BlogPostItem;
  delay?: string;
  fallbackImg?: string;
}

export const BlogCard: React.FC<BlogCardProps> = ({
  post,
  delay = ".3",
  fallbackImg = "https://images.pexels.com/photos/23696835/pexels-photo-23696835.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
}) => {
  const pexelsQuery = post.og_image_query || post.thumb1_query || "luxury resort infinity pool sunset tropical";
  const postDate = post.published_at
    ? new Date(post.published_at).getFullYear()
    : "2026";

  return (
    <div className="mp-blog-item tp-hover-item mb-55 tp_fade_anim" data-delay={delay}>
      <Link
        to={`/blog/${post.slug}`}
        className="mp-blog-thumb mb-25 p-relative fix d-block"
        style={{ width: "408px", maxWidth: "100%", height: "360px", overflow: "hidden", borderRadius: "12px" }}
      >
        <div
          className="tp-hover-img"
          data-displacement="/assets/img/imghover/fluid.jpg"
          data-intensity="0.2"
          data-speedin="1"
          data-speedout="1"
          style={{ width: "408px", maxWidth: "100%", height: "360px", overflow: "hidden", borderRadius: "12px" }}
        >
          <img
            data-pexels={pexelsQuery}
            data-type="image"
            data-quality="large"
            className="w-100"
            width={408}
            height={360}
            style={{ width: "100%", height: "360px", objectFit: "cover", borderRadius: "12px" }}
            src={fallbackImg}
            alt={post.og_image_alt || post.title || "Luxury Resort Sunset View"}
          />
        </div>
      </Link>
      <div className="mp-blog-content">
        <h2 className="mp-blog-title tp-ff-sequel-semi-bold mb-10">
          <Link to={`/blog/${post.slug}`} className="common-underline">
            {post.title}
          </Link>
        </h2>
        <span className="mp-blog-date">
          <span>By</span> {post.author_name} - {postDate}
        </span>
      </div>
    </div>
  );
};

export default BlogCard;
