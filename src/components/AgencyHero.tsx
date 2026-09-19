import React from 'react';
import { ArrowDown, CheckCircle2, ShieldCheck, Sparkles, Smartphone, TrendingUp, DollarSign, Palette } from 'lucide-react';

interface AgencyHeroProps {
  onOpenInquiry: (tier?: 'pilot' | 'growth' | 'premium') => void;
  onRequestMockup: () => void;
}

export const AgencyHero: React.FC<AgencyHeroProps> = ({ onOpenInquiry, onRequestMockup }) => {
  return (
    <section id="hero" className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 overflow-hidden text-stone-100">
      {/* Background subtle radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-amber-500/10 via-amber-900/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900/90 border border-amber-500/30 text-amber-300 text-xs font-medium shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>⚡ All Packages Live Within 48 Hours • First 3 Clients $0 Setup</span>
        </div>

        {/* High-agency headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-serif leading-[1.15]">
          Turn Instagram Scrollers into{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 italic">
            Full Dining Tables
          </span>{' '}
          &amp; Direct Orders.
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-stone-300 font-light leading-relaxed">
          We engineer bespoke, lightning-fast dining websites that replace unreadable PDF menus, eliminate 30% third-party delivery commissions, and keep your diners coming directly to you.
        </p>

        {/* Founding Client Banner (Honest, High-Agency, No Fake Urgency) */}
        <div className="max-w-2xl mx-auto p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-stone-900 via-stone-900/95 to-stone-900 border border-amber-500/40 text-left shadow-xl space-y-2">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2 text-amber-300 font-semibold text-xs sm:text-sm">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              <span>Founding Partner Offer — First 3 Clients Only</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-bold border border-amber-500/30">
              1 of 3 Spots Remaining
            </span>
          </div>

          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            To build our initial flagship dining portfolio, we are offering our{' '}
            <strong className="text-white font-bold">$499 custom build for $0 setup + $99/month</strong> for our first 3 restaurant partners. Your website is <strong className="text-amber-300">guaranteed live within 48 hours</strong> with full cloud hosting, mobile menu, and monthly dish updates included.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => onOpenInquiry('pilot')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-full shadow-lg transition-all active:scale-95 cursor-pointer"
          >
            <span>Claim Founding Spot ($0 Setup)</span>
            <Sparkles className="w-4 h-4" />
          </button>

          <button
            onClick={onRequestMockup}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white hover:text-amber-300 bg-stone-900/90 hover:bg-stone-800 border border-amber-500/40 rounded-full transition-all cursor-pointer shadow-md"
          >
            <Palette className="w-4 h-4 text-amber-400" />
            <span>Request Free Mockup First</span>
          </button>

          <a
            href="#offers"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-3.5 text-xs font-semibold text-stone-400 hover:text-white transition-colors"
          >
            <span>View All 3 Offers</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 3 Pillars / Trust Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-10 border-t border-stone-800/60 max-w-4xl mx-auto text-left">
          <div className="flex items-start gap-3 p-3 rounded-xl bg-stone-900/40 border border-stone-800/60">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
              <DollarSign className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Zero Commissions</h4>
              <p className="text-xs text-stone-400 mt-0.5">Keep 100% of your diner order revenue.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-stone-900/40 border border-stone-800/60">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Mobile-First Speed</h4>
              <p className="text-xs text-stone-400 mt-0.5">Instant menus with zero PDF pinch-to-zoom.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-stone-900/40 border border-stone-800/60">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Cancel Anytime</h4>
              <p className="text-xs text-stone-400 mt-0.5">No lock-in contracts. 100% peace of mind.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
