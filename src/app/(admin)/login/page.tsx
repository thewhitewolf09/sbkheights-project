"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email: email.toLowerCase(),
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid identity or security key.");
        setLoading(false);
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch (err) {
      setError("Connection interrupted. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Architectural Aesthetic */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-secondary via-transparent to-transparent -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-full border-r border-white/5 transform -skew-x-12"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md relative z-10"
      >
        {/* Branding */}
        <div className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <span className="text-secondary font-headline text-6xl font-bold tracking-tighter block">SBK</span>
            <span className="text-white font-label text-xs uppercase tracking-[0.6em] ml-2 opacity-50 block mt-2">Heights</span>
          </motion.div>
          <div className="h-px w-20 bg-secondary/30 mx-auto"></div>
        </div>

        {/* Login Card */}
        <div className="bg-primary border border-white/10 p-12 space-y-10 relative group">
          <div className="space-y-2">
            <h1 className="text-2xl font-headline text-white font-bold tracking-tight">Access Console</h1>
            <p className="text-xs font-label uppercase tracking-widest text-white/40">Enter credentials to proceed</p>
          </div>

          <form className="space-y-8" onSubmit={handleLogin}>
            <div className="space-y-6">
              <div className="relative group">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 block mb-2 transition-colors group-focus-within:text-secondary">
                  Identity
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-0 top-1/2 -translate-y-1/2 text-white/20 text-lg">person</span>
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

              <div className="relative group">
                <div className="flex justify-between items-end mb-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 block transition-colors group-focus-within:text-secondary">
                    Security Key
                  </label>
                  <Link 
                    href="/forgot-password"
                    className="text-[9px] font-bold uppercase tracking-widest text-secondary/60 hover:text-secondary transition-colors"
                  >
                    Forgot Password?
                  </Link>
                </div>
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
            </div>

            <AnimatePresence>
              {error && (
                <motion.p 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-[10px] font-bold uppercase tracking-widest text-red-400 text-center"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-6 bg-white/5 border border-white/10 text-white font-label uppercase tracking-[0.3em] text-[10px] font-bold hover:bg-white hover:text-primary transition-all duration-500 overflow-hidden relative group mt-4 block text-center disabled:opacity-50"
            >
              <span className="relative z-10">{loading ? "Synchronizing..." : "Enter Console"}</span>
              {loading && (
                 <div className="absolute inset-x-0 bottom-0 h-[2px] bg-secondary animate-shimmer"></div>
              )}
            </button>
          </form>

          {/* Decorative Corner */}
          <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none overflow-hidden">
            <div className="absolute top-0 right-0 w-px h-full bg-secondary/10 translate-x-1/2 -translate-y-full group-hover:translate-y-0 transition-transform duration-700"></div>
            <div className="absolute top-0 right-0 w-full h-px bg-secondary/10 -translate-x-full translate-y-1/2 group-hover:translate-x-0 transition-transform duration-700"></div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-12">
          <p className="text-[8px] font-bold uppercase tracking-[0.4em] text-white/20">
            System Authorized Access Only • v2.0.5
          </p>
        </div>
      </motion.div>
    </div>
  );
}
