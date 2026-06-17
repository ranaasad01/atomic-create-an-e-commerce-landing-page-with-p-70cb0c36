// ─── Brand constants ────────────────────────────────────────────────────────
export const BRAND_NAME = "Amazon";
export const BRAND_TAGLINE = "Curated quality, delivered to your door.";
export const BRAND_EMAIL = "hello@lumiere.shop";

// ─── Navigation (single source of truth) ────────────────────────────────────
// All hrefs point to on-page anchors — no separate routes exist yet.
export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Shop", href: "#products" },
  { label: "Categories", href: "#categories" },
  { label: "Sale", href: "#sale" },
  { label: "About", href: "#newsletter" },
];

export const navCTA = {
  label: "View Cart",
  href: "#cart-icon",
};

// ─── Shared TypeScript types ─────────────────────────────────────────────────
export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  badge?: "Sale" | "New" | "Hot" | "Limited";
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export type Category = "All" | "Fashion" | "Electronics" | "Lifestyle" | "Home";