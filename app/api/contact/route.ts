import { NextResponse } from "next/server";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  const name = getString(body.name);
  const email = getString(body.email);
  const subject = getString(body.subject);
  const message = getString(body.message);
  const company = getString(body.company);
  const fieldErrors: Record<string, string> = {};

  // Honeypot fields should remain empty. Return a neutral response to bots.
  if (company) return NextResponse.json({ ok: true });

  if (!name) fieldErrors.name = "Please enter your name.";
  if (!email) {
    fieldErrors.email = "Please enter your email address.";
  } else if (!emailPattern.test(email)) {
    fieldErrors.email = "Please enter a valid email address.";
  }
  if (!subject) fieldErrors.subject = "Please enter a subject.";
  if (!message) fieldErrors.message = "Please enter a message.";

  if (name.length > 120) fieldErrors.name = "Name is too long.";
  if (email.length > 254) fieldErrors.email = "Email address is too long.";
  if (subject.length > 200) fieldErrors.subject = "Subject is too long.";
  if (message.length > 10000) fieldErrors.message = "Message is too long.";

  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json(
      { message: "Please correct the highlighted fields.", fieldErrors },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    console.error("Contact email environment variables are not configured.");
    return NextResponse.json(
      { message: "The contact form is temporarily unavailable." },
      { status: 503 },
    );
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": crypto.randomUUID(),
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `Portfolio contact: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
      html: `<p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Subject:</strong> ${escapeHtml(subject)}</p><p><strong>Message:</strong></p><p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>`,
    }),
  });

  if (!response.ok) {
    console.error("Resend rejected the contact email:", await response.text());
    return NextResponse.json(
      { message: "Your message could not be sent. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
