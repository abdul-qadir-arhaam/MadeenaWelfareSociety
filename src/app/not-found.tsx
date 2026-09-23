import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Home, Search, Compass } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="relative w-20 h-20 rounded-full overflow-hidden mx-auto border-2 border-emerald-500 shadow-sm bg-white p-1">
          <Image
            src="/images/official-logo.png"
            alt="Madeena Welfare Society Bhatkal Logo"
            fill
            className="object-contain p-1"
          />
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#047857] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
            Error 404 — Page Not Found
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B2238] mt-3">
            Lost Your Way?
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed">
            The page or archive you are looking for may have been moved, renamed, or is currently unavailable.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link href="/" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto flex items-center justify-center gap-2 text-xs sm:text-sm">
              <Home className="w-4 h-4" />
              <span>Back to Homepage</span>
            </Button>
          </Link>
          <Link href="/search" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto flex items-center justify-center gap-2 text-xs sm:text-sm">
              <Search className="w-4 h-4" />
              <span>Search Portal</span>
            </Button>
          </Link>
        </div>

        <div className="pt-6 border-t border-slate-100 grid grid-cols-3 gap-2 text-xs text-slate-500">
          <Link href="/news" className="hover:text-[#047857] p-1.5 rounded hover:bg-slate-50">
            Latest News
          </Link>
          <Link href="/gallery" className="hover:text-[#047857] p-1.5 rounded hover:bg-slate-50">
            Photo Gallery
          </Link>
          <Link href="/sports" className="hover:text-[#047857] p-1.5 rounded hover:bg-slate-50">
            Sports
          </Link>
        </div>
      </div>
    </div>
  );
}
