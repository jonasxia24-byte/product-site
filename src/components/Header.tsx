"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "首页" },
  { href: "/research", label: "研究" },
  { href: "/#products", label: "产品" },
  { href: "/#faq", label: "问答" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#e5e7eb]">
      <div className="mx-auto flex items-center justify-between h-16 px-6 md:px-8 max-w-[1040px]">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 font-bold text-lg text-[#111827] tracking-tight">
          <img src="/products/logo.png" alt="TripawAlpha" className="w-8 h-8 rounded-lg object-contain" />
          TripawAlpha
        </Link>

        {/* Nav (desktop) */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[15px] font-medium text-[#6b7280] hover:text-[#111827] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA (desktop) */}
        <a
          href="/#faq"
          className="hidden md:inline-flex items-center h-9 px-5 text-sm font-semibold text-[#111827] border border-[#e5e7eb] rounded-xl hover:bg-[#111827] hover:text-white hover:border-[#111827] transition-all"
        >
          联系
        </a>

        {/* Hamburger (mobile) */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden inline-flex items-center justify-center w-9 h-9 text-[#111827]"
          aria-label="菜单"
        >
          {open ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-[#e5e7eb] bg-white">
          <nav className="px-6 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-3 text-[15px] font-medium text-[#111827] hover:text-[#0ea5e9] transition-colors border-b border-[#f3f4f6] last:border-0"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="/#faq"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center h-10 px-5 text-sm font-semibold text-white bg-[#111827] rounded-xl"
            >
              联系猫哥
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}