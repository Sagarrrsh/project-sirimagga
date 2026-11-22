export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5 select-none whitespace-nowrap shrink-0">
      {/* Vector Shuttle & Warp Emblem matching the uploaded SIRIMAGGA crest */}
      <svg
        width={compact ? 28 : 34}
        height={compact ? 28 : 34}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        {/* Top warp arc & threads (Antique Gold) */}
        <path d="M13 11C18 6.5 25 6.5 30 11" stroke="#B18A4A" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M16 12L21 7.5M19.5 14L25 8.5M23 16.5L28.5 11" stroke="#B18A4A" strokeWidth="1.3" strokeLinecap="round" />
        {/* Bottom warp arc & threads (Deep Maroon) */}
        <path d="M10 29C15 33.5 22 33.5 27 29" stroke="#651D2D" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M11.5 28L17 22.5M15 30.5L20.5 25M19 32L24 27" stroke="#651D2D" strokeWidth="1.3" strokeLinecap="round" />
        {/* Diagonal Wooden Shuttle */}
        <path
          d="M8 9C15 11 26 19 32 31C23 28 14 21 8 9Z"
          fill="#FAF6EE"
          stroke="#B18A4A"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        {/* Inner Bobbin */}
        <path
          d="M14 14.5L25.5 25.5"
          stroke="#651D2D"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        <circle cx="20" cy="20" r="1.4" fill="#F5EFE4" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="font-serif-display text-lg sm:text-xl font-bold tracking-[0.06em] text-[#332821]">
          SIRIMAGGA
        </span>
        {!compact && (
          <span className="text-[11px] font-medium tracking-wide text-[#651D2D] mt-0.5">
            ಸಿರಿಮಗ್ಗ · Bagalkot
          </span>
        )}
      </span>
    </span>
  );
}
