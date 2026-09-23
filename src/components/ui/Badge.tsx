import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps {
  variant?: "event" | "notice" | "gallery" | "welfare" | "default" | "outline";
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = "default", children, className }: BadgeProps) {
  const variantStyles = {
    event: "bg-[#047857] text-white",
    notice: "bg-sky-100 text-sky-800 border border-sky-200",
    gallery: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    welfare: "bg-amber-100 text-amber-800 border border-amber-200",
    default: "bg-slate-100 text-slate-700 border border-slate-200",
    outline: "bg-transparent text-slate-700 border border-slate-200",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
