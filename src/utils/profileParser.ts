export interface ParsedProfile {
  rawInput: string;
  cleanHandle: string;
  directUrl: string;
  restaurantName: string;
  isUrl: boolean;
}

export function parseProfileInput(input: unknown): ParsedProfile {
  const str = typeof input === 'string' ? input : '';
  const trimmed = str.trim();
  if (!trimmed) {
    return {
      rawInput: '',
      cleanHandle: '',
      directUrl: '',
      restaurantName: 'Restaurant Partner',
      isUrl: false,
    };
  }

  // Check if it's an Instagram URL
  const isIgUrl = /^(https?:\/\/)?(www\.)?instagram\.com\//i.test(trimmed);
  // Check if general URL
  const isGeneralUrl = /^https?:\/\//i.test(trimmed) || /^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}/i.test(trimmed);

  if (isIgUrl) {
    const match = trimmed.match(/instagram\.com\/([a-zA-Z0-9_\.]+)/i);
    const username = match && match[1] ? match[1].replace(/\/$/, '') : '';
    if (username) {
      const formattedName = username
        .replace(/[_\.]+/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());
      return {
        rawInput: trimmed,
        cleanHandle: `@${username}`,
        directUrl: `https://instagram.com/${username}`,
        restaurantName: formattedName || 'Restaurant Partner',
        isUrl: true,
      };
    }
  }

  if (isGeneralUrl && !trimmed.startsWith('@')) {
    const fullUrl = trimmed.startsWith('http') ? trimmed : `https://${trimmed}`;
    let nameGuess = trimmed
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
    };
  }

  const username = trimmed.replace(/^@+/, '').replace(/\s+/g, '_');
  const formattedName = username
    .replace(/[_\.]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return {
    rawInput: trimmed,
    cleanHandle: `@${username}`,
    directUrl: `https://instagram.com/${username}`,
    restaurantName: formattedName || 'Restaurant Partner',
    isUrl: false,
  };
}
