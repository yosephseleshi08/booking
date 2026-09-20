export type PackageTier = 'pilot' | 'growth' | 'premium';
export type InquiryType = 'package_claim' | 'free_mockup';

export interface PackageOffer {
  id: PackageTier;
  name: string;
  badge: string;
  isPopular?: boolean;
  isFounding?: boolean;
  setupFee: number;
  originalSetupFee: number;
  monthlyFee: number;
  pricingHeader: string;
  tagline: string;
  description: string;
  idealFor: string;
  deliverables: string[];
  maintenanceIncludes: string[];
  turnaroundTime: string;
  ctaText: string;
}

export interface DealInquiry {
  id: string;
  inquiryType: InquiryType;
  restaurantName: string;
  contactName: string;
  emailOrPhone: string;
  instagramHandle: string;
  packageTier: PackageTier;
  notes?: string;
  createdAt: string;
  status: 'new_claim' | 'contacted' | 'deal_closed';
}

export interface AgencyOwnerProfile {
  agencyName: string;
  ownerName: string;
  instagramHandle: string;
  whatsappNumber: string;
  notificationEmail: string;
}
