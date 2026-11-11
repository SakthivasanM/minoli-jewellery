'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, MessageCircle, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice, generateCartWhatsAppUrl, WHATSAPP_CONFIG } from '@/lib/whatsapp';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, subtotal, totalItems } = useCart();

  const whatsappCheckoutUrl = generateCartWhatsAppUrl(cart, subtotal);

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] bg-white flex items-center justify-center py-20 px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full bg-ivory-200 text-charcoal-400 flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10 text-champagne-600" />
          </div>
          <h1 className="font-serif text-3xl font-medium text-charcoal-900 mb-2">
            Your Shopping Bag is Empty
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-500 font-light max-w-sm mx-auto mb-8 leading-relaxed">
            Discover our collection of handcrafted Polki chokers, cushion-cut solitaires, and everyday waterproof gold chains.
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
              Review Your Bag
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-normal">
              Shopping Bag ({totalItems} {totalItems === 1 ? 'item' : 'items'})
            </h1>
          </div>

          <button
            onClick={clearCart}
            className="text-xs text-charcoal-400 hover:text-rose-600 transition-colors mt-4 sm:mt-0 flex items-center self-start sm:self-auto"
          >
            <Trash2 className="w-3.5 h-3.5 mr-1" />
            Clear Bag
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Cart Table / Items List (8 cols) */}
          <div className="lg:col-span-8 divide-y divide-ivory-200">
            {cart.map((item) => (
              <div
                key={`${item.productId}-${item.selectedSize}-${item.selectedColour}`}
                className="py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex space-x-4 items-center">
                  <div className="relative w-20 h-24 sm:w-24 sm:h-28 rounded-sm overflow-hidden bg-ivory-100 border border-ivory-300 shrink-0">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-champagne-700 font-semibold">
                      {item.product.category}
                    </span>
                    <Link
                      href={`/product/${item.product.slug}`}
                      className="font-serif text-base font-medium text-charcoal-900 hover:text-champagne-600 transition-colors block line-clamp-1"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-xs text-charcoal-400 font-mono mt-0.5">
                      ID: {item.product.id}
                    </p>

                    <div className="text-xs text-charcoal-500 space-x-3 mt-1.5">
                      {item.selectedSize && <span>Size: <strong>{item.selectedSize}</strong></span>}
                      {item.selectedColour && <span>Finish: <strong>{item.selectedColour}</strong></span>}
                    </div>

                    <div className="font-serif text-sm font-semibold text-charcoal-900 mt-2 sm:hidden">
                      {formatPrice(item.product.price * item.quantity)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end sm:space-x-8 pt-2 sm:pt-0">
                  {/* Quantity controls */}
                  <div className="flex items-center border border-ivory-400 rounded-sm">
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.productId,
                          item.quantity - 1,
                          item.selectedSize,
                          item.selectedColour
                        )
                      }
                      className="p-1.5 text-charcoal-700 hover:bg-ivory-200 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-semibold text-charcoal-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.productId,
                          item.quantity + 1,
                          item.selectedSize,
                          item.selectedColour
                        )
                      }
                      className="p-1.5 text-charcoal-700 hover:bg-ivory-200 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Subtotal line */}
                  <div className="text-right hidden sm:block min-w-24">
                    <span className="font-serif text-base font-semibold text-charcoal-900">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                    <p className="text-[10px] text-charcoal-400">
                      {formatPrice(item.product.price)} each
                    </p>
                  </div>

                  {/* Remove button */}
                  <button
                    onClick={() =>
                      removeFromCart(item.productId, item.selectedSize, item.selectedColour)
                    }
                    className="text-charcoal-400 hover:text-rose-600 transition-colors p-1.5"
                    aria-label={`Remove ${item.product.name} from cart`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary & WhatsApp Checkout Card (4 cols) */}
          <div className="lg:col-span-4">
            <div className="bg-ivory-100/70 p-6 sm:p-8 rounded-sm border border-ivory-300 sticky top-28 space-y-6">
              <h2 className="font-serif text-lg font-medium text-charcoal-900 pb-3 border-b border-ivory-300">
                Order Summary
              </h2>

              <div className="space-y-3 text-xs text-charcoal-600">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-serif font-semibold text-charcoal-900 text-sm">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-emerald-700">
                  <span>Insured Express Courier</span>
                  <span className="font-medium">COMPLIMENTARY</span>
                </div>
                <div className="flex justify-between text-charcoal-500">
                  <span>Luxury Velvet Gift Box</span>
                  <span className="font-medium">COMPLIMENTARY</span>
                </div>
                <div className="flex justify-between text-charcoal-500">
                  <span>Certificate of Authenticity</span>
                  <span className="font-medium">INCLUDED</span>
                </div>
              </div>

              <div className="pt-4 border-t border-ivory-300 flex justify-between items-baseline">
                <div>
                  <span className="font-serif text-base font-semibold text-charcoal-900 block">
                    Estimated Total
                  </span>
                  <span className="text-[10px] text-charcoal-400">
                    Pay securely on confirmation
                  </span>
                </div>
                <span className="font-serif text-2xl font-bold text-charcoal-900">
                  {formatPrice(subtotal)}
                </span>
              </div>

              {/* Primary WhatsApp Checkout CTA */}
              <div className="space-y-3 pt-2">
                <a
                  href={whatsappCheckoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs uppercase tracking-[0.18em] py-4 px-4 rounded-sm flex items-center justify-center space-x-2 shadow-luxury transition-all"
                >
                  <MessageCircle className="w-5 h-5 shrink-0" />
                  <span>Checkout on WhatsApp</span>
                </a>

                <p className="text-[11px] text-charcoal-500 text-center leading-relaxed">
                  Clicking will open WhatsApp with your pre-filled order summary ready to send to our concierge team at {WHATSAPP_CONFIG.displayPhone}.
                </p>
              </div>

              {/* Guarantees */}
              <div className="pt-4 border-t border-ivory-300 space-y-2 text-xs text-charcoal-600">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-champagne-600 shrink-0" />
                  <span>100% Guaranteed 22K/18K Hallmark Finish</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Truck className="w-4 h-4 text-champagne-600 shrink-0" />
                  <span>Insured transit with real-time tracking</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-champagne-600 shrink-0" />
                  <span>Signature royal velvet gift box & suede travel pouch</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
