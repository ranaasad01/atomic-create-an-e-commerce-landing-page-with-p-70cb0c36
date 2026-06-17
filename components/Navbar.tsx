"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X, Sparkles } from 'lucide-react';
import { navLinks, BRAND_NAME } from "@/lib/data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartCount] = useState(3);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-neutral-100"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <motion.a
              href="#"
              className="flex items-center gap-2 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-md">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-neutral-900">
                {BRAND_NAME}
              </span>
            </motion.a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="relative px-4 py-2 text-sm font-medium text-neutral-600 hover:text-indigo-600 transition-colors duration-200 rounded-lg hover:bg-indigo-50 group"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              {/* Cart */}
              <motion.a
                href="#products"
                id="cart-icon"
                className="relative p-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-200 shadow-md shadow-indigo-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`Shopping cart, ${cartCount} items`}
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-orange-500 text-white text-xs font-bold flex items-center justify-center shadow-sm"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </motion.a>

              {/* Mobile menu toggle */}
              <motion.button
                className="md:hidden p-2.5 rounded-xl text-neutral-600 hover:bg-neutral-100 transition-colors"
                onClick={() => setMobileOpen((v) => !v)}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed top-16 left-0 right-0 z-40 bg-white border-b border-neutral-100 shadow-xl md:hidden"
          >
            <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                  className="px-4 py-3 text-base font-medium text-neutral-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}