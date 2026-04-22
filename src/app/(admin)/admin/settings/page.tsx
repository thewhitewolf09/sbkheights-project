"use client";
import React, { useState } from "react";
import FadeIn from "@/components/animation/FadeIn";
import { updateAdminPassword } from "@/lib/actions";

export default function SecuritySettingsPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    const result = await updateAdminPassword(formData);

    if (result.success) {
      setMessage({ type: "success", text: "Password updated successfully." });
      (e.target as HTMLFormElement).reset();
    } else {
      setMessage({ type: "error", text: result.error || "Something went wrong." });
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto py-12">
      <FadeIn>
        <div className="mb-12">
          <h1 className="text-4xl font-headline text-primary mb-2">Security Settings</h1>
          <p className="text-on-surface-variant font-body">Manage your administrative access credentials.</p>
        </div>

        <div className="bg-white p-12 border border-outline-variant/10 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-secondary"></div>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-3">
                  Current Password
                </label>
                <input 
                  type="password"
                  name="currentPassword"
                  required
                  className="w-full bg-surface border-0 p-4 focus:ring-1 focus:ring-secondary transition-all font-body text-sm"
                  placeholder="••••••••••••"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-3">
                    New Password
                  </label>
                  <input 
                    type="password"
                    name="newPassword"
                    required
                    className="w-full bg-surface border-0 p-4 focus:ring-1 focus:ring-secondary transition-all font-body text-sm"
                    placeholder="New Password"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-3">
                    Confirm New Password
                  </label>
                  <input 
                    type="password"
                    name="confirmPassword"
                    required
                    className="w-full bg-surface border-0 p-4 focus:ring-1 focus:ring-secondary transition-all font-body text-sm"
                    placeholder="Confirm New Password"
                  />
                </div>
              </div>
            </div>

            {message && (
              <div className={`p-4 text-xs font-bold uppercase tracking-widest ${
                message.type === "success" ? "bg-green-50 text-green-700 border-l-2 border-green-500" : "bg-red-50 text-red-700 border-l-2 border-red-500"
              }`}>
                {message.text}
              </div>
            )}

            <div className="pt-6 border-t border-outline-variant/10 flex justify-between items-center">
              <p className="text-[10px] text-on-surface-variant/60 font-medium">
                Note: Updating your password will require a new login session.
              </p>
              <button 
                type="submit"
                disabled={loading}
                className="bg-primary text-white px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-secondary transition-all disabled:opacity-50"
              >
                {loading ? "Confirming..." : "Update Password"}
              </button>
            </div>
          </form>
        </div>
      </FadeIn>
    </div>
  );
}
