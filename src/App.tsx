import React, { useState, useEffect } from 'react';
import { AgencyNav } from './components/AgencyNav';
import { AgencyHero } from './components/AgencyHero';
import { OffersGrid } from './components/OffersGrid';
import { FreeMockupBanner } from './components/FreeMockupBanner';
import { InteractiveSimulator } from './components/InteractiveSimulator';
import { ComparisonSection } from './components/ComparisonSection';
import { AgencyFaq } from './components/AgencyFaq';
import { AgencyFooter } from './components/AgencyFooter';
import { InquiryModal } from './components/InquiryModal';
import { DealsInboxDrawer } from './components/DealsInboxDrawer';
import { PackageTier, DealInquiry, AgencyOwnerProfile, InquiryType } from './types';
import { PACKAGES } from './data/packages';
import { Flame, Clock, X, ArrowRight, Palette } from 'lucide-react';

const DEFAULT_PROFILE: AgencyOwnerProfile = {
  agencyName: 'Atelier Dining',
  ownerName: 'Freelance Studio',
  instagramHandle: '@atelierdining',
  whatsappNumber: '+1 555-234-8910',
  notificationEmail: 'yosephseleshi08@gmail.com',
};

export default function App() {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [inquiryMode, setInquiryMode] = useState<InquiryType>('package_claim');
  const [initialMockupHandle, setInitialMockupHandle] = useState('');
  const [isDealsOpen, setIsDealsOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<PackageTier>('pilot');
  const [newDealAlert, setNewDealAlert] = useState<DealInquiry | null>(null);

  // Inquiries State
  const [inquiries, setInquiries] = useState<DealInquiry[]>(() => {
    const saved = localStorage.getItem('atelier_inquiries');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return [
      {
        id: 'sample-1',
        inquiryType: 'free_mockup',
        restaurantName: 'Trattoria Bella Napoli',
        contactName: 'Chef Giovanni (Owner)',
        emailOrPhone: '+1 (555) 234-8910',
        instagramHandle: '@trattoria_bellanapoli',
        packageTier: 'pilot',
        notes: 'We have a paper menu we need digitized. Sent photos via Instagram!',
        createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
        status: 'new_claim',
      },
    ];
  });

  // Owner profile settings
  const [ownerProfile, setOwnerProfile] = useState<AgencyOwnerProfile>(() => {
    const saved = localStorage.getItem('atelier_owner_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return DEFAULT_PROFILE;
  });

  // Fetch inquiries from server
  useEffect(() => {
    fetch('/api/inquiries')
      .then((res) => res.json())
      .then((data) => {
        if (data.inquiries && Array.isArray(data.inquiries) && data.inquiries.length > 0) {
          setInquiries((prev) => {
            const combined = [...data.inquiries];
            prev.forEach((p) => {
              if (!combined.some((c) => c.id === p.id)) {
                combined.push(p);
              }
            });
            return combined;
          });
        }
      })
      .catch(() => {
        // Ignore in preview
      });
  }, []);

  // Save to local storage
  useEffect(() => {
    localStorage.setItem('atelier_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem('atelier_owner_profile', JSON.stringify(ownerProfile));
  }, [ownerProfile]);

  const handleOpenInquiry = (tier: PackageTier = 'pilot') => {
    setSelectedTier(tier);
    setInquiryMode('package_claim');
    setIsInquiryOpen(true);
  };

  const handleRequestMockup = (handle?: string) => {
    setInquiryMode('free_mockup');
    setInitialMockupHandle(handle || '');
    setIsInquiryOpen(true);
  };

  const handleInquiryCreated = (inquiry: DealInquiry) => {
    setInquiries((prev) => [inquiry, ...prev]);
    setNewDealAlert(inquiry);
  };

  const handleUpdateStatus = (id: string, status: DealInquiry['status']) => {
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status } : inq))
    );
    fetch(`/api/inquiries/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    }).catch(() => {});
  };

  const unseenDealsCount = inquiries.filter((i) => i.status === 'new_claim').length;

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans selection:bg-amber-400 selection:text-stone-950 flex flex-col">
      {/* Top Agency Navigation with Deals Inbox Indicator */}
      <AgencyNav
        onOpenInquiry={handleOpenInquiry}
        onRequestMockup={handleRequestMockup}
        onOpenDeals={() => setIsDealsOpen(true)}
        unseenDealsCount={unseenDealsCount}
      />

      {/* Real-time Deal Alert Toast if someone claims a deal or requests a mockup */}
      {newDealAlert && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md w-full p-4 rounded-2xl bg-stone-900 border border-amber-500/60 shadow-2xl animate-in slide-in-from-bottom-5 text-stone-100 flex items-start gap-3">
          <div className="p-2 rounded-xl bg-amber-500 text-stone-950 shrink-0 font-bold">
            {newDealAlert.inquiryType === 'free_mockup' ? (
              <Palette className="w-5 h-5" />
            ) : (
              <Flame className="w-5 h-5" />
            )}
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                {newDealAlert.inquiryType === 'free_mockup'
                  ? 'Free Mockup Requested! 🎨'
                  : 'New Deal Claimed! 🔥'}
              </span>
              <button
                onClick={() => setNewDealAlert(null)}
                className="text-stone-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm font-bold text-white">
              {newDealAlert.restaurantName}
            </p>
            <p className="text-xs text-stone-300">
              {newDealAlert.inquiryType === 'free_mockup'
                ? `Requested Free Custom Preview • Instagram: ${newDealAlert.instagramHandle || 'N/A'}`
                : `Claimed: ${PACKAGES[newDealAlert.packageTier]?.name} • Contact: ${newDealAlert.emailOrPhone}`}
            </p>
            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={() => {
                  setNewDealAlert(null);
                  setIsDealsOpen(true);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-bold transition-colors cursor-pointer"
              >
                <span>Open in Deals Inbox</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Agency Content */}
      <main className="flex-1">
        {/* Hero Section with $0 Setup + Free Mockup CTA */}
        <AgencyHero
          onOpenInquiry={handleOpenInquiry}
          onRequestMockup={handleRequestMockup}
        />

        {/* The Core 3 Packages Grid */}
        <OffersGrid
          onSelectTier={handleOpenInquiry}
          onRequestMockup={handleRequestMockup}
        />

        {/* 100% Free Custom Mockup Banner */}
        <FreeMockupBanner onRequestMockup={handleRequestMockup} />

        {/* Live Interactive Mobile Prototype Simulator */}
        <InteractiveSimulator />

        {/* Value Comparison Section */}
        <ComparisonSection />

        {/* Transparent Agency FAQs */}
        <AgencyFaq />
      </main>

      {/* Agency Footer */}
      <AgencyFooter
        onOpenInquiry={() => handleOpenInquiry('pilot')}
        onOpenDeals={() => setIsDealsOpen(true)}
      />

      {/* Spot Reservation / Application Modal with Direct DM handoff */}
      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        initialTier={selectedTier}
        initialMode={inquiryMode}
        initialMockupHandle={initialMockupHandle}
        ownerProfile={ownerProfile}
        onInquiryCreated={handleInquiryCreated}
      />

      {/* Owner Deals Inbox & Notifications Drawer */}
      <DealsInboxDrawer
        isOpen={isDealsOpen}
        onClose={() => setIsDealsOpen(false)}
        inquiries={inquiries}
        onUpdateStatus={handleUpdateStatus}
        ownerProfile={ownerProfile}
        onUpdateOwnerProfile={setOwnerProfile}
      />
    </div>
  );
}
