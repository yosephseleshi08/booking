export type LeadPlatform = 'instagram' | 'facebook' | 'tiktok' | 'google_maps' | 'website' | 'other';

export interface ParsedProfile {
  rawInput: string;
  cleanHandle: string;
  directUrl: string;
  restaurantName: string;
  isUrl: boolean;
  platform: LeadPlatform;
  platformLabel: string;
}

export function parseProfileInput(input: unknown, hintPlatform?: LeadPlatform): ParsedProfile {
  const str = typeof input === 'string' ? input : '';
  const trimmed = str.trim();
  if (!trimmed) {
    return {
      rawInput: '',
      cleanHandle: '',
      directUrl: '',
      restaurantName: 'Restaurant Partner',
      isUrl: false,
      platform: hintPlatform || 'instagram',
      platformLabel: getPlatformLabel(hintPlatform || 'instagram'),
    };
  }

  // Detect platform by URL pattern
  const isGoogleMaps = /(?:maps\.google\.com|google\.com\/maps|goo\.gl\/maps|maps\.app\.goo\.gl)/i.test(trimmed);
  const isFacebook = /(?:facebook\.com|fb\.com|fb\.me)/i.test(trimmed);
  const isTikTok = /(?:tiktok\.com)/i.test(trimmed);
  const isInstagram = /(?:instagram\.com)/i.test(trimmed) || (trimmed.startsWith('@') && hintPlatform === 'instagram');
  const isGeneralUrl = /^https?:\/\//i.test(trimmed) || /^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}/i.test(trimmed);

  // 1. Google Maps
  if (isGoogleMaps || hintPlatform === 'google_maps') {
    const fullUrl = trimmed.startsWith('http') ? trimmed : `https://${trimmed}`;
    let nameGuess = '';
    
    // Try extract place name from google maps url like /place/Luigi's+Pizzeria/...
    const placeMatch = trimmed.match(/\/place\/([^/@?]+)/i);
    if (placeMatch && placeMatch[1]) {
      nameGuess = decodeURIComponent(placeMatch[1].replace(/\+/g, ' ')).split(',')[0].trim();
    } else if (!isGoogleMaps && !trimmed.startsWith('http')) {
      // User entered restaurant name on Google Maps
      nameGuess = trimmed;
    } else {
      nameGuess = 'Restaurant Partner';
    }

    return {
      rawInput: trimmed,
      cleanHandle: nameGuess ? `Maps: ${nameGuess}` : trimmed.slice(0, 35),
      directUrl: trimmed.startsWith('http') ? trimmed : fullUrl,
      restaurantName: formatName(nameGuess) || 'Restaurant Partner',
      isUrl: true,
      platform: 'google_maps',
      platformLabel: 'Google Maps',
    };
  }

  // 2. Facebook
  if (isFacebook || hintPlatform === 'facebook') {
    const fullUrl = trimmed.startsWith('http') ? trimmed : `https://${trimmed}`;
    const fbMatch = trimmed.match(/(?:facebook\.com|fb\.com|fb\.me)\/([a-zA-Z0-9._-]+)/i);
    const slug = fbMatch && fbMatch[1] ? fbMatch[1].replace(/\/$/, '') : trimmed.replace(/^@/, '');
    const cleanName = slug
      .replace(/[._-]+/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());

    return {
      rawInput: trimmed,
      cleanHandle: slug ? `fb.com/${slug}` : trimmed,
      directUrl: fullUrl,
      restaurantName: cleanName || 'Restaurant Partner',
      isUrl: true,
      platform: 'facebook',
      platformLabel: 'Facebook',
    };
  }

  // 3. TikTok
  if (isTikTok || (trimmed.startsWith('@') && hintPlatform === 'tiktok')) {
    const ttMatch = trimmed.match(/tiktok\.com\/@?([a-zA-Z0-9._-]+)/i);
    const username = ttMatch && ttMatch[1] ? ttMatch[1].replace(/\/$/, '') : trimmed.replace(/^@/, '');
    const formattedName = username
      .replace(/[._]+/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());

    return {
      rawInput: trimmed,
      cleanHandle: `@${username}`,
      directUrl: `https://www.tiktok.com/@${username}`,
      restaurantName: formattedName || 'Restaurant Partner',
      isUrl: true,
      platform: 'tiktok',
      platformLabel: 'TikTok',
    };
  }

  // 4. Instagram
  if (isInstagram || (trimmed.startsWith('@') && (!hintPlatform || hintPlatform === 'instagram'))) {
    const igMatch = trimmed.match(/instagram\.com\/([a-zA-Z0-9_\.]+)/i);
    const username = igMatch && igMatch[1] ? igMatch[1].replace(/\/$/, '') : trimmed.replace(/^@/, '');
    const formattedName = username
      .replace(/[_\.]+/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());

    return {
      rawInput: trimmed,
      cleanHandle: `@${username}`,
      directUrl: `https://instagram.com/${username}`,
      restaurantName: formattedName || 'Restaurant Partner',
      isUrl: true,
      platform: 'instagram',
      platformLabel: 'Instagram',
    };
  }

  // 5. General Website URL
  if (isGeneralUrl) {
    const fullUrl = trimmed.startsWith('http') ? trimmed : `https://${trimmed}`;
    const nameGuess = trimmed
      .replace(/^https?:\/\/(www\.)?/, '')
      .split('/')[0]
      .split('?')[0]
      .replace(/\.[a-zA-Z]{2,}$/, '')
      .replace(/[_\.\-]+/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());

    return {
      rawInput: trimmed,
      cleanHandle: trimmed.length > 30 ? trimmed.slice(0, 30) + '...' : trimmed,
      directUrl: fullUrl,
      restaurantName: nameGuess || 'Restaurant Partner',
      isUrl: true,
      platform: 'website',
      platformLabel: 'Website',
    };
  }

  // 6. Plain Handle or Name
  const cleanStr = trimmed.replace(/^@+/, '');
  const detectedPlatform = hintPlatform || 'other';
  return {
    rawInput: trimmed,
    cleanHandle: detectedPlatform === 'instagram' || detectedPlatform === 'tiktok' ? `@${cleanStr}` : trimmed,
    directUrl: detectedPlatform === 'instagram' ? `https://instagram.com/${cleanStr}` : '',
    restaurantName: formatName(cleanStr) || 'Restaurant Partner',
    isUrl: false,
    platform: detectedPlatform,
    platformLabel: getPlatformLabel(detectedPlatform),
  };
}

function formatName(str: string): string {
  if (!str) return '';
  return str
    .replace(/[._-]+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function getPlatformLabel(platform: LeadPlatform): string {
  switch (platform) {
    case 'instagram':
      return 'Instagram';
    case 'facebook':
      return 'Facebook';
    case 'tiktok':
      return 'TikTok';
    case 'google_maps':
      return 'Google Maps';
    case 'website':
      return 'Website';
    default:
      return 'Restaurant';
  }
}
