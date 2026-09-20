import React, { useState } from 'react';
import {
  Smartphone,
  Sparkles,
  ShoppingBag,
  Percent,
  Calendar,
  CheckCircle2,
  Utensils,
  ArrowRight,
  Plus,
  Minus,
  Trash2,
  Clock,
  MapPin,
  Phone,
  Star,
  X,
  ChefHat,
  Flame,
  Check
} from 'lucide-react';

interface InteractiveSimulatorProps {
  onRequestMockup?: (handle?: string) => void;
  onOpenInquiry?: (tier?: 'pilot' | 'growth' | 'premium') => void;
}

interface MenuItem {
  id: string;
  name: string;
  desc: string;
  price: number;
  category: string;
  image: string;
  popular?: boolean;
}

interface RestaurantPreset {
  id: string;
  name: string;
  cuisine: string;
  location: string;
  phone: string;
  tagline: string;
  rating: string;
  reviewsCount: string;
  coverImage: string;
  announcement: string;
  categories: string[];
  menu: MenuItem[];
}

const PRESETS: RestaurantPreset[] = [
  {
    id: 'osteria-bella',
    name: 'Osteria Bella',
    cuisine: 'Italian Trattoria & Wine Bar',
    location: 'SoHo • New York, NY',
    phone: '(212) 555-0182',
    tagline: 'Woodfired Napoletana Pizza & Handcrafted Pastas',
    rating: '4.9',
    reviewsCount: '428',
    coverImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
    announcement: '🍷 Free House Tiramisu on your first direct pickup order!',
    categories: ['All', 'Pastas', 'Pizza', 'Antipasti', 'Drinks'],
    menu: [
      {
        id: 'ob-1',
        name: 'Truffle Tagliolini',
        desc: 'Fresh black summer truffle, parmigiano reggiano 24-mo, cultured butter emulsion.',
        price: 26,
        category: 'Pastas',
        image: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=400&q=80',
        popular: true,
      },
      {
        id: 'ob-2',
        name: 'Margherita D.O.P.',
        desc: 'San Marzano tomatoes, fresh buffalo mozzarella, basil, Sicilian EVOO.',
        price: 21,
        category: 'Pizza',
        image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80',
        popular: true,
      },
      {
        id: 'ob-3',
        name: 'Wagyu Beef Carpaccio',
        desc: 'Thinly sliced wagyu beef, shaved pecorino, fried capers, wild baby arugula.',
        price: 19,
        category: 'Antipasti',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80',
      },
      {
        id: 'ob-4',
        name: 'Aperol Spritz Classico',
        desc: 'Prosecco D.O.C., Aperol, club soda, organic orange wheel, Castelvetrano olive.',
        price: 15,
        category: 'Drinks',
        image: 'https://images.unsplash.com/photo-1560512823-829485b8bf24?w=400&q=80',
      },
      {
        id: 'ob-5',
        name: 'Tiramisu Tradizionale',
        desc: 'Espresso-soaked savoiardi, mascarpone zabaglione, Valrhona dark cocoa.',
        price: 12,
        category: 'Antipasti',
        image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80',
      },
    ],
  },
  {
    id: 'kuroshio',
    name: 'Kuroshio Hot Pot',
    cuisine: 'Modern Japanese Hot Pot & Wagyu',
    location: 'Arts District • Los Angeles, CA',
    phone: '(213) 555-0194',
    tagline: 'Prime A5 Wagyu Shabu Shabu & Artisan Dashi',
    rating: '5.0',
    reviewsCount: '315',
    coverImage: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&q=80',
    announcement: '🥢 Reserve your evening shabu table — walk-ins limited on weekends.',
    categories: ['All', 'Shabu Sets', 'Prime Cuts', 'Sides', 'Dessert'],
    menu: [
      {
        id: 'ks-1',
        name: 'A5 Miyazaki Wagyu Set',
        desc: 'Thinly sliced A5 wagyu, signature tonkotsu dashi, seasonal mushrooms, udon.',
        price: 48,
        category: 'Shabu Sets',
        image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400&q=80',
        popular: true,
      },
      {
        id: 'ks-2',
        name: 'Kurobuta Pork Shabu',
        desc: 'Heritage Berkshire pork belly, spicy miso broth, house sesame goma dip.',
        price: 28,
        category: 'Shabu Sets',
        image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&q=80',
        popular: true,
      },
      {
        id: 'ks-3',
        name: 'Salmon Belly Nigiri (2pc)',
        desc: 'Torched Ora King salmon, nikiri glaze, yuzu kosho, fresh wasabi.',
        price: 14,
        category: 'Prime Cuts',
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&q=80',
      },
      {
        id: 'ks-4',
        name: 'Artisan Mushroom Medley',
        desc: 'Shiitake, enoki, maitake, and king oyster mushrooms with baby bok choy.',
        price: 12,
        category: 'Sides',
        image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&q=80',
      },
      {
        id: 'ks-5',
        name: 'Matcha Gelato Parfait',
        desc: 'Ceremonial Uji matcha gelato, red bean paste, toasted black sesame tuile.',
        price: 11,
        category: 'Dessert',
        image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=80',
      },
    ],
  },
  {
    id: 'oak-and-ember',
    name: 'The Oak & Ember',
    cuisine: 'Woodfired Chophouse & Bourbon Bar',
    location: 'West Loop • Chicago, IL',
    phone: '(312) 555-0176',
    tagline: 'Dry-Aged Prime Cuts & Woodfired Seafood',
    rating: '4.9',
    reviewsCount: '512',
    coverImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80',
    announcement: '🥩 Happy Hour: $10 Bourbon Old Fashioneds & Prime Sliders 4-6 PM.',
    categories: ['All', 'Steaks', 'Starters', 'Sides', 'Cocktails'],
    menu: [
      {
        id: 'oe-1',
        name: '45-Day Dry-Aged Ribeye (18oz)',
        desc: 'Charred over white oak coals, roasted bone marrow butter, Maldon sea salt.',
        price: 68,
        category: 'Steaks',
        image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=400&q=80',
        popular: true,
      },
      {
        id: 'oe-2',
        name: 'Charred Spanish Octopus',
        desc: 'Smoked pimentón glaze, fingerling potato confit, pickled shallots, saffron aioli.',
        price: 22,
        category: 'Starters',
        image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80',
        popular: true,
      },
      {
        id: 'oe-3',
        name: 'Truffle Whipped Potatoes',
        desc: 'Yukon Gold potatoes, cultured French butter, fresh shaved black truffle.',
        price: 14,
        category: 'Sides',
        image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80',
      },
      {
        id: 'oe-4',
        name: 'Smoked Bourbon Old Fashioned',
        desc: 'Cask strength bourbon, demerara syrup, Angostura bitters, applewood smoke.',
        price: 18,
        category: 'Cocktails',
        image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&q=80',
      },
    ],
  },
];

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export const InteractiveSimulator: React.FC<InteractiveSimulatorProps> = ({
  onRequestMockup,
  onOpenInquiry,
}) => {
  const [selectedPreset, setSelectedPreset] = useState<RestaurantPreset>(PRESETS[0]);
  const [phoneTab, setPhoneTab] = useState<'menu' | 'reserve' | 'savings' | 'info'>('menu');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Reservation Form State
  const [resDate, setResDate] = useState('Today');
  const [resParty, setResParty] = useState('2 Guests');
  const [resTime, setResTime] = useState('7:00 PM');
  const [resConfirmed, setResConfirmed] = useState(false);

  // Savings Calculator Sliders
  const [calcOrders, setCalcOrders] = useState(400);
  const [calcTicket, setCalcTicket] = useState(48);

  const deliveryCostMonthly = Math.round(calcOrders * calcTicket * 0.3);
  const deliveryCostYearly = deliveryCostMonthly * 12;

  // Filtered menu items
  const filteredMenu = activeCategory === 'All'
    ? selectedPreset.menu
    : selectedPreset.menu.filter((i) => i.category === activeCategory);

  // Cart operations
  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) {
        return prev.map((c) =>
          c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
        );
      }
      return [...prev, { id: item.id, name: item.name, price: item.price, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((c) => {
          if (c.id === id) {
            const newQty = c.quantity + delta;
            return newQty > 0 ? { ...c, quantity: newQty } : null;
          }
          return c;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePresetChange = (preset: RestaurantPreset) => {
    setSelectedPreset(preset);
    setActiveCategory('All');
    setCart([]);
    setIsCartOpen(false);
    setOrderSuccess(false);
    setResConfirmed(false);
  };

  return (
    <section id="simulator" className="py-16 sm:py-24 text-stone-100 bg-stone-950/70 border-y border-stone-850 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-300 border border-amber-500/25">
            <Smartphone className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>Live Interactive Mobile Prototype</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-serif">
            Experience the Exact Website Diners Interact With
          </h2>

          <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
            Test the responsive mobile prototype Ridge Creative crafts for dining partners. Tap dishes to add to cart, toggle reservation times, and test the 0% commission direct checkout experience.
          </p>

          {/* Restaurant Concept Switcher Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {PRESETS.map((preset) => {
              const isSelected = selectedPreset.id === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => handlePresetChange(preset)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border ${
                    isSelected
                      ? 'bg-amber-400 text-stone-950 border-amber-300 shadow-md scale-105'
                      : 'bg-stone-900/90 text-stone-400 hover:text-white border-stone-800 hover:border-stone-700'
                  }`}
                >
                  <Utensils className={`w-3.5 h-3.5 ${isSelected ? 'text-stone-950' : 'text-amber-400'}`} />
                  <span>{preset.name}</span>
                  <span className={`text-[10px] hidden sm:inline ${isSelected ? 'text-stone-800' : 'text-stone-500'}`}>
                    ({preset.cuisine})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Prototype Showcase Viewport */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
          {/* Realistic iPhone 16 Pro Style Shell */}
          <div className="flex flex-col items-center shrink-0">
            <div className="w-[340px] sm:w-[380px] h-[720px] bg-stone-950 border-[9px] border-stone-800 rounded-[50px] shadow-2xl overflow-hidden relative flex flex-col ring-1 ring-stone-700/80">
              {/* Dynamic Island & Phone Status Bar */}
              <div className="h-9 bg-stone-950 px-6 flex items-center justify-between relative shrink-0 z-30 select-none border-b border-stone-900/50">
                <span className="text-[11px] font-bold text-stone-300">9:41</span>
                {/* Dynamic Island Pill */}
                <div className="w-24 h-4 bg-black rounded-full flex items-center justify-between px-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-800"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 animate-pulse"></span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-stone-300">
                  <span>5G</span>
                  <div className="w-4 h-2 border border-stone-300 rounded-[2px] p-[1px] flex items-center">
                    <div className="w-full h-full bg-stone-300 rounded-[1px]"></div>
                  </div>
                </div>
              </div>

              {/* Top Announcement Bar */}
              <div className="bg-amber-400 text-stone-950 text-[10px] font-bold px-3 py-1 text-center shrink-0 truncate">
                {selectedPreset.announcement}
              </div>

              {/* Restaurant Mobile Header */}
              <div className="bg-stone-900/90 backdrop-blur-md px-4 py-2.5 border-b border-stone-800 flex items-center justify-between shrink-0 z-20">
                <div>
                  <h4 className="font-serif font-bold text-white text-sm tracking-wide">
                    {selectedPreset.name}
                  </h4>
                  <div className="flex items-center gap-1 text-[10px] text-stone-400">
                    <MapPin className="w-2.5 h-2.5 text-amber-400" />
                    <span>{selectedPreset.location}</span>
                  </div>
                </div>

                {/* Cart Button with Count Pulse */}
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="relative p-2 rounded-xl bg-stone-800 hover:bg-stone-750 text-stone-200 cursor-pointer transition-colors"
                >
                  <ShoppingBag className="w-4 h-4 text-amber-400" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 text-stone-950 rounded-full text-[9px] font-extrabold flex items-center justify-center animate-pulse">
                      {cartCount}
                    </span>
                  )}
                </button>
              </div>

              {/* Restaurant Prototype Internal View Navigation */}
              <div className="bg-stone-950 px-2 py-1.5 border-b border-stone-800/80 flex items-center justify-around shrink-0 text-[11px] font-semibold text-stone-400">
                <button
                  onClick={() => { setPhoneTab('menu'); setOrderSuccess(false); }}
                  className={`py-1 px-2.5 rounded-lg transition-colors cursor-pointer ${
                    phoneTab === 'menu' ? 'bg-stone-850 text-amber-300 font-bold' : 'hover:text-white'
                  }`}
                >
                  Menu &amp; Order
                </button>
                <button
                  onClick={() => { setPhoneTab('reserve'); setResConfirmed(false); }}
                  className={`py-1 px-2.5 rounded-lg transition-colors cursor-pointer ${
                    phoneTab === 'reserve' ? 'bg-stone-850 text-amber-300 font-bold' : 'hover:text-white'
                  }`}
                >
                  Reserve Table
                </button>
                <button
                  onClick={() => setPhoneTab('savings')}
                  className={`py-1 px-2.5 rounded-lg transition-colors cursor-pointer ${
                    phoneTab === 'savings' ? 'bg-stone-850 text-amber-300 font-bold' : 'hover:text-white'
                  }`}
                >
                  Savings Calc
                </button>
                <button
                  onClick={() => setPhoneTab('info')}
                  className={`py-1 px-2.5 rounded-lg transition-colors cursor-pointer ${
                    phoneTab === 'info' ? 'bg-stone-850 text-amber-300 font-bold' : 'hover:text-white'
                  }`}
                >
                  About
                </button>
              </div>

              {/* Phone Content Scrollable Body */}
              <div className="flex-1 overflow-y-auto bg-stone-950 text-stone-200 relative pb-16">
                {/* 1. MENU TAB */}
                {phoneTab === 'menu' && (
                  <div className="p-3.5 space-y-4">
                    {/* Hero Banner */}
                    <div className="relative rounded-2xl overflow-hidden h-36 border border-stone-800">
                      <img
                        src={selectedPreset.coverImage}
                        alt={selectedPreset.name}
                        className="w-full h-full object-cover brightness-75"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent p-3 flex flex-col justify-end">
                        <span className="text-[10px] text-amber-300 font-bold tracking-widest uppercase">
                          Featured Special
                        </span>
                        <h5 className="font-serif font-bold text-white text-base leading-tight">
                          {selectedPreset.tagline}
                        </h5>
                      </div>
                    </div>

                    {/* Category Chips */}
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                      {selectedPreset.categories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setActiveCategory(cat)}
                          className={`px-3 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                            activeCategory === cat
                              ? 'bg-amber-400 text-stone-950 font-bold'
                              : 'bg-stone-900 text-stone-400 hover:text-white border border-stone-800'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>

                    {/* Menu Items List */}
                    <div className="space-y-2.5">
                      {filteredMenu.map((item) => {
                        const inCart = cart.find((c) => c.id === item.id);
                        return (
                          <div
                            key={item.id}
                            className="p-2.5 rounded-2xl bg-stone-900/80 border border-stone-800/80 hover:border-amber-500/30 transition-all flex items-center gap-3"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 rounded-xl object-cover shrink-0 border border-stone-800"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5">
                                <h6 className="font-bold text-xs text-white truncate">{item.name}</h6>
                                {item.popular && (
                                  <span className="text-[9px] font-bold text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded-full border border-amber-500/20">
                                    ★ Top
                                  </span>
                                )}
                              </div>
                              <p className="text-[10px] text-stone-400 line-clamp-2 mt-0.5 leading-tight">
                                {item.desc}
                              </p>
                              <div className="flex items-center justify-between mt-1.5">
                                <span className="font-serif font-bold text-amber-300 text-xs">
                                  ${item.price.toFixed(2)}
                                </span>

                                <button
                                  onClick={() => addToCart(item)}
                                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                                    inCart
                                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                      : 'bg-amber-400 hover:bg-amber-300 text-stone-950'
                                  }`}
                                >
                                  {inCart ? (
                                    <>
                                      <Check className="w-3 h-3" />
                                      <span>({inCart.quantity})</span>
                                    </>
                                  ) : (
                                    <>
                                      <Plus className="w-3 h-3" />
                                      <span>Add</span>
                                    </>
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 2. RESERVATIONS TAB */}
                {phoneTab === 'reserve' && (
                  <div className="p-4 space-y-4">
                    <div className="text-center space-y-1">
                      <h5 className="font-serif font-bold text-white text-base">Book a Table</h5>
                      <p className="text-[11px] text-stone-400">
                        Zero cover charge. Instant confirmation straight to host stand.
                      </p>
                    </div>

                    {resConfirmed ? (
                      <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
                        <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                        <h6 className="font-bold text-white text-sm">Table Reserved!</h6>
                        <p className="text-xs text-stone-300">
                          {resDate} at {resTime} for {resParty}. Confirmation text sent to your phone.
                        </p>
                        <button
                          onClick={() => setResConfirmed(false)}
                          className="mt-2 text-[11px] text-amber-300 underline font-semibold cursor-pointer"
                        >
                          Change Reservation
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-3 text-xs">
                        {/* Day selection */}
                        <div>
                          <label className="block text-[11px] font-bold text-stone-400 mb-1.5">Select Day</label>
                          <div className="grid grid-cols-4 gap-1.5">
                            {['Today', 'Tomorrow', 'Friday', 'Saturday'].map((d) => (
                              <button
                                key={d}
                                onClick={() => setResDate(d)}
                                className={`py-1.5 rounded-lg text-center font-bold text-[11px] border transition-colors cursor-pointer ${
                                  resDate === d
                                    ? 'bg-amber-400 text-stone-950 border-amber-300'
                                    : 'bg-stone-900 text-stone-300 border-stone-800'
                                }`}
                              >
                                {d}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Party size selection */}
                        <div>
                          <label className="block text-[11px] font-bold text-stone-400 mb-1.5">Guests</label>
                          <div className="grid grid-cols-4 gap-1.5">
                            {['1 Guest', '2 Guests', '4 Guests', '6+ Guests'].map((p) => (
                              <button
                                key={p}
                                onClick={() => setResParty(p)}
                                className={`py-1.5 rounded-lg text-center font-bold text-[11px] border transition-colors cursor-pointer ${
                                  resParty === p
                                    ? 'bg-amber-400 text-stone-950 border-amber-300'
                                    : 'bg-stone-900 text-stone-300 border-stone-800'
                                }`}
                              >
                                {p}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Time slots */}
                        <div>
                          <label className="block text-[11px] font-bold text-stone-400 mb-1.5">Seating Time</label>
                          <div className="grid grid-cols-3 gap-1.5">
                            {['5:30 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:15 PM', '9:00 PM'].map((t) => (
                              <button
                                key={t}
                                onClick={() => setResTime(t)}
                                className={`py-1.5 rounded-lg text-center font-bold text-[11px] border transition-colors cursor-pointer ${
                                  resTime === t
                                    ? 'bg-amber-400 text-stone-950 border-amber-300'
                                    : 'bg-stone-900 text-stone-300 border-stone-800'
                                }`}
                              >
                                {t}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Confirm button */}
                        <button
                          onClick={() => setResConfirmed(true)}
                          className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold rounded-xl text-xs transition-colors cursor-pointer mt-2"
                        >
                          Confirm Reservation ({resDate} @ {resTime})
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* 3. SAVINGS CALCULATOR TAB */}
                {phoneTab === 'savings' && (
                  <div className="p-4 space-y-4">
                    <div className="text-center space-y-1">
                      <h5 className="font-serif font-bold text-white text-base">Delivery App Fee Calculator</h5>
                      <p className="text-[10px] text-stone-400">
                        See how much DoorDash &amp; UberEats siphon from your kitchen margin.
                      </p>
                    </div>

                    <div className="p-3 rounded-2xl bg-stone-900 border border-stone-800 space-y-3 text-xs">
                      <div>
                        <div className="flex justify-between font-bold text-[11px] mb-1">
                          <span className="text-stone-400">Monthly Orders:</span>
                          <span className="text-amber-400">{calcOrders} orders</span>
                        </div>
                        <input
                          type="range"
                          min="100"
                          max="1200"
                          step="50"
                          value={calcOrders}
                          onChange={(e) => setCalcOrders(Number(e.target.value))}
                          className="w-full accent-amber-400 cursor-pointer"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between font-bold text-[11px] mb-1">
                          <span className="text-stone-400">Avg Ticket Size:</span>
                          <span className="text-amber-400">${calcTicket}</span>
                        </div>
                        <input
                          type="range"
                          min="20"
                          max="100"
                          step="2"
                          value={calcTicket}
                          onChange={(e) => setCalcTicket(Number(e.target.value))}
                          className="w-full accent-amber-400 cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* Results Card */}
                    <div className="p-3.5 rounded-2xl bg-stone-900/90 border border-amber-500/30 space-y-2 text-center">
                      <span className="text-[10px] text-stone-400 uppercase tracking-wider font-bold">
                        Lost to 3rd-Party Delivery Apps (30%)
                      </span>
                      <div className="font-serif text-2xl font-extrabold text-rose-400">
                        -${deliveryCostMonthly.toLocaleString()}/mo
                      </div>
                      <div className="text-[11px] text-stone-300">
                        That is <strong className="text-amber-300 font-serif">${deliveryCostYearly.toLocaleString()}</strong> every year given away in commissions.
                      </div>
                      <div className="pt-1 text-[10px] text-emerald-400 font-bold">
                        ✓ Ridge Creative Direct Ordering: $0 commission
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. ABOUT TAB */}
                {phoneTab === 'info' && (
                  <div className="p-4 space-y-3.5 text-xs">
                    <div className="p-3 rounded-2xl bg-stone-900 border border-stone-800 space-y-2">
                      <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                        <Star className="w-4 h-4 fill-amber-400" />
                        <span>{selectedPreset.rating} Rating ({selectedPreset.reviewsCount} Google Reviews)</span>
                      </div>
                      <p className="text-[11px] text-stone-300 leading-relaxed">
                        "Every detail from the wine pairings to the warm crusty pizza is flawless. Seamless direct online ordering right from the phone."
                      </p>
                    </div>

                    <div className="space-y-2 text-[11px] text-stone-400">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{selectedPreset.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{selectedPreset.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>Tue - Sun: 11:30 AM - 10:30 PM</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Sticky Bottom Cart Bar inside Phone */}
              {cartCount > 0 && !isCartOpen && (
                <div className="absolute bottom-4 left-3 right-3 z-30">
                  <button
                    onClick={() => setIsCartOpen(true)}
                    className="w-full py-2.5 px-4 bg-amber-400 hover:bg-amber-300 text-stone-950 rounded-2xl shadow-xl font-bold text-xs flex items-center justify-between transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 bg-stone-950 text-amber-400 rounded-full flex items-center justify-center text-[10px] font-extrabold">
                        {cartCount}
                      </span>
                      <span>View Direct Order</span>
                    </div>
                    <span className="font-serif font-extrabold">${cartSubtotal.toFixed(2)} →</span>
                  </button>
                </div>
              )}

              {/* Slide-Up Cart Drawer inside Phone */}
              {isCartOpen && (
                <div className="absolute inset-0 bg-stone-950/95 z-40 p-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-stone-800">
                      <div className="flex items-center gap-2">
                        <ShoppingBag className="w-4 h-4 text-amber-400" />
                        <h5 className="font-serif font-bold text-white text-sm">Your Direct Order</h5>
                      </div>
                      <button
                        onClick={() => setIsCartOpen(false)}
                        className="p-1 rounded-lg bg-stone-900 text-stone-400 hover:text-white cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {orderSuccess ? (
                      <div className="py-8 text-center space-y-3">
                        <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                        <h6 className="font-bold text-white text-base">Order Sent to Kitchen!</h6>
                        <p className="text-xs text-stone-400">
                          Direct ticket printed without DoorDash taking 30%. Ready for pickup in 25 mins.
                        </p>
                        <button
                          onClick={() => {
                            setCart([]);
                            setIsCartOpen(false);
                            setOrderSuccess(false);
                          }}
                          className="px-4 py-2 bg-amber-400 text-stone-950 rounded-xl text-xs font-bold cursor-pointer"
                        >
                          Back to Menu
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                        {cart.map((item) => (
                          <div
                            key={item.id}
                            className="p-2 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-between text-xs"
                          >
                            <div className="min-w-0 flex-1 pr-2">
                              <h6 className="font-bold text-white truncate text-[11px]">{item.name}</h6>
                              <span className="text-amber-400 font-serif font-bold text-[11px]">
                                ${(item.price * item.quantity).toFixed(2)}
                              </span>
                            </div>

                            <div className="flex items-center gap-1.5 shrink-0">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="w-6 h-6 rounded-lg bg-stone-800 hover:bg-stone-700 flex items-center justify-center text-stone-300 cursor-pointer"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-4 text-center font-bold text-xs">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="w-6 h-6 rounded-lg bg-stone-800 hover:bg-stone-700 flex items-center justify-center text-stone-300 cursor-pointer"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {!orderSuccess && (
                    <div className="pt-3 border-t border-stone-800 space-y-2 text-xs">
                      <div className="flex justify-between text-stone-400 text-[11px]">
                        <span>Platform Commission Fee:</span>
                        <span className="text-emerald-400 font-bold">$0.00 (Direct)</span>
                      </div>
                      <div className="flex justify-between text-white font-bold text-sm">
                        <span>Subtotal:</span>
                        <span className="font-serif text-amber-300">${cartSubtotal.toFixed(2)}</span>
                      </div>
                      <button
                        onClick={() => setOrderSuccess(true)}
                        className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold rounded-xl text-xs transition-colors cursor-pointer"
                      >
                        Send Direct Pickup Order (0% Fee)
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* iPhone Bottom Home Indicator Bar */}
              <div className="h-4 bg-stone-950 flex items-center justify-center shrink-0 z-30">
                <div className="w-28 h-1 bg-stone-600 rounded-full"></div>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-2 text-[11px] text-stone-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Fully functional interactive prototype. Try tapping items to add to cart!</span>
            </div>
          </div>

          {/* Guided Capabilities Sidebar */}
          <div className="space-y-6 max-w-md">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Full-Stack Architecture
              </span>
              <h3 className="text-2xl font-bold font-serif text-white mt-1">
                Engineered to turn hungry scrollers into paying regulars.
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 mt-2 leading-relaxed">
                Notice how fast the prototype responds. No bloated WordPress plugins, no unreadable PDF menus, and no third-party delivery popups eating 30% of your ticket.
              </p>
            </div>

            <div className="space-y-3 text-xs text-stone-300">
              {/* Feature 1 */}
              <div className="p-3.5 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-1">
                <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                  <ShoppingBag className="w-4 h-4 text-amber-400" />
                  <span>Real Direct Cart &amp; 0% Fee Pickup</span>
                </div>
                <p className="text-stone-400 text-[11px] leading-relaxed">
                  Tap <strong>"+ Add"</strong> on any menu item in the phone above. The slide-over cart updates instantly with your subtotal and pipes right into the direct pickup order flow.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="p-3.5 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-1">
                <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                  <Percent className="w-4 h-4 text-amber-400" />
                  <span>Integrated Delivery App Savings Calculator</span>
                </div>
                <p className="text-stone-400 text-[11px] leading-relaxed">
                  Tap <strong>"Savings Calc"</strong> inside the phone to test the delivery fee calculator. Restaurant owners immediately see thousands saved every year when ordering directly.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="p-3.5 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-1">
                <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>Frictionless Floor-Plan Table Reservations</span>
                </div>
                <p className="text-stone-400 text-[11px] leading-relaxed">
                  Tap <strong>"Reserve Table"</strong> in the phone. Diners can request reservations with date, time, and party size in seconds without paying OpenTable $1.50 per seated cover.
                </p>
              </div>
            </div>

            {/* Direct CTA Box */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 to-stone-900 border border-amber-500/30 space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-white">Want this exact prototype for your restaurant?</span>
              </div>
              <p className="text-[11px] text-stone-300">
                Send us your Instagram handle. We'll generate a custom mobile prototype with your actual menu items, branding, and photos completely free.
              </p>
              <div className="flex items-center gap-3">
                {onRequestMockup && (
                  <button
                    onClick={() => onRequestMockup()}
                    className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Request Free Custom Mockup</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
                {onOpenInquiry && (
                  <button
                    onClick={() => onOpenInquiry('pilot')}
                    className="text-xs text-amber-300 hover:text-amber-200 underline font-semibold cursor-pointer"
                  >
                    Claim $0 Setup Spot
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
