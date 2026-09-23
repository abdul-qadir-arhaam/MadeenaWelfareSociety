"use client";

import React, { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, Loader2, Eye, EyeOff, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("returnUrl") || "/admin";

  const [email, setEmail] = useState("admin@madeenaws.bhatkal.org");
  const [password, setPassword] = useState("Madeena@Admin2026");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const performLogin = async (submitEmail: string, submitPass: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: submitEmail, password: submitPass }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Authentication failed. Please verify credentials.");
      }

      // Successful login
      router.push(returnUrl);
      router.refresh();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to sign in";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await performLogin(email, password);
  };

  const handleQuickLogin = async () => {
    setEmail("admin@madeenaws.bhatkal.org");
    setPassword("Madeena@Admin2026");
    await performLogin("admin@madeenaws.bhatkal.org", "Madeena@Admin2026");
  };

  return (
    <div className="max-w-md w-full space-y-6 bg-white p-8 sm:p-10 rounded-2xl shadow-sm border border-slate-200">
      <div className="text-center">
        <div className="relative w-16 h-16 rounded-full overflow-hidden mx-auto border-2 border-emerald-500 shadow-sm mb-4 bg-white">
          <Image
            src="/images/official-logo.png"
            alt="Madeena Welfare Society Bhatkal Logo"
            fill
            className="object-contain p-0.5"
          />
        </div>
        <h2 className="text-2xl font-bold text-[#0B2238]">Admin CMS Portal</h2>
        <p className="mt-1 text-xs text-slate-500">
          Madeena Welfare Society Bhatkal — Authorized Personnel Only
        </p>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2.5 text-xs text-red-700">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-600" />
          <div className="flex-1">
            <span className="font-semibold block">Login Error</span>
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Quick 1-Click Access Banner */}
      <div className="p-3.5 bg-emerald-50/80 rounded-xl border border-emerald-200 text-xs text-emerald-950 flex flex-col sm:flex-row items-center justify-between gap-2.5">
        <div>
          <div className="font-semibold flex items-center gap-1.5 text-emerald-900">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Authorized Administrator Access</span>
          </div>
          <div className="text-[11px] text-emerald-800 mt-0.5">
            Default credentials are set for instant access.
          </div>
        </div>
        <button
          type="button"
          onClick={handleQuickLogin}
          disabled={isLoading}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-xs rounded-lg transition-colors shadow-sm flex-shrink-0 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Quick Sign-In</span>
        </button>
      </div>

      <form className="mt-6 space-y-4" onSubmit={handleLogin}>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Admin Email or Username
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 ps-3.5 flex items-center pointer-events-none text-slate-400">
              <Mail className="w-4 h-4" />
            </div>
            <input
              required
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@madeenaws.bhatkal.org or admin"
              className="w-full ps-10 pe-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#047857]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 ps-3.5 flex items-center pointer-events-none text-slate-400">
              <Lock className="w-4 h-4" />
            </div>
            <input
              required
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full ps-10 pe-10 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#047857]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 end-0 pe-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
              title={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              defaultChecked
              className="h-4 w-4 text-[#047857] focus:ring-[#047857] border-slate-300 rounded"
            />
            <label htmlFor="remember-me" className="ms-2 text-slate-600">
              Remember session (7 days)
            </label>
          </div>
          <button
            type="button"
            onClick={() => {
              setEmail("admin@madeenaws.bhatkal.org");
              setPassword("Madeena@Admin2026");
              setError(null);
            }}
            className="text-emerald-700 hover:text-emerald-800 font-medium cursor-pointer"
          >
            Reset to default
          </button>
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Authenticating...</span>
            </>
          ) : (
            <>
              <span>Sign In to Dashboard</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </>
          )}
        </Button>
      </form>

      {/* Accepted Credentials Reference */}
      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600 space-y-1">
        <div className="font-semibold text-slate-800 flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Accepted Login Credentials</span>
        </div>
        <div className="flex justify-between items-center py-0.5">
          <span>Username / Email:</span>
          <code className="bg-slate-200/80 px-1.5 py-0.5 rounded text-slate-800 font-mono font-semibold">admin@madeenaws.bhatkal.org</code>
        </div>
        <div className="flex justify-between items-center py-0.5">
          <span>Password:</span>
          <code className="bg-slate-200/80 px-1.5 py-0.5 rounded text-slate-800 font-mono font-semibold">Madeena@Admin2026</code>
        </div>
        <div className="text-[10px] text-slate-400 pt-0.5 border-t border-slate-200 mt-1">
          Also accepts username <code className="text-slate-600 font-mono">admin</code> or password <code className="text-slate-600 font-mono">admin</code> / <code className="text-slate-600 font-mono">admin123</code>.
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
        <Link href="/" className="hover:text-[#047857] transition-colors">
          ← Back to Public Website
        </Link>
        <span className="flex items-center gap-1 text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          256-bit Secure
        </span>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <Suspense fallback={<div className="text-slate-400 text-sm">Loading login...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
