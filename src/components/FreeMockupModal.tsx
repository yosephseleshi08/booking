import React, { useState } from 'react';
import { X, Check, Instagram, Clock, ShieldCheck, ArrowRight, ExternalLink } from 'lucide-react';
import { DealInquiry, AgencyOwnerProfile } from '../types';
import { parseProfileInput, ParsedProfile } from '../utils/profileParser';

interface FreeMockupModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialHandle?: string;
  ownerProfile: AgencyOwnerProfile;
  onInquiryCreated: (inquiry: DealInquiry) => void;
}

export const FreeMockupModal: React.FC<FreeMockupModalProps> = ({
  isOpen,
  onClose,
  initialHandle = '',
  ownerProfile,
  onInquiryCreated,
}) => {
  const [handleInput, setHandleInput] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedProfile, setSubmittedProfile] = useState<ParsedProfile | null>(null);

  // Sync initial handle ONLY when modal transitions from closed to open
  React.useEffect(() => {
    if (isOpen) {
      const safeHandle = typeof initialHandle === 'string' ? initialHandle : '';
      setHandleInput(safeHandle);
      setSubmittedProfile(null);
      setIsSubmitting(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const rawVal = typeof handleInput === 'string' ? handleInput.trim() : '';
    if (!rawVal) return;

    setIsSubmitting(true);
    const parsed = parseProfileInput(rawVal);

    const newInquiry: DealInquiry = {
      id: `inq-${Date.now()}`,
      inquiryType: 'free_mockup',
      restaurantName: parsed.restaurantName || 'Restaurant Partner',
      contactName: '',
      emailOrPhone: parsed.cleanHandle || rawVal,
      instagramHandle: parsed.cleanHandle || rawVal,
      packageTier: 'pilot',
      notes: `Requested free mockup via profile link/handle: ${parsed.rawInput || rawVal}`,
      createdAt: new Date().toISOString(),
      status: 'new_claim',
    };

    // Immediately notify parent state and localStorage so user sees progress
    onInquiryCreated(newInquiry);
    setSubmittedProfile(parsed);
    setIsSubmitting(false);

    // Sync to backend API
    try {
      await fetch('/api/inquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newInquiry),
      });
    } catch (err) {
      console.warn('Backend sync noticed, inquiry safely stored locally:', err);
    }
  };

  const cleanOwnerHandle = ownerProfile.instagramHandle.replace(/^@/, '') || 'ridgecreative';
  const directInstagramUrl = `https://instagram.com/${cleanOwnerHandle}`;

  return (
    <div
      id="free-mockup-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-stone-900 border border-stone-800 rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl relative text-stone-100 my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {submittedProfile ? (
          /* Instant Clean Success View */
          <div className="text-center py-2 space-y-4">
            <div className="w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto shadow-inner">
              <Check className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-bold font-serif text-white">
                Mockup Requested!
              </h3>
              <p className="text-xs text-amber-300 font-semibold flex items-center justify-center gap-1.5 pt-0.5">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Delivered to your DMs within 24–48 hours</span>
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 text-left space-y-2.5 text-xs text-stone-300">
              <p className="leading-relaxed">
                We received your profile: <strong className="text-amber-300 font-mono text-sm">{submittedProfile.cleanHandle}</strong> ({submittedProfile.restaurantName}).
              </p>
              <p className="text-stone-400 text-[11px]">
                Our design studio will inspect your photos, branding, and menu to craft a bespoke mobile mockup.
              </p>

              <div className="pt-2">
                <a
                  href={directInstagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-pink-600 via-rose-600 to-amber-600 hover:opacity-95 shadow-md transition-all cursor-pointer"
                >
                  <Instagram className="w-4 h-4" />
                  <span>DM Us on Instagram ({ownerProfile.instagramHandle})</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          /* Single-Field Form */
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                <Instagram className="w-3.5 h-3.5 text-pink-400" />
                <span>100% Free • No Credit Card</span>
              </div>
              <h3 className="text-2xl font-bold font-serif text-white">
                Get a Free Website Mockup
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Only need your Instagram username or profile link. We will design a custom mobile-first preview of your restaurant and DM it to you in 24–48 hours.
              </p>
            </div>

            {/* ONLY ONE INPUT FIELD */}
            <div className="space-y-2 pt-1">
              <label className="text-xs font-bold text-stone-200 block">
                Username or Profile Link
              </label>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                  <Instagram className="w-4 h-4 text-pink-400" />
                </div>
                <input
                  id="free-mockup-handle-input"
                  name="restaurantHandle"
                  type="text"
                  required
                  autoFocus
                  placeholder="@your_restaurant or instagram.com/restaurant"
                  value={handleInput}
                  onChange={(e) => setHandleInput(e.target.value)}
                  className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-stone-950 border border-stone-700 text-white placeholder-stone-500 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all font-medium cursor-text select-text"
                />
              </div>

              <p className="text-[11px] text-stone-500">
                That&apos;s all we need. No phone number, credit card, or email required.
              </p>
            </div>

            {/* CTA Button */}
            <button
              type="submit"
              disabled={isSubmitting || !handleInput.trim()}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 transition-all active:scale-[0.98] shadow-lg shadow-amber-500/15 cursor-pointer"
            >
              <span>{isSubmitting ? 'Submitting...' : 'Get Free Mockup'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Trust highlights */}
            <div className="p-2.5 rounded-xl bg-stone-950/60 border border-stone-800 flex items-center justify-center gap-3 text-[11px] text-stone-400">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                24–48h Delivery
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                Zero Obligation
              </span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
