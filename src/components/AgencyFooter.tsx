import React from 'react';
import { UtensilsCrossed, ArrowUp, Instagram, Mail, Phone, Heart } from 'lucide-react';

interface AgencyFooterProps {
  onOpenInquiry: () => void;
  onOpenDeals?: () => void;
}

export const AgencyFooter: React.FC<AgencyFooterProps> = ({ onOpenInquiry, onOpenDeals }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-950 border-t border-stone-800 text-stone-400 py-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-stone-850">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
                <UtensilsCrossed className="w-4 h-4" />
              </div>
              <span className="text-base font-bold text-white font-serif tracking-tight">
                Atelier Dining Studio
              </span>
            </div>
            <p className="text-xs text-stone-400 max-w-sm">
              Custom web design, direct online ordering, and high-speed maintenance tailored exclusively for independent dining spots. All sites live within 48 hours.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {onOpenDeals && (
              <button
                onClick={onOpenDeals}
                className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-800 font-semibold rounded-xl text-xs transition-colors"
              >
                Owner Deals Portal
              </button>
            )}
            <button
              onClick={() => onOpenInquiry()}
              className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold rounded-xl text-xs transition-colors"
            >
              Apply as Founding Partner
            </button>
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-800 transition-colors"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} Atelier Dining. All rights reserved. First 3 client founding offer.
          </div>
          <div className="flex items-center gap-4">
            <span>Month-to-Month</span>
            <span>•</span>
            <span>No Long-Term Contracts</span>
            <span>•</span>
            <span>Cancel Anytime</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
