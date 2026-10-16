import React from 'react';
import { ArrowDown, ShieldCheck, Sparkles, Smartphone, DollarSign, Palette, MapPin, Zap } from 'lucide-react';

interface AgencyHeroProps {
  onOpenInquiry: (tier?: 'pilot' | 'growth' | 'premium') => void;
  onRequestMockup: () => void;
}

export const AgencyHero: React.FC<AgencyHeroProps> = ({ onOpenInquiry, onRequestMockup }) => {
  return (
    <section id="hero" className="relative pt-8 pb-14 sm:pt-16 sm:pb-20 overflow-hidden text-stone-100 w-full max-w-full">
      {/* Background subtle radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-amber-500/10 via-amber-900/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-3.5 sm:px-6 lg:px-8 text-center relative z-10 space-y-5 sm:space-y-6">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900/90 border border-amber-500/30 text-amber-300 text-[11px] sm:text-xs font-semibold shadow-xs max-w-full">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="truncate">⚡ 48h Launch Guarantee • First 3 Clients $0 Setup</span>
        </div>

        {/* Discovery Channels Pills */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 max-w-xl mx-auto">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold bg-pink-500/15 text-pink-300 border border-pink-500/30">
            📸 Instagram
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
            🎵 TikTok
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold bg-blue-500/15 text-blue-300 border border-blue-500/30">
            👥 Facebook
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
            📍 Google Maps
          </span>
        </div>

        {/* High-agency headline */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white font-serif leading-[1.2] px-1">
          Turn Social &amp; Google Maps Diners into{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 italic">
            Full Tables &amp; Direct Orders.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-stone-300 font-light leading-relaxed px-1">
          Whether guests discover you on <strong>Instagram</strong>, <strong>TikTok</strong>, <strong>Facebook</strong>, or searching on <strong>Google Maps</strong> — we engineer bespoke, mobile-first dining websites that eliminate 30% delivery app fees, replace unreadable PDF menus, and bring customers straight to you.
        </p>

        {/* Founding Client Banner */}
        <div className="max-w-2xl mx-auto p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-stone-900 via-stone-900/95 to-stone-900 border border-amber-500/40 text-left shadow-xl space-y-2">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2 text-amber-300 font-semibold text-xs sm:text-sm">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0"></span>
              <span>Founding Partner Offer — First 3 Clients Only</span>
            </div>
            <span className="text-[11px] font-bold text-amber-400/90 font-mono bg-amber-500/15 px-2 py-0.5 rounded-md border border-amber-500/20">
              Only 1 Spot Left
            </span>
          </div>

          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            To build our initial flagship dining showcase, we are offering our{' '}
            <strong className="text-white font-bold">$499 custom build for $0 setup + $99/month</strong> for our first 3 restaurant partners. Your website is <strong className="text-amber-300">guaranteed live within 48 hours</strong> with full cloud hosting, interactive mobile menu, Google Maps integration, and monthly dish updates included.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 pt-2 w-full max-w-lg mx-auto sm:max-w-none">
          <button
            onClick={() => onOpenInquiry('pilot')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 text-xs sm:text-sm font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-full shadow-lg transition-all active:scale-95 cursor-pointer"
          >
            <span>Claim Founding Spot ($0 Setup)</span>
            <Sparkles className="w-4 h-4 shrink-0" />
          </button>

          <button
            onClick={onRequestMockup}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 text-xs sm:text-sm font-semibold text-white hover:text-amber-300 bg-stone-900/90 hover:bg-stone-800 border border-amber-500/40 rounded-full transition-all cursor-pointer shadow-md"
          >
            <Palette className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Request Free Mockup First</span>
          </button>

          <a
            href="#offers"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-stone-400 hover:text-white transition-colors"
          >
            <span>View All 3 Offers</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 3 Pillars / Trust Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-8 border-t border-stone-800/60 max-w-4xl mx-auto text-left">
          <div className="flex items-start gap-3 p-3 rounded-xl bg-stone-900/40 border border-stone-800/60">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
              <DollarSign className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Zero Commissions</h4>
              <p className="text-[11px] sm:text-xs text-stone-400 mt-0.5">Keep 100% of your diner food &amp; order margins.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-stone-900/40 border border-stone-800/60">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Multi-Channel Traffic</h4>
              <p className="text-[11px] sm:text-xs text-stone-400 mt-0.5">Built for Instagram, TikTok, Facebook &amp; Maps diners.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-stone-900/40 border border-stone-800/60">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">48h Live Launch</h4>
              <p className="text-[11px] sm:text-xs text-stone-400 mt-0.5">Rapid turnaround with month-to-month flexibility.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
