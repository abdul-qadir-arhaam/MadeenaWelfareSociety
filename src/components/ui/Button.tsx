import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline-pill" | "navy" | "secondary" | "ghost" | "outline" | "destructive";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2";

  const sizeStyles = {
    sm: "px-3.5 py-1.5 text-xs rounded-full gap-1.5",
    md: "px-5 py-2.5 text-sm rounded-lg gap-2",
    lg: "px-6 py-3 text-base rounded-lg gap-2.5",
  };

  const variantStyles = {
    primary:
      "bg-[#047857] hover:bg-[#036449] text-white shadow-sm hover:shadow-md focus:ring-[#047857]",
    "outline-pill":
      "border border-[#047857] text-[#047857] hover:bg-[#047857] hover:text-white rounded-full bg-transparent focus:ring-[#047857]",
    navy:
      "bg-[#0B2238] hover:bg-[#16324F] text-white shadow-sm hover:shadow-md focus:ring-[#0B2238]",
    secondary:
      "bg-[#F0FDF4] text-[#047857] hover:bg-[#DCFCE7] border border-[#A7F3D0] focus:ring-[#047857]",
    ghost:
      "text-slate-600 hover:text-[#0B2238] hover:bg-slate-100 focus:ring-slate-300",
    outline:
      "border border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900 bg-white focus:ring-slate-300",
    destructive:
      "bg-red-600 hover:bg-red-700 text-white shadow-sm hover:shadow-md focus:ring-red-500",
  };

  return (
    <button
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
