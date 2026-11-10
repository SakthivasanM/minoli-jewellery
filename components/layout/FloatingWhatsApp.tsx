'use client';

import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { WHATSAPP_CONFIG } from '@/lib/whatsapp';

export function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Interactive Tooltip Card */}
      {isOpen && (
        <div className="mb-3 w-80 bg-white rounded-lg shadow-2xl border border-ivory-300 overflow-hidden animate-slide-up">
          {/* Header */}
          <div className="bg-charcoal-900 text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-champagne-600 flex items-center justify-center text-white font-serif font-semibold text-lg">
                  M
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-charcoal-900" />
              </div>
              <div>
                <h4 className="text-sm font-serif font-medium tracking-wide">
                  MINOLI Concierge
                </h4>
                <p className="text-[10px] text-emerald-400">
                  Online • Typically replies in 5 mins
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-ivory-400 hover:text-white p-1"
              aria-label="Close WhatsApp chat popup"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 bg-ivory-50 text-xs text-charcoal-700 space-y-3">
            <div className="bg-white p-3 rounded-lg shadow-xs border border-ivory-300/80 leading-relaxed">
              👋 Namaste! Welcome to <span className="font-semibold text-charcoal-900">MINOLI Haute Joaillerie</span>.
              <br /><br />
              Looking for bridal trousseau styling, custom ring sizes, or quick WhatsApp ordering? We are here to assist!
            </div>

            <a
              href={`https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodeURIComponent(
                "Hello MINOLI Concierge! I'm browsing your jewellery website and would like some guidance."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium py-2.5 px-4 rounded-md flex items-center justify-center space-x-2 shadow-xs transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Start WhatsApp Chat</span>
            </a>
          </div>

          <div className="px-4 py-2 bg-ivory-200/50 text-[10px] text-charcoal-500 text-center border-t border-ivory-300">
            Official MINOLI Verified Business Account
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <div className="relative flex items-center">
        {!isOpen && !hasInteracted && (
          <div className="hidden sm:flex items-center bg-white text-charcoal-900 text-xs font-medium px-3.5 py-2 rounded-full shadow-luxury border border-ivory-300 mr-3 animate-fade-in">
            <span>Order on WhatsApp ✨</span>
          </div>
        )}

        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setHasInteracted(true);
          }}
          aria-label="Chat with MINOLI jewellery concierge on WhatsApp"
          className="relative bg-emerald-600 hover:bg-emerald-500 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-luxury transition-all duration-300 hover:scale-105 group focus:outline-none focus:ring-4 focus:ring-emerald-300/40"
        >
          {/* Subtle radar pulse ring */}
          <span className="absolute -inset-1 rounded-full bg-emerald-500/30 animate-ping -z-10" />

          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageCircle className="w-7 h-7 group-hover:rotate-6 transition-transform" />
          )}

          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-champagne-400 border-2 border-white rounded-full" />
        </button>
      </div>
    </div>
  );
}
