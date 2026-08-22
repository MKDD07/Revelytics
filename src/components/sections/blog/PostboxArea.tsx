import React, { useState } from "react";
import { Link } from "react-router-dom";
import TpButton from "../../common/TpButton";

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
}

export const PostboxArea: React.FC<PostboxAreaProps> = ({ post }) => {
  const [comments, setComments] = useState<BlogCommentItem[]>(post.comments || []);
  const [commentName, setCommentName] = useState("");
  const [commentEmail, setCommentEmail] = useState("");
  const [commentText, setCommentText] = useState("");
  const [submitting, setSubmitting] = useState(false);

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
          commenter_img_query: "professional person portrait avatar",
        }),
      });

      if (res.ok) {
        const newComment: BlogCommentItem = {
          id: Date.now(),
          post_id: post.id,
          commenter_name: commentName,
          comment_text: commentText,
          commented_at: new Date().toISOString(),
          commenter_img_query: "professional person portrait avatar",
        };
        setComments((prev) => [newComment, ...prev]);
        setCommentText("");
        setCommentName("");
        setCommentEmail("");
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
          <div className="col-xl-8">
            <div className="postbox-left-sidebar mb-40">
              <div className="postbox-wrapper">

                {/* Dynamic Content Blocks */}
                {Array.isArray(post.content) && post.content.length > 0 ? (
                  post.content.map((block, idx) => {
                    if (block.type === "heading") {
                      return (
                        <div key={idx} className="postbox-details-text mb-40">
                          <h4 className="postbox-title tp-ff-sequel-bold-head fs-32 mb-15">
                            {block.text}
                          </h4>
                        </div>
                      );
                    }
                    if (block.type === "quote") {
                      return (
                        <div key={idx} className="postbox-details-quote-box mb-40">
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
                                <p className="mb-10">“{block.text}”</p>
                                {block.author && <span>{block.author}</span>}
                              </div>
                            </div>
                          </blockquote>
                        </div>
                      );
                    }
                    if (block.type === "list" && Array.isArray(block.items)) {
                      return (
                        <div key={idx} className="postbox-details-text mb-45">
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
                          <pre>{block.code}</pre>
                        </div>
                      );
                    }
                    return (
                      <div key={idx} className="postbox-details-text mb-45">
                        <p>{block.text}</p>
                      </div>
                    );
                  })
                ) : (
                  <div className="postbox-details-text mb-45">
                    <p>{post.meta_description}</p>
                  </div>
                )}

                {/* Thumb gallery */}
                {(post.thumb1_query || post.thumb2_query) && (
                  <div className="postbox-details-thumb-wrap mb-10">
                    <div className="row">
                      {post.thumb1_query && (
                        <div className="col-lg-6">
                          <div className="postbox-details-thumb mb-20">
                            <img
                              data-pexels={post.thumb1_query}
                              data-type="image"
                              data-quality="large"
                              style={{
                                borderRadius: "24px",
                              }}
                              className="w-100"
                              src="/assets/img/blog/details/thumb.jpg"
                              alt={post.thumb1_alt || ""}
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
                              className="w-100"
                                                            style={{
                                borderRadius: "24px",
                              }}
                              src="/assets/img/blog/details/thumb-2.jpg"
                              alt={post.thumb2_alt || ""}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Tag & Social Bar */}
                <div className="postbox-details-tag-wrap d-flex justify-content-between align-items-center">
                  <div className="tp-blog-sidebar-tagcloud d-flex flex-wrap align-items-center mb-10">
                    <span className="mr-10 mb-5 d-inline-block">Tagged with :</span>
                    <div className="tagcloud">
                      {tagsList.map((tag, tIdx) => (
                        <Link key={tIdx} to={`/blog?tag=${encodeURIComponent(tag)}`}>
                          {tag}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="postbox-details-social mb-10">
                    <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noreferrer">
                      <span>
                        <svg width={18} height={17} viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M5.67227 0H0L6.72535 8.79151L0.430223 16.1665H3.33876L8.09997 10.5886L12.3277 16.1153H18L11.0793 7.06826L11.0915 7.08386L17.0504 0.102701H14.1418L9.71667 5.28701L5.67227 0ZM3.131 1.53968H4.89685L14.869 14.5755H13.1032L3.131 1.53968Z" fill="currentcolor" />
                        </svg>
                      </span>
                    </a>
                    <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noreferrer">
                      <span>
                        <svg width={19} height={19} viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2.73047 0.149414C3.39876 0.149414 4.03742 0.409082 4.5166 0.926758C4.98986 1.40809 5.27986 2.05471 5.25 2.74023C5.25 3.45295 4.96325 4.1009 4.4873 4.58496C4.01091 5.06939 3.40304 5.33099 2.76074 5.33105H2.7002V5.33008C2.05404 5.36027 1.38762 5.0664 0.914062 4.58496C0.43812 4.1009 0.150391 3.45295 0.150391 2.74023C0.150439 2.06041 0.406515 1.41269 0.914062 0.896484C1.39344 0.408975 2.0322 0.149417 2.73047 0.149414ZM2.73047 1.05957C2.2578 1.05957 1.84759 1.22933 1.54785 1.53418C1.2159 1.87183 1.05084 2.29113 1.05078 2.74023C1.05078 3.13677 1.17903 3.52776 1.42871 3.82227L1.54297 3.94238L1.54785 3.94727C1.84752 4.25193 2.28766 4.42082 2.7002 4.4209H2.70996C3.13817 4.44811 3.54773 4.25827 3.85352 3.94727L3.8584 3.94238C4.18316 3.63943 4.35059 3.19332 4.35059 2.74023C4.35053 2.29122 4.18535 1.8718 3.85352 1.53418C3.55193 1.22745 3.14046 1.05957 2.73047 1.05957Z" fill="currentColor" stroke="currentColor" strokeWidth="0.3" />
                          <path d="M3.90137 5.64062C4.46636 5.64074 4.95106 6.13761 4.95117 6.70605V17.415C4.9509 17.9561 4.46304 18.4491 3.90137 18.4492H1.50098C0.936026 18.4489 0.451172 17.9522 0.451172 17.3838V6.70605C0.451274 6.11043 0.903317 5.64062 1.47168 5.64062H3.90137ZM1.47168 6.55078C1.44981 6.55078 1.42129 6.5624 1.39453 6.59375C1.36751 6.62546 1.35162 6.66768 1.35156 6.70605V17.3838C1.35156 17.4121 1.36713 17.4524 1.40234 17.4883C1.43757 17.5241 1.47567 17.5389 1.50098 17.5391H3.90137C3.93695 17.539 3.97683 17.5234 4.00781 17.4961C4.03816 17.4693 4.05063 17.4401 4.05078 17.415V6.70605C4.05071 6.6777 4.03521 6.63738 4 6.60156C3.96472 6.5658 3.92661 6.55086 3.90137 6.55078H1.47168Z" fill="currentColor" stroke="currentColor" strokeWidth="0.3" />
                          <path d="M14.1025 5.33594C16.5595 5.33597 18.4521 7.29949 18.4521 9.81836V17.6895C18.4521 17.8898 18.355 18.0782 18.2217 18.2139C18.0884 18.3494 17.9018 18.4502 17.7021 18.4502H14.7021C14.5026 18.4501 14.3158 18.3494 14.1826 18.2139C14.0494 18.0782 13.9521 17.8897 13.9521 17.6895V11.1299C13.9521 10.5978 13.8352 10.2229 13.5811 9.99023L13.5752 9.98438C13.2746 9.67884 12.864 9.51078 12.4229 9.51074C11.5883 9.51074 10.9229 10.2242 10.9229 11.1611V17.751C10.9227 17.972 10.8127 18.1487 10.6689 18.2666C10.5272 18.3828 10.3442 18.4492 10.1729 18.4492H6.87305C6.70179 18.4491 6.51859 18.3828 6.37695 18.2666C6.2333 18.1487 6.12319 17.9718 6.12305 17.751V6.37109C6.12305 6.15159 6.23189 5.96781 6.37305 5.84277C6.51244 5.71944 6.69647 5.6417 6.87305 5.6416H9.87305C10.0727 5.64162 10.2593 5.74141 10.3926 5.87695C10.5259 6.01261 10.623 6.20106 10.623 6.40137V6.45801C11.3643 5.7615 12.3939 5.33594 13.4727 5.33594H14.1025ZM13.5029 6.24609C12.4406 6.24609 11.4364 6.77274 10.8652 7.58594L10.8584 7.59668L10.8496 7.60547L10.8203 7.63574L10.0098 8.45898L9.75293 8.7207V6.55176H7.05371V17.5391H10.0527V11.1611C10.0527 9.74273 11.1027 8.63318 12.4492 8.60059H12.4531C13.1223 8.6007 13.7607 8.86089 14.2393 9.34766C14.6655 9.78125 14.8525 10.3735 14.8525 11.1299L14.8818 17.5391H17.5518V9.81836C17.5517 7.82029 16.0531 6.24629 14.1328 6.24609H13.5029Z" fill="currentColor" stroke="currentColor" strokeWidth="0.3" />
                        </svg>
                      </span>
                    </a>
                  </div>
                </div>

                {/* Navigation Previous & Next */}
                {(post.prev_post || post.next_post) && (
                  <div className="postbox-details-navigation-wrap mb-35 mt-30 pt-40">
                    <div className="row">
                      <div className="col-xl-6 col-lg-6 col-md-6">
                        {post.prev_post && (
                          <div className="postbox-details-navigation mb-30">
                            <Link to={`/blog/${post.prev_post.slug}`}>
                              <i className="far fa-arrow-left"></i>
                              <div className="postbox-details-navigation-text">
                                <span>Previous Post</span>
                                <h4 className="postbox-details-navigation-title">
                                  {post.prev_post.title}
                                </h4>
                              </div>
                            </Link>
                          </div>
                        )}
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6">
                        {post.next_post && (
                          <div className="postbox-details-navigation mb-30 text-end">
                            <Link to={`/blog/${post.next_post.slug}`} className="justify-content-end">
                              <div className="postbox-details-navigation-text">
                                <span>Next Post</span>
                                <h4 className="postbox-details-navigation-title">
                                  {post.next_post.title}
                                </h4>
                              </div>
                              <i className="far fa-arrow-right"></i>
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Author Box */}
                <div className="postbox-details-author mt-30">
                  <div className="sidebar-widget-author d-flex align-items-start">
                    <div className="sidebar-widget-author-img">
                      <img src="/assets/img/blog/details/user.png" alt="" />
                    </div>
                    <div className="postbox-details-content">
                      <div className="sidebar-widget-author-content">
                        <span>About Author</span>
                        <h4 className="sidebar-widget-author-name">{post.author_name}</h4>
                        <p>
                          Senior Strategy Lead at {post.publisher_name || "Revelytics"}.
                          Specializing in hospitality revenue analytics and performance marketing.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Comments List */}
                <div className="row">
                  <div className="col-xxl-10">
                    <div className="postbox__comment pt-75 pb-50">
                      <h3 className="postbox__comment-title">
                        Comments ({comments.length < 10 ? `0${comments.length}` : comments.length})
                      </h3>
                      <ul>
                        {comments.map((c, idx) => (
                          <li key={c.id || idx}>
                            <div className="postbox__comment-box d-flex">
                              <div className="postbox__comment-info">
                                <div className="postbox__comment-avater mr-30">
                                  <img
                                    src={`/assets/img/blog/details/blog-details-sm-${(idx % 2) + 1}.jpg`}
                                    alt=""
                                  />
                                </div>
                              </div>
                              <div className="postbox__comment-text">
                                <div className="postbox__comment-name d-flex justify-content-between align-items-center">
                                  <h5>By {c.commenter_name}</h5>
                                  <span className="post-meta">
                                    {c.commented_at ? new Date(c.commented_at).toLocaleDateString() : "Recent"}
                                  </span>
                                </div>
                                <p>{c.comment_text}</p>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Comment Form */}
                <div className="postbox-details-form">
                  <h3 className="postbox-details-form-title mb-10">Leave a Reply</h3>
                  <p>Your email address will not be published. Required fields are marked *</p>
                  <div className="postbox-details-form-wrapper">
                    <div className="postbox-details-form-inner">
                      <form onSubmit={handleCommentSubmit}>
                        <div className="row">
                          <div className="col-xl-6">
                            <div className="postbox-details-input-box">
                              <div className="postbox-details-input">
                                <label>Name *</label>
                                <input
                                  type="text"
                                  required
                                  value={commentName}
                                  onChange={(e) => setCommentName(e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-6">
                            <div className="postbox-details-input-box">
                              <div className="postbox-details-input">
                                <label>Email *</label>
                                <input
                                  type="email"
                                  value={commentEmail}
                                  onChange={(e) => setCommentEmail(e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-12">
                            <div className="postbox-details-input-box">
                              <div className="postbox-details-input">
                                <label>Comment *</label>
                                <textarea
                                  id="msg"
                                  required
                                  value={commentText}
                                  onChange={(e) => setCommentText(e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="postbox-details-input-box mt-20">
                          <TpButton
                            type="submit"
                            disabled={submitting}
                            text={submitting ? "Posting..." : "Post Comment"}
                            className="d-inline-flex align-items-center"
                            wrapperClassName=""
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-xl-4">
            <div className="sidebar-blog-grid-wrap mb-40 ml-115">
              <div className="sidebar-wrapper">
                
                {/* Search */}
                <div className="sidebar-widget mb-10">
                  <div className="sidebar-search">
                    <form action="/blog" method="GET">
                      <div className="sidebar-search-input">
                        <input type="text" name="q" placeholder="Search..." />
                        <button type="submit">
                          <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.9999 19L14.6499 14.65M17 9C17 13.4183 13.4183 17 9 17C4.58172 17 1 13.4183 1 9C1 4.58172 4.58172 1 9 1C13.4183 1 17 4.58172 17 9Z" stroke="currentcolor" strokeOpacity="0.8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                {/* Author Card */}
                <div className="sidebar-widget mb-45">
                  <div className="sidebar-widget-author">
                    <div className="sidebar-widget-author-img d-flex align-items-center">
                      <img src="/assets/img/blog/blog-standard/av-1.png" alt="" />
                      <div className="sidebar-widget-author-content">
                        <h4 className="sidebar-widget-author-name mb-0">Kate Johnson</h4>
                        <span>Digital Artist</span>
                      </div>
                    </div>
                    <div className="sidebar-widget-author-content">
                      <p>
                        Crafting Digital Experiences <br /> with Purpose!
                      </p>
                    </div>
                  </div>
                </div>

                {/* Categories */}
                <div className="sidebar-widget mb-45">
                  <h3 className="sidebar-widget-title">Categories</h3>
                  <div className="sidebar-widget-category">
                    <ul>
                      {["Marketing Strategy", "Revenue Growth", "Web Design", "Hospitality Tech"].map((cat, cIdx) => (
                        <li key={cIdx}>
                          <Link to={`/blog?category=${encodeURIComponent(cat)}`} className="d-flex align-items-center justify-content-between">
                            {cat} <span>(0{cIdx + 1})</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Tags */}
                <div className="sidebar-widget">
                  <h3 className="sidebar-widget-title">Tags</h3>
                  <div className="sidebar-widget-content">
                    <div className="tagcloud">
                      {["Hospitality", "Design Trends", "Development", "Revenue", "Cloudflare"].map((t, idx) => (
                        <Link key={idx} to={`/blog?tag=${encodeURIComponent(t)}`}>
                          {t}
                        </Link>
                      ))}
                    </div>
                  </div>
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
