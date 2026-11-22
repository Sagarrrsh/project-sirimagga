import { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle2, Cloud, Mail, Search } from 'lucide-react';
import type { EmailNotification } from '../../types';

interface NotificationConfigStatus {
  smtpConfigured: boolean;
  cloudFunctionsPath: string;
  mode: string;
}

interface AdminNotificationsTabProps {
  notifications: EmailNotification[];
}

export function AdminNotificationsTab({ notifications }: AdminNotificationsTabProps) {
  const [configStatus, setConfigStatus] = useState<NotificationConfigStatus | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [stateFilter, setStateFilter] = useState<string>('All');
  const [showSetupGuide, setShowSetupGuide] = useState(false);

  useEffect(() => {
    fetch('/api/notifications/config')
      .then((res) => res.json())
      .then((data: NotificationConfigStatus) => setConfigStatus(data))
      .catch(() =>
        setConfigStatus({
          smtpConfigured: false,
          cloudFunctionsPath: '/functions/src/index.ts',
          mode: 'preview_and_cloud_function_ready',
        })
      );
  }, []);

  const totalCount = notifications.length;
  const sentCount = notifications.filter((n) => n.deliveryState === 'sent_smtp').length;
  const queuedCount = notifications.filter(
    (n) => n.deliveryState === 'queued_cloud_function'
  ).length;
  const failedCount = notifications.filter((n) => n.deliveryState === 'failed').length;

  const filtered = notifications.filter((n) => {
    const matchesState = stateFilter === 'All' || n.deliveryState === stateFilter;
    const q = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !q ||
      n.orderNumber.toLowerCase().includes(q) ||
      n.recipientEmail.toLowerCase().includes(q) ||
      n.eventStatus.toLowerCase().includes(q) ||
      n.subject.toLowerCase().includes(q);
    return matchesState && matchesQuery;
  });

  const formatTimestamp = (ts: unknown) => {
    const seconds = (ts as { seconds?: number } | undefined)?.seconds;
    if (!seconds) return 'Pending timestamp';
    return new Date(seconds * 1000).toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  return (
    <div className="space-y-6">
      {/* Configuration & Delivery Status Banner */}
      <div className="bg-[#FAF6EE] border border-[#B18A4A]/35 rounded-lg p-5 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <Cloud className="w-5 h-5 text-[#651D2D] shrink-0 mt-0.5" />
            <div>
              <h2 className="font-serif-display text-lg font-semibold text-[#332821]">
                Automated Order Status Email System
              </h2>
              <p className="text-xs text-[#6A5A4E] mt-0.5">
                {configStatus?.smtpConfigured
                  ? 'Express SMTP relay is active (`SMTP_HOST` configured). Live customer emails are dispatched on order status changes and logged below.'
                  : 'Running in Cloud Functions & Audit Log mode: every status transition renders and records the customer email in Firestore. Configure SMTP secrets or deploy `/functions/src/index.ts` for live inbox delivery.'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowSetupGuide((prev) => !prev)}
            className="px-3.5 py-2 border border-[#651D2D] text-[#651D2D] text-xs font-semibold rounded hover:bg-[#651D2D] hover:text-[#F5EFE4] transition-colors whitespace-nowrap self-start sm:self-auto"
          >
            {showSetupGuide ? 'Hide Cloud Functions Setup' : 'Cloud Functions Setup'}
          </button>
        </div>

        {showSetupGuide && (
          <div className="bg-white border border-[#B18A4A]/30 rounded-md p-4 text-xs text-[#332821] space-y-2.5">
            <p className="font-semibold text-[#651D2D]">
              Firebase Cloud Functions v2 Triggers (`/functions/src/index.ts`)
            </p>
            <p className="text-[#6A5A4E]">
              Triggers <span className="font-mono-code text-[#332821]">onOrderCreated</span> and{' '}
              <span className="font-mono-code text-[#332821]">onOrderStatusUpdated</span> monitor{' '}
              <span className="font-mono-code text-[#332821]">orders/&#123;orderId&#125;</span> in
              database{' '}
              <span className="font-mono-code text-[#332821]">
                ai-studio-81d0b765-4edd-4474-b870-a982e29713d4
              </span>
              . Deploy via Firebase CLI (requires Blaze plan):
            </p>
            <pre className="bg-[#FAF6EE] border border-[#B18A4A]/25 rounded p-3 font-mono-code text-[11px] overflow-x-auto text-[#332821]">
{`cd functions && npm install && npm run build
firebase functions:secrets:set SMTP_HOST
firebase functions:secrets:set SMTP_USER
firebase functions:secrets:set SMTP_PASS
firebase deploy --only functions`}
            </pre>
          </div>
        )}
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-[#B18A4A]/30 rounded-lg p-4">
          <p className="text-xs text-[#6A5A4E]">Total Logged</p>
          <p className="text-2xl font-bold text-[#332821] tabular-nums mt-1">{totalCount}</p>
        </div>
        <div className="bg-white border border-[#B18A4A]/30 rounded-lg p-4">
          <p className="text-xs text-[#6A5A4E]">Sent via SMTP</p>
          <p className="text-2xl font-bold text-[#651D2D] tabular-nums mt-1">{sentCount}</p>
        </div>
        <div className="bg-white border border-[#B18A4A]/30 rounded-lg p-4">
          <p className="text-xs text-[#6A5A4E]">Cloud Function / Preview</p>
          <p className="text-2xl font-bold text-[#332821] tabular-nums mt-1">{queuedCount}</p>
        </div>
        <div className="bg-white border border-[#B18A4A]/30 rounded-lg p-4">
          <p className="text-xs text-[#6A5A4E]">Failed</p>
          <p className="text-2xl font-bold text-red-700 tabular-nums mt-1">{failedCount}</p>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white border border-[#B18A4A]/30 rounded-lg overflow-hidden">
        <div className="p-4 bg-[#FAF6EE] border-b border-[#B18A4A]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="font-serif-display text-base font-semibold text-[#332821] flex items-center gap-2">
            <Mail className="w-4 h-4 text-[#651D2D]" />
            <span>Notification Audit Log ({filtered.length})</span>
          </h3>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#6A5A4E] absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search order ID or email..."
                className="pl-8 pr-3 py-1.5 bg-white border border-[#B18A4A]/35 rounded text-xs focus:outline-none focus:border-[#651D2D]"
              />
            </div>

            <select
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
              className="px-2.5 py-1.5 bg-white border border-[#B18A4A]/35 rounded text-xs"
            >
              <option value="All">All Delivery States</option>
              <option value="sent_smtp">Sent via SMTP</option>
              <option value="queued_cloud_function">Cloud Function / Preview</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="p-10 text-center text-sm text-[#6A5A4E]">
            No email notifications match the current filter. Notifications are automatically created when orders are placed, updated, shipped, or cancelled.
          </div>
        ) : (
          <div className="divide-y divide-[#B18A4A]/15">
            {filtered.map((ntf) => (
              <div key={ntf.id} className="p-4 hover:bg-[#FAF6EE]/40 space-y-1.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-mono-code font-semibold text-[#651D2D]">
                      {ntf.orderNumber}
                    </span>
                    <span className="text-[#6A5A4E]">·</span>
                    <span className="font-medium text-[#332821]">{ntf.eventStatus}</span>
                    <span className="text-[#6A5A4E]">·</span>
                    <span className="text-[#6A5A4E]">{ntf.recipientEmail}</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    {ntf.deliveryState === 'sent_smtp' ? (
                      <span className="inline-flex items-center gap-1 text-[#651D2D] font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Sent via SMTP
                      </span>
                    ) : ntf.deliveryState === 'failed' ? (
                      <span className="inline-flex items-center gap-1 text-red-700 font-medium">
                        <AlertCircle className="w-3.5 h-3.5" /> Failed
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[#6A5A4E] font-medium">
                        <Cloud className="w-3.5 h-3.5" /> Cloud Function / Preview
                      </span>
                    )}
                    <span className="text-[#6A5A4E] tabular-nums">
                      · {formatTimestamp(ntf.createdAt)}
                    </span>
                  </div>
                </div>

                <p className="text-sm font-medium text-[#332821]">{ntf.subject}</p>
                <p className="text-xs text-[#6A5A4E]">{ntf.previewText}</p>
                {ntf.providerMessage && (
                  <p className="text-[11px] font-mono-code text-[#6A5A4E] pt-0.5">
                    {ntf.providerMessage}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
