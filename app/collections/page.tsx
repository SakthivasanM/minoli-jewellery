'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';
import { COLLECTIONS } from '@/data/categories';
import { PRODUCTS } from '@/data/products';

export default function CollectionsPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Header */}
      <div className="bg-charcoal-950 text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/promo-banner.jpg"
            alt="MINOLI Collections"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-linear-to-b from-charcoal-950/70 via-charcoal-950/90 to-charcoal-950" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-1.5 text-champagne-400 text-xs font-semibold tracking-[0.25em] uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Themes</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-tight mb-4">
            The MINOLI Collections
          </h1>
          <p className="text-xs sm:text-base text-ivory-300 font-light max-w-2xl mx-auto leading-relaxed">
            Each curated edit represents a chapter in timeless artistry — from ceremonial wedding heirloom suites to effortless modern everyday staples.
          </p>
        </div>
      </div>

      {/* Collections List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-24">
        {COLLECTIONS.map((collection, index) => {
          const isReversed = index % 2 === 1;
          const matchingProducts = PRODUCTS.filter((p) =>
            p.collections.includes(collection.id)
          ).slice(0, 3);

          return (
            <div
              key={collection.id}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                isReversed ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Banner Image (7 cols) */}
              <div
                className={`lg:col-span-7 relative aspect-[16/10] min-h-[260px] rounded-sm overflow-hidden shadow-luxury ${
                  isReversed ? 'lg:order-2' : 'lg:order-1'
                }`}
              >
                <Image
                  src={collection.heroImage}
                  alt={collection.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-charcoal-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-[10px] uppercase tracking-widest text-champagne-300 font-semibold block mb-1">
                    Featured Edit
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-medium">
                    {collection.name}
                  </h3>
                </div>
              </div>

              {/* Text & Preview (5 cols) */}
              <div
                className={`lg:col-span-5 space-y-6 ${
                  isReversed ? 'lg:order-1' : 'lg:order-2'
                }`}
              >
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] font-semibold text-champagne-700 block mb-2">
                    {collection.tagline}
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl text-charcoal-900 font-normal">
                    {collection.name}
                  </h2>
                  <div className="w-10 h-0.5 bg-champagne-500 my-4" />
                  <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed font-light">
                    {collection.description}
                  </p>
                </div>

                {/* Mini product thumbnails */}
                <div className="pt-2">
                  <p className="text-[11px] uppercase tracking-wider font-semibold text-charcoal-400 mb-3">
                    Collection Highlights
                  </p>
                  <div className="flex gap-3">
                    {matchingProducts.map((p) => (
                      <Link
                        key={p.id}
                        href={`/product/${p.slug}`}
                        className="group relative w-20 h-24 rounded-sm overflow-hidden bg-ivory-100 border border-ivory-300 shadow-xs"
                      >
                        <Image
                          src={p.images[0]}
                          alt={p.name}
                          fill
                          sizes="80px"
                          className="object-cover group-hover:scale-110 transition-transform"
                        />
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href={`/collections/${collection.slug}`}
                    className="inline-flex items-center space-x-2 bg-charcoal-900 hover:bg-champagne-600 text-white text-xs uppercase tracking-wider font-medium py-3.5 px-6 rounded-sm transition-colors shadow-xs"
                  >
                    <span>Explore This Collection</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
