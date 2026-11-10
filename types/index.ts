export type CategoryId =
  | 'earrings'
  | 'necklaces'
  | 'rings'
  | 'bangles'
  | 'bracelets'
  | 'bridal'
  | 'traditional'
  | 'daily-wear';

export type CollectionId =
  | 'wedding'
  | 'festive'
  | 'everyday-elegance'
  | 'luxury'
  | 'traditional';

export interface Product {
  id: string;
  name: string;
  slug: string;
  tagline?: string;
  description: string;
  category: CategoryId;
  collections: CollectionId[];
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  images: string[];
  availableSizes?: string[];
  availableColours?: string[];
  material: string;
  purity?: string;
  inStock: boolean;
  stockCount: number;
  isFeatured: boolean;
  isNewArrival: boolean;
  isBestSeller: boolean;
  rating: number;
  reviewCount: number;
  dimensions?: string;
  weight?: string;
  careInstructions?: string[];
}

export interface Category {
  id: CategoryId;
  name: string;
  slug: string;
  description: string;
  image: string;
  accentColor?: string;
}

export interface Collection {
  id: CollectionId;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  heroImage: string;
}

export interface CartItem {
  productId: string;
  product: Product;
  selectedSize?: string;
  selectedColour?: string;
  quantity: number;
}

export interface WishlistItem {
  productId: string;
  product: Product;
  addedAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  comment: string;
  purchaseItem: string;
  verified: boolean;
}

export interface InstagramPost {
  id: string;
  imageUrl: string;
  caption: string;
  likes: number;
  tag: string;
  productSlug?: string;
}
