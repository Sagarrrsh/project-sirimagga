import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { OperationType, db, handleFirestoreError } from './firebase';
import type { OrderStatus } from '../types';

export interface TriggerNotificationInput {
  orderId: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  recipientEmail: string;
  eventStatus: OrderStatus;
  totalAmount: number;
  courierName?: string;
  trackingNumber?: string;
}

export async function triggerOrderEmailNotification(input: TriggerNotificationInput) {
  let deliveryState: 'sent_smtp' | 'queued_cloud_function' | 'failed' = 'queued_cloud_function';
  let subject = `SIRIMAGGA Order ${input.orderNumber}: ${input.eventStatus}`;
  let previewText = `Order ${input.orderNumber} updated to ${input.eventStatus}.`;
  let providerMessage = 'Logged for Cloud Function / SMTP dispatch.';

  try {
    const res = await fetch('/api/notifications/order-status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderNumber: input.orderNumber,
        customerName: input.customerName,
        recipientEmail: input.recipientEmail,
        status: input.eventStatus,
        totalAmount: input.totalAmount,
        courierName: input.courierName,
        trackingNumber: input.trackingNumber,
      }),
    });

    if (res.ok) {
      const data = (await res.json()) as {
        deliveryState?: 'sent_smtp' | 'queued_cloud_function' | 'failed';
        subject?: string;
        previewText?: string;
        providerMessage?: string;
      };
      if (data.deliveryState) deliveryState = data.deliveryState;
      if (data.subject) subject = data.subject;
      if (data.previewText) previewText = data.previewText;
      if (data.providerMessage) providerMessage = data.providerMessage;
    }
  } catch {
    // Keep queued_cloud_function fallback if network call fails
  }

  const notificationId = `ntf_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  const path = `email_notifications/${notificationId}`;
  try {
    await setDoc(doc(db, 'email_notifications', notificationId), {
      orderId: input.orderId,
      orderNumber: input.orderNumber,
      customerId: input.customerId,
      recipientEmail: input.recipientEmail.trim().slice(0, 160),
      eventStatus: input.eventStatus,
      subject: subject.slice(0, 200),
      previewText: previewText.slice(0, 1200),
      deliveryState,
      providerMessage: providerMessage.slice(0, 300),
      createdAt: serverTimestamp(),
    });
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, path);
  }

  return { deliveryState, subject };
}
