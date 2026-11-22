import { doc, serverTimestamp, writeBatch } from 'firebase/firestore';
import type { Language } from '../i18n/translations';
import type { LoyaltySummary, LoyaltyTierId } from '../types';
import { OperationType, db, handleFirestoreError } from './firebase';

export const EARN_RUPEES_PER_POINT = 100;
export const RUPEE_VALUE_PER_POINT = 5;

export interface RedemptionTierOption {
  points: number;
  discountValue: number;
  minOrderAmount: number;
}

export const REDEMPTION_TIERS: RedemptionTierOption[] = [
  { points: 10, discountValue: 50, minOrderAmount: 250 },
  { points: 25, discountValue: 125, minOrderAmount: 500 },
  { points: 50, discountValue: 250, minOrderAmount: 1000 },
  { points: 100, discountValue: 500, minOrderAmount: 2000 },
];

export function calculatePointsEarned(netRupees: number): number {
  if (!Number.isFinite(netRupees) || netRupees <= 0) return 0;
  return Math.max(1, Math.floor(netRupees / EARN_RUPEES_PER_POINT));
}

export interface LoyaltyTierInfo {
  id: LoyaltyTierId;
  nextTierId: LoyaltyTierId | null;
  progressPercent: number;
  pointsToNext: number;
}

export function getLoyaltyTierInfo(lifetimeEarned: number): LoyaltyTierInfo {
  const safePoints = Math.max(0, Math.floor(lifetimeEarned));
  if (safePoints >= 500) {
    return {
      id: 'royal',
      nextTierId: null,
      progressPercent: 100,
      pointsToNext: 0,
    };
  }
  if (safePoints >= 100) {
    return {
      id: 'gold',
      nextTierId: 'royal',
      progressPercent: Math.min(100, Math.round(((safePoints - 100) / 400) * 100)),
      pointsToNext: 500 - safePoints,
    };
  }
  return {
    id: 'bronze',
    nextTierId: 'gold',
    progressPercent: Math.min(100, Math.round((safePoints / 100) * 100)),
    pointsToNext: 100 - safePoints,
  };
}

export async function redeemPointsForVoucher(params: {
  userId: string;
  tier: RedemptionTierOption;
  currentSummary: LoyaltySummary | null;
}): Promise<string> {
  const { userId, tier, currentSummary } = params;
  const currentBalance = currentSummary?.pointsBalance ?? 0;
  const currentLifetime = currentSummary?.lifetimeEarned ?? 0;
  const currentRedeemed = currentSummary?.totalRedeemed ?? 0;

  if (currentBalance < tier.points) {
    throw new Error('Insufficient Loom Points for this reward voucher.');
  }

  const suffix = Math.floor(1000 + Math.random() * 8999);
  const voucherCode = `SRM-LP-${suffix}`;
  const voucherId = `lvc_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
  const txId = `ltx_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;

  const batch = writeBatch(db);
  const summaryRef = doc(db, 'users', userId, 'loyalty_summary', 'account');

  const nextBalance = currentBalance - tier.points;
  const nextRedeemed = currentRedeemed + tier.points;

  if (currentSummary) {
    batch.update(summaryRef, {
      pointsBalance: nextBalance,
      lifetimeEarned: currentLifetime,
      totalRedeemed: nextRedeemed,
      updatedAt: serverTimestamp(),
    });
  } else {
    batch.set(summaryRef, {
      userId,
      pointsBalance: nextBalance,
      lifetimeEarned: currentLifetime,
      totalRedeemed: nextRedeemed,
      updatedAt: serverTimestamp(),
    });
  }

  batch.set(doc(db, 'users', userId, 'loyalty_vouchers', voucherId), {
    userId,
    code: voucherCode,
    pointsUsed: tier.points,
    discountValue: tier.discountValue,
    minOrderAmount: tier.minOrderAmount,
    status: 'active',
    createdAt: serverTimestamp(),
  });

  batch.set(doc(db, 'users', userId, 'loyalty_transactions', txId), {
    userId,
    type: 'voucher_issued',
    points: tier.points,
    rupeeValue: tier.discountValue,
    voucherCode,
    description: `Redeemed ${tier.points} pts for ₹${tier.discountValue} discount voucher (${voucherCode})`,
    createdAt: serverTimestamp(),
  });

  try {
    await batch.commit();
    return voucherCode;
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `users/${userId}/loyalty_vouchers/${voucherId}`);
  }
}

export const LOYALTY_COPY: Record<
  Language,
  {
    programTitle: string;
    tabLabel: string;
    headerBadgeSuffix: string;
    availablePoints: string;
    discountValueLabel: string;
    lifetimeEarned: string;
    totalRedeemed: string;
    tiers: Record<LoyaltyTierId, string>;
    nextTierPrompt: (pts: number, tierName: string) => string;
    topTierReached: string;
    howItWorksTitle: string;
    ruleEarn: string;
    ruleValue: string;
    ruleRedeem: string;
    redeemTitle: string;
    redeemSubtitle: string;
    ptsRequired: string;
    minOrderPrefix: string;
    redeemNow: string;
    redeeming: string;
    needMorePts: (pts: number) => string;
    voucherSuccessToast: (code: string, discount: number) => string;
    vouchersTitle: string;
    noVouchers: string;
    voucherActive: string;
    voucherUsed: string;
    copyCode: string;
    copiedToast: (code: string) => string;
    useAtCheckout: string;
    ledgerTitle: string;
    noLedger: string;
    checkoutTitle: string;
    checkoutEarnPreview: (pts: number) => string;
    checkoutRedeemHint: (pts: number, rupeeVal: number) => string;
    checkoutApplyVoucherLabel: string;
    checkoutDirectPtsLabel: string;
    checkoutClearReward: string;
    checkoutDiscountLine: string;
    checkoutAppliedMsg: (pts: number, amt: string) => string;
    confirmEarnedBanner: (pts: number) => string;
  }
> = {
  en: {
    programTitle: 'SIRIMAGGA Loom Circle',
    tabLabel: 'Loyalty Rewards',
    headerBadgeSuffix: 'Loom Pts',
    availablePoints: 'Available Loom Points',
    discountValueLabel: 'Redeemable Value',
    lifetimeEarned: 'Lifetime Earned',
    totalRedeemed: 'Points Redeemed',
    tiers: {
      bronze: 'Bronze Weaver',
      gold: 'Antique Gold Patron',
      royal: 'Royal Heritage Circle',
    },
    nextTierPrompt: (pts, tierName) => `${pts} more pts to reach ${tierName}`,
    topTierReached: 'Highest SIRIMAGGA Patron Tier Unlocked',
    howItWorksTitle: 'How Loom Rewards Work',
    ruleEarn: 'Earn 1 Loom Point for every ₹100 spent on saree orders.',
    ruleValue: 'Each Loom Point equals ₹5 toward future saree purchases.',
    ruleRedeem: 'Redeem points here for voucher codes or apply points directly at checkout.',
    redeemTitle: 'Redeem Points for Future Discounts',
    redeemSubtitle: 'Convert your Loom Points into personal discount vouchers anytime.',
    ptsRequired: 'pts',
    minOrderPrefix: 'Min. order',
    redeemNow: 'Redeem Voucher',
    redeeming: 'Issuing...',
    needMorePts: (pts) => `Need ${pts} more pts`,
    voucherSuccessToast: (code, discount) =>
      `Voucher ${code} (₹${discount} Off) issued to your account!`,
    vouchersTitle: 'Your Loyalty Discount Vouchers',
    noVouchers: 'No reward vouchers issued yet. Earn points on your saree orders to unlock discounts.',
    voucherActive: 'Ready to Use',
    voucherUsed: 'Redeemed',
    copyCode: 'Copy Code',
    copiedToast: (code) => `Copied voucher ${code}`,
    useAtCheckout: 'Shop & Apply',
    ledgerTitle: 'Points Activity Ledger',
    noLedger: 'Place your first saree order to start earning Loom Points automatically.',
    checkoutTitle: 'SIRIMAGGA Loom Rewards',
    checkoutEarnPreview: (pts) => `You will earn +${pts} Loom Points with this order`,
    checkoutRedeemHint: (pts, rupeeVal) =>
      `Available balance: ${pts} pts (worth ₹${rupeeVal} off)`,
    checkoutApplyVoucherLabel: 'Your Active Loyalty Vouchers',
    checkoutDirectPtsLabel: 'Or redeem points directly on this order',
    checkoutClearReward: 'Remove Reward',
    checkoutDiscountLine: 'Loom Rewards Discount',
    checkoutAppliedMsg: (pts, amt) => `Applied ${pts} Loom Points (-${amt})`,
    confirmEarnedBanner: (pts) => `+${pts} Loom Points credited to your SIRIMAGGA account!`,
  },
  hi: {
    programTitle: 'SIRIMAGGA लूम सर्कल',
    tabLabel: 'लॉयल्टी रिवॉर्ड्स',
    headerBadgeSuffix: 'लूम पॉइंट्स',
    availablePoints: 'उपलब्ध लूम पॉइंट्स',
    discountValueLabel: 'रिडीम मूल्य',
    lifetimeEarned: 'कुल अर्जित पॉइंट्स',
    totalRedeemed: 'उपयोग किए गए पॉइंट्स',
    tiers: {
      bronze: 'कांस्य बुनकर सदस्य',
      gold: 'एंटीक गोल्ड संरक्षक',
      royal: 'रॉयल हेरिटेज सर्कल',
    },
    nextTierPrompt: (pts, tierName) => `${tierName} स्तर के लिए ${pts} और पॉइंट्स अर्जित करें`,
    topTierReached: 'SIRIMAGGA का सर्वोच्च संरक्षक स्तर अनलॉक',
    howItWorksTitle: 'लूम रिवॉर्ड्स कैसे काम करते हैं',
    ruleEarn: 'प्रत्येक ₹100 की साड़ी खरीदारी पर 1 लूम पॉइंट अर्जित करें।',
    ruleValue: '1 लूम पॉइंट = भविष्य की खरीदारी पर ₹5 की छूट।',
    ruleRedeem: 'यहाँ वाउचर बनाएं या सीधे चेकआउट पर पॉइंट्स रिडीम करें।',
    redeemTitle: 'भविष्य की छूट के लिए पॉइंट्स रिडीम करें',
    redeemSubtitle: 'अपने लूम पॉइंट्स को तुरंत पर्सनल डिस्काउंट वाउचर में बदलें।',
    ptsRequired: 'पॉइंट्स',
    minOrderPrefix: 'न्यूनतम ऑर्डर',
    redeemNow: 'वाउचर पाएं',
    redeeming: 'जारी हो रहा है...',
    needMorePts: (pts) => `${pts} और पॉइंट्स चाहिए`,
    voucherSuccessToast: (code, discount) =>
      `वाउचर ${code} (₹${discount} छूट) आपके खाते में जुड़ गया!`,
    vouchersTitle: 'आपके लॉयल्टी डिस्काउंट वाउचर',
    noVouchers: 'अभी तक कोई वाउचर नहीं है। साड़ी ऑर्डर पर पॉइंट्स अर्जित करके वाउचर बनाएं।',
    voucherActive: 'उपयोग के लिए तैयार',
    voucherUsed: 'उपयोग हो चुका',
    copyCode: 'कोड कॉपी करें',
    copiedToast: (code) => `वाउचर ${code} कॉपी किया गया`,
    useAtCheckout: 'खरीदारी करें',
    ledgerTitle: 'पॉइंट्स गतिविधि विवरण',
    noLedger: 'लूम पॉइंट्स अर्जित करने के लिए अपना पहला साड़ी ऑर्डर करें।',
    checkoutTitle: 'SIRIMAGGA लूम रिवॉर्ड्स',
    checkoutEarnPreview: (pts) => `इस ऑर्डर से आपको +${pts} लूम पॉइंट्स मिलेंगे`,
    checkoutRedeemHint: (pts, rupeeVal) =>
      `उपलब्ध बैलेंस: ${pts} पॉइंट्स (₹${rupeeVal} तक की छूट)`,
    checkoutApplyVoucherLabel: 'आपके सक्रिय लॉयल्टी वाउचर',
    checkoutDirectPtsLabel: 'या इस ऑर्डर पर सीधे पॉइंट्स लागू करें',
    checkoutClearReward: 'हटाएं',
    checkoutDiscountLine: 'लूम रिवॉर्ड्स छूट',
    checkoutAppliedMsg: (pts, amt) => `${pts} लूम पॉइंट्स लागू (-${amt})`,
    confirmEarnedBanner: (pts) => `आपके खाते में +${pts} लूम पॉइंट्स जोड़े गए!`,
  },
  kn: {
    programTitle: 'SIRIMAGGA ಲೂಮ್ ಸರ್ಕಲ್',
    tabLabel: 'ಲಾಯಲ್ಟಿ ರಿವಾರ್ಡ್ಸ್',
    headerBadgeSuffix: 'ಲೂಮ್ ಪಾಯಿಂಟ್ಸ್',
    availablePoints: 'ಲಭ್ಯವಿರುವ ಲೂಮ್ ಪಾಯಿಂಟ್ಸ್',
    discountValueLabel: 'ರಿಡೀಮ್ ಮೌಲ್ಯ',
    lifetimeEarned: 'ಒಟ್ಟು ಗಳಿಸಿದ ಪಾಯಿಂಟ್ಸ್',
    totalRedeemed: 'ಬಳಸಿದ ಪಾಯಿಂಟ್ಸ್',
    tiers: {
      bronze: 'ಕಂಚಿನ ನೇಯ್ಗೆ ಸದಸ್ಯ',
      gold: 'ಆಂಟಿಕ್ ಗೋಲ್ಡ್ ಪೋಷಕ',
      royal: 'ರಾಯಲ್ ಹೆರಿಟೇಜ್ ಸರ್ಕಲ್',
    },
    nextTierPrompt: (pts, tierName) => `${tierName} ಹಂತ ತಲುಪಲು ಇನ್ನೂ ${pts} ಪಾಯಿಂಟ್ಸ್ ಬೇಕು`,
    topTierReached: 'SIRIMAGGA ದ ಅತ್ಯುನ್ನತ ಪೋಷಕ ಹಂತ ತಲುಪಲಾಗಿದೆ',
    howItWorksTitle: 'ಲೂಮ್ ರಿವಾರ್ಡ್ಸ್ ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ',
    ruleEarn: 'ಪ್ರತಿ ₹100 ಸೀರೆ ಖರೀದಿಗೆ 1 ಲೂಮ್ ಪಾಯಿಂಟ್ ಗಳಿಸಿ.',
    ruleValue: '1 ಲೂಮ್ ಪಾಯಿಂಟ್ = ಮುಂದಿನ ಸೀರೆ ಖರೀದಿಯಲ್ಲಿ ₹5 ರಿಯಾಯಿತಿ.',
    ruleRedeem: 'ಇಲ್ಲಿ ವೋಚರ್ ಪಡೆಯಿರಿ ಅಥವಾ ಚೆಕ್‌ಔಟ್‌ನಲ್ಲಿ ನೇರವಾಗಿ ಪಾಯಿಂಟ್ಸ್ ಬಳಸಿ.',
    redeemTitle: 'ಮುಂದಿನ ರಿಯಾಯಿತಿಗಾಗಿ ಪಾಯಿಂಟ್ಸ್ ರಿಡೀಮ್ ಮಾಡಿ',
    redeemSubtitle: 'ನಿಮ್ಮ ಲೂಮ್ ಪಾಯಿಂಟ್ಸ್‌ಗಳನ್ನು ತಕ್ಷಣ ಡಿಸ್ಕೌಂಟ್ ವೋಚರ್ ಆಗಿ ಪರಿವರ್ತಿಸಿ.',
    ptsRequired: 'ಪಾಯಿಂಟ್ಸ್',
    minOrderPrefix: 'ಕನಿಷ್ಠ ಆರ್ಡರ್',
    redeemNow: 'ವೋಚರ್ ಪಡೆಯಿರಿ',
    redeeming: 'ಸಿದ್ಧವಾಗುತ್ತಿದೆ...',
    needMorePts: (pts) => `ಇನ್ನೂ ${pts} ಪಾಯಿಂಟ್ಸ್ ಅಗತ್ಯವಿದೆ`,
    voucherSuccessToast: (code, discount) =>
      `ವೋಚರ್ ${code} (₹${discount} ರಿಯಾಯಿತಿ) ನಿಮ್ಮ ಖಾತೆಗೆ ಸೇರಿಸಲಾಗಿದೆ!`,
    vouchersTitle: 'ನಿಮ್ಮ ಲಾಯಲ್ಟಿ ರಿಯಾಯಿತಿ ವೋಚರ್‌ಗಳು',
    noVouchers: 'ಇನ್ನೂ ಯಾವುದೇ ವೋಚರ್ ಇಲ್ಲ. ರಿಯಾಯಿತಿ ಪಡೆಯಲು ಸೀರೆ ಆರ್ಡರ್‌ಗಳ ಮೂಲಕ ಪಾಯಿಂಟ್ಸ್ ಗಳಿಸಿ.',
    voucherActive: 'ಬಳಕೆಗೆ ಸಿದ್ಧ',
    voucherUsed: 'ಬಳಸಲಾಗಿದೆ',
    copyCode: 'ಕೋಡ್ ಕಾಪಿ ಮಾಡಿ',
    copiedToast: (code) => `ವೋಚರ್ ${code} ಕಾಪಿ ಮಾಡಲಾಗಿದೆ`,
    useAtCheckout: 'ಶಾಪಿಂಗ್ ಮಾಡಿ',
    ledgerTitle: 'ಪಾಯಿಂಟ್ಸ್ ವಹಿವಾಟು ಪಟ್ಟಿ',
    noLedger: 'ಲೂಮ್ ಪಾಯಿಂಟ್ಸ್ ಗಳಿಸಲು ನಿಮ್ಮ ಮೊದಲ ಸೀರೆ ಆರ್ಡರ್ ಮಾಡಿ.',
    checkoutTitle: 'SIRIMAGGA ಲೂಮ್ ರಿವಾರ್ಡ್ಸ್',
    checkoutEarnPreview: (pts) => `ಈ ಆರ್ಡರ್‌ನಿಂದ ನಿಮಗೆ +${pts} ಲೂಮ್ ಪಾಯಿಂಟ್ಸ್ ದೊರೆಯುತ್ತವೆ`,
    checkoutRedeemHint: (pts, rupeeVal) =>
      `ಲಭ್ಯ ಬ್ಯಾಲೆನ್ಸ್: ${pts} ಪಾಯಿಂಟ್ಸ್ (₹${rupeeVal} ರಿಯಾಯಿತಿ ಮೌಲ್ಯ)`,
    checkoutApplyVoucherLabel: 'ನಿಮ್ಮ ಸಕ್ರಿಯ ಲಾಯಲ್ಟಿ ವೋಚರ್‌ಗಳು',
    checkoutDirectPtsLabel: 'ಅಥವಾ ಈ ಆರ್ಡರ್‌ನಲ್ಲಿ ನೇರವಾಗಿ ಪಾಯಿಂಟ್ಸ್ ಬಳಸಿ',
    checkoutClearReward: 'ತೆಗೆಯಿರಿ',
    checkoutDiscountLine: 'ಲೂಮ್ ರಿವಾರ್ಡ್ಸ್ ರಿಯಾಯಿತಿ',
    checkoutAppliedMsg: (pts, amt) => `${pts} ಲೂಮ್ ಪಾಯಿಂಟ್ಸ್ ಅನ್ವಯಿಸಲಾಗಿದೆ (-${amt})`,
    confirmEarnedBanner: (pts) => `ನಿಮ್ಮ SIRIMAGGA ಖಾತೆಗೆ +${pts} ಲೂಮ್ ಪಾಯಿಂಟ್ಸ್ ಸೇರಿಸಲಾಗಿದೆ!`,
  },
};
