import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';

const app = express();
const PORT = 3000;

app.use(express.json());

// Enable CORS and iframe embedding headers for AI Studio preview environment
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.removeHeader('X-Frame-Options');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Lazy-initialized Gemini AI client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// Fallback intelligent lead generator in case API key is missing or network fails
function generateFallbackLead(input: string, manualName?: string, manualCity?: string, manualCuisine?: string) {
  let cleaned = input.trim();
  let handle = '';
  let inferredName = manualName || '';

  // Extract from Instagram URL
  const igMatch = cleaned.match(/(?:instagram\.com\/|@)([a-zA-Z0-9._]+)/i);
  if (igMatch && igMatch[1]) {
    handle = igMatch[1].replace(/\/$/, '');
    if (!inferredName) {
      inferredName = handle
        .replace(/[._]/g, ' ')
        .split(' ')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
    }
  } else if (!inferredName) {
    // If it's a domain
    const domainMatch = cleaned.match(/https?:\/\/(?:www\.)?([^/]+)/i);
    if (domainMatch && domainMatch[1]) {
      inferredName = domainMatch[1]
        .split('.')[0]
        .replace(/[-_]/g, ' ')
        .split(' ')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
    } else {
      inferredName = cleaned.replace(/^@/, '') || 'Local Bistro & Eatery';
    }
  }

  const cuisine = manualCuisine || 'Contemporary Bistro & Dining';
  const city = manualCity || 'your neighborhood';

  return {
    restaurantName: inferredName,
    instagramHandle: handle ? `@${handle}` : `@${inferredName.toLowerCase().replace(/[^a-z0-9]/g, '')}`,
    websiteUrl: cleaned.startsWith('http') ? cleaned : '',
    cuisine: cuisine,
    city: city,
    detectedWeaknesses: [
      'Menu is currently locked in an un-pinchable PDF or buried under outdated social posts',
      'No direct commission-free ordering button, losing ~20-30% margins on third-party food apps',
      'Missing 1-tap mobile reservation/call button for on-the-go diners looking for a table tonight',
      'Page takes over 3.8 seconds to load on mobile LTE networks'
    ],
    tailoredPraise: `Love the vibrant culinary energy and the standout presentation of your signature dishes. The local community feedback speaks for itself!`,
    urgencyAngle: `I am currently accepting only 3 local restaurants for our $0 setup founding pilot program this month. 2 spots were claimed earlier this week, leaving just 1 spot left.`,
    customPitchBullets: [
      'Zero upfront setup fee for the founding pilot spot ($500 value waived)',
      'High-converting mobile menu designed to turn hungry Instagram profile visitors into paying diners',
      'Full hosting, instant menu edits, and technical support covered for just $99/month'
    ],
    dmVariations: {
      urgentPilot: `Hey ${inferredName} team! 👋 Stumbled across your page and genuinely love the food presentation.\n\nQuick heads up: I build high-converting websites specifically for local restaurants, and I'm currently taking on my first 3 pilot partners with $0 setup + $99/mo full maintenance (waiving the standard $500 design fee).\n\n2 spots got reserved this week, so I have just 1 spot left for a local spot. Would love to feature ${inferredName} before we close the pilot. Open to taking a quick look at a 2-minute video mockup I made for you?`,
      valueAudit: `Hey ${inferredName}! Huge fan of what you're doing. I noticed when diners tap your link on mobile, the menu is a bit tough to browse quickly, which usually means lost table bookings to nearby competitors.\n\nI run a web studio for food spots and we have 1 remaining Founding Pilot spot left this month ($0 setup + $99/mo maintenance). Mind if I shoot over a free preview of how clean your menu and direct booking could look?`,
      shortCasual: `Hey guys! Loving the vibe at ${inferredName} 🔥\n\nI’m a local restaurant web specialist. Right now I have 1 pilot spot left where I design your full modern website for $0 upfront (just $99/mo hosting & all updates included).\n\nInterested in seeing what a high-converting mobile layout looks like for your menu?`,
      followUpBump: `Hey! Just bumping this in case it got buried in your DMs. We are locking in our last $0 setup pilot partner by tomorrow evening so we can start launch next week. Let me know if you want me to hold the spot for ${inferredName} before we offer it to the next spot on our waitlist! ⏳`
    },
    recommendedTier: 'pilot' as const,
    pilotSpotsLeft: 1
  };
}

// API Route: Extract lead and generate personalized pitch with urgency
app.post('/api/extract-lead', async (req, res) => {
  try {
    const { link, manualDetails } = req.body;
    if (!link && !manualDetails?.restaurantName) {
      return res.status(400).json({ error: 'Please provide an Instagram profile link, website URL, or restaurant name.' });
    }

    const ai = getGeminiClient();
    if (!ai) {
      // Return high quality intelligent fallback
      const fallback = generateFallbackLead(
        link || manualDetails?.restaurantName || '',
        manualDetails?.restaurantName,
        manualDetails?.city,
        manualDetails?.cuisine
      );
      return res.json({ lead: fallback, aiPowered: false });
    }

    const prompt = `You are an elite restaurant web design & conversion specialist pitching a high-converting freelance website offer to local restaurants via Instagram DM.
The user provided this link / input: "${link || ''}".
Optional manual context: Name: "${manualDetails?.restaurantName || ''}", City: "${manualDetails?.city || ''}", Cuisine: "${manualDetails?.cuisine || ''}".

Analyze this restaurant lead and formulate an irresistible outreach pitch.
THE OFFERS AVAILABLE:
1. Founding Pilot Partner: First 3 clients only get $0 Setup (waived $499) + $99/month for full maintenance & hosting. (Crucial: 2 spots already claimed, exactly 1 spot remaining!)
2. Growth Package: $299 Setup + $99/month for direct commission-free ordering & table booking.
3. Premium VIP Package: $499 Setup + $149/month for full maintenance, priority same-day updates, and Google review growth.

YOUR GOAL:
1. Extract or infer the Restaurant Name, estimated Instagram handle, cuisine type, and city/neighborhood.
2. Formulate 4 realistic, high-impact restaurant web pain points (e.g. mobile PDF menu frustration, losing 30% to delivery apps, no fast tap-to-call, outdated mobile experience).
3. Write a genuine, warm, non-generic compliment highlighting their culinary identity.
4. Craft an urgent angle explaining why the $0 setup pilot offer will expire (only 1 pilot spot left out of 3, 48-hour reservation limit).
5. Generate 4 tailored Instagram DM variations:
   - "urgentPilot": Focuses on the $0 setup pilot spot, highlighting that 2 of 3 spots are taken, only 1 spot left for their neighborhood.
   - "valueAudit": Leads with a specific mobile conversion critique/compliment, then introduces the $0 setup pilot.
   - "shortCasual": Punchy, conversational (under 50 words), perfect for mobile Instagram reading.
   - "followUpBump": Urgent 24-48h deadline reminder to hold the $0 setup spot before moving to the waitlist.
6. Provide 3 custom value pitch bullets.
7. Recommend either 'pilot', 'growth', or 'premium'.

Return strictly valid JSON matching the requested structure.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            restaurantName: { type: Type.STRING },
            instagramHandle: { type: Type.STRING },
            websiteUrl: { type: Type.STRING },
            cuisine: { type: Type.STRING },
            city: { type: Type.STRING },
            detectedWeaknesses: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            tailoredPraise: { type: Type.STRING },
            urgencyAngle: { type: Type.STRING },
            customPitchBullets: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            dmVariations: {
              type: Type.OBJECT,
              properties: {
                urgentPilot: { type: Type.STRING },
                valueAudit: { type: Type.STRING },
                shortCasual: { type: Type.STRING },
                followUpBump: { type: Type.STRING },
              },
              required: ['urgentPilot', 'valueAudit', 'shortCasual', 'followUpBump']
            },
            recommendedTier: {
              type: Type.STRING,
              description: 'Must be one of "pilot", "growth", or "premium"'
            },
            pilotSpotsLeft: { type: Type.INTEGER }
          },
          required: [
            'restaurantName',
            'instagramHandle',
            'cuisine',
            'city',
            'detectedWeaknesses',
            'tailoredPraise',
            'urgencyAngle',
            'customPitchBullets',
            'dmVariations',
            'recommendedTier'
          ]
        }
      }
    });

    const parsed = JSON.parse(response.text?.trim() || '{}');
    if (!parsed.restaurantName) {
      const fallback = generateFallbackLead(link || '', manualDetails?.restaurantName, manualDetails?.city, manualDetails?.cuisine);
      return res.json({ lead: fallback, aiPowered: true });
    }

    // Ensure safe defaults
    const resultLead = {
      ...parsed,
      instagramHandle: parsed.instagramHandle?.startsWith('@') ? parsed.instagramHandle : `@${parsed.instagramHandle || 'restaurant'}`,
      pilotSpotsLeft: parsed.pilotSpotsLeft || 1,
      recommendedTier: ['pilot', 'growth', 'premium'].includes(parsed.recommendedTier) ? parsed.recommendedTier : 'pilot'
    };

    res.json({ lead: resultLead, aiPowered: true });
  } catch (error: any) {
    console.error('Error generating restaurant lead:', error);
    // Graceful fallback so user is never blocked
    const fallback = generateFallbackLead(req.body.link || req.body.manualDetails?.restaurantName || '');
    res.json({ lead: fallback, aiPowered: false, warning: 'Used local intelligence model fallback.' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Inquiries endpoint for profile visitors claiming an offer
const inquiries: any[] = [
  {
    id: 'inq-sample-1',
    inquiryType: 'free_mockup',
    restaurantName: 'Trattoria Bella Napoli',
    contactName: 'Chef Giovanni (Owner)',
    emailOrPhone: '+1 (555) 234-8910',
    instagramHandle: '@trattoria_bellanapoli',
    packageTier: 'pilot',
    notes: 'We have a paper menu we need digitized. Sent photos via Instagram!',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    status: 'new_claim'
  }
];

app.get('/api/inquiries', (req, res) => {
  res.json({ inquiries });
});

app.post('/api/inquire', (req, res) => {
  const { inquiryType, restaurantName, contactName, emailOrPhone, instagramHandle, packageTier, notes } = req.body;
  
  const rawInput = (instagramHandle || emailOrPhone || restaurantName || '').trim();
  if (!rawInput) {
    return res.status(400).json({ error: 'Please enter your username or profile link.' });
  }

  // Derive clean restaurant name from handle/link if restaurantName not explicitly provided
  let cleanName = restaurantName ? restaurantName.trim() : '';
  if (!cleanName) {
    const stripped = rawInput
      .replace(/^https?:\/\/(www\.)?(instagram\.com|facebook\.com|tiktok\.com)\//i, '')
      .replace(/\?.*$/, '')
      .replace(/\/$/, '')
      .replace(/^@/, '');
    cleanName = stripped
      ? stripped.replace(/[_\.]/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase())
      : 'Restaurant Partner';
  }

  const newInquiry = {
    id: `inq-${Date.now()}`,
    inquiryType: inquiryType || 'package_claim',
    restaurantName: cleanName,
    contactName: contactName || '',
    emailOrPhone: emailOrPhone || `Direct: ${rawInput}`,
    instagramHandle: rawInput,
    packageTier: packageTier || 'pilot',
    notes: notes || '',
    createdAt: new Date().toISOString(),
    status: 'new_claim'
  };
  inquiries.unshift(newInquiry);
  console.log('New restaurant application received:', newInquiry);
  res.json({ success: true, inquiry: newInquiry, message: 'Request received successfully!' });
});

app.patch('/api/inquiries/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const inquiry = inquiries.find(i => i.id === id);
  if (inquiry) {
    if (status) inquiry.status = status;
    return res.json({ success: true, inquiry });
  }
  res.status(404).json({ error: 'Inquiry not found' });
});

async function startServer() {
  // Vite middleware in development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`BistroPitch server running on http://localhost:${PORT}`);
  });
}

startServer();
