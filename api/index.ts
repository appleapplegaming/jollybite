import { Hono } from "hono";
const app = new Hono<{ Bindings: Env }>();
console.log("init hono");

app.get("/admin", (c) => {
  return c.text("Hono!!");
});

export default app;
