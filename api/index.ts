import { Hono } from "hono";
const app = new Hono<{ Bindings: Env }>();
console.log("init hono");

app.get("/admin", (c) => {
  return c.text("Hono!!");
});

app.all("/menu.pdf", async (c) => {
  try {
    console.log("Attempting to fetch menu.pdf from R2 bucket");
    const object = await c.env.jollybite.get("menu.pdf");

    if (!object) {
      console.log("Menu PDF not found in R2 bucket");
      return c.text("Menu PDF not found", 404);
    }

    console.log("PDF object found, converting to arrayBuffer");
    console.log("Object size:", object.size, "bytes");

    // Convert the stream to array buffer to ensure proper handling
    const arrayBuffer = await object.arrayBuffer();

    console.log("ArrayBuffer size:", arrayBuffer.byteLength, "bytes");

    // Return the PDF with proper headers
    return new Response(arrayBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=menu.pdf",
        "Cache-Control": "public, max-age=3600",
        "Content-Length": arrayBuffer.byteLength.toString(),
      },
    });
  } catch (error) {
    console.error("Error fetching menu PDF:", error);
    return c.text(
      `Error fetching menu PDF: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
      500
    );
  }
});

export default app;
