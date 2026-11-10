'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Heart } from 'lucide-react';
import { INSTAGRAM_POSTS } from '@/data/products';

export function InstagramGallery() {
  return (
    <section className="py-20 bg-ivory-50 border-t border-ivory-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 text-champagne-700 text-[11px] font-semibold tracking-[0.25em] uppercase mb-2">
            <Instagram className="w-3.5 h-3.5" />
            <span>@minoli.jewellery</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-normal">
            As Seen on Instagram
          </h2>
          <div className="w-12 h-0.5 bg-champagne-500 mx-auto mt-4 mb-3" />
          <p className="text-xs sm:text-sm text-charcoal-500 font-light">
            Follow our daily atelier diaries, bride spotlights, and jewellery styling inspirations.
          </p>
        </div>

        {/* 6-Grid Gallery */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {INSTAGRAM_POSTS.map((post) => (
            <div
              key={post.id}
              className="group relative aspect-square rounded-sm overflow-hidden bg-charcoal-900 shadow-soft"
            >
              <Image
                src={post.imageUrl}
                alt={post.caption}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-charcoal-950/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-between text-white">
                <div className="flex justify-between items-center text-xs text-champagne-300">
                  <Instagram className="w-4 h-4" />
                  <div className="flex items-center space-x-1">
                    <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                    <span>{post.likes}</span>
                  </div>
                </div>

                <div>
                  <p className="text-[11px] text-ivory-200 line-clamp-2 leading-snug">
                    {post.caption}
                  </p>
                  {post.productSlug && (
                    <Link
                      href={`/product/${post.productSlug}`}
                      className="inline-block text-[10px] uppercase tracking-wider text-champagne-400 hover:text-champagne-300 underline underline-offset-2 mt-2 font-medium"
                    >
                      Shop This Look &rarr;
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
