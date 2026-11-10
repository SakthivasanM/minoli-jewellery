'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Trophy } from 'lucide-react';
import { ProductCard } from '@/components/products/ProductCard';
import { QuickViewModal } from '@/components/products/QuickViewModal';
import { PRODUCTS } from '@/data/products';
import { Product } from '@/types';

export function BestSellers() {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller).slice(0, 4);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-champagne-700 text-[11px] font-semibold tracking-[0.25em] uppercase mb-2">
              <Trophy className="w-3.5 h-3.5 text-champagne-600" />
              <span>Beloved by Connoisseurs</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-normal">
              Most Loved Best Sellers
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-500 font-light mt-1">
              Our iconic pieces with hundreds of 5-star verified customer endorsements.
            </p>
          </div>

          <Link
            href="/shop"
            className="hidden sm:inline-flex items-center space-x-1 text-xs uppercase tracking-wider font-semibold text-champagne-700 hover:text-champagne-900 group"
          >
            <span>Explore All Best Sellers</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {bestSellers.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>
      </div>

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </section>
  );
}
