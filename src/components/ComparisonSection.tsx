import React from 'react';
import { X, Check, AlertTriangle, ShieldCheck } from 'lucide-react';

export const ComparisonSection: React.FC = () => {
  return (
    <section className="py-12 sm:py-20 bg-stone-900/40 border-t border-stone-800/80 text-stone-100 w-full max-w-full overflow-hidden">
      <div className="max-w-5xl mx-auto px-3.5 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2.5">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
            Clear Distinction
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white">
            Why Most Restaurants Secretly Lose 40% of Diners
          </h2>
          <p className="text-xs sm:text-sm text-stone-400">
            When guests discover you on <strong>Instagram Reels</strong>, <strong>TikTok food clips</strong>, <strong>Facebook</strong>, or <strong>Google Maps</strong>, a small friction point on their phone sends them straight to a competitor.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* The Old Way */}
          <div className="p-5 sm:p-8 rounded-3xl bg-stone-950/70 border border-red-500/20 space-y-4">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
              <AlertTriangle className="w-4 h-4" />
              <span>The Outdated Status Quo</span>
            </div>

            <ul className="space-y-3 text-xs sm:text-sm text-stone-400">
              <li className="flex items-start gap-2.5">
                <X className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-stone-300">Pinch-to-zoom PDF menus</strong> that take forever to download and frustrate mobile guests tapping from their social bio link.
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
                  <strong className="text-stone-300">Missing tap-to-call or tap-to-navigate</strong>, losing Google Maps searchers looking for an immediate table tonight.
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
          <div className="p-5 sm:p-8 rounded-3xl bg-gradient-to-b from-stone-900 to-stone-950 border border-amber-500/40 shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <ShieldCheck className="w-4 h-4" />
              <span>The Ridge Creative Standard</span>
            </div>

            <ul className="space-y-3 text-xs sm:text-sm text-stone-300">
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Instant mobile menus</strong> loaded in under 1 second when diners click your Instagram, TikTok, or Facebook bio link.
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
                  <strong className="text-white">1-tap Google Maps directions &amp; phone link</strong> anchored right at the thumb-zone for immediate bookings.
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
