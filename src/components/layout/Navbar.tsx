"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/about", label: t.nav.about },
    { href: "/welfare", label: t.nav.services },
    { href: "/sports", label: t.nav.sports },
    { href: "/achievements", label: t.nav.achievements },
    { href: "/gallery", label: t.nav.gallery },
    { href: "/news", label: t.nav.news },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <header
      dir="ltr"
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-[0_2px_12px_-4px_rgba(11,34,56,0.06)] text-left"
    >
      {/* Top Club Brand Ribbon: Blue to Red Accent Bar */}
      <div className="h-1 w-full bg-gradient-to-r from-blue-700 via-blue-800 to-red-600" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Organization Name */}
          <Link href="/" className="flex items-center gap-3.5 group text-left">
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden shadow-xs border-2 border-blue-100 flex-shrink-0 bg-white group-hover:border-red-400 group-hover:scale-105 transition-all duration-300">
              <Image
                src="/images/official-logo.png"
                alt="Madeena Welfare Society Bhatkal Logo"
                fill
                className="object-contain p-0.5"
                priority
              />
            </div>
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-extrabold tracking-tight text-[#0B2238] group-hover:text-blue-700 transition-colors leading-tight">
                  Madeena Welfare Society
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.2 bg-red-50 text-red-600 text-[10px] font-bold uppercase rounded border border-red-200">
                  Est. 1960
                </span>
              </div>
              <span className="text-xs sm:text-sm font-bold text-blue-900 leading-tight">
                Bhatkal
              </span>
              <span className="text-[11px] font-medium text-slate-500 font-urdu leading-tight mt-0.5">
                مدینہ ویلفیئر سوسائٹی ، بھٹکل
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5",
                    isActive
                      ? "text-blue-900 border-b-2 border-red-600 pb-1"
                      : "text-slate-600 hover:text-blue-700"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Area: Language Switcher & Quick CTA */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>

            <Link
              href="/contact"
              className="hidden xl:inline-flex items-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-xs hover:shadow-md hover:shadow-red-600/20 hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
            >
              <span>{t.nav.contact}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:text-blue-700 hover:bg-slate-100 focus:outline-none transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200/80 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl text-left" dir="ltr">
          <div className="py-2 flex justify-center border-b border-slate-100">
            <LanguageSwitcher />
          </div>
          <div className="space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "block px-3 py-2.5 rounded-xl text-base font-semibold transition-all duration-200 text-left",
                    isActive
                      ? "bg-blue-50 text-blue-900 border-l-4 border-red-600 font-bold"
                      : "text-slate-700 hover:bg-slate-50 hover:text-blue-700"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
          <div className="pt-2">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 py-3 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-xl shadow-xs"
            >
              <span>{t.nav.contact}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
