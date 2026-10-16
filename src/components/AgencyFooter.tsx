import React from 'react';
import { ArrowUp } from 'lucide-react';
import { RidgeLogo } from './RidgeLogo';

interface AgencyFooterProps {
  onOpenInquiry: () => void;
  onOpenDeals?: () => void;
}

export const AgencyFooter: React.FC<AgencyFooterProps> = ({ onOpenInquiry, onOpenDeals }) => {
  const scrollToTop = () => {
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      // Ignore in restricted iframe contexts
    }
  };

  return (
    <footer className="bg-stone-950 border-t border-stone-800 text-stone-400 py-10 sm:py-12 text-xs w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 sm:gap-6 pb-6 sm:pb-8 border-b border-stone-850">
          <div className="space-y-2">
            <RidgeLogo variant="horizontal" size="md" />
            <p className="text-xs text-stone-400 max-w-sm pt-1">
              Custom web design, direct online ordering, and high-speed maintenance tailored exclusively for independent restaurants and dining spots. All sites live within 48 hours.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
            {onOpenDeals && (
              <button
                onClick={onOpenDeals}
                className="px-3.5 py-2 bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-800 font-semibold rounded-xl text-xs transition-colors cursor-pointer"
              >
                Owner Deals
              </button>
            )}
            <button
              onClick={() => onOpenInquiry()}
              className="flex-1 sm:flex-initial px-4 py-2 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold rounded-xl text-xs transition-colors cursor-pointer text-center"
            >
              Apply as Founding Partner
            </button>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-800 transition-colors cursor-pointer"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-stone-500 text-[11px] text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} Ridge Creative Web Studio. All rights reserved. First 3 client founding offer.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
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
