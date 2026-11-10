'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ProductCard } from '@/components/products/ProductCard';
import { QuickViewModal } from '@/components/products/QuickViewModal';
import { PRODUCTS } from '@/data/products';
import { Product } from '@/types';

export function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState<'all' | 'necklaces' | 'earrings' | 'rings'>('all');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const featuredList = PRODUCTS.filter((p) => p.isFeatured);

  const filtered = activeTab === 'all'
    ? featuredList.slice(0, 8)
    : featuredList.filter((p) => p.category === activeTab).slice(0, 8);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-champagne-700 text-[11px] font-semibold tracking-[0.25em] uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Signature Highlights</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-normal">
              Featured Jewellery Pieces
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 mt-6 md:mt-0">
            {[
              { label: 'All Featured', value: 'all' },
              { label: 'Necklaces', value: 'necklaces' },
              { label: 'Earrings', value: 'earrings' },
              { label: 'Rings', value: 'rings' },
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value as any)}
                className={`text-xs uppercase tracking-wider px-4 py-2 rounded-full transition-all font-medium ${
                  activeTab === tab.value
                    ? 'bg-charcoal-900 text-champagne-300 shadow-xs'
                    : 'bg-ivory-200 text-charcoal-700 hover:bg-champagne-100 hover:text-champagne-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <Link
            href="/shop"
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-medium text-charcoal-900 hover:text-champagne-600 transition-colors border-b-2 border-champagne-500 pb-1"
          >
            <span>Explore All 24+ Fine Jewellery Creations</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </section>
  );
}
