# SIRIMAGGA Order Status Email Cloud Functions

This directory contains the Firebase Cloud Functions (v2) Firestore triggers bound to database `ai-studio-81d0b765-4edd-4474-b870-a982e29713d4`:

- `onOrderCreated`: Sends an automated confirmation email when a customer places an order in `orders/{orderId}`.
- `onOrderStatusUpdated`: Sends a branded SIRIMAGGA email whenever `status` changes (e.g., `Confirmed`, `Quality Inspection`, `Packaging in Progress`, `Ready to Dispatch`, `Shipped`, `Delivered`, `Unavailable - Action Needed`, `Cancelled`) or a tracking number is added.
- Records delivery results in `email_notifications/{notificationId}` without exposing internal manufacturer or cost information.

## Deployment Commands

1. Install dependencies & build:
   ```bash
   cd functions && npm install && npm run build
   ```
2. Configure SMTP secrets in Firebase:
   ```bash
   firebase functions:secrets:set SMTP_HOST
   firebase functions:secrets:set SMTP_USER
   firebase functions:secrets:set SMTP_PASS
   ```
3. Deploy functions to project `gen-lang-client-0040876958`:
   ```bash
   firebase deploy --only functions --project gen-lang-client-0040876958
   ```
