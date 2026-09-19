import React, { useState, useEffect } from 'react';
import { X, Check, Sparkles, Send, Instagram, MessageCircle, Clock, ExternalLink, Palette, ShieldCheck, ArrowRight } from 'lucide-react';
import { PackageTier, DealInquiry, AgencyOwnerProfile, InquiryType } from '../types';
import { PACKAGES } from '../data/packages';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTier: PackageTier;
  initialMode?: InquiryType;
  initialMockupHandle?: string;
  ownerProfile: AgencyOwnerProfile;
  onInquiryCreated: (inquiry: DealInquiry) => void;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  initialTier,
  initialMode = 'package_claim',
  initialMockupHandle = '',
  ownerProfile,
  onInquiryCreated,
}) => {
  const [inquiryType, setInquiryType] = useState<InquiryType>(initialMode);
  const [selectedTier, setSelectedTier] = useState<PackageTier>(initialTier);
  
  // Single-field state for Mockup
  const [mockupInstagram, setMockupInstagram] = useState(initialMockupHandle);
  
  // Fields for Package Claim
  const [restaurantName, setRestaurantName] = useState('');
  const [contactName, setContactName] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [instagramHandle, setInstagramHandle] = useState('');
  const [notes, setNotes] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdInquiry, setCreatedInquiry] = useState<DealInquiry | null>(null);

  useEffect(() => {
    if (isOpen) {
      setInquiryType(initialMode);
      setSelectedTier(initialTier);
      if (initialMockupHandle) {
        setMockupInstagram(initialMockupHandle);
      }
      setCreatedInquiry(null);
    }
  }, [isOpen, initialMode, initialTier, initialMockupHandle]);

  if (!isOpen) return null;

  const isMockup = inquiryType === 'free_mockup';

  const cleanHandleString = (raw: string) => {
    let handle = raw.trim();
    if (!handle) return '';
    // Strip URL if they pasted full instagram URL
    handle = handle.replace(/^https?:\/\/(www\.)?instagram\.com\//i, '').replace(/\/$/, '');
    if (!handle.startsWith('@') && !handle.includes('/')) {
      handle = `@${handle}`;
    }
    return handle;
  };

  const handleMockupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const handle = cleanHandleString(mockupInstagram);
    if (!handle) return;

    setIsSubmitting(true);
    // Derive restaurant name from the handle
    const derivedName = handle.replace(/^@/, '').replace(/_/g, ' ').replace(/\./g, ' ');
    const formattedName = derivedName
      ? derivedName.charAt(0).toUpperCase() + derivedName.slice(1)
      : 'Instagram Partner';

    const newInquiry: DealInquiry = {
      id: `inq-${Date.now()}`,
      inquiryType: 'free_mockup',
      restaurantName: formattedName,
      contactName: '',
      emailOrPhone: `Instagram: ${handle}`,
      instagramHandle: handle,
      packageTier: 'pilot',
      notes: `Requested free mockup via Instagram username/link: ${mockupInstagram}`,
      createdAt: new Date().toISOString(),
      status: 'new_claim',
    };

    try {
      await fetch('/api/inquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newInquiry),
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
      setCreatedInquiry(newInquiry);
      onInquiryCreated(newInquiry);
    }
  };

  const handlePackageClaimSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!restaurantName || !emailOrPhone) return;

    setIsSubmitting(true);
    const newInquiry: DealInquiry = {
      id: `inq-${Date.now()}`,
      inquiryType: 'package_claim',
      restaurantName,
      contactName,
      emailOrPhone,
      instagramHandle: cleanHandleString(instagramHandle),
      packageTier: selectedTier,
      notes,
      createdAt: new Date().toISOString(),
      status: 'new_claim',
    };

    try {
      await fetch('/api/inquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newInquiry),
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
      setCreatedInquiry(newInquiry);
      onInquiryCreated(newInquiry);
    }
  };

  const currentPkg = PACKAGES[selectedTier];
  const cleanOwnerHandle = ownerProfile.instagramHandle.replace(/^@/, '') || 'atelierdining';
  const cleanPhone = ownerProfile.whatsappNumber.replace(/[^0-9]/g, '') || '15552348910';

  const prefilledMessage = encodeURIComponent(
    isMockup
      ? `Hey! I just requested a free mockup for our restaurant (${createdInquiry?.instagramHandle || mockupInstagram}) on your site. Excited to see what you create!`
      : `Hey! I just claimed the ${currentPkg?.name || 'Pilot'} spot for "${restaurantName}" on your profile link. Looking forward to 48-hour launch!`
  );

  const directInstagramUrl = `https://instagram.com/${cleanOwnerHandle}`;
  const directWhatsAppUrl = `https://wa.me/${cleanPhone}?text=${prefilledMessage}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-stone-900 border border-stone-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative text-stone-100 my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {createdInquiry ? (
          /* Success Screen */
          <div className="text-center py-4 space-y-5">
            <div className="w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto">
              <Check className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-bold font-serif text-white">
                {isMockup ? 'Mockup Request Received!' : `Spot Reserved for ${createdInquiry.restaurantName}!`}
              </h3>
              <p className="text-xs text-amber-300 font-semibold flex items-center justify-center gap-1.5 pt-1">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>
                  {isMockup
                    ? `⚡ Free Preview will be sent to ${createdInquiry.instagramHandle} in 24–48 Hours`
                    : '⚡ 48-Hour Rapid Launch Guarantee Activated'}
                </span>
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 text-left space-y-3 text-xs">
              <div className="text-stone-300 leading-relaxed">
                {isMockup ? (
                  <>
                    We found your Instagram account{' '}
                    <strong className="text-amber-300 font-mono">{createdInquiry.instagramHandle}</strong>. Our design team will check your photos, branding, and menu highlights to hand-craft a sleek mobile-first website preview for your restaurant!
                  </>
                ) : (
                  <>
                    We received your claim for the{' '}
                    <strong className="text-white">{currentPkg.name}</strong> package (
                    {currentPkg.setupFee === 0 ? '$0 Setup + $99/mo' : `$${currentPkg.setupFee} + $${currentPkg.monthlyFee}/mo`}
                    ).
                  </>
                )}
              </div>

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
              className="px-6 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            {/* Top Mode Selector Tabs */}
            <div className="flex rounded-xl bg-stone-950 p-1 border border-stone-800 text-xs">
              <button
                type="button"
                onClick={() => setInquiryType('free_mockup')}
                className={`flex-1 py-2.5 rounded-lg font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  isMockup
                    ? 'bg-amber-400 text-stone-950 shadow-sm'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                <Palette className="w-3.5 h-3.5" />
                <span>Request Free Mockup</span>
              </button>

              <button
                type="button"
                onClick={() => setInquiryType('package_claim')}
                className={`flex-1 py-2.5 rounded-lg font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  !isMockup
                    ? 'bg-amber-400 text-stone-950 shadow-sm'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Claim Package Spot ($0 Setup)</span>
              </button>
            </div>

            {/* ============================================================== */}
            {/* SIMPLIFIED 1-FIELD FORM FOR FREE MOCKUP */}
            {/* ============================================================== */}
            {isMockup ? (
              <form onSubmit={handleMockupSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/25">
                    <Palette className="w-3.5 h-3.5 text-amber-400" />
                    <span>100% Free • No Credit Card • Zero Obligation</span>
                  </div>
                  <h3 className="text-2xl font-bold font-serif text-white">
                    Get a Free Custom Mockup
                  </h3>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    Simply drop your Instagram username or profile link below. We will study your food photos and craft a custom mobile homepage preview, then send it directly to your DMs within 24–48 hours.
                  </p>
                </div>

                {/* THE ONLY REQUIRED FIELD */}
                <div className="space-y-2 pt-1">
                  <label className="text-xs font-bold text-stone-200 flex items-center justify-between">
                    <span>Instagram Username or Profile Link</span>
                    <span className="text-amber-400 text-[11px] font-normal">Only thing needed</span>
                  </label>
                  
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                      <Instagram className="w-4 h-4 text-pink-400" />
                    </div>
                    <input
                      type="text"
                      required
                      autoFocus
                      placeholder="@your_restaurant or instagram.com/restaurant"
                      value={mockupInstagram}
                      onChange={(e) => setMockupInstagram(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-stone-950 border border-stone-800 text-white placeholder-stone-600 text-sm focus:outline-hidden focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all font-medium"
                    />
                  </div>
                  <p className="text-[11px] text-stone-500">
                    Example: <code className="text-stone-400">@osteriadelporto</code> or <code className="text-stone-400">instagram.com/osteriadelporto</code>
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || !mockupInstagram.trim()}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 transition-all active:scale-[0.98] shadow-lg shadow-amber-500/10 cursor-pointer"
                >
                  <Palette className="w-4 h-4" />
                  <span>
                    {isSubmitting ? 'Requesting Mockup...' : 'Send Me a Free Custom Mockup'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="p-3 rounded-xl bg-stone-950/60 border border-stone-800/80 flex items-center justify-center gap-4 text-[11px] text-stone-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    Delivered in 24–48h
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                    100% Free
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Instagram className="w-3.5 h-3.5 text-pink-400" />
                    Sent to your DMs
                  </span>
                </div>
              </form>
            ) : (
              /* ============================================================== */
              /* PACKAGE CLAIM FLOW (for reserving one of the 3 spots) */
              /* ============================================================== */
              <form onSubmit={handlePackageClaimSubmit} className="space-y-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/25 mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>48-Hour Launch Reservation</span>
                  </div>
                  <h3 className="text-2xl font-bold font-serif text-white">
                    Claim Your Restaurant Spot
                  </h3>
                  <p className="text-xs text-stone-400 mt-0.5">
                    Reserve one of 3 founding spots with $0 setup fee. Live within 48 hours.
                  </p>
                </div>

                {/* Package Selector */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-300">Selected Package:</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['pilot', 'growth', 'premium'] as const).map((tier) => {
                      const pkg = PACKAGES[tier];
                      const active = selectedTier === tier;
                      return (
                        <button
                          key={tier}
                          type="button"
                          onClick={() => setSelectedTier(tier)}
                          className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                            active
                              ? 'bg-amber-500/15 border-amber-400 text-white shadow-xs'
                              : 'bg-stone-950/60 border-stone-800 text-stone-400 hover:border-stone-700'
                          }`}
                        >
                          <div className="text-[11px] font-bold truncate">{pkg.name}</div>
                          <div className="text-xs font-serif font-bold text-amber-300 mt-0.5">
                            {pkg.setupFee === 0 ? '$0 Setup' : `$${pkg.setupFee}`}
                          </div>
                          <div className="text-[10px] text-stone-400">+${pkg.monthlyFee}/mo</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Restaurant Name */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-300">
                    Restaurant Name <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Osteria Del Porto"
                    value={restaurantName}
                    onChange={(e) => setRestaurantName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-white placeholder-stone-600 text-xs focus:outline-hidden focus:border-amber-400"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Contact Name */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-300">Your Name / Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Chef Marco, Owner"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-white placeholder-stone-600 text-xs focus:outline-hidden focus:border-amber-400"
                    />
                  </div>

                  {/* Instagram Handle */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-300">Instagram Handle</label>
                    <input
                      type="text"
                      placeholder="e.g. @osteriadelporto"
                      value={instagramHandle}
                      onChange={(e) => setInstagramHandle(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-white placeholder-stone-600 text-xs focus:outline-hidden focus:border-amber-400"
                    />
                  </div>
                </div>

                {/* Email or Phone */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-300">
                    Phone Number or Email <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. (555) 234-5678 or owner@restaurant.com"
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-white placeholder-stone-600 text-xs focus:outline-hidden focus:border-amber-400"
                  />
                </div>

                {/* Optional Notes */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-300">
                    Notes / Current Menu Link (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. We have an unreadable PDF menu and want direct ordering setup..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white placeholder-stone-600 text-xs focus:outline-hidden focus:border-amber-400 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 transition-all active:scale-[0.98] shadow-md cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {isSubmitting ? 'Submitting Reservation...' : 'Claim Spot & Start 48-Hour Build'}
                  </span>
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
