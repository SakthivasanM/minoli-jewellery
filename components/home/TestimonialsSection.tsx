'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS } from '@/data/products';

export function TestimonialsSection() {
  const [currentIdx, setCurrentIdx] = useState(0);

  const prev = () => {
    setCurrentIdx((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrentIdx((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const t = TESTIMONIALS[currentIdx];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-[11px] uppercase tracking-[0.25em] text-champagne-700 font-semibold block mb-2">
            Client Voices
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-normal">
            Cherished by Our Patrons
          </h2>
          <div className="w-12 h-0.5 bg-champagne-500 mx-auto mt-4 mb-3" />
          <p className="text-xs sm:text-sm text-charcoal-500">
            Real stories from our clients who ordered via WhatsApp across India and abroad.
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="relative bg-ivory-100/60 rounded-sm border border-ivory-300 p-8 sm:p-12 shadow-soft">
          <Quote className="w-12 h-12 text-champagne-300/60 absolute top-6 right-8 pointer-events-none" />

          <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
            {/* Stars */}
            <div className="flex items-center space-x-1 text-amber-500 mb-6">
              {[...Array(t.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="font-serif text-base sm:text-lg text-charcoal-800 leading-relaxed italic mb-8">
              &ldquo;{t.comment}&rdquo;
            </blockquote>

            {/* Client Info */}
            <div className="flex items-center space-x-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-champagne-500">
                <Image
                  src={t.avatar}
                  alt={t.name}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div className="text-left">
                <div className="flex items-center space-x-1.5">
                  <h4 className="font-serif text-sm font-semibold text-charcoal-900">
                    {t.name}
                  </h4>
                  <span title="Verified Customer" className="inline-flex items-center">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  </span>
                </div>
                <p className="text-xs text-charcoal-500">{t.location}</p>
                <p className="text-[10px] text-champagne-700 font-medium mt-0.5">
                  Ordered: {t.purchaseItem}
                </p>
              </div>
            </div>
          </div>

          {/* Carousel Arrows */}
          <div className="flex justify-between items-center absolute inset-y-0 left-2 right-2 pointer-events-none">
            <button
              onClick={prev}
              className="pointer-events-auto w-10 h-10 rounded-full bg-white/90 hover:bg-white text-charcoal-800 flex items-center justify-center shadow-md transition-all hover:scale-105 border border-ivory-300"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="pointer-events-auto w-10 h-10 rounded-full bg-white/90 hover:bg-white text-charcoal-800 flex items-center justify-center shadow-md transition-all hover:scale-105 border border-ivory-300"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center space-x-2 mt-8">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIdx(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  currentIdx === idx
                    ? 'w-6 bg-champagne-600'
                    : 'bg-ivory-400 hover:bg-charcoal-400'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
