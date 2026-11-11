"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  MessageCircle,
  ChevronDown,
  Sparkles,
  Phone,
  Clock,
  ArrowRight,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { CATEGORIES, COLLECTIONS } from "@/data/categories";
import { WHATSAPP_CONFIG } from "@/lib/whatsapp";

interface HeaderProps {
  onOpenSearch: () => void;
}

export function Header({ onOpenSearch }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollectionsHovered, setIsCollectionsHovered] = useState(false);
  const [mobileCollectionsOpen, setMobileCollectionsOpen] = useState(false);
  const pathname = usePathname();
  const { totalItems, setIsCartOpen } = useCart();
  const { totalWishlistItems, setIsWishlistOpen } = useWishlist();

  // Scroll listener for sticky compact header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard shortcut listener for Cmd+K / Ctrl+K search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenSearch();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onOpenSearch]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsCollectionsHovered(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop All", href: "/shop" },
    { name: "Collections", href: "/collections", hasDropdown: true },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-ivory-300/80 py-2.5"
          : "bg-white border-b border-ivory-300 py-3 lg:py-3.5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Mobile menu & search toggle */}
          <div className="flex items-center lg:hidden space-x-1">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -ml-2 rounded-lg text-charcoal-700 hover:text-champagne-600 hover:bg-ivory-100 transition-colors"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <button
              onClick={onOpenSearch}
              className="p-2 rounded-lg text-charcoal-700 hover:text-champagne-600 hover:bg-ivory-100 transition-colors"
              aria-label="Search jewellery"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Luxury Brand Lockup: Monogram Medallion + Serif Typography */}
          <div className="flex-1 lg:flex-initial flex justify-center lg:justify-start">
            <Link
              href="/"
              className="group flex items-center space-x-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne-400 rounded-lg p-0.5"
              aria-label="MINOLI Haute Joaillerie Home"
            >
              {/* Gold Monogram Silk Medallion */}
              <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden border border-champagne-300/80 shadow-xs ring-1 ring-champagne-100/60 flex-shrink-0 group-hover:scale-105 group-hover:border-champagne-500 transition-all duration-300 bg-ivory-100">
                <Image
                  src="/images/Logo/Brandemblem.jpg"
                  alt="MINOLI Emblem"
                  fill
                  sizes="48px"
                  className="object-cover"
                  priority
                />
              </div>

              {/* Brand Typography */}
              <div className="flex flex-col text-left">
                <div className="flex items-center space-x-1.5">
                  <span className="font-serif text-xl sm:text-2xl font-semibold tracking-[0.2em] text-charcoal-900 leading-none group-hover:text-champagne-700 transition-colors">
                    MINOLI
                  </span>
                  <Sparkles className="w-3 h-3 text-champagne-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <span className="text-[8px] sm:text-[9px] tracking-[0.32em] uppercase text-champagne-600 font-medium mt-1 leading-none">
                  Haute Joaillerie
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav
            className="hidden lg:flex items-center space-x-7 xl:space-x-8"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));

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
                      className={`inline-flex items-center text-[12px] xl:text-[13px] tracking-[0.14em] uppercase transition-colors font-medium relative py-1 ${
                        isActive
                          ? "text-champagne-600 font-semibold"
                          : "text-charcoal-700 hover:text-champagne-600"
                      }`}
                    >
                      {link.name}
                      <ChevronDown
                        className={`w-3.5 h-3.5 ml-1 transition-transform duration-200 ${
                          isCollectionsHovered
                            ? "rotate-180 text-champagne-600"
                            : "text-charcoal-400 group-hover:text-champagne-500"
                        }`}
                      />
                      {isActive && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-champagne-600 rounded-full" />
                      )}
                    </Link>

                    {/* Mega Dropdown Menu */}
                    {isCollectionsHovered && (
                      <div className="absolute top-full -left-20 w-[600px] bg-white shadow-xl rounded-xl border border-ivory-300 p-6 z-50 animate-fade-in grid grid-cols-2 gap-6">
                        <div>
                          <div className="flex items-center justify-between border-b border-ivory-300 pb-2 mb-3">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-champagne-600">
                              Curated Collections
                            </p>
                            <span className="text-[10px] text-charcoal-400 font-medium">
                              {COLLECTIONS.length} Edits
                            </span>
                          </div>
                          <ul className="space-y-2.5">
                            {COLLECTIONS.map((c) => (
                              <li key={c.id}>
                                <Link
                                  href={`/collections/${c.slug}`}
                                  className="group/item block text-xs text-charcoal-700 hover:text-champagne-600 transition-colors p-1.5 -mx-1.5 rounded-lg hover:bg-ivory-100/70"
                                >
                                  <span className="font-serif font-medium group-hover/item:translate-x-1 inline-block transition-transform text-charcoal-900 group-hover/item:text-champagne-700">
                                    {c.name}
                                  </span>
                                  <span className="block text-[11px] text-charcoal-400 font-sans truncate">
                                    {c.tagline}
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-ivory-100/80 p-5 rounded-xl border border-ivory-300 flex flex-col justify-between">
                          <div>
                            <div className="inline-flex items-center space-x-1 text-[10px] uppercase tracking-widest text-champagne-700 font-semibold bg-champagne-100/80 px-2 py-0.5 rounded-full mb-2.5">
                              <Sparkles className="w-2.5 h-2.5 text-champagne-600" />
                              <span>Featured Suite</span>
                            </div>
                            <h4 className="font-serif text-sm font-semibold text-charcoal-900 mb-1.5">
                              The Royal Wedding Suite
                            </h4>
                            <p className="text-xs text-charcoal-600 leading-relaxed">
                              Heirloom Polki chokers and uncut Kundan suites
                              crafted for timeless Indian bridal celebrations.
                            </p>
                          </div>
                          <div className="mt-4 pt-3 border-t border-ivory-300/60">
                            <Link
                              href="/collections/wedding"
                              className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-champagne-700 hover:text-champagne-800 group/link"
                            >
                              <span>Explore Bridal</span>
                              <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover/link:translate-x-1 transition-transform" />
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
                  className={`text-[12px] xl:text-[13px] tracking-[0.14em] uppercase transition-colors font-medium relative py-1 ${
                    isActive
                      ? "text-champagne-600 font-semibold"
                      : "text-charcoal-700 hover:text-champagne-600"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-champagne-600 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Header Action Elements */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Desktop Quick Search Pill */}
            <button
              onClick={onOpenSearch}
              className="hidden xl:flex items-center space-x-2 bg-ivory-100 hover:bg-ivory-200/80 text-charcoal-400 hover:text-charcoal-700 border border-ivory-300 px-3.5 py-1.5 rounded-full text-xs transition-all w-44 lg:w-48 justify-between group focus:outline-none focus:ring-2 focus:ring-champagne-400"
              title="Search jewellery (⌘K or Ctrl+K)"
              aria-label="Open search modal"
            >
              <span className="flex items-center space-x-2 truncate">
                <Search className="w-3.5 h-3.5 text-champagne-600 group-hover:scale-110 transition-transform shrink-0" />
                <span className="text-charcoal-500 text-[11px] font-normal truncate">
                  Search jewellery...
                </span>
              </span>
              <kbd className="text-[9px] bg-white border border-ivory-300 text-charcoal-400 px-1.5 py-0.5 rounded shadow-2xs font-mono font-medium">
                ⌘K
              </kbd>
            </button>

            {/* Desktop Icon-only Search Button (between lg and xl) */}
            <button
              onClick={onOpenSearch}
              className="hidden lg:flex xl:hidden p-2 rounded-full text-charcoal-700 hover:text-champagne-600 hover:bg-ivory-100 transition-colors"
              aria-label="Search jewellery"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Button with Counter Badge */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2 rounded-full text-charcoal-700 hover:text-champagne-600 hover:bg-ivory-100 transition-colors"
              aria-label={`Wishlist with ${totalWishlistItems} saved items`}
              title="View Wishlist"
            >
              <Heart className="w-5 h-5" />
              {totalWishlistItems > 0 && (
                <span className="absolute 0 top-0.5 right-0.5 bg-champagne-600 text-white text-[10px] min-w-4 h-4 px-1 rounded-full flex items-center justify-center font-semibold shadow-xs">
                  {totalWishlistItems}
                </span>
              )}
            </button>

            {/* Shopping Bag Button with Counter Badge */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-full text-charcoal-700 hover:text-champagne-600 hover:bg-ivory-100 transition-colors"
              aria-label={`Shopping bag with ${totalItems} items`}
              title="View Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-charcoal-900 text-champagne-300 text-[10px] min-w-4 h-4 px-1 rounded-full flex items-center justify-center font-semibold shadow-xs ring-1 ring-white">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Direct WhatsApp Concierge CTA in Authentic Emerald Green */}
            <a
              href={`https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodeURIComponent(
                "Hello MINOLI! I'd like to consult with your jewellery concierge about your designs."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-1.5 rounded-full text-xs font-medium shadow-xs hover:shadow-md transition-all active:scale-95 group"
              title={`Chat with MINOLI concierge on WhatsApp: ${WHATSAPP_CONFIG.displayPhone}`}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-200 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
              </span>
              <MessageCircle className="w-3.5 h-3.5 fill-white text-emerald-600 group-hover:scale-110 transition-transform" />
              <span className="tracking-wide">WhatsApp</span>
              <span className="hidden 2xl:inline text-[10px] bg-emerald-700/90 text-emerald-100 px-1.5 py-0.5 rounded-full">
                Online
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Slide-out Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop blur */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-fade-in"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer container */}
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-2xl z-50 flex flex-col justify-between overflow-y-auto animate-slide-right">
            <div>
              {/* Drawer Brand Header */}
              <div className="p-4 border-b border-ivory-300 flex items-center justify-between bg-ivory-50/70">
                <Link
                  href="/"
                  className="flex items-center space-x-2.5"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="relative w-9 h-9 rounded-lg overflow-hidden border border-champagne-300/80 shadow-xs">
                    <Image
                      src="/images/Logo/Brandemblem.jpg"
                      alt="MINOLI Emblem"
                      fill
                      sizes="36px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="font-serif text-lg font-semibold tracking-[0.18em] text-charcoal-900 block leading-tight">
                      MINOLI
                    </span>
                    <span className="text-[8px] tracking-[0.25em] uppercase text-champagne-600 block">
                      Haute Joaillerie
                    </span>
                  </div>
                </Link>

                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 text-charcoal-500 hover:text-charcoal-900 rounded-full hover:bg-ivory-200"
                  aria-label="Close navigation menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Quick Search Bar */}
              <div className="p-4 border-b border-ivory-200">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenSearch();
                  }}
                  className="w-full flex items-center space-x-2.5 bg-ivory-100 text-charcoal-500 text-xs px-3.5 py-2.5 rounded-lg border border-ivory-300 hover:bg-ivory-200/80 transition-colors"
                >
                  <Search className="w-4 h-4 text-champagne-600" />
                  <span>Search rings, necklaces, bridal...</span>
                </button>
              </div>

              {/* Mobile Main Navigation Links */}
              <div className="px-4 py-3">
                <p className="text-[10px] uppercase tracking-widest text-charcoal-400 font-semibold mb-2">
                  Navigation
                </p>
                <nav className="space-y-1">
                  <Link
                    href="/"
                    className="flex items-center justify-between text-sm font-medium text-charcoal-800 hover:text-champagne-600 py-2 px-2 rounded-lg hover:bg-ivory-100 transition-colors"
                  >
                    <span>Home</span>
                  </Link>

                  <Link
                    href="/shop"
                    className="flex items-center justify-between text-sm font-medium text-charcoal-800 hover:text-champagne-600 py-2 px-2 rounded-lg hover:bg-ivory-100 transition-colors"
                  >
                    <span>Shop All Jewellery</span>
                    <span className="text-[10px] bg-champagne-100 text-champagne-700 px-2 py-0.5 rounded-full font-medium">
                      All Items
                    </span>
                  </Link>

                  {/* Collections accordion */}
                  <div>
                    <button
                      onClick={() => setMobileCollectionsOpen(!mobileCollectionsOpen)}
                      className="w-full flex items-center justify-between text-sm font-medium text-charcoal-800 hover:text-champagne-600 py-2 px-2 rounded-lg hover:bg-ivory-100 transition-colors"
                    >
                      <span>Curated Collections</span>
                      <ChevronDown
                        className={`w-4 h-4 text-charcoal-400 transition-transform ${
                          mobileCollectionsOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {mobileCollectionsOpen && (
                      <div className="pl-4 pr-2 py-1 space-y-1 bg-ivory-50/80 rounded-lg mt-1 border border-ivory-200">
                        {COLLECTIONS.map((c) => (
                          <Link
                            key={c.id}
                            href={`/collections/${c.slug}`}
                            className="block text-xs text-charcoal-600 hover:text-champagne-600 py-1.5 px-2 rounded hover:bg-ivory-100"
                          >
                            {c.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  <Link
                    href="/about"
                    className="flex items-center justify-between text-sm font-medium text-charcoal-800 hover:text-champagne-600 py-2 px-2 rounded-lg hover:bg-ivory-100 transition-colors"
                  >
                    <span>About Us & Craft</span>
                  </Link>

                  <Link
                    href="/contact"
                    className="flex items-center justify-between text-sm font-medium text-charcoal-800 hover:text-champagne-600 py-2 px-2 rounded-lg hover:bg-ivory-100 transition-colors"
                  >
                    <span>Contact & Concierge</span>
                  </Link>

                  <Link
                    href="/wishlist"
                    className="flex items-center justify-between text-sm font-medium text-charcoal-800 hover:text-champagne-600 py-2 px-2 rounded-lg hover:bg-ivory-100 transition-colors"
                  >
                    <span className="flex items-center space-x-2">
                      <Heart className="w-4 h-4 text-champagne-600" />
                      <span>My Wishlist</span>
                    </span>
                    <span className="text-xs bg-champagne-100 text-champagne-700 px-2 py-0.5 rounded-full font-semibold">
                      {totalWishlistItems}
                    </span>
                  </Link>

                  <Link
                    href="/cart"
                    className="flex items-center justify-between text-sm font-medium text-charcoal-800 hover:text-champagne-600 py-2 px-2 rounded-lg hover:bg-ivory-100 transition-colors"
                  >
                    <span className="flex items-center space-x-2">
                      <ShoppingBag className="w-4 h-4 text-champagne-600" />
                      <span>Shopping Bag</span>
                    </span>
                    <span className="text-xs bg-charcoal-900 text-champagne-300 px-2 py-0.5 rounded-full font-semibold">
                      {totalItems}
                    </span>
                  </Link>
                </nav>
              </div>

              {/* Mobile Categories grid */}
              <div className="px-4 py-3 border-t border-ivory-200">
                <p className="text-[10px] uppercase tracking-widest text-charcoal-400 font-semibold mb-2">
                  Browse by Category
                </p>
                <div className="grid grid-cols-2 gap-1.5 text-xs">
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/shop?category=${cat.id}`}
                      className="text-charcoal-600 hover:text-champagne-600 py-1.5 px-2 rounded hover:bg-ivory-100 truncate"
                    >
                      {cat.name.split("&")[0]}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Drawer Footer with Direct WhatsApp Order CTA */}
            <div className="p-4 bg-ivory-100 border-t border-ivory-300 space-y-2.5">
              <a
                href={`https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodeURIComponent(
                  "Hello MINOLI! I would like to order jewellery via WhatsApp."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold py-3 px-4 rounded-xl flex items-center justify-center space-x-2 shadow-xs transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                <span>Chat on WhatsApp: {WHATSAPP_CONFIG.displayPhone}</span>
              </a>

              <div className="flex items-center justify-center space-x-3 text-[10px] text-charcoal-500">
                <span className="flex items-center space-x-1">
                  <Clock className="w-3 h-3 text-champagne-600" />
                  <span>Mon-Sat: 10AM-8PM</span>
                </span>
                <span>•</span>
                <span>Indiranagar, Bengaluru</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
