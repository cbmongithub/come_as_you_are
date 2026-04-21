interface BookingConfirmationEmailInput {
  to?: string | null;
  customerName?: string | null;
  productName: string;
  start: string;
  end: string;
  timeZone: string;
  calendarEventLink?: string | null;
}

interface ResendEmailResponse {
  id?: string;
  message?: string;
  error?: {
    message?: string;
  };
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeIcsText(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}

function formatIcsDate(value: string) {
  return new Date(value).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

function foldIcsLine(line: string) {
  const maxLength = 74;

  if (line.length <= maxLength) {
    return line;
  }

  const chunks: string[] = [];
  let remaining = line;

  while (remaining.length > maxLength) {
    chunks.push(remaining.slice(0, maxLength));
    remaining = remaining.slice(maxLength);
  }

  chunks.push(remaining);

  return chunks.map((chunk, index) => (index === 0 ? chunk : ` ${chunk}`)).join("\r\n");
}

function createIcs(input: BookingConfirmationEmailInput) {
  const uid = `caya-${Date.now()}-${Math.random().toString(16).slice(2)}@supportcomeasyou.org`;
  const description = [
    "Come As You Are peer support session.",
    "This is not therapy, medical care, diagnosis, or crisis intervention.",
    input.calendarEventLink ? `Calendar event: ${input.calendarEventLink}` : null,
  ]
    .filter(Boolean)
    .join("\n");
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Come As You Are//Booking//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${formatIcsDate(new Date().toISOString())}`,
    `DTSTART:${formatIcsDate(input.start)}`,
    `DTEND:${formatIcsDate(input.end)}`,
    `SUMMARY:${escapeIcsText(input.productName)}`,
    `DESCRIPTION:${escapeIcsText(description)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  return lines.map(foldIcsLine).join("\r\n");
}

function formatDateTime(value: string, timeZone: string) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(new Date(value));
}

function getEmailConfig() {
  return {
    apiKey: process.env.RESEND_API_KEY,
    from: process.env.BOOKING_EMAIL_FROM,
    replyTo: process.env.BOOKING_EMAIL_REPLY_TO,
  };
}

export function getBookingEmailConfigStatus() {
  const config = getEmailConfig();

  return {
    configured: Boolean(config.apiKey && config.from),
    hasApiKey: Boolean(config.apiKey),
    hasFrom: Boolean(config.from),
    hasReplyTo: Boolean(config.replyTo),
  };
}

export async function sendBookingConfirmationEmail(
  input: BookingConfirmationEmailInput,
) {
  const config = getEmailConfig();

  if (!input.to) {
    return {
      sent: false,
      skippedReason: "Customer email was not provided by Stripe.",
    };
  }

  if (!config.apiKey || !config.from) {
    return {
      sent: false,
      skippedReason: "Email is not configured. Set RESEND_API_KEY and BOOKING_EMAIL_FROM.",
    };
  }

  const startsAt = formatDateTime(input.start, input.timeZone);
  const endsAt = formatDateTime(input.end, input.timeZone);
  const safeProductName = escapeHtml(input.productName);
  const html = `
    <div style="font-family: Arial, sans-serif; color: #221811; line-height: 1.6;">
      <p style="text-transform: uppercase; letter-spacing: 0.16em; color: #A9573D; font-size: 12px;">Come As You Are</p>
      <h1 style="font-family: Georgia, serif; font-weight: 400; font-size: 36px; margin: 0 0 16px;">Your session is confirmed.</h1>
      <p>Thank you for booking ${safeProductName}. We added your session to the Come As You Are calendar.</p>
      <p><strong>Starts:</strong> ${escapeHtml(startsAt)}<br /><strong>Ends:</strong> ${escapeHtml(endsAt)}</p>
      <p>This session is a peer support and wellness-centered conversation. It is not therapy, medical care, diagnosis, or crisis intervention.</p>
      ${
        input.calendarEventLink
          ? `<p><a href="${escapeHtml(input.calendarEventLink)}" style="color: #A9573D;">View calendar event</a></p>`
          : ""
      }
      <p style="color: #5f524b; font-size: 14px;">An .ics calendar file is attached so you can add this session to your calendar.</p>
    </div>
  `;
  const text = [
    "Your Come As You Are session is confirmed.",
    "",
    `Session: ${input.productName}`,
    `Starts: ${startsAt}`,
    `Ends: ${endsAt}`,
    "",
    "This session is a peer support and wellness-centered conversation. It is not therapy, medical care, diagnosis, or crisis intervention.",
    input.calendarEventLink ? `Calendar event: ${input.calendarEventLink}` : "",
  ].join("\n");
  const ics = createIcs(input);
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: config.from,
      to: [input.to],
      subject: `Your ${input.productName} is confirmed`,
      html,
      text,
      reply_to: config.replyTo,
      attachments: [
        {
          filename: "come-as-you-are-session.ics",
          content: Buffer.from(ics).toString("base64"),
        },
      ],
      tags: [
        {
          name: "type",
          value: "booking_confirmation",
        },
      ],
    }),
  });
  const payload = (await response.json()) as ResendEmailResponse;

  if (!response.ok) {
    throw new Error(
      payload.error?.message || payload.message || "Failed to send confirmation email.",
    );
  }

  return {
    sent: true,
    id: payload.id,
  };
}
