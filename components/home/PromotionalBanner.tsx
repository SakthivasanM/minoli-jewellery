'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, MessageCircle } from 'lucide-react';
import { WHATSAPP_CONFIG } from '@/lib/whatsapp';

export function PromotionalBanner() {
  return (
    <section className="relative py-24 sm:py-32 bg-charcoal-950 overflow-hidden">
      {/* Background with luxury lifestyle jewelry imagery */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/promo-banner.jpg"
          alt="MINOLI Festive Jewels"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-30"
        />
        <div className="absolute inset-0 bg-linear-to-r from-charcoal-950 via-charcoal-950/85 to-charcoal-950/70" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center space-x-2 bg-champagne-500/20 border border-champagne-500/50 px-4 py-1.5 rounded-full text-champagne-300 text-xs tracking-[0.25em] uppercase font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5 text-champagne-400" />
          <span>Private Festive Consultation</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-normal leading-tight mb-6">
          &ldquo;Every Moment Deserves <br />
          <span className="italic text-champagne-300 font-serif">a Little Sparkle.&rdquo;</span>
        </h2>

        <p className="text-sm sm:text-base text-ivory-300 max-w-2xl mx-auto font-light leading-relaxed mb-10">
          Whether celebrating personal milestones, attending intimate weddings, or gifting someone extraordinary, our master artisans craft memories wrapped in gold and unyielding radiance.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/collections"
            className="w-full sm:w-auto bg-champagne-500 hover:bg-champagne-400 text-charcoal-950 font-medium text-xs sm:text-sm uppercase tracking-[0.2em] px-8 py-4 rounded-sm transition-all duration-300 shadow-luxury flex items-center justify-center space-x-2"
          >
            <span>Shop Collection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <a
            href={`https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodeURIComponent(
              "Hello MINOLI! I would like to book a private WhatsApp styling consultation for an upcoming occasion."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-ivory-300/40 font-medium text-xs sm:text-sm uppercase tracking-[0.2em] px-7 py-4 rounded-sm transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>Consult on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
