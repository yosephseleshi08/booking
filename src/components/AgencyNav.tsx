import React from 'react';
import { UtensilsCrossed, Sparkles, ArrowRight, Flame, Zap } from 'lucide-react';

interface AgencyNavProps {
  onOpenInquiry: (tier?: 'pilot' | 'growth' | 'premium') => void;
  onRequestMockup: () => void;
  onOpenDeals: () => void;
  unseenDealsCount: number;
}

export const AgencyNav: React.FC<AgencyNavProps> = ({
  onOpenInquiry,
  onRequestMockup,
  onOpenDeals,
  unseenDealsCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-stone-950/85 backdrop-blur-md border-b border-stone-800/80 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand identity */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center transition-colors group-hover:bg-amber-500 group-hover:text-stone-950">
            <UtensilsCrossed className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold tracking-tight text-white font-serif">
                Atelier Dining
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                <Zap className="w-2.5 h-2.5 fill-amber-400" />
                <span>48h Launch</span>
              </span>
            </div>
            <p className="text-[11px] text-stone-400 hidden md:block">
              Bespoke Web Design &amp; Maintenance for Restaurants
            </p>
          </div>
        </a>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Free Mockup Button */}
          <button
            onClick={onRequestMockup}
            className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-stone-900 hover:bg-stone-800 border border-amber-500/40 text-[11px] sm:text-xs font-semibold text-amber-300 hover:text-amber-200 transition-colors cursor-pointer"
          >
            <span>🎨 Free Mockup</span>
          </button>

          {/* Owner Deals Inbox Tracker Button */}
          <button
            onClick={onOpenDeals}
            className="relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-900 hover:bg-stone-800 border border-stone-700 text-xs font-semibold text-stone-200 hover:text-white transition-colors cursor-pointer"
            title="View claimed restaurant spots and mockup requests"
          >
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Deals Inbox</span>
            {unseenDealsCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-amber-400 text-stone-950 animate-pulse">
                {unseenDealsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => onOpenInquiry('pilot')}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-full shadow-xs transition-all active:scale-95 cursor-pointer"
          >
            <span>Claim $0 Spot</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
