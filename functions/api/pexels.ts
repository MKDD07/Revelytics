export interface Env {
  PEXELS_API_KEY?: string;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);
  const query = url.searchParams.get("query") || "travel destination";
  const type = url.searchParams.get("type") || "image"; // 'image' or 'video'
  const perPage = url.searchParams.get("per_page") || "10";
  const orientation = url.searchParams.get("orientation");

  const apiKey = context.env.PEXELS_API_KEY || "y6WP5reQNH7abdL2uzdLTyV8pq0kMmF3CHf7ZNkiHo98DXIvORUOBSfi";

  const targetEndpoint =
    type === "video"
      ? "https://api.pexels.com/videos/search"
      : "https://api.pexels.com/v1/search";

  const pexelsUrl = new URL(targetEndpoint);
  pexelsUrl.searchParams.set("query", query);
  pexelsUrl.searchParams.set("per_page", perPage);
  if (orientation) {
    pexelsUrl.searchParams.set("orientation", orientation);
  }

  try {
    const res = await fetch(pexelsUrl.toString(), {
      headers: {
        Authorization: apiKey,
      },
    });

    if (!res.ok) {
      return new Response(JSON.stringify({ error: `Pexels API error: ${res.statusText}` }), {
        status: res.status,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    }

    const data = await res.json();
    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }
};
