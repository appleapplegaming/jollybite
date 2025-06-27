import { Hono } from "hono";
const app = new Hono<{ Bindings: Env }>();
console.log("init hono");
app.get("/admin", (c) => {
  // c.env.jollybite_bucket.get;
  return c.text("Hono!!");
});

export default app;
