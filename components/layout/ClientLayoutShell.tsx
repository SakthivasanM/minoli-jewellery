'use client';

import React, { useState } from 'react';
import { AnnouncementBar } from './AnnouncementBar';
import { Header } from './Header';
import { Footer } from './Footer';
import { FloatingWhatsApp } from './FloatingWhatsApp';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { WishlistDrawer } from '@/components/wishlist/WishlistDrawer';
import { SearchModal } from '@/components/common/SearchModal';

export function ClientLayoutShell({ children }: { children: React.ReactNode }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <AnnouncementBar />
      <Header onOpenSearch={() => setIsSearchOpen(true)} />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <FloatingWhatsApp />
      <CartDrawer />
      <WishlistDrawer />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
