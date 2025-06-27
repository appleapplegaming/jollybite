import { Hono } from "hono";
const app = new Hono<{ Bindings: Env }>();
console.log("init hono");

app.get("/admin", (c) => {
  // c.env.jollybite_bucket.get;
  return c.text("Hono!!");
});

app.get("/menu.pdf", async (c) => {
  const object = await c.env.jollybite_bucket.get("menu.pdf");
  if (!object) {
    return c.text("Menu PDF not found", 404);
  }

  return c.body(object.body!, 200, {
    "Content-Type": "application/pdf",
    "Content-Disposition": `attachment; filename="menu.pdf"`,
    "Cache-Control": "public, max-age=3600",
  });
  //   try {
  //     const object = await c.env.jollybite_bucket.get("menu.pdf");

  //     // test
  //     if (!object) {
  //       return c.text("Menu PDF not found", 404);
  //     }

  //     // Convert the stream to array buffer to ensure proper handling
  //     const arrayBuffer = await object.arrayBuffer();

  //     // Return the PDF with proper headers
  //     return new Response(arrayBuffer, {
  //       headers: {
  //         "Content-Type": "application/pdf",
  //         "Content-Disposition": "attachment; filename=menu.pdf",
  //         "Cache-Control": "public, max-age=3600", // Cache for 1 hour
  //         "Content-Length": arrayBuffer.byteLength.toString(),
  //       },
  //     });
  //   } catch (error) {
  //     console.error("Error fetching menu PDF:", error);
  //     return c.text("Error fetching menu PDF", 500);
  //   }
});

export default app;
