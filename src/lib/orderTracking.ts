import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { OperationType, db, handleFirestoreError } from './firebase';
import type { Order, OrderStatus, PaymentStatus } from '../types';

export async function computeTrackingId(orderNumber: string, email: string): Promise<string> {
  const normalized = `${orderNumber.trim().toUpperCase()}::${email.trim().toLowerCase()}`;
  const encoded = new TextEncoder().encode(normalized);
  const hashBuffer = await crypto.subtle.digest('SHA-256', encoded);
  const hashHex = Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  return `trk_${hashHex}`;
}

export function buildOrderItemTitles(items: Order['items']): string[] {
  return items.slice(0, 25).map(
    (item) => `${item.title} (${item.color}) × ${item.quantity}`.slice(0, 140)
  );
}

export async function syncOrderTrackingForAdmin(
  order: Order,
  nextStatus: OrderStatus,
  updates?: {
    courierName?: string;
    trackingNumber?: string;
    paymentStatus?: PaymentStatus;
  }
) {
  const trackingId = await computeTrackingId(order.orderNumber, order.customerEmail);
  const path = `order_tracking/${trackingId}`;
  const docRef = doc(db, 'order_tracking', trackingId);

  const courier = updates?.courierName?.trim() || order.courierName?.trim() || '';
  const trackingNo = updates?.trackingNumber?.trim() || order.trackingNumber?.trim() || '';
  const paymentStatus = updates?.paymentStatus || order.paymentStatus;
  const itemCount = Math.max(
    1,
    Math.min(100, order.items.reduce((sum, i) => sum + i.quantity, 0))
  );

  try {
    const snap = await getDoc(docRef);
    const payload: Record<string, unknown> = {
      orderNumber: order.orderNumber,
      customerId: order.customerId,
      status: nextStatus,
      paymentMethod: order.paymentMethod,
      paymentStatus,
      ...(courier ? { courierName: courier.slice(0, 100) } : {}),
      ...(trackingNo ? { trackingNumber: trackingNo.slice(0, 100) } : {}),
      itemCount,
      itemTitles: buildOrderItemTitles(order.items),
      destinationCityState: `${order.shippingAddress.city}, ${order.shippingAddress.state}`.slice(
        0,
        160
      ),
      totalAmount: order.totalAmount,
      updatedAt: serverTimestamp(),
    };

    if (snap.exists()) {
      await updateDoc(docRef, payload);
    } else {
      await setDoc(docRef, {
        ...payload,
        createdAt: serverTimestamp(),
      });
    }
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}
