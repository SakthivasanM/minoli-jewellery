'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { Product } from '@/types';
import { formatPrice } from '@/lib/whatsapp';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const POPULAR_SEARCHES = [
  'Polki Choker',
  'Temple Kada',
  'Solitaire Ring',
  'Chandbali',
  'Bridal Set',
  'Tennis Bracelet',
  'Snake Chain',
];

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setSearchTerm('');
      setResults([]);
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) {
      setResults([]);
      return;
    }

    const filtered = PRODUCTS.filter((p) => {
      return (
        p.name.toLowerCase().includes(query) ||
        p.tagline?.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.material.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      );
    });

    setResults(filtered.slice(0, 6));
  }, [searchTerm]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={onClose}
      />

      <div className="min-h-full flex items-start justify-center p-4 sm:p-6 lg:p-12">
        <div className="relative bg-white w-full max-w-2xl rounded-sm shadow-2xl border border-ivory-300 overflow-hidden z-50 animate-slide-up mt-12 sm:mt-16">
          {/* Search Input Bar */}
          <div className="p-4 sm:p-6 border-b border-ivory-300 flex items-center space-x-3 bg-ivory-50">
            <Search className="w-5 h-5 text-champagne-600 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for gold jewellery, rings, polki chokers, bridal sets..."
              className="w-full bg-transparent text-sm sm:text-base text-charcoal-900 placeholder-charcoal-400 focus:outline-none"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="text-charcoal-400 hover:text-charcoal-700 p-1"
                aria-label="Clear search query"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="text-xs uppercase tracking-wider text-charcoal-500 hover:text-charcoal-900 font-medium px-2 py-1"
              aria-label="Close search"
            >
              ESC
            </button>
          </div>

          {/* Quick Tag Suggestions */}
          {!searchTerm && (
            <div className="p-6">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-charcoal-400 mb-3 flex items-center">
                <Sparkles className="w-3.5 h-3.5 text-champagne-600 mr-1.5" />
                Popular Searches
              </p>
              <div className="flex flex-wrap gap-2">
                {POPULAR_SEARCHES.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearchTerm(tag)}
                    className="text-xs bg-ivory-200 hover:bg-champagne-100 text-charcoal-800 hover:text-champagne-800 px-3 py-1.5 rounded-full transition-colors border border-ivory-300"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results List */}
          {searchTerm && (
            <div className="p-4 sm:p-6 max-h-96 overflow-y-auto divide-y divide-ivory-200">
              {results.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-sm font-serif text-charcoal-700 mb-1">
                    No jewellery found for &ldquo;{searchTerm}&rdquo;
                  </p>
                  <p className="text-xs text-charcoal-400">
                    Try searching for &quot;Polki&quot;, &quot;Kada&quot;, &quot;Earrings&quot;, or &quot;Ring&quot;.
                  </p>
                </div>
              ) : (
                results.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    onClick={onClose}
                    className="py-3.5 flex items-center space-x-4 group hover:bg-ivory-50 -mx-2 px-2 rounded-sm transition-colors"
                  >
                    <div className="relative w-14 h-16 shrink-0 rounded-sm overflow-hidden bg-ivory-100 border border-ivory-300">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        sizes="56px"
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] uppercase tracking-wider text-champagne-600 font-medium">
                          {product.category}
                        </span>
                        {product.isBestSeller && (
                          <span className="text-[9px] bg-charcoal-900 text-champagne-400 px-1.5 py-0.5 rounded-xs font-semibold">
                            Best Seller
                          </span>
                        )}
                      </div>
                      <h4 className="font-serif text-sm font-medium text-charcoal-900 group-hover:text-champagne-600 transition-colors truncate">
                        {product.name}
                      </h4>
                      <p className="text-xs font-medium text-charcoal-700 mt-0.5">
                        {formatPrice(product.price)}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-charcoal-400 group-hover:text-champagne-600 group-hover:translate-x-1 transition-all shrink-0" />
                  </Link>
                ))
              )}
            </div>
          )}

          {/* Footer Link to Shop Page */}
          {searchTerm && results.length > 0 && (
            <div className="p-4 bg-ivory-100 border-t border-ivory-300 text-center">
              <Link
                href={`/shop?search=${encodeURIComponent(searchTerm)}`}
                onClick={onClose}
                className="text-xs font-medium uppercase tracking-wider text-champagne-700 hover:text-champagne-900 underline underline-offset-4"
              >
                View all results in Shop Catalogue &rarr;
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
