export type AvailabilityStatus = 'Available' | 'Made to Order' | 'Out of Stock';

export type OrderStatus =
  | 'Order Placed'
  | 'Confirmed'
  | 'Quality Inspection'
  | 'Packaging in Progress'
  | 'Ready to Dispatch'
  | 'Shipped'
  | 'Delivered'
  | 'Unavailable - Action Needed'
  | 'Cancelled';

export type InternalProcurementStage =
  | 'Pending Availability Check'
  | 'Availability Confirmed'
  | 'Procurement Ordered'
  | 'Received from Manufacturer'
  | 'Inspection Passed'
  | 'Packaging'
  | 'Dispatched'
  | 'Manufacturer Unavailable';

export type PaymentMethod = 'UPI' | 'Card' | 'NetBanking' | 'COD';
export type PaymentStatus = 'Pending' | 'Test Mode - Authorised' | 'Paid' | 'Refunded';

export interface Product {
  id: string;
  title: string;
  slug: string;
  productCode: string;
  description: string;
  category: string;
  sareeType: string;
  fabricInfo: string;
  sareeLength: string;
  blousePieceInfo?: string;
  careInstructions: string;
  sellingPrice: number;
  originalPrice?: number;
  discountPercent?: number;
  colorOptions: string[];
  images: string[];
  availabilityStatus: AvailabilityStatus;
  estimatedDispatchDays?: string;
  isBestseller: boolean;
  isNewArrival: boolean;
  popularityScore: number;
  isDemo: boolean;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  displayOrder: number;
  isActive: boolean;
}

export interface Discount {
  id: string;
  code: string;
  description?: string;
  discountType: 'percentage' | 'flat';
  value: number;
  minOrderAmount: number;
  isActive: boolean;
  createdAt?: unknown;
}

export interface StoreSetting {
  freeShippingThreshold: number;
  standardShippingFee: number;
  estimatedDeliveryWindow: string;
  updatedAt?: unknown;
}

export type ReviewModerationStatus = 'pending' | 'approved' | 'rejected';

export interface Review {
  id: string;
  customerName: string;
  city: string;
  sareePurchased?: string;
  productId?: string;
  productCode?: string;
  productTitle?: string;
  rating: number;
  comment: string;
  status: ReviewModerationStatus;
  moderatorNote?: string;
  moderatedAt?: unknown;
  isDemo: boolean;
  userId?: string;
  createdAt?: unknown;
}

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  phone?: string;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface CustomerAddress {
  id: string;
  userId: string;
  label: string;
  recipientName: string;
  phone: string;
  addressLine: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
  createdAt?: unknown;
}

export interface CartItem {
  productId: string;
  productCode: string;
  slug: string;
  title: string;
  color: string;
  quantity: number;
  unitPrice: number;
  image: string;
}

export interface OrderItem {
  productId: string;
  productCode: string;
  title: string;
  color: string;
  quantity: number;
  unitPrice: number;
  image: string;
}

export interface ShippingAddressSnapshot {
  addressLine: string;
  city: string;
  state: string;
  pincode: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: ShippingAddressSnapshot;
  items: OrderItem[];
  subtotal: number;
  shippingCharge: number;
  discountCode?: string;
  discountAmount: number;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  paymentReference?: string;
  status: OrderStatus;
  courierName?: string;
  trackingNumber?: string;
  customerNote?: string;
  loyaltyPointsEarned?: number;
  loyaltyPointsRedeemed?: number;
  loyaltyDiscountAmount?: number;
  loyaltyVoucherCode?: string;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface OrderTracking {
  id?: string;
  orderNumber: string;
  customerId: string;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  courierName?: string;
  trackingNumber?: string;
  itemCount: number;
  itemTitles: string[];
  destinationCityState: string;
  totalAmount: number;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface EmailNotification {
  id: string;
  orderId: string;
  orderNumber: string;
  customerId: string;
  recipientEmail: string;
  eventStatus: string;
  subject: string;
  previewText: string;
  deliveryState: 'sent_smtp' | 'queued_cloud_function' | 'failed';
  providerMessage?: string;
  createdAt?: unknown;
}

export interface OrderProcurement {
  id: string;
  orderId: string;
  orderNumber: string;
  internalStage: InternalProcurementStage;
  manufacturerId?: string;
  manufacturerName?: string;
  manufacturerPhone?: string;
  productCodes?: string[];
  sellingTotal: number;
  manufacturerPurchaseCost: number;
  packagingCost: number;
  shippingCost: number;
  paymentGatewayFee: number;
  otherVariableCost: number;
  grossMargin: number;
  netContribution: number;
  procurementNotes?: string;
  alternativeOffered?: string;
  updatedAt?: unknown;
}

export interface Manufacturer {
  id: string;
  name: string;
  location: string;
  contactPerson?: string;
  phone: string;
  assignedProductCodes: string[];
  purchasePricesByCode?: Record<string, number>;
  availabilityNotes?: string;
  isActive: boolean;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface AdminCostSetting {
  defaultPackagingCost: number;
  defaultShippingCost: number;
  gatewayFeePercent: number;
  defaultOtherVariableCost: number;
  updatedAt?: unknown;
}

export type LoyaltyTierId = 'bronze' | 'gold' | 'royal';
export type LoyaltyTransactionType = 'earn' | 'redeem' | 'voucher_issued';

export interface LoyaltySummary {
  userId: string;
  pointsBalance: number;
  lifetimeEarned: number;
  totalRedeemed: number;
  updatedAt?: unknown;
}

export interface LoyaltyTransaction {
  id: string;
  userId: string;
  type: LoyaltyTransactionType;
  points: number;
  rupeeValue: number;
  orderId?: string;
  orderNumber?: string;
  voucherCode?: string;
  description: string;
  createdAt?: unknown;
}

export interface LoyaltyVoucher {
  id: string;
  userId: string;
  code: string;
  pointsUsed: number;
  discountValue: number;
  minOrderAmount: number;
  status: 'active' | 'used';
  usedOrderId?: string;
  createdAt?: unknown;
  usedAt?: unknown;
}
