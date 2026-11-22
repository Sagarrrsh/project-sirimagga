import { useState } from 'react';
import { doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { AlertTriangle, CheckCircle2, Mail, Phone, Truck } from 'lucide-react';
import { formatINR } from '../../data/demoData';
import { OperationType, db, handleFirestoreError } from '../../lib/firebase';
import { triggerOrderEmailNotification } from '../../lib/notifications';
import { syncOrderTrackingForAdmin } from '../../lib/orderTracking';
import type {
  AdminCostSetting,
  InternalProcurementStage,
  Manufacturer,
  Order,
  OrderProcurement,
  OrderStatus,
} from '../../types';

interface AdminOrdersTabProps {
  orders: Order[];
  procurements: Record<string, OrderProcurement>;
  manufacturers: Manufacturer[];
  costSettings: AdminCostSetting;
  onShowToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

const CUSTOMER_STATUS_OPTIONS: OrderStatus[] = [
  'Order Placed',
  'Confirmed',
  'Quality Inspection',
  'Packaging in Progress',
  'Ready to Dispatch',
  'Shipped',
  'Delivered',
  'Unavailable - Action Needed',
  'Cancelled',
];

const INTERNAL_STAGES: InternalProcurementStage[] = [
  'Pending Availability Check',
  'Availability Confirmed',
  'Procurement Ordered',
  'Received from Manufacturer',
  'Inspection Passed',
  'Packaging',
  'Dispatched',
  'Manufacturer Unavailable',
];

export function AdminOrdersTab({
  orders,
  procurements,
  manufacturers,
  costSettings,
  onShowToast,
}: AdminOrdersTabProps) {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(
    orders[0]?.id || null
  );
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [saving, setSaving] = useState(false);

  const selectedOrder =
    orders.find((o) => o.id === selectedOrderId) || orders[0] || null;

  // Build default procurement view if not yet saved in order_procurement
  const getInitialProcurement = (order: Order): OrderProcurement => {
    const existing = procurements[order.id];
    if (existing) return existing;

    const codes = order.items.map((i) => i.productCode);
    const matchedMfg = manufacturers.find((m) =>
      m.assignedProductCodes.some((c) => codes.includes(c))
    );
    const estPurchaseCost = order.items.reduce((sum, item) => {
      const mfgPrice = matchedMfg?.purchasePricesByCode?.[item.productCode];
      const unitCost =
        typeof mfgPrice === 'number' ? mfgPrice : Math.round(item.unitPrice * 0.62);
      return sum + unitCost * item.quantity;
    }, 0);

    const gatewayFee =
      order.paymentMethod === 'COD'
        ? 0
        : Math.round((order.totalAmount * costSettings.gatewayFeePercent) / 100);
    const pkg = costSettings.defaultPackagingCost;
    const ship = costSettings.defaultShippingCost;
    const other = costSettings.defaultOtherVariableCost;
    const grossMargin = order.totalAmount - estPurchaseCost;
    const netContribution = grossMargin - pkg - ship - gatewayFee - other;

    return {
      id: order.id,
      orderId: order.id,
      orderNumber: order.orderNumber,
      internalStage: 'Pending Availability Check',
      manufacturerId: matchedMfg?.id || '',
      manufacturerName: matchedMfg?.name || '',
      manufacturerPhone: matchedMfg?.phone || '',
      productCodes: codes,
      sellingTotal: order.totalAmount,
      manufacturerPurchaseCost: estPurchaseCost,
      packagingCost: pkg,
      shippingCost: ship,
      paymentGatewayFee: gatewayFee,
      otherVariableCost: other,
      grossMargin,
      netContribution,
      procurementNotes: '',
      alternativeOffered: '',
    };
  };

  const [draftProc, setDraftProc] = useState<OrderProcurement | null>(null);
  const [courierName, setCourierName] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [customerStatus, setCustomerStatus] = useState<OrderStatus>('Order Placed');

  const activeOrder = selectedOrder;
  const activeProc =
    draftProc && activeOrder && draftProc.orderId === activeOrder.id
      ? draftProc
      : activeOrder
      ? getInitialProcurement(activeOrder)
      : null;

  const selectOrder = (order: Order) => {
    setSelectedOrderId(order.id);
    setDraftProc(getInitialProcurement(order));
    setCourierName(order.courierName || '');
    setTrackingNumber(order.trackingNumber || '');
    setCustomerStatus(order.status);
  };

  const recalc = (next: OrderProcurement): OrderProcurement => {
    const gross = next.sellingTotal - next.manufacturerPurchaseCost;
    const net =
      gross -
      next.packagingCost -
      next.shippingCost -
      next.paymentGatewayFee -
      next.otherVariableCost;
    return { ...next, grossMargin: gross, netContribution: net };
  };

  const saveWorkflowUpdate = async (
    nextProc: OrderProcurement,
    nextCustomerStatus: OrderStatus,
    extraOrderFields?: Partial<Order>
  ) => {
    if (!activeOrder) return;
    setSaving(true);
    try {
      const computed = recalc(nextProc);
      const procPath = `order_procurement/${activeOrder.id}`;
      try {
        await setDoc(doc(db, 'order_procurement', activeOrder.id), {
          orderId: activeOrder.id,
          orderNumber: activeOrder.orderNumber,
          internalStage: computed.internalStage,
          manufacturerId: computed.manufacturerId || '',
          manufacturerName: computed.manufacturerName || '',
          manufacturerPhone: computed.manufacturerPhone || '',
          productCodes: computed.productCodes || [],
          sellingTotal: Number(computed.sellingTotal),
          manufacturerPurchaseCost: Number(computed.manufacturerPurchaseCost),
          packagingCost: Number(computed.packagingCost),
          shippingCost: Number(computed.shippingCost),
          paymentGatewayFee: Number(computed.paymentGatewayFee),
          otherVariableCost: Number(computed.otherVariableCost),
          grossMargin: Number(computed.grossMargin),
          netContribution: Number(computed.netContribution),
          procurementNotes: (computed.procurementNotes || '').slice(0, 1000),
          alternativeOffered: (computed.alternativeOffered || '').slice(0, 400),
          updatedAt: serverTimestamp(),
        });
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, procPath);
      }

      const orderPath = `orders/${activeOrder.id}`;
      try {
        await updateDoc(doc(db, 'orders', activeOrder.id), {
          status: nextCustomerStatus,
          ...(courierName.trim() ? { courierName: courierName.trim().slice(0, 100) } : {}),
          ...(trackingNumber.trim()
            ? { trackingNumber: trackingNumber.trim().slice(0, 100) }
            : {}),
          ...extraOrderFields,
          updatedAt: serverTimestamp(),
        });
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, orderPath);
      }

      await syncOrderTrackingForAdmin(activeOrder, nextCustomerStatus, {
        courierName: courierName.trim(),
        trackingNumber: trackingNumber.trim(),
        paymentStatus: extraOrderFields?.paymentStatus,
      });

      const effectiveCourier = courierName.trim() || activeOrder.courierName || '';
      const effectiveTracking = trackingNumber.trim() || activeOrder.trackingNumber || '';
      const statusChanged = nextCustomerStatus !== activeOrder.status;
      const trackingAddedOrChanged =
        Boolean(trackingNumber.trim()) &&
        trackingNumber.trim() !== (activeOrder.trackingNumber || '');

      let notifSuffix = '';
      if (statusChanged || trackingAddedOrChanged) {
        const notifRes = await triggerOrderEmailNotification({
          orderId: activeOrder.id,
          orderNumber: activeOrder.orderNumber,
          customerId: activeOrder.customerId,
          customerName: activeOrder.customerName,
          recipientEmail: activeOrder.customerEmail,
          eventStatus: nextCustomerStatus,
          totalAmount: activeOrder.totalAmount,
          ...(effectiveCourier ? { courierName: effectiveCourier } : {}),
          ...(effectiveTracking ? { trackingNumber: effectiveTracking } : {}),
        });
        notifSuffix =
          notifRes.deliveryState === 'sent_smtp'
            ? ' Customer email sent.'
            : ' Customer notification logged.';
      }

      setDraftProc(computed);
      setCustomerStatus(nextCustomerStatus);
      onShowToast(`Saved sourcing & status update for ${activeOrder.orderNumber}.${notifSuffix}`);
    } finally {
      setSaving(false);
    }
  };

  const filteredOrders = orders.filter((o) =>
    statusFilter === 'All' ? true : o.status === statusFilter
  );

  if (orders.length === 0) {
    return (
      <div className="bg-white border border-[#B18A4A]/30 rounded-lg p-12 text-center space-y-2">
        <p className="font-serif-display text-xl text-[#332821]">No customer orders yet</p>
        <p className="text-sm text-[#6A5A4E]">
          Orders placed from the storefront checkout will appear here for manufacturer availability verification, procurement costing, and dispatch.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
      {/* Order Queue Left */}
      <div className="xl:col-span-5 bg-white border border-[#B18A4A]/30 rounded-lg overflow-hidden">
        <div className="p-4 border-b border-[#B18A4A]/20 flex items-center justify-between gap-2 bg-[#FAF6EE]">
          <h2 className="font-serif-display text-base font-semibold text-[#332821]">
            Order Queue ({filteredOrders.length})
          </h2>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-2.5 py-1.5 bg-white border border-[#B18A4A]/35 rounded text-xs"
          >
            <option value="All">All Statuses</option>
            {CUSTOMER_STATUS_OPTIONS.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>

        <div className="divide-y divide-[#B18A4A]/15 max-h-[680px] overflow-y-auto">
          {filteredOrders.map((order) => {
            const proc = procurements[order.id];
            const isSel = activeOrder?.id === order.id;
            return (
              <button
                key={order.id}
                type="button"
                onClick={() => selectOrder(order)}
                className={`w-full text-left p-4 transition-colors ${
                  isSel ? 'bg-[#FAF6EE]' : 'hover:bg-[#FAF6EE]/50'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono-code text-xs font-semibold text-[#651D2D]">
                    {order.orderNumber}
                  </span>
                  <span className="text-sm font-semibold text-[#332821] tabular-nums">
                    {formatINR(order.totalAmount)}
                  </span>
                </div>
                <p className="text-sm font-medium text-[#332821] mt-1">
                  {order.customerName} · {order.shippingAddress.city}
                </p>
                <div className="flex items-center justify-between gap-2 mt-1.5 text-xs text-[#6A5A4E]">
                  <span>{order.status}</span>
                  <span>
                    {proc ? proc.internalStage : 'Needs Availability Check'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Order Sourcing & Profit Workspace Right */}
      {activeOrder && activeProc && (
        <div className="xl:col-span-7 bg-white border border-[#B18A4A]/30 rounded-lg p-6 space-y-6">
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-[#B18A4A]/20">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#6A5A4E]">
                <span className="font-mono-code font-semibold text-[#651D2D]">
                  {activeOrder.orderNumber}
                </span>
                <span>·</span>
                <span>{activeOrder.paymentMethod} ({activeOrder.paymentStatus})</span>
              </div>
              <h3 className="font-serif-display text-xl font-semibold text-[#332821] mt-1">
                {activeOrder.customerName}
              </h3>
              <p className="text-xs text-[#6A5A4E] mt-0.5">
                {activeOrder.shippingAddress.addressLine}, {activeOrder.shippingAddress.city},{' '}
                {activeOrder.shippingAddress.state} – {activeOrder.shippingAddress.pincode}
              </p>
              <div className="flex flex-wrap gap-3 mt-2 text-xs">
                <a
                  href={`tel:${activeOrder.customerPhone}`}
                  className="inline-flex items-center gap-1 text-[#651D2D] hover:underline"
                >
                  <Phone className="w-3.5 h-3.5" /> {activeOrder.customerPhone}
                </a>
                <a
                  href={`mailto:${activeOrder.customerEmail}`}
                  className="inline-flex items-center gap-1 text-[#651D2D] hover:underline"
                >
                  <Mail className="w-3.5 h-3.5" /> {activeOrder.customerEmail}
                </a>
              </div>
            </div>

            <div className="text-right">
              <p className="text-xs text-[#6A5A4E]">Customer Total</p>
              <p className="text-2xl font-bold text-[#332821] tabular-nums">
                {formatINR(activeOrder.totalAmount)}
              </p>
            </div>
          </div>

          {/* Items & Product Codes */}
          <div className="bg-[#FAF6EE] rounded-md p-4 space-y-2 border border-[#B18A4A]/20">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#651D2D]">
              Ordered Sarees & Product Codes
            </p>
            {activeOrder.items.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm">
                <span>
                  <strong className="font-mono-code text-xs">{item.productCode}</strong> · {item.title} ({item.color}) × {item.quantity}
                </span>
                <span className="tabular-nums font-medium">
                  {formatINR(item.unitPrice * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          {/* Quick Sourcing Workflow Step Buttons */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#651D2D]">
              Order-Based Manufacturer Sourcing Workflow
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                disabled={saving}
                onClick={() =>
                  saveWorkflowUpdate(
                    { ...activeProc, internalStage: 'Availability Confirmed' },
                    'Confirmed'
                  )
                }
                className="px-3 py-1.5 bg-[#651D2D] text-[#F5EFE4] text-xs font-medium rounded hover:bg-[#4F1522] inline-flex items-center gap-1"
              >
                <CheckCircle2 className="w-3.5 h-3.5" /> 1. Confirm Available
              </button>
              <button
                type="button"
                disabled={saving}
                onClick={() =>
                  saveWorkflowUpdate(
                    { ...activeProc, internalStage: 'Procurement Ordered' },
                    'Confirmed'
                  )
                }
                className="px-3 py-1.5 border border-[#651D2D] text-[#651D2D] text-xs font-medium rounded hover:bg-[#651D2D]/5"
              >
                2. Procure from Manufacturer
              </button>
              <button
                type="button"
                disabled={saving}
                onClick={() =>
                  saveWorkflowUpdate(
                    { ...activeProc, internalStage: 'Received from Manufacturer' },
                    'Confirmed'
                  )
                }
                className="px-3 py-1.5 border border-[#651D2D] text-[#651D2D] text-xs font-medium rounded hover:bg-[#651D2D]/5"
              >
                3. Mark Received
              </button>
              <button
                type="button"
                disabled={saving}
                onClick={() =>
                  saveWorkflowUpdate(
                    { ...activeProc, internalStage: 'Inspection Passed' },
                    'Quality Inspection'
                  )
                }
                className="px-3 py-1.5 border border-[#651D2D] text-[#651D2D] text-xs font-medium rounded hover:bg-[#651D2D]/5"
              >
                4. Quality Inspected
              </button>
              <button
                type="button"
                disabled={saving}
                onClick={() =>
                  saveWorkflowUpdate(
                    { ...activeProc, internalStage: 'Packaging' },
                    'Packaging in Progress'
                  )
                }
                className="px-3 py-1.5 border border-[#651D2D] text-[#651D2D] text-xs font-medium rounded hover:bg-[#651D2D]/5"
              >
                5. Packaging in Progress
              </button>
              <button
                type="button"
                disabled={saving}
                onClick={() =>
                  saveWorkflowUpdate(
                    { ...activeProc, internalStage: 'Packaging' },
                    'Ready to Dispatch'
                  )
                }
                className="px-3 py-1.5 border border-[#651D2D] text-[#651D2D] text-xs font-medium rounded hover:bg-[#651D2D]/5"
              >
                6. Ready to Dispatch
              </button>
              <button
                type="button"
                disabled={saving}
                onClick={() =>
                  saveWorkflowUpdate(
                    { ...activeProc, internalStage: 'Dispatched' },
                    'Shipped'
                  )
                }
                className="px-3 py-1.5 bg-[#332821] text-[#F5EFE4] text-xs font-medium rounded hover:bg-black inline-flex items-center gap-1"
              >
                <Truck className="w-3.5 h-3.5" /> 7. Mark Shipped
              </button>
              <button
                type="button"
                disabled={saving}
                onClick={() =>
                  saveWorkflowUpdate(
                    { ...activeProc, internalStage: 'Manufacturer Unavailable' },
                    'Unavailable - Action Needed'
                  )
                }
                className="px-3 py-1.5 border border-red-700 text-red-700 text-xs font-medium rounded hover:bg-red-50 inline-flex items-center gap-1"
              >
                <AlertTriangle className="w-3.5 h-3.5" /> Unavailable
              </button>
            </div>
          </div>

          {/* Manufacturer Assignment & Courier Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#B18A4A]/20">
            <div>
              <label className="block text-xs font-medium text-[#332821] mb-1">
                Associated Manufacturer (Admin-Only)
              </label>
              <select
                value={activeProc.manufacturerId || ''}
                onChange={(e) => {
                  const mfg = manufacturers.find((m) => m.id === e.target.value);
                  const autoCost = activeOrder.items.reduce((sum, item) => {
                    const c = mfg?.purchasePricesByCode?.[item.productCode];
                    return (
                      sum +
                      (typeof c === 'number' ? c : Math.round(item.unitPrice * 0.62)) *
                        item.quantity
                    );
                  }, 0);
                  setDraftProc(
                    recalc({
                      ...activeProc,
                      manufacturerId: mfg?.id || '',
                      manufacturerName: mfg?.name || '',
                      manufacturerPhone: mfg?.phone || '',
                      manufacturerPurchaseCost: autoCost,
                    })
                  );
                }}
                className="w-full px-3 py-2 bg-white border border-[#B18A4A]/40 rounded text-sm"
              >
                <option value="">Select Manufacturer</option>
                {manufacturers.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.location})
                  </option>
                ))}
              </select>
              {activeProc.manufacturerPhone && (
                <p className="text-xs text-[#6A5A4E] mt-1">
                  Supplier Phone: <span className="font-mono-code">{activeProc.manufacturerPhone}</span>
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-[#332821] mb-1">
                Internal Sourcing Stage
              </label>
              <select
                value={activeProc.internalStage}
                onChange={(e) =>
                  setDraftProc({
                    ...activeProc,
                    internalStage: e.target.value as InternalProcurementStage,
                  })
                }
                className="w-full px-3 py-2 bg-white border border-[#B18A4A]/40 rounded text-sm"
              >
                {INTERNAL_STAGES.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#332821] mb-1">
                Courier Partner
              </label>
              <input
                type="text"
                value={courierName}
                onChange={(e) => setCourierName(e.target.value)}
                placeholder="e.g., DTDC, Delhivery, India Post"
                className="w-full px-3 py-2 bg-white border border-[#B18A4A]/40 rounded text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#332821] mb-1">
                Tracking Number
              </label>
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="AWB / Tracking ID"
                className="w-full px-3 py-2 bg-white border border-[#B18A4A]/40 rounded text-sm font-mono-code"
              />
            </div>
          </div>

          {/* Per-Order Profit & Contribution Calculator (Admin-Only) */}
          <div className="bg-[#FAF6EE] border border-[#B18A4A]/35 rounded-lg p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-serif-display text-base font-semibold text-[#332821]">
                Order Profit & Contribution Calculator (Internal Only)
              </h4>
              <span className="text-xs text-[#6A5A4E] tabular-nums">
                Selling Total: {formatINR(activeProc.sellingTotal)}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-[#6A5A4E] mb-1">
                  Mfg Purchase (₹)
                </label>
                <input
                  type="number"
                  min={0}
                  value={activeProc.manufacturerPurchaseCost}
                  onChange={(e) =>
                    setDraftProc(
                      recalc({
                        ...activeProc,
                        manufacturerPurchaseCost: Number(e.target.value || 0),
                      })
                    )
                  }
                  className="w-full px-2.5 py-1.5 bg-white border border-[#B18A4A]/40 rounded text-sm font-mono-code tabular-nums"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-[#6A5A4E] mb-1">
                  Packaging (₹)
                </label>
                <input
                  type="number"
                  min={0}
                  value={activeProc.packagingCost}
                  onChange={(e) =>
                    setDraftProc(
                      recalc({
                        ...activeProc,
                        packagingCost: Number(e.target.value || 0),
                      })
                    )
                  }
                  className="w-full px-2.5 py-1.5 bg-white border border-[#B18A4A]/40 rounded text-sm font-mono-code tabular-nums"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-[#6A5A4E] mb-1">
                  Shipping (₹)
                </label>
                <input
                  type="number"
                  min={0}
                  value={activeProc.shippingCost}
                  onChange={(e) =>
                    setDraftProc(
                      recalc({
                        ...activeProc,
                        shippingCost: Number(e.target.value || 0),
                      })
                    )
                  }
                  className="w-full px-2.5 py-1.5 bg-white border border-[#B18A4A]/40 rounded text-sm font-mono-code tabular-nums"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-[#6A5A4E] mb-1">
                  Gateway Fee (₹)
                </label>
                <input
                  type="number"
                  min={0}
                  value={activeProc.paymentGatewayFee}
                  onChange={(e) =>
                    setDraftProc(
                      recalc({
                        ...activeProc,
                        paymentGatewayFee: Number(e.target.value || 0),
                      })
                    )
                  }
                  className="w-full px-2.5 py-1.5 bg-white border border-[#B18A4A]/40 rounded text-sm font-mono-code tabular-nums"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-[#6A5A4E] mb-1">
                  Other Costs (₹)
                </label>
                <input
                  type="number"
                  min={0}
                  value={activeProc.otherVariableCost}
                  onChange={(e) =>
                    setDraftProc(
                      recalc({
                        ...activeProc,
                        otherVariableCost: Number(e.target.value || 0),
                      })
                    )
                  }
                  className="w-full px-2.5 py-1.5 bg-white border border-[#B18A4A]/40 rounded text-sm font-mono-code tabular-nums"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-[#B18A4A]/25 text-sm">
              <div>
                <p className="text-xs text-[#6A5A4E]">Gross Margin</p>
                <p className="text-lg font-bold text-[#332821] tabular-nums">
                  {formatINR(activeProc.grossMargin)}
                </p>
              </div>
              <div>
                <p className="text-xs text-[#6A5A4E]">Net Contribution</p>
                <p
                  className={`text-lg font-bold tabular-nums ${
                    activeProc.netContribution >= 0 ? 'text-emerald-700' : 'text-red-700'
                  }`}
                >
                  {formatINR(activeProc.netContribution)}
                </p>
              </div>
              <div>
                <p className="text-xs text-[#6A5A4E]">Contribution Margin %</p>
                <p className="text-lg font-bold text-[#332821] tabular-nums">
                  {activeProc.sellingTotal > 0
                    ? `${((activeProc.netContribution / activeProc.sellingTotal) * 100).toFixed(1)}%`
                    : '0.0%'}
                </p>
              </div>
            </div>
          </div>

          {/* Notes & Unavailable Handling */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#332821] mb-1">
                Internal Procurement Notes
              </label>
              <textarea
                rows={2}
                value={activeProc.procurementNotes || ''}
                onChange={(e) =>
                  setDraftProc({ ...activeProc, procurementNotes: e.target.value })
                }
                placeholder="Notes on supplier call, inspection check, or packaging..."
                className="w-full px-3 py-2 bg-white border border-[#B18A4A]/40 rounded text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#332821] mb-1">
                Alternative Offered (if unavailable)
              </label>
              <textarea
                rows={2}
                value={activeProc.alternativeOffered || ''}
                onChange={(e) =>
                  setDraftProc({ ...activeProc, alternativeOffered: e.target.value })
                }
                placeholder="Alternative product code or colour offered to customer..."
                className="w-full px-3 py-2 bg-white border border-[#B18A4A]/40 rounded text-xs"
              />
            </div>
          </div>

          {/* Save All / Refund Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#B18A4A]/20">
            <div className="flex items-center gap-2">
              <label className="text-xs text-[#6A5A4E]">Customer Status:</label>
              <select
                value={customerStatus}
                onChange={(e) => setCustomerStatus(e.target.value as OrderStatus)}
                className="px-2.5 py-1.5 bg-white border border-[#B18A4A]/40 rounded text-xs"
              >
                {CUSTOMER_STATUS_OPTIONS.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-wrap gap-2">
              {activeOrder.status !== 'Cancelled' && (
                <button
                  type="button"
                  disabled={saving}
                  onClick={() =>
                    saveWorkflowUpdate(
                      { ...activeProc, internalStage: 'Manufacturer Unavailable' },
                      'Cancelled',
                      { paymentStatus: 'Refunded' }
                    )
                  }
                  className="px-4 py-2 border border-red-700 text-red-700 text-xs font-semibold rounded hover:bg-red-50"
                >
                  Cancel & Mark Refunded
                </button>
              )}
              <button
                type="button"
                disabled={saving}
                onClick={() => saveWorkflowUpdate(activeProc, customerStatus)}
                className="px-5 py-2 bg-[#651D2D] text-[#F5EFE4] text-xs font-semibold rounded hover:bg-[#4F1522]"
              >
                {saving ? 'Saving...' : 'Save Procurement & Order Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
