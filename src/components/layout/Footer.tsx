"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { LanguageSwitcher } from "./LanguageSwitcher";

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function Footer() {
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
    <footer className="bg-[#0B2238] text-white pt-14 pb-8 mt-auto border-t-2 border-red-600 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 pb-10">
          {/* Logo & Name */}
          <div className="flex items-center gap-3.5">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-blue-400/40 flex-shrink-0 bg-white">
              <Image
                src="/images/official-logo.png"
                alt="Madeena Welfare Society Bhatkal Logo"
                fill
                className="object-contain p-0.5"
              />
            </div>
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-2">
                <span className="text-base font-extrabold tracking-tight text-white leading-tight">
                  Madeena Welfare Society
                </span>
                <span className="px-1.5 py-0.2 bg-red-600 text-white text-[9px] font-extrabold uppercase rounded">
                  1960
                </span>
              </div>
              <span className="text-xs font-semibold text-blue-200 leading-tight">
                Bhatkal
              </span>
              <span className="text-[11px] font-medium text-slate-400 font-urdu leading-tight mt-0.5">
                مدینہ ویلفیئر سوسائٹی ، بھٹکل
              </span>
            </div>
          </div>

          {/* Center Navigation Links */}
          <nav className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-xs sm:text-sm font-semibold text-slate-300">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-red-400 transition-colors hover:-translate-y-0.5 transition-transform"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right: Instagram and Language Switcher */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/madeenawelfaresociety?stkn=dzMwd3I0bm1leXk2"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 hover:bg-red-600 text-xs font-bold text-white border border-slate-700 hover:border-red-500 transition-all shadow-xs hover:scale-105 active:scale-95"
              title="Follow @madeenawelfaresociety on Instagram"
            >
              <InstagramIcon className="w-3.5 h-3.5" />
              <span>@madeenawelfaresociety</span>
            </a>
            <LanguageSwitcher className="bg-slate-900/90 border-slate-700" />
          </div>
        </div>

        {/* Bottom Divider & Tagline */}
        <div className="border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>{t.footer.rights}</p>
          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <span className="w-2 h-2 rounded-full bg-red-600"></span>
            <span>Regd. USA 1960 • Madeena Colony, Bhatkal, Karnataka</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
