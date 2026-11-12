'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
    <footer className="bg-gradient-to-b from-[#FAF0E6] via-[#F4E3D1] to-[#EED7C0] text-[#3A0C14] pt-16 pb-12 border-t border-[#C89F72]/45">
      {/* Brand Value Pillars */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 border-b border-[#C89F72]/35">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center sm:text-left">
          <div className="flex items-center space-x-4 justify-center sm:justify-start">
            <div className="w-12 h-12 rounded-full bg-[#E8D0B5]/60 border border-[#B88746]/45 flex items-center justify-center shrink-0 text-[#87582B]">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-serif text-sm font-medium text-[#3A0C14] tracking-wide">
                Artisanal Craftsmanship
              </h5>
              <p className="text-xs text-[#5C4438] mt-0.5">
                Every piece handcrafted with 22K/18K micron gold & polki.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4 justify-center sm:justify-start">
            <div className="w-12 h-12 rounded-full bg-[#E8D0B5]/60 border border-[#B88746]/45 flex items-center justify-center shrink-0 text-[#87582B]">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-serif text-sm font-medium text-[#3A0C14] tracking-wide">
                Insured Express Shipping
              </h5>
              <p className="text-xs text-[#5C4438] mt-0.5">
                Complimentary tamper-proof door-to-door delivery.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4 justify-center sm:justify-start">
            <div className="w-12 h-12 rounded-full bg-[#E8D0B5]/60 border border-[#B88746]/45 flex items-center justify-center shrink-0 text-[#87582B]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-serif text-sm font-medium text-[#3A0C14] tracking-wide">
                Signature Luxury Unboxing
              </h5>
              <p className="text-xs text-[#5C4438] mt-0.5">
                Encased in royal wine velvet, suede pouch & gold seal box.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4 justify-center sm:justify-start">
            <div className="w-12 h-12 rounded-full bg-[#E8D0B5]/60 border border-[#B88746]/45 flex items-center justify-center shrink-0 text-[#87582B]">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-serif text-sm font-medium text-[#3A0C14] tracking-wide">
                Concierge Ordering
              </h5>
              <p className="text-xs text-[#5C4438] mt-0.5">
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
            <Link href="/" className="inline-flex items-center space-x-3 mb-5 group" aria-label="MINOLI Home">
              <div className="relative w-11 h-11 rounded-xl overflow-hidden border border-[#B88746]/60 shadow-xs ring-1 ring-[#EAD5BE] bg-[#FAF0E6] flex-shrink-0 group-hover:scale-105 transition-transform">
                <Image
                  src="/images/Logo/Brandemblem.jpg"
                  alt="MINOLI Emblem"
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </div>
              <div>
                <span className="font-serif text-2xl font-semibold tracking-[0.2em] text-[#3A0C14] block leading-tight group-hover:text-[#87582B] transition-colors">
                  MINOLI
                </span>
                <span className="text-[9px] tracking-[0.32em] uppercase text-[#9A6B3B] font-semibold block">
                  Haute Joaillerie
                </span>
              </div>
            </Link>
            <p className="text-xs text-[#5C4438] leading-relaxed max-w-sm mb-6">
              MINOLI designs heirloom jewellery celebrating quiet luxury and Indian regal heritage. From heritage uncut Polki suites to everyday waterproof gold chains, each piece is crafted for your most cherished moments.
            </p>

            {/* Newsletter Subscription Box */}
            <div className="bg-[#FAF2E9]/90 p-4 rounded-sm border border-[#C89F72]/40 shadow-soft">
              <p className="text-xs font-serif font-medium text-[#87582B] mb-1">
                The MINOLI Journal
              </p>
              <p className="text-[11px] text-[#5C4438] mb-3">
                Be the first to preview limited private collections and bridal edits.
              </p>

              {isSubscribed ? (
                <div className="flex items-center space-x-2 text-xs text-emerald-800 bg-emerald-50 p-2 rounded-sm border border-emerald-200">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
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
                    className="w-full bg-white/90 border border-[#D4B490] px-3 py-2 text-xs text-[#3A0C14] placeholder-[#8C7060] rounded-l-sm focus:outline-none focus:border-[#9A6B3B]"
                  />
                  <button
                    type="submit"
                    className="bg-[#4A0B18] hover:bg-[#601222] text-[#FAF0E6] font-medium px-4 text-xs rounded-r-sm transition-colors flex items-center justify-center shrink-0"
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
            <h6 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#87582B] mb-4">
              Jewellery Styles
            </h6>
            <ul className="space-y-2 text-xs text-[#5C4438]">
              {CATEGORIES.slice(0, 6).map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/shop?category=${c.id}`}
                    className="hover:text-[#4A0B18] transition-colors block py-0.5"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Curated Collections */}
          <div>
            <h6 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#87582B] mb-4">
              Collections
            </h6>
            <ul className="space-y-2 text-xs text-[#5C4438]">
              {COLLECTIONS.map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/collections/${c.slug}`}
                    className="hover:text-[#4A0B18] transition-colors block py-0.5"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/about"
                  className="hover:text-[#4A0B18] transition-colors block py-0.5 text-[#87582B] font-medium"
                >
                  Our Craftsmanship
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & WhatsApp */}
          <div>
            <h6 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#87582B] mb-4">
              Concierge & Store
            </h6>
            <ul className="space-y-3 text-xs text-[#5C4438]">
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-[#9A6B3B] shrink-0 mt-0.5" />
                <span className="leading-snug">{WHATSAPP_CONFIG.address}</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-[#9A6B3B] shrink-0" />
                <span>{WHATSAPP_CONFIG.displayPhone}</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-[#9A6B3B] shrink-0" />
                <span>{WHATSAPP_CONFIG.email}</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Clock className="w-4 h-4 text-[#9A6B3B] shrink-0" />
                <span>{WHATSAPP_CONFIG.supportHours}</span>
              </li>
            </ul>

            <div className="mt-5 pt-4 border-t border-[#C89F72]/35">
              <a
                href={`https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodeURIComponent(
                  "Hello MINOLI! I have an order query."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-[#4A0B18] hover:bg-[#601222] text-[#FAF0E6] border border-[#B88746]/50 px-3.5 py-2 rounded-sm text-xs font-medium transition-colors shadow-xs"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp Order Support</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sub-footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-[#C89F72]/35 text-[#6B5042] text-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p>© {new Date().getFullYear()} MINOLI Jewellery. All Rights Reserved. Crafted with elegance.</p>
        </div>

        {/* Social Icons */}
        <div className="flex items-center space-x-4">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#6B5042] hover:text-[#4A0B18] transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#6B5042] hover:text-[#4A0B18] transition-colors"
            aria-label="Facebook"
          >
            <Facebook className="w-4 h-4" />
          </a>
          <a
            href={`https://wa.me/${WHATSAPP_CONFIG.phoneNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#6B5042] hover:text-[#4A0B18] transition-colors"
            aria-label="WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
