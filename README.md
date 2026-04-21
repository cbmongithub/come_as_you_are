# come-as-you-are

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run
```

This project was created using `bun init` in bun v1.2.21. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.

## Eventbrite setup

Copy `.env.example` to `.env.local` and fill in:

- `EVENTBRITE_PRIVATE_TOKEN` or `EVENTBRITE_API_KEY`
- `EVENTBRITE_ORGANIZATION_ID` is optional and only needed if you want to pin a specific org
- `EVENTBRITE_EVENT_STATUS` defaults to `live`

The site exposes a read-only events route at `/api/events` and the events page will use Eventbrite data automatically when those variables are present.

## Booking setup

The custom booking flow will use Stripe Checkout first, then Google Calendar availability after payment confirmation.

Required Stripe values:

- `STRIPE_PUBLISHABLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PRICE_60_MIN_DEEP_DIVE_SESSION`
- `STRIPE_PRICE_ONGOING_WEEKLY_SUPPORT_MONTHLY`
- `STRIPE_PRICE_30_MIN_SUPPORT_CLARITY_SESSION`
- `STRIPE_PRICE_EMERGENCY_SAME_DAY_SUPPORT_SESSION`

Webhook endpoint path:

- Local: `http://localhost:3000/api/stripe/webhook`
- Production: `https://yourdomain.com/api/stripe/webhook`

Required Google Calendar values:

- `GOOGLE_CALENDAR_ID`
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `GOOGLE_PRIVATE_KEY`
- `GOOGLE_CALENDAR_TIME_ZONE`
- `BOOKING_DURATION_MINUTES`

Optional booking email values:

- `RESEND_API_KEY`
- `BOOKING_EMAIL_FROM`
- `BOOKING_EMAIL_REPLY_TO`
