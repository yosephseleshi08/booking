import React, { useState } from 'react';
import { Smartphone, Utensils, MapPin, Phone, Calendar, ShoppingBag, Star, Sparkles, Check } from 'lucide-react';

interface RestaurantConcept {
  id: string;
  name: string;
  cuisine: string;
  tagline: string;
  rating: string;
  reviews: string;
  signatureDish: string;
  price: string;
  heroBg: string;
  accentColor: string;
  menuHighlights: { name: string; desc: string; price: string; tag?: string }[];
}

const CONCEPTS: RestaurantConcept[] = [
  {
    id: 'trattoria',
    name: 'Osteria Del Porto',
    cuisine: 'Handmade Pasta & Coastal Wine',
    tagline: 'Authentic Ligurian coastal dining in the heart of the city',
    rating: '4.9',
    reviews: '340 reviews',
    signatureDish: 'Truffle & Wild Mushroom Tagliolini',
    price: '$28',
    heroBg: 'from-amber-950 via-stone-900 to-stone-950',
    accentColor: 'text-amber-400',
    menuHighlights: [
      { name: 'Squid Ink Tagliolini', desc: 'Fresh calamari, cherry pomodoro, chili crisp', price: '$26', tag: 'Chef Favorite' },
      { name: 'Cacio e Pepe Frittelle', desc: 'Aged pecorino romano, cracked tellicherry pepper', price: '$18' },
      { name: 'Bistecca alla Fiorentina', desc: 'Dry-aged prime T-bone, rosemary smoked sea salt', price: '$58' },
    ]
  },
  {
    id: 'pizzeria',
    name: 'Fiori Wood-Fired Pizza',
    cuisine: 'Neapolitan Artisan Pizzeria',
    tagline: '72-hour fermented sourdough baked at 900°F in volcanic stone',
    rating: '4.8',
    reviews: '520 reviews',
    signatureDish: 'Burrata & Hot Honey Diavola',
    price: '$23',
    heroBg: 'from-rose-950 via-stone-900 to-stone-950',
    accentColor: 'text-rose-400',
    menuHighlights: [
      { name: 'Hot Honey Diavola', desc: 'Soppressata, smoked fior di latte, hot chili honey', price: '$23', tag: 'Bestseller' },
      { name: 'Truffle Tartufo Pie', desc: 'Fontina, roasted cremini mushrooms, white truffle oil', price: '$25' },
      { name: 'Margherita D.O.P.', desc: 'San Marzano tomatoes, buffalo mozzarella, fresh basil', price: '$19' },
    ]
  },
  {
    id: 'cocktail',
    name: 'Velvet & Rye Bistro',
    cuisine: 'Craft Cocktails & Small Plates',
    tagline: 'Late night culinary salon, vinyl listening, and bespoke libations',
    rating: '4.9',
    reviews: '280 reviews',
    signatureDish: 'Smoked Wagyu Tartare & Bone Marrow',
    price: '$24',
    heroBg: 'from-purple-950 via-stone-900 to-stone-950',
    accentColor: 'text-purple-400',
    menuHighlights: [
      { name: 'Smoked Wagyu Tartare', desc: 'Egg yolk emulsion, crispy shallots, grilled sourdough', price: '$24', tag: 'Signature' },
      { name: 'Pan-Seared Sea Scallops', desc: 'Cauliflower mousseline, brown butter caper vinaigrette', price: '$29' },
      { name: 'Smoked Cedar Old Fashioned', desc: 'Rye whiskey, angostura bitters, flamed orange peel', price: '$18' },
    ]
  }
];

export const InteractiveSimulator: React.FC = () => {
  const [selectedConcept, setSelectedConcept] = useState<RestaurantConcept>(CONCEPTS[0]);
  const [activeTab, setActiveTab] = useState<'menu' | 'reserve' | 'order'>('menu');
  const [demoActionFeedback, setDemoActionFeedback] = useState<string | null>(null);

  const triggerFeedback = (msg: string) => {
    setDemoActionFeedback(msg);
    setTimeout(() => setDemoActionFeedback(null), 2500);
  };

  return (
    <section className="py-16 sm:py-24 text-stone-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-stone-800 text-stone-300 border border-stone-700">
            <Smartphone className="w-3.5 h-3.5 text-amber-400" />
            <span>Live Interactive Mobile Prototype</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-serif">
            Experience How Your Diners Will Browse
          </h2>
          <p className="text-sm sm:text-base text-stone-400">
            90% of restaurant discoveries start on a smartphone. See how your menu, reservations, and 0% commission ordering come alive on an iPhone.
          </p>

          {/* Archetype switcher tabs */}
          <div className="inline-flex p-1 bg-stone-900 rounded-full border border-stone-800 max-w-full overflow-x-auto text-xs mt-4">
            {CONCEPTS.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedConcept(c)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  selectedConcept.id === c.id
                    ? 'bg-amber-400 text-stone-950 font-bold shadow-xs'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Device Viewport */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
          {/* Interactive Mobile Device Frame */}
          <div className="w-[320px] sm:w-[360px] h-[640px] bg-stone-950 border-[8px] border-stone-800 rounded-[44px] shadow-2xl overflow-hidden relative flex flex-col ring-1 ring-stone-700/60">
            {/* Dynamic Island / Speaker Notch */}
            <div className="h-6 bg-stone-950 flex items-center justify-center relative shrink-0 z-20">
              <div className="w-24 h-4 bg-stone-900 rounded-full flex items-center justify-end px-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              </div>
            </div>

            {/* Mobile App Viewable Content */}
            <div className="flex-1 overflow-y-auto bg-stone-950 text-stone-100 flex flex-col justify-between">
              {/* Header Hero Inside Phone */}
              <div className={`p-5 bg-gradient-to-b ${selectedConcept.heroBg} border-b border-stone-800 space-y-3`}>
                <div className="flex items-center justify-between text-[11px] text-stone-400">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    Downtown Historic District
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-amber-300">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    {selectedConcept.rating} ({selectedConcept.reviews})
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold font-serif text-white tracking-tight">
                    {selectedConcept.name}
                  </h3>
                  <p className="text-[11px] text-stone-300 italic mt-0.5">
                    {selectedConcept.tagline}
                  </p>
                </div>

                {/* Direct Action Bar inside phone */}
                <div className="grid grid-cols-3 gap-1.5 pt-1">
                  <button
                    onClick={() => setActiveTab('menu')}
                    className={`py-1.5 px-2 rounded-lg text-[10px] font-bold transition-all text-center flex items-center justify-center gap-1 ${
                      activeTab === 'menu'
                        ? 'bg-amber-400 text-stone-950'
                        : 'bg-stone-900/90 text-stone-300 hover:bg-stone-800'
                    }`}
                  >
                    <Utensils className="w-3 h-3" />
                    <span>Menu</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('reserve')}
                    className={`py-1.5 px-2 rounded-lg text-[10px] font-bold transition-all text-center flex items-center justify-center gap-1 ${
                      activeTab === 'reserve'
                        ? 'bg-amber-400 text-stone-950'
                        : 'bg-stone-900/90 text-stone-300 hover:bg-stone-800'
                    }`}
                  >
                    <Calendar className="w-3 h-3" />
                    <span>Reserve</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('order')}
                    className={`py-1.5 px-2 rounded-lg text-[10px] font-bold transition-all text-center flex items-center justify-center gap-1 ${
                      activeTab === 'order'
                        ? 'bg-amber-400 text-stone-950'
                        : 'bg-stone-900/90 text-stone-300 hover:bg-stone-800'
                    }`}
                  >
                    <ShoppingBag className="w-3 h-3" />
                    <span>0% Fee</span>
                  </button>
                </div>
              </div>

              {/* Body Content according to active tab */}
              <div className="p-4 flex-1 space-y-3 text-xs">
                {activeTab === 'menu' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-[11px] text-stone-400 font-semibold uppercase tracking-wider">
                      <span>Chef's Evening Selections</span>
                      <span className="text-amber-400 text-[10px]">Instant Search</span>
                    </div>

                    <div className="space-y-2.5">
                      {selectedConcept.menuHighlights.map((dish, idx) => (
                        <div
                          key={idx}
                          onClick={() => triggerFeedback(`Added "${dish.name}" to diner order!`)}
                          className="p-2.5 rounded-xl bg-stone-900/80 border border-stone-800/90 hover:border-amber-400/40 transition-all cursor-pointer space-y-1"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="font-bold text-white text-[12px]">{dish.name}</span>
                            <span className="font-semibold text-amber-400 font-serif text-[13px]">{dish.price}</span>
                          </div>
                          <p className="text-[11px] text-stone-400 leading-snug">{dish.desc}</p>
                          {dish.tag && (
                            <span className="inline-block px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-500/20 text-amber-300">
                              {dish.tag}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'reserve' && (
                  <div className="space-y-3 p-2 bg-stone-900/60 rounded-xl border border-stone-800">
                    <div className="text-xs font-bold text-white">Direct Table Reservation</div>
                    <p className="text-[11px] text-stone-400">
                      Zero cover fees. Diners book a table in 2 taps directly to your floor plan.
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div className="p-2 bg-stone-950 rounded-lg border border-stone-800 text-center">
                        <span className="text-stone-400 block text-[10px]">TONIGHT</span>
                        <span className="font-bold text-white">7:30 PM (2 Guests)</span>
                      </div>
                      <div className="p-2 bg-stone-950 rounded-lg border border-stone-800 text-center">
                        <span className="text-stone-400 block text-[10px]">TABLE</span>
                        <span className="font-bold text-amber-400">Main Dining Room</span>
                      </div>
                    </div>
                    <button
                      onClick={() => triggerFeedback('Table reserved for 7:30 PM!')}
                      className="w-full py-2 bg-amber-400 text-stone-950 font-bold rounded-lg text-xs"
                    >
                      Confirm Direct Booking
                    </button>
                  </div>
                )}

                {activeTab === 'order' && (
                  <div className="space-y-3 p-2 bg-stone-900/60 rounded-xl border border-stone-800">
                    <div className="flex items-center justify-between text-xs font-bold text-white">
                      <span>Direct Pickup &amp; Delivery</span>
                      <span className="text-emerald-400 text-[10px]">100% Margin Kept</span>
                    </div>
                    <p className="text-[11px] text-stone-400">
                      No 30% cut taken by delivery platforms. Orders print straight to your POS / kitchen printer.
                    </p>
                    <div className="p-2.5 bg-stone-950 rounded-lg border border-stone-800 flex items-center justify-between text-[11px]">
                      <div>
                        <span className="font-bold text-white block">{selectedConcept.signatureDish}</span>
                        <span className="text-stone-400 text-[10px]">Estimated: 25 mins</span>
                      </div>
                      <span className="font-bold text-amber-400">{selectedConcept.price}</span>
                    </div>
                    <button
                      onClick={() => triggerFeedback('Direct order placed with 0% commission!')}
                      className="w-full py-2 bg-emerald-500 text-white font-bold rounded-lg text-xs"
                    >
                      Place Order Directly ($0 Delivery Commission)
                    </button>
                  </div>
                )}

                {/* Instant Feedback Toast */}
                {demoActionFeedback && (
                  <div className="p-2 rounded-lg bg-emerald-950 border border-emerald-500/50 text-emerald-300 text-[11px] text-center font-semibold animate-bounce">
                    ✓ {demoActionFeedback}
                  </div>
                )}
              </div>

              {/* Sticky 1-Tap Quick Action Bar */}
              <div className="p-2 bg-stone-900 border-t border-stone-800 flex items-center justify-around text-[10px] text-stone-300">
                <button
                  onClick={() => triggerFeedback('Calling restaurant... (1-Tap Call)')}
                  className="flex flex-col items-center gap-0.5 hover:text-white"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Call Spot</span>
                </button>
                <button
                  onClick={() => triggerFeedback('Opening Google Maps navigation...')}
                  className="flex flex-col items-center gap-0.5 hover:text-white"
                >
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>Directions</span>
                </button>
                <button
                  onClick={() => setActiveTab('reserve')}
                  className="flex flex-col items-center gap-0.5 text-amber-400 font-bold"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Table</span>
                </button>
              </div>
            </div>
          </div>

          {/* Side feature highlights */}
          <div className="space-y-6 max-w-md">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Why Diners Convert
              </span>
              <h3 className="text-2xl font-bold font-serif text-white mt-1">
                Built specifically for hungry smartphones.
              </h3>
              <p className="text-sm text-stone-400 mt-2 leading-relaxed">
                Most restaurant websites are clunky desktop templates forced onto mobile. We build mobile-first experiences that load in under 800 milliseconds and make calling, navigating, and ordering effortless.
              </p>
            </div>

            <div className="space-y-3 text-xs text-stone-300">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-stone-900/60 border border-stone-800">
                <div className="w-6 h-6 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 font-bold">
                  1
                </div>
                <div>
                  <strong className="text-white block font-semibold">No Clunky PDF Menus:</strong>
                  <span>Your dishes and prices are rendered in clean text, easily searchable by diners with dietary restrictions.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-stone-900/60 border border-stone-800">
                <div className="w-6 h-6 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 font-bold">
                  2
                </div>
                <div>
                  <strong className="text-white block font-semibold">1-Tap Direct Actions:</strong>
                  <span>Diners can tap once to call your host stand, launch Google Maps turn-by-turn directions, or book a table.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-stone-900/60 border border-stone-800">
                <div className="w-6 h-6 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 font-bold">
                  3
                </div>
                <div>
                  <strong className="text-white block font-semibold">Stop Paying 30% Extortion:</strong>
                  <span>Keep 100% of takeout orders by giving your loyal diners an effortless direct ordering experience.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
