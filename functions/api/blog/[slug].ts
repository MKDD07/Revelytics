export interface Env {
  DB: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    const slug = context.params.slug as string;

    if (!slug) {
      return new Response(JSON.stringify({ error: "Slug required" }), {
        status: 400,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    }

    const post: any = await context.env.DB.prepare(
      "SELECT * FROM blog_posts WHERE slug = ?"
    )
      .bind(slug)
      .first();

    if (!post) {
      return new Response(JSON.stringify({ error: "Post not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    }

    const comments = await context.env.DB.prepare(
      "SELECT * FROM blog_comments WHERE post_id = ? ORDER BY commented_at DESC, id DESC"
    )
      .bind(post.id)
      .all();

    let prevPost = null;
    let nextPost = null;

    if (post.prev_post_slug) {
      prevPost = await context.env.DB.prepare(
        "SELECT slug, title, og_image_query FROM blog_posts WHERE slug = ?"
      )
        .bind(post.prev_post_slug)
        .first();
    }

    if (post.next_post_slug) {
      nextPost = await context.env.DB.prepare(
        "SELECT slug, title, og_image_query FROM blog_posts WHERE slug = ?"
      )
        .bind(post.next_post_slug)
        .first();
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
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || "Unknown error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const slug = context.params.slug as string;
    const post: any = await context.env.DB.prepare("SELECT id FROM blog_posts WHERE slug = ?")
      .bind(slug)
      .first();

    if (!post) {
      return new Response(JSON.stringify({ error: "Post not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    }

    const body: any = await context.request.json().catch(() => ({}));
    const commenterName = body.commenter_name || body.name || "Guest";
    const commentText = body.comment_text || body.comment || "";
    const commenterImg = body.commenter_img_query || "professional person portrait avatar";

    if (!commentText) {
      return new Response(JSON.stringify({ error: "Comment text is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    }

    const insertRes = await context.env.DB.prepare(
      "INSERT INTO blog_comments (post_id, commenter_name, commenter_img_query, comment_text) VALUES (?, ?, ?, ?)"
    )
      .bind(post.id, commenterName, commenterImg, commentText)
      .run();

    return new Response(JSON.stringify({ success: true, id: insertRes.meta?.last_row_id }), {
      status: 201,
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
