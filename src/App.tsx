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
import { FreeMockupModal } from './components/FreeMockupModal';
import { DealsInboxDrawer } from './components/DealsInboxDrawer';
import { PackageTier, DealInquiry, AgencyOwnerProfile } from './types';
import { PACKAGES } from './data/packages';
import { Flame, X, ArrowRight, Palette } from 'lucide-react';

const DEFAULT_PROFILE: AgencyOwnerProfile = {
  agencyName: 'Atelier Dining',
  ownerName: 'Freelance Studio',
  instagramHandle: '@atelierdining',
  whatsappNumber: '+1 555-234-8910',
  notificationEmail: 'yosephseleshi08@gmail.com',
};

export default function App() {
  const [isPackageClaimOpen, setIsPackageClaimOpen] = useState(false);
  const [isMockupModalOpen, setIsMockupModalOpen] = useState(false);
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
        contactName: '',
        emailOrPhone: 'Instagram: @trattoria_bellanapoli',
        instagramHandle: '@trattoria_bellanapoli',
        packageTier: 'pilot',
        notes: 'Requested free mobile menu mockup',
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
      .then((res) => {
        if (res.ok && res.headers.get('content-type')?.includes('application/json')) {
          return res.json();
        }
        return null;
      })
      .then((data) => {
        if (data && data.inquiries && Array.isArray(data.inquiries) && data.inquiries.length > 0) {
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

  const handleOpenInquiry = (tier?: unknown) => {
    const validTiers: PackageTier[] = ['pilot', 'growth', 'premium'];
    const safeTier =
      typeof tier === 'string' && validTiers.includes(tier as PackageTier)
        ? (tier as PackageTier)
        : 'pilot';
    setSelectedTier(safeTier);
    setIsPackageClaimOpen(true);
  };

  const handleRequestMockup = (handle?: unknown) => {
    const safeHandle = typeof handle === 'string' ? handle : '';
    setInitialMockupHandle(safeHandle);
    setIsMockupModalOpen(true);
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
                ? `Free Custom Preview • Instagram: ${newDealAlert.instagramHandle || 'N/A'}`
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

        {/* 100% Free Custom Mockup Banner with Direct 1-Field Submission */}
        <FreeMockupBanner
          onInquiryCreated={handleInquiryCreated}
          onRequestMockup={handleRequestMockup}
          ownerProfile={ownerProfile}
        />

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

      {/* Ultra-Simple Free Mockup Modal (Only Instagram Username or Link) */}
      <FreeMockupModal
        isOpen={isMockupModalOpen}
        onClose={() => setIsMockupModalOpen(false)}
        initialHandle={initialMockupHandle}
        ownerProfile={ownerProfile}
        onInquiryCreated={handleInquiryCreated}
      />

      {/* Spot Reservation / Application Modal for Tier Claims */}
      <InquiryModal
        isOpen={isPackageClaimOpen}
        onClose={() => setIsPackageClaimOpen(false)}
        initialTier={selectedTier}
        ownerProfile={ownerProfile}
        onInquiryCreated={handleInquiryCreated}
        onSwitchToMockup={() => {
          setIsPackageClaimOpen(false);
          setIsMockupModalOpen(true);
        }}
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
