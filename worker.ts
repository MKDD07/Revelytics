export interface Env {
  DB: D1Database;
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
      // 1. GET /api/services or /services
      if (path === "/api/services" || path === "/services" && request.headers.get("Accept")?.includes("application/json")) {
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

      return new Response(JSON.stringify({ error: "Endpoint not found", path }), {
        status: 404,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    } catch (err: any) {
      return new Response(JSON.stringify({ error: err.message || "Internal error" }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
  },
};
