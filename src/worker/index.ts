import { Hono } from "hono";
import { EmailMessage } from "cloudflare:email";
import { createMimeMessage } from "mimetext";

// Extend the Env bindings type to include the send_email binding
interface Env {
  SEND_EMAIL: SendEmail;
}

const app = new Hono<{ Bindings: Env }>();

app.get("/api/", (c) => c.json({ name: "Manor East NY", status: "coming-soon" }));

// Receives inquiry form submissions and forwards them to info@manoreastny.com
// via Cloudflare Email Routing's send_email Worker binding + mimetext.
// The send_email binding is locked to info@manoreastny.com in wrangler.json.
app.post("/api/inquiry", async (c) => {
  const body = await c.req.json();
  const { name, email, phone, event, date, guests, message } = body;

  const TO_ADDRESS   = "info@manoreastny.com";
  const FROM_ADDRESS = "info@manoreastny.com";

  const msg = createMimeMessage();
  msg.setSender({ name: "Manor East NY — Inquiries", addr: FROM_ADDRESS });
  msg.setRecipient(TO_ADDRESS);
  msg.setSubject(`New Inquiry from ${name || "Website Visitor"} — ${event || "Event"}`);

  // Plain-text body
  msg.addMessage({
    contentType: "text/plain",
    data: [
      `New Event Inquiry — Manor East NY`,
      ``,
      `Name:    ${name    || "—"}`,
      `Email:   ${email   || "—"}`,
      `Phone:   ${phone   || "—"}`,
      `Event:   ${event   || "—"}`,
      `Date:    ${date    || "—"}`,
      `Guests:  ${guests  || "—"}`,
      ``,
      `Message:`,
      message || "—",
    ].join("\n"),
  });

  // HTML body
  msg.addMessage({
    contentType: "text/html",
    data: `
      <h2 style="font-family:Georgia,serif;color:#c4a05a;">New Event Inquiry</h2>
      <table style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse;">
        <tr><td style="padding:4px 12px 4px 0;color:#888;"><strong>Name</strong></td><td>${name    || "—"}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#888;"><strong>Email</strong></td><td>${email   || "—"}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#888;"><strong>Phone</strong></td><td>${phone   || "—"}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#888;"><strong>Event Type</strong></td><td>${event   || "—"}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#888;"><strong>Preferred Date</strong></td><td>${date    || "—"}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#888;"><strong>Guests</strong></td><td>${guests  || "—"}</td></tr>
      </table>
      <p style="font-family:Arial,sans-serif;font-size:14px;margin-top:16px;">
        <strong>Message:</strong><br>${(message || "—").replace(/\n/g, "<br>")}
      </p>
    `,
  });

  try {
    const emailMessage = new EmailMessage(FROM_ADDRESS, TO_ADDRESS, msg.asRaw());
    await c.env.SEND_EMAIL.send(emailMessage);
    console.log("Inquiry sent to", TO_ADDRESS, "from", email);
    return c.json({ success: true, message: "Inquiry received" });
  } catch (err) {
    console.error("Email send error:", err);
    return c.json({ success: false, error: "Failed to send email" }, 500);
  }
});

export default app;