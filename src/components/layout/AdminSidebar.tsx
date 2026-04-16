"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const NAV_ITEMS = [
  { name: "Console Overview", icon: "dashboard", href: "/admin" },
  { name: "Home Screen", icon: "home", href: "/admin/cms/home" },
  { name: "About Screen", icon: "business", href: "/admin/cms/about" },
  { name: "Project Screen", icon: "apartment", href: "/admin/cms/project" },
  { name: "Gallery Screen", icon: "photo_library", href: "/admin/cms/gallery" },
  { name: "Enquiry Screen", icon: "forward_to_inbox", href: "/admin/enquiries" },
  { name: "Contact Screen", icon: "contact_support", href: "/admin/cms/contact" },
  { name: "Legal Screen", icon: "gavel", href: "/admin/cms/legal" },
  { name: "Media Assets", icon: "perm_media", href: "/admin/media" },
  { name: "Security Settings", icon: "lock", href: "/admin/settings" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 h-screen bg-primary border-r border-white/10 flex flex-col fixed left-0 top-0 z-50 overflow-y-auto hide-scrollbar">
      <div className="p-8 border-b border-white/10">
        <Link href="/admin" className="block group">
          <span className="text-secondary font-headline text-2xl font-bold tracking-tighter group-hover:brightness-110 transition-all">SBK</span>
          <span className="text-white font-headline text-lg font-light ml-2 uppercase tracking-[0.3em] opacity-80">Admin</span>
        </Link>
      </div>

      <nav className="flex-1 p-6 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 transition-all group relative ${
                isActive ? "text-secondary" : "text-white/60 hover:text-white"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute left-0 w-1 h-4 bg-secondary"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className={`material-symbols-outlined text-lg ${isActive ? "text-secondary" : "text-white/30 group-hover:text-white"}`}>
                {item.icon}
              </span>
              <span className="font-label text-xs uppercase tracking-widest whitespace-nowrap">
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="p-8 border-t border-white/10 mt-auto">
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center text-secondary font-headline">A</div>
          <div>
            <p className="text-[10px] font-bold text-white uppercase tracking-widest">Admin User</p>
            <p className="text-[8px] text-white/40 uppercase tracking-widest">Super Administrator</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
