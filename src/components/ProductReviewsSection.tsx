import React, { useEffect, useMemo, useState } from 'react';
import {
  collection,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  where,
} from 'firebase/firestore';
import { CheckCircle2, Clock, Lock, Star } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useStore } from '../contexts/StoreContext';
import { OperationType, db, handleFirestoreError } from '../lib/firebase';
import type { Product, Review } from '../types';

interface ProductReviewsSectionProps {
  product: Product;
}

function formatReviewDate(ts: unknown): string {
  const seconds = (ts as { seconds?: number } | undefined)?.seconds;
  if (!seconds) return 'Recently';
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(seconds * 1000));
}

export function ProductReviewsSection({ product }: ProductReviewsSectionProps) {
  const { reviews, showToast } = useStore();
  const { user, profile, authReady, signInWithGoogle } = useAuth();
  const { t, localizeProductTitle } = useLanguage();

  const [myReviews, setMyReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [customerName, setCustomerName] = useState('');
  const [city, setCity] = useState('');
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [submittedConfirmation, setSubmittedConfirmation] = useState(false);

  const displayTitle = localizeProductTitle(product.productCode, product.title);

  useEffect(() => {
    const preferredName = profile?.displayName || user?.displayName || '';
    if (preferredName && !customerName) {
      setCustomerName(preferredName);
    }
  }, [profile?.displayName, user?.displayName, customerName]);

  useEffect(() => {
    setSubmittedConfirmation(false);
    setFormError(null);
  }, [product.id]);

  useEffect(() => {
    if (!authReady || !user) {
      setMyReviews([]);
      return;
    }

    const unsub = onSnapshot(
      query(collection(db, 'reviews'), where('userId', '==', user.uid)),
      (snap) => {
        const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Review);
        list.sort((a, b) => {
          const tA = (a.createdAt as { seconds?: number } | undefined)?.seconds || 0;
          const tB = (b.createdAt as { seconds?: number } | undefined)?.seconds || 0;
          return tB - tA;
        });
        setMyReviews(list);
      },
      (err) => handleFirestoreError(err, OperationType.LIST, 'reviews')
    );

    return () => unsub();
  }, [authReady, user]);

  const approvedProductReviews = useMemo(() => {
    return reviews.filter(
      (r) =>
        r.status === 'approved' &&
        (r.productId === product.id ||
          (!r.productId &&
            r.sareePurchased?.toLowerCase() === product.title.toLowerCase()))
    );
  }, [reviews, product.id, product.title]);

  const myUnpublishedForProduct = useMemo(() => {
    return myReviews.filter(
      (r) => r.productId === product.id && r.status !== 'approved'
    );
  }, [myReviews, product.id]);

  const stats = useMemo(() => {
    const total = approvedProductReviews.length;
    if (total === 0) {
      return {
        total: 0,
        average: 0,
        counts: [5, 4, 3, 2, 1].map((star) => ({ star, count: 0, pct: 0 })),
      };
    }
    const sum = approvedProductReviews.reduce((acc, r) => acc + r.rating, 0);
    const counts = [5, 4, 3, 2, 1].map((star) => {
      const count = approvedProductReviews.filter(
        (r) => Math.round(r.rating) === star
      ).length;
      return { star, count, pct: Math.round((count / total) * 100) };
    });
    return {
      total,
      average: Number((sum / total).toFixed(1)),
      counts,
    };
  }, [approvedProductReviews]);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setFormError(null);

    const cleanName = customerName.trim().slice(0, 80);
    const cleanCity = city.trim().slice(0, 80);
    const cleanComment = comment.trim().slice(0, 600);
    const cleanRating = Math.min(5, Math.max(1, Math.round(rating)));

    if (cleanName.length < 2) {
      setFormError(t.reviews.errName);
      return;
    }
    if (cleanCity.length < 2) {
      setFormError(t.reviews.errCity);
      return;
    }
    if (cleanComment.length < 5) {
      setFormError(t.reviews.errComment);
      return;
    }

    const reviewId = `rev_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const path = `reviews/${reviewId}`;

    setSubmitting(true);
    try {
      await setDoc(doc(db, 'reviews', reviewId), {
        customerName: cleanName,
        city: cleanCity,
        sareePurchased: product.title.slice(0, 140),
        productId: product.id,
        productCode: product.productCode.slice(0, 40),
        productTitle: product.title.slice(0, 140),
        rating: cleanRating,
        comment: cleanComment,
        status: 'pending',
        isDemo: false,
        userId: user.uid,
        createdAt: serverTimestamp(),
      });
      setComment('');
      setRating(5);
      setSubmittedConfirmation(true);
      showToast(t.reviews.toastSubmitted);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, path);
    } finally {
      setSubmitting(false);
    }
  };

  const activeRating = hoverRating || rating;

  return (
    <section
      id="customer-reviews"
      className="mt-16 pt-12 border-t border-[#B18A4A]/25"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#651D2D]">
            {t.reviews.kicker}
          </p>
          <h2 className="font-serif-display text-2xl sm:text-3xl font-semibold text-[#332821] mt-1">
            {t.reviews.title}
          </h2>
        </div>
        <p className="text-xs text-[#6A5A4E] max-w-md">{t.reviews.moderationNote}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Rating Summary + Submission Form */}
        <div className="lg:col-span-5 space-y-6">
          {/* Aggregate Rating Card */}
          <div className="bg-[#FAF6EE] border border-[#B18A4A]/35 rounded-lg p-6 space-y-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-3xl font-serif-display font-bold text-[#332821] tabular-nums">
                  {stats.total > 0 ? stats.average.toFixed(1) : '—'}
                  <span className="text-base font-normal text-[#6A5A4E]"> / 5</span>
                </p>
                <div className="flex items-center gap-1 mt-1" aria-hidden="true">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        stats.total > 0 && star <= Math.round(stats.average)
                          ? 'fill-[#B18A4A] text-[#B18A4A]'
                          : 'text-[#B18A4A]/35'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-[#332821] tabular-nums">
                  {stats.total}{' '}
                  {stats.total === 1
                    ? t.reviews.publishedSingular
                    : t.reviews.publishedPlural}
                </p>
                <p className="text-xs text-[#6A5A4E] font-mono-code mt-0.5">
                  {product.productCode}
                </p>
              </div>
            </div>

            <div className="space-y-2 pt-3 border-t border-[#B18A4A]/20">
              {stats.counts.map((row) => (
                <div key={row.star} className="flex items-center gap-3 text-xs">
                  <span className="w-8 text-[#332821] font-medium tabular-nums">
                    {row.star} ★
                  </span>
                  <div className="flex-1 h-2 bg-[#EFE7D6] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#B18A4A] transition-all duration-300"
                      style={{ width: `${row.pct}%` }}
                    />
                  </div>
                  <span className="w-8 text-right text-[#6A5A4E] tabular-nums">
                    {row.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Review Submission Module */}
          <div className="bg-white border border-[#B18A4A]/35 rounded-lg p-6 space-y-5">
            <div>
              <h3 className="font-serif-display text-xl font-semibold text-[#332821]">
                {t.reviews.shareTitle}
              </h3>
              <p className="text-xs text-[#6A5A4E] mt-1">
                {t.reviews.reviewingPrefix} {displayTitle}
              </p>
            </div>

            {!authReady ? (
              <p className="text-xs text-[#6A5A4E]">{t.reviews.checkingAuth}</p>
            ) : !user ? (
              <div className="bg-[#FAF6EE] border border-[#B18A4A]/30 rounded-md p-5 space-y-3">
                <div className="flex items-start gap-2.5 text-xs text-[#332821]">
                  <Lock className="w-4 h-4 text-[#651D2D] shrink-0 mt-0.5" />
                  <span>{t.reviews.signInPrompt}</span>
                </div>
                <button
                  type="button"
                  onClick={() => signInWithGoogle()}
                  className="w-full py-2.5 px-4 bg-[#651D2D] text-[#F5EFE4] text-xs font-semibold rounded-md hover:bg-[#4F1522] transition-colors"
                >
                  {t.reviews.signInBtn}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                {submittedConfirmation && (
                  <div className="bg-[#FAF6EE] border border-[#B18A4A]/45 rounded-md p-3.5 flex items-start gap-2.5 text-xs text-[#332821]">
                    <CheckCircle2 className="w-4 h-4 text-[#651D2D] shrink-0 mt-0.5" />
                    <span>{t.reviews.submittedBanner}</span>
                  </div>
                )}

                {formError && (
                  <p className="text-xs text-red-700 font-medium">{formError}</p>
                )}

                <div>
                  <label className="block text-xs font-semibold text-[#332821] mb-2">
                    {t.reviews.yourRating}
                  </label>
                  <div className="flex items-center gap-3">
                    <div
                      className="flex items-center gap-1"
                      onMouseLeave={() => setHoverRating(0)}
                    >
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          aria-label={`Rate ${star} out of 5 stars`}
                          className="p-1 transition-transform hover:scale-110"
                        >
                          <Star
                            className={`w-6 h-6 transition-colors ${
                              star <= activeRating
                                ? 'fill-[#B18A4A] text-[#B18A4A]'
                                : 'text-[#B18A4A]/35'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                    <span className="text-xs text-[#651D2D] font-medium tabular-nums">
                      {activeRating} / 5 · {t.reviews.ratingLabels[activeRating]}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="review-name"
                      className="block text-xs font-medium text-[#332821] mb-1"
                    >
                      {t.reviews.yourName}
                    </label>
                    <input
                      id="review-name"
                      type="text"
                      required
                      minLength={2}
                      maxLength={80}
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Meera Joshi"
                      className="w-full px-3 py-2 bg-[#FAF6EE] border border-[#B18A4A]/40 rounded-md text-sm text-[#332821] focus:outline-none focus:border-[#651D2D]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="review-city"
                      className="block text-xs font-medium text-[#332821] mb-1"
                    >
                      {t.reviews.cityState}
                    </label>
                    <input
                      id="review-city"
                      type="text"
                      required
                      minLength={2}
                      maxLength={80}
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Hubballi, Karnataka"
                      className="w-full px-3 py-2 bg-[#FAF6EE] border border-[#B18A4A]/40 rounded-md text-sm text-[#332821] focus:outline-none focus:border-[#651D2D]"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label
                      htmlFor="review-comment"
                      className="block text-xs font-medium text-[#332821]"
                    >
                      {t.reviews.yourReview}
                    </label>
                    <span className="text-[11px] text-[#6A5A4E] tabular-nums">
                      {comment.length} / 600
                    </span>
                  </div>
                  <textarea
                    id="review-comment"
                    rows={4}
                    required
                    minLength={5}
                    maxLength={600}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder={t.reviews.commentPlaceholder}
                    className="w-full px-3 py-2 bg-[#FAF6EE] border border-[#B18A4A]/40 rounded-md text-sm text-[#332821] focus:outline-none focus:border-[#651D2D]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-2.5 px-5 bg-[#651D2D] text-[#F5EFE4] text-sm font-semibold rounded-md hover:bg-[#4F1522] disabled:opacity-60 transition-colors"
                >
                  {submitting ? t.reviews.submittingBtn : t.reviews.submitBtn}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right Column: User's Pending Reviews (Private) + Published Public Reviews */}
        <div className="lg:col-span-7 space-y-4">
          {myUnpublishedForProduct.map((rev) => (
            <article
              key={rev.id}
              className="bg-[#FAF6EE] border border-dashed border-[#B18A4A]/60 rounded-lg p-5 space-y-2.5"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="inline-flex items-center gap-1.5 font-semibold text-[#651D2D]">
                  <Clock className="w-3.5 h-3.5" />
                  {rev.status === 'pending'
                    ? t.reviews.pendingBadge
                    : t.reviews.rejectedBadge}
                </span>
                <span className="text-[#6A5A4E] tabular-nums">
                  {formatReviewDate(rev.createdAt)}
                </span>
              </div>
              <div className="flex items-center gap-1 text-[#B18A4A]" aria-label={`${rev.rating} out of 5 stars`}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`w-3.5 h-3.5 ${
                      s <= Math.round(rev.rating)
                        ? 'fill-[#B18A4A] text-[#B18A4A]'
                        : 'text-[#B18A4A]/30'
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-[#332821] leading-relaxed">
                &ldquo;{rev.comment}&rdquo;
              </p>
              <p className="text-xs text-[#6A5A4E]">
                {rev.customerName} · {rev.city} · {t.reviews.visibleOnlyYou}
              </p>
              {rev.status === 'rejected' && rev.moderatorNote && (
                <p className="text-xs text-[#651D2D] pt-1 border-t border-[#B18A4A]/20">
                  {t.reviews.adminNotePrefix} {rev.moderatorNote}
                </p>
              )}
            </article>
          ))}

          {approvedProductReviews.length === 0 ? (
            <div className="bg-[#FAF6EE]/70 border border-[#B18A4A]/25 rounded-lg p-8 text-center space-y-2">
              <p className="font-serif-display text-lg text-[#332821]">
                {t.reviews.noReviewsTitle}
              </p>
              <p className="text-xs text-[#6A5A4E] max-w-md mx-auto">
                {t.reviews.noReviewsSub}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {approvedProductReviews.map((rev) => (
                <article
                  key={rev.id}
                  className="bg-white border border-[#B18A4A]/30 rounded-lg p-6 space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div
                      className="flex items-center gap-1"
                      aria-label={`${rev.rating} out of 5 stars`}
                    >
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
                    <span className="text-xs text-[#6A5A4E] tabular-nums">
                      {rev.isDemo
                        ? t.reviews.demoFeaturedLabel
                        : `${t.reviews.verifiedPatronLabel} · ${formatReviewDate(rev.createdAt)}`}
                    </span>
                  </div>

                  <p className="text-sm text-[#332821] leading-relaxed">
                    &ldquo;{rev.comment}&rdquo;
                  </p>

                  <footer className="pt-3 border-t border-[#B18A4A]/15 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <p className="font-semibold text-[#332821]">
                      {rev.customerName}
                      <span className="font-normal text-[#6A5A4E]"> · {rev.city}</span>
                    </p>
                    {rev.productCode && (
                      <span className="font-mono-code text-[#6A5A4E]">
                        {rev.productCode}
                      </span>
                    )}
                  </footer>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
