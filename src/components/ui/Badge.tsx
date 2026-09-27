import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps {
  variant?: "event" | "notice" | "gallery" | "welfare" | "sports" | "live" | "default" | "outline";
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = "default", children, className }: BadgeProps) {
  const variantStyles = {
    event: "bg-red-600 text-white shadow-xs",
    notice: "bg-blue-50 text-blue-800 border border-blue-200",
    gallery: "bg-slate-100 text-slate-800 border border-slate-200",
    welfare: "bg-red-50 text-red-700 border border-red-200",
    sports: "bg-[#0B2238] text-amber-300 border border-slate-700",
    live: "bg-red-50 text-red-700 border border-red-200 font-bold",
    default: "bg-slate-100 text-slate-700 border border-slate-200",
    outline: "bg-transparent text-slate-700 border border-slate-200",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide",
        variantStyles[variant],
        className
      )}
    >
      {variant === "live" && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
        </span>
      )}
      {children}
    </span>
  );
}
