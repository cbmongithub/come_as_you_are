import { createSign } from "node:crypto";

interface GoogleServiceAccountCredentials {
  client_email: string;
  private_key: string;
}

interface GoogleTokenResponse {
  access_token?: string;
  error?: string;
  error_description?: string;
}

const googleTokenUrl = "https://oauth2.googleapis.com/token";
const googleCalendarScope = "https://www.googleapis.com/auth/calendar";

function base64UrlJson(value: unknown) {
  return Buffer.from(JSON.stringify(value)).toString("base64url");
}

function normalizePrivateKey(privateKey: string) {
  return privateKey.replace(/\\n/g, "\n");
}

async function loadCredentialsFromDevFile(filePath: string) {
  if (process.env.NODE_ENV === "production") {
    return null;
  }

  const [{ readFile }, path] = await Promise.all([
    import("node:fs/promises"),
    import("node:path"),
  ]);
  const absolutePath = path.isAbsolute(filePath)
    ? filePath
    : path.join(/* turbopackIgnore: true */ process.cwd(), filePath);
  const raw = await readFile(absolutePath, "utf8");
  const parsed = JSON.parse(raw) as Partial<GoogleServiceAccountCredentials>;

  if (!parsed.client_email || !parsed.private_key) {
    throw new Error("Google service account key file is missing required fields.");
  }

  return {
    client_email: parsed.client_email,
    private_key: parsed.private_key,
  };
}

async function loadGoogleServiceAccountCredentials() {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;

  if (clientEmail && privateKey) {
    return {
      client_email: clientEmail,
      private_key: privateKey,
    };
  }

  const keyFile = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_FILE || "google-calendar.json";
  const devFileCredentials = await loadCredentialsFromDevFile(keyFile);

  if (devFileCredentials) {
    return devFileCredentials;
  }

  throw new Error(
    "Missing Google credentials. Set GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_PRIVATE_KEY.",
  );
}

async function getGoogleAccessToken() {
  const credentials = await loadGoogleServiceAccountCredentials();
  const now = Math.floor(Date.now() / 1000);
  const header = base64UrlJson({ alg: "RS256", typ: "JWT" });
  const payload = base64UrlJson({
    iss: credentials.client_email,
    scope: googleCalendarScope,
    aud: googleTokenUrl,
    exp: now + 3600,
    iat: now,
  });
  const signingInput = `${header}.${payload}`;
  const signer = createSign("RSA-SHA256");
  signer.update(signingInput);
  signer.end();
  const signature = signer
    .sign(normalizePrivateKey(credentials.private_key))
    .toString("base64url");
  const assertion = `${signingInput}.${signature}`;

  const response = await fetch(googleTokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });
  const token = (await response.json()) as GoogleTokenResponse;

  if (!response.ok || !token.access_token) {
    throw new Error(
      token.error_description || token.error || "Failed to authorize Google Calendar.",
    );
  }

  return {
    accessToken: token.access_token,
    serviceAccountEmail: credentials.client_email,
  };
}

export async function getGoogleCalendarHealth() {
  const calendarId = process.env.GOOGLE_CALENDAR_ID;

  if (!calendarId) {
    throw new Error("Missing GOOGLE_CALENDAR_ID.");
  }

  const { accessToken, serviceAccountEmail } = await getGoogleAccessToken();
  const response = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
      calendarId,
    )}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  const calendar = (await response.json()) as {
    summary?: string;
    timeZone?: string;
    error?: {
      message?: string;
    };
  };

  if (!response.ok) {
    throw new Error(
      calendar.error?.message ||
        "Google Calendar rejected access to the configured calendar.",
    );
  }

  return {
    calendarId,
    serviceAccountEmail,
    summary: calendar.summary,
    timeZone: calendar.timeZone,
  };
}

interface GoogleFreeBusyResponse {
  calendars?: Record<
    string,
    {
      busy?: Array<{
        start: string;
        end: string;
      }>;
    }
  >;
  error?: {
    message?: string;
  };
}

interface GoogleCalendarEventResponse {
  id?: string;
  htmlLink?: string;
  error?: {
    message?: string;
  };
}

export interface BookingSlot {
  start: string;
  end: string;
  label: string;
}

export interface CreateBookingEventInput {
  start: string;
  end: string;
  summary: string;
  description: string;
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

function getDatePartsInTimeZone(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const byType = Object.fromEntries(parts.map((part) => [part.type, part.value]));

  return {
    year: Number(byType.year),
    month: Number(byType.month),
    day: Number(byType.day),
    hour: Number(byType.hour),
    minute: Number(byType.minute),
    second: Number(byType.second),
  };
}

function zonedDateTimeToUtc(
  date: string,
  hour: number,
  minute: number,
  timeZone: string,
) {
  const [year, month, day] = date.split("-").map(Number);
  const utcGuess = new Date(Date.UTC(year, month - 1, day, hour, minute, 0));
  const parts = getDatePartsInTimeZone(utcGuess, timeZone);
  const zonedAsUtc = Date.UTC(
    parts.year,
    parts.month - 1,
    parts.day,
    parts.hour,
    parts.minute,
    parts.second,
  );
  const targetAsUtc = Date.UTC(year, month - 1, day, hour, minute, 0);

  return new Date(utcGuess.getTime() + (targetAsUtc - zonedAsUtc));
}

function addMinutes(date: Date, minutes: number) {
  return new Date(date.getTime() + minutes * 60_000);
}

function overlapsBusy(start: Date, end: Date, busy: Array<{ start: string; end: string }>) {
  return busy.some((busyBlock) => {
    const busyStart = new Date(busyBlock.start);
    const busyEnd = new Date(busyBlock.end);

    return start < busyEnd && end > busyStart;
  });
}

function formatSlotLabel(start: Date, timeZone: string) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
  }).format(start);
}

export async function getBookingAvailability({
  date,
  durationMinutes,
}: {
  date: string;
  durationMinutes: number;
}) {
  const calendarId = getCalendarId();
  const timeZone = getBookingTimeZone();
  const { accessToken } = await getGoogleAccessToken();
  const dayStart = zonedDateTimeToUtc(date, 0, 0, timeZone);
  const dayEnd = zonedDateTimeToUtc(date, 23, 59, timeZone);
  const response = await fetch("https://www.googleapis.com/calendar/v3/freeBusy", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      timeMin: dayStart.toISOString(),
      timeMax: dayEnd.toISOString(),
      timeZone,
      items: [{ id: calendarId }],
    }),
  });
  const freeBusy = (await response.json()) as GoogleFreeBusyResponse;

  if (!response.ok) {
    throw new Error(
      freeBusy.error?.message || "Google Calendar availability lookup failed.",
    );
  }

  const busy = freeBusy.calendars?.[calendarId]?.busy || [];
  const slots: BookingSlot[] = [];
  const now = new Date();
  const closingTime = zonedDateTimeToUtc(date, 17, 0, timeZone);

  for (let hour = 9; hour < 17; hour += 1) {
    for (const minute of [0, 30]) {
      const start = zonedDateTimeToUtc(date, hour, minute, timeZone);
      const end = addMinutes(start, durationMinutes);

      if (start <= now || end > closingTime) {
        continue;
      }

      if (!overlapsBusy(start, end, busy)) {
        slots.push({
          start: start.toISOString(),
          end: end.toISOString(),
          label: formatSlotLabel(start, timeZone),
        });
      }
    }
  }

  return {
    date,
    timeZone,
    durationMinutes,
    slots,
  };
}

export async function createBookingCalendarEvent(input: CreateBookingEventInput) {
  const calendarId = getCalendarId();
  const timeZone = getBookingTimeZone();
  const { accessToken } = await getGoogleAccessToken();
  const response = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
      calendarId,
    )}/events?sendUpdates=all`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        summary: input.summary,
        description: input.description,
        start: {
          dateTime: input.start,
          timeZone,
        },
        end: {
          dateTime: input.end,
          timeZone,
        },
      }),
    },
  );
  const event = (await response.json()) as GoogleCalendarEventResponse;

  if (!response.ok || !event.id) {
    throw new Error(event.error?.message || "Google Calendar event creation failed.");
  }

  return {
    id: event.id,
    htmlLink: event.htmlLink,
  };
}
