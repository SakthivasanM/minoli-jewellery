'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, Trash2, ArrowRight, MessageCircle } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { formatPrice, generateProductWhatsAppUrl } from '@/lib/whatsapp';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, clearWishlist, totalWishlistItems } = useWishlist();
  const { addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-[70vh] bg-white flex items-center justify-center py-20 px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full bg-ivory-200 text-charcoal-400 flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10 text-champagne-600" />
          </div>
          <h1 className="font-serif text-3xl font-medium text-charcoal-900 mb-2">
            Your Wishlist is Empty
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-500 font-light max-w-sm mx-auto mb-8 leading-relaxed">
            Save your favourite polki sets, statement solitaires, and delicate gold chains to keep track of what you love.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center space-x-2 bg-charcoal-900 hover:bg-champagne-600 text-white text-xs uppercase tracking-[0.2em] font-medium py-4 px-8 rounded-sm transition-colors shadow-soft"
          >
            <span>Explore Jewellery Catalogue</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-ivory-300 pb-6 mb-8">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-champagne-700 font-semibold block mb-1">
              Personal Vault
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-normal">
              My Saved Favourites ({totalWishlistItems})
            </h1>
          </div>

          <button
            onClick={clearWishlist}
            className="text-xs text-charcoal-400 hover:text-rose-600 transition-colors mt-4 sm:mt-0 flex items-center self-start sm:self-auto"
          >
            <Trash2 className="w-3.5 h-3.5 mr-1" />
            Clear Wishlist
          </button>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map(({ product }) => {
            const whatsappUrl = generateProductWhatsAppUrl({ product });

            return (
              <div
                key={product.id}
                className="bg-white border border-ivory-300 rounded-sm overflow-hidden flex flex-col justify-between shadow-soft hover:shadow-luxury transition-all"
              >
                <div className="relative aspect-4/5 w-full bg-ivory-100">
                  <Link href={`/product/${product.slug}`} className="block w-full h-full">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </Link>

                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white text-rose-600 shadow-sm flex items-center justify-center hover:bg-rose-50 transition-colors"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-champagne-700 font-semibold block mb-1">
                      {product.category}
                    </span>
                    <Link
                      href={`/product/${product.slug}`}
                      className="font-serif text-base font-medium text-charcoal-900 hover:text-champagne-600 transition-colors line-clamp-1"
                    >
                      {product.name}
                    </Link>

                    <div className="flex items-baseline space-x-2 mt-2">
                      <span className="font-serif text-base font-semibold text-charcoal-900">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-charcoal-400 line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2 mt-4 pt-3 border-t border-ivory-200">
                    <button
                      onClick={() => {
                        addToCart(product);
                        removeFromWishlist(product.id);
                      }}
                      className="w-full bg-charcoal-900 hover:bg-charcoal-800 text-white text-xs uppercase tracking-wider font-medium py-2.5 px-3 rounded-sm flex items-center justify-center space-x-1.5 transition-colors"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-champagne-400" />
                      <span>Move to Bag</span>
                    </button>

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs uppercase tracking-wider font-medium py-2 px-3 rounded-sm flex items-center justify-center space-x-1.5 transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Order on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
