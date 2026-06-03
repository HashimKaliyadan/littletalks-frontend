import type React from 'react';

interface PartnerLogoProps {
  logoKey: string;
  className?: string;
}

export default function PartnerLogo({ logoKey, className = '' }: PartnerLogoProps) {
  const key = logoKey.toLowerCase();

  const logos: Record<string, React.ReactElement> = {
    interscience: (
      <div className={`partner-logo logo-interscience ${className}`}>
        <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="20" cy="20" r="18" stroke="#81D742" strokeWidth="2" fill="rgba(129, 215, 66, 0.05)"/>
          <path d="M15 12H25M17 12V18L13 25C12.5 25.8 13.1 27 14 27H26C26.9 27 27.5 25.8 27 25L23 18V12" stroke="#81D742" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 22H24" stroke="#81D742" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <div className="partner-logo-text">
          <span className="logo-txt-main">Inter<span className="text-lime">Science</span></span>
          <span className="logo-txt-sub">LABORATORY</span>
        </div>
      </div>
    ),
    macadz: (
      <div className={`partner-logo logo-macadz ${className}`}>
        <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect x="4" y="4" width="32" height="32" rx="8" stroke="#81D742" strokeWidth="2" fill="rgba(129, 215, 66, 0.05)"/>
          <path d="M11 25V15L16 20L21 15V25" stroke="#81D742" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="28" cy="15" r="2.5" fill="#81D742"/>
          <path d="M25 25L28 19L31 25" stroke="#81D742" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <div className="partner-logo-text">
          <span className="logo-txt-main">Mac<span className="text-lime">Adz</span></span>
          <span className="logo-txt-sub">DIGITAL SOLUTIONS</span>
        </div>
      </div>
    ),
    lawman: (
      <div className={`partner-logo logo-lawman ${className}`}>
        <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M20 5L32 10V21C32 27.5 27 32.5 20 35C13 32.5 8 27.5 8 21V10L20 5Z" stroke="#81D742" strokeWidth="2" fill="rgba(129, 215, 66, 0.05)" strokeLinejoin="round"/>
          <path d="M15 15H25M17 15V25M23 15V25M20 28V12" stroke="#81D742" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <div className="partner-logo-text">
          <span className="logo-txt-main">LAW<span className="text-lime">MAN</span></span>
          <span className="logo-txt-sub">LEGAL ADVISORY</span>
        </div>
      </div>
    ),
    duedrops: (
      <div className={`partner-logo logo-duedrops ${className}`}>
        <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M20 33C26.6274 33 32 27.6274 32 21C32 14.3726 20 5 20 5C20 5 8 14.3726 8 21C8 27.6274 13.3726 33 20 33Z" stroke="#81D742" strokeWidth="2" fill="rgba(129, 215, 66, 0.05)" strokeLinejoin="round"/>
          <path d="M20 12C20 12 25 17 25 21C25 23.7614 22.7614 26 20 26" stroke="#81D742" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <div className="partner-logo-text">
          <span className="logo-txt-main">due<span className="text-lime">drops</span></span>
          <span className="logo-txt-sub">BAKERY SUPPLIES</span>
        </div>
      </div>
    ),
    phca: (
      <div className={`partner-logo logo-phca ${className}`}>
        <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M20 5L32 9V20C32 26.5 27.2 31.8 20 34.5C12.8 31.8 8 26.5 8 20V9L20 5Z" stroke="#81D742" strokeWidth="2" fill="rgba(129, 215, 66, 0.05)" strokeLinejoin="round"/>
          <path d="M14 15L20 11L26 15V22C26 24 23.5 27 20 28.5C16.5 27 14 24 14 22V15Z" stroke="#81D742" strokeWidth="1.5" strokeLinejoin="round"/>
          <circle cx="20" cy="18" r="2" fill="#81D742"/>
        </svg>
        <div className="partner-logo-text">
          <span className="logo-txt-main">PH<span className="text-lime">CA</span></span>
          <span className="logo-txt-sub">CULINARY ACADEMY</span>
        </div>
      </div>
    ),
  };

  return logos[key] ?? (
    <div className={`partner-logo ${className}`}>
      <div className="partner-logo-text">
        <span className="logo-txt-main">{logoKey}</span>
      </div>
    </div>
  );
}
