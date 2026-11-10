'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Flame } from 'lucide-react';
import { ProductCard } from '@/components/products/ProductCard';
import { QuickViewModal } from '@/components/products/QuickViewModal';
import { PRODUCTS } from '@/data/products';
import { Product } from '@/types';

export function NewArrivals() {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const newArrivals = PRODUCTS.filter((p) => p.isNewArrival).slice(0, 4);

  return (
    <section className="py-20 bg-ivory-100/40 border-t border-ivory-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-champagne-700 text-[11px] font-semibold tracking-[0.25em] uppercase mb-2">
              <Flame className="w-3.5 h-3.5 text-champagne-600" />
              <span>Fresh Off the Atelier</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-normal">
              New Arrivals
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-500 font-light mt-1">
              Fresh additions crafted in limited small batches for effortless contemporary adornment.
            </p>
          </div>

          <Link
            href="/shop?sort=newest"
            className="hidden sm:inline-flex items-center space-x-1 text-xs uppercase tracking-wider font-semibold text-champagne-700 hover:text-champagne-900 group"
          >
            <span>View All New Pieces</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {newArrivals.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>

        <div className="sm:hidden text-center mt-8">
          <Link
            href="/shop?sort=newest"
            className="inline-flex items-center space-x-1 text-xs uppercase tracking-wider font-semibold text-champagne-700"
          >
            <span>View All New Pieces</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </section>
  );
}
