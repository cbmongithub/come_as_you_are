module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/app/icon.png (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/icon.0elovy9e~_z6e.png" + (globalThis["NEXT_CLIENT_ASSET_SUFFIX"] || ''));}),
"[project]/app/icon.png.mjs { IMAGE => \"[project]/app/icon.png (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$icon$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/app/icon.png (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$icon$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 1024,
    height: 1024
};
}),
"[project]/lib/booking-products.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/lib/stripe.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createBookingCheckoutSession",
    ()=>createBookingCheckoutSession,
    "getBookingCheckoutSession",
    ()=>getBookingCheckoutSession,
    "getStripeConfigStatus",
    ()=>getStripeConfigStatus
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$booking$2d$products$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/booking-products.ts [app-rsc] (ecmascript)");
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
    const products = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$booking$2d$products$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getBookingProductsWithConfig"])();
    return {
        hasSecretKey: Boolean(process.env.STRIPE_SECRET_KEY),
        hasPublishableKey: Boolean(process.env.STRIPE_PUBLISHABLE_KEY),
        hasAnyBookingPriceId: products.some((product)=>product.hasPriceId),
        products,
        hasWebhookSecret: Boolean(process.env.STRIPE_WEBHOOK_SECRET)
    };
}
async function createBookingCheckoutSession(origin, productId) {
    const product = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$booking$2d$products$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getBookingProduct"])(productId);
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
"[project]/lib/utils.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$clsx$40$2$2e$1$2e$1$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$tailwind$2d$merge$40$2$2e$6$2e$1$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/tailwind-merge@2.6.1/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-rsc] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$tailwind$2d$merge$40$2$2e$6$2e$1$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$clsx$40$2$2e$1$2e$1$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
}),
"[project]/components/ui/Button.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$2$2e$4$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/next@16.2.4+21ccd8898788a04d/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f40$radix$2d$ui$2b$react$2d$slot$40$1$2e$2$2e$4$2b$b2e33729a97476bf$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/@radix-ui+react-slot@1.2.4+b2e33729a97476bf/node_modules/@radix-ui/react-slot/dist/index.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$2$2e$4$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/next@16.2.4+21ccd8898788a04d/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
;
;
;
;
const Button = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$2$2e$4$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, variant = "primary", size = "md", asChild = false, ...props }, ref)=>{
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f40$radix$2d$ui$2b$react$2d$slot$40$1$2e$2$2e$4$2b$b2e33729a97476bf$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Slot"] : "button";
    const base = "inline-flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-300 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(55%_0.12_38)] disabled:opacity-50 disabled:pointer-events-none";
    const variants = {
        primary: "bg-[oklch(55%_0.12_38)] text-[oklch(99%_0.005_80)] hover:bg-[oklch(48%_0.11_38)] hover:shadow-[0_4px_20px_oklch(55%_0.12_38/0.3)] hover:scale-[1.02]",
        outline: "border border-[oklch(55%_0.12_38)] text-[oklch(55%_0.12_38)] hover:bg-[oklch(55%_0.12_38/0.08)]",
        ghost: "text-[oklch(38%_0.02_60)] hover:bg-[oklch(88%_0.04_75/0.5)] hover:text-[oklch(55%_0.12_38)]",
        sand: "bg-[oklch(88%_0.04_75)] text-[oklch(22%_0.02_60)] hover:bg-[oklch(82%_0.06_72)] hover:scale-[1.02]"
    };
    const sizes = {
        sm: "text-xs px-4 py-2",
        md: "text-sm px-6 py-2.5",
        lg: "text-base px-8 py-3.5"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$2$2e$4$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cn"])(base, variants[variant], sizes[size], className),
        style: {
            fontFamily: "var(--font-body)"
        },
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/Button.tsx",
        lineNumber: 35,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
Button.displayName = "Button";
}),
"[project]/components/booking/AvailabilityPicker.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AvailabilityPicker",
    ()=>AvailabilityPicker
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$2$2e$4$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/next@16.2.4+21ccd8898788a04d/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const AvailabilityPicker = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$2$2e$4$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call AvailabilityPicker() from the server but AvailabilityPicker is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/booking/AvailabilityPicker.tsx <module evaluation>", "AvailabilityPicker");
}),
"[project]/components/booking/AvailabilityPicker.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AvailabilityPicker",
    ()=>AvailabilityPicker
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$2$2e$4$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/next@16.2.4+21ccd8898788a04d/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const AvailabilityPicker = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$2$2e$4$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call AvailabilityPicker() from the server but AvailabilityPicker is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/booking/AvailabilityPicker.tsx", "AvailabilityPicker");
}),
"[project]/components/booking/AvailabilityPicker.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$booking$2f$AvailabilityPicker$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/booking/AvailabilityPicker.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$booking$2f$AvailabilityPicker$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/components/booking/AvailabilityPicker.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$booking$2f$AvailabilityPicker$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/app/book/success/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BookSuccessPage,
    "dynamic",
    ()=>dynamic,
    "metadata",
    ()=>metadata
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$2$2e$4$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/next@16.2.4+21ccd8898788a04d/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$2$2e$4$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/next@16.2.4+21ccd8898788a04d/node_modules/next/dist/client/app-dir/link.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$stripe$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/stripe.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/Button.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$booking$2f$AvailabilityPicker$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/booking/AvailabilityPicker.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$booking$2d$products$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/booking-products.ts [app-rsc] (ecmascript)");
;
;
;
;
;
;
const dynamic = "force-dynamic";
const metadata = {
    title: "Schedule Your Session — Come As You Are",
    description: "Choose a session time after payment."
};
async function BookSuccessPage({ searchParams }) {
    const params = await searchParams;
    const sessionId = Array.isArray(params.session_id) ? params.session_id[0] : params.session_id;
    let paymentStatus = "missing";
    let customerEmail;
    let productName = null;
    let error = null;
    if (sessionId) {
        try {
            const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$stripe$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getBookingCheckoutSession"])(sessionId);
            paymentStatus = session.payment_status || "unknown";
            customerEmail = session.customer_details?.email;
            const product = session.metadata?.booking_product_id ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$booking$2d$products$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getBookingProduct"])(session.metadata.booking_product_id) : undefined;
            productName = product?.name || session.metadata?.booking_product_name || "Session";
        } catch (sessionError) {
            error = sessionError instanceof Error ? sessionError.message : "Unable to verify payment.";
        }
    }
    const isPaid = paymentStatus === "paid";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$2$2e$4$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "pt-36 pb-24",
        style: {
            background: "var(--color-canvas)"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$2$2e$4$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container-wide",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$2$2e$4$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto max-w-3xl",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$2$2e$4$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mb-4 text-xs uppercase tracking-[0.2em]",
                        style: {
                            color: "var(--color-clay)",
                            fontFamily: "var(--font-body)"
                        },
                        children: isPaid ? "Payment complete" : "Payment verification"
                    }, void 0, false, {
                        fileName: "[project]/app/book/success/page.tsx",
                        lineNumber: 60,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$2$2e$4$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "mb-5 text-[clamp(3rem,6vw,5.5rem)] leading-tight",
                        style: {
                            color: "var(--color-charcoal)",
                            fontFamily: "var(--font-display)"
                        },
                        children: isPaid ? "Choose your session time." : "We need to verify payment."
                    }, void 0, false, {
                        fileName: "[project]/app/book/success/page.tsx",
                        lineNumber: 69,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$2$2e$4$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "max-w-2xl text-lg leading-relaxed",
                        style: {
                            color: "var(--color-charcoal-soft)",
                            fontFamily: "var(--font-body)"
                        },
                        children: isPaid ? "Your payment is confirmed. Choose an available time from the calendar, then acknowledge the session disclaimer to finalize your booking." : "We could not confirm a paid Checkout Session from this link. Return to booking and try checkout again."
                    }, void 0, false, {
                        fileName: "[project]/app/book/success/page.tsx",
                        lineNumber: 78,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$2$2e$4$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-10",
                        children: isPaid && sessionId ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$2$2e$4$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$booking$2f$AvailabilityPicker$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["AvailabilityPicker"], {
                            sessionId: sessionId,
                            productName: productName || "Session",
                            customerEmail: customerEmail
                        }, void 0, false, {
                            fileName: "[project]/app/book/success/page.tsx",
                            lineNumber: 92,
                            columnNumber: 15
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$2$2e$4$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-(--radius-card) p-8 shadow-(--shadow-warm)",
                            style: {
                                background: "var(--color-warm-white)",
                                border: "1px solid var(--color-sand)"
                            },
                            children: [
                                error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$2$2e$4$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mb-5 leading-relaxed",
                                    style: {
                                        color: "var(--color-clay-dark)",
                                        fontFamily: "var(--font-body)"
                                    },
                                    children: error
                                }, void 0, false, {
                                    fileName: "[project]/app/book/success/page.tsx",
                                    lineNumber: 106,
                                    columnNumber: 19
                                }, this) : null,
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$2$2e$4$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("dl", {
                                    className: "grid gap-5 sm:grid-cols-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$2$2e$4$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$2$2e$4$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                                    className: "text-xs uppercase tracking-[0.18em]",
                                                    style: {
                                                        color: "var(--color-clay)",
                                                        fontFamily: "var(--font-body)"
                                                    },
                                                    children: "Payment status"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/book/success/page.tsx",
                                                    lineNumber: 118,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$2$2e$4$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                                    className: "mt-2 text-2xl",
                                                    style: {
                                                        color: "var(--color-charcoal)",
                                                        fontFamily: "var(--font-display)"
                                                    },
                                                    children: paymentStatus
                                                }, void 0, false, {
                                                    fileName: "[project]/app/book/success/page.tsx",
                                                    lineNumber: 127,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/book/success/page.tsx",
                                            lineNumber: 117,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$2$2e$4$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$2$2e$4$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                                    className: "text-xs uppercase tracking-[0.18em]",
                                                    style: {
                                                        color: "var(--color-clay)",
                                                        fontFamily: "var(--font-body)"
                                                    },
                                                    children: "Email"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/book/success/page.tsx",
                                                    lineNumber: 138,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$2$2e$4$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                                    className: "mt-2 break-words text-2xl",
                                                    style: {
                                                        color: "var(--color-charcoal)",
                                                        fontFamily: "var(--font-display)"
                                                    },
                                                    children: customerEmail || "Not available"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/book/success/page.tsx",
                                                    lineNumber: 147,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/book/success/page.tsx",
                                            lineNumber: 137,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/book/success/page.tsx",
                                    lineNumber: 116,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$2$2e$4$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-8",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$2$2e$4$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Button"], {
                                        asChild: true,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$2$2e$4$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$2$2e$4$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/book",
                                            children: "Return to checkout"
                                        }, void 0, false, {
                                            fileName: "[project]/app/book/success/page.tsx",
                                            lineNumber: 160,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/book/success/page.tsx",
                                        lineNumber: 159,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/book/success/page.tsx",
                                    lineNumber: 158,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/book/success/page.tsx",
                            lineNumber: 98,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/book/success/page.tsx",
                        lineNumber: 90,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/book/success/page.tsx",
                lineNumber: 59,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/book/success/page.tsx",
            lineNumber: 58,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/book/success/page.tsx",
        lineNumber: 54,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/book/success/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/book/success/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0h4yc6c._.js.map