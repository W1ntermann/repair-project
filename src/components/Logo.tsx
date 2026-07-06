import React from 'react';
import Link from 'next/link';

export function Logo({ className = '' }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-3 ${className}`}>
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
        <path d="M12 2L22 7.5V16.5L12 22L2 16.5V7.5L12 2Z" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter"/>
        <path d="M12 7V17M7 14.5L12 12L17 14.5M7 9.5L12 12L17 9.5" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter"/>
      </svg>
      <span className="font-heading font-black text-xl tracking-widest uppercase flex items-center">
        <span className="text-white">PRO</span>
        <span className="text-[#C9A84C] ml-1">REPAIR</span>
      </span>
    </Link>
  );
}
