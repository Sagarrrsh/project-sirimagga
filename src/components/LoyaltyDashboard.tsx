import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowDownLeft,
  ArrowUpRight,
  Award,
  Check,
  Copy,
  Gift,
  History,
  Sparkles,
  Ticket,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useStore } from '../contexts/StoreContext';
import { formatINR } from '../data/demoData';
import {
  LOYALTY_COPY,
  REDEMPTION_TIERS,
  RUPEE_VALUE_PER_POINT,
  getLoyaltyTierInfo,
  redeemPointsForVoucher,
  type RedemptionTierOption,
} from '../lib/loyalty';

function formatTxDate(ts: unknown): string {
  if (!ts || typeof ts !== 'object') return 'Just now';
  const seconds = (ts as { seconds?: number }).seconds;
  if (typeof seconds !== 'number') return 'Just now';
  return new Date(seconds * 1000).toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

export function LoyaltyDashboard() {
  const { user, loyaltySummary, loyaltyTransactions, loyaltyVouchers } = useAuth();
  const { showToast } = useStore();
  const { lang } = useLanguage();

  const copy = LOYALTY_COPY[lang];
  const [redeemingPts, setRedeemingPts] = useState<number | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const balance = loyaltySummary?.pointsBalance ?? 0;
  const lifetime = loyaltySummary?.lifetimeEarned ?? 0;
  const redeemed = loyaltySummary?.totalRedeemed ?? 0;
  const balanceRupeeValue = balance * RUPEE_VALUE_PER_POINT;

  const tierInfo = getLoyaltyTierInfo(lifetime);
  const tierName = copy.tiers[tierInfo.id];
  const nextTierName = tierInfo.nextTierId ? copy.tiers[tierInfo.nextTierId] : null;

  const handleRedeemVoucher = async (tier: RedemptionTierOption) => {
    if (!user || redeemingPts !== null) return;
    if (balance < tier.points) {
      showToast(copy.needMorePts(tier.points - balance), 'info');
      return;
    }

    setRedeemingPts(tier.points);
    try {
      const code = await redeemPointsForVoucher({
        userId: user.uid,
        tier,
        currentSummary: loyaltySummary,
      });
      showToast(copy.voucherSuccessToast(code, tier.discountValue));
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Unable to redeem points.', 'error');
    } finally {
      setRedeemingPts(null);
    }
  };

  const handleCopyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      showToast(copy.copiedToast(code));
      setTimeout(() => setCopiedCode((prev) => (prev === code ? null : prev)), 2500);
    } catch {
      showToast(code, 'info');
    }
  };

  return (
    <div className="space-y-8">
      {/* Membership Balance & Tier Card */}
      <section className="bg-[#651D2D] text-[#F5EFE4] border border-[#B18A4A]/60 rounded-lg p-6 sm:p-8 shadow-md space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#B18A4A]/20 border border-[#B18A4A]/50 text-[#F5EFE4] text-xs font-medium">
              <Award className="w-3.5 h-3.5 text-[#E8CFA1]" />
              <span>{tierName}</span>
            </div>
            <h2 className="font-serif-display text-2xl sm:text-3xl font-semibold">
              {copy.programTitle}
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-4 sm:gap-7 bg-[#4F1522]/70 border border-[#B18A4A]/35 rounded-md px-5 py-4">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-[#F5EFE4]/75">
                {copy.availablePoints}
              </p>
              <p className="text-2xl sm:text-3xl font-bold tabular-nums text-[#E8CFA1] mt-0.5">
                {balance}
              </p>
              <p className="text-[11px] text-[#F5EFE4]/80 tabular-nums">
                = {formatINR(balanceRupeeValue)}
              </p>
            </div>
            <div className="border-l border-[#B18A4A]/25 pl-4">
              <p className="text-[11px] uppercase tracking-wider text-[#F5EFE4]/75">
                {copy.lifetimeEarned}
              </p>
              <p className="text-xl sm:text-2xl font-semibold tabular-nums mt-0.5">{lifetime}</p>
            </div>
            <div className="border-l border-[#B18A4A]/25 pl-4">
              <p className="text-[11px] uppercase tracking-wider text-[#F5EFE4]/75">
                {copy.totalRedeemed}
              </p>
              <p className="text-xl sm:text-2xl font-semibold tabular-nums mt-0.5">{redeemed}</p>
            </div>
          </div>
        </div>

        {/* Tier Progress Bar */}
        <div className="space-y-2 pt-2 border-t border-[#B18A4A]/25">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#F5EFE4]/90">
            <span className="font-medium">
              {nextTierName
                ? copy.nextTierPrompt(tierInfo.pointsToNext, nextTierName)
                : copy.topTierReached}
            </span>
            <span className="tabular-nums text-[#E8CFA1] font-semibold">
              {tierInfo.progressPercent}%
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-[#4F1522] overflow-hidden border border-[#B18A4A]/30">
            <div
              className="h-full bg-[#B18A4A] rounded-full transition-all duration-500"
              style={{ width: `${Math.max(4, tierInfo.progressPercent)}%` }}
            />
          </div>
        </div>
      </section>

      {/* How Loom Rewards Work */}
      <section className="bg-[#FAF6EE] border border-[#B18A4A]/35 rounded-lg p-5 sm:p-6">
        <h3 className="font-serif-display text-base font-semibold text-[#332821] mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#651D2D]" />
          <span>{copy.howItWorksTitle}</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#6A5A4E]">
          <div className="bg-white border border-[#B18A4A]/25 rounded-md p-3.5">{copy.ruleEarn}</div>
          <div className="bg-white border border-[#B18A4A]/25 rounded-md p-3.5">{copy.ruleValue}</div>
          <div className="bg-white border border-[#B18A4A]/25 rounded-md p-3.5">{copy.ruleRedeem}</div>
        </div>
      </section>

      {/* Redeem Points for Discount Vouchers */}
      <section className="space-y-4">
        <div>
          <h3 className="font-serif-display text-xl font-semibold text-[#332821] flex items-center gap-2">
            <Gift className="w-5 h-5 text-[#651D2D]" />
            <span>{copy.redeemTitle}</span>
          </h3>
          <p className="text-xs text-[#6A5A4E] mt-1">{copy.redeemSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {REDEMPTION_TIERS.map((tier) => {
            const canRedeem = balance >= tier.points;
            const isBusy = redeemingPts === tier.points;
            const deficit = tier.points - balance;

            return (
              <div
                key={tier.points}
                className={`rounded-lg border p-5 flex flex-col justify-between gap-4 transition-colors ${
                  canRedeem
                    ? 'bg-white border-[#B18A4A]/55 shadow-sm'
                    : 'bg-[#FAF6EE]/70 border-[#B18A4A]/25'
                }`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#651D2D]">
                      {tier.points} {copy.ptsRequired}
                    </span>
                    <Ticket className="w-4 h-4 text-[#B18A4A]" />
                  </div>
                  <p className="font-serif-display text-2xl font-bold text-[#332821] tabular-nums">
                    {formatINR(tier.discountValue)} Off
                  </p>
                  <p className="text-[11px] text-[#6A5A4E]">
                    {copy.minOrderPrefix} {formatINR(tier.minOrderAmount)}
                  </p>
                </div>

                <button
                  type="button"
                  disabled={!canRedeem || redeemingPts !== null}
                  onClick={() => handleRedeemVoucher(tier)}
                  className={`w-full py-2 px-3 rounded-md text-xs font-semibold transition-colors ${
                    canRedeem
                      ? 'bg-[#651D2D] text-[#F5EFE4] hover:bg-[#4F1522]'
                      : 'bg-[#EFE7D6] text-[#6A5A4E] cursor-not-allowed'
                  }`}
                >
                  {isBusy
                    ? copy.redeeming
                    : canRedeem
                    ? copy.redeemNow
                    : copy.needMorePts(deficit)}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Vouchers & Points Ledger Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Issued Loyalty Vouchers */}
        <section className="lg:col-span-6 bg-[#FAF6EE] border border-[#B18A4A]/35 rounded-lg p-6 space-y-4">
          <h3 className="font-serif-display text-lg font-semibold text-[#332821] flex items-center gap-2">
            <Ticket className="w-4 h-4 text-[#651D2D]" />
            <span>
              {copy.vouchersTitle} ({loyaltyVouchers.length})
            </span>
          </h3>

          {loyaltyVouchers.length === 0 ? (
            <p className="text-xs text-[#6A5A4E] bg-white border border-[#B18A4A]/20 rounded-md p-4">
              {copy.noVouchers}
            </p>
          ) : (
            <div className="space-y-3">
              {loyaltyVouchers.map((voucher) => {
                const isActive = voucher.status === 'active';
                return (
                  <div
                    key={voucher.id}
                    className={`rounded-md border p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isActive
                        ? 'bg-white border-[#651D2D]/40'
                        : 'bg-white/60 border-[#B18A4A]/20 opacity-70'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono-code text-sm font-bold text-[#651D2D]">
                          {voucher.code}
                        </span>
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                            isActive
                              ? 'bg-[#1B5E3A]/10 text-[#1B5E3A]'
                              : 'bg-[#EFE7D6] text-[#6A5A4E]'
                          }`}
                        >
                          {isActive ? copy.voucherActive : copy.voucherUsed}
                        </span>
                      </div>
                      <p className="text-xs text-[#332821] font-medium">
                        {formatINR(voucher.discountValue)} Off · {copy.minOrderPrefix}{' '}
                        {formatINR(voucher.minOrderAmount)}
                      </p>
                      <p className="text-[11px] text-[#6A5A4E]">
                        {voucher.pointsUsed} {copy.ptsRequired} · {formatTxDate(voucher.createdAt)}
                      </p>
                    </div>

                    {isActive && (
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleCopyCode(voucher.code)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 border border-[#B18A4A]/50 text-[#332821] text-xs font-medium rounded hover:border-[#651D2D] hover:text-[#651D2D]"
                        >
                          {copiedCode === voucher.code ? (
                            <Check className="w-3.5 h-3.5 text-[#1B5E3A]" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                          <span>{copy.copyCode}</span>
                        </button>
                        <Link
                          to="/shop"
                          className="px-3 py-1.5 bg-[#651D2D] text-[#F5EFE4] text-xs font-semibold rounded hover:bg-[#4F1522]"
                        >
                          {copy.useAtCheckout}
                        </Link>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Points Activity Ledger */}
        <section className="lg:col-span-6 bg-[#FAF6EE] border border-[#B18A4A]/35 rounded-lg p-6 space-y-4">
          <h3 className="font-serif-display text-lg font-semibold text-[#332821] flex items-center gap-2">
            <History className="w-4 h-4 text-[#651D2D]" />
            <span>
              {copy.ledgerTitle} ({loyaltyTransactions.length})
            </span>
          </h3>

          {loyaltyTransactions.length === 0 ? (
            <p className="text-xs text-[#6A5A4E] bg-white border border-[#B18A4A]/20 rounded-md p-4">
              {copy.noLedger}
            </p>
          ) : (
            <div className="divide-y divide-[#B18A4A]/20 bg-white border border-[#B18A4A]/25 rounded-md px-4">
              {loyaltyTransactions.map((tx) => {
                const isEarn = tx.type === 'earn';
                return (
                  <div key={tx.id} className="py-3 flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2.5 min-w-0">
                      <span
                        className={`w-7 h-7 rounded flex items-center justify-center shrink-0 mt-0.5 ${
                          isEarn
                            ? 'bg-[#1B5E3A]/10 text-[#1B5E3A]'
                            : 'bg-[#651D2D]/10 text-[#651D2D]'
                        }`}
                      >
                        {isEarn ? (
                          <ArrowDownLeft className="w-4 h-4" />
                        ) : (
                          <ArrowUpRight className="w-4 h-4" />
                        )}
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-[#332821] leading-snug">
                          {tx.description}
                        </p>
                        <p className="text-[11px] text-[#6A5A4E] mt-0.5">
                          {tx.orderNumber ? `${tx.orderNumber} · ` : ''}
                          {formatTxDate(tx.createdAt)}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <p
                        className={`text-xs font-bold tabular-nums ${
                          isEarn ? 'text-[#1B5E3A]' : 'text-[#651D2D]'
                        }`}
                      >
                        {isEarn ? '+' : '-'}
                        {tx.points} {copy.ptsRequired}
                      </p>
                      <p className="text-[11px] text-[#6A5A4E] tabular-nums">
                        {formatINR(tx.rupeeValue)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
