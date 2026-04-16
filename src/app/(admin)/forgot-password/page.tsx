"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { requestPasswordReset } from "@/lib/actions";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const result = await requestPasswordReset(email);
    if (result.success) {
      setMessage({ type: "success", text: result.message || "Reset link generated." });
    } else {
      setMessage({ type: "error", text: result.error || "Failed to process request." });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-secondary via-transparent to-transparent -translate-y-1/2 translate-x-1/2"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-primary border border-white/10 p-12 space-y-10">
          <div className="space-y-4">
            <h1 className="text-2xl font-headline text-white font-bold tracking-tight">Recover Identity</h1>
            <p className="text-xs font-label uppercase tracking-widest text-white/40">Enter your email to receive a reset key</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="relative group">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 block mb-2 transition-colors group-focus-within:text-secondary">
                Registered Email
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-0 top-1/2 -translate-y-1/2 text-white/20 text-lg">mail</span>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ADMIN@SBKHEIGHTS.COM"
                  className="w-full bg-transparent border-b border-white/10 py-4 pl-8 text-xs font-label uppercase tracking-widest text-white outline-none focus:border-secondary transition-all placeholder:text-white/10"
                />
              </div>
            </div>

            <AnimatePresence>
              {message && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className={`text-[10px] font-bold uppercase tracking-widest text-center p-4 border ${
                    message.type === "success" ? "border-green-500/30 text-green-400 bg-green-500/5" : "border-red-500/30 text-red-400 bg-red-500/5"
                  }`}
                >
                  {message.text}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-6">
              <button 
                type="submit"
                disabled={loading}
                className="w-full py-6 bg-white/5 border border-white/10 text-white font-label uppercase tracking-[0.3em] text-[10px] font-bold hover:bg-white hover:text-primary transition-all duration-500 disabled:opacity-50"
              >
                {loading ? "Verifying..." : "Request Reset Key"}
              </button>

              <Link 
                href="/login"
                className="block text-center text-[10px] font-bold uppercase tracking-widest text-white/30 hover:text-secondary transition-colors"
              >
                Back to Login
              </Link>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
