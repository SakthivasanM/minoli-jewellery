'use client';

import React, { useState } from 'react';
import {
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Instagram,
  Sparkles,
} from 'lucide-react';
import { WHATSAPP_CONFIG } from '@/lib/whatsapp';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Enquiry',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setErrorMessage('');
    setIsSubmitted(true);
  };

  const handleWhatsAppDirect = () => {
    let msg = `✨ *ENQUIRY - MINOLI* ✨\n\n`;
    msg += `Name: ${formData.name || 'Website Visitor'}\n`;
    if (formData.phone) msg += `Phone: ${formData.phone}\n`;
    if (formData.email) msg += `Email: ${formData.email}\n`;
    msg += `Topic: ${formData.subject}\n\n`;
    msg += `Message: ${formData.message || 'I would like to inquire about your jewellery collections.'}\n`;

    const url = `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header Banner */}
      <div className="bg-ivory-100/70 border-b border-ivory-300 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[11px] uppercase tracking-[0.25em] text-champagne-700 font-semibold block mb-2">
            Jewellery Concierge
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-charcoal-900 font-normal">
            We Are Here to Assist You
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-600 max-w-xl mx-auto font-light mt-3 leading-relaxed">
            Whether you need custom bridal sizing, styling consultation for an occasion, or direct WhatsApp ordering assistance, our jewellery advisors are at your service.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Contact Details & Direct WhatsApp Card (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            {/* Primary WhatsApp Card */}
            <div className="bg-emerald-50 border border-emerald-200/80 p-6 sm:p-8 rounded-sm shadow-soft">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-emerald-950">
                    Direct WhatsApp Concierge
                  </h3>
                  <p className="text-xs text-emerald-700">
                    Fastest response: within 5 - 15 minutes
                  </p>
                </div>
              </div>

              <p className="text-xs text-emerald-900 leading-relaxed mb-6 font-light">
                Chat with our master stylists for HD close-up videos of jewellery pieces, customized bangle & ring sizes, or to place orders directly.
              </p>

              <a
                href={`https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodeURIComponent(
                  "Hello MINOLI Concierge! I'm reaching out from your website contact page."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs uppercase tracking-wider py-3.5 px-4 rounded-sm flex items-center justify-center space-x-2 shadow-xs transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp: {WHATSAPP_CONFIG.displayPhone}</span>
              </a>
            </div>

            {/* Boutique & Contact Information */}
            <div className="space-y-6 text-xs text-charcoal-700 bg-ivory-50 p-6 sm:p-8 rounded-sm border border-ivory-300">
              <h3 className="font-serif text-base font-semibold text-charcoal-900 pb-2 border-b border-ivory-300">
                Maison Address & Hours
              </h3>

              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-champagne-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-charcoal-900 block mb-0.5">
                    Flagship Atelier
                  </span>
                  <p className="text-charcoal-600 leading-relaxed">
                    {WHATSAPP_CONFIG.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-champagne-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-charcoal-900 block mb-0.5">
                    Hours of Operation
                  </span>
                  <p className="text-charcoal-600">
                    {WHATSAPP_CONFIG.supportHours}
                  </p>
                  <p className="text-[10px] text-charcoal-400 mt-0.5">
                    Sunday by prior private appointment
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-champagne-600 shrink-0" />
                <div>
                  <span className="font-semibold text-charcoal-900 block mb-0.5">
                    Email Correspondence
                  </span>
                  <a
                    href={`mailto:${WHATSAPP_CONFIG.email}`}
                    className="text-charcoal-600 hover:text-champagne-700"
                  >
                    {WHATSAPP_CONFIG.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-champagne-600 shrink-0" />
                <div>
                  <span className="font-semibold text-charcoal-900 block mb-0.5">
                    Direct Phone Line
                  </span>
                  <p className="text-charcoal-600">
                    {WHATSAPP_CONFIG.displayPhone}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-ivory-300">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-champagne-700 hover:text-champagne-800 font-medium"
                >
                  <Instagram className="w-4 h-4" />
                  <span>Follow @minoli.jewellery on Instagram</span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form Column (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 sm:p-10 rounded-sm border border-ivory-300 shadow-soft">
              <h2 className="font-serif text-2xl font-normal text-charcoal-900 mb-2">
                Send Us a Message
              </h2>
              <p className="text-xs text-charcoal-500 font-light mb-8">
                Fill in the form below and our client services team will respond within 24 hours.
              </p>

              {isSubmitted ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-sm p-6 text-center space-y-4 animate-fade-in">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-lg font-medium text-emerald-950">
                    Thank You, {formData.name}!
                  </h3>
                  <p className="text-xs text-emerald-800 max-w-sm mx-auto leading-relaxed">
                    We have received your message regarding &quot;{formData.subject}&quot;. Our jewellery concierge will respond to your email at {formData.email} promptly.
                  </p>

                  <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={handleWhatsAppDirect}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs uppercase tracking-wider py-2.5 px-4 rounded-sm font-medium flex items-center justify-center space-x-2 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Send via WhatsApp as Well</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          subject: 'General Enquiry',
                          message: '',
                        });
                      }}
                      className="text-xs text-charcoal-600 underline py-2"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  {errorMessage && (
                    <div className="bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-sm text-xs">
                      {errorMessage}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-charcoal-700 uppercase tracking-wider text-[10px] font-semibold mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Radhika Sharma"
                        required
                        className="w-full bg-ivory-50 border border-ivory-300 px-3.5 py-3 rounded-sm text-charcoal-900 focus:outline-none focus:border-champagne-600"
                      />
                    </div>

                    <div>
                      <label className="block text-charcoal-700 uppercase tracking-wider text-[10px] font-semibold mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. radhika@example.com"
                        required
                        className="w-full bg-ivory-50 border border-ivory-300 px-3.5 py-3 rounded-sm text-charcoal-900 focus:outline-none focus:border-champagne-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-charcoal-700 uppercase tracking-wider text-[10px] font-semibold mb-1">
                        Phone / WhatsApp Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full bg-ivory-50 border border-ivory-300 px-3.5 py-3 rounded-sm text-charcoal-900 focus:outline-none focus:border-champagne-600"
                      />
                    </div>

                    <div>
                      <label className="block text-charcoal-700 uppercase tracking-wider text-[10px] font-semibold mb-1">
                        Inquiry Topic
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full bg-ivory-50 border border-ivory-300 px-3.5 py-3 rounded-sm text-charcoal-900 focus:outline-none focus:border-champagne-600 cursor-pointer"
                      >
                        <option value="General Enquiry">General Enquiry</option>
                        <option value="Bridal Trousseau Styling">Bridal Trousseau Styling</option>
                        <option value="Custom Size / Length Order">Custom Size / Length Order</option>
                        <option value="WhatsApp Order Assistance">WhatsApp Order Assistance</option>
                        <option value="Bulk / Gifting Consultation">Bulk / Gifting Consultation</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-charcoal-700 uppercase tracking-wider text-[10px] font-semibold mb-1">
                      Your Message *
                    </label>
                    <textarea
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share details of the jewellery pieces you are interested in, wedding dates, or styling queries..."
                      required
                      className="w-full bg-ivory-50 border border-ivory-300 p-3.5 rounded-sm text-charcoal-900 focus:outline-none focus:border-champagne-600"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      type="submit"
                      className="flex-1 bg-charcoal-900 hover:bg-champagne-600 text-white font-medium text-xs uppercase tracking-wider py-3.5 px-6 rounded-sm transition-colors flex items-center justify-center space-x-2 shadow-xs"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleWhatsAppDirect}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs uppercase tracking-wider py-3.5 px-6 rounded-sm transition-colors flex items-center justify-center space-x-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Send via WhatsApp</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
