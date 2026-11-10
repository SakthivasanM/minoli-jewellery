'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Search, Heart, ShoppingBag, Menu, X, MessageCircle, ChevronDown } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { CATEGORIES, COLLECTIONS } from '@/data/categories';
import { WHATSAPP_CONFIG } from '@/lib/whatsapp';

interface HeaderProps {
  onOpenSearch: () => void;
}

export function Header({ onOpenSearch }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollectionsHovered, setIsCollectionsHovered] = useState(false);
  const pathname = usePathname();
  const { totalItems, setIsCartOpen } = useCart();
  const { totalWishlistItems, setIsWishlistOpen } = useWishlist();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsCollectionsHovered(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop All', href: '/shop' },
    { name: 'Collections', href: '/collections', hasDropdown: true },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-soft border-b border-ivory-400/50 py-3'
          : 'bg-white border-b border-ivory-300 py-4 lg:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 text-charcoal-700 hover:text-champagne-600 transition-colors"
              aria-label="Open mobile menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <button
              onClick={onOpenSearch}
              className="p-2 text-charcoal-700 hover:text-champagne-600 transition-colors ml-1"
              aria-label="Search jewellery"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Brand Logo */}
          <div className="flex-1 lg:flex-initial flex justify-center lg:justify-start">
            <Link href="/" className="group focus:outline-none py-1">
              <Image
                src="/images/Logo/minoli-wordmark.png"
                alt="MINOLI Haute Joaillerie"
                width={508}
                height={144}
                sizes="(min-width: 1024px) 208px, 176px"
                className="w-44 sm:w-48 lg:w-52 h-auto group-hover:scale-[1.02] transition-transform duration-300"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));

              if (link.hasDropdown) {
                return (
                  <div
                    key={link.name}
                    className="relative group py-2"
                    onMouseEnter={() => setIsCollectionsHovered(true)}
                    onMouseLeave={() => setIsCollectionsHovered(false)}
                  >
                    <Link
                      href={link.href}
                      className={`inline-flex items-center text-xs tracking-[0.18em] uppercase transition-colors font-medium ${
                        isActive
                          ? 'text-champagne-600 border-b border-champagne-600 pb-0.5'
                          : 'text-charcoal-700 hover:text-champagne-600'
                      }`}
                    >
                      {link.name}
                      <ChevronDown className="w-3.5 h-3.5 ml-1 transition-transform group-hover:rotate-180 text-champagne-500" />
                    </Link>

                    {/* Mega Dropdown Menu */}
                    {isCollectionsHovered && (
                      <div className="absolute top-full -left-20 w-[580px] bg-white shadow-luxury rounded-sm border border-ivory-400/60 p-6 z-50 animate-fade-in grid grid-cols-2 gap-6">
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-champagne-600 mb-3 border-b border-ivory-300 pb-1.5">
                            Curated Collections
                          </p>
                          <ul className="space-y-2.5">
                            {COLLECTIONS.map((c) => (
                              <li key={c.id}>
                                <Link
                                  href={`/collections/${c.slug}`}
                                  className="group/item block text-xs text-charcoal-700 hover:text-champagne-600 transition-colors"
                                >
                                  <span className="font-serif font-medium group-hover/item:translate-x-1 inline-block transition-transform">
                                    {c.name}
                                  </span>
                                  <span className="block text-[10px] text-charcoal-300 font-sans truncate">
                                    {c.tagline}
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-ivory-100/70 p-4 rounded-sm border border-ivory-300 flex flex-col justify-between">
                          <div>
                            <span className="text-[10px] uppercase tracking-widest text-champagne-600 font-semibold block mb-1">
                              Featured Highlight
                            </span>
                            <h4 className="font-serif text-sm font-medium text-charcoal-900 mb-1">
                              The Royal Wedding Suite
                            </h4>
                            <p className="text-xs text-charcoal-500 leading-relaxed">
                              Heirloom Polki chokers and uncut Kundan suites crafted for timeless celebrations.
                            </p>
                          </div>
                          <div className="mt-4">
                            <Link
                              href="/collections/wedding"
                              className="text-[11px] font-medium uppercase tracking-wider text-champagne-600 hover:text-champagne-700 underline underline-offset-4"
                            >
                              Explore Bridal &rarr;
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-xs tracking-[0.18em] uppercase transition-colors font-medium ${
                    isActive
                      ? 'text-champagne-600 border-b border-champagne-600 pb-0.5'
                      : 'text-charcoal-700 hover:text-champagne-600'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Header Action Icons */}
          <div className="flex items-center space-x-4 sm:space-x-5">
            {/* Desktop Search Button */}
            <button
              onClick={onOpenSearch}
              className="hidden lg:flex items-center text-charcoal-700 hover:text-champagne-600 transition-colors p-1"
              aria-label="Search jewellery"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Button with Badge */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-1 text-charcoal-700 hover:text-champagne-600 transition-colors"
              aria-label={`Wishlist with ${totalWishlistItems} items`}
            >
              <Heart className="w-5 h-5" />
              {totalWishlistItems > 0 && (
                <span className="absolute -top-1 -right-1.5 bg-champagne-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium shadow-xs">
                  {totalWishlistItems}
                </span>
              )}
            </button>

            {/* Shopping Bag Button with Badge */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-1 text-charcoal-700 hover:text-champagne-600 transition-colors flex items-center"
              aria-label={`Shopping bag with ${totalItems} items`}
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1.5 bg-charcoal-900 text-champagne-400 text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-semibold shadow-xs">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Direct WhatsApp Concierge Link */}
            <a
              href={`https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodeURIComponent(
                "Hello MINOLI! I'd like to consult with your jewellery concierge about your designs."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center space-x-1.5 bg-ivory-200 hover:bg-champagne-500 hover:text-white text-charcoal-800 border border-champagne-500/40 px-3 py-1.5 rounded-full text-xs font-medium transition-all"
              title="Chat with WhatsApp Concierge"
            >
              <MessageCircle className="w-3.5 h-3.5 text-champagne-600 group-hover:text-white" />
              <span className="tracking-wide">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-xl z-50 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="p-5 border-b border-ivory-300 flex items-center justify-between bg-ivory-50/50">
                <div>
                  <Image
                    src="/images/Logo/minoli-wordmark.png"
                    alt="MINOLI Haute Joaillerie"
                    width={508}
                    height={144}
                    sizes="160px"
                    className="w-40 h-auto"
                  />
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 text-charcoal-500 hover:text-charcoal-900 rounded-full"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="px-5 py-4">
                <p className="text-[10px] uppercase tracking-widest text-charcoal-400 font-semibold mb-3">
                  Menu
                </p>
                <nav className="space-y-3">
                  <Link
                    href="/"
                    className="block text-sm font-medium text-charcoal-800 hover:text-champagne-600 py-1"
                  >
                    Home
                  </Link>
                  <Link
                    href="/shop"
                    className="block text-sm font-medium text-charcoal-800 hover:text-champagne-600 py-1"
                  >
                    All Jewellery
                  </Link>
                  <Link
                    href="/collections"
                    className="block text-sm font-medium text-charcoal-800 hover:text-champagne-600 py-1"
                  >
                    Curated Collections
                  </Link>
                  <Link
                    href="/about"
                    className="block text-sm font-medium text-charcoal-800 hover:text-champagne-600 py-1"
                  >
                    Brand Story & Craft
                  </Link>
                  <Link
                    href="/contact"
                    className="block text-sm font-medium text-charcoal-800 hover:text-champagne-600 py-1"
                  >
                    Contact & Boutiques
                  </Link>
                  <Link
                    href="/wishlist"
                    className="block text-sm font-medium text-charcoal-800 hover:text-champagne-600 py-1 flex items-center justify-between"
                  >
                    <span>My Wishlist</span>
                    <span className="text-xs bg-ivory-300 px-2 py-0.5 rounded-full text-charcoal-700">
                      {totalWishlistItems}
                    </span>
                  </Link>
                  <Link
                    href="/cart"
                    className="block text-sm font-medium text-charcoal-800 hover:text-champagne-600 py-1 flex items-center justify-between"
                  >
                    <span>Shopping Bag</span>
                    <span className="text-xs bg-champagne-500 text-white px-2 py-0.5 rounded-full">
                      {totalItems}
                    </span>
                  </Link>
                </nav>
              </div>

              <div className="px-5 py-4 border-t border-ivory-300">
                <p className="text-[10px] uppercase tracking-widest text-charcoal-400 font-semibold mb-3">
                  Categories
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/shop?category=${cat.id}`}
                      className="text-charcoal-600 hover:text-champagne-600 py-1 truncate"
                    >
                      {cat.name.split('&')[0]}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Footer in drawer */}
            <div className="p-5 bg-ivory-100 border-t border-ivory-300">
              <a
                href={`https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodeURIComponent(
                  "Hello MINOLI! I would like to order jewellery via WhatsApp."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-champagne-600 hover:bg-champagne-700 text-white text-xs uppercase tracking-wider font-medium py-3 px-4 rounded-sm flex items-center justify-center space-x-2 shadow-xs transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
              <p className="text-[10px] text-charcoal-400 text-center mt-3">
                Need sizing or styling advice? Speak with our gemologists.
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
