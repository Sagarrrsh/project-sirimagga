import React, { useEffect, useState } from 'react';
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import {
  Database,
  Factory,
  LayoutDashboard,
  Mail,
  MessageSquare,
  Package,
  Settings,
  ShoppingBag,
  Tag,
  Users,
} from 'lucide-react';
import { AdminCatalogTab } from '../components/admin/AdminCatalogTab';
import { AdminManufacturersTab } from '../components/admin/AdminManufacturersTab';
import { AdminNotificationsTab } from '../components/admin/AdminNotificationsTab';
import { AdminOrdersTab } from '../components/admin/AdminOrdersTab';
import { AdminReviewsTab } from '../components/admin/AdminReviewsTab';
import { useAuth } from '../contexts/AuthContext';
import { useStore } from '../contexts/StoreContext';
import { DEFAULT_ADMIN_COST_SETTINGS, formatINR } from '../data/demoData';
import { ADMIN_EMAIL, OperationType, db, handleFirestoreError } from '../lib/firebase';
import type {
  AdminCostSetting,
  Category,
  Discount,
  EmailNotification,
  Manufacturer,
  Order,
  OrderProcurement,
  Review,
  UserProfile,
} from '../types';

type AdminSection =
  | 'overview'
  | 'orders'
  | 'notifications'
  | 'reviews'
  | 'manufacturers'
  | 'products'
  | 'categories'
  | 'customers'
  | 'settings';

export function AdminDashboardPage() {
  const { user, isAdmin, authReady, signInWithGoogle } = useAuth();
  const {
    products,
    categories,
    storeSettings,
    usingDemoCatalog,
    seedDemoCatalogToFirestore,
    showToast,
  } = useStore();

  const [section, setSection] = useState<AdminSection>('overview');
  const [orders, setOrders] = useState<Order[]>([]);
  const [notifications, setNotifications] = useState<EmailNotification[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [procurements, setProcurements] = useState<Record<string, OrderProcurement>>({});
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [customers, setCustomers] = useState<UserProfile[]>([]);
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [costSettings, setCostSettings] = useState<AdminCostSetting>(
    DEFAULT_ADMIN_COST_SETTINGS
  );

  // Discount form
  const [discCode, setDiscCode] = useState('');
  const [discType, setDiscType] = useState<'percentage' | 'flat'>('percentage');
  const [discValue, setDiscValue] = useState(10);
  const [discMinOrder, setDiscMinOrder] = useState(1999);

  // Category form
  const [catName, setCatName] = useState('');
  const [catDesc, setCatDesc] = useState('');

  // Shipping & Costing form states
  const [freeShipThresh, setFreeShipThresh] = useState(storeSettings.freeShippingThreshold);
  const [stdShipFee, setStdShipFee] = useState(storeSettings.standardShippingFee);
  const [deliveryWindow, setDeliveryWindow] = useState(storeSettings.estimatedDeliveryWindow);
  const [pkgCost, setPkgCost] = useState(costSettings.defaultPackagingCost);
  const [shipCost, setShipCost] = useState(costSettings.defaultShippingCost);
  const [gwPct, setGwPct] = useState(costSettings.gatewayFeePercent);
  const [otherCost, setOtherCost] = useState(costSettings.defaultOtherVariableCost);

  useEffect(() => {
    document.title = 'Admin Operations & Sourcing | SIRIMAGGA';
  }, []);

  useEffect(() => {
    setFreeShipThresh(storeSettings.freeShippingThreshold);
    setStdShipFee(storeSettings.standardShippingFee);
    setDeliveryWindow(storeSettings.estimatedDeliveryWindow);
  }, [storeSettings]);

  useEffect(() => {
    if (!authReady || !isAdmin) return;

    const unsubOrders = onSnapshot(
      collection(db, 'orders'),
      (snap) => {
        const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Order);
        list.sort((a, b) => {
          const tA = (a.createdAt as { seconds?: number } | undefined)?.seconds || 0;
          const tB = (b.createdAt as { seconds?: number } | undefined)?.seconds || 0;
          return tB - tA;
        });
        setOrders(list);
      },
      (err) => handleFirestoreError(err, OperationType.LIST, 'orders')
    );

    const unsubProc = onSnapshot(
      collection(db, 'order_procurement'),
      (snap) => {
        const map: Record<string, OrderProcurement> = {};
        snap.docs.forEach((d) => {
          map[d.id] = { id: d.id, ...d.data() } as OrderProcurement;
        });
        setProcurements(map);
      },
      (err) => handleFirestoreError(err, OperationType.LIST, 'order_procurement')
    );

    const unsubMfg = onSnapshot(
      collection(db, 'manufacturers'),
      (snap) => {
        setManufacturers(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Manufacturer));
      },
      (err) => handleFirestoreError(err, OperationType.LIST, 'manufacturers')
    );

    const unsubUsers = onSnapshot(
      collection(db, 'users'),
      (snap) => {
        setCustomers(snap.docs.map((d) => d.data() as UserProfile));
      },
      (err) => handleFirestoreError(err, OperationType.LIST, 'users')
    );

    const unsubDisc = onSnapshot(
      collection(db, 'discounts'),
      (snap) => {
        setDiscounts(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Discount));
      },
      (err) => handleFirestoreError(err, OperationType.LIST, 'discounts')
    );

    const unsubCost = onSnapshot(
      doc(db, 'admin_settings', 'costing'),
      (snap) => {
        if (snap.exists()) {
          const data = snap.data() as AdminCostSetting;
          setCostSettings(data);
          setPkgCost(data.defaultPackagingCost);
          setShipCost(data.defaultShippingCost);
          setGwPct(data.gatewayFeePercent);
          setOtherCost(data.defaultOtherVariableCost);
        }
      },
      (err) => handleFirestoreError(err, OperationType.GET, 'admin_settings/costing')
    );

    const unsubNotif = onSnapshot(
      collection(db, 'email_notifications'),
      (snap) => {
        const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }) as EmailNotification);
        list.sort((a, b) => {
          const tA = (a.createdAt as { seconds?: number } | undefined)?.seconds || 0;
          const tB = (b.createdAt as { seconds?: number } | undefined)?.seconds || 0;
          return tB - tA;
        });
        setNotifications(list);
      },
      (err) => handleFirestoreError(err, OperationType.LIST, 'email_notifications')
    );

    const unsubReviews = onSnapshot(
      collection(db, 'reviews'),
      (snap) => {
        const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Review);
        list.sort((a, b) => {
          const tA = (a.createdAt as { seconds?: number } | undefined)?.seconds || 0;
          const tB = (b.createdAt as { seconds?: number } | undefined)?.seconds || 0;
          return tB - tA;
        });
        setReviews(list);
      },
      (err) => handleFirestoreError(err, OperationType.LIST, 'reviews')
    );

    return () => {
      unsubOrders();
      unsubProc();
      unsubMfg();
      unsubUsers();
      unsubDisc();
      unsubCost();
      unsubNotif();
      unsubReviews();
    };
  }, [authReady, isAdmin]);

  if (!authReady) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-20 text-center text-sm text-[#6A5A4E]">
        Verifying administrator credentials...
      </main>
    );
  }

  if (!user || !isAdmin) {
    return (
      <main className="max-w-xl mx-auto px-4 py-20">
        <div className="bg-[#FAF6EE] border border-[#B18A4A]/40 rounded-lg p-8 text-center space-y-5">
          <h1 className="font-serif-display text-2xl font-semibold text-[#332821]">
            SIRIMAGGA Admin Portal
          </h1>
          <p className="text-sm text-[#6A5A4E]">
            Access to order sourcing, manufacturer records, and per-order profit calculations is strictly restricted to authorized administrators ({ADMIN_EMAIL}).
          </p>
          {!user ? (
            <button
              type="button"
              onClick={() => signInWithGoogle()}
              className="px-6 py-2.5 bg-[#651D2D] text-[#F5EFE4] text-sm font-semibold rounded-md hover:bg-[#4F1522]"
            >
              Sign In as Administrator
            </button>
          ) : (
            <p className="text-xs text-red-700 font-medium">
              Signed in as {user.email}. This account does not have administrator privileges.
            </p>
          )}
        </div>
      </main>
    );
  }

  // KPIs
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === 'Order Placed').length;
  const confirmedOrders = orders.filter((o) => o.status === 'Confirmed').length;
  const awaitingProcurement = orders.filter((o) => {
    const p = procurements[o.id];
    return (
      o.status !== 'Cancelled' &&
      (!p ||
        p.internalStage === 'Pending Availability Check' ||
        p.internalStage === 'Availability Confirmed' ||
        p.internalStage === 'Procurement Ordered')
    );
  }).length;
  const awaitingPackaging = orders.filter(
    (o) =>
      o.status === 'Quality Inspection' ||
      o.status === 'Packaging in Progress' ||
      o.status === 'Ready to Dispatch'
  ).length;
  const shippedOrders = orders.filter(
    (o) => o.status === 'Shipped' || o.status === 'Delivered'
  ).length;
  const cancelledOrders = orders.filter((o) => o.status === 'Cancelled').length;
  const activeOrders = orders.filter((o) => o.status !== 'Cancelled');
  const totalSales = activeOrders.reduce((s, o) => s + o.totalAmount, 0);
  const totalNetContribution = activeOrders.reduce(
    (s, o) => s + (procurements[o.id]?.netContribution ?? 0),
    0
  );

  const handleSaveDiscount = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = discCode.trim().toUpperCase().replace(/[^A-Z0-9_-]/g, '');
    if (!code) return;
    const path = `discounts/${code}`;
    try {
      await setDoc(doc(db, 'discounts', code), {
        code,
        description: `${discType === 'percentage' ? `${discValue}%` : formatINR(discValue)} off orders above ${formatINR(discMinOrder)}`,
        discountType: discType,
        value: Number(discValue),
        minOrderAmount: Number(discMinOrder),
        isActive: true,
        createdAt: serverTimestamp(),
      });
      setDiscCode('');
      showToast(`Discount ${code} saved.`);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, path);
    }
  };

  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    const slug = catName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    if (!slug) return;
    const path = `categories/${slug}`;
    try {
      await setDoc(doc(db, 'categories', slug), {
        name: catName.trim().slice(0, 80),
        slug,
        description: catDesc.trim().slice(0, 400),
        image: categories[0]?.image || '',
        displayOrder: categories.length + 1,
        isActive: true,
      } satisfies Omit<Category, 'id'>);
      setCatName('');
      setCatDesc('');
      showToast('Category added.');
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, path);
    }
  };

  const handleSaveShippingAndCosting = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await setDoc(doc(db, 'settings', 'storefront'), {
        freeShippingThreshold: Number(freeShipThresh),
        standardShippingFee: Number(stdShipFee),
        estimatedDeliveryWindow: deliveryWindow.trim(),
        updatedAt: serverTimestamp(),
      });
      await setDoc(doc(db, 'admin_settings', 'costing'), {
        defaultPackagingCost: Number(pkgCost),
        defaultShippingCost: Number(shipCost),
        gatewayFeePercent: Number(gwPct),
        defaultOtherVariableCost: Number(otherCost),
        updatedAt: serverTimestamp(),
      });
      showToast('Shipping & internal costing defaults saved.');
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'settings/storefront');
    }
  };

  const pendingReviewsCount = reviews.filter(
    (r) => (r.status || (r.isDemo ? 'approved' : 'pending')) === 'pending'
  ).length;

  const navItems: { id: AdminSection; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'orders', label: `Orders & Sourcing (${orders.length})`, icon: ShoppingBag },
    { id: 'notifications', label: `Email Notifications (${notifications.length})`, icon: Mail },
    {
      id: 'reviews',
      label:
        pendingReviewsCount > 0
          ? `Reviews (${pendingReviewsCount} Pending)`
          : `Reviews (${reviews.length})`,
      icon: MessageSquare,
    },
    { id: 'manufacturers', label: `Manufacturers (${manufacturers.length})`, icon: Factory },
    { id: 'products', label: 'Products & Pricing', icon: Package },
    { id: 'categories', label: 'Categories', icon: Tag },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'settings', label: 'Discounts, Shipping & Costs', icon: Settings },
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-[#B18A4A]/30">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#651D2D]">
            Internal Operations Console
          </p>
          <h1 className="font-serif-display text-2xl sm:text-3xl font-semibold text-[#332821]">
            SIRIMAGGA Admin Dashboard
          </h1>
        </div>

        <button
          type="button"
          onClick={() => seedDemoCatalogToFirestore()}
          className="inline-flex items-center gap-2 px-4 py-2 border border-[#651D2D] text-[#651D2D] text-xs font-semibold rounded-md hover:bg-[#651D2D] hover:text-[#F5EFE4] transition-colors whitespace-nowrap self-start sm:self-auto"
        >
          <Database className="w-4 h-4" />
          <span>
            {usingDemoCatalog
              ? 'Seed Demo Store & Manufacturers to Firestore'
              : 'Re-Sync Demo Seed Data'}
          </span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sidebar */}
        <aside className="lg:col-span-3 bg-[#FAF6EE] border border-[#B18A4A]/30 rounded-lg p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = section === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSection(item.id)}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-md text-sm font-medium text-left transition-colors ${
                  active
                    ? 'bg-[#651D2D] text-[#F5EFE4]'
                    : 'text-[#332821] hover:bg-[#EFE7D6]'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </aside>

        {/* Main Workspace */}
        <section className="lg:col-span-9 space-y-6">
          {section === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: 'Total Orders', value: totalOrders },
                  { label: 'Pending Orders', value: pendingOrders },
                  { label: 'Confirmed Orders', value: confirmedOrders },
                  { label: 'Awaiting Procurement', value: awaitingProcurement },
                  { label: 'Awaiting Packaging', value: awaitingPackaging },
                  { label: 'Shipped / Delivered', value: shippedOrders },
                  { label: 'Cancelled Orders', value: cancelledOrders },
                  { label: 'Total Sales', value: formatINR(totalSales) },
                ].map((kpi) => (
                  <div
                    key={kpi.label}
                    className="bg-white border border-[#B18A4A]/30 rounded-lg p-4 space-y-1"
                  >
                    <p className="text-xs text-[#6A5A4E]">{kpi.label}</p>
                    <p className="text-2xl font-bold text-[#332821] tabular-nums">{kpi.value}</p>
                  </div>
                ))}
              </div>

              <div className="bg-[#FAF6EE] border border-[#B18A4A]/35 rounded-lg p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#651D2D]">
                    Internal Contribution Summary
                  </p>
                  <p className="text-sm text-[#6A5A4E] mt-1">
                    Net contribution calculated across orders with saved procurement costs (Selling Price − Purchase − Packaging − Shipping − Gateway − Variable).
                  </p>
                </div>
                <div className="text-left sm:text-right shrink-0">
                  <p className="text-xs text-[#6A5A4E]">Recorded Net Contribution</p>
                  <p className="text-2xl font-bold text-[#651D2D] tabular-nums">
                    {formatINR(totalNetContribution)}
                  </p>
                </div>
              </div>
            </div>
          )}

          {section === 'orders' && (
            <AdminOrdersTab
              orders={orders}
              procurements={procurements}
              manufacturers={manufacturers}
              costSettings={costSettings}
              onShowToast={showToast}
            />
          )}

          {section === 'notifications' && (
            <AdminNotificationsTab notifications={notifications} />
          )}

          {section === 'reviews' && (
            <AdminReviewsTab reviews={reviews} onShowToast={showToast} />
          )}

          {section === 'manufacturers' && (
            <AdminManufacturersTab
              manufacturers={manufacturers}
              onShowToast={showToast}
            />
          )}

          {section === 'products' && (
            <AdminCatalogTab
              products={products}
              categories={categories}
              onShowToast={showToast}
            />
          )}

          {section === 'categories' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              <form
                onSubmit={handleSaveCategory}
                className="md:col-span-5 bg-white border border-[#B18A4A]/30 rounded-lg p-5 space-y-4"
              >
                <h2 className="font-serif-display text-lg font-semibold text-[#332821]">
                  Add Collection Category
                </h2>
                <div>
                  <label className="block text-xs font-medium mb-1">Category Name *</label>
                  <input
                    type="text"
                    required
                    value={catName}
                    onChange={(e) => setCatName(e.target.value)}
                    placeholder="e.g., Bridal Silk Sarees"
                    className="w-full px-3 py-2 bg-[#FAF6EE] border border-[#B18A4A]/35 rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Description *</label>
                  <textarea
                    rows={2}
                    required
                    value={catDesc}
                    onChange={(e) => setCatDesc(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF6EE] border border-[#B18A4A]/35 rounded text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-[#651D2D] text-[#F5EFE4] text-sm font-semibold rounded"
                >
                  Save Category
                </button>
              </form>

              <div className="md:col-span-7 bg-white border border-[#B18A4A]/30 rounded-lg divide-y divide-[#B18A4A]/15">
                {categories.map((c) => (
                  <div key={c.id} className="p-4 flex items-center justify-between gap-4">
                    <div>
                      <p className="font-medium text-sm text-[#332821]">{c.name}</p>
                      <p className="text-xs text-[#6A5A4E]">{c.description}</p>
                    </div>
                    <span className="font-mono-code text-xs text-[#6A5A4E]">{c.slug}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {section === 'customers' && (
            <div className="bg-white border border-[#B18A4A]/30 rounded-lg overflow-hidden">
              <div className="p-4 bg-[#FAF6EE] border-b border-[#B18A4A]/20">
                <h2 className="font-serif-display text-base font-semibold text-[#332821]">
                  Registered Customers ({customers.length})
                </h2>
              </div>
              {customers.length === 0 ? (
                <p className="p-8 text-sm text-[#6A5A4E] text-center">
                  No registered customer profiles yet.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-[#FAF6EE] text-xs text-[#6A5A4E] border-b border-[#B18A4A]/20">
                      <tr>
                        <th className="py-3 px-4">Customer</th>
                        <th className="py-3 px-4">Email</th>
                        <th className="py-3 px-4">Phone</th>
                        <th className="py-3 px-4 text-right">Orders</th>
                        <th className="py-3 px-4 text-right">Total Spend</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#B18A4A]/15">
                      {customers.map((c) => {
                        const custOrders = orders.filter((o) => o.customerId === c.uid);
                        const spend = custOrders
                          .filter((o) => o.status !== 'Cancelled')
                          .reduce((s, o) => s + o.totalAmount, 0);
                        return (
                          <tr key={c.uid} className="hover:bg-[#FAF6EE]/50">
                            <td className="py-3 px-4 font-medium text-[#332821]">{c.displayName}</td>
                            <td className="py-3 px-4 text-[#6A5A4E]">{c.email}</td>
                            <td className="py-3 px-4 font-mono-code text-xs">
                              {c.phone || '—'}
                            </td>
                            <td className="py-3 px-4 text-right tabular-nums">
                              {custOrders.length}
                            </td>
                            <td className="py-3 px-4 text-right tabular-nums font-medium">
                              {formatINR(spend)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {section === 'settings' && (
            <div className="space-y-6">
              {/* Discounts */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                <form
                  onSubmit={handleSaveDiscount}
                  className="md:col-span-5 bg-white border border-[#B18A4A]/30 rounded-lg p-5 space-y-3"
                >
                  <h2 className="font-serif-display text-lg font-semibold text-[#332821]">
                    Create Discount Code
                  </h2>
                  <input
                    type="text"
                    required
                    value={discCode}
                    onChange={(e) => setDiscCode(e.target.value.toUpperCase())}
                    placeholder="FESTIVE15"
                    className="w-full px-3 py-2 bg-[#FAF6EE] border border-[#B18A4A]/35 rounded text-sm font-mono-code uppercase"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <select
                      value={discType}
                      onChange={(e) => setDiscType(e.target.value as 'percentage' | 'flat')}
                      className="px-3 py-2 bg-[#FAF6EE] border border-[#B18A4A]/35 rounded text-sm"
                    >
                      <option value="percentage">Percentage (%)</option>
                      <option value="flat">Flat (₹)</option>
                    </select>
                    <input
                      type="number"
                      min={1}
                      value={discValue}
                      onChange={(e) => setDiscValue(Number(e.target.value))}
                      className="px-3 py-2 bg-[#FAF6EE] border border-[#B18A4A]/35 rounded text-sm font-mono-code"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#6A5A4E] mb-1">
                      Min Order Amount (₹)
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={discMinOrder}
                      onChange={(e) => setDiscMinOrder(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-[#FAF6EE] border border-[#B18A4A]/35 rounded text-sm font-mono-code"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2 bg-[#651D2D] text-[#F5EFE4] text-sm font-semibold rounded"
                  >
                    Save Discount Code
                  </button>
                </form>

                <div className="md:col-span-7 bg-white border border-[#B18A4A]/30 rounded-lg divide-y divide-[#B18A4A]/15">
                  <div className="p-4 bg-[#FAF6EE] font-serif-display text-base font-semibold">
                    Active Discounts ({discounts.length})
                  </div>
                  {discounts.map((d) => (
                    <div key={d.id} className="p-4 flex items-center justify-between gap-3 text-sm">
                      <div>
                        <p className="font-mono-code font-semibold text-[#651D2D]">{d.code}</p>
                        <p className="text-xs text-[#6A5A4E]">{d.description}</p>
                      </div>
                      <button
                        type="button"
                        onClick={async () => {
                          await deleteDoc(doc(db, 'discounts', d.id));
                          showToast(`Deleted ${d.code}`, 'info');
                        }}
                        className="text-xs text-red-700 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping & Internal Costing Defaults */}
              <form
                onSubmit={handleSaveShippingAndCosting}
                className="bg-white border border-[#B18A4A]/30 rounded-lg p-6 space-y-5"
              >
                <h2 className="font-serif-display text-lg font-semibold text-[#332821]">
                  Shipping & Default Costing Parameters
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium mb-1">
                      Free Shipping Threshold (₹)
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={freeShipThresh}
                      onChange={(e) => setFreeShipThresh(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-[#FAF6EE] border border-[#B18A4A]/35 rounded text-sm font-mono-code"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">
                      Standard Shipping Fee (₹)
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={stdShipFee}
                      onChange={(e) => setStdShipFee(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-[#FAF6EE] border border-[#B18A4A]/35 rounded text-sm font-mono-code"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">
                      Delivery Window Label
                    </label>
                    <input
                      type="text"
                      value={deliveryWindow}
                      onChange={(e) => setDeliveryWindow(e.target.value)}
                      className="w-full px-3 py-2 bg-[#FAF6EE] border border-[#B18A4A]/35 rounded text-sm"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-[#B18A4A]/20">
                  <p className="text-xs font-semibold text-[#651D2D] mb-3">
                    Internal Profit Calculation Defaults (Admin-Only)
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs font-medium mb-1">
                        Packaging Cost (₹)
                      </label>
                      <input
                        type="number"
                        min={0}
                        value={pkgCost}
                        onChange={(e) => setPkgCost(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-[#FAF6EE] border border-[#B18A4A]/35 rounded text-sm font-mono-code"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">
                        Courier Cost (₹)
                      </label>
                      <input
                        type="number"
                        min={0}
                        value={shipCost}
                        onChange={(e) => setShipCost(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-[#FAF6EE] border border-[#B18A4A]/35 rounded text-sm font-mono-code"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">
                        Gateway Fee (%)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        min={0}
                        value={gwPct}
                        onChange={(e) => setGwPct(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-[#FAF6EE] border border-[#B18A4A]/35 rounded text-sm font-mono-code"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">
                        Other Variable (₹)
                      </label>
                      <input
                        type="number"
                        min={0}
                        value={otherCost}
                        onChange={(e) => setOtherCost(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-[#FAF6EE] border border-[#B18A4A]/35 rounded text-sm font-mono-code"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#651D2D] text-[#F5EFE4] text-sm font-semibold rounded hover:bg-[#4F1522]"
                >
                  Save Settings
                </button>
              </form>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
