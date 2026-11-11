'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Heart,
  ShoppingBag,
  MessageCircle,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  ChevronRight,
  Share2,
  Check,
  Gift,
} from 'lucide-react';
import { Product } from '@/types';
import { ProductCard } from '@/components/products/ProductCard';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { formatPrice, generateProductWhatsAppUrl, WHATSAPP_CONFIG } from '@/lib/whatsapp';

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColour, setSelectedColour] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [currentUrl, setCurrentUrl] = useState('');
  const [copiedShare, setCopiedShare] = useState(false);

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const currentSize = selectedSize || product.availableSizes?.[0] || 'Standard';
  const currentColour = selectedColour || product.availableColours?.[0] || 'Champagne Gold';
  const isFavorited = isInWishlist(product.id);

  const whatsappUrl = generateProductWhatsAppUrl({
    product,
    selectedSize: currentSize,
    selectedColour: currentColour,
    quantity,
    currentUrl,
  });

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${product.name} | MINOLI Haute Joaillerie`,
        text: product.tagline,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="bg-ivory-100/60 border-b border-ivory-300 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center space-x-2 text-xs text-charcoal-500">
          <Link href="/" className="hover:text-champagne-700">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-charcoal-400" />
          <Link href="/shop" className="hover:text-champagne-700">Shop</Link>
          <ChevronRight className="w-3.5 h-3.5 text-charcoal-400" />
          <Link href={`/shop?category=${product.category}`} className="hover:text-champagne-700 capitalize">
            {product.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-charcoal-400" />
          <span className="text-charcoal-900 font-medium truncate max-w-xs">{product.name}</span>
        </div>
      </nav>

      {/* Main Product Showcase Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Gallery Column (7 cols) */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto shrink-0 pb-2 md:pb-0">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`relative w-18 h-22 sm:w-20 sm:h-24 rounded-sm overflow-hidden border-2 transition-all ${
                      activeImageIdx === idx
                        ? 'border-champagne-600 ring-2 ring-champagne-400/30 shadow-xs'
                        : 'border-ivory-300 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} - view ${idx + 1}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Main Featured Image */}
            <div className="relative flex-1 aspect-[4/5] min-h-[380px] rounded-sm overflow-hidden bg-ivory-100 border border-ivory-300 shadow-soft group">
              <Image
                src={product.images[activeImageIdx] || product.images[0]}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Badges on main image */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                {product.isBestSeller && (
                  <span className="bg-charcoal-900 text-champagne-400 text-xs font-semibold px-2.5 py-1 rounded-xs uppercase tracking-wider shadow-sm">
                    Best Seller
                  </span>
                )}
                {product.discountPercent && (
                  <span className="bg-rose-700 text-white text-xs font-bold px-2.5 py-1 rounded-xs shadow-sm">
                    Save {product.discountPercent}%
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Details & WhatsApp Ordering Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-champagne-700">
                  {product.category}
                </span>
                <div className="flex items-center space-x-1 text-amber-500">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-semibold text-xs text-charcoal-800">{product.rating}</span>
                  <span className="text-[11px] text-charcoal-400">({product.reviewCount} reviews)</span>
                </div>
              </div>

              {/* Title & SKU */}
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-charcoal-900 leading-snug">
                {product.name}
              </h1>
              <p className="text-xs text-charcoal-400 font-mono mt-1">
                Product ID: <span className="font-semibold text-charcoal-700">{product.id}</span>
              </p>

              {/* Price */}
              <div className="flex items-baseline space-x-3 mt-4 pb-4 border-b border-ivory-200">
                <span className="font-serif text-2xl sm:text-3xl font-semibold text-charcoal-900">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-base text-charcoal-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                <span className="text-xs text-emerald-700 font-medium">
                  Tax included • Insured Shipping
                </span>
              </div>

              {/* Tagline & Description */}
              <div className="py-4 space-y-2">
                {product.tagline && (
                  <p className="text-xs font-semibold uppercase tracking-wider text-champagne-800">
                    {product.tagline}
                  </p>
                )}
                <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed font-light">
                  {product.description}
                </p>
              </div>

              {/* Colours / Finish */}
              {product.availableColours && product.availableColours.length > 0 && (
                <div className="py-3 border-t border-ivory-200">
                  <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal-800 mb-2">
                    Finish / Plating: <span className="text-champagne-700">{currentColour}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.availableColours.map((c) => (
                      <button
                        key={c}
                        onClick={() => setSelectedColour(c)}
                        className={`text-xs px-3.5 py-2 rounded-sm border transition-all ${
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

              {/* Sizes */}
              {product.availableSizes && product.availableSizes.length > 0 && (
                <div className="py-3 border-t border-ivory-200">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs uppercase tracking-wider font-semibold text-charcoal-800">
                      Size: <span className="text-champagne-700">{currentSize}</span>
                    </label>
                    <a
                      href={`https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodeURIComponent(
                        `Hello MINOLI! Can you assist me with sizing for ${product.name}?`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-champagne-700 hover:underline"
                    >
                      Need sizing help?
                    </a>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.availableSizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`text-xs px-3.5 py-2 rounded-sm border transition-all ${
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

              {/* Quantity Selector */}
              <div className="py-3 border-t border-ivory-200 flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase tracking-wider font-semibold text-charcoal-800 block mb-1">
                    Quantity
                  </span>
                  <div className="flex items-center border border-ivory-400 rounded-sm">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3.5 py-2 text-charcoal-700 hover:text-charcoal-950 hover:bg-ivory-200 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="px-4 text-xs font-semibold text-charcoal-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3.5 py-2 text-charcoal-700 hover:text-charcoal-950 hover:bg-ivory-200 transition-colors"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs text-emerald-700 font-medium flex items-center justify-end">
                    <Check className="w-3.5 h-3.5 mr-1" />
                    In Stock
                  </span>
                  <p className="text-[10px] text-charcoal-400 mt-0.5">
                    Ships in 24 - 48 Hours
                  </p>
                </div>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="pt-6 border-t border-ivory-200 space-y-3">
              {/* ORDER ON WHATSAPP BUTTON */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs sm:text-sm uppercase tracking-[0.18em] py-4 px-6 rounded-sm shadow-luxury flex items-center justify-center space-x-2.5 transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5 shrink-0" />
                <span>Order on WhatsApp</span>
              </a>

              {/* Add to Bag and Wishlist Grid */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() =>
                    addToCart(product, {
                      size: currentSize,
                      colour: currentColour,
                      quantity,
                    })
                  }
                  className="w-full bg-charcoal-900 hover:bg-charcoal-800 text-white font-medium text-xs uppercase tracking-wider py-3.5 px-4 rounded-sm flex items-center justify-center space-x-2 transition-colors"
                >
                  <ShoppingBag className="w-4 h-4 text-champagne-400" />
                  <span>Add to Bag</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product)}
                  className={`w-full text-xs uppercase tracking-wider font-medium py-3.5 px-4 rounded-sm border flex items-center justify-center space-x-2 transition-all ${
                    isFavorited
                      ? 'border-rose-300 bg-rose-50 text-rose-700'
                      : 'border-ivory-400 text-charcoal-800 hover:border-charcoal-900'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-600 text-rose-600' : ''}`} />
                  <span>{isFavorited ? 'In Wishlist' : 'Wishlist'}</span>
                </button>
              </div>

              {/* Share */}
              <div className="text-center pt-1">
                <button
                  onClick={handleShare}
                  className="text-xs text-charcoal-500 hover:text-champagne-700 inline-flex items-center space-x-1"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copiedShare ? 'Link Copied to Clipboard!' : 'Share with Friends'}</span>
                </button>
              </div>

              {/* Guarantee badges */}
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-ivory-200 text-center text-[10px] text-charcoal-500">
                <div className="p-2 bg-ivory-50 rounded-sm">
                  <ShieldCheck className="w-4 h-4 text-champagne-600 mx-auto mb-1" />
                  <span>Authentic Hallmarked</span>
                </div>
                <div className="p-2 bg-ivory-50 rounded-sm">
                  <Truck className="w-4 h-4 text-champagne-600 mx-auto mb-1" />
                  <span>Free Insured Courier</span>
                </div>
                <div className="p-2 bg-ivory-50 rounded-sm">
                  <RotateCcw className="w-4 h-4 text-champagne-600 mx-auto mb-1" />
                  <span>Transit Warranty</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Product Specifications */}
        <div className="mt-16 sm:mt-24 pt-12 border-t border-ivory-300">
          <h2 className="font-serif text-2xl sm:text-3xl text-charcoal-900 font-normal mb-8 text-center">
            Craftsmanship & Specifications
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-ivory-100/60 p-6 rounded-sm border border-ivory-300">
              <h3 className="font-serif text-base font-semibold text-charcoal-900 mb-3 flex items-center">
                <Sparkles className="w-4 h-4 text-champagne-600 mr-2" />
                Materials & Purity
              </h3>
              <dl className="text-xs space-y-2 text-charcoal-600">
                <div>
                  <dt className="text-charcoal-400 uppercase tracking-wider text-[10px]">Material Base:</dt>
                  <dd className="font-medium text-charcoal-900">{product.material}</dd>
                </div>
                {product.purity && (
                  <div>
                    <dt className="text-charcoal-400 uppercase tracking-wider text-[10px]">Purity / Plating:</dt>
                    <dd className="font-medium text-charcoal-900">{product.purity}</dd>
                  </div>
                )}
                {product.weight && (
                  <div>
                    <dt className="text-charcoal-400 uppercase tracking-wider text-[10px]">Weight:</dt>
                    <dd className="font-medium text-charcoal-900">{product.weight}</dd>
                  </div>
                )}
                {product.dimensions && (
                  <div>
                    <dt className="text-charcoal-400 uppercase tracking-wider text-[10px]">Dimensions:</dt>
                    <dd className="font-medium text-charcoal-900">{product.dimensions}</dd>
                  </div>
                )}
              </dl>
            </div>

            <div className="bg-ivory-100/60 p-6 rounded-sm border border-ivory-300">
              <h3 className="font-serif text-base font-semibold text-charcoal-900 mb-3 flex items-center">
                <ShieldCheck className="w-4 h-4 text-champagne-600 mr-2" />
                Jewellery Care Advice
              </h3>
              <ul className="text-xs space-y-2 text-charcoal-600 list-disc list-inside">
                {product.careInstructions?.map((ci, i) => (
                  <li key={i}>{ci}</li>
                )) || (
                  <>
                    <li>Store separately in the MINOLI soft velvet pouch.</li>
                    <li>Avoid direct contact with perfumes, sanitizers, and pool chlorine.</li>
                    <li>Wipe with a soft cotton microfiber cloth after every wear.</li>
                  </>
                )}
              </ul>
            </div>

            <div className="bg-ivory-100/70 p-6 rounded-xl border border-ivory-300 flex flex-col sm:flex-row items-center gap-5">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden border border-champagne-300/60 shadow-md shrink-0">
                <Image
                  src="/images/Logo/BrandPackage.jpg"
                  alt="MINOLI Signature Packaging"
                  fill
                  sizes="112px"
                  className="object-cover"
                />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="font-serif text-base font-semibold text-charcoal-900 mb-1.5 flex items-center justify-center sm:justify-start">
                  <Gift className="w-4 h-4 text-champagne-600 mr-2" />
                  Signature Luxury Packaging
                </h3>
                <p className="text-xs text-charcoal-600 leading-relaxed mb-2">
                  Every creation arrives encased in our signature Cashmere Gift Box lined with Royal Wine Velvet, complemented by a gold-foiled seal, suede travel pouch, and Certificate of Authenticity.
                </p>
                <p className="text-xs font-semibold text-charcoal-900 flex items-center justify-center sm:justify-start">
                  <Truck className="w-3.5 h-3.5 text-champagne-600 mr-1.5" />
                  <span>Complimentary Insured Delivery: 2 - 4 Business Days</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-16 border-t border-ivory-300">
            <div className="text-center mb-10">
              <span className="text-[11px] uppercase tracking-[0.25em] text-champagne-700 font-semibold block mb-1">
                You May Also Admire
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-charcoal-900 font-normal">
                Complementary Pieces
              </h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
