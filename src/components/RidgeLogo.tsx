import React from 'react';

interface RidgeLogoProps {
  variant?: 'mark' | 'full' | 'horizontal';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const RidgeLogo: React.FC<RidgeLogoProps> = ({
  variant = 'horizontal',
  className = '',
  size = 'md',
}) => {
  // Pure vector Mountain Crest Emblem exactly matching the Ridge Creative brand asset
  const renderCrest = (crestClass = 'w-9 h-9') => (
    <svg
      viewBox="0 0 160 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${crestClass} shrink-0 drop-shadow-[0_2px_8px_rgba(245,158,11,0.25)]`}
    >
      <defs>
        <linearGradient id="crestGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="30%" stopColor="#F59E0B" />
          <stop offset="65%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#92400E" />
        </linearGradient>
        <linearGradient id="crestFacetShadow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#09090b" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#18181b" stopOpacity="0.95" />
        </linearGradient>
      </defs>

      {/* Main Gold Mountain Shield Silhouette */}
      <path
        d="M 16 110 L 16 68 L 44 38 L 56 48 L 80 12 L 102 38 L 118 24 L 144 68 L 144 110 Z"
        fill="url(#crestGoldGrad)"
      />

      {/* Primary Geometric Chasm / Ridge Facet Cuts */}
      <path
        d="M 80 16 L 73 54 L 59 78 L 70 73 L 53 102 L 46 102 L 64 68 L 52 73 L 72 38 Z"
        fill="url(#crestFacetShadow)"
      />
      <path
        d="M 102 42 L 91 66 L 83 82 L 91 78 L 77 104 L 70 104 L 84 73 L 77 76 L 94 50 Z"
        fill="url(#crestFacetShadow)"
      />
      <path
        d="M 118 28 L 112 48 L 106 60 L 112 56 L 100 80 L 94 80 L 104 56 L 98 58 L 110 40 Z"
        fill="url(#crestFacetShadow)"
      />
    </svg>
  );

  if (variant === 'mark') {
    const sizeMap = {
      sm: 'w-7 h-7',
      md: 'w-9 h-9',
      lg: 'w-12 h-12',
      xl: 'w-16 h-16',
    };
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        {renderCrest(sizeMap[size])}
      </div>
    );
  }

  if (variant === 'full') {
    return (
      <div className={`inline-flex flex-col items-center text-center ${className}`}>
        {renderCrest('w-16 h-16 sm:w-20 sm:h-20')}
        <span className="mt-2 text-lg sm:text-xl font-extrabold tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-300 font-sans uppercase">
          Ridge Creative
        </span>
        <span className="text-[10px] sm:text-xs font-semibold tracking-[0.35em] text-amber-400/90 uppercase mt-0.5">
          Web Studio
        </span>
      </div>
    );
  }

  // variant === 'horizontal'
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {renderCrest(size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-11 h-11' : 'w-9 h-9')}
      <div className="flex flex-col text-left leading-tight">
        <span className="text-base sm:text-lg font-extrabold tracking-[0.15em] text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-amber-400 font-sans uppercase">
          Ridge Creative
        </span>
        <span className="text-[9px] sm:text-[10px] font-semibold tracking-[0.25em] text-amber-400/80 uppercase">
          Web Studio
        </span>
      </div>
    </div>
  );
};
