import React, { useState } from 'react';
import { X, Check, Clock, ShieldCheck, ArrowRight, ExternalLink, MapPin } from 'lucide-react';
import { DealInquiry, AgencyOwnerProfile } from '../types';
import { parseProfileInput, ParsedProfile, LeadPlatform } from '../utils/profileParser';

interface FreeMockupModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialHandle?: string;
  ownerProfile: AgencyOwnerProfile;
  onInquiryCreated: (inquiry: DealInquiry) => void;
}

const PLATFORMS: { id: LeadPlatform; label: string; icon: string; placeholder: string }[] = [
  { id: 'instagram', label: 'Instagram', icon: '📸', placeholder: '@restaurant or instagram.com/profile' },
  { id: 'tiktok', label: 'TikTok', icon: '🎵', placeholder: '@restaurant or tiktok.com/@handle' },
  { id: 'facebook', label: 'Facebook', icon: '👥', placeholder: 'facebook.com/page or page name' },
  { id: 'google_maps', label: 'Google Maps', icon: '📍', placeholder: 'Maps link, or Restaurant Name & City' },
];

export const FreeMockupModal: React.FC<FreeMockupModalProps> = ({
  isOpen,
  onClose,
  initialHandle = '',
  ownerProfile,
  onInquiryCreated,
}) => {
  const [activePlatform, setActivePlatform] = useState<LeadPlatform>('instagram');
  const [handleInput, setHandleInput] = useState<string>('');
  const [contactInput, setContactInput] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedProfile, setSubmittedProfile] = useState<ParsedProfile | null>(null);

  React.useEffect(() => {
    if (isOpen) {
      const safeHandle = typeof initialHandle === 'string' ? initialHandle : '';
      setHandleInput(safeHandle);
      setContactInput('');
      setSubmittedProfile(null);
      setIsSubmitting(false);
    }
  }, [isOpen, initialHandle]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const rawVal = typeof handleInput === 'string' ? handleInput.trim() : '';
    if (!rawVal) return;

    setIsSubmitting(true);
    const parsed = parseProfileInput(rawVal, activePlatform);

    const newInquiry: DealInquiry = {
      id: `inq-${Date.now()}`,
      inquiryType: 'free_mockup',
      restaurantName: parsed.restaurantName || 'Restaurant Partner',
      contactName: '',
      emailOrPhone: contactInput.trim() || parsed.cleanHandle || rawVal,
      instagramHandle: parsed.cleanHandle || rawVal,
      packageTier: 'pilot',
      platform: parsed.platform,
      notes: `[Platform: ${parsed.platformLabel}] Requested free mockup. Profile/Link: ${parsed.rawInput || rawVal}${contactInput ? ` • Direct Contact: ${contactInput}` : ''}`,
      createdAt: new Date().toISOString(),
      status: 'new_claim',
    };

    onInquiryCreated(newInquiry);
    setSubmittedProfile(parsed);
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
  const directInstagramUrl = `https://instagram.com/${cleanOwnerHandle}`;
  const directWhatsAppUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    `Hey Ridge Creative! I just requested a free website mockup for ${submittedProfile?.restaurantName || 'my restaurant'} (${submittedProfile?.cleanHandle || ''}). Can't wait to see the preview!`
  )}`;

  const currentPlaceholder = PLATFORMS.find((p) => p.id === activePlatform)?.placeholder || 'Enter profile link or name';

  return (
    <div
      id="free-mockup-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/85 backdrop-blur-md overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-stone-900 border border-stone-800 rounded-3xl max-w-md w-full p-5 sm:p-7 shadow-2xl relative text-stone-100 my-4 max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {submittedProfile ? (
          /* Success View */
          <div className="text-center py-2 space-y-4">
            <div className="w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto shadow-inner">
              <Check className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Mockup Scheduled &bull; Free Preview
              </span>
              <h3 className="text-2xl font-bold font-serif text-white">
                We're on It, {submittedProfile.restaurantName}!
              </h3>
              <p className="text-xs sm:text-sm text-stone-300">
                We're crafting a custom mobile menu and online ordering preview for <span className="text-amber-300 font-semibold">{submittedProfile.cleanHandle}</span> ({submittedProfile.platformLabel}).
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-stone-950 border border-stone-800 text-left text-xs space-y-2">
              <div className="flex items-center gap-2 text-stone-300">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Delivery: <strong>Within 24–48 Hours</strong></span>
              </div>
              <div className="flex items-center gap-2 text-stone-300">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Price: <strong>100% Free • No Card or Commitment</strong></span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <a
                href={directWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors"
              >
                <span>WhatsApp Us</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>
              <a
                href={directInstagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold text-white bg-pink-600 hover:bg-pink-500 transition-colors"
              >
                <span>Instagram DM</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>
            </div>

            <button
              onClick={onClose}
              className="text-xs text-stone-400 hover:text-stone-200 underline pt-2 cursor-pointer"
            >
              Done &amp; Return to Site
            </button>
          </div>
        ) : (
          /* Input Form */
          <div className="space-y-4">
            <div className="space-y-1 pr-6">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Zero Cost &bull; No Obligation
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                Request Free Mobile Mockup
              </h3>
              <p className="text-xs text-stone-300">
                Share your Instagram, TikTok, Facebook, or Google Maps info and we’ll design a custom prototype of your menu within 24–48 hours.
              </p>
            </div>

            {/* Platform Selector Chips */}
            <div>
              <label className="block text-[11px] font-bold text-stone-300 mb-1.5">
                Select Your Primary Profile / Platform:
              </label>
              <div className="grid grid-cols-2 gap-1.5">
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

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-bold text-stone-300 mb-1">
                  {activePlatform === 'google_maps'
                    ? 'Google Maps Link or Restaurant Name'
                    : activePlatform === 'facebook'
                    ? 'Facebook Page or Link'
                    : activePlatform === 'tiktok'
                    ? 'TikTok Username (@handle)'
                    : 'Instagram Username (@handle)'}
                  <span className="text-amber-400 ml-0.5">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder={currentPlaceholder}
                  value={handleInput}
                  onChange={(e) => setHandleInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-white placeholder-stone-500 text-xs focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all font-medium"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-stone-400 mb-1">
                  Where should we send the preview? <span className="text-stone-500">(Email, Phone or DM)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. yoseph@restaurant.com or WhatsApp number"
                  value={contactInput}
                  onChange={(e) => setContactInput(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white placeholder-stone-600 text-xs focus:outline-none focus:border-amber-400 transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer shadow-lg shadow-amber-500/10 disabled:opacity-60"
              >
                <span>{isSubmitting ? 'Generating Request...' : 'Send Me My Free Mockup'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-1.5 text-[11px] text-stone-400 justify-center pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>100% Free. No credit card required.</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
