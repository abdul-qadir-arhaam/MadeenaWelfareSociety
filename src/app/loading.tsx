import React from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4 py-20">
      <div className="relative w-14 h-14 rounded-full overflow-hidden border border-emerald-500/20 bg-white p-1 animate-pulse shadow-xs">
        <Image
          src="/images/official-logo.png"
          alt="Madeena Welfare Society Logo"
          fill
          className="object-contain p-1"
        />
      </div>
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <Loader2 className="w-4 h-4 animate-spin text-[#047857]" />
        <span>Loading Madeena Welfare Society portal...</span>
      </div>
    </div>
  );
}
