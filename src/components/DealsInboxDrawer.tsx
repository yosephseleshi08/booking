import React, { useState } from 'react';
import { X, Check, MessageCircle, Phone, Mail, Instagram, Clock, ExternalLink, Copy, CheckCircle2, Flame, Building2, User, FileText, Settings, Palette, Sparkles, Send } from 'lucide-react';
import { DealInquiry, AgencyOwnerProfile, PackageTier } from '../types';
import { PACKAGES } from '../data/packages';
import { parseProfileInput } from '../utils/profileParser';

interface DealsInboxDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  inquiries: DealInquiry[];
  onUpdateStatus: (id: string, status: DealInquiry['status']) => void;
  ownerProfile: AgencyOwnerProfile;
  onUpdateOwnerProfile: (profile: AgencyOwnerProfile) => void;
}

export const DealsInboxDrawer: React.FC<DealsInboxDrawerProps> = ({
  isOpen,
  onClose,
  inquiries,
  onUpdateStatus,
  ownerProfile,
  onUpdateOwnerProfile,
}) => {
  const [activeTab, setActiveTab] = useState<'inbox' | 'settings'>('inbox');
  const [filterType, setFilterType] = useState<'all' | 'free_mockup' | 'package_claim'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedScriptId, setCopiedScriptId] = useState<string | null>(null);
  const [localProfile, setLocalProfile] = useState<AgencyOwnerProfile>(ownerProfile);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const safeCopyToClipboard = async (text: string): Promise<boolean> => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch {
      // Fallback below
    }

    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      textArea.style.top = '-9999px';
      textArea.setAttribute('readonly', '');
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return successful;
    } catch {
      return false;
    }
  };

  const handleCopyDeal = async (inq: DealInquiry) => {
    const pkg = PACKAGES[inq.packageTier];
    const isMockup = inq.inquiryType === 'free_mockup';
    const text = isMockup
      ? `🎨 FREE MOCKUP REQUEST
Restaurant: ${inq.restaurantName}
Contact: ${inq.contactName || 'Owner'} (${inq.emailOrPhone})
Instagram: ${inq.instagramHandle || 'N/A'}
Delivery Target: Send Mockup within 24–48 Hours
Notes: ${inq.notes || 'None'}
Requested: ${new Date(inq.createdAt).toLocaleString()}`
      : `🍽️ RESTAURANT DEAL SUMMARY
Restaurant: ${inq.restaurantName}
Contact: ${inq.contactName} (${inq.emailOrPhone})
Instagram: ${inq.instagramHandle || 'N/A'}
Selected Package: ${pkg.name} (${pkg.pricingHeader})
Guarantee: Live Within 48 Hours
Notes: ${inq.notes || 'None'}
Claimed: ${new Date(inq.createdAt).toLocaleString()}`;

    await safeCopyToClipboard(text);
    setCopiedId(inq.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCopyMockupScript = async (inq: DealInquiry) => {
    const name = inq.contactName || 'there';
    const script = `Hey ${name}! 👋 This is ${ownerProfile.agencyName}. I just finished designing the free custom mobile website mockup for ${inq.restaurantName}! 🍽️

Take a quick look at how your new mobile menu and ordering look here:
👉 [Paste Your Mockup / Preview Link Here]

If you'd like us to launch it live taking orders with 0% commission, we have our $0 setup Founding Partner spot ready for you. Let me know what you think!`;

    await safeCopyToClipboard(script);
    setCopiedScriptId(inq.id);
    setTimeout(() => setCopiedScriptId(null), 2000);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateOwnerProfile(localProfile);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const filteredInquiries = inquiries.filter((inq) => {
    if (filterType === 'all') return true;
    return inq.inquiryType === filterType;
  });

  const newClaimsCount = inquiries.filter((i) => i.status === 'new_claim').length;
  const mockupCount = inquiries.filter((i) => i.inquiryType === 'free_mockup').length;
  const packageCount = inquiries.filter((i) => i.inquiryType === 'package_claim').length;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-stone-950/80 backdrop-blur-xs">
      <div className="bg-stone-900 border-l border-stone-800 w-full max-w-xl h-full shadow-2xl flex flex-col text-stone-100 animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-5 border-b border-stone-800 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold font-serif text-white">
                Studio Deals &amp; Mockup Requests
              </h2>
              {newClaimsCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-stone-950 animate-pulse">
                  {newClaimsCount} New
                </span>
              )}
            </div>
            <p className="text-xs text-stone-400 mt-0.5">
              Instant alerts when restaurants claim a spot or request a free mockup
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-stone-800 text-xs font-semibold px-5 bg-stone-950/60">
          <button
            onClick={() => setActiveTab('inbox')}
            className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'inbox'
                ? 'border-amber-400 text-white font-bold'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>Deals &amp; Mockups ({inquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'settings'
                ? 'border-amber-400 text-white font-bold'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Settings className="w-3.5 h-3.5 text-stone-400" />
            <span>Your Contact Links</span>
          </button>
        </div>

        {/* Sub-Filter for Inquiries */}
        {activeTab === 'inbox' && inquiries.length > 0 && (
          <div className="flex items-center gap-2 px-5 py-2.5 bg-stone-950/40 border-b border-stone-800/60 text-xs">
            <span className="text-stone-500 text-[11px] font-medium">Filter:</span>
            <button
              onClick={() => setFilterType('all')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                filterType === 'all'
                  ? 'bg-stone-800 text-white font-bold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              All ({inquiries.length})
            </button>
            <button
              onClick={() => setFilterType('free_mockup')}
              className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1 ${
                filterType === 'free_mockup'
                  ? 'bg-amber-400/20 text-amber-300 font-bold border border-amber-400/30'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Palette className="w-3 h-3 text-amber-400" />
              <span>Free Mockups ({mockupCount})</span>
            </button>
            <button
              onClick={() => setFilterType('package_claim')}
              className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1 ${
                filterType === 'package_claim'
                  ? 'bg-amber-400/20 text-amber-300 font-bold border border-amber-400/30'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Package Deals ({packageCount})</span>
            </button>
          </div>
        )}

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {activeTab === 'inbox' ? (
            filteredInquiries.length === 0 ? (
              <div className="text-center py-16 text-stone-500 space-y-3">
                <Building2 className="w-10 h-10 mx-auto stroke-1" />
                <p className="text-sm font-medium text-stone-300">No requests in this view</p>
                <p className="text-xs max-w-xs mx-auto">
                  When a restaurant taps your bio link and requests a free mockup or claims a spot, their details and 48-hour timer will appear here!
                </p>
              </div>
            ) : (
              filteredInquiries.map((inq) => {
                const pkg = PACKAGES[inq.packageTier] || PACKAGES.pilot;
                const isMockup = inq.inquiryType === 'free_mockup';
                const parsedLead = parseProfileInput(inq.instagramHandle || inq.emailOrPhone || '');
                const igUrl = parsedLead.directUrl || (inq.instagramHandle?.startsWith('http') ? inq.instagramHandle : null);
                const telUrl = inq.emailOrPhone && inq.emailOrPhone.match(/[0-9]{4,}/) ? `tel:${inq.emailOrPhone.replace(/[^0-9+]/g, '')}` : null;

                return (
                  <div
                    key={inq.id}
                    className={`p-4 rounded-2xl border transition-all space-y-3 shadow-xs ${
                      inq.status === 'new_claim'
                        ? isMockup
                          ? 'bg-gradient-to-br from-stone-900 via-stone-900 to-purple-950/20 border-purple-500/40'
                          : 'bg-gradient-to-br from-stone-900 via-stone-900 to-amber-950/30 border-amber-500/50'
                        : inq.status === 'deal_closed'
                        ? 'bg-stone-950/80 border-emerald-500/40'
                        : 'bg-stone-950/80 border-stone-800'
                    }`}
                  >
                    {/* Top Row: Restaurant Name & Type */}
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-base font-bold text-white font-serif">
                            {inq.restaurantName}
                          </h4>
                          {isMockup ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                              <Palette className="w-2.5 h-2.5" />
                              <span>FREE MOCKUP REQUEST</span>
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400 text-stone-950">
                              PACKAGE CLAIM 🔥
                            </span>
                          )}

                          {inq.status === 'deal_closed' && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                              WON 🎉
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-stone-400 mt-0.5 flex items-center gap-2">
                          {inq.contactName && <span>{inq.contactName}</span>}
                          {inq.contactName && inq.instagramHandle && <span>•</span>}
                          {inq.instagramHandle && (
                            <span className="text-amber-300 font-medium">{inq.instagramHandle}</span>
                          )}
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        {isMockup ? (
                          <span className="inline-block px-2.5 py-1 rounded-lg text-xs font-bold bg-purple-900/40 border border-purple-500/30 text-purple-200">
                            Free Preview
                          </span>
                        ) : (
                          <>
                            <span className="inline-block px-2.5 py-1 rounded-lg text-xs font-bold bg-stone-800 border border-stone-700 text-amber-300">
                              {pkg.name}
                            </span>
                            <div className="text-[11px] text-stone-400 mt-1">
                              {pkg.pricingHeader}
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Delivery Target Timer Callout */}
                    <div className="p-2.5 rounded-xl bg-stone-900/90 border border-stone-800 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 text-stone-300">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        <span>
                          {isMockup ? '24–48h Mockup Delivery Target:' : '48-Hour Rapid Launch Target:'}
                        </span>
                      </div>
                      <span className="font-bold text-amber-300">
                        {new Date(inq.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>

                    {/* Direct Contact Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div className="p-2 bg-stone-900/60 rounded-lg border border-stone-800/80">
                        <span className="text-stone-400 block text-[10px] uppercase font-semibold">Contact Info</span>
                        <span className="font-mono text-white font-medium break-all">{inq.emailOrPhone}</span>
                      </div>
                      {inq.notes && (
                        <div className="p-2 bg-stone-900/60 rounded-lg border border-stone-800/80">
                          <span className="text-stone-400 block text-[10px] uppercase font-semibold">
                            {isMockup ? 'Menu / Notes' : 'Client Notes'}
                          </span>
                          <span className="text-stone-300 line-clamp-1 italic">{inq.notes}</span>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 pt-2 border-t border-stone-800/80 flex-wrap">
                      {igUrl && (
                        <a
                          href={igUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-pink-500/10 hover:bg-pink-500/20 text-pink-300 border border-pink-500/30 text-xs font-semibold transition-colors"
                        >
                          <Instagram className="w-3.5 h-3.5" />
                          <span>Open Instagram</span>
                          <ExternalLink className="w-3 h-3 opacity-60" />
                        </a>
                      )}

                      {telUrl && (
                        <a
                          href={telUrl}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition-colors"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>Call / SMS</span>
                        </a>
                      )}

                      {/* Free Mockup Pitch Script Copier */}
                      {isMockup && (
                        <button
                          onClick={() => handleCopyMockupScript(inq)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 border border-purple-500/40 text-xs font-semibold transition-colors cursor-pointer"
                          title="Copy a pre-written DM to send your mockup to the restaurant"
                        >
                          {copiedScriptId === inq.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-purple-300" />
                              <span>Copied Send Script!</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-3.5 h-3.5" />
                              <span>Copy "Send Mockup" DM</span>
                            </>
                          )}
                        </button>
                      )}

                      <button
                        onClick={() => handleCopyDeal(inq)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold transition-colors cursor-pointer"
                      >
                        {copiedId === inq.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Copied Details!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Details</span>
                          </>
                        )}
                      </button>

                      {/* Status Pills */}
                      <div className="ml-auto flex items-center gap-1">
                        {(['new_claim', 'contacted', 'deal_closed'] as const).map((st) => (
                          <button
                            key={st}
                            onClick={() => onUpdateStatus(inq.id, st)}
                            className={`px-2 py-1 rounded text-[10px] font-medium transition-colors cursor-pointer ${
                              inq.status === st
                                ? st === 'deal_closed'
                                  ? 'bg-emerald-500 text-stone-950 font-bold'
                                  : st === 'contacted'
                                  ? 'bg-amber-400 text-stone-950 font-bold'
                                  : 'bg-stone-200 text-stone-950 font-bold'
                                : 'bg-stone-900 text-stone-400 hover:text-white'
                            }`}
                          >
                            {st === 'new_claim' && 'New'}
                            {st === 'contacted' && (isMockup ? 'Mockup Sent' : 'Contacted')}
                            {st === 'deal_closed' && 'Closed Deal 🎉'}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })
            )
          ) : (
            /* Settings Tab for Freelancer contact channels */
            <form onSubmit={handleSaveProfile} className="space-y-4 p-1">
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-xs text-amber-200 space-y-1">
                <div className="font-bold">Where do you want restaurant owners to reach you?</div>
                <p className="text-stone-400">
                  When someone requests a free mockup or claims a spot, we give them 1-tap buttons to message you directly on your Instagram or WhatsApp!
                </p>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-300">Your Studio / Agency Name</label>
                <input
                  type="text"
                  value={localProfile.agencyName}
                  onChange={(e) => setLocalProfile({ ...localProfile, agencyName: e.target.value })}
                  placeholder="Ridge Creative"
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-white placeholder-stone-600 focus:outline-hidden focus:border-amber-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-300">Your Instagram Handle</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-stone-500 text-xs">@</span>
                  <input
                    type="text"
                    value={localProfile.instagramHandle.replace(/^@/, '')}
                    onChange={(e) =>
                      setLocalProfile({ ...localProfile, instagramHandle: `@${e.target.value}` })
                    }
                    placeholder="your_instagram_handle"
                    className="w-full pl-7 pr-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-white placeholder-stone-600 focus:outline-hidden focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-300">Your WhatsApp / Phone Number</label>
                <input
                  type="text"
                  value={localProfile.whatsappNumber}
                  onChange={(e) => setLocalProfile({ ...localProfile, whatsappNumber: e.target.value })}
                  placeholder="+1 (555) 123-4567"
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-white placeholder-stone-600 focus:outline-hidden focus:border-amber-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-300">Your Notification Email</label>
                <input
                  type="email"
                  value={localProfile.notificationEmail}
                  onChange={(e) =>
                    setLocalProfile({ ...localProfile, notificationEmail: e.target.value })
                  }
                  placeholder="you@agency.com"
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-white placeholder-stone-600 focus:outline-hidden focus:border-amber-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 transition-colors cursor-pointer"
              >
                {savedSuccess ? 'Saved Successfully!' : 'Save Direct Contact Settings'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
