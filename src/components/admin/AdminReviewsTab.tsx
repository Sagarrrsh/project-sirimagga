import { useMemo, useState } from 'react';
import { deleteDoc, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { Check, Clock, EyeOff, Search, Star, Trash2 } from 'lucide-react';
import { OperationType, db, handleFirestoreError } from '../../lib/firebase';
import type { Review, ReviewModerationStatus } from '../../types';

interface AdminReviewsTabProps {
  reviews: Review[];
  onShowToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

type FilterTab = 'pending' | 'approved' | 'rejected' | 'all';

function formatReviewDate(ts: unknown): string {
  const seconds = (ts as { seconds?: number } | undefined)?.seconds;
  if (!seconds) return 'Recently';
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(seconds * 1000));
}

export function AdminReviewsTab({ reviews, onShowToast }: AdminReviewsTabProps) {
  const [filter, setFilter] = useState<FilterTab>('pending');
  const [search, setSearch] = useState('');
  const [notesById, setNotesById] = useState<Record<string, string>>({});
  const [busyId, setBusyId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const normalizedReviews = useMemo(() => {
    return reviews.map((r) => ({
      ...r,
      effectiveStatus: (r.status || (r.isDemo ? 'approved' : 'pending')) as ReviewModerationStatus,
    }));
  }, [reviews]);

  const counts = useMemo(() => {
    const pending = normalizedReviews.filter((r) => r.effectiveStatus === 'pending').length;
    const approved = normalizedReviews.filter((r) => r.effectiveStatus === 'approved').length;
    const rejected = normalizedReviews.filter((r) => r.effectiveStatus === 'rejected').length;
    const approvedList = normalizedReviews.filter((r) => r.effectiveStatus === 'approved');
    const avgApproved =
      approvedList.length > 0
        ? (
            approvedList.reduce((acc, r) => acc + r.rating, 0) / approvedList.length
          ).toFixed(1)
        : '—';
    return { pending, approved, rejected, avgApproved };
  }, [normalizedReviews]);

  const filteredReviews = useMemo(() => {
    const q = search.trim().toLowerCase();
    return normalizedReviews.filter((r) => {
      if (filter !== 'all' && r.effectiveStatus !== filter) return false;
      if (!q) return true;
      return (
        r.customerName.toLowerCase().includes(q) ||
        r.city.toLowerCase().includes(q) ||
        r.comment.toLowerCase().includes(q) ||
        (r.productTitle || '').toLowerCase().includes(q) ||
        (r.productCode || '').toLowerCase().includes(q) ||
        (r.sareePurchased || '').toLowerCase().includes(q)
      );
    });
  }, [normalizedReviews, filter, search]);

  const handleModerate = async (
    review: Review & { effectiveStatus: ReviewModerationStatus },
    nextStatus: ReviewModerationStatus
  ) => {
    const path = `reviews/${review.id}`;
    setBusyId(review.id);
    try {
      const note = (notesById[review.id] ?? review.moderatorNote ?? '')
        .trim()
        .slice(0, 300);

      const updatePayload: Record<string, unknown> = {
        status: nextStatus,
        moderatedAt: serverTimestamp(),
      };
      if (note) {
        updatePayload.moderatorNote = note;
      }
      await updateDoc(doc(db, 'reviews', review.id), updatePayload);
      onShowToast(
        nextStatus === 'approved'
          ? `Review by ${review.customerName} approved & published.`
          : nextStatus === 'rejected'
          ? `Review by ${review.customerName} hidden from storefront.`
          : `Review moved back to pending queue.`,
        nextStatus === 'approved' ? 'success' : 'info'
      );
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, path);
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (review: Review) => {
    const path = `reviews/${review.id}`;
    setBusyId(review.id);
    try {
      await deleteDoc(doc(db, 'reviews', review.id));
      setConfirmDeleteId(null);
      onShowToast(`Deleted review by ${review.customerName}.`, 'info');
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, path);
    } finally {
      setBusyId(null);
    }
  };

  const filterTabs: { id: FilterTab; label: string }[] = [
    { id: 'pending', label: `Pending (${counts.pending})` },
    { id: 'approved', label: `Approved (${counts.approved})` },
    { id: 'rejected', label: `Rejected (${counts.rejected})` },
    { id: 'all', label: `All (${normalizedReviews.length})` },
  ];

  return (
    <div className="space-y-6">
      {/* KPI Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Pending Moderation', value: counts.pending },
          { label: 'Approved (Public)', value: counts.approved },
          { label: 'Rejected / Hidden', value: counts.rejected },
          { label: 'Avg Approved Rating', value: counts.avgApproved === '—' ? '—' : `${counts.avgApproved} ★` },
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

      {/* Filter & Search Bar */}
      <div className="bg-white border border-[#B18A4A]/30 rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-md text-xs font-semibold border transition-colors tabular-nums ${
                filter === tab.id
                  ? 'bg-[#651D2D] text-[#F5EFE4] border-[#651D2D]'
                  : 'bg-[#FAF6EE] text-[#332821] border-[#B18A4A]/30 hover:border-[#651D2D]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-[#6A5A4E] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search reviewer, city, code..."
            className="w-full pl-9 pr-3 py-2 bg-[#FAF6EE] border border-[#B18A4A]/35 rounded-md text-xs text-[#332821] focus:outline-none focus:border-[#651D2D]"
          />
        </div>
      </div>

      {/* Review List */}
      {filteredReviews.length === 0 ? (
        <div className="bg-white border border-[#B18A4A]/30 rounded-lg p-10 text-center space-y-2">
          <p className="font-serif-display text-lg text-[#332821]">
            No reviews in this queue
          </p>
          <p className="text-xs text-[#6A5A4E]">
            {filter === 'pending'
              ? 'All submitted customer reviews have been reviewed.'
              : 'Try switching tabs or clearing your search query.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredReviews.map((rev) => {
            const isBusy = busyId === rev.id;
            const noteVal = notesById[rev.id] ?? rev.moderatorNote ?? '';
            return (
              <article
                key={rev.id}
                className="bg-white border border-[#B18A4A]/30 rounded-lg p-5 space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span
                        className={`font-semibold ${
                          rev.effectiveStatus === 'approved'
                            ? 'text-[#2D6A4F]'
                            : rev.effectiveStatus === 'rejected'
                            ? 'text-red-700'
                            : 'text-[#651D2D]'
                        }`}
                      >
                        {rev.effectiveStatus === 'pending' && 'Pending Moderation'}
                        {rev.effectiveStatus === 'approved' && 'Approved · Live on Storefront'}
                        {rev.effectiveStatus === 'rejected' && 'Rejected · Hidden'}
                      </span>
                      <span aria-hidden="true" className="text-[#B18A4A]">·</span>
                      <span className="text-[#6A5A4E] tabular-nums">
                        {formatReviewDate(rev.createdAt)}
                      </span>
                      {rev.isDemo && (
                        <>
                          <span aria-hidden="true" className="text-[#B18A4A]">·</span>
                          <span className="text-[#6A5A4E]">Demo Seed</span>
                        </>
                      )}
                    </div>

                    <h3 className="font-serif-display text-base font-semibold text-[#332821]">
                      {rev.productTitle || rev.sareePurchased || 'Storefront Testimonial'}
                      {rev.productCode && (
                        <span className="ml-2 font-mono-code text-xs font-normal text-[#6A5A4E]">
                          ({rev.productCode})
                        </span>
                      )}
                    </h3>

                    <p className="text-xs text-[#6A5A4E]">
                      By <strong className="text-[#332821]">{rev.customerName}</strong> · {rev.city}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 shrink-0" aria-label={`${rev.rating} out of 5 stars`}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-4 h-4 ${
                          s <= Math.round(rev.rating)
                            ? 'fill-[#B18A4A] text-[#B18A4A]'
                            : 'text-[#B18A4A]/30'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-sm text-[#332821] bg-[#FAF6EE]/75 border border-[#B18A4A]/20 rounded-md p-3.5 leading-relaxed">
                  &ldquo;{rev.comment}&rdquo;
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-center pt-1">
                  <div className="lg:col-span-6">
                    <input
                      type="text"
                      maxLength={300}
                      value={noteVal}
                      onChange={(e) =>
                        setNotesById((prev) => ({ ...prev, [rev.id]: e.target.value }))
                      }
                      placeholder="Optional moderator note (shown to author if rejected)"
                      className="w-full px-3 py-2 bg-[#FAF6EE] border border-[#B18A4A]/30 rounded-md text-xs text-[#332821] focus:outline-none focus:border-[#651D2D]"
                    />
                  </div>

                  <div className="lg:col-span-6 flex flex-wrap items-center lg:justify-end gap-2">
                    {rev.effectiveStatus !== 'approved' && (
                      <button
                        type="button"
                        disabled={isBusy}
                        onClick={() => handleModerate(rev, 'approved')}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#651D2D] text-[#F5EFE4] text-xs font-semibold rounded-md hover:bg-[#4F1522] disabled:opacity-50 transition-colors"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Approve &amp; Publish</span>
                      </button>
                    )}

                    {rev.effectiveStatus !== 'rejected' && (
                      <button
                        type="button"
                        disabled={isBusy}
                        onClick={() => handleModerate(rev, 'rejected')}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-[#651D2D]/50 text-[#651D2D] text-xs font-semibold rounded-md hover:bg-[#651D2D]/5 disabled:opacity-50 transition-colors"
                      >
                        <EyeOff className="w-3.5 h-3.5" />
                        <span>Reject / Hide</span>
                      </button>
                    )}

                    {rev.effectiveStatus !== 'pending' && (
                      <button
                        type="button"
                        disabled={isBusy}
                        onClick={() => handleModerate(rev, 'pending')}
                        className="inline-flex items-center gap-1.5 px-3 py-2 border border-[#B18A4A]/45 text-[#332821] text-xs font-medium rounded-md hover:bg-[#FAF6EE] disabled:opacity-50 transition-colors"
                      >
                        <Clock className="w-3.5 h-3.5" />
                        <span>Move to Pending</span>
                      </button>
                    )}

                    {confirmDeleteId === rev.id ? (
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          type="button"
                          disabled={isBusy}
                          onClick={() => handleDelete(rev)}
                          className="px-3 py-2 bg-red-700 text-white text-xs font-semibold rounded-md hover:bg-red-800 disabled:opacity-50"
                        >
                          Confirm Delete
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteId(null)}
                          className="px-2.5 py-2 text-xs text-[#6A5A4E] hover:text-[#332821]"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setConfirmDeleteId(rev.id)}
                        aria-label={`Delete review by ${rev.customerName}`}
                        className="p-2 text-[#6A5A4E] hover:text-red-700 rounded-md hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
