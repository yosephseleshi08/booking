import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: 'Why is the website setup fee $0 for the first 3 clients?',
    a: 'We are expanding our local culinary design portfolio with three exceptional dining spots. In exchange for permission to showcase your website as a premier case study and a quick testimonial once you are thrilled with the results, we 100% waive our standard $499 design and development fee.',
  },
  {
    q: 'How does the Free Mockup work if I want to see our design first?',
    a: 'Simply tap "Request Free Mockup" and provide just your Instagram username or profile link. No phone number, email, or credit card required. We will review your food photos, craft a bespoke mobile homepage mockup, and send you the private preview link directly via Instagram DM within 24–48 hours. If you love it, you can activate your site for $0 setup + $99/mo. If not, it costs you nothing.',
  },
  {
    q: 'Are there any long-term contracts or hidden lock-ins?',
    a: 'None whatsoever. All packages operate on a simple, transparent month-to-month basis. You can cancel at any time with a single email or text message. There are no cancellation fees or penalties.',
  },
  {
    q: 'How do menu and price updates work with the monthly maintenance?',
    a: 'Whenever you change seasonal dishes, adjust prices, or run a holiday special, simply text or email our team. We handle the code, format the dish descriptions, optimize the photos, and update your live site within 24 hours (or same-day for VIP partners).',
  },
  {
    q: 'Do you take any percentage or commission on our direct orders?',
    a: 'Never. Unlike third-party apps like DoorDash or UberEats that deduct 20% to 30% from every ticket, our direct ordering engine is 100% commission-free. Every dollar from your online takeout and dining sales goes directly into your bank account.',
  },
  {
    q: 'How fast will our new restaurant website be live and ready?',
    a: 'Guaranteed live and taking orders within 48 hours! For all three packages, once you reserve your spot and provide your current menu, our design and engineering team works in rapid sprint mode to deliver your fully functional, mobile-first website within 48 hours.',
  },
  {
    q: 'What if we already own our domain name (e.g., ourrestaurant.com)?',
    a: 'We seamlessly connect your existing domain at no extra charge. If you don’t have a domain yet, we guide you through securing one or configure it for you directly on high-speed cloud infrastructure.',
  },
];

export const AgencyFaq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 sm:py-24 bg-stone-900/60 border-t border-stone-800/80 text-stone-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-stone-800 text-stone-300 border border-stone-700">
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>Clear Answers</span>
          </div>
          <h2 className="text-3xl font-bold font-serif text-white">Frequently Asked Questions</h2>
          <p className="text-xs sm:text-sm text-stone-400">
            Everything you need to know about partnering with our restaurant web studio.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-stone-950/80 border border-stone-800 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-stone-900/50 transition-colors"
                >
                  <span className="text-sm sm:text-base font-semibold text-white font-serif">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-amber-400 shrink-0 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-stone-300 leading-relaxed border-t border-stone-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
