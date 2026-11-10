'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Truck,
  Sparkles,
  ArrowRight,
  Instagram,
  Facebook,
  CheckCircle2,
} from 'lucide-react';
import { CATEGORIES, COLLECTIONS } from '@/data/categories';
import { WHATSAPP_CONFIG } from '@/lib/whatsapp';

export function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setIsSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail('');
      }, 3000);
    }
  };

  return (
    <footer className="bg-charcoal-900 text-ivory-100 pt-16 pb-12 border-t border-champagne-500/20">
      {/* Brand Value Pillars */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 border-b border-charcoal-700">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center sm:text-left">
          <div className="flex items-center space-x-4 justify-center sm:justify-start">
            <div className="w-12 h-12 rounded-full bg-champagne-500/10 border border-champagne-500/30 flex items-center justify-center shrink-0 text-champagne-400">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-serif text-sm font-medium text-white tracking-wide">
                Artisanal Craftsmanship
              </h5>
              <p className="text-xs text-charcoal-300 mt-0.5">
                Every piece handcrafted with 22K/18K micron gold & polki.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4 justify-center sm:justify-start">
            <div className="w-12 h-12 rounded-full bg-champagne-500/10 border border-champagne-500/30 flex items-center justify-center shrink-0 text-champagne-400">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-serif text-sm font-medium text-white tracking-wide">
                Insured Express Shipping
              </h5>
              <p className="text-xs text-charcoal-300 mt-0.5">
                Complimentary tamper-proof door-to-door delivery.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4 justify-center sm:justify-start">
            <div className="w-12 h-12 rounded-full bg-champagne-500/10 border border-champagne-500/30 flex items-center justify-center shrink-0 text-champagne-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-serif text-sm font-medium text-white tracking-wide">
                Certified Authenticity
              </h5>
              <p className="text-xs text-charcoal-300 mt-0.5">
                Hypoallergenic, skin-safe, with hallmark warranty card.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4 justify-center sm:justify-start">
            <div className="w-12 h-12 rounded-full bg-champagne-500/10 border border-champagne-500/30 flex items-center justify-center shrink-0 text-champagne-400">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-serif text-sm font-medium text-white tracking-wide">
                Concierge Ordering
              </h5>
              <p className="text-xs text-charcoal-300 mt-0.5">
                Instant personal assistance and orders via WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info & Story */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block group mb-4">
              <span className="block font-serif text-2xl tracking-[0.25em] font-medium text-white group-hover:text-champagne-400 transition-colors">
                MINOLI
              </span>
              <span className="block text-[9px] tracking-[0.4em] uppercase text-champagne-400 font-sans">
                Haute Joaillerie
              </span>
            </Link>
            <p className="text-xs text-charcoal-300 leading-relaxed max-w-sm mb-6">
              MINOLI designs heirloom jewellery celebrating quiet luxury and Indian regal heritage. From heritage uncut Polki suites to everyday waterproof gold chains, each piece is crafted for your most cherished moments.
            </p>

            {/* Newsletter Subscription Box */}
            <div className="bg-charcoal-800/80 p-4 rounded-sm border border-charcoal-700">
              <p className="text-xs font-serif text-champagne-400 mb-1">
                The MINOLI Journal
              </p>
              <p className="text-[11px] text-charcoal-300 mb-3">
                Be the first to preview limited private collections and bridal edits.
              </p>

              {isSubscribed ? (
                <div className="flex items-center space-x-2 text-xs text-emerald-400 bg-emerald-950/40 p-2 rounded-sm border border-emerald-800">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Thank you for joining our private circle!</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="w-full bg-charcoal-900 border border-charcoal-600 px-3 py-2 text-xs text-white placeholder-charcoal-400 rounded-l-sm focus:outline-none focus:border-champagne-400"
                  />
                  <button
                    type="submit"
                    className="bg-champagne-600 hover:bg-champagne-500 text-charcoal-950 font-medium px-4 text-xs rounded-r-sm transition-colors flex items-center justify-center shrink-0"
                    aria-label="Subscribe to newsletter"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h6 className="text-xs font-semibold uppercase tracking-[0.2em] text-champagne-400 mb-4">
              Jewellery Styles
            </h6>
            <ul className="space-y-2 text-xs text-charcoal-300">
              {CATEGORIES.slice(0, 6).map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/shop?category=${c.id}`}
                    className="hover:text-champagne-400 transition-colors block py-0.5"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Curated Collections */}
          <div>
            <h6 className="text-xs font-semibold uppercase tracking-[0.2em] text-champagne-400 mb-4">
              Collections
            </h6>
            <ul className="space-y-2 text-xs text-charcoal-300">
              {COLLECTIONS.map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/collections/${c.slug}`}
                    className="hover:text-champagne-400 transition-colors block py-0.5"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/about"
                  className="hover:text-champagne-400 transition-colors block py-0.5 text-champagne-300"
                >
                  Our Craftsmanship
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & WhatsApp */}
          <div>
            <h6 className="text-xs font-semibold uppercase tracking-[0.2em] text-champagne-400 mb-4">
              Concierge & Store
            </h6>
            <ul className="space-y-3 text-xs text-charcoal-300">
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-champagne-500 shrink-0 mt-0.5" />
                <span className="leading-snug">{WHATSAPP_CONFIG.address}</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-champagne-500 shrink-0" />
                <span>{WHATSAPP_CONFIG.displayPhone}</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-champagne-500 shrink-0" />
                <span>{WHATSAPP_CONFIG.email}</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Clock className="w-4 h-4 text-champagne-500 shrink-0" />
                <span>{WHATSAPP_CONFIG.supportHours}</span>
              </li>
            </ul>

            <div className="mt-5 pt-4 border-t border-charcoal-700">
              <a
                href={`https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodeURIComponent(
                  "Hello MINOLI! I have an order query."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2 rounded-sm text-xs font-medium transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Order Support</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sub-footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-charcoal-800 text-charcoal-400 text-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p>© {new Date().getFullYear()} MINOLI Jewellery. All Rights Reserved. Crafted with elegance.</p>
        </div>

        {/* Social Icons */}
        <div className="flex items-center space-x-4">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-champagne-400 transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-champagne-400 transition-colors"
            aria-label="Facebook"
          >
            <Facebook className="w-4 h-4" />
          </a>
          <a
            href={`https://wa.me/${WHATSAPP_CONFIG.phoneNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-champagne-400 transition-colors"
            aria-label="WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
