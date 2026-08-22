import React, { useState } from "react";
import { Link } from "react-router-dom";

export interface BlogContentBlock {
  type: "heading" | "paragraph" | "quote" | "list" | "code" | "image";
  level?: number;
  text?: string;
  author?: string;
  items?: string[];
  code?: string;
  language?: string;
  query?: string;
  alt?: string;
}

export interface BlogCommentItem {
  id: number;
  post_id: number;
  parent_id?: number;
  commenter_name: string;
  commenter_img_query?: string;
  comment_text: string;
  commented_at?: string;
}

export interface PostNavInfo {
  slug: string;
  title: string;
  og_image_query?: string;
}

export interface D1BlogPostDetail {
  id: number;
  slug: string;
  title: string;
  content: BlogContentBlock[];
  meta_title?: string;
  meta_description?: string;
  focus_keyword?: string;
  canonical_url?: string;
  og_title?: string;
  og_description?: string;
  og_image_query?: string;
  og_image_alt?: string;
  author_name: string;
  author_url?: string;
  publisher_name?: string;
  category: string;
  tags: string;
  thumb1_query?: string;
  thumb1_alt?: string;
  thumb2_query?: string;
  thumb2_alt?: string;
  prev_post?: PostNavInfo | null;
  next_post?: PostNavInfo | null;
  reading_time_minutes?: number;
  word_count?: number;
  published_at?: string;
  comments?: BlogCommentItem[];
}

interface PostboxAreaProps {
  post: D1BlogPostDetail;
  recentPosts?: Array<{ slug: string; title: string; category: string; published_at?: string }>;
}

export const PostboxArea: React.FC<PostboxAreaProps> = ({ post, recentPosts = [] }) => {
  const [comments, setComments] = useState<BlogCommentItem[]>(post.comments || []);
  const [commentName, setCommentName] = useState("");
  const [commentEmail, setCommentEmail] = useState("");
  const [commentText, setCommentText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const tagsList = post.tags ? post.tags.split(",").map((t) => t.trim()).filter(Boolean) : [];

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !commentName.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch(`/api/blog/${post.slug}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          commenter_name: commentName,
          comment_text: commentText,
          commenter_img_query: "professional business person portrait avatar",
        }),
      });

      if (res.ok) {
        const newComment: BlogCommentItem = {
          id: Date.now(),
          post_id: post.id,
          commenter_name: commentName,
          comment_text: commentText,
          commented_at: new Date().toISOString(),
          commenter_img_query: "professional business person portrait avatar",
        };
        setComments((prev) => [newComment, ...prev]);
        setCommentText("");
        setCommentName("");
        setCommentEmail("");
        setSubmitSuccess(true);
        setTimeout(() => setSubmitSuccess(false), 5000);
      }
    } catch (err) {
      console.error("Comment submit error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="postbox-area tp-blog-details-ptb pt-110 pb-120">
      <div className="container">
        <div className="row">
          {/* Main Article Content */}
          <div className="col-xl-8">
            <div className="postbox-left-sidebar mb-40">
              <div className="postbox-wrapper">
                
                {/* Dynamic Content Blocks */}
                {Array.isArray(post.content) && post.content.length > 0 ? (
                  post.content.map((block, idx) => {
                    if (block.type === "heading") {
                      return (
                        <div key={idx} className="postbox-details-text mb-30 mt-40">
                          <h3 className="postbox-title tp-ff-sequel-bold-head fs-28 mb-15">
                            {block.text}
                          </h3>
                        </div>
                      );
                    }
                    if (block.type === "quote") {
                      return (
                        <div key={idx} className="postbox-details-quote-box mb-40 mt-30">
                          <blockquote>
                            <div className="postbox-details-quote-box-inner d-flex align-items-start">
                              <i>
                                <svg
                                  width={48}
                                  height={59}
                                  viewBox="0 0 48 59"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M25.2 58.8L29.6 0H47.6L38.6 58.8H25.2ZM0 58.8L4.4 0H22.4L13.4 58.8H0Z"
                                    fill="currentColor"
                                    fillOpacity="0.1"
                                  />
                                </svg>
                              </i>
                              <div className="postbox-details-quote">
                                <p className="mb-10 fs-18">“{block.text}”</p>
                                {block.author && <span className="fw-bold">{block.author}</span>}
                              </div>
                            </div>
                          </blockquote>
                        </div>
                      );
                    }
                    if (block.type === "list" && Array.isArray(block.items)) {
                      return (
                        <div key={idx} className="postbox-details-text mb-30">
                          <div className="postbox-details-list">
                            <ul>
                              {block.items.map((item, itemIdx) => (
                                <li key={itemIdx}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      );
                    }
                    if (block.type === "code") {
                      return (
                        <div key={idx} className="postbox-details-code mb-30">
                          <pre>
                            <code>{block.code}</code>
                          </pre>
                        </div>
                      );
                    }
                    return (
                      <div key={idx} className="postbox-details-text mb-20">
                        <p className="fs-17 lh-lg text-secondary">{block.text}</p>
                      </div>
                    );
                  })
                ) : (
                  <div className="postbox-details-text mb-45">
                    <p className="fs-17 lh-lg text-secondary">
                      {post.meta_description || "Detailed content for this article."}
                    </p>
                  </div>
                )}

                {/* Dynamic Dual Thumb Gallery */}
                {(post.thumb1_query || post.thumb2_query) && (
                  <div className="postbox-details-thumb-wrap mb-30 mt-40">
                    <div className="row">
                      {post.thumb1_query && (
                        <div className="col-lg-6">
                          <div className="postbox-details-thumb mb-20">
                            <img
                              data-pexels={post.thumb1_query}
                              data-type="image"
                              data-quality="large"
                              className="w-100 rounded shadow-sm"
                              style={{ height: "260px", objectFit: "cover" }}
                              src="/assets/img/blog/details/thumb.jpg"
                              alt={post.thumb1_alt || "Article visual 1"}
                            />
                          </div>
                        </div>
                      )}
                      {post.thumb2_query && (
                        <div className="col-lg-6">
                          <div className="postbox-details-thumb mb-20">
                            <img
                              data-pexels={post.thumb2_query}
                              data-type="image"
                              data-quality="large"
                              className="w-100 rounded shadow-sm"
                              style={{ height: "260px", objectFit: "cover" }}
                              src="/assets/img/blog/details/thumb-2.jpg"
                              alt={post.thumb2_alt || "Article visual 2"}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Tags & Social Share */}
                <div className="postbox-details-tag-wrap d-flex flex-wrap justify-content-between align-items-center border-top border-bottom py-3 my-4">
                  {tagsList.length > 0 && (
                    <div className="tp-blog-sidebar-tagcloud d-flex flex-wrap align-items-center mb-2 mb-md-0">
                      <span className="mr-10 fw-bold me-2">Tags:</span>
                      <div className="tagcloud d-flex flex-wrap gap-2">
                        {tagsList.map((tag, tIdx) => (
                          <Link
                            key={tIdx}
                            to={`/blog?tag=${encodeURIComponent(tag)}`}
                            className="badge bg-light text-dark border text-decoration-none p-2"
                          >
                            {tag}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="postbox-details-social d-flex gap-2">
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-sm btn-outline-dark rounded-circle"
                      title="Share on X / Twitter"
                    >
                      <i className="fa-brands fa-x-twitter"></i>
                    </a>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-sm btn-outline-dark rounded-circle"
                      title="Share on LinkedIn"
                    >
                      <i className="fa-brands fa-linkedin-in"></i>
                    </a>
                  </div>
                </div>

                {/* Previous & Next Post Navigation */}
                {(post.prev_post || post.next_post) && (
                  <div className="postbox-details-navigation-wrap mb-40 mt-30 pt-20 border-bottom pb-40">
                    <div className="row">
                      <div className="col-md-6 mb-3 mb-md-0">
                        {post.prev_post && (
                          <div className="postbox-details-navigation">
                            <Link to={`/blog/${post.prev_post.slug}`} className="text-decoration-none text-dark d-flex align-items-center gap-3">
                              <i className="fa-solid fa-arrow-left text-danger fs-20"></i>
                              <div>
                                <span className="small text-muted d-block text-uppercase">Previous Post</span>
                                <h5 className="fs-16 fw-bold mb-0 text-truncate" style={{ maxWidth: "260px" }}>
                                  {post.prev_post.title}
                                </h5>
                              </div>
                            </Link>
                          </div>
                        )}
                      </div>
                      <div className="col-md-6 text-md-end">
                        {post.next_post && (
                          <div className="postbox-details-navigation text-end">
                            <Link to={`/blog/${post.next_post.slug}`} className="text-decoration-none text-dark d-flex align-items-center justify-content-md-end gap-3">
                              <div>
                                <span className="small text-muted d-block text-uppercase">Next Post</span>
                                <h5 className="fs-16 fw-bold mb-0 text-truncate" style={{ maxWidth: "260px" }}>
                                  {post.next_post.title}
                                </h5>
                              </div>
                              <i className="fa-solid fa-arrow-right text-danger fs-20"></i>
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Author Bio Box */}
                <div className="postbox-details-author p-4 bg-light rounded-3 mb-50 border">
                  <div className="sidebar-widget-author d-flex align-items-center gap-4">
                    <div className="sidebar-widget-author-img">
                      <img
                        data-pexels="professional business consultant avatar portrait"
                        data-type="image"
                        data-quality="small"
                        src="/assets/img/blog/details/user.png"
                        alt={post.author_name}
                        className="rounded-circle shadow-sm"
                        style={{ width: "80px", height: "80px", objectFit: "cover" }}
                      />
                    </div>
                    <div>
                      <span className="small text-danger fw-bold text-uppercase d-block">Written By</span>
                      <h4 className="fs-20 fw-bold mb-1">{post.author_name}</h4>
                      <p className="text-muted small mb-0">
                        Senior Revenue &amp; Digital Strategy Specialist at {post.publisher_name || "Revelytics"}.
                        Helping luxury resorts and hotels maximize ARR and direct booking margins across India.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Comments Section */}
                <div className="postbox__comment pt-20 pb-40">
                  <h3 className="postbox__comment-title fs-24 fw-bold mb-4">
                    Comments ({comments.length})
                  </h3>
                  {comments.length > 0 ? (
                    <ul className="list-unstyled">
                      {comments.map((c, idx) => (
                        <li key={c.id || idx} className="p-3 bg-light rounded-3 mb-3 border">
                          <div className="d-flex align-items-start gap-3">
                            <img
                              data-pexels={c.commenter_img_query || "business person avatar portrait"}
                              data-type="image"
                              data-quality="small"
                              src="/assets/img/blog/details/blog-details-sm-2.jpg"
                              alt={c.commenter_name}
                              className="rounded-circle shadow-sm"
                              style={{ width: "50px", height: "50px", objectFit: "cover" }}
                            />
                            <div className="w-100">
                              <div className="d-flex justify-content-between align-items-center mb-1">
                                <h5 className="fs-16 fw-bold mb-0">{c.commenter_name}</h5>
                                <span className="small text-muted">
                                  {c.commented_at ? new Date(c.commented_at).toLocaleDateString() : "Recent"}
                                </span>
                              </div>
                              <p className="mb-0 text-secondary">{c.comment_text}</p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted fst-italic">No comments yet. Be the first to share your thoughts!</p>
                  )}
                </div>

                {/* Leave a Comment Form */}
                <div className="postbox-details-form p-4 bg-light rounded-3 border">
                  <h3 className="fs-22 fw-bold mb-2">Leave a Reply</h3>
                  <p className="text-muted small mb-4">
                    Your email address will not be published. Real-time Cloudflare D1 storage.
                  </p>
                  {submitSuccess && (
                    <div className="alert alert-success py-2">
                      Thank you! Your comment has been posted successfully.
                    </div>
                  )}
                  <form onSubmit={handleCommentSubmit}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label small fw-bold">Your Name *</label>
                        <input
                          type="text"
                          required
                          className="form-control"
                          value={commentName}
                          onChange={(e) => setCommentName(e.target.value)}
                          placeholder="e.g. John Doe"
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-bold">Email Address</label>
                        <input
                          type="email"
                          className="form-control"
                          value={commentEmail}
                          onChange={(e) => setCommentEmail(e.target.value)}
                          placeholder="john@hotel.com"
                        />
                      </div>
                      <div className="col-12">
                        <label className="form-label small fw-bold">Comment *</label>
                        <textarea
                          required
                          rows={4}
                          className="form-control"
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                          placeholder="Share your perspective or questions..."
                        ></textarea>
                      </div>
                      <div className="col-12">
                        <button
                          type="submit"
                          disabled={submitting}
                          className="tp-btn-white hover-danger text-uppercase px-4 py-3 text-decoration-none fw-bold border-0"
                        >
                          {submitting ? "Posting..." : "Post Comment →"}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>

              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-xl-4">
            <div className="sidebar-blog-grid-wrap mb-40">
              <div className="sidebar-wrapper">
                
                {/* Search Widget */}
                <div className="sidebar-widget p-4 bg-light rounded-3 border mb-4">
                  <h4 className="fs-18 fw-bold mb-3">Search Insights</h4>
                  <form action="/blog" method="GET">
                    <div className="input-group">
                      <input
                        type="text"
                        name="q"
                        className="form-control"
                        placeholder="Search topics..."
                      />
                      <button className="btn btn-danger" type="submit">
                        <i className="fa-solid fa-magnifying-glass"></i>
                      </button>
                    </div>
                  </form>
                </div>

                {/* Category Card */}
                <div className="sidebar-widget p-4 bg-light rounded-3 border mb-4">
                  <h4 className="fs-18 fw-bold mb-3">Topic Categories</h4>
                  <ul className="list-unstyled mb-0">
                    {["Marketing Strategy", "Revenue Growth", "Web Design", "Hospitality Tech"].map(
                      (cat, cIdx) => (
                        <li key={cIdx} className="mb-2">
                          <Link
                            to={`/blog?category=${encodeURIComponent(cat)}`}
                            className="text-decoration-none text-dark d-flex justify-content-between align-items-center"
                          >
                            <span>&rarr; {cat}</span>
                            <span className="badge bg-secondary">Articles</span>
                          </Link>
                        </li>
                      )
                    )}
                  </ul>
                </div>

                {/* Back to Blog Listing CTA */}
                <div className="sidebar-widget p-4 bg-dark text-white rounded-3 mb-4 text-center">
                  <h4 className="text-white mb-2">Need Custom Hospitality Strategy?</h4>
                  <p className="text-white-50 small mb-3">
                    Let our team audit your OTA mix, website conversions, and revenue strategies.
                  </p>
                  <Link
                    to="/contact-us"
                    className="tp-btn-white hover-danger text-uppercase px-3 py-2 text-decoration-none fw-bold small d-inline-block"
                  >
                    Schedule Free Audit &rarr;
                  </Link>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PostboxArea;
