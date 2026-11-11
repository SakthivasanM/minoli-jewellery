'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Gem, ShieldCheck, HeartHandshake } from 'lucide-react';

export function BrandStory() {
  return (
    <section className="py-24 bg-ivory-100/80 border-y border-ivory-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Visual Column: Signature Luxury Packaging Editorial */}
          <div className="relative">
            <div className="relative aspect-[4/5] min-h-[320px] w-full max-w-md mx-auto lg:max-w-none rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <Image
                src="/images/Logo/BrandPackage.jpg"
                alt="MINOLI Signature Luxury Unboxing & Packaging"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
                priority
              />
            </div>

            {/* Overlapping smaller badge card in Royal Velvet Wine */}
            <div className="absolute -bottom-6 -right-2 sm:right-6 bg-velvet-800 text-white p-5 rounded-xl shadow-2xl border border-champagne-400/40 max-w-xs hidden sm:block">
              <div className="flex items-center space-x-2 text-champagne-300 mb-2">
                <Sparkles className="w-4 h-4 text-champagne-300" />
                <span className="text-[10px] uppercase tracking-widest font-semibold">Signature Unboxing</span>
              </div>
              <p className="font-serif text-sm font-medium leading-snug">
                &ldquo;Encased in royal wine velvet and gold-sealed cashmere boxes with every creation.&rdquo;
              </p>
            </div>
          </div>

          {/* Text Column */}
          <div>
            <div className="inline-flex items-center space-x-2 text-champagne-700 text-[11px] font-semibold tracking-[0.25em] uppercase mb-3">
              <Gem className="w-3.5 h-3.5" />
              <span>The MINOLI Legacy</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal-900 font-normal leading-tight mb-6">
              Crafted for Your <br />
              <span className="italic font-serif text-champagne-700">Beautiful Moments.</span>
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-charcoal-600 leading-relaxed font-light">
              <p>
                At <strong>MINOLI</strong>, jewellery is not merely an accessory; it is an enduring repository of love, milestone celebrations, and unspoken emotions. We bridge time-honored Indian jewellery heritage with contemporary minimalist silhouettes.
              </p>
              <p>
                From royal pacchi Kundan suites worn by regal brides to tarnish-free 18K gold vapor-coated chains worn daily, our collections embody exceptional artistry, skin-safe hypoallergenic purity, and unparalleled grace.
              </p>
            </div>

            {/* Pillars */}
            <div className="grid grid-cols-2 gap-6 my-8 pt-6 border-t border-ivory-300">
              <div className="flex items-start space-x-3">
                <ShieldCheck className="w-5 h-5 text-champagne-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif text-sm font-medium text-charcoal-900">
                    22K & 18K Gold Plated
                  </h4>
                  <p className="text-xs text-charcoal-500 mt-0.5">
                    Thick micron gold dips designed to resist tarnishing and fading.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <HeartHandshake className="w-5 h-5 text-champagne-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif text-sm font-medium text-charcoal-900">
                    WhatsApp Concierge
                  </h4>
                  <p className="text-xs text-charcoal-500 mt-0.5">
                    Direct personalized sizing, videos, and immediate support.
                  </p>
                </div>
              </div>
            </div>

            <Link
              href="/about"
              className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.18em] font-medium text-charcoal-900 hover:text-champagne-600 transition-colors border-b-2 border-charcoal-900 hover:border-champagne-600 pb-1"
            >
              <span>Discover Our Philosophy & Artisans</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
