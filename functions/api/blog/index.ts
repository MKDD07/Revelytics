export interface Env {
  DB: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    const url = new URL(context.request.url);
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

    const stmt = context.env.DB.prepare(query);
    const posts = params.length > 0 ? await stmt.bind(...params).all() : await stmt.all();

    return new Response(JSON.stringify(posts.results || []), {
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
