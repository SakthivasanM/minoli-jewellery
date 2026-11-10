'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Filter, X, SlidersHorizontal, Search, RotateCcw } from 'lucide-react';
import { ProductCard } from '@/components/products/ProductCard';
import { QuickViewModal } from '@/components/products/QuickViewModal';
import { PRODUCTS } from '@/data/products';
import { CATEGORIES } from '@/data/categories';
import { Product } from '@/types';

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialSearch = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedCollection, setSelectedCollection] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [priceRange, setPriceRange] = useState<number>(25000);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // Collection filter
      if (selectedCollection !== 'all' && !product.collections.includes(selectedCollection as any)) {
        return false;
      }

      // Price filter
      if (product.price > priceRange) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        const matchesMaterial = product.material.toLowerCase().includes(query);
        if (!matchesName && !matchesCategory && !matchesMaterial) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      if (sortBy === 'rating') return b.rating - a.rating;
      // Default: featured / best seller first
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [selectedCategory, selectedCollection, priceRange, searchQuery, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedCollection('all');
    setSearchQuery('');
    setPriceRange(25000);
    setSortBy('featured');
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedCollection !== 'all' ||
    searchQuery.trim() !== '' ||
    priceRange < 25000;

  return (
    <div className="bg-white min-h-screen">
      {/* Category Banner */}
      <div className="bg-ivory-100/70 border-b border-ivory-300 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[11px] uppercase tracking-[0.25em] text-champagne-700 font-semibold block mb-2">
            Fine Jewellery Collection
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal-900 font-normal">
            The Complete Catalogue
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-600 max-w-xl mx-auto font-light mt-3">
            Handcrafted chokers, cocktail rings, temple bangles, and everyday luxury adornments crafted with 22K/18K gold purity.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Top Control Bar: Search, Mobile Filter Button, Sort Selector */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-ivory-300">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search jewellery by name, stone, category..."
              className="w-full bg-ivory-50 border border-ivory-300 pl-10 pr-4 py-2.5 text-xs text-charcoal-900 placeholder-charcoal-400 rounded-sm focus:outline-none focus:border-champagne-600"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-charcoal-400 hover:text-charcoal-700 absolute right-3 top-1/2 -translate-y-1/2"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between md:justify-end space-x-3">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden bg-ivory-200 hover:bg-ivory-300 text-charcoal-800 text-xs font-medium uppercase tracking-wider px-4 py-2.5 rounded-sm flex items-center space-x-2 border border-ivory-300"
            >
              <Filter className="w-3.5 h-3.5 text-champagne-600" />
              <span>Filters {hasActiveFilters && '•'}</span>
            </button>

            {/* Product Count */}
            <span className="text-xs text-charcoal-500 hidden sm:inline">
              Showing <span className="font-semibold text-charcoal-900">{filteredProducts.length}</span> pieces
            </span>

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2">
              <span className="text-xs text-charcoal-500 hidden sm:inline">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-ivory-50 border border-ivory-300 text-xs text-charcoal-800 py-2.5 px-3 rounded-sm focus:outline-none focus:border-champagne-600 cursor-pointer"
              >
                <option value="featured">Featured & Best Sellers</option>
                <option value="newest">Newest Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Patron Rating</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filter Chips */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 pt-4">
            <span className="text-[11px] text-charcoal-400 uppercase tracking-wider font-semibold">
              Active Filters:
            </span>
            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center bg-champagne-100 text-champagne-900 text-xs px-2.5 py-1 rounded-full">
                Category: {selectedCategory}
                <button onClick={() => setSelectedCategory('all')} className="ml-1.5 hover:text-rose-600">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedCollection !== 'all' && (
              <span className="inline-flex items-center bg-champagne-100 text-champagne-900 text-xs px-2.5 py-1 rounded-full">
                Collection: {selectedCollection}
                <button onClick={() => setSelectedCollection('all')} className="ml-1.5 hover:text-rose-600">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {searchQuery && (
              <span className="inline-flex items-center bg-ivory-300 text-charcoal-900 text-xs px-2.5 py-1 rounded-full">
                &ldquo;{searchQuery}&rdquo;
                <button onClick={() => setSearchQuery('')} className="ml-1.5 hover:text-rose-600">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            <button
              onClick={resetFilters}
              className="text-xs text-rose-700 hover:text-rose-900 underline underline-offset-2 ml-2 flex items-center"
            >
              <RotateCcw className="w-3 h-3 mr-1" />
              Reset All
            </button>
          </div>
        )}

        {/* Main Content Layout: Sidebar + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block space-y-8 pr-4">
            {/* Categories */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal-900 mb-3 border-b border-ivory-300 pb-2">
                Jewellery Categories
              </h3>
              <ul className="space-y-1.5 text-xs">
                <li>
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`w-full text-left py-1 px-2 rounded-sm transition-colors flex justify-between items-center ${
                      selectedCategory === 'all'
                        ? 'bg-champagne-500 text-charcoal-950 font-semibold'
                        : 'text-charcoal-600 hover:text-champagne-700 hover:bg-ivory-100'
                    }`}
                  >
                    <span>All Jewellery</span>
                    <span className="text-[10px] opacity-75">{PRODUCTS.length}</span>
                  </button>
                </li>
                {CATEGORIES.map((cat) => {
                  const count = PRODUCTS.filter((p) => p.category === cat.id).length;
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <li key={cat.id}>
                      <button
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`w-full text-left py-1 px-2 rounded-sm transition-colors flex justify-between items-center ${
                          isSelected
                            ? 'bg-champagne-500 text-charcoal-950 font-semibold'
                            : 'text-charcoal-600 hover:text-champagne-700 hover:bg-ivory-100'
                        }`}
                      >
                        <span>{cat.name}</span>
                        <span className="text-[10px] opacity-75">{count}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Curated Collections */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal-900 mb-3 border-b border-ivory-300 pb-2">
                Curated Collections
              </h3>
              <ul className="space-y-1.5 text-xs">
                <li>
                  <button
                    onClick={() => setSelectedCollection('all')}
                    className={`w-full text-left py-1 px-2 rounded-sm transition-colors ${
                      selectedCollection === 'all'
                        ? 'text-champagne-700 font-semibold'
                        : 'text-charcoal-600 hover:text-champagne-700'
                    }`}
                  >
                    All Collections
                  </button>
                </li>
                {[
                  { id: 'wedding', name: 'Wedding & Bridal' },
                  { id: 'festive', name: 'Festive Radiance' },
                  { id: 'everyday-elegance', name: 'Everyday Minimalist' },
                  { id: 'luxury', name: 'Haute Solitaire' },
                  { id: 'traditional', name: 'Heritage Kundan' },
                ].map((col) => (
                  <li key={col.id}>
                    <button
                      onClick={() => setSelectedCollection(col.id)}
                      className={`w-full text-left py-1 px-2 rounded-sm transition-colors ${
                        selectedCollection === col.id
                          ? 'text-champagne-700 font-semibold'
                          : 'text-charcoal-600 hover:text-champagne-700'
                      }`}
                    >
                      {col.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Range Slider */}
            <div>
              <div className="flex justify-between items-center mb-2 border-b border-ivory-300 pb-2">
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal-900">
                  Max Price
                </h3>
                <span className="font-serif text-xs font-semibold text-champagne-700">
                  ₹{priceRange.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min="1500"
                max="25000"
                step="500"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-champagne-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-charcoal-400 mt-1">
                <span>₹1,500</span>
                <span>₹25,000</span>
              </div>
            </div>
          </aside>

          {/* Product Grid Area */}
          <main className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-ivory-50 rounded-sm border border-ivory-300 p-8">
                <SlidersHorizontal className="w-12 h-12 text-champagne-600 mx-auto mb-3" />
                <h3 className="font-serif text-xl font-medium text-charcoal-900 mb-1">
                  No jewellery matches your selection
                </h3>
                <p className="text-xs text-charcoal-500 max-w-sm mx-auto mb-6">
                  Try adjusting your price range, searching a different term, or clearing your active filters.
                </p>
                <button
                  onClick={resetFilters}
                  className="bg-charcoal-900 hover:bg-champagne-600 text-white text-xs uppercase tracking-wider font-medium py-3 px-6 rounded-sm transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={(p) => setQuickViewProduct(p)}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-2xl p-6 overflow-y-auto flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-ivory-300 pb-4">
                <h3 className="font-serif text-lg font-medium text-charcoal-900">
                  Filter Jewellery
                </h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 text-charcoal-500 hover:text-charcoal-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Categories */}
              <div>
                <p className="text-xs uppercase tracking-wider font-semibold text-charcoal-400 mb-2">
                  Category
                </p>
                <div className="space-y-1">
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setIsMobileFilterOpen(false);
                    }}
                    className={`block w-full text-left text-xs py-1.5 px-2 rounded-sm ${
                      selectedCategory === 'all' ? 'bg-champagne-500 text-charcoal-950 font-semibold' : 'text-charcoal-700'
                    }`}
                  >
                    All Jewellery
                  </button>
                  {CATEGORIES.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        setSelectedCategory(c.id);
                        setIsMobileFilterOpen(false);
                      }}
                      className={`block w-full text-left text-xs py-1.5 px-2 rounded-sm ${
                        selectedCategory === c.id ? 'bg-champagne-500 text-charcoal-950 font-semibold' : 'text-charcoal-700'
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price slider */}
              <div>
                <p className="text-xs uppercase tracking-wider font-semibold text-charcoal-400 mb-2">
                  Max Price: ₹{priceRange.toLocaleString('en-IN')}
                </p>
                <input
                  type="range"
                  min="1500"
                  max="25000"
                  step="500"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-champagne-600"
                />
              </div>
            </div>

            <div className="pt-6 border-t border-ivory-300 space-y-2">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full bg-charcoal-900 hover:bg-champagne-600 text-white text-xs uppercase tracking-wider py-3 rounded-sm transition-colors"
              >
                Apply Filters ({filteredProducts.length})
              </button>
              <button
                onClick={resetFilters}
                className="w-full text-center text-xs text-rose-700 py-2"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center py-24 text-charcoal-500 text-sm">
          Loading MINOLI catalogue...
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
