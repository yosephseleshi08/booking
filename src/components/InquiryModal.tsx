import React, { useState, useEffect } from 'react';
import { X, Check, Sparkles, Instagram, MessageCircle, Clock, ExternalLink, ArrowRight, ShieldCheck, Star } from 'lucide-react';
import { PackageTier, DealInquiry, AgencyOwnerProfile } from '../types';
import { PACKAGES } from '../data/packages';
import { parseProfileInput, ParsedProfile } from '../utils/profileParser';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTier: PackageTier;
  ownerProfile: AgencyOwnerProfile;
  onInquiryCreated: (inquiry: DealInquiry) => void;
  onSwitchToMockup?: () => void;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  initialTier,
  ownerProfile,
  onInquiryCreated,
  onSwitchToMockup,
}) => {
  const [selectedTier, setSelectedTier] = useState<PackageTier>(initialTier);
  const [handleInput, setHandleInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdInquiry, setCreatedInquiry] = useState<DealInquiry | null>(null);
  const [submittedProfile, setSubmittedProfile] = useState<ParsedProfile | null>(null);

  useEffect(() => {
    if (isOpen) {
      const validTiers: PackageTier[] = ['pilot', 'growth', 'premium'];
      const safeTier = typeof initialTier === 'string' && validTiers.includes(initialTier) ? initialTier : 'pilot';
      setSelectedTier(safeTier);
      setHandleInput('');
      setCreatedInquiry(null);
      setSubmittedProfile(null);
      setIsSubmitting(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentPkg = PACKAGES[selectedTier] || PACKAGES.pilot;

  const handlePackageClaimSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const rawVal = typeof handleInput === 'string' ? handleInput.trim() : '';
    if (!rawVal) return;

    setIsSubmitting(true);
    const parsed = parseProfileInput(rawVal);

    const newInquiry: DealInquiry = {
      id: `inq-${Date.now()}`,
      inquiryType: 'package_claim',
      restaurantName: parsed.restaurantName || 'Restaurant Partner',
      contactName: '',
      emailOrPhone: parsed.cleanHandle || rawVal,
      instagramHandle: parsed.cleanHandle || rawVal,
      packageTier: selectedTier,
      notes: `Claimed ${currentPkg.name} spot via profile link/handle: ${parsed.rawInput || rawVal}`,
      createdAt: new Date().toISOString(),
      status: 'new_claim',
    };

    // Immediately notify parent state and localStorage
    onInquiryCreated(newInquiry);
    setSubmittedProfile(parsed);
    setCreatedInquiry(newInquiry);
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

  const cleanOwnerHandle = ownerProfile.instagramHandle.replace(/^@/, '') || 'atelierdining';
  const cleanPhone = ownerProfile.whatsappNumber.replace(/[^0-9]/g, '') || '15552348910';

  const restaurantDisplayName = submittedProfile?.restaurantName || createdInquiry?.restaurantName || 'Restaurant';

  const prefilledMessage = encodeURIComponent(
    `Hey! I just claimed the ${currentPkg.name} spot for ${restaurantDisplayName} (${submittedProfile?.cleanHandle || ''}) on your website. Excited to launch within 48 hours!`
  );

  const directInstagramUrl = `https://instagram.com/${cleanOwnerHandle}`;
  const directWhatsAppUrl = `https://wa.me/${cleanPhone}?text=${prefilledMessage}`;

  return (
    <div
      id="package-claim-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-stone-900 border border-stone-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative text-stone-100 my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {createdInquiry ? (
          /* Instant Success Screen */
          <div className="text-center py-2 space-y-4">
            <div className="w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto shadow-inner">
              <Check className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-bold font-serif text-white">
                Spot Claimed for {restaurantDisplayName}!
              </h3>
              <p className="text-xs text-amber-300 font-semibold flex items-center justify-center gap-1.5 pt-1">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>⚡ 48-Hour Rapid Launch Guarantee Activated</span>
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 text-left space-y-3 text-xs">
              <div className="text-stone-300 leading-relaxed">
                We received your claim for the{' '}
                <strong className="text-white">{currentPkg.name}</strong> package (
                {currentPkg.setupFee === 0 ? '$0 Setup + $99/mo' : `$${currentPkg.setupFee} + $${currentPkg.monthlyFee}/mo`}
                ) using handle <strong className="text-amber-300 font-mono">{submittedProfile?.cleanHandle}</strong>.
              </div>

              <p className="text-stone-400 text-[11px]">
                Our lead designer is reviewing your current dishes and will message your DMs to begin the 48-hour build.
              </p>

              {/* Direct Instant Contact CTAs */}
              <div className="space-y-2 pt-1">
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

                {ownerProfile.whatsappNumber && (
                  <a
                    href={directWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send Quick Text on WhatsApp</span>
                  </a>
                )}
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
          /* Simplified 1-Field Claim Form */
          <form onSubmit={handlePackageClaimSubmit} className="space-y-5">
            {/* Header */}
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>48-Hour Launch Guarantee</span>
              </div>

              <h3 className="text-2xl font-bold font-serif text-white">
                Claim Your Restaurant Spot
              </h3>
              <p className="text-xs text-stone-400">
                No credit card, contracts, or long forms required. Just enter your username or profile link.
              </p>
            </div>

            {/* Package Selector Tabs */}
            <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl bg-stone-950 border border-stone-800">
              {(['pilot', 'growth', 'premium'] as PackageTier[]).map((tierKey) => {
                const pkg = PACKAGES[tierKey];
                const isSelected = selectedTier === tierKey;
                return (
                  <button
                    key={tierKey}
                    type="button"
                    onClick={() => setSelectedTier(tierKey)}
                    className={`py-2 px-2 rounded-xl text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-400 text-stone-950 font-bold shadow-sm'
                        : 'text-stone-400 hover:text-white text-xs font-medium'
                    }`}
                  >
                    <div className="text-[11px] truncate">{pkg.name.split(' ')[0]}</div>
                    <div className="text-[10px] opacity-90 truncate">
                      {pkg.setupFee === 0 ? '$0 Setup' : `$${pkg.setupFee}`}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Package Banner Summary */}
            <div className="p-3.5 rounded-2xl bg-stone-950/80 border border-amber-500/30 flex items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-white">{currentPkg.name}</span>
                  {currentPkg.setupFee === 0 && (
                    <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-amber-500 text-stone-950">
                      1 of 3 Remaining
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-stone-400 mt-0.5">
                  {currentPkg.tagline} • Live within 48h
                </p>
              </div>

              <div className="text-right shrink-0">
                <div className="text-sm font-bold text-amber-400 font-serif">
                  {currentPkg.setupFee === 0 ? '$0 Setup' : `$${currentPkg.setupFee}`}
                </div>
                <div className="text-[10px] text-stone-400 font-medium">
                  + ${currentPkg.monthlyFee}/mo
                </div>
              </div>
            </div>

            {/* ONLY ONE INPUT FIELD: USERNAME OR PROFILE LINK */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-200 block">
                Username or Profile Link
              </label>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                  <Instagram className="w-4 h-4 text-pink-400" />
                </div>
                <input
                  id="inquiry-claim-handle-input"
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
                Instagram, TikTok, or website link. We’ll review your photos and message you directly to launch.
              </p>
            </div>

            {/* CTA Button */}
            <button
              type="submit"
              disabled={isSubmitting || !handleInput.trim()}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 transition-all active:scale-[0.98] shadow-lg shadow-amber-500/15 cursor-pointer"
            >
              <span>
                {isSubmitting
                  ? 'Reserving Spot...'
                  : currentPkg.setupFee === 0
                  ? 'Claim Spot ($0 Setup)'
                  : `Claim Spot (${currentPkg.name})`}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Alternative: Request Free Mockup first */}
            {onSwitchToMockup && (
              <div className="text-center pt-1 border-t border-stone-800/80">
                <p className="text-xs text-stone-400">
                  Want to see your dishes on mobile before committing?{' '}
                  <button
                    type="button"
                    onClick={onSwitchToMockup}
                    className="text-amber-300 hover:text-amber-200 font-bold underline cursor-pointer"
                  >
                    Request a 100% Free Mockup instead
                  </button>
                </p>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
};
