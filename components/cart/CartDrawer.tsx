'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, MessageCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice, generateCartWhatsAppUrl } from '@/lib/whatsapp';

export function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, subtotal, totalItems } = useCart();

  if (!isCartOpen) return null;

  const whatsappCheckoutUrl = generateCartWhatsAppUrl(cart, subtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-5 border-b border-ivory-300 flex items-center justify-between bg-ivory-50">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-champagne-600" />
              <h3 className="font-serif text-lg font-medium text-charcoal-900">
                Your Shopping Bag ({totalItems})
              </h3>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-charcoal-500 hover:text-charcoal-900 rounded-full transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-ivory-200">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-ivory-200 flex items-center justify-center mb-4 text-charcoal-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-base font-medium text-charcoal-800 mb-1">
                  Your shopping bag is empty
                </h4>
                <p className="text-xs text-charcoal-500 max-w-xs mb-6">
                  Explore our handcrafted polki chokers, diamond rings, and everyday gold jewelry.
                </p>
                <Link
                  href="/shop"
                  onClick={() => setIsCartOpen(false)}
                  className="bg-charcoal-900 hover:bg-champagne-600 text-white text-xs uppercase tracking-wider font-medium py-3 px-6 rounded-sm transition-colors"
                >
                  Explore Jewellery
                </Link>
              </div>
            ) : (
              cart.map((item) => (
                <div key={`${item.productId}-${item.selectedSize}-${item.selectedColour}`} className="py-4 flex space-x-4">
                  {/* Thumbnail Image */}
                  <div className="relative w-20 h-24 shrink-0 rounded-sm overflow-hidden bg-ivory-100 border border-ivory-300">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
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
                          href={`/product/${item.product.slug}`}
                          onClick={() => setIsCartOpen(false)}
                          className="font-serif text-sm font-medium text-charcoal-900 hover:text-champagne-600 transition-colors line-clamp-1"
                        >
                          {item.product.name}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.productId, item.selectedSize, item.selectedColour)}
                          className="text-charcoal-400 hover:text-rose-600 transition-colors ml-2 p-1"
                          aria-label={`Remove ${item.product.name} from cart`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-[11px] text-charcoal-500 space-y-0.5 mt-1">
                        {item.selectedSize && <div>Size: {item.selectedSize}</div>}
                        {item.selectedColour && <div>Finish: {item.selectedColour}</div>}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-ivory-400 rounded-sm">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1, item.selectedSize, item.selectedColour)}
                          className="p-1 text-charcoal-600 hover:text-charcoal-900 hover:bg-ivory-200 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 text-xs font-medium text-charcoal-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1, item.selectedSize, item.selectedColour)}
                          className="p-1 text-charcoal-600 hover:text-charcoal-900 hover:bg-ivory-200 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="font-serif text-sm font-semibold text-charcoal-900">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Actions */}
          {cart.length > 0 && (
            <div className="p-5 bg-ivory-100/90 border-t border-ivory-300 space-y-4">
              <div className="space-y-1.5 text-xs text-charcoal-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-serif font-semibold text-charcoal-900 text-sm">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-emerald-700">
                  <span>Delivery</span>
                  <span>Complimentary Insured Delivery</span>
                </div>
              </div>

              {/* Order via WhatsApp Button */}
              <a
                href={whatsappCheckoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs uppercase tracking-wider font-medium py-3.5 px-4 rounded-sm flex items-center justify-center space-x-2 shadow-luxury transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Order Bag on WhatsApp</span>
              </a>

              {/* View Full Cart Page */}
              <div className="flex items-center justify-between text-xs pt-1">
                <Link
                  href="/cart"
                  onClick={() => setIsCartOpen(false)}
                  className="text-charcoal-700 hover:text-champagne-600 underline underline-offset-4 flex items-center"
                >
                  <span>View Shopping Bag Details</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Link>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-charcoal-500 hover:text-charcoal-900"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
