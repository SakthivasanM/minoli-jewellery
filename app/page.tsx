import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { ShopByCategory } from '@/components/home/ShopByCategory';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { NewArrivals } from '@/components/home/NewArrivals';
import { PromotionalBanner } from '@/components/home/PromotionalBanner';
import { BestSellers } from '@/components/home/BestSellers';
import { BrandStory } from '@/components/home/BrandStory';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { InstagramGallery } from '@/components/home/InstagramGallery';
import { NewsletterSection } from '@/components/home/NewsletterSection';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 3. Hero Section */}
      <HeroSection />

      {/* 4. Shop by Category */}
      <ShopByCategory />

      {/* 5. Featured Products */}
      <FeaturedProducts />

      {/* 6. New Arrivals */}
      <NewArrivals />

      {/* 7. Promotional Banner */}
      <PromotionalBanner />

      {/* 8. Best Sellers */}
      <BestSellers />

      {/* 9. Brand Story */}
      <BrandStory />

      {/* 10. Customer Testimonials */}
      <TestimonialsSection />

      {/* 11. Instagram / Social Gallery */}
      <InstagramGallery />

      {/* 12. Newsletter Section */}
      <NewsletterSection />
    </div>
  );
}
