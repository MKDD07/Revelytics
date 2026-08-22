export interface Env {
  DB: D1Database;
  ASSETS: Fetcher;
  PEXELS_API_KEY?: string;
  SERPAPI_API_KEY?: string;
  GROQ_API_KEY?: string;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, HEAD, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    // Handle CORS preflight
    if (method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      // ─── GROQ AI PROXY ───────────────────────────────────────────────────────
      if (path === "/api/groq" && method === "POST") {
        const body: any = await request.json().catch(() => ({}));
        const apiKey = body.apiKey || env.GROQ_API_KEY || "";
        const model = body.model || "llama-3.3-70b-versatile";
        const messages = body.messages || [];
        const temperature = body.temperature ?? 0.7;
        const response_format = body.jsonMode ? { type: "json_object" } : undefined;

        if (!apiKey) {
          return new Response(
            JSON.stringify({ error: "Groq API Key is required. Please provide it in the Dashboard." }),
            { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
          );
        }

        const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model,
            messages,
            temperature,
            ...(response_format ? { response_format } : {}),
          }),
        });

        const groqData = await groqRes.json();
        return new Response(JSON.stringify(groqData), {
          status: groqRes.status,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }

      // ─── D1 QUERY / CONSOLE ROUTE ────────────────────────────────────────────
      if (path === "/api/admin/query" && method === "POST") {
        const body: any = await request.json().catch(() => ({}));
        const sql = body.sql?.trim();
        const params = body.params || [];

        if (!sql) {
          return new Response(JSON.stringify({ error: "SQL query is required" }), {
            status: 400,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          });
        }

        const stmt = env.DB.prepare(sql);
        const result = params.length > 0 ? await stmt.bind(...params).all() : await stmt.all();

        return new Response(JSON.stringify(result), {
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }

      // ─── SERVICES CRUD ───────────────────────────────────────────────────────
      // 1. GET all services / POST new service
      if (path === "/api/services" || path === "/services") {
        if (method === "GET") {
          const services = await env.DB.prepare(
            "SELECT * FROM services ORDER BY display_order ASC, id ASC"
          ).all();

          return new Response(JSON.stringify(services.results || []), {
            headers: { "Content-Type": "application/json", ...corsHeaders },
          });
        }

        if (method === "POST") {
          const body: any = await request.json().catch(() => ({}));
          const slug = (body.slug || body.title || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
          const title = body.title;

          if (!slug || !title) {
            return new Response(JSON.stringify({ error: "Title and slug are required" }), {
              status: 400,
              headers: { "Content-Type": "application/json", ...corsHeaders },
            });
          }

          const insertResult = await env.DB.prepare(`
            INSERT INTO services (
              slug, parent_slug, title, short_desc, hero_pexels_query, og_pexels_query,
              cta_text, cta_url, display_order, is_active, meta_title, meta_description, focus_keyword
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `).bind(
            slug,
            body.parent_slug || null,
            title,
            body.short_desc || body.short_description || "",
            body.hero_pexels_query || "travel destination",
            body.og_pexels_query || "travel destination",
            body.cta_text || "Contact Us",
            body.cta_url || "/contact-us",
            body.display_order ?? 0,
            body.is_active ?? 1,
            body.meta_title || `${title} | Revelytics`,
            body.meta_description || body.short_desc || "",
            body.focus_keyword || title.toLowerCase()
          ).run();

          const serviceId = insertResult.meta?.last_row_id;

          // Insert sections if provided
          if (serviceId && Array.isArray(body.sections)) {
            for (let i = 0; i < body.sections.length; i++) {
              const sec = body.sections[i];
              await env.DB.prepare(`
                INSERT INTO service_sections (service_id, heading, body, pexels_query, image_alt, display_order, is_active)
                VALUES (?, ?, ?, ?, ?, ?, 1)
              `).bind(
                serviceId,
                sec.heading || `Feature ${i + 1}`,
                sec.body || "",
                sec.pexels_query || "hotel resort luxury",
                sec.image_alt || sec.heading || "Service Feature",
                i + 1
              ).run();
            }
          }

          return new Response(JSON.stringify({ success: true, id: serviceId, slug }), {
            status: 201,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          });
        }
      }

      // 2. PUT / DELETE / GET by Service ID or Slug
      if (path.startsWith("/api/services/")) {
        const identifier = path.replace("/api/services/", "").trim();

        if (method === "DELETE") {
          const isNumeric = /^\d+$/.test(identifier);
          if (isNumeric) {
            await env.DB.prepare("DELETE FROM service_sections WHERE service_id = ?").bind(parseInt(identifier)).run();
            await env.DB.prepare("DELETE FROM services WHERE id = ?").bind(parseInt(identifier)).run();
          } else {
            const s: any = await env.DB.prepare("SELECT id FROM services WHERE slug = ?").bind(identifier).first();
            if (s) {
              await env.DB.prepare("DELETE FROM service_sections WHERE service_id = ?").bind(s.id).run();
              await env.DB.prepare("DELETE FROM services WHERE id = ?").bind(s.id).run();
            }
          }
          return new Response(JSON.stringify({ success: true }), {
            headers: { "Content-Type": "application/json", ...corsHeaders },
          });
        }

        if (method === "PUT") {
          const body: any = await request.json().catch(() => ({}));
          const isNumeric = /^\d+$/.test(identifier);
          const serviceId = isNumeric ? parseInt(identifier) : (await env.DB.prepare("SELECT id FROM services WHERE slug = ?").bind(identifier).first() as any)?.id;

          if (!serviceId) {
            return new Response(JSON.stringify({ error: "Service not found" }), {
              status: 404,
              headers: { "Content-Type": "application/json", ...corsHeaders },
            });
          }

          await env.DB.prepare(`
            UPDATE services SET
              title = COALESCE(?, title),
              short_desc = COALESCE(?, short_desc),
              parent_slug = ?,
              hero_pexels_query = COALESCE(?, hero_pexels_query),
              og_pexels_query = COALESCE(?, og_pexels_query),
              cta_text = COALESCE(?, cta_text),
              cta_url = COALESCE(?, cta_url),
              meta_title = COALESCE(?, meta_title),
              meta_description = COALESCE(?, meta_description),
              is_active = COALESCE(?, is_active),
              updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
          `).bind(
            body.title,
            body.short_desc || body.short_description,
            body.parent_slug || null,
            body.hero_pexels_query,
            body.og_pexels_query,
            body.cta_text,
            body.cta_url,
            body.meta_title,
            body.meta_description,
            body.is_active,
            serviceId
          ).run();

          // If sections are provided, replace them
          if (Array.isArray(body.sections)) {
            await env.DB.prepare("DELETE FROM service_sections WHERE service_id = ?").bind(serviceId).run();
            for (let i = 0; i < body.sections.length; i++) {
              const sec = body.sections[i];
              await env.DB.prepare(`
                INSERT INTO service_sections (service_id, heading, body, pexels_query, image_alt, display_order, is_active)
                VALUES (?, ?, ?, ?, ?, ?, 1)
              `).bind(
                serviceId,
                sec.heading || `Feature ${i + 1}`,
                sec.body || "",
                sec.pexels_query || "hotel resort luxury",
                sec.image_alt || sec.heading || "Service Feature",
                i + 1
              ).run();
            }
          }

          return new Response(JSON.stringify({ success: true, id: serviceId }), {
            headers: { "Content-Type": "application/json", ...corsHeaders },
          });
        }

        // GET Service Detail by slug or ID
        const slug = identifier;
        const isNumeric = /^\d+$/.test(slug);
        const service: any = isNumeric
          ? await env.DB.prepare("SELECT * FROM services WHERE id = ?").bind(parseInt(slug)).first()
          : await env.DB.prepare("SELECT * FROM services WHERE slug = ?").bind(slug).first();

        if (!service) {
          return new Response(JSON.stringify({ error: "Service not found" }), {
            status: 404,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          });
        }

        const sections = await env.DB.prepare(
          "SELECT * FROM service_sections WHERE service_id = ? ORDER BY display_order ASC"
        ).bind(service.id).all();

        return new Response(
          JSON.stringify({ ...service, sections: sections.results || [] }),
          { headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }

      // ─── BLOG POSTS CRUD ─────────────────────────────────────────────────────
      // 1. GET all blog posts / POST new blog post
      if (path === "/api/blog" || path === "/api/blog-posts") {
        if (method === "GET") {
          const category = url.searchParams.get("category");
          const tag = url.searchParams.get("tag");
          const search = url.searchParams.get("q") || url.searchParams.get("search");

          let query = "SELECT * FROM blog_posts WHERE 1=1";
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
            headers: { "Content-Type": "application/json", ...corsHeaders },
          });
        }

        if (method === "POST") {
          const body: any = await request.json().catch(() => ({}));
          const title = body.title;
          const slug = (body.slug || title || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
          const contentJson = typeof body.content_json === "string" ? body.content_json : JSON.stringify(body.content_json || body.content || []);

          if (!slug || !title) {
            return new Response(JSON.stringify({ error: "Title and slug are required" }), {
              status: 400,
              headers: { "Content-Type": "application/json", ...corsHeaders },
            });
          }

          const insertRes = await env.DB.prepare(`
            INSERT INTO blog_posts (
              slug, title, content_json, meta_title, meta_description, focus_keyword, canonical_url,
              og_title, og_description, og_image_query, og_image_alt,
              author_name, author_url, publisher_name, category, tags,
              thumb1_query, thumb1_alt, thumb2_query, thumb2_alt,
              reading_time_minutes, word_count
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `).bind(
            slug,
            title,
            contentJson,
            body.meta_title || `${title} | Revelytics Blog`,
            body.meta_description || "",
            body.focus_keyword || title.toLowerCase(),
            body.canonical_url || `https://www.revlytics.in/blog/${slug}`,
            body.og_title || title,
            body.og_description || body.meta_description || "",
            body.og_image_query || "luxury resort infinity pool sunset tropical",
            body.og_image_alt || title,
            body.author_name || "Revelytics Team",
            body.author_url || "https://www.revlytics.in/about",
            body.publisher_name || "Revelytics",
            body.category || "Marketing Strategy",
            body.tags || "Hospitality, Digital Marketing, Revenue Growth",
            body.thumb1_query || "hotel revenue analytics laptop screen luxury",
            body.thumb1_alt || "Hotel Analytics Dashboard",
            body.thumb2_query || "resort guest checking in mobile smartphone",
            body.thumb2_alt || "Seamless Guest Check-in",
            body.reading_time_minutes ?? 5,
            body.word_count ?? 1000
          ).run();

          return new Response(JSON.stringify({ success: true, id: insertRes.meta?.last_row_id, slug }), {
            status: 201,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          });
        }
      }

      // 2. PUT / DELETE / GET by Blog Slug or ID
      if (path.startsWith("/api/blog/")) {
        const subPath = path.replace("/api/blog/", "").trim();

        // Handle comment creation: POST /api/blog/:slug/comments
        if (subPath.endsWith("/comments") && method === "POST") {
          const postSlug = subPath.replace("/comments", "").trim();
          const post: any = await env.DB.prepare("SELECT id FROM blog_posts WHERE slug = ?").bind(postSlug).first();

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
          ).bind(post.id, commenterName, commenterImg, commentText).run();

          return new Response(JSON.stringify({ success: true, id: insertRes.meta?.last_row_id }), {
            status: 201,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          });
        }

        // DELETE blog post by ID or slug
        if (method === "DELETE") {
          const isNumeric = /^\d+$/.test(subPath);
          if (isNumeric) {
            await env.DB.prepare("DELETE FROM blog_comments WHERE post_id = ?").bind(parseInt(subPath)).run();
            await env.DB.prepare("DELETE FROM blog_posts WHERE id = ?").bind(parseInt(subPath)).run();
          } else {
            const p: any = await env.DB.prepare("SELECT id FROM blog_posts WHERE slug = ?").bind(subPath).first();
            if (p) {
              await env.DB.prepare("DELETE FROM blog_comments WHERE post_id = ?").bind(p.id).run();
              await env.DB.prepare("DELETE FROM blog_posts WHERE id = ?").bind(p.id).run();
            }
          }
          return new Response(JSON.stringify({ success: true }), {
            headers: { "Content-Type": "application/json", ...corsHeaders },
          });
        }

        // PUT update blog post by ID or slug
        if (method === "PUT") {
          const body: any = await request.json().catch(() => ({}));
          const isNumeric = /^\d+$/.test(subPath);
          const postId = isNumeric ? parseInt(subPath) : (await env.DB.prepare("SELECT id FROM blog_posts WHERE slug = ?").bind(subPath).first() as any)?.id;

          if (!postId) {
            return new Response(JSON.stringify({ error: "Post not found" }), {
              status: 404,
              headers: { "Content-Type": "application/json", ...corsHeaders },
            });
          }

          const contentJson = body.content_json ? (typeof body.content_json === "string" ? body.content_json : JSON.stringify(body.content_json)) : undefined;

          await env.DB.prepare(`
            UPDATE blog_posts SET
              title = COALESCE(?, title),
              content_json = COALESCE(?, content_json),
              meta_title = COALESCE(?, meta_title),
              meta_description = COALESCE(?, meta_description),
              focus_keyword = COALESCE(?, focus_keyword),
              category = COALESCE(?, category),
              tags = COALESCE(?, tags),
              author_name = COALESCE(?, author_name),
              og_image_query = COALESCE(?, og_image_query),
              thumb1_query = COALESCE(?, thumb1_query),
              thumb2_query = COALESCE(?, thumb2_query),
              reading_time_minutes = COALESCE(?, reading_time_minutes),
              updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
          `).bind(
            body.title,
            contentJson,
            body.meta_title,
            body.meta_description,
            body.focus_keyword,
            body.category,
            body.tags,
            body.author_name,
            body.og_image_query,
            body.thumb1_query,
            body.thumb2_query,
            body.reading_time_minutes,
            postId
          ).run();

          return new Response(JSON.stringify({ success: true, id: postId }), {
            headers: { "Content-Type": "application/json", ...corsHeaders },
          });
        }

        // GET single post details
        const slug = subPath;
        const isNumeric = /^\d+$/.test(slug);
        const post: any = isNumeric
          ? await env.DB.prepare("SELECT * FROM blog_posts WHERE id = ?").bind(parseInt(slug)).first()
          : await env.DB.prepare("SELECT * FROM blog_posts WHERE slug = ?").bind(slug).first();

        if (!post) {
          return new Response(JSON.stringify({ error: "Post not found" }), {
            status: 404,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          });
        }

        const comments = await env.DB.prepare(
          "SELECT * FROM blog_comments WHERE post_id = ? ORDER BY commented_at DESC, id DESC"
        ).bind(post.id).all();

        let prevPost = null;
        let nextPost = null;

        if (post.prev_post_slug) {
          prevPost = await env.DB.prepare(
            "SELECT slug, title, og_image_query FROM blog_posts WHERE slug = ?"
          ).bind(post.prev_post_slug).first();
        }

        if (post.next_post_slug) {
          nextPost = await env.DB.prepare(
            "SELECT slug, title, og_image_query FROM blog_posts WHERE slug = ?"
          ).bind(post.next_post_slug).first();
        }

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
          { headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }

      // ─── PEXELS & SERPAPI PROXIES ────────────────────────────────────────────
      if (path === "/api/pexels") {
        const query = url.searchParams.get("query") || "travel destination";
        const type = url.searchParams.get("type") || "image";
        const perPage = url.searchParams.get("per_page") || "10";
        const orientation = url.searchParams.get("orientation");
        const apiKey = env.PEXELS_API_KEY || "y6WP5reQNH7abdL2uzdLTyV8pq0kMmF3CHf7ZNkiHo98DXIvORUOBSfi";

        const target = type === "video" ? "https://api.pexels.com/videos/search" : "https://api.pexels.com/v1/search";
        const pexelsUrl = new URL(target);
        pexelsUrl.searchParams.set("query", query);
        pexelsUrl.searchParams.set("per_page", perPage);
        if (orientation) pexelsUrl.searchParams.set("orientation", orientation);

        const res = await fetch(pexelsUrl.toString(), {
          headers: { Authorization: apiKey },
        });

        const data = await res.json();
        return new Response(JSON.stringify(data), {
          headers: { "Content-Type": "application/json", "Cache-Control": "public, max-age=3600", ...corsHeaders },
        });
      }

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
          headers: { "Content-Type": "application/json", "Cache-Control": "public, max-age=3600", ...corsHeaders },
        });
      }

      // ─── STATIC SITE (React App) ────────────────────────────────────────────
      const assetResponse = await env.ASSETS.fetch(request);

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
