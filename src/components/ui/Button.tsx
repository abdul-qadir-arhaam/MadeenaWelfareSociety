import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "red"
    | "navy"
    | "outline-pill"
    | "outline-red"
    | "secondary"
    | "ghost"
    | "outline"
    | "destructive";
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
    "inline-flex items-center justify-center font-semibold transition-all duration-200 ease-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]";

  const sizeStyles = {
    sm: "px-3.5 py-1.5 text-xs rounded-full gap-1.5",
    md: "px-5 py-2.5 text-sm rounded-xl gap-2 shadow-xs",
    lg: "px-6 py-3.5 text-base rounded-xl gap-2.5 shadow-sm",
  };

  const variantStyles = {
    primary:
      "bg-blue-700 hover:bg-blue-800 text-white shadow-blue-700/25 hover:shadow-md hover:shadow-blue-700/30 focus:ring-blue-600",
    red:
      "bg-red-600 hover:bg-red-700 text-white shadow-red-600/25 hover:shadow-md hover:shadow-red-600/30 focus:ring-red-600",
    navy:
      "bg-[#0B2238] hover:bg-[#16324F] text-white shadow-slate-900/20 hover:shadow-md hover:shadow-slate-900/30 focus:ring-[#0B2238]",
    "outline-pill":
      "border-2 border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white rounded-full bg-transparent focus:ring-blue-600",
    "outline-red":
      "border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded-full bg-transparent focus:ring-red-600",
    secondary:
      "bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 focus:ring-blue-600",
    ghost:
      "text-slate-700 hover:text-[#0B2238] hover:bg-slate-100 focus:ring-slate-300",
    outline:
      "border border-slate-300 text-slate-800 hover:border-blue-600 hover:text-blue-700 bg-white hover:bg-blue-50/50 focus:ring-blue-500",
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
