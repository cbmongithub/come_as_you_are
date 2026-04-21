module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/lib/booking-products.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "bookingProducts",
    ()=>bookingProducts,
    "getBookingProduct",
    ()=>getBookingProduct,
    "getBookingProductsWithConfig",
    ()=>getBookingProductsWithConfig
]);
const bookingProducts = [
    {
        id: "deep-dive-60",
        checkoutMode: "payment",
        envKey: "STRIPE_PRICE_60_MIN_DEEP_DIVE_SESSION",
        name: "60-Minute Deep Dive Support Session",
        priceLabel: "$100",
        durationLabel: "60 minutes",
        durationMinutes: 60,
        description: "A focused one-on-one support session for deeper processing, grounding, and next-step clarity."
    },
    {
        id: "weekly-support-monthly",
        checkoutMode: "subscription",
        envKey: "STRIPE_PRICE_ONGOING_WEEKLY_SUPPORT_MONTHLY",
        name: "Ongoing Weekly Support (Monthly Package)",
        priceLabel: "$350",
        durationLabel: "Monthly package",
        durationMinutes: 60,
        description: "Weekly continuity for people who want steadier support and recurring space to work through what is happening."
    },
    {
        id: "clarity-30",
        checkoutMode: "payment",
        envKey: "STRIPE_PRICE_30_MIN_SUPPORT_CLARITY_SESSION",
        name: "30-min Support & Clarity Session",
        priceLabel: "$40",
        durationLabel: "30 minutes",
        durationMinutes: 30,
        description: "A shorter check-in for immediate support, reflection, and help sorting through a specific moment or decision."
    },
    {
        id: "same-day-emergency",
        checkoutMode: "payment",
        envKey: "STRIPE_PRICE_EMERGENCY_SAME_DAY_SUPPORT_SESSION",
        name: "Emergency / Same-Day Support Session",
        priceLabel: "$120",
        durationLabel: "Same-day support",
        durationMinutes: 60,
        description: "Priority support for urgent situations when you need a responsive, human place to land."
    }
];
function getBookingProduct(productId) {
    return bookingProducts.find((product)=>product.id === productId);
}
function getBookingProductsWithConfig() {
    return bookingProducts.map((product)=>({
            ...product,
            hasPriceId: Boolean(process.env[product.envKey])
        }));
}
}),
"[project]/lib/stripe.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createBookingCheckoutSession",
    ()=>createBookingCheckoutSession,
    "getBookingCheckoutSession",
    ()=>getBookingCheckoutSession,
    "getStripeConfigStatus",
    ()=>getStripeConfigStatus
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$booking$2d$products$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/booking-products.ts [app-route] (ecmascript)");
;
const stripeApiBaseUrl = "https://api.stripe.com/v1";
function getStripeSecretKey() {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
        throw new Error("Missing STRIPE_SECRET_KEY.");
    }
    return secretKey;
}
function getStripeConfigStatus() {
    const products = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$booking$2d$products$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getBookingProductsWithConfig"])();
    return {
        hasSecretKey: Boolean(process.env.STRIPE_SECRET_KEY),
        hasPublishableKey: Boolean(process.env.STRIPE_PUBLISHABLE_KEY),
        hasAnyBookingPriceId: products.some((product)=>product.hasPriceId),
        products,
        hasWebhookSecret: Boolean(process.env.STRIPE_WEBHOOK_SECRET)
    };
}
async function createBookingCheckoutSession(origin, productId) {
    const product = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$booking$2d$products$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getBookingProduct"])(productId);
    if (!product) {
        throw new Error("Unknown booking product.");
    }
    const priceId = process.env[product.envKey];
    const submitType = product.id === "weekly-support-monthly" ? "subscribe" : "book";
    if (!priceId) {
        throw new Error(`Missing ${product.envKey}.`);
    }
    const body = new URLSearchParams({
        mode: product.checkoutMode,
        submit_type: submitType,
        "automatic_tax[enabled]": "true",
        "line_items[0][price]": priceId,
        "line_items[0][quantity]": "1",
        success_url: `${origin}/book/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/book`,
        "metadata[source]": "native_booking",
        "metadata[booking_product_id]": product.id,
        "metadata[booking_product_name]": product.name
    });
    if (product.checkoutMode === "subscription") {
        body.set("subscription_data[metadata][source]", "native_booking");
        body.set("subscription_data[metadata][booking_product_id]", product.id);
        body.set("subscription_data[metadata][booking_product_name]", product.name);
        body.set("subscription_data[description]", product.name);
    }
    const response = await fetch(`${stripeApiBaseUrl}/checkout/sessions`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${getStripeSecretKey()}`,
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body
    });
    const session = await response.json();
    if (!response.ok || !session.url) {
        throw new Error(session.error?.message || "Stripe failed to create a Checkout Session.");
    }
    return session;
}
async function getBookingCheckoutSession(sessionId) {
    const response = await fetch(`${stripeApiBaseUrl}/checkout/sessions/${encodeURIComponent(sessionId)}`, {
        headers: {
            Authorization: `Bearer ${getStripeSecretKey()}`
        },
        cache: "no-store"
    });
    const session = await response.json();
    if (!response.ok) {
        throw new Error(session.error?.message || "Stripe failed to load the Checkout Session.");
    }
    return session;
}
}),
"[project]/lib/booking-session.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getPaidBookingSession",
    ()=>getPaidBookingSession
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$booking$2d$products$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/booking-products.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$stripe$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/stripe.ts [app-route] (ecmascript)");
;
;
async function getPaidBookingSession(sessionId) {
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$stripe$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getBookingCheckoutSession"])(sessionId);
    if (session.payment_status !== "paid") {
        throw new Error("Payment has not been confirmed for this session.");
    }
    const productId = session.metadata?.booking_product_id;
    const product = productId ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$booking$2d$products$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getBookingProduct"])(productId) : undefined;
    if (!product) {
        throw new Error("Could not determine the booking product for this payment.");
    }
    return {
        session,
        product,
        customerEmail: session.customer_details?.email || null,
        customerName: session.customer_details?.name || null
    };
}
}),
"[externals]/node:crypto [external] (node:crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}),
"[externals]/node:fs/promises [external] (node:fs/promises, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:fs/promises", () => require("node:fs/promises"));

module.exports = mod;
}),
"[externals]/node:path [external] (node:path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:path", () => require("node:path"));

module.exports = mod;
}),
"[project]/lib/google-calendar.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createBookingCalendarEvent",
    ()=>createBookingCalendarEvent,
    "getBookingAvailability",
    ()=>getBookingAvailability,
    "getGoogleCalendarHealth",
    ()=>getGoogleCalendarHealth
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:crypto [external] (node:crypto, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:fs/promises [external] (node:fs/promises, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:path [external] (node:path, cjs)");
;
;
;
const googleTokenUrl = "https://oauth2.googleapis.com/token";
const googleCalendarScope = "https://www.googleapis.com/auth/calendar";
function base64UrlJson(value) {
    return Buffer.from(JSON.stringify(value)).toString("base64url");
}
function normalizePrivateKey(privateKey) {
    return privateKey.replace(/\\n/g, "\n");
}
async function loadCredentialsFromFile(filePath) {
    const absolutePath = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].isAbsolute(filePath) ? filePath : __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(process.cwd(), filePath);
    const raw = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["readFile"])(absolutePath, "utf8");
    const parsed = JSON.parse(raw);
    if (!parsed.client_email || !parsed.private_key) {
        throw new Error("Google service account key file is missing required fields.");
    }
    return {
        client_email: parsed.client_email,
        private_key: parsed.private_key
    };
}
async function loadGoogleServiceAccountCredentials() {
    const keyFile = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_FILE;
    if (keyFile) {
        return loadCredentialsFromFile(keyFile);
    }
    try {
        return await loadCredentialsFromFile("google-calendar.json");
    } catch  {
    // Fall back to env vars for hosted deployments where key files are awkward.
    }
    const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY;
    if (!clientEmail || !privateKey) {
        throw new Error("Missing Google credentials. Set GOOGLE_SERVICE_ACCOUNT_KEY_FILE or GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_PRIVATE_KEY.");
    }
    return {
        client_email: clientEmail,
        private_key: privateKey
    };
}
async function getGoogleAccessToken() {
    const credentials = await loadGoogleServiceAccountCredentials();
    const now = Math.floor(Date.now() / 1000);
    const header = base64UrlJson({
        alg: "RS256",
        typ: "JWT"
    });
    const payload = base64UrlJson({
        iss: credentials.client_email,
        scope: googleCalendarScope,
        aud: googleTokenUrl,
        exp: now + 3600,
        iat: now
    });
    const signingInput = `${header}.${payload}`;
    const signer = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["createSign"])("RSA-SHA256");
    signer.update(signingInput);
    signer.end();
    const signature = signer.sign(normalizePrivateKey(credentials.private_key)).toString("base64url");
    const assertion = `${signingInput}.${signature}`;
    const response = await fetch(googleTokenUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
            grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
            assertion
        })
    });
    const token = await response.json();
    if (!response.ok || !token.access_token) {
        throw new Error(token.error_description || token.error || "Failed to authorize Google Calendar.");
    }
    return {
        accessToken: token.access_token,
        serviceAccountEmail: credentials.client_email
    };
}
async function getGoogleCalendarHealth() {
    const calendarId = process.env.GOOGLE_CALENDAR_ID;
    if (!calendarId) {
        throw new Error("Missing GOOGLE_CALENDAR_ID.");
    }
    const { accessToken, serviceAccountEmail } = await getGoogleAccessToken();
    const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    const calendar = await response.json();
    if (!response.ok) {
        throw new Error(calendar.error?.message || "Google Calendar rejected access to the configured calendar.");
    }
    return {
        calendarId,
        serviceAccountEmail,
        summary: calendar.summary,
        timeZone: calendar.timeZone
    };
}
function getCalendarId() {
    const calendarId = process.env.GOOGLE_CALENDAR_ID;
    if (!calendarId) {
        throw new Error("Missing GOOGLE_CALENDAR_ID.");
    }
    return calendarId;
}
function getBookingTimeZone() {
    return process.env.GOOGLE_CALENDAR_TIME_ZONE || "America/Denver";
}
function getDatePartsInTimeZone(date, timeZone) {
    const parts = new Intl.DateTimeFormat("en-US", {
        timeZone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hourCycle: "h23"
    }).formatToParts(date);
    const byType = Object.fromEntries(parts.map((part)=>[
            part.type,
            part.value
        ]));
    return {
        year: Number(byType.year),
        month: Number(byType.month),
        day: Number(byType.day),
        hour: Number(byType.hour),
        minute: Number(byType.minute),
        second: Number(byType.second)
    };
}
function zonedDateTimeToUtc(date, hour, minute, timeZone) {
    const [year, month, day] = date.split("-").map(Number);
    const utcGuess = new Date(Date.UTC(year, month - 1, day, hour, minute, 0));
    const parts = getDatePartsInTimeZone(utcGuess, timeZone);
    const zonedAsUtc = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second);
    const targetAsUtc = Date.UTC(year, month - 1, day, hour, minute, 0);
    return new Date(utcGuess.getTime() + (targetAsUtc - zonedAsUtc));
}
function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes * 60_000);
}
function overlapsBusy(start, end, busy) {
    return busy.some((busyBlock)=>{
        const busyStart = new Date(busyBlock.start);
        const busyEnd = new Date(busyBlock.end);
        return start < busyEnd && end > busyStart;
    });
}
function formatSlotLabel(start, timeZone) {
    return new Intl.DateTimeFormat("en-US", {
        timeZone,
        hour: "numeric",
        minute: "2-digit"
    }).format(start);
}
async function getBookingAvailability({ date, durationMinutes }) {
    const calendarId = getCalendarId();
    const timeZone = getBookingTimeZone();
    const { accessToken } = await getGoogleAccessToken();
    const dayStart = zonedDateTimeToUtc(date, 0, 0, timeZone);
    const dayEnd = zonedDateTimeToUtc(date, 23, 59, timeZone);
    const response = await fetch("https://www.googleapis.com/calendar/v3/freeBusy", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            timeMin: dayStart.toISOString(),
            timeMax: dayEnd.toISOString(),
            timeZone,
            items: [
                {
                    id: calendarId
                }
            ]
        })
    });
    const freeBusy = await response.json();
    if (!response.ok) {
        throw new Error(freeBusy.error?.message || "Google Calendar availability lookup failed.");
    }
    const busy = freeBusy.calendars?.[calendarId]?.busy || [];
    const slots = [];
    const now = new Date();
    const closingTime = zonedDateTimeToUtc(date, 17, 0, timeZone);
    for(let hour = 9; hour < 17; hour += 1){
        for (const minute of [
            0,
            30
        ]){
            const start = zonedDateTimeToUtc(date, hour, minute, timeZone);
            const end = addMinutes(start, durationMinutes);
            if (start <= now || end > closingTime) {
                continue;
            }
            if (!overlapsBusy(start, end, busy)) {
                slots.push({
                    start: start.toISOString(),
                    end: end.toISOString(),
                    label: formatSlotLabel(start, timeZone)
                });
            }
        }
    }
    return {
        date,
        timeZone,
        durationMinutes,
        slots
    };
}
async function createBookingCalendarEvent(input) {
    const calendarId = getCalendarId();
    const timeZone = getBookingTimeZone();
    const { accessToken } = await getGoogleAccessToken();
    const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?sendUpdates=all`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            summary: input.summary,
            description: input.description,
            start: {
                dateTime: input.start,
                timeZone
            },
            end: {
                dateTime: input.end,
                timeZone
            }
        })
    });
    const event = await response.json();
    if (!response.ok || !event.id) {
        throw new Error(event.error?.message || "Google Calendar event creation failed.");
    }
    return {
        id: event.id,
        htmlLink: event.htmlLink
    };
}
}),
"[project]/lib/booking-email.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getBookingEmailConfigStatus",
    ()=>getBookingEmailConfigStatus,
    "sendBookingConfirmationEmail",
    ()=>sendBookingConfirmationEmail
]);
function escapeHtml(value) {
    return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function escapeIcsText(value) {
    return value.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}
function formatIcsDate(value) {
    return new Date(value).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}
function foldIcsLine(line) {
    const maxLength = 74;
    if (line.length <= maxLength) {
        return line;
    }
    const chunks = [];
    let remaining = line;
    while(remaining.length > maxLength){
        chunks.push(remaining.slice(0, maxLength));
        remaining = remaining.slice(maxLength);
    }
    chunks.push(remaining);
    return chunks.map((chunk, index)=>index === 0 ? chunk : ` ${chunk}`).join("\r\n");
}
function createIcs(input) {
    const uid = `caya-${Date.now()}-${Math.random().toString(16).slice(2)}@supportcomeasyou.org`;
    const description = [
        "Come As You Are peer support session.",
        "This is not therapy, medical care, diagnosis, or crisis intervention.",
        input.calendarEventLink ? `Calendar event: ${input.calendarEventLink}` : null
    ].filter(Boolean).join("\n");
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
        "END:VCALENDAR"
    ];
    return lines.map(foldIcsLine).join("\r\n");
}
function formatDateTime(value, timeZone) {
    return new Intl.DateTimeFormat("en-US", {
        timeZone,
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        timeZoneName: "short"
    }).format(new Date(value));
}
function getEmailConfig() {
    return {
        apiKey: process.env.RESEND_API_KEY,
        from: process.env.BOOKING_EMAIL_FROM,
        replyTo: process.env.BOOKING_EMAIL_REPLY_TO
    };
}
function getBookingEmailConfigStatus() {
    const config = getEmailConfig();
    return {
        configured: Boolean(config.apiKey && config.from),
        hasApiKey: Boolean(config.apiKey),
        hasFrom: Boolean(config.from),
        hasReplyTo: Boolean(config.replyTo)
    };
}
async function sendBookingConfirmationEmail(input) {
    const config = getEmailConfig();
    if (!input.to) {
        return {
            sent: false,
            skippedReason: "Customer email was not provided by Stripe."
        };
    }
    if (!config.apiKey || !config.from) {
        return {
            sent: false,
            skippedReason: "Email is not configured. Set RESEND_API_KEY and BOOKING_EMAIL_FROM."
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
      ${input.calendarEventLink ? `<p><a href="${escapeHtml(input.calendarEventLink)}" style="color: #A9573D;">View calendar event</a></p>` : ""}
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
        input.calendarEventLink ? `Calendar event: ${input.calendarEventLink}` : ""
    ].join("\n");
    const ics = createIcs(input);
    const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${config.apiKey}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            from: config.from,
            to: [
                input.to
            ],
            subject: `Your ${input.productName} is confirmed`,
            html,
            text,
            reply_to: config.replyTo,
            attachments: [
                {
                    filename: "come-as-you-are-session.ics",
                    content: Buffer.from(ics).toString("base64")
                }
            ],
            tags: [
                {
                    name: "type",
                    value: "booking_confirmation"
                }
            ]
        })
    });
    const payload = await response.json();
    if (!response.ok) {
        throw new Error(payload.error?.message || payload.message || "Failed to send confirmation email.");
    }
    return {
        sent: true,
        id: payload.id
    };
}
}),
"[project]/app/api/booking/confirm/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST,
    "dynamic",
    ()=>dynamic
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$2$2e$4$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/next@16.2.4+21ccd8898788a04d/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$booking$2d$session$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/booking-session.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$google$2d$calendar$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/google-calendar.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$booking$2d$email$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/booking-email.ts [app-route] (ecmascript)");
;
;
;
;
const dynamic = "force-dynamic";
async function POST(request) {
    try {
        const body = await request.json();
        if (!body.sessionId || !body.start || !body.end) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$2$2e$4$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Missing booking details."
            }, {
                status: 400
            });
        }
        if (!body.disclaimerAccepted) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$2$2e$4$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Disclaimer acknowledgement is required."
            }, {
                status: 400
            });
        }
        const { session, product, customerEmail, customerName } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$booking$2d$session$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getPaidBookingSession"])(body.sessionId);
        const start = new Date(body.start);
        const end = new Date(body.end);
        if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$2$2e$4$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Invalid booking time."
            }, {
                status: 400
            });
        }
        const availability = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$google$2d$calendar$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getBookingAvailability"])({
            date: body.date || body.start.slice(0, 10),
            durationMinutes: product.durationMinutes
        });
        const selectedSlot = availability.slots.find((slot)=>slot.start === body.start && slot.end === body.end);
        if (!selectedSlot) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$2$2e$4$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "That time is no longer available."
            }, {
                status: 409
            });
        }
        const event = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$google$2d$calendar$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createBookingCalendarEvent"])({
            start: body.start,
            end: body.end,
            summary: product.name,
            description: [
                `Booked through Come As You Are.`,
                `Product: ${product.name}`,
                `Stripe Checkout Session: ${session.id}`,
                customerName ? `Customer name: ${customerName}` : null,
                customerEmail ? `Customer email: ${customerEmail}` : null,
                `Disclaimer acknowledged: yes`
            ].filter(Boolean).join("\n")
        });
        let email;
        try {
            email = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$booking$2d$email$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sendBookingConfirmationEmail"])({
                to: customerEmail,
                customerName,
                productName: product.name,
                start: body.start,
                end: body.end,
                timeZone: availability.timeZone,
                calendarEventLink: event.htmlLink
            });
        } catch (emailError) {
            email = {
                sent: false,
                skippedReason: emailError instanceof Error ? emailError.message : "Confirmation email failed."
            };
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$2$2e$4$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: true,
            event,
            slot: selectedSlot,
            email
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unable to confirm booking.";
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$2$2e$4$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: message
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0sabqes._.js.map