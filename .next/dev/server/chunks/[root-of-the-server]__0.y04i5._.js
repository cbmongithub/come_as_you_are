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
"[project]/app/api/booking/checkout/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST,
    "dynamic",
    ()=>dynamic
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$2$2e$4$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/next@16.2.4+21ccd8898788a04d/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$stripe$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/stripe.ts [app-route] (ecmascript)");
;
;
const dynamic = "force-dynamic";
async function POST(request) {
    try {
        const origin = new URL(request.url).origin;
        const body = await request.json().catch(()=>({}));
        const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$stripe$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createBookingCheckoutSession"])(origin, body.productId || "");
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$2$2e$4$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            url: session.url
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unable to start checkout.";
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$2$2e$4$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: message
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0.y04i5._.js.map