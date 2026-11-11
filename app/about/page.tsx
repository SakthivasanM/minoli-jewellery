'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, Gem, ShieldCheck, HeartHandshake, Award, Truck, ArrowRight, MessageCircle } from 'lucide-react';
import { WHATSAPP_CONFIG } from '@/lib/whatsapp';

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Editorial Hero */}
      <div className="relative py-20 sm:py-28 bg-charcoal-950 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/hero-main.jpg"
            alt="MINOLI jewellery craftsmanship atelier"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-linear-to-b from-charcoal-950/80 via-charcoal-950/90 to-charcoal-950" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-champagne-500/20 border border-champagne-500/40 px-3.5 py-1.5 rounded-full text-champagne-300 text-xs tracking-[0.25em] uppercase font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Maison de Haute Joaillerie</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-tight mb-6">
            The Story of MINOLI
          </h1>

          <p className="text-sm sm:text-lg text-ivory-300 font-light max-w-2xl mx-auto leading-relaxed">
            Born from an enduring reverence for timeless elegance, MINOLI crafts jewellery that honors heritage traditions while embracing contemporary effortless grace.
          </p>
        </div>
      </div>

      {/* Brand Philosophy Section */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-champagne-700 font-semibold block mb-2">
              Our Essence
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-normal leading-snug mb-6">
              Elegance is Not About Being Noticed, It is About Being Remembered.
            </h2>
            <div className="w-12 h-0.5 bg-champagne-500 mb-6" />

            <div className="space-y-4 text-xs sm:text-sm text-charcoal-600 leading-relaxed font-light">
              <p>
                Founded in Bengaluru, MINOLI was envisioned as a modern sanctuary for women seeking exceptional jewellery without compromise. We observed a divide between unattainable fine jewellery locked in bank vaults and mass-produced fashion accessories that quickly lost their luster.
              </p>
              <p>
                We set out to create pieces of quiet luxury: jewellery rendered in rich 22K and 18K thick gold finishes, hand-faceted uncut polki crystals, genuine freshwater baroque pearls, and anti-tarnish hypoallergenic metals that seamlessly transition from morning boardrooms to midnight weddings.
              </p>
            </div>
          </div>

          <div className="relative aspect-[4/5] min-h-[320px] rounded-sm overflow-hidden shadow-luxury border-4 border-white">
            <Image
              src="/images/hero/story-craft.jpg"
              alt="MINOLI design process"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section className="py-20 bg-ivory-100/60 border-y border-ivory-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[11px] uppercase tracking-[0.25em] text-champagne-700 font-semibold block mb-2">
              Artisan Guild
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-normal">
              Master Craftsmanship
            </h2>
            <div className="w-12 h-0.5 bg-champagne-500 mx-auto mt-4 mb-4" />
            <p className="text-xs sm:text-sm text-charcoal-600 font-light">
              Each jewel undergoes more than 40 hours of meticulous hand-finishing by veteran karigars who have preserved the art of pacchi, meenakari, and jadau across generations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-sm border border-ivory-300 shadow-soft">
              <div className="w-12 h-12 rounded-full bg-champagne-100 flex items-center justify-center text-champagne-700 mb-6">
                <Gem className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-medium text-charcoal-900 mb-2">
                1. Hand-Selected Gemstones
              </h3>
              <p className="text-xs text-charcoal-500 leading-relaxed font-light">
                Every uncut polki glass crystal, Russian hydrothermal emerald, and cultured seed pearl is individually examined for optimal color saturation, brilliance, and symmetry.
              </p>
            </div>

            <div className="bg-white p-8 rounded-sm border border-ivory-300 shadow-soft">
              <div className="w-12 h-12 rounded-full bg-champagne-100 flex items-center justify-center text-champagne-700 mb-6">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-medium text-charcoal-900 mb-2">
                2. Authentic Pacchi & Jadau Setting
              </h3>
              <p className="text-xs text-charcoal-500 leading-relaxed font-light">
                Our artisans embed stones using ancient foil-backed techniques that mirror candlelight, creating that signature warm regal gleam treasured in Indian royal courts.
              </p>
            </div>

            <div className="bg-white p-8 rounded-sm border border-ivory-300 shadow-soft">
              <div className="w-12 h-12 rounded-full bg-champagne-100 flex items-center justify-center text-champagne-700 mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-medium text-charcoal-900 mb-2">
                3. Waterproof Micron Gold Bath
              </h3>
              <p className="text-xs text-charcoal-500 leading-relaxed font-light">
                Our daily wear collections feature medical-grade 316L steel coated with 18K real gold using PVD vapor deposition, ensuring anti-tarnish and sweat-resistant longevity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose MINOLI */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] uppercase tracking-[0.25em] text-champagne-700 font-semibold block mb-2">
            The MINOLI Promise
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-normal">
            Why Discerning Clients Choose Us
          </h2>
          <div className="w-12 h-0.5 bg-champagne-500 mx-auto mt-4 mb-4" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 border border-ivory-300 rounded-sm text-center">
            <Award className="w-8 h-8 text-champagne-600 mx-auto mb-3" />
            <h4 className="font-serif text-base font-medium text-charcoal-900 mb-1">
              Hallmarked Finish
            </h4>
            <p className="text-xs text-charcoal-500 leading-relaxed">
              Every item includes our signature seal and authenticity warranty certificate.
            </p>
          </div>

          <div className="p-6 border border-ivory-300 rounded-sm text-center">
            <MessageCircle className="w-8 h-8 text-champagne-600 mx-auto mb-3" />
            <h4 className="font-serif text-base font-medium text-charcoal-900 mb-1">
              WhatsApp Concierge
            </h4>
            <p className="text-xs text-charcoal-500 leading-relaxed">
              Real-time video previews, custom sizing, and personal guidance on WhatsApp.
            </p>
          </div>

          <div className="p-6 border border-ivory-300 rounded-sm text-center">
            <Truck className="w-8 h-8 text-champagne-600 mx-auto mb-3" />
            <h4 className="font-serif text-base font-medium text-charcoal-900 mb-1">
              Insured Express Transit
            </h4>
            <p className="text-xs text-charcoal-500 leading-relaxed">
              Complimentary tamper-proof door delivery across all Indian pin codes.
            </p>
          </div>

          <div className="p-6 border border-ivory-300 rounded-sm text-center">
            <HeartHandshake className="w-8 h-8 text-champagne-600 mx-auto mb-3" />
            <h4 className="font-serif text-base font-medium text-charcoal-900 mb-1">
              Velvet Box Packaging
            </h4>
            <p className="text-xs text-charcoal-500 leading-relaxed">
              Arrives ready for gifting in a luxury keepsake box lined with plush velvet.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center space-x-2 bg-charcoal-900 hover:bg-champagne-600 text-white text-xs uppercase tracking-[0.2em] font-medium py-4 px-8 rounded-sm transition-colors shadow-soft"
          >
            <span>Explore The Collection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
