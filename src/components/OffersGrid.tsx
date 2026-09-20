import React from 'react';
import { Check, Sparkles, Star, ArrowRight, ShieldCheck, Clock, Utensils, HeartHandshake, Palette } from 'lucide-react';
import { PACKAGES } from '../data/packages';
import { PackageTier } from '../types';

interface OffersGridProps {
  onSelectTier: (tier: PackageTier) => void;
  onRequestMockup?: () => void;
}

export const OffersGrid: React.FC<OffersGridProps> = ({ onSelectTier, onRequestMockup }) => {
  return (
    <section id="offers" className="py-16 sm:py-24 bg-stone-900/60 border-y border-stone-800/80 text-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Transparent Agency Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-serif">
            Select Your Dining Partnership Tier
          </h2>
          <p className="text-sm sm:text-base text-stone-400">
            All packages include custom mobile-first website design, high-speed cloud hosting, and monthly maintenance so your digital doors never close.
          </p>
        </div>

        {/* The 3 Packages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* PACKAGE 1: Founding Partner Pilot ($0 Setup + $99/mo) */}
          <div className="relative rounded-3xl bg-gradient-to-b from-stone-900 to-stone-950 border-2 border-amber-500/50 p-6 sm:p-8 flex flex-col justify-between shadow-2xl transition-all hover:border-amber-400">
            {/* Top Badge */}
            <div className="absolute -top-3.5 left-6 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-amber-500 text-stone-950 shadow-md">
              <Star className="w-3.5 h-3.5 fill-stone-950" />
              <span>{PACKAGES.pilot.badge}</span>
            </div>

            <div className="space-y-6 pt-2">
              <div>
                <h3 className="text-2xl font-bold text-white font-serif">{PACKAGES.pilot.name}</h3>
                <div className="text-sm font-bold text-amber-400 font-mono mt-1">
                  {PACKAGES.pilot.pricingHeader} <span className="text-xs text-stone-400 line-through font-sans">(${PACKAGES.pilot.originalSetupFee} setup)</span>
                </div>
                <p className="text-xs text-amber-300 font-medium mt-1">{PACKAGES.pilot.tagline}</p>
                <p className="text-xs text-stone-400 mt-2 leading-relaxed">{PACKAGES.pilot.description}</p>
              </div>

              {/* Price Block */}
              <div className="p-4 rounded-2xl bg-stone-950/80 border border-amber-500/30 space-y-1">
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-serif">$0</span>
                  <span className="text-sm text-stone-400 line-through font-medium">
                    ${PACKAGES.pilot.originalSetupFee} setup
                  </span>
                  <span className="text-stone-500 text-sm font-semibold">+</span>
                  <span className="text-2xl sm:text-3xl font-bold text-white font-serif">${PACKAGES.pilot.monthlyFee}</span>
                  <span className="text-sm text-stone-300 font-medium">/month</span>
                </div>
                <div className="text-[11px] text-amber-200/90 font-medium flex items-center gap-1 pt-1">
                  <Check className="w-3.5 h-3.5 text-amber-400" />
                  <span>Setup fee 100% waived for our first 3 clients</span>
                </div>
              </div>

              {/* Deliverables Checklist */}
              <div className="space-y-2.5">
                <div className="text-xs font-bold uppercase tracking-wider text-stone-300">
                  Included Website Architecture:
                </div>
                <ul className="space-y-2 text-xs text-stone-300">
                  {PACKAGES.pilot.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Ongoing Maintenance */}
              <div className="p-3.5 rounded-xl bg-stone-900/60 border border-stone-800 text-xs space-y-1.5">
                <div className="font-semibold text-stone-200 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Full Ongoing Maintenance:</span>
                </div>
                <div className="text-stone-400 space-y-1 text-[11px]">
                  {PACKAGES.pilot.maintenanceIncludes.map((m, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-stone-500"></span>
                      <span>{m}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-stone-800 space-y-3">
              <div className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/25">
                <span className="text-amber-200 font-semibold flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Launch Guarantee:</span>
                </span>
                <span className="font-bold text-white font-serif">{PACKAGES.pilot.turnaroundTime}</span>
              </div>

              <button
                onClick={() => onSelectTier('pilot')}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 transition-all active:scale-[0.98] shadow-md cursor-pointer"
              >
                <span>{PACKAGES.pilot.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* PACKAGE 2: Growth & Direct Ordering ($299 Setup + $99/mo) */}
          <div className="relative rounded-3xl bg-gradient-to-b from-stone-900 to-stone-950 border border-stone-800 p-6 sm:p-8 flex flex-col justify-between shadow-xl transition-all hover:border-stone-700">
            {/* Top Badge */}
            <div className="absolute -top-3.5 left-6 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-stone-800 text-stone-200 border border-stone-700 shadow-md">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>{PACKAGES.growth.badge}</span>
            </div>

            <div className="space-y-6 pt-2">
              <div>
                <h3 className="text-2xl font-bold text-white font-serif">{PACKAGES.growth.name}</h3>
                <div className="text-sm font-bold text-amber-400 font-mono mt-1">
                  {PACKAGES.growth.pricingHeader}
                </div>
                <p className="text-xs text-stone-300 font-medium mt-1">{PACKAGES.growth.tagline}</p>
                <p className="text-xs text-stone-400 mt-2 leading-relaxed">{PACKAGES.growth.description}</p>
              </div>

              {/* Price Block */}
              <div className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800 space-y-1">
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-serif">${PACKAGES.growth.setupFee}</span>
                  <span className="text-sm text-stone-300 font-semibold">setup</span>
                  <span className="text-stone-500 text-sm font-bold">+</span>
                  <span className="text-2xl sm:text-3xl font-bold text-white font-serif">${PACKAGES.growth.monthlyFee}</span>
                  <span className="text-sm text-stone-300 font-medium">/month</span>
                </div>
                <div className="text-[11px] text-stone-400 font-medium flex items-center gap-1 pt-1">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Direct commission-free ordering engine</span>
                </div>
              </div>

              {/* Deliverables Checklist */}
              <div className="space-y-2.5">
                <div className="text-xs font-bold uppercase tracking-wider text-stone-300">
                  Included Website Architecture:
                </div>
                <ul className="space-y-2 text-xs text-stone-300">
                  {PACKAGES.growth.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Ongoing Maintenance */}
              <div className="p-3.5 rounded-xl bg-stone-900/60 border border-stone-800 text-xs space-y-1.5">
                <div className="font-semibold text-stone-200 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Full Ongoing Maintenance:</span>
                </div>
                <div className="text-stone-400 space-y-1 text-[11px]">
                  {PACKAGES.growth.maintenanceIncludes.map((m, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-stone-500"></span>
                      <span>{m}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-stone-800 space-y-3">
              <div className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-stone-900 border border-stone-800">
                <span className="text-stone-300 font-semibold flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Launch Guarantee:</span>
                </span>
                <span className="font-bold text-white font-serif">{PACKAGES.growth.turnaroundTime}</span>
              </div>

              <button
                onClick={() => onSelectTier('growth')}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold text-white bg-stone-800 hover:bg-stone-700 border border-stone-700 transition-all active:scale-[0.98] cursor-pointer"
              >
                <span>{PACKAGES.growth.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* PACKAGE 3: VIP Full Maintenance ($499 Setup + $149/mo) */}
          <div className="relative rounded-3xl bg-gradient-to-b from-stone-900 to-stone-950 border border-stone-800 p-6 sm:p-8 flex flex-col justify-between shadow-xl transition-all hover:border-stone-700">
            {/* Top Badge */}
            <div className="absolute -top-3.5 left-6 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-stone-800 text-stone-200 border border-stone-700 shadow-md">
              <Utensils className="w-3 h-3 text-amber-400" />
              <span>{PACKAGES.premium.badge}</span>
            </div>

            <div className="space-y-6 pt-2">
              <div>
                <h3 className="text-2xl font-bold text-white font-serif">{PACKAGES.premium.name}</h3>
                <div className="text-sm font-bold text-amber-400 font-mono mt-1">
                  {PACKAGES.premium.pricingHeader}
                </div>
                <p className="text-xs text-stone-300 font-medium mt-1">{PACKAGES.premium.tagline}</p>
                <p className="text-xs text-stone-400 mt-2 leading-relaxed">{PACKAGES.premium.description}</p>
              </div>

              {/* Price Block */}
              <div className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800 space-y-1">
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-serif">${PACKAGES.premium.setupFee}</span>
                  <span className="text-sm text-stone-300 font-semibold">setup</span>
                  <span className="text-stone-500 text-sm font-bold">+</span>
                  <span className="text-2xl sm:text-3xl font-bold text-white font-serif">${PACKAGES.premium.monthlyFee}</span>
                  <span className="text-sm text-stone-300 font-medium">/month</span>
                </div>
                <div className="text-[11px] text-stone-400 font-medium flex items-center gap-1 pt-1">
                  <Check className="w-3.5 h-3.5 text-purple-400" />
                  <span>White-glove same-day priority updates &amp; reviews</span>
                </div>
              </div>

              {/* Deliverables Checklist */}
              <div className="space-y-2.5">
                <div className="text-xs font-bold uppercase tracking-wider text-stone-300">
                  Included Website Architecture:
                </div>
                <ul className="space-y-2 text-xs text-stone-300">
                  {PACKAGES.premium.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Ongoing Maintenance */}
              <div className="p-3.5 rounded-xl bg-stone-900/60 border border-stone-800 text-xs space-y-1.5">
                <div className="font-semibold text-stone-200 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Full VIP Ongoing Maintenance:</span>
                </div>
                <div className="text-stone-400 space-y-1 text-[11px]">
                  {PACKAGES.premium.maintenanceIncludes.map((m, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-stone-500"></span>
                      <span>{m}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-stone-800 space-y-3">
              <div className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-stone-900 border border-stone-800">
                <span className="text-stone-300 font-semibold flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Launch Guarantee:</span>
                </span>
                <span className="font-bold text-white font-serif">{PACKAGES.premium.turnaroundTime}</span>
              </div>

              <button
                onClick={() => onSelectTier('premium')}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold text-white bg-stone-800 hover:bg-stone-700 border border-stone-700 transition-all active:scale-[0.98] cursor-pointer"
              >
                <span>{PACKAGES.premium.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Free Mockup Callout Box */}
        {onRequestMockup && (
          <div className="p-6 rounded-2xl bg-stone-950/90 border border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="space-y-1">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
                <Palette className="w-4 h-4 text-amber-400" />
                <span>Want to test our craftsmanship first?</span>
              </div>
              <p className="text-sm text-stone-300">
                Request a <strong className="text-white">Free Custom Mobile Mockup</strong>. Only need your Instagram username or link — zero obligation, delivered in 24–48h.
              </p>
            </div>

            <button
              onClick={onRequestMockup}
              className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Get Free Mockup</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
