import React, { useState } from 'react';
import { Palette, ArrowRight, Clock, ShieldCheck, Instagram, Sparkles } from 'lucide-react';

interface FreeMockupBannerProps {
  onRequestMockup: (handle?: string) => void;
}

export const FreeMockupBanner: React.FC<FreeMockupBannerProps> = ({ onRequestMockup }) => {
  const [handleInput, setHandleInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRequestMockup(handleInput.trim());
  };

  return (
    <section className="py-12 bg-stone-950 px-4 sm:px-6 lg:px-8 border-t border-b border-stone-800/80 relative overflow-hidden">
      {/* Subtle warm glow background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-stone-900 via-stone-900 to-amber-950/30 border border-amber-500/30 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-400/10 text-amber-300 border border-amber-500/30">
              <Palette className="w-3.5 h-3.5 text-amber-400" />
              <span>100% Free • No Credit Card • Zero Obligation</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              Want to see your restaurant first? <br className="hidden sm:inline" />
              <span className="text-amber-300">Request a Free Custom Mockup</span>
            </h3>

            <p className="text-sm text-stone-300 leading-relaxed">
              Only need your Instagram username or link. We’ll design a custom, mobile-first preview of your restaurant’s menu and DM it to you within 24–48 hours. If you love it, we can launch it live. If not, it costs you nothing.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-stone-400">
              <div className="flex items-center gap-1.5 text-stone-300">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Delivered in 24–48h</span>
              </div>
              <div className="flex items-center gap-1.5 text-stone-300">
                <Instagram className="w-4 h-4 text-pink-400" />
                <span>Sent to your Instagram DMs</span>
              </div>
              <div className="flex items-center gap-1.5 text-stone-300">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Zero Commitment</span>
              </div>
            </div>
          </div>

          {/* Frictionless 1-field submission right in the banner */}
          <div className="w-full lg:w-auto shrink-0 space-y-3">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 w-full max-w-md">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-500">
                  <Instagram className="w-4 h-4 text-pink-400" />
                </div>
                <input
                  type="text"
                  placeholder="@your_restaurant or link"
                  value={handleInput}
                  onChange={(e) => setHandleInput(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-3.5 rounded-xl bg-stone-950 border border-stone-700 text-white placeholder-stone-500 text-xs focus:outline-hidden focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all font-medium"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 shadow-xl shadow-amber-500/15 transition-all active:scale-95 cursor-pointer shrink-0"
              >
                <Palette className="w-4 h-4" />
                <span>Get Free Mockup</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            <p className="text-[11px] text-stone-400 text-center lg:text-left">
              Just your Instagram username — no phone or credit card required.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
