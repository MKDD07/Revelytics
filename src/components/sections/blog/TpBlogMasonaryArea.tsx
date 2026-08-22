import React, { useState, useEffect } from "react";
import { BlogCard, BlogPostItem } from "./BlogCard";

export const TpBlogMasonaryArea: React.FC = () => {
  const [posts, setPosts] = useState<BlogPostItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

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

  // Trigger Pexels loader when posts change
  useEffect(() => {
    if (!loading && (window as any).PexelsLoader) {
      setTimeout(() => {
        (window as any).PexelsLoader?.loadAll();
      }, 100);
    }
  }, [loading, posts, selectedCategory]);

  const categories = ["All", ...Array.from(new Set(posts.map((p) => p.category).filter(Boolean)))];

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.tags && post.tags.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (post.meta_description && post.meta_description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="tp-blog-masonary-area mp-blog-area pb-120">
      <div className="container">
        {/* Filter and Search Bar */}
        <div className="row align-items-center mb-50">
          <div className="col-lg-8 mb-3 mb-lg-0">
            <div className="d-flex flex-wrap gap-2">
              {categories.map((cat, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`btn btn-sm rounded-pill px-3 py-2 fw-bold ${
                    selectedCategory === cat ? "btn-danger" : "btn-outline-secondary"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div className="col-lg-4">
            <div className="input-group">
              <input
                type="text"
                className="form-control rounded-pill px-3 py-2"
                placeholder="Search articles & strategies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  className="btn btn-outline-secondary rounded-pill ms-2"
                  type="button"
                  onClick={() => setSearchQuery("")}
                >
                  &times;
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Loading state */}
        {loading ? (
          <div className="py-80 text-center">
            <div className="spinner-border text-danger" role="status">
              <span className="visually-hidden">Loading blog posts from Cloudflare D1...</span>
            </div>
            <p className="mt-3 text-muted">Fetching latest articles from Cloudflare D1...</p>
          </div>
        ) : filteredPosts.length > 0 ? (
          /* Grid of BlogCard items */
          <div className="row">
            {filteredPosts.map((post, index) => (
              <div key={post.id || index} className="col-xxl-4 col-xl-4 col-lg-6 col-md-6">
                <BlogCard
                  post={post}
                  delay={`.${(index % 4) + 3}`}
                  fallbackImg={`/assets/img/blog/col-4/thumb${index > 0 ? `-${(index % 6) + 1}` : ""}.jpg`}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="p-5 text-center bg-light rounded-3">
            <h4 className="text-muted mb-2">No Articles Found</h4>
            <p className="text-secondary mb-0">
              No published articles match your filter criteria in Cloudflare D1.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TpBlogMasonaryArea;
