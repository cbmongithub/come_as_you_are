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
"[project]/lib/eventbrite.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getEventDetailsForSite",
    ()=>getEventDetailsForSite,
    "getEventForSite",
    ()=>getEventForSite,
    "getEventsForSite",
    ()=>getEventsForSite
]);
;
const EVENTBRITE_BASE_URL = process.env.EVENTBRITE_BASE_URL ?? "https://www.eventbriteapi.com/v3";
const fallbackEvents = [
    {
        id: "fallback-open-house",
        title: "Community Open House",
        type: "Community",
        date: "Saturday, April 5",
        time: "2:00 PM - 5:00 PM",
        location: "The Space",
        description: "Come meet the team, tour the space, and experience what Come As You Are is all about. No commitment required. Bring a friend.",
        isFeatured: true,
        emoji: "🏡",
        url: null,
        imageUrl: null
    },
    {
        id: "fallback-grief-circle",
        title: "Grief Circle: Special Evening",
        type: "Conversation",
        date: "Tuesday, April 8",
        time: "6:30 PM",
        location: "Circle Room A",
        description: "Our longest-running session returns for a special 2-hour format. All themes welcome: fresh loss, old grief, and anticipatory grief.",
        isFeatured: false,
        emoji: "🕯️",
        url: null,
        imageUrl: null
    },
    {
        id: "fallback-write-it-out",
        title: "Write It Out: Monthly Workshop",
        type: "Workshop",
        date: "Saturday, April 12",
        time: "11:00 AM - 1:00 PM",
        location: "Community Lounge",
        description: "Drop into our monthly writing workshop. Prompts provided. No skill required. All you need is a pen and something on your mind.",
        isFeatured: false,
        emoji: "✍️",
        url: null,
        imageUrl: null
    }
];
function getEventbriteConfig() {
    const token = process.env.EVENTBRITE_PRIVATE_TOKEN;
    const organizationId = process.env.EVENTBRITE_ORGANIZATION_ID;
    const status = process.env.EVENTBRITE_EVENT_STATUS ?? "live";
    return {
        token,
        organizationId,
        status
    };
}
async function eventbriteFetch(url, token, revalidate = 300) {
    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
        },
        next: {
            revalidate
        }
    });
    if (!response.ok) {
        throw new Error(`Eventbrite request failed with ${response.status} ${response.statusText}`);
    }
    return await response.json();
}
async function resolveOrganizationId(token, organizationId) {
    if (organizationId) return organizationId;
    const data = await eventbriteFetch(`${EVENTBRITE_BASE_URL}/users/me/organizations/`, token);
    return data.organizations?.[0]?.id || null;
}
function formatEventDateParts(localDateTime) {
    if (!localDateTime) return {
        date: "Date TBA",
        time: "Time TBA"
    };
    const date = new Date(localDateTime);
    if (Number.isNaN(date.getTime())) return {
        date: "Date TBA",
        time: "Time TBA"
    };
    return {
        date: new Intl.DateTimeFormat("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric"
        }).format(date),
        time: new Intl.DateTimeFormat("en-US", {
            hour: "numeric",
            minute: "2-digit"
        }).format(date)
    };
}
function formatEventTimeRange(startLocal, endLocal) {
    const start = formatEventDateParts(startLocal).time;
    if (!endLocal) return start;
    const end = formatEventDateParts(endLocal).time;
    if (start === "Time TBA") return end;
    return `${start} - ${end}`;
}
function getEventType(event) {
    const normalized = event.format?.name_localized?.toLowerCase() || "";
    const title = event.name?.text?.toLowerCase() || "";
    if (normalized.includes("training")) return "Training";
    if (normalized.includes("workshop") || normalized.includes("class")) return "Workshop";
    if (normalized.includes("network") || normalized.includes("meeting")) return "Community";
    if (title.includes("circle") || title.includes("conversation") || title.includes("talk")) return "Conversation";
    return "Event";
}
function getEventEmoji(type) {
    switch(type){
        case "Workshop":
            return "✍️";
        case "Training":
            return "🌱";
        case "Conversation":
            return "🕯️";
        case "Community":
            return "🤝";
        default:
            return "📅";
    }
}
function getEventLocation(event) {
    if (event.online_event) return "Online";
    return event.venue?.name || event.venue?.address?.localized_area_display || event.venue?.address?.localized_address_display || event.venue?.address?.city || "Location TBA";
}
function getEventImage(event) {
    return event.logo?.original?.url || event.logo?.url || null;
}
function getDurationLabel(startLocal, endLocal) {
    if (!startLocal || !endLocal) return null;
    const start = new Date(startLocal);
    const end = new Date(endLocal);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return null;
    const minutes = Math.round((end.getTime() - start.getTime()) / 60000);
    if (minutes <= 0) return null;
    if (minutes % 60 === 0) {
        const hours = Math.round(minutes / 60);
        return `${hours} hour${hours !== 1 ? "s" : ""}`;
    }
    if (minutes > 60) {
        const hours = minutes / 60;
        return `${hours.toFixed(1).replace(/\.0$/, "")} hours`;
    }
    return `${minutes} minutes`;
}
function normalizeEventbriteEvent(event, index) {
    const type = getEventType(event);
    const dateParts = formatEventDateParts(event.start?.local);
    return {
        id: event.id,
        title: event.name?.text || "Untitled event",
        type,
        date: dateParts.date,
        time: formatEventTimeRange(event.start?.local, event.end?.local),
        location: getEventLocation(event),
        description: event.summary || "Event details will be available on Eventbrite.",
        isFeatured: index === 0,
        emoji: getEventEmoji(type),
        url: event.url || null,
        imageUrl: getEventImage(event)
    };
}
async function getEventsForSite() {
    const config = getEventbriteConfig();
    if (!config.token) {
        return {
            events: fallbackEvents,
            source: "fallback",
            configured: false
        };
    }
    const organizationId = await resolveOrganizationId(config.token, config.organizationId);
    if (!organizationId) throw new Error("No Eventbrite organization was found for this token.");
    const url = new URL(`${EVENTBRITE_BASE_URL}/organizations/${organizationId}/events/`);
    url.searchParams.set("status", config.status);
    url.searchParams.set("expand", "venue,format,logo");
    url.searchParams.set("order_by", "start_asc");
    const data = await eventbriteFetch(url.toString(), config.token);
    const events = (data.events || []).map(normalizeEventbriteEvent);
    return {
        events,
        source: "eventbrite",
        configured: true
    };
}
async function getEventForSite(eventId) {
    const { events } = await getEventsForSite();
    return events.find((event)=>event.id === eventId) ?? null;
}
async function getEventDetailsForSite(eventId) {
    const { token } = getEventbriteConfig();
    if (!token) return null;
    const eventUrl = new URL(`${EVENTBRITE_BASE_URL}/events/${eventId}/`);
    eventUrl.searchParams.set("expand", "organizer,venue,format,refund_policy,ticket_availability,logo");
    const [event, description] = await Promise.all([
        eventbriteFetch(eventUrl.toString(), token),
        eventbriteFetch(`${EVENTBRITE_BASE_URL}/events/${eventId}/description/`, token)
    ]);
    return {
        organizerName: event.organizer?.name || null,
        organizerUrl: event.organizer?.url || null,
        refundPolicy: event.refund_policy?.refund_policy_description || null,
        hasAvailableTickets: event.ticket_availability?.has_available_tickets ?? null,
        isSoldOut: event.ticket_availability?.is_sold_out ?? false,
        salesStartDate: event.ticket_availability?.start_sales_date?.local || null,
        capacity: event.capacity ?? null,
        fullDescriptionHtml: description.description || null,
        addressDisplay: event.venue?.address?.localized_address_display || null,
        durationLabel: getDurationLabel(event.start?.local, event.end?.local)
    };
}
}),
"[project]/app/api/events/[eventId]/ticket/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$2$2e$4$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/next@16.2.4+21ccd8898788a04d/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$eventbrite$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/eventbrite.ts [app-route] (ecmascript)");
;
;
async function GET(_request, context) {
    const { eventId } = await context.params;
    const event = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$eventbrite$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getEventForSite"])(eventId);
    if (!event?.url) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$2$2e$4$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Ticket URL not found for this event."
        }, {
            status: 404
        });
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$2$2e$4$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].redirect(event.url);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0e2tzwd._.js.map