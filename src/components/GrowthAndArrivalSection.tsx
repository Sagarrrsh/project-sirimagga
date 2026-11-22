import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock, Compass, Package, Truck } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const STEP_ICONS = [Compass, Package, Clock, Truck];

export function GrowthAndArrivalSection() {
  const { t } = useLanguage();
  const zones = t.arrival.zones;
  const [selectedZoneId, setSelectedZoneId] = useState<string>(zones[0]?.id || 'north-karnataka');

  const selectedZone = zones.find((z) => z.id === selectedZoneId) || zones[0];

  return (
    <section
      id="how-it-arrives"
      className="py-16 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8"
    >
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-[#B18A4A]/30 pb-6">
        <div className="space-y-2 max-w-2xl">
          <p className="text-xs font-medium tracking-[0.14em] uppercase text-[#651D2D]">
            {t.arrival.kicker}
          </p>
          <h2 className="font-serif-display text-2xl sm:text-3xl font-semibold text-[#332821] text-balance">
            {t.arrival.title}
          </h2>
        </div>
        <Link
          to="/track-order"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#651D2D] hover:underline whitespace-nowrap"
        >
          <span>{t.arrival.trackExisting}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* 4-Step Operational Arrival Flow */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {t.arrival.steps.map((item, idx) => {
          const Icon = STEP_ICONS[idx] || Compass;
          return (
            <div
              key={item.title}
              className="bg-white border border-[#B18A4A]/30 rounded-lg p-5 space-y-2.5 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono-code font-semibold text-[#651D2D] tabular-nums">
                    {item.step}
                  </span>
                  <Icon className="w-4 h-4 text-[#B18A4A]" />
                </div>
                <h3 className="font-serif-display text-base font-semibold text-[#332821]">
                  {item.title}
                </h3>
                <p className="text-xs text-[#6A5A4E] leading-relaxed">{item.text}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Split Ledger: Regional Arrival Estimator + Upcoming Loom Drop Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Regional Delivery ETA Estimator & Table */}
        <div className="lg:col-span-7 bg-[#FAF6EE] border border-[#B18A4A]/35 rounded-lg p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-serif-display text-lg font-semibold text-[#332821]">
                {t.arrival.scheduleTitle}
              </h3>
              <p className="text-xs text-[#6A5A4E]">{t.arrival.scheduleSub}</p>
            </div>
            <select
              aria-label={t.arrival.tableRegion}
              value={selectedZone.id}
              onChange={(e) => setSelectedZoneId(e.target.value)}
              className="px-3 py-2 bg-white border border-[#B18A4A]/45 rounded-md text-xs font-medium text-[#332821] focus:outline-none focus:border-[#651D2D]"
            >
              {zones.map((z) => (
                <option key={z.id} value={z.id}>
                  {z.zone}
                </option>
              ))}
            </select>
          </div>

          {/* Highlighted Selected Region Readout */}
          <div className="bg-white border border-[#B18A4A]/30 rounded-md p-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-[#6A5A4E]">
                {t.arrival.prepLabel}
              </p>
              <p className="text-base font-bold text-[#332821] tabular-nums mt-0.5">
                {selectedZone.prepWindow}
              </p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-[#6A5A4E]">
                {t.arrival.transitLabel}
              </p>
              <p className="text-base font-bold text-[#332821] tabular-nums mt-0.5">
                {selectedZone.transitWindow}
              </p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-[#651D2D] font-semibold">
                {t.arrival.etaLabel}
              </p>
              <p className="text-base font-bold text-[#651D2D] tabular-nums mt-0.5">
                {selectedZone.totalWindow}
              </p>
            </div>
            <p className="sm:col-span-3 text-xs text-[#6A5A4E] pt-2 border-t border-[#B18A4A]/15">
              {selectedZone.carrierNote}
            </p>
          </div>

          {/* Full Tabular Reference */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="text-[#6A5A4E] border-b border-[#B18A4A]/25">
                <tr>
                  <th className="py-2 pr-3 font-semibold">{t.arrival.tableRegion}</th>
                  <th className="py-2 px-3 font-semibold">{t.arrival.tablePrep}</th>
                  <th className="py-2 px-3 font-semibold">{t.arrival.tableTransit}</th>
                  <th className="py-2 pl-3 font-semibold text-right">{t.arrival.tableTotalEta}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#B18A4A]/15">
                {zones.map((z) => (
                  <tr
                    key={z.id}
                    onClick={() => setSelectedZoneId(z.id)}
                    className={`cursor-pointer transition-colors ${
                      z.id === selectedZone.id ? 'bg-white font-medium' : 'hover:bg-white/60'
                    }`}
                  >
                    <td className="py-2.5 pr-3 text-[#332821]">{z.zone}</td>
                    <td className="py-2.5 px-3 text-[#6A5A4E] tabular-nums whitespace-nowrap">
                      {z.prepWindow}
                    </td>
                    <td className="py-2.5 px-3 text-[#6A5A4E] tabular-nums whitespace-nowrap">
                      {z.transitWindow}
                    </td>
                    <td className="py-2.5 pl-3 text-right font-semibold text-[#651D2D] tabular-nums whitespace-nowrap">
                      {z.totalWindow}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Upcoming Loom Drop Schedule */}
        <div className="lg:col-span-5 bg-[#332821] text-[#F5EFE4] border border-[#B18A4A]/45 rounded-lg p-6 space-y-5">
          <div className="flex items-start justify-between gap-3 border-b border-[#B18A4A]/25 pb-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] text-[#B18A4A] font-semibold">
                {t.arrival.calendarKicker}
              </p>
              <h3 className="font-serif-display text-xl font-semibold text-[#F5EFE4] mt-1">
                {t.arrival.calendarTitle}
              </h3>
            </div>
            <Calendar className="w-5 h-5 text-[#B18A4A] shrink-0" />
          </div>

          <div className="divide-y divide-[#B18A4A]/20">
            {t.arrival.drops.map((drop) => (
              <div key={drop.title} className="py-3.5 first:pt-0 last:pb-0 space-y-1">
                <p className="font-mono-code text-[11px] text-[#B18A4A]">{drop.cadence}</p>
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-serif-display text-base font-semibold text-[#F5EFE4]">
                    {drop.title}
                  </h4>
                  <Link
                    to={drop.filterLink}
                    className="text-xs text-[#B18A4A] hover:underline whitespace-nowrap shrink-0"
                  >
                    {t.arrival.browseLink}
                  </Link>
                </div>
                <p className="text-xs text-[#F5EFE4]/80 leading-relaxed">{drop.detail}</p>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-[#B18A4A]/25 flex items-center justify-between gap-3 text-xs">
            <span className="text-[#F5EFE4]/80">{t.arrival.madeToOrderNote}</span>
            <Link
              to="/shop?filter=new"
              className="px-3.5 py-2 bg-[#B18A4A] text-[#332821] font-semibold rounded hover:bg-[#c69d5a] transition-colors whitespace-nowrap shrink-0"
            >
              {t.arrival.newDropsBtn}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
