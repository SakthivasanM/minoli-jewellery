import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { PRODUCTS } from '@/data/products';
import { ProductDetailClient } from '@/components/products/ProductDetailClient';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = PRODUCTS.find((p) => p.slug === params.slug);

  if (!product) {
    return {
      title: 'Jewellery Not Found | MINOLI Haute Joaillerie',
    };
  }

  return {
    title: `${product.name} | MINOLI Haute Joaillerie`,
    description: `${product.tagline || product.name} - Handcrafted in ${product.material}. Available with direct WhatsApp order concierge at MINOLI.`,
    openGraph: {
      title: `${product.name} - ₹${product.price.toLocaleString('en-IN')} | MINOLI`,
      description: product.description,
      images: [
        {
          url: product.images[0],
          width: 800,
          height: 1000,
          alt: product.name,
        },
      ],
    },
  };
}

export default function ProductPage({ params }: Props) {
  const product = PRODUCTS.find((p) => p.slug === params.slug);

  if (!product) {
    return notFound();
  }

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}
