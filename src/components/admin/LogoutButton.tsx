"use client";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button 
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="flex items-center space-x-2 text-xs font-label font-bold uppercase tracking-widest text-primary hover:text-secondary transition-colors"
    >
      <span>Exit Console</span>
      <span className="material-symbols-outlined text-sm">logout</span>
    </button>
  );
}
