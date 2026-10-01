"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ArrowUpRight,
  Home,
  Info,
  HandHeart,
  Trophy,
  Award,
  Camera,
  Newspaper,
  Mail,
  Phone,
  ChevronRight,
  MapPin,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { t, language } = useLanguage();
  const isUrdu = language === "ur";

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Close menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: "/", label: t.nav.home, icon: Home },
    { href: "/about", label: t.nav.about, icon: Info },
    { href: "/welfare", label: t.nav.services, icon: HandHeart },
    { href: "/sports", label: t.nav.sports, icon: Trophy },
    { href: "/achievements", label: t.nav.achievements, icon: Award },
    { href: "/gallery", label: t.nav.gallery, icon: Camera },
    { href: "/news", label: t.nav.news, icon: Newspaper },
    { href: "/contact", label: t.nav.contact, icon: Mail },
  ];

  return (
    <>
      <header
        dir="ltr"
        className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-[0_2px_12px_-4px_rgba(11,34,56,0.06)]"
      >
        {/* Top Accent Ribbon */}
        <div className="h-1 w-full bg-gradient-to-r from-blue-700 via-blue-800 to-red-600" />

        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo & Organization Brand */}
            <Link
              href="/"
              className="flex items-center gap-2.5 sm:gap-3.5 group text-left min-w-0 flex-1 sm:flex-initial"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="relative w-10 h-10 sm:w-14 sm:h-14 rounded-full overflow-hidden shadow-xs border-2 border-blue-100 flex-shrink-0 bg-white group-hover:border-red-400 group-hover:scale-105 transition-all duration-300">
                <Image
                  src="/images/official-logo.png"
                  alt="Madeena Welfare Society Bhatkal Logo"
                  fill
                  className="object-contain p-0.5"
                  priority
                />
              </div>
              <div className="flex flex-col text-left min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-sm sm:text-lg font-black tracking-tight text-[#0B2238] group-hover:text-blue-700 transition-colors leading-tight truncate">
                    Madeena Welfare Society
                  </span>
                  <span className="hidden md:inline-block px-1.5 py-0.2 bg-red-50 text-red-600 text-[10px] font-bold uppercase rounded border border-red-200 flex-shrink-0">
                    Est. 1960
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] sm:text-xs font-bold text-blue-900 leading-tight">
                    Bhatkal
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-medium text-slate-500 font-urdu leading-tight truncate">
                    مدینہ ویلفیئر سوسائٹی
                  </span>
                </div>
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

            {/* Right Controls: Direct Language Switcher & Hamburger */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              {/* Always visible Language Switcher for quick phone toggle */}
              <div className="flex-shrink-0 scale-90 sm:scale-100 origin-right">
                <LanguageSwitcher />
              </div>

              {/* Desktop Quick Contact Button */}
              <Link
                href="/contact"
                className="hidden xl:inline-flex items-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-xs hover:shadow-md hover:shadow-red-600/20 hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
              >
                <span>{t.nav.contact}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>

              {/* Mobile Menu Hamburger Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden w-10 h-10 rounded-xl text-slate-700 hover:text-blue-700 hover:bg-slate-100 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-600/30 transition-colors"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-red-600" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer & Backdrop */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex flex-col justify-end" dir="ltr">
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 top-[65px] sm:top-[81px] bg-slate-950/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Sheet */}
          <div className="relative z-50 top-[65px] sm:top-[81px] max-h-[calc(100dvh-65px)] sm:max-h-[calc(100dvh-81px)] overflow-y-auto bg-white border-b border-slate-200 shadow-2xl flex flex-col justify-between animate-in slide-in-from-top-4 duration-250">
            <div className="p-4 sm:p-6 space-y-4">
              {/* Club Mini Identity Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
                <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-red-600 flex-shrink-0" />
                  <span className="truncate">Madeena Colony, Bhatkal</span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-100">
                  Est. 1960
                </span>
              </div>

              {/* Navigation Links Grid (2 columns on mobile for easy thumb reach) */}
              <nav className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-all min-h-[48px] active:scale-[0.98]",
                        isActive
                          ? "bg-blue-50 text-blue-900 border-l-4 border-red-600 shadow-xs font-bold"
                          : "text-slate-700 bg-slate-50/60 hover:bg-slate-100 hover:text-blue-800 border border-slate-200/60"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors",
                            isActive ? "bg-blue-600 text-white" : "bg-white text-slate-600 shadow-2xs"
                          )}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className={isUrdu && link.href !== "/" ? "font-urdu text-base" : ""}>
                          {link.label}
                        </span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 rtl:rotate-180" />
                    </Link>
                  );
                })}
              </nav>

              {/* Quick Action Dial / Contact Buttons */}
              <div className="pt-2 grid grid-cols-2 gap-2.5">
                <a
                  href="tel:+918386226193"
                  className="inline-flex items-center justify-center gap-2 py-3 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl border border-slate-200 transition-colors min-h-[46px]"
                >
                  <Phone className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>Call Society</span>
                </a>

                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex items-center justify-center gap-2 py-3 px-3 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors min-h-[46px]"
                >
                  <span>{t.nav.contact}</span>
                  <ArrowUpRight className="w-4 h-4 flex-shrink-0" />
                </Link>
              </div>
            </div>

            {/* Drawer Bottom Bar */}
            <div className="bg-slate-50 border-t border-slate-100 p-3 px-4 flex items-center justify-between text-[11px] text-slate-500">
              <span className="font-urdu">مدینہ ویلفیئر سوسائٹی ، بھٹکل</span>
              <a
                href="https://www.instagram.com/madeenawelfaresociety"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#047857] hover:underline"
              >
                Instagram →
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
