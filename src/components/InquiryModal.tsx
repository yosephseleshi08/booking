import React, { useState, useEffect } from 'react';
import { X, Check, Sparkles, MessageCircle, Clock, ExternalLink, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import { PackageTier, DealInquiry, AgencyOwnerProfile } from '../types';
import { PACKAGES } from '../data/packages';
import { parseProfileInput, ParsedProfile, LeadPlatform } from '../utils/profileParser';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTier: PackageTier;
  ownerProfile: AgencyOwnerProfile;
  onInquiryCreated: (inquiry: DealInquiry) => void;
  onSwitchToMockup?: () => void;
}

const PLATFORMS: { id: LeadPlatform; label: string; icon: string; placeholder: string }[] = [
  { id: 'instagram', label: 'Instagram', icon: '📸', placeholder: '@restaurant or instagram.com/profile' },
  { id: 'tiktok', label: 'TikTok', icon: '🎵', placeholder: '@restaurant or tiktok.com/@handle' },
  { id: 'facebook', label: 'Facebook', icon: '👥', placeholder: 'facebook.com/page or restaurant page name' },
  { id: 'google_maps', label: 'Google Maps', icon: '📍', placeholder: 'Maps link, or Restaurant Name & City' },
  { id: 'website', label: 'Website / Other', icon: '🌐', placeholder: 'Current website, phone, or name' },
];

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  initialTier,
  ownerProfile,
  onInquiryCreated,
  onSwitchToMockup,
}) => {
  const [selectedTier, setSelectedTier] = useState<PackageTier>(initialTier);
  const [activePlatform, setActivePlatform] = useState<LeadPlatform>('instagram');
  const [profileInput, setProfileInput] = useState('');
  const [restaurantNameInput, setRestaurantNameInput] = useState('');
  const [contactInput, setContactInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdInquiry, setCreatedInquiry] = useState<DealInquiry | null>(null);
  const [submittedProfile, setSubmittedProfile] = useState<ParsedProfile | null>(null);

  useEffect(() => {
    if (isOpen) {
      const validTiers: PackageTier[] = ['pilot', 'growth', 'premium'];
      const safeTier = typeof initialTier === 'string' && validTiers.includes(initialTier) ? initialTier : 'pilot';
      setSelectedTier(safeTier);
      setProfileInput('');
      setRestaurantNameInput('');
      setContactInput('');
      setCreatedInquiry(null);
      setSubmittedProfile(null);
      setIsSubmitting(false);
    }
  }, [isOpen, initialTier]);

  if (!isOpen) return null;

  const currentPkg = PACKAGES[selectedTier] || PACKAGES.pilot;

  const handlePackageClaimSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const rawVal = profileInput.trim() || restaurantNameInput.trim();
    if (!rawVal) return;

    setIsSubmitting(true);
    const parsed = parseProfileInput(rawVal, activePlatform);
    if (restaurantNameInput.trim()) {
      parsed.restaurantName = restaurantNameInput.trim();
    }

    const newInquiry: DealInquiry = {
      id: `inq-${Date.now()}`,
      inquiryType: 'package_claim',
      restaurantName: parsed.restaurantName || 'Restaurant Partner',
      contactName: '',
      emailOrPhone: contactInput.trim() || parsed.cleanHandle || rawVal,
      instagramHandle: parsed.cleanHandle || rawVal,
      packageTier: selectedTier,
      platform: parsed.platform,
      notes: `[Platform: ${parsed.platformLabel}] Claimed ${currentPkg.name} spot. Link/Input: ${rawVal}${contactInput ? ` • Direct Contact: ${contactInput}` : ''}`,
      createdAt: new Date().toISOString(),
      status: 'new_claim',
    };

    onInquiryCreated(newInquiry);
    setSubmittedProfile(parsed);
    setCreatedInquiry(newInquiry);
    setIsSubmitting(false);

    try {
      await fetch('/api/inquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newInquiry),
      });
    } catch (err) {
      console.warn('Inquiry saved locally:', err);
    }
  };

  const cleanOwnerHandle = ownerProfile.instagramHandle.replace(/^@/, '') || 'ridgecreative';
  const cleanPhone = ownerProfile.whatsappNumber.replace(/[^0-9]/g, '') || '15552348910';
  const restaurantDisplayName = submittedProfile?.restaurantName || createdInquiry?.restaurantName || 'Restaurant Partner';

  const prefilledMessage = encodeURIComponent(
    `Hey! I just claimed the ${currentPkg.name} spot for ${restaurantDisplayName} (${submittedProfile?.platformLabel}: ${submittedProfile?.cleanHandle || ''}) on your website. Excited to launch within 48 hours!`
  );

  const directInstagramUrl = `https://instagram.com/${cleanOwnerHandle}`;
  const directWhatsAppUrl = `https://wa.me/${cleanPhone}?text=${prefilledMessage}`;

  const currentPlaceholder = PLATFORMS.find((p) => p.id === activePlatform)?.placeholder || 'Enter profile link or name';

  return (
    <div
      id="package-claim-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/85 backdrop-blur-md overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-stone-900 border border-stone-800 rounded-3xl max-w-lg w-full p-4 sm:p-6 shadow-2xl relative text-stone-100 my-4 max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer z-10"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {submittedProfile ? (
          /* Instant Success Screen */
          <div className="text-center py-4 space-y-4">
            <div className="w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto shadow-inner">
              <Check className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Spot Reserved &bull; 48h Sprint Clock Started
              </span>
              <h3 className="text-2xl font-bold font-serif text-white">
                You’re In, {restaurantDisplayName}!
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 max-w-sm mx-auto">
                We locked in your spot for the <strong className="text-amber-300">{currentPkg.name}</strong> ({currentPkg.pricingHeader}).
              </p>
            </div>

            {/* Platform Details Summary */}
            <div className="p-3.5 rounded-2xl bg-stone-950 border border-stone-800 text-left text-xs space-y-2">
              <div className="flex items-center justify-between text-stone-400 text-[11px]">
                <span>Discovery Platform:</span>
                <span className="text-amber-300 font-semibold">{submittedProfile.platformLabel}</span>
              </div>
              <div className="flex items-center justify-between text-stone-400 text-[11px]">
                <span>Profile / Location:</span>
                <span className="text-white font-mono truncate max-w-[200px]">{submittedProfile.cleanHandle}</span>
              </div>
              <div className="flex items-center justify-between text-stone-400 text-[11px]">
                <span>Setup Fee:</span>
                <span className="text-emerald-400 font-bold">$0 (Waived)</span>
              </div>
              <div className="flex items-center justify-between text-stone-400 text-[11px]">
                <span>Hosting &amp; Support:</span>
                <span className="text-stone-200 font-semibold">${currentPkg.monthlyFee}/month</span>
              </div>
            </div>

            {/* Direct Confirmation Action */}
            <div className="space-y-2 pt-1">
              <p className="text-xs text-stone-400">
                Want to fast-track your 48h launch? Message us directly:
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <a
                  href={directWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Ridge Creative</span>
                </a>
                <a
                  href={directInstagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs transition-colors"
                >
                  <span>📸 Instagram DM</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>
              </div>
            </div>

            <button
              onClick={onClose}
              className="text-xs text-stone-400 hover:text-stone-200 underline pt-2 cursor-pointer"
            >
              Done &amp; Return to Website
            </button>
          </div>
        ) : (
          /* Claim Spot Form */
          <div className="space-y-4">
            <div className="space-y-1 pr-6">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>Founding Partner &bull; Live in 48 Hours</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                Claim Your Restaurant Spot
              </h3>
              <p className="text-xs text-stone-300">
                Found us on Instagram, TikTok, Facebook, or Google Maps? Lock in $0 setup + $99/mo below.
              </p>
            </div>

            {/* Tier Selector Chips */}
            <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-stone-950 border border-stone-800 text-xs">
              {(['pilot', 'growth', 'premium'] as PackageTier[]).map((tierKey) => {
                const pkg = PACKAGES[tierKey];
                const isSelected = selectedTier === tierKey;
                return (
                  <button
                    key={tierKey}
                    type="button"
                    onClick={() => setSelectedTier(tierKey)}
                    className={`p-2 rounded-lg text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-400 text-stone-950 font-bold shadow-xs'
                        : 'text-stone-400 hover:text-white'
                    }`}
                  >
                    <div className="text-[11px] font-bold truncate">{pkg.name.split(' ')[0]}</div>
                    <div className="text-[10px] opacity-80">${pkg.monthlyFee}/mo</div>
                  </button>
                );
              })}
            </div>

            {/* Selected Package Banner */}
            <div className="p-3 rounded-xl bg-stone-950/70 border border-amber-500/30 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-white">{currentPkg.name}</span>
                <div className="text-[11px] text-amber-300">
                  {selectedTier === 'pilot' ? '$0 setup (waived $499) + $99/mo' : `${currentPkg.pricingHeader}`}
                </div>
              </div>
              <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                48h Live Guarantee
              </span>
            </div>

            {/* Form */}
            <form onSubmit={handlePackageClaimSubmit} className="space-y-3.5">
              {/* Platform Selector Tabs */}
              <div>
                <label className="block text-[11px] font-bold text-stone-300 mb-1.5">
                  Where is your restaurant active?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                  {PLATFORMS.map((platform) => {
                    const isSelected = activePlatform === platform.id;
                    return (
                      <button
                        key={platform.id}
                        type="button"
                        onClick={() => setActivePlatform(platform.id)}
                        className={`px-2.5 py-1.5 rounded-xl text-left text-xs font-semibold border transition-all flex items-center gap-1.5 cursor-pointer ${
                          isSelected
                            ? 'bg-amber-400 text-stone-950 border-amber-300 font-bold'
                            : 'bg-stone-950/80 text-stone-400 border-stone-800 hover:text-white hover:border-stone-700'
                        }`}
                      >
                        <span>{platform.icon}</span>
                        <span className="truncate">{platform.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Main Profile / Link Input */}
              <div>
                <label className="block text-[11px] font-bold text-stone-300 mb-1">
                  {activePlatform === 'google_maps'
                    ? 'Google Maps Link or Restaurant Name & City'
                    : activePlatform === 'facebook'
                    ? 'Facebook Page Link or Handle'
                    : activePlatform === 'tiktok'
                    ? 'TikTok Username (@handle) or Link'
                    : activePlatform === 'instagram'
                    ? 'Instagram Username (@handle) or Link'
                    : 'Website Link, Restaurant Name or Phone'}
                  <span className="text-amber-400 ml-0.5">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder={currentPlaceholder}
                  value={profileInput}
                  onChange={(e) => setProfileInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-white placeholder-stone-500 text-xs focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all font-medium"
                />
              </div>

              {/* Optional Restaurant Name if different from handle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-medium text-stone-400 mb-1">
                    Restaurant Name <span className="text-stone-500">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Osteria Bella"
                    value={restaurantNameInput}
                    onChange={(e) => setRestaurantNameInput(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white placeholder-stone-600 text-xs focus:outline-none focus:border-amber-400 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-stone-400 mb-1">
                    Phone / WhatsApp <span className="text-stone-500">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="For launch updates"
                    value={contactInput}
                    onChange={(e) => setContactInput(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white placeholder-stone-600 text-xs focus:outline-none focus:border-amber-400 transition-all"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer shadow-lg shadow-amber-500/10 disabled:opacity-60"
              >
                <span>{isSubmitting ? 'Reserving...' : `Claim Spot for ${currentPkg.name}`}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-between text-[11px] text-stone-400 pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>No credit card needed today</span>
                </span>
                {onSwitchToMockup && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onSwitchToMockup();
                    }}
                    className="text-amber-300 hover:underline cursor-pointer"
                  >
                    Want free preview first?
                  </button>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
