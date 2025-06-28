import { Hono } from "hono";
const app = new Hono<{ Bindings: Env }>();
console.log("init hono");

app.get("/admin", (c) => {
  return c.text("Hono!!");
});

// Only serve specific R2 files, not catch-all
app.get("/menu.pdf", async (c) => {
  try {
    const object = await c.env.jollybite.get("menu.pdf");

    if (!object) {
      return c.notFound();
    }

    // Set appropriate headers
    const headers = new Headers();
    headers.set("Content-Type", "application/pdf");
    headers.set("Content-Disposition", 'inline; filename="menu.pdf"');

    // Additional headers to encourage inline viewing
    headers.set("X-Content-Type-Options", "nosniff");
    headers.set("Accept-Ranges", "bytes");

    if (object.httpMetadata?.cacheControl) {
      headers.set("Cache-Control", object.httpMetadata.cacheControl);
    }

    return new Response(object.body, { headers });
  } catch (error) {
    console.error("Error fetching from R2:", error);
    return c.notFound();
  }
});

export default app;
