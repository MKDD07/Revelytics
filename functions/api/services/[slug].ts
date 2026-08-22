export interface Env {
  DB: D1Database;
  PEXELS_API_KEY?: string;
  SERPAPI_API_KEY?: string;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);
  const slug = url.pathname.split("/").pop();

  if (!slug) {
    return new Response(JSON.stringify({ error: "Slug required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const service: any = await context.env.DB.prepare(
      "SELECT * FROM services WHERE slug = ? AND is_active = 1"
    )
      .bind(slug)
      .first();

    if (!service) {
      return new Response(JSON.stringify({ error: "Service not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Fetch related active sections for this service
    const sections = await context.env.DB.prepare(
      "SELECT * FROM service_sections WHERE service_id = ? AND is_active = 1 ORDER BY display_order ASC"
    )
      .bind(service.id)
      .all();

    const responsePayload = {
      ...service,
      sections: sections.results || [],
    };

    return new Response(JSON.stringify(responsePayload), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
