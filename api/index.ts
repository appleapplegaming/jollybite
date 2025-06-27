import { Hono } from "hono";
const app = new Hono();
console.log("init hono");
app.get("/admin", (c) => c.text("Hono!"));

export default app;
