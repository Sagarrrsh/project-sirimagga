import { initializeApp } from 'firebase-admin/app';
import { FieldValue, getFirestore } from 'firebase-admin/firestore';
import { logger } from 'firebase-functions';
import { defineSecret, defineString } from 'firebase-functions/params';
import { onDocumentCreated, onDocumentUpdated } from 'firebase-functions/v2/firestore';
import nodemailer from 'nodemailer';

initializeApp();

const DATABASE_ID = 'ai-studio-81d0b765-4edd-4474-b870-a982e29713d4';
const db = getFirestore(DATABASE_ID);

const SMTP_HOST = defineSecret('SMTP_HOST');
const SMTP_PORT = defineString('SMTP_PORT', { default: '587' });
const SMTP_USER = defineSecret('SMTP_USER');
const SMTP_PASS = defineSecret('SMTP_PASS');
const FROM_EMAIL = defineString('FROM_EMAIL', {
  default: 'SIRIMAGGA <orders@sirimagga.example>',
});
const STOREFRONT_URL = defineString('STOREFRONT_URL', {
  default: 'https://ais-pre-ylx65e4iro6go4bhm4nhek-297876132160.asia-east1.run.app',
});

interface OrderData {
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  totalAmount: number;
  status: string;
  courierName?: string;
  trackingNumber?: string;
}

const STATUS_COPY: Record<string, { headline: string; message: string }> = {
  'Order Placed': {
    headline: 'We have received your SIRIMAGGA order',
    message:
      'Thank you for choosing SIRIMAGGA. Our team in Bagalkot District is confirming availability before preparing your saree for inspection.',
  },
  Confirmed: {
    headline: 'Your order is confirmed',
    message:
      'Availability is confirmed and your saree is being prepared for our individual quality inspection.',
  },
  'Quality Inspection': {
    headline: 'Your saree is undergoing quality inspection',
    message:
      'Every weave, border, and finish is being carefully inspected before tagging and signature SIRIMAGGA packaging.',
  },
  'Packaging in Progress': {
    headline: 'Signature SIRIMAGGA packaging in progress',
    message:
      'Your saree passed inspection and is now being tagged and folded in protective boutique packaging.',
  },
  'Ready to Dispatch': {
    headline: 'Your parcel is ready to dispatch',
    message:
      'Your SIRIMAGGA parcel is packed and scheduled for courier handover.',
  },
  Shipped: {
    headline: 'Your SIRIMAGGA saree has been shipped',
    message:
      'Your order is on its way across India. Use the courier details below or our live Track Order page to follow delivery.',
  },
  Delivered: {
    headline: 'Your SIRIMAGGA order has been delivered',
    message:
      'We hope this Karnataka weave brings lasting grace to your wardrobe. Thank you for shopping with SIRIMAGGA.',
  },
  'Unavailable - Action Needed': {
    headline: 'Update regarding your SIRIMAGGA order',
    message:
      'One of the items in your order requires confirmation. Our customer care team will reach out shortly with an alternative or full refund option.',
  },
  Cancelled: {
    headline: 'Your SIRIMAGGA order has been cancelled',
    message:
      'As confirmed, this order has been cancelled. Any applicable refund will be processed to your original payment method.',
  },
};

function buildOrderEmail(order: OrderData, baseUrl: string) {
  const copy = STATUS_COPY[order.status] || {
    headline: `Order status updated to ${order.status}`,
    message: `Your SIRIMAGGA order ${order.orderNumber} is now in stage: ${order.status}.`,
  };

  const trackUrl = `${baseUrl}/track-order?orderId=${encodeURIComponent(
    order.orderNumber
  )}&email=${encodeURIComponent(order.customerEmail)}`;

  const subject = `SIRIMAGGA Order ${order.orderNumber}: ${order.status}`;
  const formattedTotal = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(order.totalAmount || 0);

  const trackingBlockHtml =
    order.courierName || order.trackingNumber
      ? `<p style="margin:16px 0;padding:12px 16px;background:#FAF6EE;border:1px solid #B18A4A;border-radius:6px;font-size:14px;color:#332821;">
           <strong>Courier:</strong> ${order.courierName || 'Partner Courier'}<br/>
           ${order.trackingNumber ? `<strong>Tracking Number:</strong> ${order.trackingNumber}` : ''}
         </p>`
      : '';

  const html = `
    <div style="background:#F5EFE4;padding:32px 16px;font-family:Georgia,serif;color:#332821;">
      <div style="max-width:580px;margin:0 auto;background:#FFFFFF;border:1px solid #B18A4A;border-radius:8px;overflow:hidden;">
        <div style="background:#651D2D;color:#F5EFE4;padding:20px 28px;text-align:center;">
          <div style="font-size:22px;letter-spacing:2px;font-weight:bold;">SIRIMAGGA</div>
          <div style="font-size:12px;opacity:0.9;margin-top:4px;">Traditional Weaves from Bagalkot · Karnataka</div>
        </div>
        <div style="padding:28px;font-family:Arial,sans-serif;line-height:1.6;">
          <p style="font-size:14px;margin-top:0;">Namaskara ${order.customerName},</p>
          <h1 style="font-family:Georgia,serif;font-size:22px;color:#651D2D;margin:8px 0 12px;">${copy.headline}</h1>
          <p style="font-size:14px;color:#332821;">${copy.message}</p>
          <p style="font-size:14px;margin:16px 0;">
            <strong>Order ID:</strong> ${order.orderNumber}<br/>
            <strong>Current Status:</strong> ${order.status}<br/>
            <strong>Order Total:</strong> ${formattedTotal}
          </p>
          ${trackingBlockHtml}
          <div style="margin:24px 0;">
            <a href="${trackUrl}" style="display:inline-block;background:#651D2D;color:#F5EFE4;text-decoration:none;padding:12px 22px;border-radius:6px;font-size:14px;font-weight:bold;">
              Track Order Live
            </a>
          </div>
          <p style="font-size:12px;color:#6A5A4E;border-top:1px solid #E5D9C5;padding-top:16px;margin-bottom:0;">
            SIRIMAGGA · Bagalkot District, Karnataka, India
          </p>
        </div>
      </div>
    </div>
  `;

  const text = [
    `Namaskara ${order.customerName},`,
    '',
    copy.headline,
    copy.message,
    '',
    `Order ID: ${order.orderNumber}`,
    `Status: ${order.status}`,
    `Total: ${formattedTotal}`,
    order.courierName ? `Courier: ${order.courierName}` : '',
    order.trackingNumber ? `Tracking Number: ${order.trackingNumber}` : '',
    `Track your order: ${trackUrl}`,
  ]
    .filter(Boolean)
    .join('\n');

  return { subject, html, text, previewText: copy.message };
}

async function dispatchAndLogNotification(orderId: string, order: OrderData) {
  const { subject, html, text, previewText } = buildOrderEmail(order, STOREFRONT_URL.value());
  const host = SMTP_HOST.value();
  const user = SMTP_USER.value();
  const pass = SMTP_PASS.value();
  const port = Number(SMTP_PORT.value() || 587);

  let deliveryState: 'sent_smtp' | 'queued_cloud_function' | 'failed' = 'queued_cloud_function';
  let providerMessage = 'Cloud Function triggered; configure SMTP secrets to dispatch live email.';

  if (host && user && pass) {
    try {
      const transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
      });
      const info = await transporter.sendMail({
        from: FROM_EMAIL.value(),
        to: order.customerEmail,
        subject,
        text,
        html,
      });
      deliveryState = 'sent_smtp';
      providerMessage = `Message ID: ${info.messageId}`;
    } catch (err) {
      deliveryState = 'failed';
      providerMessage = err instanceof Error ? err.message.slice(0, 280) : 'SMTP delivery failed';
      logger.error('Failed to send order status email', err);
    }
  }

  const notifId = `fn_${orderId}_${Date.now()}`;
  await db.collection('email_notifications').doc(notifId).set({
    orderId,
    orderNumber: order.orderNumber,
    customerId: order.customerId,
    recipientEmail: order.customerEmail,
    eventStatus: order.status,
    subject: subject.slice(0, 200),
    previewText: previewText.slice(0, 1200),
    deliveryState,
    providerMessage: providerMessage.slice(0, 300),
    createdAt: FieldValue.serverTimestamp(),
  });
}

export const onOrderCreated = onDocumentCreated(
  {
    document: 'orders/{orderId}',
    database: DATABASE_ID,
    secrets: [SMTP_HOST, SMTP_USER, SMTP_PASS],
  },
  async (event) => {
    const data = event.data?.data() as OrderData | undefined;
    if (!data || !data.customerEmail) return;
    await dispatchAndLogNotification(event.params.orderId, data);
  }
);

export const onOrderStatusUpdated = onDocumentUpdated(
  {
    document: 'orders/{orderId}',
    database: DATABASE_ID,
    secrets: [SMTP_HOST, SMTP_USER, SMTP_PASS],
  },
  async (event) => {
    const before = event.data?.before.data() as OrderData | undefined;
    const after = event.data?.after.data() as OrderData | undefined;
    if (!before || !after || !after.customerEmail) return;

    const statusChanged = before.status !== after.status;
    const trackingAdded =
      !before.trackingNumber && Boolean(after.trackingNumber);

    if (!statusChanged && !trackingAdded) return;
    await dispatchAndLogNotification(event.params.orderId, after);
  }
);
