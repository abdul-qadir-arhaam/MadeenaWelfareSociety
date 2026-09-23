"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Organization Name */}
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden shadow-xs border border-emerald-100 flex-shrink-0">
              <Image
                src="/images/official-logo.png"
                alt="Madeena Welfare Society Bhatkal Logo"
                fill
                className="object-contain group-hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-bold tracking-tight text-[#0B2238] group-hover:text-[#047857] transition-colors leading-tight">
                Madeena Welfare Society
              </span>
              <span className="text-xs sm:text-sm font-semibold text-[#0B2238]/90 leading-tight">
                Bhatkal
              </span>
              <span className="text-[11px] font-medium text-slate-500 font-urdu leading-tight mt-0.5">
                مدینہ ویلفیئر سوسائٹی ، بھٹکل
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-[#047857]",
                    isActive
                      ? "text-[#047857] font-semibold border-b-2 border-[#047857] pb-1"
                      : "text-slate-600"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Area: Language Switcher & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-[#047857] hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
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
                    "block px-3 py-2.5 rounded-lg text-base font-medium transition-colors",
                    isActive
                      ? "bg-emerald-50 text-[#047857] font-semibold"
                      : "text-slate-700 hover:bg-slate-50 hover:text-[#047857]"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
