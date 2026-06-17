"use client";

import { motion } from "framer-motion";
import { Sparkles, Mail, MessageCircle as Twitter, Code2 as Github, Briefcase as Linkedin, Heart } from 'lucide-react';
import { BRAND_NAME, BRAND_TAGLINE, BRAND_EMAIL, navLinks } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/motion";

const footerSections = [
  {
    title: "Shop",
    links: [
      { label: "New Arrivals", href: "#products" },
      { label: "Best Sellers", href: "#products" },
      { label: "Sale Items", href: "#sale" },
      { label: "All Categories", href: "#categories" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#newsletter" },
      { label: "Careers", href: "#newsletter" },
      { label: "Press", href: "#newsletter" },
      { label: "Blog", href: "#newsletter" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "#newsletter" },
      { label: "Shipping Info", href: "#newsletter" },
      { label: "Returns", href: "#newsletter" },
      { label: "Contact Us", href: "#newsletter" },
    ],
  },
];

const socials = [
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Github, label: "GitHub", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-neutral-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 py-16"
        >
          {/* Brand column */}
          <motion.div variants={fadeInUp} className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-white">{BRAND_NAME}</span>
            </a>
            <p className="text-sm text-neutral-400 leading-relaxed max-w-xs mb-6">
              {BRAND_TAGLINE} We bring you the finest selection of products from around the world.
            </p>
            <a
              href={`mailto:${BRAND_EMAIL}`}
              className="inline-flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              <Mail className="w-4 h-4" />
              {BRAND_EMAIL}
            </a>

            {/* Socials */}
            <div className="flex items-center gap-3 mt-6">
              {socials.map(({ icon: Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-neutral-800 hover:bg-indigo-600 flex items-center justify-center transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Link columns */}
          {footerSections.map((section) => (
            <motion.div key={section.title} variants={fadeInUp}>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-neutral-400 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom bar */}
        <div className="border-t border-neutral-800 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-500">
            © {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
          </p>
          <p className="text-xs text-neutral-500 flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> for great shopping
          </p>
          <div className="flex items-center gap-4">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}