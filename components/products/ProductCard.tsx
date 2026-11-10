'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Eye, ShoppingBag, MessageCircle, Star } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { formatPrice, generateProductWhatsAppUrl } from '@/lib/whatsapp';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
  priority?: boolean;
}

export function ProductCard({ product, onQuickView, priority = false }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const isFavorited = isInWishlist(product.id);
  const whatsappUrl = generateProductWhatsAppUrl({ product });
  const hasMultipleImages = product.images.length > 1;

  return (
    <div
      className="group relative bg-white border border-ivory-300 rounded-sm overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-luxury hover:border-champagne-500/40"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with Badges & Hover Actions */}
      <div className="relative aspect-4/5 w-full bg-ivory-100 overflow-hidden">
        {/* Main Product Image */}
        <Link href={`/product/${product.slug}`} className="block w-full h-full">
          <Image
            src={isHovered && hasMultipleImages ? product.images[1] : product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={priority}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Status Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {product.isBestSeller && (
            <span className="bg-charcoal-900 text-champagne-400 text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-xs shadow-xs">
              Best Seller
            </span>
          )}
          {product.isNewArrival && !product.isBestSeller && (
            <span className="bg-champagne-600 text-white text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-xs shadow-xs">
              New Arrival
            </span>
          )}
          {product.discountPercent && (
            <span className="bg-rose-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-xs shadow-xs">
              -{product.discountPercent}%
            </span>
          )}
        </div>

        {/* Wishlist Button (Always visible on top right) */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all z-10 ${
            isFavorited
              ? 'bg-rose-50 text-rose-600 shadow-sm'
              : 'bg-white/80 hover:bg-white text-charcoal-700 hover:text-rose-600 shadow-xs'
          }`}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-600' : ''}`} />
        </button>

        {/* Quick View Button (Desktop hover overlay) */}
        {onQuickView && (
          <div className="absolute bottom-2.5 inset-x-2.5 hidden sm:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
            <button
              onClick={() => onQuickView(product)}
              className="w-full bg-white/95 hover:bg-white text-charcoal-900 text-[11px] font-medium uppercase tracking-wider py-2 px-3 rounded-sm shadow-md flex items-center justify-center space-x-1.5 transition-colors border border-ivory-300"
            >
              <Eye className="w-3.5 h-3.5 text-champagne-600" />
              <span>Quick View</span>
            </button>
          </div>
        )}
      </div>

      {/* Product Information */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-[11px] text-charcoal-400 mb-1">
            <span className="uppercase tracking-widest text-[9px] text-champagne-700 font-semibold truncate">
              {product.category}
            </span>
            <div className="flex items-center space-x-0.5 text-amber-500">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="font-medium text-[10px] text-charcoal-700">{product.rating}</span>
            </div>
          </div>

          {/* Product Title */}
          <Link href={`/product/${product.slug}`} className="block">
            <h3 className="font-serif text-sm sm:text-base font-medium text-charcoal-900 hover:text-champagne-600 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {/* Material subtitle */}
          <p className="text-[11px] text-charcoal-500 line-clamp-1 mt-0.5">
            {product.material.split('with')[0]}
          </p>

          {/* Pricing */}
          <div className="flex items-baseline space-x-2 mt-2">
            <span className="font-serif text-sm sm:text-base font-semibold text-charcoal-900">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-charcoal-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons (Add to Bag & WhatsApp Order) */}
        <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-ivory-200">
          <button
            onClick={() => addToCart(product)}
            className="w-full bg-charcoal-900 hover:bg-charcoal-800 text-white text-[10px] sm:text-[11px] uppercase tracking-wider font-medium py-2 px-2 rounded-sm flex items-center justify-center space-x-1 transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-champagne-400 shrink-0" />
            <span className="truncate">Add to Bag</span>
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] sm:text-[11px] uppercase tracking-wider font-medium py-2 px-2 rounded-sm flex items-center justify-center space-x-1 transition-colors shadow-xs"
            title="Order directly on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
