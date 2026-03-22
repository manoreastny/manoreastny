import { Hono } from "hono";

const app = new Hono<{ Bindings: Env }>();

app.get("/api/", (c) => c.json({ name: "Manor East NY", status: "coming-soon" }));

app.post("/api/inquiry", async (c) => {
  const body = await c.req.json();
  // In production, you'd send an email or store in a DB
  console.log("Inquiry received:", body);
  return c.json({ success: true, message: "Inquiry received" });
});

export default app;
