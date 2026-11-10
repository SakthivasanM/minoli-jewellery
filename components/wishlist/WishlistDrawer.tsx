'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Heart, ShoppingBag, Trash2, MessageCircle } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { formatPrice, generateProductWhatsAppUrl } from '@/lib/whatsapp';

export function WishlistDrawer() {
  const { wishlist, isWishlistOpen, setIsWishlistOpen, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (!isWishlistOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={() => setIsWishlistOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-5 border-b border-ivory-300 flex items-center justify-between bg-ivory-50">
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-champagne-600 fill-champagne-600" />
              <h3 className="font-serif text-lg font-medium text-charcoal-900">
                Saved Favourites ({wishlist.length})
              </h3>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-1.5 text-charcoal-500 hover:text-charcoal-900 rounded-full transition-colors"
              aria-label="Close wishlist drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Wishlist Items List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-ivory-200">
            {wishlist.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-ivory-200 flex items-center justify-center mb-4 text-charcoal-400">
                  <Heart className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-base font-medium text-charcoal-800 mb-1">
                  Your wishlist is empty
                </h4>
                <p className="text-xs text-charcoal-500 max-w-xs mb-6">
                  Save your dream jewellery pieces to review later or order with our concierge.
                </p>
                <Link
                  href="/shop"
                  onClick={() => setIsWishlistOpen(false)}
                  className="bg-charcoal-900 hover:bg-champagne-600 text-white text-xs uppercase tracking-wider font-medium py-3 px-6 rounded-sm transition-colors"
                >
                  Explore Jewellery
                </Link>
              </div>
            ) : (
              wishlist.map(({ product }) => {
                const whatsappUrl = generateProductWhatsAppUrl({ product });

                return (
                  <div key={product.id} className="py-4 flex space-x-4">
                    {/* Thumbnail Image */}
                    <div className="relative w-20 h-24 shrink-0 rounded-sm overflow-hidden bg-ivory-100 border border-ivory-300">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <Link
                            href={`/product/${product.slug}`}
                            onClick={() => setIsWishlistOpen(false)}
                            className="font-serif text-sm font-medium text-charcoal-900 hover:text-champagne-600 transition-colors line-clamp-1"
                          >
                            {product.name}
                          </Link>
                          <button
                            onClick={() => removeFromWishlist(product.id)}
                            className="text-charcoal-400 hover:text-rose-600 transition-colors ml-2 p-1"
                            aria-label={`Remove ${product.name} from wishlist`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="text-xs font-serif font-semibold text-charcoal-900 mt-1">
                          {formatPrice(product.price)}
                          {product.originalPrice && (
                            <span className="text-[11px] text-charcoal-400 line-through font-sans ml-2">
                              {formatPrice(product.originalPrice)}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 pt-3">
                        <button
                          onClick={() => {
                            addToCart(product);
                            removeFromWishlist(product.id);
                          }}
                          className="flex-1 bg-charcoal-900 hover:bg-champagne-600 text-white text-[11px] uppercase tracking-wider py-2 px-3 rounded-sm flex items-center justify-center space-x-1.5 transition-colors"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Move to Bag</span>
                        </button>

                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-sm transition-colors"
                          title="Order this product on WhatsApp"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Actions */}
          {wishlist.length > 0 && (
            <div className="p-5 bg-ivory-100/90 border-t border-ivory-300 flex items-center justify-between text-xs">
              <Link
                href="/wishlist"
                onClick={() => setIsWishlistOpen(false)}
                className="text-charcoal-800 hover:text-champagne-600 underline underline-offset-4 font-medium"
              >
                View Dedicated Wishlist Page &rarr;
              </Link>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="text-charcoal-500 hover:text-charcoal-900"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
