import { Hono } from "hono";
const app = new Hono<{ Bindings: Env }>();
console.log("init hono");

app.get("/admin", (c) => {
  // c.env.jollybite_bucket.get;
  return c.text("Hono!!");
});

// Add endpoint to serve menu PDF from R2 bucket
app.get("/menu.pdf", async (c) => {
  try {
    // Get the PDF from R2 bucket
    const object = await c.env.jollybite_bucket.get("menu.pdf");

    if (!object) {
      return c.text("Menu PDF not found", 404);
    }

    // Return the PDF with proper headers
    return new Response(object.body, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=menu.pdf",
        "Cache-Control": "public, max-age=3600", // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error("Error fetching menu PDF:", error);
    return c.text("Error fetching menu PDF", 500);
  }
});

export default app;
