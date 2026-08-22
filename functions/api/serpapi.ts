export interface Env {
  SERPAPI_API_KEY?: string;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);
  const query = url.searchParams.get("q") || url.searchParams.get("query") || "";
  const engine = url.searchParams.get("engine") || "google";
  const location = url.searchParams.get("location") || "India";

  if (!query) {
    return new Response(JSON.stringify({ error: "Search query 'q' is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }

  const apiKey = context.env.SERPAPI_API_KEY || "";
  const serpUrl = new URL("https://serpapi.com/search.json");
  serpUrl.searchParams.set("q", query);
  serpUrl.searchParams.set("engine", engine);
  serpUrl.searchParams.set("location", location);
  if (apiKey) {
    serpUrl.searchParams.set("api_key", apiKey);
  }

  try {
    const res = await fetch(serpUrl.toString());
    if (!res.ok) {
      return new Response(JSON.stringify({ error: `SerpAPI error: ${res.statusText}` }), {
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
