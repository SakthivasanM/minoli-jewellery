'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, X, ChevronRight } from 'lucide-react';

const MESSAGES = [
  '✨ Discover Elegance with MINOLI | Complimentary Insured Delivery Across India',
  '💎 Handcrafted Luxury Jewellery | Direct WhatsApp Concierge Assistance Available',
  '🎁 Complimentary Signature Velvet Box & Certificate of Authenticity on all orders',
];

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);
  const [currentIdx, setCurrentIdx] = useState(0);

  if (!isVisible) return null;

  return (
    <aside aria-label="Announcements" className="relative bg-velvet-950 text-champagne-100 text-xs tracking-wider border-b border-champagne-400/30 py-2 px-4 transition-all z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="hidden sm:flex items-center space-x-2 text-champagne-400">
          <Sparkles className="w-3.5 h-3.5 animate-pulse text-champagne-300" />
          <span className="uppercase text-[10px] font-semibold tracking-widest text-champagne-300">MINOLI MAISON</span>
        </div>

        <div className="flex-1 text-center font-normal px-2 truncate flex items-center justify-center space-x-2">
          <span>{MESSAGES[currentIdx]}</span>
          <Link
            href="/shop"
            className="hidden md:inline-flex items-center text-champagne-400 hover:text-champagne-300 underline underline-offset-2 ml-2 font-medium"
          >
            Shop Now <ChevronRight className="w-3 h-3 ml-0.5" />
          </Link>
        </div>

        <div className="flex items-center space-x-3 text-ivory-300">
          <button
            onClick={() => setCurrentIdx((prev) => (prev + 1) % MESSAGES.length)}
            aria-label="Next announcement message"
            className="text-[10px] uppercase tracking-wider text-champagne-400/80 hover:text-champagne-300 hidden sm:inline-block cursor-pointer focus:outline-none focus:ring-1 focus:ring-champagne-400"
          >
            Next &rarr;
          </button>
          <button
            onClick={() => setIsVisible(false)}
            aria-label="Dismiss announcement bar"
            className="text-ivory-400 hover:text-ivory-100 p-0.5 transition-colors focus:outline-none focus:ring-1 focus:ring-champagne-400"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
