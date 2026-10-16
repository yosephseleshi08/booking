import React, { useState } from 'react';
import { Palette, ArrowRight, Clock, ShieldCheck, Check, ExternalLink, MapPin } from 'lucide-react';
import { DealInquiry, AgencyOwnerProfile } from '../types';
import { parseProfileInput, ParsedProfile, LeadPlatform } from '../utils/profileParser';

interface FreeMockupBannerProps {
  onInquiryCreated?: (inquiry: DealInquiry) => void;
  onRequestMockup?: (handle?: string) => void;
  ownerProfile?: AgencyOwnerProfile;
}

const PLATFORMS: { id: LeadPlatform; label: string; icon: string; placeholder: string }[] = [
  { id: 'instagram', label: 'Instagram', icon: '📸', placeholder: '@restaurant or instagram link' },
  { id: 'tiktok', label: 'TikTok', icon: '🎵', placeholder: '@restaurant or tiktok link' },
  { id: 'facebook', label: 'Facebook', icon: '👥', placeholder: 'fb.com/page or page name' },
  { id: 'google_maps', label: 'Google Maps', icon: '📍', placeholder: 'Google Maps link or Name & City' },
];

export const FreeMockupBanner: React.FC<FreeMockupBannerProps> = ({
  onInquiryCreated,
  onRequestMockup,
  ownerProfile,
}) => {
  const [selectedPlatform, setSelectedPlatform] = useState<LeadPlatform>('instagram');
  const [handleInput, setHandleInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedProfile, setSubmittedProfile] = useState<ParsedProfile | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const rawVal = typeof handleInput === 'string' ? handleInput.trim() : '';
    if (!rawVal) {
      if (onRequestMockup) onRequestMockup('');
      return;
    }

    setIsSubmitting(true);
    const parsed = parseProfileInput(rawVal, selectedPlatform);

    const newInquiry: DealInquiry = {
      id: `inq-${Date.now()}`,
      inquiryType: 'free_mockup',
      restaurantName: parsed.restaurantName || 'Restaurant Partner',
      contactName: '',
      emailOrPhone: parsed.cleanHandle || rawVal,
      instagramHandle: parsed.cleanHandle || rawVal,
      packageTier: 'pilot',
      platform: parsed.platform,
      notes: `[Platform: ${parsed.platformLabel}] Requested free mockup via banner: ${parsed.rawInput || rawVal}`,
      createdAt: new Date().toISOString(),
      status: 'new_claim',
    };

    if (onInquiryCreated) {
      onInquiryCreated(newInquiry);
    }
    setSubmittedProfile(parsed);
    setIsSubmitting(false);

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

  const cleanOwnerHandle = ownerProfile?.instagramHandle?.replace(/^@/, '') || 'ridgecreative';
  const directInstagramUrl = `https://instagram.com/${cleanOwnerHandle}`;
  const currentPlaceholder = PLATFORMS.find((p) => p.id === selectedPlatform)?.placeholder || 'Profile link or handle';

  return (
    <section className="py-10 sm:py-14 bg-stone-950 px-3.5 sm:px-6 lg:px-8 border-t border-b border-stone-800/80 relative overflow-hidden w-full max-w-full">
      {/* Subtle warm glow background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="p-5 sm:p-8 lg:p-10 rounded-3xl bg-gradient-to-br from-stone-900 via-stone-900 to-amber-950/30 border border-amber-500/30 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8">
          <div className="space-y-3 max-w-xl text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold bg-amber-400/10 text-amber-300 border border-amber-500/30">
              <Palette className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>100% Free • No Credit Card • Zero Obligation</span>
            </div>

            <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-white tracking-tight">
              Want to see your restaurant first? <br className="hidden sm:inline" />
              <span className="text-amber-300">Request a Free Custom Mockup</span>
            </h3>

            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Share your <strong>Instagram</strong>, <strong>TikTok</strong>, <strong>Facebook</strong>, or <strong>Google Maps</strong> link. We’ll design a custom, mobile-first preview of your restaurant’s menu and deliver it to you within 24–48 hours.
            </p>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1 text-xs text-stone-400">
              <div className="flex items-center gap-1.5 text-stone-300">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Delivered in 24–48h</span>
              </div>
              <div className="flex items-center gap-1.5 text-stone-300">
                <span className="text-amber-400">📍</span>
                <span>Google Maps &amp; Social Ready</span>
              </div>
              <div className="flex items-center gap-1.5 text-stone-300">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Zero Commitment</span>
              </div>
            </div>
          </div>

          {/* Platform chips & 1-field submission right in the banner */}
          <div className="w-full lg:w-auto shrink-0 max-w-md">
            {submittedProfile ? (
              <div className="p-4 sm:p-5 rounded-2xl bg-stone-950 border border-amber-500/40 text-left space-y-3 w-full animate-in fade-in duration-200">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                  <span>Free Mockup Requested!</span>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed">
                  We received your info for <strong className="text-amber-300 font-mono">{submittedProfile.cleanHandle}</strong> ({submittedProfile.platformLabel}). We’ll craft your mobile preview and send it to you within 24–48 hours.
                </p>
                <div className="flex items-center gap-2 pt-1 flex-wrap">
                  <a
                    href={directInstagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-pink-600 hover:bg-pink-500 transition-colors"
                  >
                    <span>DM on Instagram</span>
                    <ExternalLink className="w-3 h-3 opacity-70" />
                  </a>
                  <button
                    onClick={() => {
                      setSubmittedProfile(null);
                      setHandleInput('');
                    }}
                    className="text-[11px] text-stone-400 hover:text-white px-2 py-1 cursor-pointer"
                  >
                    Submit another
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-2.5 w-full">
                {/* Platform select mini-tabs */}
                <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap">
                  {PLATFORMS.map((platform) => {
                    const isSelected = selectedPlatform === platform.id;
                    return (
                      <button
                        key={platform.id}
                        type="button"
                        onClick={() => setSelectedPlatform(platform.id)}
                        className={`px-2 py-1 rounded-lg text-[10px] sm:text-[11px] font-semibold border transition-all flex items-center gap-1 cursor-pointer ${
                          isSelected
                            ? 'bg-amber-400 text-stone-950 border-amber-300 font-bold'
                            : 'bg-stone-950/80 text-stone-400 border-stone-800 hover:text-white'
                        }`}
                      >
                        <span>{platform.icon}</span>
                        <span>{platform.label}</span>
                      </button>
                    );
                  })}
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 w-full">
                  <div className="relative flex-1 min-w-0">
                    <input
                      id="banner-mockup-handle-input"
                      name="restaurantHandle"
                      type="text"
                      placeholder={currentPlaceholder}
                      value={handleInput}
                      onChange={(e) => setHandleInput(e.target.value)}
                      className="w-full px-3.5 py-3 rounded-xl bg-stone-950 border border-stone-700 text-white placeholder-stone-500 text-xs focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all font-medium"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 shadow-xl shadow-amber-500/15 transition-all active:scale-95 cursor-pointer shrink-0 disabled:opacity-60 whitespace-nowrap"
                  >
                    <Palette className="w-4 h-4 shrink-0" />
                    <span>{isSubmitting ? 'Submitting...' : 'Get Free Mockup'}</span>
                    <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                  </button>
                </form>

                <p className="text-[11px] text-stone-400 text-center lg:text-left">
                  Just your link or handle — no phone, email, or card required.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
