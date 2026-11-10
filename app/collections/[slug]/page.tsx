import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { COLLECTIONS } from '@/data/categories';
import { PRODUCTS } from '@/data/products';
import { CollectionDetailClient } from '@/components/collections/CollectionDetailClient';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return COLLECTIONS.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const collection = COLLECTIONS.find((c) => c.slug === params.slug);

  if (!collection) {
    return {
      title: 'Collection Not Found | MINOLI Haute Joaillerie',
    };
  }

  return {
    title: `${collection.name} | MINOLI Haute Joaillerie`,
    description: `${collection.tagline}. ${collection.description}`,
    openGraph: {
      title: `${collection.name} | MINOLI`,
      description: collection.description,
      images: [
        {
          url: collection.heroImage,
          width: 1200,
          height: 630,
          alt: collection.name,
        },
      ],
    },
  };
}

export default function CollectionPage({ params }: Props) {
  const collection = COLLECTIONS.find((c) => c.slug === params.slug);

  if (!collection) {
    return notFound();
  }

  const products = PRODUCTS.filter((p) => p.collections.includes(collection.id));

  return <CollectionDetailClient collection={collection} products={products} />;
}
