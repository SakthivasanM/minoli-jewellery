'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Heart, ShoppingBag, MessageCircle, Star, ShieldCheck, Truck, Check } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { formatPrice, generateProductWhatsAppUrl } from '@/lib/whatsapp';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColour, setSelectedColour] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  if (!product) return null;

  const currentSize = selectedSize || product.availableSizes?.[0] || 'Standard';
  const currentColour = selectedColour || product.availableColours?.[0] || 'Champagne Gold';
  const isFavorited = isInWishlist(product.id);

  const whatsappUrl = generateProductWhatsAppUrl({
    product,
    selectedSize: currentSize,
    selectedColour: currentColour,
    quantity,
  });

  const handleAddToCart = () => {
    addToCart(product, {
      size: currentSize,
      colour: currentColour,
      quantity,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={onClose}
      />

      <div className="min-h-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="relative bg-white w-full max-w-4xl rounded-sm shadow-2xl border border-ivory-300 overflow-hidden z-50 animate-slide-up">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-charcoal-700 flex items-center justify-center shadow-md transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Gallery Column */}
            <div className="p-6 bg-ivory-50 flex flex-col justify-between">
              <div className="relative aspect-[4/5] min-h-[300px] w-full bg-white rounded-sm overflow-hidden border border-ivory-300 mb-4">
                <Image
                  src={product.images[selectedImageIdx] || product.images[0]}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-2.5 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIdx(idx)}
                      className={`relative w-16 h-16 shrink-0 rounded-sm overflow-hidden border-2 transition-all ${
                        selectedImageIdx === idx
                          ? 'border-champagne-600 ring-2 ring-champagne-400/30'
                          : 'border-ivory-300 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <Image src={img} alt="" fill sizes="64px" className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details Column */}
            <div className="p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[85vh]">
              <div>
                {/* Category & Rating */}
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="uppercase tracking-widest text-[10px] text-champagne-700 font-semibold">
                    {product.category}
                  </span>
                  <div className="flex items-center space-x-1 text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-semibold text-xs text-charcoal-800">
                      {product.rating}
                    </span>
                    <span className="text-[11px] text-charcoal-400">
                      ({product.reviewCount} reviews)
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h2 className="font-serif text-xl sm:text-2xl font-medium text-charcoal-900 leading-snug">
                  {product.name}
                </h2>

                <p className="text-xs text-charcoal-400 font-mono mt-0.5">
                  SKU: {product.id}
                </p>

                {/* Price Display */}
                <div className="flex items-baseline space-x-3 mt-3 pb-3 border-b border-ivory-200">
                  <span className="font-serif text-2xl font-semibold text-charcoal-900">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-charcoal-400 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                  {product.discountPercent && (
                    <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-xs">
                      Save {product.discountPercent}%
                    </span>
                  )}
                </div>

                {/* Short Description */}
                <p className="text-xs text-charcoal-600 leading-relaxed mt-3">
                  {product.description}
                </p>

                {/* Finish / Colour Options */}
                {product.availableColours && product.availableColours.length > 0 && (
                  <div className="mt-4">
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-charcoal-700 mb-2">
                      Finish / Colour: <span className="text-champagne-700">{currentColour}</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.availableColours.map((c) => (
                        <button
                          key={c}
                          onClick={() => setSelectedColour(c)}
                          className={`text-xs px-3 py-1.5 rounded-sm border transition-all ${
                            currentColour === c
                              ? 'border-champagne-600 bg-champagne-50 text-charcoal-900 font-medium ring-1 ring-champagne-500'
                              : 'border-ivory-300 text-charcoal-600 hover:border-charcoal-400'
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Selection */}
                {product.availableSizes && product.availableSizes.length > 0 && (
                  <div className="mt-4">
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-charcoal-700 mb-2">
                      Size: <span className="text-champagne-700">{currentSize}</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.availableSizes.map((s) => (
                        <button
                          key={s}
                          onClick={() => setSelectedSize(s)}
                          className={`text-xs px-3 py-1.5 rounded-sm border transition-all ${
                            currentSize === s
                              ? 'border-champagne-600 bg-champagne-50 text-charcoal-900 font-medium ring-1 ring-champagne-500'
                              : 'border-ivory-300 text-charcoal-600 hover:border-charcoal-400'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity & Stock */}
                <div className="flex items-center space-x-4 mt-4">
                  <div className="flex items-center border border-ivory-400 rounded-sm">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1.5 text-charcoal-600 hover:text-charcoal-900 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="px-3 text-xs font-medium text-charcoal-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-1.5 text-charcoal-600 hover:text-charcoal-900 transition-colors"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-xs text-emerald-700 flex items-center">
                    <Check className="w-3.5 h-3.5 mr-1" />
                    In Stock ({product.stockCount} available)
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-ivory-200 space-y-2.5">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-charcoal-900 hover:bg-charcoal-800 text-white text-xs uppercase tracking-wider font-medium py-3 px-4 rounded-sm flex items-center justify-center space-x-2 transition-colors"
                  >
                    <ShoppingBag className="w-4 h-4 text-champagne-400" />
                    <span>Add to Bag</span>
                  </button>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs uppercase tracking-wider font-medium py-3 px-4 rounded-sm flex items-center justify-center space-x-2 transition-colors shadow-xs"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Order on WhatsApp</span>
                  </a>
                </div>

                <div className="flex items-center justify-between pt-2 text-xs">
                  <button
                    onClick={() => toggleWishlist(product)}
                    className="text-charcoal-600 hover:text-rose-600 flex items-center space-x-1.5"
                  >
                    <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-600 text-rose-600' : ''}`} />
                    <span>{isFavorited ? 'In Wishlist' : 'Save to Wishlist'}</span>
                  </button>

                  <Link
                    href={`/product/${product.slug}`}
                    onClick={onClose}
                    className="text-champagne-700 hover:text-champagne-900 font-medium underline underline-offset-4"
                  >
                    View Full Product Details &rarr;
                  </Link>
                </div>

                {/* Trust mini-notes */}
                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-ivory-200 text-[11px] text-charcoal-500">
                  <div className="flex items-center space-x-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-champagne-600 shrink-0" />
                    <span>Authenticity Certified</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Truck className="w-3.5 h-3.5 text-champagne-600 shrink-0" />
                    <span>Free Insured Delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
