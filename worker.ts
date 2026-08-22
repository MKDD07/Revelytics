export interface Env {
  DB: D1Database;
  ASSETS: Fetcher;
  PEXELS_API_KEY?: string;
  SERPAPI_API_KEY?: string;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, HEAD, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      // ─── API ROUTES ────────────────────────────────────────────────────────

      // 1. GET /api/services
      if (path === "/api/services" || path === "/services") {
        const services = await env.DB.prepare(
          "SELECT * FROM services WHERE is_active = 1 ORDER BY display_order ASC, id ASC"
        ).all();

        return new Response(JSON.stringify(services.results || []), {
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        });
      }

      // 2. GET /api/services/:slug
      if (path.startsWith("/api/services/")) {
        const slug = path.replace("/api/services/", "").trim();

        if (!slug) {
          return new Response(JSON.stringify({ error: "Slug required" }), {
            status: 400,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          });
        }

        const service: any = await env.DB.prepare(
          "SELECT * FROM services WHERE slug = ? AND is_active = 1"
        )
          .bind(slug)
          .first();

        if (!service) {
          return new Response(JSON.stringify({ error: "Service not found" }), {
            status: 404,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          });
        }

        const sections = await env.DB.prepare(
          "SELECT * FROM service_sections WHERE service_id = ? AND is_active = 1 ORDER BY display_order ASC"
        )
          .bind(service.id)
          .all();

        return new Response(
          JSON.stringify({
            ...service,
            sections: sections.results || [],
          }),
          {
            headers: { "Content-Type": "application/json", ...corsHeaders },
          }
        );
      }

      // 3. GET /api/pexels
      if (path === "/api/pexels") {
        const query = url.searchParams.get("query") || "travel destination";
        const type = url.searchParams.get("type") || "image";
        const perPage = url.searchParams.get("per_page") || "10";
        const orientation = url.searchParams.get("orientation");
        const apiKey = env.PEXELS_API_KEY || "y6WP5reQNH7abdL2uzdLTyV8pq0kMmF3CHf7ZNkiHo98DXIvORUOBSfi";

        const target =
          type === "video"
            ? "https://api.pexels.com/videos/search"
            : "https://api.pexels.com/v1/search";

        const pexelsUrl = new URL(target);
        pexelsUrl.searchParams.set("query", query);
        pexelsUrl.searchParams.set("per_page", perPage);
        if (orientation) pexelsUrl.searchParams.set("orientation", orientation);

        const res = await fetch(pexelsUrl.toString(), {
          headers: { Authorization: apiKey },
        });

        const data = await res.json();
        return new Response(JSON.stringify(data), {
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "public, max-age=3600",
            ...corsHeaders,
          },
        });
      }

      // 4. GET /api/serpapi
      if (path === "/api/serpapi" || path === "/api/serapi") {
        const query = url.searchParams.get("q") || url.searchParams.get("query") || "";
        const engine = url.searchParams.get("engine") || "google";
        const location = url.searchParams.get("location") || "India";

        if (!query) {
          return new Response(JSON.stringify({ error: "Query 'q' is required" }), {
            status: 400,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          });
        }

        const apiKey = env.SERPAPI_API_KEY || "";
        const serpUrl = new URL("https://serpapi.com/search.json");
        serpUrl.searchParams.set("q", query);
        serpUrl.searchParams.set("engine", engine);
        serpUrl.searchParams.set("location", location);
        if (apiKey) serpUrl.searchParams.set("api_key", apiKey);

        const res = await fetch(serpUrl.toString());
        const data = await res.json();
        return new Response(JSON.stringify(data), {
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "public, max-age=3600",
            ...corsHeaders,
          },
        });
      }

      // 5. GET /api/blog (or /api/blog-posts)
      if (path === "/api/blog" || path === "/api/blog-posts") {
        const category = url.searchParams.get("category");
        const tag = url.searchParams.get("tag");
        const search = url.searchParams.get("q") || url.searchParams.get("search");

        let query = "SELECT * FROM blog_posts WHERE noindex = 0";
        const params: any[] = [];

        if (category) {
          query += " AND category = ?";
          params.push(category);
        }

        if (tag) {
          query += " AND tags LIKE ?";
          params.push(`%${tag}%`);
        }

        if (search) {
          query += " AND (title LIKE ? OR meta_description LIKE ? OR category LIKE ?)";
          params.push(`%${search}%`, `%${search}%`, `%${search}%`);
        }

        query += " ORDER BY published_at DESC, id DESC";

        const stmt = env.DB.prepare(query);
        const posts = params.length > 0 ? await stmt.bind(...params).all() : await stmt.all();

        return new Response(JSON.stringify(posts.results || []), {
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        });
      }

      // 6. GET /api/blog/:slug or POST /api/blog/:slug/comments
      if (path.startsWith("/api/blog/")) {
        const subPath = path.replace("/api/blog/", "").trim();

        // Handle comment creation: POST /api/blog/:slug/comments
        if (subPath.endsWith("/comments") && request.method === "POST") {
          const postSlug = subPath.replace("/comments", "").trim();
          const post: any = await env.DB.prepare("SELECT id FROM blog_posts WHERE slug = ?")
            .bind(postSlug)
            .first();

          if (!post) {
            return new Response(JSON.stringify({ error: "Post not found" }), {
              status: 404,
              headers: { "Content-Type": "application/json", ...corsHeaders },
            });
          }

          const body: any = await request.json().catch(() => ({}));
          const commenterName = body.commenter_name || body.name || "Guest";
          const commentText = body.comment_text || body.comment || "";
          const commenterImg = body.commenter_img_query || "professional person portrait avatar";

          if (!commentText) {
            return new Response(JSON.stringify({ error: "Comment text is required" }), {
              status: 400,
              headers: { "Content-Type": "application/json", ...corsHeaders },
            });
          }

          const insertRes = await env.DB.prepare(
            "INSERT INTO blog_comments (post_id, commenter_name, commenter_img_query, comment_text) VALUES (?, ?, ?, ?)"
          )
            .bind(post.id, commenterName, commenterImg, commentText)
            .run();

          return new Response(JSON.stringify({ success: true, id: insertRes.meta?.last_row_id }), {
            status: 201,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          });
        }

        // GET single post details
        const slug = subPath;
        const post: any = await env.DB.prepare(
          "SELECT * FROM blog_posts WHERE slug = ?"
        )
          .bind(slug)
          .first();

        if (!post) {
          return new Response(JSON.stringify({ error: "Post not found" }), {
            status: 404,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          });
        }

        // Fetch comments for this post
        const comments = await env.DB.prepare(
          "SELECT * FROM blog_comments WHERE post_id = ? ORDER BY commented_at DESC, id DESC"
        )
          .bind(post.id)
          .all();

        // Fetch prev and next posts if slugs exist
        let prevPost = null;
        let nextPost = null;

        if (post.prev_post_slug) {
          prevPost = await env.DB.prepare(
            "SELECT slug, title, og_image_query FROM blog_posts WHERE slug = ?"
          )
            .bind(post.prev_post_slug)
            .first();
        }

        if (post.next_post_slug) {
          nextPost = await env.DB.prepare(
            "SELECT slug, title, og_image_query FROM blog_posts WHERE slug = ?"
          )
            .bind(post.next_post_slug)
            .first();
        }

        // Parse content_json if string
        let parsedContent = [];
        try {
          parsedContent = typeof post.content_json === "string" ? JSON.parse(post.content_json) : post.content_json;
        } catch {
          parsedContent = [{ type: "paragraph", text: post.content_json }];
        }

        return new Response(
          JSON.stringify({
            ...post,
            content: parsedContent,
            comments: comments.results || [],
            prev_post: prevPost,
            next_post: nextPost,
          }),
          {
            headers: { "Content-Type": "application/json", ...corsHeaders },
          }
        );
      }

      // ─── STATIC SITE (React App) ────────────────────────────────────────────
      // For all non-API routes, serve the React app from the dist/ folder.
      // For SPA routing: unknown paths → return index.html so React Router handles it.
      const assetResponse = await env.ASSETS.fetch(request);

      // If ASSETS returns 404 (e.g. /services/some-slug), serve index.html instead
      // so React Router can handle client-side routing.
      if (assetResponse.status === 404) {
        const indexRequest = new Request(new URL("/index.html", url.origin).toString(), request);
        return env.ASSETS.fetch(indexRequest);
      }

      return assetResponse;

    } catch (err: any) {
      return new Response(JSON.stringify({ error: err.message || "Internal error" }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
  },
};
