import "server-only";

export interface SiteEvent {
  id: string;
  title: string;
  type: "Community" | "Workshop" | "Training" | "Conversation" | "Event";
  date: string;
  time: string;
  location: string;
  description: string;
  isFeatured: boolean;
  emoji: string;
  url: string | null;
  imageUrl: string | null;
}

export interface SiteEventDetails {
  organizerName: string | null;
  organizerUrl: string | null;
  refundPolicy: string | null;
  hasAvailableTickets: boolean | null;
  isSoldOut: boolean;
  salesStartDate: string | null;
  capacity: number | null;
  fullDescriptionHtml: string | null;
  addressDisplay: string | null;
  durationLabel: string | null;
}

interface EventbriteEvent {
  id: string;
  name?: { text?: string | null };
  summary?: string | null;
  start?: { local?: string | null; timezone?: string | null };
  end?: { local?: string | null; timezone?: string | null };
  online_event?: boolean;
  url?: string | null;
  capacity?: number | null;
  venue?: {
    name?: string | null;
    age_restriction?: string | null;
    address?: {
      localized_address_display?: string | null;
      localized_area_display?: string | null;
      city?: string | null;
    };
  };
  organizer?: {
    name?: string | null;
    url?: string | null;
  };
  format?: { name_localized?: string | null };
  refund_policy?: {
    refund_policy_description?: string | null;
  };
  ticket_availability?: {
    has_available_tickets?: boolean | null;
    is_sold_out?: boolean | null;
    start_sales_date?: { local?: string | null };
  };
  logo?: {
    url?: string | null;
    original?: { url?: string | null };
  };
}

interface EventbriteListResponse {
  events?: EventbriteEvent[];
}

interface EventbriteOrganizationsResponse {
  organizations?: Array<{ id: string }>;
}

interface EventbriteDescriptionResponse {
  description?: string | null;
}

const EVENTBRITE_BASE_URL =
  process.env.EVENTBRITE_BASE_URL ?? "https://www.eventbriteapi.com/v3";

const fallbackEvents: SiteEvent[] = [
  {
    id: "fallback-open-house",
    title: "Community Open House",
    type: "Community",
    date: "Saturday, April 5",
    time: "2:00 PM - 5:00 PM",
    location: "The Space",
    description:
      "Come meet the team, tour the space, and experience what Come As You Are is all about. No commitment required. Bring a friend.",
    isFeatured: true,
    emoji: "🏡",
    url: null,
    imageUrl: null,
  },
  {
    id: "fallback-grief-circle",
    title: "Grief Circle: Special Evening",
    type: "Conversation",
    date: "Tuesday, April 8",
    time: "6:30 PM",
    location: "Circle Room A",
    description:
      "Our longest-running session returns for a special 2-hour format. All themes welcome: fresh loss, old grief, and anticipatory grief.",
    isFeatured: false,
    emoji: "🕯️",
    url: null,
    imageUrl: null,
  },
  {
    id: "fallback-write-it-out",
    title: "Write It Out: Monthly Workshop",
    type: "Workshop",
    date: "Saturday, April 12",
    time: "11:00 AM - 1:00 PM",
    location: "Community Lounge",
    description:
      "Drop into our monthly writing workshop. Prompts provided. No skill required. All you need is a pen and something on your mind.",
    isFeatured: false,
    emoji: "✍️",
    url: null,
    imageUrl: null,
  },
];

function getEventbriteConfig() {
  const token = process.env.EVENTBRITE_PRIVATE_TOKEN;
  const organizationId = process.env.EVENTBRITE_ORGANIZATION_ID;
  const status = process.env.EVENTBRITE_EVENT_STATUS ?? "live";

  return { token, organizationId, status };
}

async function eventbriteFetch<T>(url: string, token: string, revalidate = 300) {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    next: { revalidate },
  });

  if (!response.ok) {
    throw new Error(`Eventbrite request failed with ${response.status} ${response.statusText}`);
  }

  return (await response.json()) as T;
}

async function resolveOrganizationId(token: string, organizationId?: string) {
  if (organizationId) return organizationId;
  const data = await eventbriteFetch<EventbriteOrganizationsResponse>(`${EVENTBRITE_BASE_URL}/users/me/organizations/`, token);
  return data.organizations?.[0]?.id || null;
}

function formatEventDateParts(localDateTime?: string | null) {
  if (!localDateTime) return { date: "Date TBA", time: "Time TBA" };
  const date = new Date(localDateTime);
  if (Number.isNaN(date.getTime())) return { date: "Date TBA", time: "Time TBA" };
  return {
    date: new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    }).format(date),
    time: new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
    }).format(date),
  };
}

function formatEventTimeRange(startLocal?: string | null, endLocal?: string | null) {
  const start = formatEventDateParts(startLocal).time;
  if (!endLocal) return start;
  const end = formatEventDateParts(endLocal).time;
  if (start === "Time TBA") return end;
  return `${start} - ${end}`;
}

function getEventType(event: EventbriteEvent): SiteEvent["type"] {
  const normalized = event.format?.name_localized?.toLowerCase() || "";
  const title = event.name?.text?.toLowerCase() || "";
  if (normalized.includes("training")) return "Training";
  if (normalized.includes("workshop") || normalized.includes("class")) return "Workshop";
  if (normalized.includes("network") || normalized.includes("meeting")) return "Community";
  if (title.includes("circle") || title.includes("conversation") || title.includes("talk")) return "Conversation";
  return "Event";
}

function getEventEmoji(type: SiteEvent["type"]) {
  switch (type) {
    case "Workshop": return "✍️";
    case "Training": return "🌱";
    case "Conversation": return "🕯️";
    case "Community": return "🤝";
    default: return "📅";
  }
}

function getEventLocation(event: EventbriteEvent) {
  if (event.online_event) return "Online";
  return (
    event.venue?.name ||
    event.venue?.address?.localized_area_display ||
    event.venue?.address?.localized_address_display ||
    event.venue?.address?.city ||
    "Location TBA"
  );
}

function getEventImage(event: EventbriteEvent) {
  return event.logo?.original?.url || event.logo?.url || null;
}

function getDurationLabel(startLocal?: string | null, endLocal?: string | null) {
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

function normalizeEventbriteEvent(event: EventbriteEvent, index: number): SiteEvent {
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
    imageUrl: getEventImage(event),
  };
}

export async function getEventsForSite() {
  const config = getEventbriteConfig();
  if (!config.token) {
    return { events: fallbackEvents, source: "fallback" as const, configured: false };
  }
  const organizationId = await resolveOrganizationId(config.token, config.organizationId);
  if (!organizationId) throw new Error("No Eventbrite organization was found for this token.");

  const url = new URL(`${EVENTBRITE_BASE_URL}/organizations/${organizationId}/events/`);
  url.searchParams.set("status", config.status);
  url.searchParams.set("expand", "venue,format,logo");
  url.searchParams.set("order_by", "start_asc");

  const data = await eventbriteFetch<EventbriteListResponse>(url.toString(), config.token);
  const events = (data.events || []).map(normalizeEventbriteEvent);
  return { events, source: "eventbrite" as const, configured: true };
}

export async function getEventForSite(eventId: string) {
  const { events } = await getEventsForSite();
  return events.find((event) => event.id === eventId) ?? null;
}

export async function getEventDetailsForSite(eventId: string): Promise<SiteEventDetails | null> {
  const { token } = getEventbriteConfig();
  if (!token) return null;

  const eventUrl = new URL(`${EVENTBRITE_BASE_URL}/events/${eventId}/`);
  eventUrl.searchParams.set("expand", "organizer,venue,format,refund_policy,ticket_availability,logo");

  const [event, description] = await Promise.all([
    eventbriteFetch<EventbriteEvent>(eventUrl.toString(), token),
    eventbriteFetch<EventbriteDescriptionResponse>(`${EVENTBRITE_BASE_URL}/events/${eventId}/description/`, token),
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
    durationLabel: getDurationLabel(event.start?.local, event.end?.local),
  };
}
