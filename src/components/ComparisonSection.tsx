import React from 'react';
import { X, Check, Utensils, AlertTriangle, ShieldCheck } from 'lucide-react';

export const ComparisonSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-stone-900/40 border-t border-stone-800/80 text-stone-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
            Clear Distinction
          </span>
          <h2 className="text-3xl font-bold font-serif text-white">
            Why Most Restaurants Secretly Lose 40% of Diners
          </h2>
          <p className="text-sm text-stone-400">
            A small friction point on a smartphone turns away dozens of hungry customers every single weekend.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* The Old Way */}
          <div className="p-6 sm:p-8 rounded-3xl bg-stone-950/70 border border-red-500/20 space-y-4">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
              <AlertTriangle className="w-4 h-4" />
              <span>The Outdated Status Quo</span>
            </div>

            <ul className="space-y-3 text-xs sm:text-sm text-stone-400">
              <li className="flex items-start gap-2.5">
                <X className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-stone-300">Pinch-to-zoom PDF menus</strong> that take forever to download and frustrate mobile guests.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <X className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-stone-300">20% to 30% commission gouging</strong> paid to third-party delivery apps on every single order.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <X className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-stone-300">Missing tap-to-call or tap-to-navigate</strong>, sending hungry walk-in diners to competitors.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <X className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-stone-300">Outdated prices &amp; old dishes</strong> because editing website code is a stressful chore.
                </span>
              </li>
            </ul>
          </div>

          {/* The Ridge Creative Way */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-stone-900 to-stone-950 border border-amber-500/40 shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <ShieldCheck className="w-4 h-4" />
              <span>The Ridge Creative Standard</span>
            </div>

            <ul className="space-y-3 text-xs sm:text-sm text-stone-300">
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Instant interactive mobile menus</strong> with crisp dietary filters, fast dish photos, and search.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">0% commission direct ordering</strong> so you keep every penny of your hard-earned culinary margins.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">1-tap Google Maps &amp; phone link</strong> anchored right at the thumb-zone for immediate bookings.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Hands-off menu updates</strong> — just text or email us your price tweaks, and we update them for you.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
