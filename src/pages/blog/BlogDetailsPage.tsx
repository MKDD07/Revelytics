import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { PageWrapper } from "../../layouts/PageWrapper";
import {
  TpBlogGridArea,
  TpBannerThumb,
  PostboxArea,
  D1BlogPostDetail,
} from "../../components/sections/blog";

export const BlogDetailsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const activeSlug = slug || "innovative-strategies-and-concepts-inspired-by-market-research";

  const [post, setPost] = useState<D1BlogPostDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [notFound, setNotFound] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);

    fetch(`/api/blog/${activeSlug}`)
      .then((res) => {
        if (res.status === 404) {
          setNotFound(true);
          return null;
        }
        if (!res.ok) throw new Error("Failed to load blog post");
        return res.json();
      })
      .then((data) => {
        if (data && data.title) {
          setPost(data);
          setNotFound(false);
        } else {
          setNotFound(true);
        }
      })
      .catch(() => {
        setNotFound(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [activeSlug]);

  // Update Page Title and Meta description dynamically
  useEffect(() => {
    if (post) {
      document.title = post.meta_title || `${post.title} | Revelytics Blog`;
      if (post.meta_description) {
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
          metaDesc.setAttribute("content", post.meta_description);
        }
      }
    }
  }, [post]);

  // Trigger Pexels loader
  useEffect(() => {
    if (!loading && post && (window as any).PexelsLoader) {
      setTimeout(() => {
        (window as any).PexelsLoader?.loadAll();
      }, 100);
    }
  }, [loading, post]);

  if (notFound && !loading) {
    return (
      <PageWrapper>
        <div className="container py-120 text-center">
          <h2 className="tp-ff-sequel-medium fs-36 text-danger mb-3">Article Not Found</h2>
          <p className="text-secondary mb-4">
            The requested article <code>{activeSlug}</code> was not found in Cloudflare D1.
          </p>
          <Link
            to="/blog"
            className="tp-btn-white hover-danger text-uppercase px-4 py-2 text-decoration-none fw-bold"
          >
            &larr; Back to All Articles
          </Link>
        </div>
      </PageWrapper>
    );
  }

  const postTitle = post?.title || activeSlug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  const postAuthor = post?.author_name || "Revelytics Team";
  const postDate = post?.published_at || "2026";
  const postImageQuery = post?.og_image_query || "luxury resort pool sunset";
  const postImageAlt = post?.og_image_alt || postTitle;

  return (
    <PageWrapper>
      <TpBlogGridArea
        title={postTitle}
        authorName={postAuthor}
        publishedAt={postDate}
      />
      <TpBannerThumb
        imageQuery={postImageQuery}
        altText={postImageAlt}
      />
      {post && <PostboxArea post={post} />}
    </PageWrapper>
  );
};

export default BlogDetailsPage;
