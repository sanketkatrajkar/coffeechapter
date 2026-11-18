# The Coffee Chapter

Responsive cafe website built with React and Vite, with a Node.js reservation API.

## Run locally

```sh
npm install
npm run dev
```

The development command starts the Vite website and the reservation API. The website proxies `/api` requests to the API on port `3001`.

## WhatsApp reservation setup

The reservation form asks for a guest's name, WhatsApp number, date, time, and party size. The only outlet is Karvenagar. The guest verifies their number through Twilio Verify over WhatsApp; after successful verification, the API sends the booking request to the configured owner WhatsApp number. Requests are not represented as confirmed reservations: the cafe must confirm availability with the guest.

1. Copy `.env.example` to `.env`.
2. Set `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, and `TWILIO_VERIFY_SERVICE_SID` using your Twilio account and Verify service.
3. Configure `TWILIO_WHATSAPP_FROM` with your approved Twilio WhatsApp sender and `OWNER_WHATSAPP_NUMBER` in E.164 format (including `+` and country code).
4. Ensure WhatsApp is enabled for the Verify service and the sender/recipient are configured and opted in. Twilio may require an approved WhatsApp template for business-initiated owner notifications.
5. Run `npm run dev` again.

Do not commit `.env` or expose Twilio credentials in browser code. Without provider configuration, the API returns an explicit setup error and does not pretend a code was sent or a booking was made. Verification requests are rate limited. Pending booking details are held in server memory for ten minutes, so complete verification while the API is running.

`BUSINESS_TIME_ZONE` defaults to `Asia/Kolkata` and is used to reject past booking times. No opening hours or live table availability have been configured; the cafe confirms availability after receiving a verified request.

## Production

```sh
npm run build
npm start
```

The Node server serves the built website and API from the same origin. Configure the environment variables in the hosting provider rather than committing secrets.

## Checks

```sh
npm run test:server
npm run lint
npm run build
```
