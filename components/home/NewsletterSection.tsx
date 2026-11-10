'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle2, MessageCircle, Sparkles } from 'lucide-react';
import { WHATSAPP_CONFIG } from '@/lib/whatsapp';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSuccess(true);
      setTimeout(() => {
        setEmail('');
      }, 4000);
    }
  };

  return (
    <section className="py-20 bg-ivory-200/80 border-t border-ivory-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-12 h-12 rounded-full bg-champagne-500/10 border border-champagne-500/30 flex items-center justify-center mx-auto mb-4 text-champagne-600">
          <Sparkles className="w-6 h-6" />
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-normal mb-3">
          Join the MINOLI Circle
        </h2>

        <p className="text-xs sm:text-sm text-charcoal-600 max-w-lg mx-auto font-light leading-relaxed mb-8">
          Receive exclusive previews of new seasonal collections, secret festive sales, and invitations to private bespoke trunk shows.
        </p>

        {isSuccess ? (
          <div className="max-w-md mx-auto bg-emerald-50 border border-emerald-200 rounded-sm p-4 flex items-center justify-center space-x-2 text-emerald-800 text-xs sm:text-sm animate-fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Welcome to MINOLI! Your subscription has been noted.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Mail className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="w-full bg-white border border-ivory-400 pl-10 pr-4 py-3.5 text-xs text-charcoal-900 placeholder-charcoal-400 rounded-sm focus:outline-none focus:border-champagne-600 shadow-xs"
              />
            </div>
            <button
              type="submit"
              className="bg-charcoal-900 hover:bg-champagne-600 text-white font-medium text-xs uppercase tracking-wider px-6 py-3.5 rounded-sm transition-colors shadow-xs shrink-0"
            >
              Subscribe
            </button>
          </form>
        )}

        <div className="mt-6 flex items-center justify-center space-x-2 text-xs text-charcoal-500">
          <span>Prefer direct WhatsApp alerts instead?</span>
          <a
            href={`https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodeURIComponent(
              "Hello MINOLI! Please add me to your WhatsApp VIP broadcast for new collection launches."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-700 hover:text-emerald-800 font-medium underline underline-offset-2 inline-flex items-center"
          >
            <MessageCircle className="w-3.5 h-3.5 mr-1" />
            Join WhatsApp VIP
          </a>
        </div>
      </div>
    </section>
  );
}
