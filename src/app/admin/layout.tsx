"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Newspaper,
  Image as ImageIcon,
  Trophy,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
  Tag,
  PlusCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // If on /admin/login, render without sidebar
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  };

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "All News", href: "/admin/news", icon: Newspaper },
    { label: "Categories", href: "/admin/categories", icon: Tag },
    { label: "Photo Gallery", href: "/admin/gallery", icon: ImageIcon },
    { label: "Achievements", href: "/admin/achievements", icon: Trophy },
    { label: "Site Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#0B2238] text-white border-e border-slate-800 flex-shrink-0">
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800 flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-white flex-shrink-0">
            <Image
              src="/images/official-logo.png"
              alt="MWS Logo"
              fill
              className="object-contain"
            />
          </div>
          <div>
            <span className="block text-sm font-bold text-white leading-tight">
              MWS Bhatkal
            </span>
            <span className="text-[11px] text-emerald-400 font-medium">
              CMS Admin Panel
            </span>
          </div>
        </div>

        {/* Quick Add Button */}
        <div className="px-4 py-4">
          <Link
            href="/admin/news/create"
            className="flex items-center justify-center gap-2 w-full py-2 px-3 bg-[#047857] hover:bg-[#036449] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create News</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors",
                  isActive
                    ? "bg-[#047857] text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                )}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Public Website</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-xs text-rose-400 hover:text-rose-300 transition-colors pt-1 w-full text-start cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-md text-slate-600 hover:bg-slate-100"
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <h1 className="text-base sm:text-lg font-bold text-[#0B2238]">
              Portal Content Management
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 hidden sm:inline-block">
              Logged in as: <strong className="text-slate-800">Administrator</strong>
            </span>
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-[#047857] font-bold text-xs flex items-center justify-center border border-emerald-200">
              AD
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
