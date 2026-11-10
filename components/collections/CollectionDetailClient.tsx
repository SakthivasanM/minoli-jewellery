'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { Collection, Product } from '@/types';
import { ProductCard } from '@/components/products/ProductCard';
import { QuickViewModal } from '@/components/products/QuickViewModal';

interface CollectionDetailClientProps {
  collection: Collection;
  products: Product[];
}

export function CollectionDetailClient({
  collection,
  products,
}: CollectionDetailClientProps) {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Banner */}
      <div className="relative py-16 sm:py-24 bg-charcoal-950 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={collection.heroImage}
            alt={collection.name}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-linear-to-t from-charcoal-950 via-charcoal-950/80 to-charcoal-950/60" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            href="/collections"
            className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-widest text-champagne-300 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Collections</span>
          </Link>

          <div className="inline-flex items-center space-x-2 bg-champagne-500/20 border border-champagne-500/40 px-3.5 py-1 rounded-full text-champagne-300 text-[10px] sm:text-xs tracking-[0.25em] uppercase font-semibold mb-4 mx-auto block w-fit">
            <Sparkles className="w-3 h-3 text-champagne-400" />
            <span>{collection.tagline}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-tight mb-4">
            {collection.name}
          </h1>

          <p className="text-xs sm:text-sm text-ivory-200 font-light max-w-xl mx-auto leading-relaxed">
            {collection.description}
          </p>

          <p className="text-xs text-champagne-400 font-medium uppercase tracking-widest mt-6">
            {products.length} Heirloom Creations Available
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-16 bg-ivory-100 rounded-sm">
            <p className="text-sm text-charcoal-600 font-serif">
              New pieces are currently being handcrafted for this collection.
            </p>
            <Link
              href="/shop"
              className="mt-4 inline-block text-xs uppercase tracking-wider text-champagne-700 font-semibold underline"
            >
              Explore Complete Catalogue
            </Link>
          </div>
        )}
      </div>

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}
