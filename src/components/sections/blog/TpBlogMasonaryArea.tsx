import React, { useState, useEffect } from "react";
import { BlogCard, BlogPostItem } from "./BlogCard";

export const TpBlogMasonaryArea: React.FC = () => {
  const [posts, setPosts] = useState<BlogPostItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    fetch("/api/blog")
      .then((res) => (res.ok ? res.json() : []))
      .then((data: BlogPostItem[]) => {
        if (Array.isArray(data)) {
          setPosts(data);
        }
      })
      .catch((err) => {
        console.error("Error fetching blog posts from D1:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!loading && (window as any).PexelsLoader) {
      setTimeout(() => {
        (window as any).PexelsLoader?.loadAll();
      }, 100);
    }
  }, [loading, posts]);

  return (
    <div className="mp-blog-area pb-95">
      <div className="container">
        {loading ? (
          <div className="py-80 text-center">
            <div className="spinner-border text-danger" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="row">
            {posts.map((post, index) => (
              <div key={post.id || index} className="col-xxl-3 col-xl-4 col-lg-6 col-md-6">
                <BlogCard
                  post={post}
                  delay={`.${(index % 4) + 3}`}
                  fallbackImg={`/assets/img/blog/col-4/thumb${index > 0 ? `-${(index % 6) + 1}` : ""}.jpg`}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TpBlogMasonaryArea;
