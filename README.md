# MINOLI – Haute Joaillerie Premium E-Commerce Website

A modern, elegant, luxury-inspired jewellery shopping experience designed for **MINOLI**. Built with Next.js 14 App Router, TypeScript, Tailwind CSS, Lucide React Icons, and Framer Motion. Featuring full static pre-rendering, interactive client-side shopping bag & wishlist persisted via `localStorage`, and deep WhatsApp order integration.

---

## ✨ Brand Identity & Aesthetic

- **Design Theme:** Haute Joaillerie, Minimalist, Elegant, Sophisticated, Contemporary Royal Heritage.
- **Color Palette:**
  - **Champagne Gold (`#C6A15B`)**: Primary brand accents, badges, luxury highlights.
  - **Warm Ivory (`#FAF7F0`)**: Secondary soft backgrounds and subtle contrast cards.
  - **Pure White (`#FFFFFF`)**: Crisp, modern canvas.
  - **Deep Charcoal (`#292929` / `#121212`)**: Refined typography and luxury headers/footers.
  - **Soft Beige (`#E9DFCF`)**: Muted borders and dividers.
- **Typography:**
  - **Playfair Display**: Elegant serif for brand headlines and luxury product titles.
  - **Poppins**: Clean, highly readable sans-serif for body copy, specs, and navigation.

---

## 💎 Key Features & Implementation

### 1. WhatsApp Ordering Architecture
- **Configurable Concierge Settings:** Defined centrally in `lib/whatsapp.ts`.
- **Single-Product Direct Orders:** Pre-fills product name, SKU, selected size, finish, quantity, price, and current URL into WhatsApp format:
  ```text
  ✨ ORDER ENQUIRY - MINOLI ✨
  Product: Aadhya Royal Polki Choker Set
  Product ID: MN-101
  Price: ₹8,499
  Quantity: 1
  Selected Size: Adjustable Dori (Free Size)
  Selected Finish: Champagne Gold
  ```
- **Cart-Based Bag Checkout:** Encodes entire shopping bag into a formatted bill ready for customer concierge verification.
- **Floating WhatsApp Concierge Button:** Persistent interactive concierge bubble on all pages with quick-start chat options.

### 2. Complete Catalogue & Filtering (`/shop`)
- Real-time product search by title, category, material, or keyword.
- Category filters (Necklaces, Earrings, Rings, Bangles, Bracelets, Bridal, Traditional, Daily Wear).
- Collection filters (Wedding, Festive, Everyday Elegance, Haute Solitaire, Heritage Kundan).
- Price range slider up to ₹25,000.
- Sorting options (Featured & Best Sellers, Newest Arrivals, Price Low-to-High, Price High-to-Low, Patron Rating).
- Desktop filter sidebar and mobile filter drawer.

### 3. Rich Product Details (`/product/[slug]`)
- Multi-image gallery with thumbnail navigation and zoom hover effects.
- Dynamic finish/plating and size selector.
- Live stock availability badge and shipping estimates.
- Quantity counter with real-time price calculation.
- Add to Bag & Wishlist persistence.
- Comprehensive specifications breakdown: Materials, Hallmark, Dimensions, Weight, Packaging & Jewellery Care instructions.
- Curated "Complementary Pieces" recommendations.

### 4. Interactive Shopping Bag & Vault
- **Slide-out Cart Drawer:** Available on every page via header bag icon with instant badge counter.
- **Dedicated Cart Page (`/cart`):** Full breakdown, free insured delivery guarantee, and WhatsApp checkout generation.
- **Saved Favourites Vault (`/wishlist`):** Dedicated page and drawer with instant "Move to Bag" and WhatsApp order options.
- **Persistent Storage:** Uses `localStorage` so items remain saved between visits.

### 5. Homepage Sections
1. **Announcement Bar:** Rotating promotional alerts with quick shop links.
2. **Navigation Header:** Sticky on scroll with mega-dropdown for collections, search modal trigger, wishlist and cart count badges.
3. **Hero Section:** High-resolution lifestyle imagery, typography, and call-to-actions.
4. **Shop by Category:** 8 interactive visual category cards.
5. **Featured Highlights:** Tabbed filterable product grid with Quick View modals.
6. **New Arrivals:** Fresh limited-run atelier editions.
7. **Promotional Banner:** Festive styling consultation showcase with WhatsApp booking.
8. **Best Sellers:** Most-loved pieces with 5-star verified customer ratings.
9. **Brand Story:** Deep narrative on MINOLI's artisanal karigar heritage.
10. **Customer Testimonials:** Responsive carousel with verified patron reviews.
11. **Instagram Atelier Diary:** Hoverable visual feed with like counts and direct look links.
12. **Newsletter Section:** Interactive VIP subscription form with instant feedback.
13. **Footer:** Comprehensive directory, boutique coordinates, support hours, and trust badges.

---

## 🛠️ Project Structure

```text
Jewellery_Wesite_UI/
├── app/
│   ├── about/page.tsx               # Brand Story & Artisans
│   ├── cart/page.tsx                # Dedicated Shopping Bag Page
│   ├── collections/
│   │   ├── [slug]/page.tsx          # Dynamic Collection View (Static SSG)
│   │   └── page.tsx                 # Curated Collections Index
│   ├── contact/page.tsx             # Contact & WhatsApp Concierge
│   ├── product/
│   │   └── [slug]/page.tsx          # Product Details Page (Static SSG)
│   ├── shop/page.tsx                # Filterable Catalogue & Search
│   ├── wishlist/page.tsx            # Saved Favourites Page
│   ├── globals.css                  # Tailwind styles & typography
│   ├── layout.tsx                   # Global Root Layout with Providers
│   ├── page.tsx                     # Luxury Landing Page
│   ├── robots.ts                    # SEO Robots.txt
│   └── sitemap.ts                   # Dynamic Sitemap generator
├── components/
│   ├── cart/CartDrawer.tsx          # Slide-out bag drawer
│   ├── collections/                 # Collection detail client view
│   ├── common/SearchModal.tsx       # Live search popup
│   ├── home/                        # Homepage component sections
│   ├── layout/                      # Header, Footer, Announcement, WhatsApp
│   ├── products/                    # ProductCard, QuickViewModal, Details
│   └── wishlist/WishlistDrawer.tsx  # Slide-out wishlist drawer
├── context/
│   ├── CartContext.tsx              # Shopping bag provider with localStorage
│   └── WishlistContext.tsx          # Wishlist provider with localStorage
├── data/
│   ├── categories.ts                # 8 Categories & 5 Collections
│   └── products.ts                  # 24 Sample luxury products + reviews
├── lib/
│   ├── utils.ts                     # Tailwind class merger
│   └── whatsapp.ts                  # WhatsApp URL & message generators
├── types/                           # TypeScript interfaces
├── next.config.mjs
├── tailwind.config.js
└── package.json
```

---

## 🚀 Running the Project

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build & Launch
```bash
npm run build
npm run start
```
All 41 static pages will be pre-compiled into optimized HTML and JavaScript chunks.
