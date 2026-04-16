"use client";
import React, { useState, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { resetPasswordWithToken } from "@/lib/actions";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    if (password !== confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match." });
      return;
    }

    setLoading(true);
    setMessage(null);

    const result = await resetPasswordWithToken(token, password);
    if (result.success) {
      setMessage({ type: "success", text: "Security key updated. Redirecting to login..." });
      setTimeout(() => router.push("/login"), 3000);
    } else {
      setMessage({ type: "error", text: result.error || "Failed to reset security key." });
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center p-6 text-center">
        <div className="space-y-6">
          <p className="text-white/40 font-label uppercase tracking-widest text-[10px]">Invalid or missing recovery token.</p>
          <Link href="/login" className="text-secondary font-label uppercase text-[10px] tracking-widest border border-secondary/30 px-6 py-3 hover:bg-secondary hover:text-primary transition-all">
            Return to Base
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-secondary via-transparent to-transparent translate-y-1/2 -translate-x-1/2"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-primary border border-white/10 p-12 space-y-10">
          <div className="space-y-4">
            <h1 className="text-2xl font-headline text-white font-bold tracking-tight">Define New Key</h1>
            <p className="text-xs font-label uppercase tracking-widest text-white/40">Secure your account with a new security key</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <div className="relative group">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 block mb-2 transition-colors group-focus-within:text-secondary">
                  New Security Key
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-0 top-1/2 -translate-y-1/2 text-white/20 text-lg">lock</span>
                  <input 
                    type="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-transparent border-b border-white/10 py-4 pl-8 text-xs font-label uppercase tracking-widest text-white outline-none focus:border-secondary transition-all placeholder:text-white/10"
                  />
                </div>
              </div>

              <div className="relative group">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 block mb-2 transition-colors group-focus-within:text-secondary">
                  Confirm Security Key
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-0 top-1/2 -translate-y-1/2 text-white/20 text-lg">lock_reset</span>
                  <input 
                    type="password" 
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-transparent border-b border-white/10 py-4 pl-8 text-xs font-label uppercase tracking-widest text-white outline-none focus:border-secondary transition-all placeholder:text-white/10"
                  />
                </div>
              </div>
            </div>

            <AnimatePresence>
              {message && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`text-[10px] font-bold uppercase tracking-widest text-center p-4 border ${
                    message.type === "success" ? "border-green-500/30 text-green-400 bg-green-500/5" : "border-red-500/30 text-red-400 bg-red-500/5"
                  }`}
                >
                  {message.text}
                </motion.div>
              )}
            </AnimatePresence>

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-6 bg-white/5 border border-white/10 text-white font-label uppercase tracking-[0.3em] text-[10px] font-bold hover:bg-white hover:text-primary transition-all duration-500 disabled:opacity-50"
            >
              {loading ? "Reconfiguring..." : "Update Security Key"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-primary flex items-center justify-center text-white/40 font-label text-sm uppercase tracking-widest">Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
