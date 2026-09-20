import { PackageOffer, PackageTier } from '../types';

export const PACKAGES: Record<PackageTier, PackageOffer> = {
  pilot: {
    id: 'pilot',
    name: 'Founding Partner',
    badge: 'First 3 Clients Only',
    isFounding: true,
    setupFee: 0,
    originalSetupFee: 499,
    monthlyFee: 99,
    pricingHeader: '$0 setup + $99/month',
    tagline: 'Zero upfront financial risk to launch your digital flagship',
    description: 'We waive our standard $499 build fee for our first 3 restaurant partners in exchange for featuring your new site as a premier case study in our agency portfolio.',
    idealFor: 'Independent dining spots, neighborhood bistros & trattorias wanting a modern web presence without big agency upfront fees.',
    deliverables: [
      '⚡ 48-Hour Rapid Launch Guarantee (Live & taking orders within 48h)',
      'Custom bespoke restaurant website (Engineered for mobile diners)',
      'Interactive digital menu (Searchable, fast-loading, no PDF pinch-to-zoom)',
      '1-Tap "Call Restaurant" & "Get Directions" sticky mobile quick-bar',
      'Google Business Profile & Google Maps SEO link synchronization',
      'High-speed cloud infrastructure + SSL security certificate',
      'Contact, dietary questions & private dining inquiry form'
    ],
    maintenanceIncludes: [
      'Monthly menu dish and price adjustments included',
      '99.9% uptime hosting and speed monitoring',
      'Technical maintenance, security patches & backups',
      'Direct WhatsApp and email support line'
    ],
    turnaroundTime: 'Live Within 48 Hours',
    ctaText: 'Claim Founding Partner Spot ($0 Setup)'
  },
  growth: {
    id: 'growth',
    name: 'Growth & Direct Ordering',
    badge: 'Direct Ordering Standard',
    isPopular: true,
    setupFee: 299,
    originalSetupFee: 650,
    monthlyFee: 99,
    pricingHeader: '$299 setup + $99/month',
    tagline: 'Stop losing 20-30% of your tickets to third-party delivery apps',
    description: 'A powerful sales engine engineered to convert your Instagram followers and local diners into direct, commission-free pickup orders and instant table reservations.',
    idealFor: 'High-volume dining spots, pizzerias & craft burger bars looking to reclaim delivery margins and increase covers.',
    deliverables: [
      '⚡ 48-Hour Rapid Launch Guarantee (Live & taking orders within 48h)',
      'Full bespoke restaurant web architecture',
      'Direct commission-free online pickup / ordering engine',
      'Integrated table reservation booking widget (OpenTable, Resy, or Direct)',
      'Custom Instagram / TikTok bio link tree designed for hungry scrollers',
      'Local search SEO optimization for "best [cuisine] near me" searches',
      'High-resolution food gallery & allergen filter badges'
    ],
    maintenanceIncludes: [
      'Bi-weekly menu adjustments & seasonal special highlights',
      'Cloud hosting, domain management & daily backups',
      'Mobile responsiveness audits & uptime surveillance',
      'Standard priority email & direct chat support'
    ],
    turnaroundTime: 'Live Within 48 Hours',
    ctaText: 'Select Growth Package ($299 Setup)'
  },
  premium: {
    id: 'premium',
    name: 'VIP Full Maintenance & Support',
    badge: 'White-Glove VIP Partnership',
    setupFee: 499,
    originalSetupFee: 999,
    monthlyFee: 149,
    pricingHeader: '$499 setup + $149/month',
    tagline: 'Your complete on-demand digital web and growth department',
    description: 'The white-glove, turn-key partnership. We handle everything from same-day menu updates and holiday promotions to automated 5-star Google review generation.',
    idealFor: 'Fine dining, upscale venues & multi-concept hospitality groups who require rapid same-day updates and zero tech headaches.',
    deliverables: [
      '⚡ 48-Hour Rapid Launch Guarantee (Live & taking orders within 48h)',
      'Flagship bespoke dining experience & high-converting UX',
      'Commission-free online ordering & table booking flow',
      'Sub-second speed optimization guarantee for instant loading',
      'Automated 5-Star Google Reviews QR code card & diner rating page',
      'Private event & catering booking inquiry pipeline',
      'Email / SMS diner club loyalty signup modal'
    ],
    maintenanceIncludes: [
      'Unlimited menu edits, seasonal drink additions & price tweaks',
      'Same-day VIP priority turnaround for urgent changes',
      'Holiday & event promotional banners designed for you',
      'Monthly traffic report & local search ranking insights',
      'Dedicated direct phone and emergency text line'
    ],
    turnaroundTime: 'Live Within 48 Hours',
    ctaText: 'Select VIP White-Glove ($499 Setup)'
  }
};
