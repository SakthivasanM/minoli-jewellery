'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES } from '@/data/categories';

export function ShopByCategory() {
  return (
    <section className="py-20 bg-ivory-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[11px] uppercase tracking-[0.25em] text-champagne-700 font-semibold block mb-2">
            Curated Categories
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-normal">
            Shop by Category
          </h2>
          <div className="w-12 h-0.5 bg-champagne-500 mx-auto mt-4 mb-4" />
          <p className="text-xs sm:text-sm text-charcoal-600 font-light">
            Explore handcrafted jewels designed with timeless grace for everyday wear, wedding festivities, and royal celebrations.
          </p>
        </div>

        {/* Categories Grid (8 Cards) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES.map((category) => (
            <Link
              key={category.id}
              href={`/shop?category=${category.id}`}
              className="group relative block aspect-[3/4] min-h-[220px] rounded-sm overflow-hidden bg-charcoal-900 shadow-soft transition-all duration-500 hover:shadow-luxury"
            >
              {/* Category Image */}
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 opacity-90 group-hover:opacity-100"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-linear-to-t from-charcoal-950 via-charcoal-950/40 to-transparent group-hover:from-charcoal-950/90 transition-colors" />

              {/* Content Overlay */}
              <div className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-end text-white">
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-champagne-300 block mb-1">
                      Explore
                    </span>
                    <h3 className="font-serif text-base sm:text-lg font-medium text-white group-hover:text-champagne-300 transition-colors">
                      {category.name}
                    </h3>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-champagne-500 text-white group-hover:text-charcoal-950 flex items-center justify-center transition-all duration-300 shrink-0 transform group-hover:rotate-45">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
