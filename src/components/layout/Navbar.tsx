"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/gallery", label: "Gallery" },
    { href: "/project", label: "Project" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="bg-primary fixed top-0 w-full z-50 border-b border-white/10">
      <div className="flex justify-between items-center w-full px-4 md:px-12 py-2 md:py-3">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center group cursor-pointer shrink-0"
        >
          <Image
            src="/images/sbk_logo2.png"
            alt="SBK Heights Logo"
            width={300}
            height={120}
            className="h-12 md:h-16 w-auto object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] group-hover:scale-105 transition-transform duration-300"
            priority
          />
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative group py-2"
              >
                <span
                  className={`text-xs md:text-sm font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
                    isActive
                      ? "text-secondary"
                      : "text-white/75 hover:text-white"
                  }`}
                >
                  {link.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 w-full h-[2px] bg-secondary"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {!isActive && (
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-secondary/50 group-hover:w-full transition-all duration-300" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right Section: CTA & Hamburger */}
        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            className="hidden sm:block gold-gradient-bg text-primary px-6 md:px-8 py-2 md:py-3 font-label font-black uppercase tracking-widest text-xs md:text-sm shadow-xl hover:shadow-secondary/30 hover:-translate-y-0.5 active:scale-95 transition-all shrink-0"
          >
            Enquire Now
          </Link>
          
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-3xl">
              {isOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 w-full bg-primary border-b border-white/10 py-8 px-6 space-y-6 shadow-2xl z-50 overflow-y-auto max-h-[calc(100vh-80px)]"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block border-b border-white/5 pb-4"
              >
                <span className={`text-xl font-headline font-bold uppercase tracking-tighter italic ${
                  pathname === link.href ? "text-secondary" : "text-white"
                }`}>
                  {link.label}
                </span>
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="block gold-gradient-bg text-primary px-8 py-4 text-center font-label font-black uppercase tracking-widest text-sm shadow-xl"
            >
              Enquire Now
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
