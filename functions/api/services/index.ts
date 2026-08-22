export interface Env {
  DB: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    const services = await context.env.DB.prepare(
      "SELECT * FROM services WHERE is_active = 1 ORDER BY display_order ASC, id ASC"
    ).all();

    return new Response(JSON.stringify(services.results || []), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || "Unknown error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
