"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Star, ArrowRight, Check, Truck, Shield, RefreshCw, Sparkles, Heart, Eye, ChevronRight, Mail } from 'lucide-react';
import { BRAND_NAME, BRAND_TAGLINE, BRAND_EMAIL } from "@/lib/data";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";

// ─── Inline mock data ────────────────────────────────────────────────────────

const products = [
  {
    id: 1,
    name: "Merino Wool Crewneck",
    category: "Fashion",
    price: 128,
    originalPrice: 180,
    rating: 4.8,
    reviewCount: 342,
    image: "https://brooksbrothers.bynder.com/match/WebName/XS00054_BLACK/",
    badge: "Sale",
    description: "Ultra-soft 100% merino wool. Timeless silhouette, season-less warmth.",
  },
  {
    id: 2,
    name: "Ceramic Pour-Over Set",
    category: "Home",
    price: 89,
    rating: 4.9,
    reviewCount: 218,
    image: "https://m.media-amazon.com/images/I/7159+ELcEOL._AC_UF894,1000_QL80_.jpg",
    badge: "New",
    description: "Hand-thrown stoneware dripper and carafe. Ritual-worthy mornings.",
  },
  {
    id: 3,
    name: "Leather Card Wallet",
    category: "Lifestyle",
    price: 64,
    rating: 4.7,
    reviewCount: 509,
    image: "https://buffalojackson.com/cdn/shop/files/roosevekt-buffalo-leather-grain-ID-wallet-1-lifestyle_2000x.jpg?v=1755630456",
    badge: "Hot",
    description: "Full-grain vegetable-tanned leather. Slim profile, holds up to 8 cards.",
  },
  {
    id: 4,
    name: "Wireless Noise-Cancelling Headphones",
    category: "Electronics",
    price: 249,
    originalPrice: 320,
    rating: 4.9,
    reviewCount: 1204,
    image: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/225cab32-5648-4e6b-8c7b-be0fd1bf7ed7.jpg;maxHeight=828;maxWidth=400?format=webp",
    badge: "Sale",
    description: "40-hour battery, adaptive ANC, premium drivers. Pure audio bliss.",
  },
  {
    id: 5,
    name: "Linen Throw Blanket",
    category: "Home",
    price: 74,
    rating: 4.6,
    reviewCount: 187,
    image: "https://i.etsystatic.com/17725177/r/il/a96f8f/2359898473/il_fullxfull.2359898473_j791.jpg",
    badge: "New",
    description: "Stonewashed European linen. Breathable, cozy, and endlessly stylish.",
  },
  {
    id: 6,
    name: "Minimalist Leather Watch",
    category: "Fashion",
    price: 195,
    originalPrice: 240,
    rating: 4.8,
    reviewCount: 763,
    image: "https://m.media-amazon.com/images/I/81ywK1KP0oL._AC_UY350_.jpg",
    badge: "Sale",
    description: "Swiss quartz movement, sapphire crystal glass, Italian leather strap.",
  },
  {
    id: 7,
    name: "Bamboo Desk Organizer",
    category: "Home",
    price: 48,
    rating: 4.5,
    reviewCount: 294,
    image: "https://meedenart.com/cdn/shop/files/1-07_a24e45f6-ae9b-4b15-b218-cc80ca127696_1600x.png?v=1732685200",
    description: "Sustainably sourced bamboo. Five compartments, cable management slot.",
  },
  {
    id: 8,
    name: "Scented Soy Candle",
    category: "Lifestyle",
    price: 36,
    rating: 4.7,
    reviewCount: 621,
    image: "https://www.slownorth.com/cdn/shop/files/NonToxicCandle-EL.jpg?v=1744649880&width=2500",
    badge: "Hot",
    description: "Amber & vanilla, 60-hour burn time. Hand-poured in small batches.",
  },
];

const categories = [
  { name: "Fashion", count: 124, image: "https://static01.nyt.com/images/2024/02/06/multimedia/FASHION-PREVIEW-gmkt/FASHION-PREVIEW-gmkt-mobileMasterAt3x.jpg?auto=webp&quality=90", color: "from-rose-400 to-pink-600" },
  { name: "Electronics", count: 87, image: "https://static01.nyt.com/images/2024/02/06/multimedia/FASHION-PREVIEW-gmkt/FASHION-PREVIEW-gmkt-mobileMasterAt3x.jpg?auto=webp&quality=90", color: "from-blue-400 to-indigo-600" },
  { name: "Lifestyle", count: 203, image: "https://static01.nyt.com/images/2024/02/06/multimedia/FASHION-PREVIEW-gmkt/FASHION-PREVIEW-gmkt-mobileMasterAt3x.jpg?auto=webp&quality=90", color: "from-amber-400 to-orange-500" },
  { name: "Home", count: 156, image: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Arduino_ftdi_chip-1.jpg", color: "from-emerald-400 to-teal-600" },
];

const valueProps = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Complimentary delivery on all orders over $75. Express options available at checkout.",
  },
  {
    icon: Shield,
    title: "2-Year Guarantee",
    description: "Every product is backed by our quality promise. If it fails, we replace it — no questions asked.",
  },
  {
    icon: RefreshCw,
    title: "30-Day Returns",
    description: "Changed your mind? Return anything within 30 days for a full refund, hassle-free.",
  },
  {
    icon: Sparkles,
    title: "Curated Selection",
    description: "Our buyers travel the world to source only the finest, most thoughtfully designed products.",
  },
];

const reviews = [
  {
    id: 1,
    name: "Sophie Laurent",
    location: "Paris, France",
    avatar: "https://thecuratedselections.com/wp-content/uploads/2024/03/The_Curated_Selections_LOGO-1-2048x1523.png",
    rating: 5,
    text: "The merino crewneck is absolutely divine. The quality far exceeds what I expected at this price point — I've already ordered two more colors.",
    product: "Merino Wool Crewneck",
  },
  {
    id: 2,
    name: "James Okafor",
    location: "London, UK",
    avatar: "https://achiya.org/wp-content/uploads/writers/james-okafor-4d4bc7.webp",
    rating: 5,
    text: "My headphones arrived beautifully packaged. The sound quality is extraordinary and the ANC is the best I've ever experienced. Worth every penny.",
    product: "Wireless Noise-Cancelling Headphones",
  },
  {
    id: 3,
    name: "Mia Tanaka",
    location: "Tokyo, Japan",
    avatar: "https://i.ytimg.com/vi/CPSGSWsJiHs/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLD5AtERh39jtpwwG9rwKwWIsEbnNg",
    rating: 5,
    text: "Lumière has completely changed how I shop online. Every item I've ordered has been exactly as described — often even better. Truly curated quality.",
    product: "Ceramic Pour-Over Set",
  },
];

const stats = [
  { value: "50K+", label: "Happy Customers" },
  { value: "1,200+", label: "Curated Products" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "40+", label: "Countries Served" },
];

const badgeColors: Record<string, string> = {
  Sale: "bg-rose-500 text-white",
  New: "bg-emerald-500 text-white",
  Hot: "bg-orange-500 text-white",
  Limited: "bg-violet-500 text-white",
};

// ─── Sub-components (inline) ─────────────────────────────────────────────────

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3.5 h-3.5 ${
              star <= Math.round(rating)
                ? "fill-amber-400 text-amber-400"
                : "fill-neutral-200 text-neutral-200"
            }`}
          />
        ))}
      </div>
      <span className="text-xs text-neutral-500">({count.toLocaleString()})</span>
    </div>
  );
}

function ProductCard({ product }: { product: (typeof products)[0] }) {
  const [wishlisted, setWishlisted] = useState(false);
  const discount =
    product.originalPrice
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-neutral-100"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Overlay actions */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setWishlisted((v) => !v)}
            className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-colors ${
              wishlisted ? "bg-rose-500 text-white" : "bg-white text-neutral-600"
            }`}
            aria-label="Add to wishlist"
          >
            <Heart className={`w-4 h-4 ${wishlisted ? "fill-white" : ""}`} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-9 h-9 rounded-full bg-white text-neutral-600 flex items-center justify-center shadow-md"
            aria-label="Quick view"
          >
            <Eye className="w-4 h-4" />
          </motion.button>
        </div>
        {/* Badge */}
        {product.badge && (
          <span
            className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${badgeColors[product.badge] ?? "bg-neutral-800 text-white"}`}
          >
            {product.badge}
            {discount && product.badge === "Sale" ? ` −${discount}%` : ""}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-xs font-medium text-indigo-500 uppercase tracking-wider mb-1">
          {product.category}
        </p>
        <h3 className="font-semibold text-neutral-900 text-sm leading-snug mb-1">
          {product.name}
        </h3>
        <p className="text-xs text-neutral-500 leading-relaxed mb-3 line-clamp-2">
          {product.description}
        </p>
        <StarRating rating={product.rating} count={product.reviewCount} />
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-neutral-900">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-neutral-400 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-3.5 py-2 rounded-xl transition-colors duration-200 shadow-sm shadow-indigo-200"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Add
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const categoryFilters = ["All", "Fashion", "Electronics", "Lifestyle", "Home"];

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  const saleProducts = products.filter((p) => p.badge === "Sale");

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  }

  return (
    <main className="overflow-x-hidden">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-indigo-50/40 to-violet-50/60 pt-20">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-indigo-100/60 to-violet-100/60 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-rose-100/40 to-orange-100/40 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left copy */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-indigo-100 rounded-full px-4 py-2 text-sm font-medium text-indigo-600 shadow-sm mb-6">
              <Sparkles className="w-4 h-4" />
              New arrivals just landed
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-neutral-900 leading-[1.05] mb-6"
            >
              Discover{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                curated
              </span>{" "}
              quality.
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg text-neutral-600 leading-relaxed max-w-lg mx-auto lg:mx-0 mb-8"
            >
              {BRAND_TAGLINE} From fashion to home essentials, every product in our collection is hand-selected for exceptional craftsmanship and lasting value.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
            >
              <motion.a
                href="#products"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-7 py-3.5 rounded-2xl transition-colors duration-200 shadow-lg shadow-indigo-200"
              >
                Shop Now
                <ArrowRight className="w-4 h-4" />
              </motion.a>
              <motion.a
                href="#categories"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-neutral-50 text-neutral-800 font-semibold px-7 py-3.5 rounded-2xl border border-neutral-200 transition-colors duration-200 shadow-sm"
              >
                Browse Categories
              </motion.a>
            </motion.div>

            {/* Stats row */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap gap-6 justify-center lg:justify-start mt-12"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <p className="text-2xl font-bold text-neutral-900">{stat.value}</p>
                  <p className="text-xs text-neutral-500 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — hero product grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="hidden lg:grid grid-cols-2 gap-4"
          >
            {products.slice(0, 4).map((product, i) => (
              <motion.div
                key={product.id}
                variants={scaleIn}
                style={{ marginTop: i % 2 === 1 ? "2rem" : "0" }}
                className="group relative rounded-2xl overflow-hidden aspect-[3/4] shadow-lg"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-semibold text-sm leading-tight">{product.name}</p>
                  <p className="text-white/80 text-xs mt-0.5">${product.price}</p>
                </div>
                {product.badge && (
                  <span className={`absolute top-3 left-3 text-xs font-semibold px-2 py-0.5 rounded-full ${badgeColors[product.badge] ?? "bg-neutral-800 text-white"}`}>
                    {product.badge}
                  </span>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── VALUE PROPS ──────────────────────────────────────────────────── */}
      <section className="bg-white border-y border-neutral-100 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {valueProps.map((vp) => {
              const Icon = vp.icon;
              return (
                <motion.div
                  key={vp.title}
                  variants={fadeInUp}
                  className="flex items-start gap-4 group"
                >
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-indigo-50 group-hover:bg-indigo-100 flex items-center justify-center transition-colors duration-200">
                    <Icon className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 text-sm mb-1">{vp.title}</h3>
                    <p className="text-xs text-neutral-500 leading-relaxed">{vp.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── CATEGORIES ───────────────────────────────────────────────────── */}
      <section id="categories" className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-2">
                Browse by Category
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900">
                Find your perfect match
              </h2>
              <p className="text-neutral-500 mt-3 max-w-xl mx-auto">
                Explore our hand-curated collections spanning fashion, tech, lifestyle, and home.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
            >
              {categories.map((cat) => (
                <motion.button
                  key={cat.name}
                  variants={scaleIn}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setActiveCategory(cat.name);
                    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="group relative rounded-2xl overflow-hidden aspect-[3/4] shadow-md hover:shadow-xl transition-shadow duration-300 text-left"
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent`} />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-white font-bold text-lg leading-tight">{cat.name}</h3>
                    <p className="text-white/70 text-sm mt-0.5">{cat.count} products</p>
                    <div className="flex items-center gap-1 mt-2 text-white/90 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      Shop now <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── PRODUCTS ─────────────────────────────────────────────────────── */}
      <section id="products" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-2">
                  Featured Products
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900">
                  Handpicked for you
                </h2>
              </div>
              {/* Category filter pills */}
              <div className="flex flex-wrap gap-2">
                {categoryFilters.map((cat) => (
                  <motion.button
                    key={cat}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ${
                      activeCategory === cat
                        ? "bg-indigo-600 text-white shadow-sm shadow-indigo-200"
                        : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                    }`}
                  >
                    {cat}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            <motion.div
              key={activeCategory}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {(filteredProducts ?? []).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center mt-12">
              <motion.a
                href="#categories"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white font-semibold px-8 py-3 rounded-2xl transition-all duration-200"
              >
                View All Products
                <ArrowRight className="w-4 h-4" />
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── SALE BANNER ──────────────────────────────────────────────────── */}
      <section id="sale" className="py-20 bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-700 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-violet-400/10 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                <Sparkles className="w-4 h-4" />
                Limited Time Offer
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                Up to 30% off select items
              </h2>
              <p className="text-indigo-200 max-w-lg mx-auto">
                Our biggest sale of the season. Premium products at prices that won't last long.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {saleProducts.map((product) => {
                const discount = product.originalPrice
                  ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                  : 0;
                return (
                  <motion.div
                    key={product.id}
                    variants={scaleIn}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden group"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 bg-rose-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                        −{discount}%
                      </span>
                    </div>
                    <div className="p-4">
                      <p className="text-indigo-200 text-xs font-medium uppercase tracking-wider mb-1">{product.category}</p>
                      <h3 className="text-white font-semibold mb-2">{product.name}</h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-baseline gap-2">
                          <span className="text-white font-bold text-lg">${product.price}</span>
                          {product.originalPrice && (
                            <span className="text-indigo-300 text-sm line-through">${product.originalPrice}</span>
                          )}
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-white text-indigo-700 text-xs font-bold px-3.5 py-2 rounded-xl hover:bg-indigo-50 transition-colors"
                        >
                          Shop Now
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-2">
                Customer Love
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900">
                Trusted by thousands worldwide
              </h2>
              <div className="flex items-center justify-center gap-2 mt-4">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-neutral-600 font-medium">4.9 out of 5 from 50,000+ reviews</span>
              </div>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {reviews.map((review) => (
                <motion.div
                  key={review.id}
                  variants={fadeInUp}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-neutral-100"
                >
                  <div className="flex items-center gap-0.5 mb-4">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-neutral-700 text-sm leading-relaxed mb-5 italic">
                    "{review.text}"
                  </p>
                  <div className="flex items-center gap-3">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-10 h-10 rounded-full object-cover bg-neutral-100"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(review.name)}&background=6366f1&color=fff`;
                      }}
                    />
                    <div>
                      <p className="font-semibold text-neutral-900 text-sm">{review.name}</p>
                      <p className="text-neutral-400 text-xs">{review.location}</p>
                    </div>
                    <div className="ml-auto">
                      <p className="text-xs text-indigo-500 font-medium">{review.product}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── NEWSLETTER ───────────────────────────────────────────────────── */}
      <section id="newsletter" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="relative bg-gradient-to-br from-indigo-50 to-violet-50 rounded-3xl p-10 sm:p-16 overflow-hidden"
          >
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-indigo-100/60 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-violet-100/60 blur-3xl" />
            </div>
            <div className="relative max-w-2xl mx-auto text-center">
              <motion.div variants={fadeInUp}>
                <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-200">
                  <Mail className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-3">
                  Stay in the loop
                </h2>
                <p className="text-neutral-600 mb-8 leading-relaxed">
                  Subscribe to {BRAND_NAME} and be the first to know about new arrivals, exclusive offers, and curated picks — delivered straight to your inbox.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp}>
                {subscribed ? (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex items-center justify-center gap-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-2xl px-6 py-4"
                  >
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                      <Check className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-sm">You're on the list!</p>
                      <p className="text-xs text-emerald-600">Expect great things in your inbox soon.</p>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={`Enter your email — it's free`}
                      required
                      className="flex-1 px-5 py-3.5 rounded-2xl border border-neutral-200 bg-white text-neutral-900 placeholder-neutral-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent shadow-sm"
                    />
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-7 py-3.5 rounded-2xl transition-colors duration-200 shadow-md shadow-indigo-200 whitespace-nowrap"
                    >
                      Subscribe
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </form>
                )}
                <p className="text-xs text-neutral-400 mt-4">
                  No spam, ever. Unsubscribe at any time. By subscribing you agree to our privacy policy.
                </p>
              </motion.div>

              {/* Trust badges */}
              <motion.div
                variants={fadeInUp}
                className="flex flex-wrap items-center justify-center gap-6 mt-10 pt-8 border-t border-neutral-200"
              >
                {[
                  { icon: Shield, text: "Privacy protected" },
                  { icon: Check, text: "No spam guarantee" },
                  { icon: Sparkles, text: "Exclusive member deals" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-neutral-500 text-sm">
                    <Icon className="w-4 h-4 text-indigo-500" />
                    {text}
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}