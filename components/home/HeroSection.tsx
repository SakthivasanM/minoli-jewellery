'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Shield, Award } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center bg-charcoal-950 overflow-hidden">
      {/* Background Image with refined luxury overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/hero-main.jpg"
          alt="MINOLI Haute Joaillerie Luxury Collection"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-40 scale-105 animate-fade-in"
        />
        {/* Gradients */}
        <div className="absolute inset-0 bg-linear-to-r from-charcoal-950 via-charcoal-950/80 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-charcoal-950 via-transparent to-charcoal-950/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="max-w-2xl">
          {/* Champagne Gold Luxury Pill */}
          <div className="inline-flex items-center space-x-2 bg-champagne-500/15 border border-champagne-500/40 px-3.5 py-1.5 rounded-full text-champagne-300 text-xs tracking-[0.2em] uppercase font-medium mb-6 backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-champagne-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>The 2026 Festive & Bridal Edit</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-normal tracking-tight leading-[1.15] mb-6">
            Elegance That Speaks <br />
            <span className="italic font-light text-champagne-300 font-serif">Without Words.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-ivory-300 font-light leading-relaxed mb-8 max-w-xl">
            Discover timeless jewellery designed to celebrate every beautiful moment. From heirloom uncut Polki suites to everyday waterproof gold essentials.
          </p>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link
              href="/shop"
              className="bg-champagne-500 hover:bg-champagne-400 text-charcoal-950 font-medium text-xs sm:text-sm uppercase tracking-[0.18em] px-8 py-4 rounded-sm transition-all duration-300 text-center shadow-luxury hover:shadow-luxury-hover flex items-center justify-center space-x-2 group"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/collections/wedding"
              className="bg-transparent hover:bg-white/10 text-ivory-100 border border-ivory-400/40 hover:border-ivory-200 text-xs sm:text-sm uppercase tracking-[0.18em] px-8 py-4 rounded-sm transition-all text-center"
            >
              The Bridal Suite
            </Link>
          </div>

          {/* Trust Highlights */}
          <div className="grid grid-cols-3 gap-6 pt-12 mt-12 border-t border-ivory-400/20 max-w-lg">
            <div>
              <p className="font-serif text-xl sm:text-2xl font-medium text-champagne-300">
                100%
              </p>
              <p className="text-[11px] uppercase tracking-wider text-charcoal-300 mt-0.5">
                Handcrafted
              </p>
            </div>
            <div>
              <p className="font-serif text-xl sm:text-2xl font-medium text-champagne-300">
                22K / 18K
              </p>
              <p className="text-[11px] uppercase tracking-wider text-charcoal-300 mt-0.5">
                Micron Gold
              </p>
            </div>
            <div>
              <p className="font-serif text-xl sm:text-2xl font-medium text-champagne-300">
                Direct
              </p>
              <p className="text-[11px] uppercase tracking-wider text-charcoal-300 mt-0.5">
                WhatsApp Orders
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
