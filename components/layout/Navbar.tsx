"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/about", label: "About" },
  //{ href: "/programs", label: "Programs" },
  //{ href: "/the-space", label: "The Space" },
  { href: "/events", label: "Events" },
  //{ href: "/support", label: "Support Us" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-[oklch(97%_0.012_60/0.95)] backdrop-blur-md shadow-[0_1px_0_oklch(55%_0.12_38/0.1)]"
            : "bg-transparent",
        )}
      >
        <div className="container-wide flex items-center justify-between h-18 py-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex flex-col leading-none group"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <span
              className="text-xl font-semibold tracking-tight"
              style={{ color: "var(--color-clay)" }}
            >
              Come As You Are
            </span>
            <span
              className="text-[10px] tracking-[0.2em] uppercase font-light"
              style={{
                color: "var(--color-charcoal-soft)",
                fontFamily: "var(--font-body)",
              }}
            >
              Peer Wellness Community
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors duration-200 hover:text-clay"
                style={{
                  color: "var(--color-charcoal-soft)",
                  fontFamily: "var(--font-body)",
                }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/book"
              className="px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 hover:shadow-(--shadow-warm) hover:scale-[1.02]"
              style={{
                background: "var(--color-clay)",
                color: "var(--color-warm-white)",
                fontFamily: "var(--font-body)",
              }}
            >
              Book a Session
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            style={{ color: "var(--color-charcoal)" }}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={cn(
          "fixed inset-0 z-40 transition-all duration-500 md:hidden",
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
      >
        <div
          className="absolute inset-0"
          style={{ background: "oklch(22% 0.02 60 / 0.4)" }}
          onClick={() => setOpen(false)}
        />
        <div
          className={cn(
            "absolute top-0 right-0 h-full w-72 flex flex-col pt-24 px-8 pb-12 transition-transform duration-500",
            open ? "translate-x-0" : "translate-x-full",
          )}
          style={{ background: "var(--color-canvas)" }}
        >
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-3 text-2xl border-b transition-colors duration-200 hover:text-clay"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-charcoal)",
                  borderColor: "var(--color-sand)",
                }}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="mt-auto">
            <Link
              href="/book"
              className="w-full block text-center px-5 py-3 rounded-full text-sm font-medium"
              style={{
                background: "var(--color-clay)",
                color: "var(--color-warm-white)",
                fontFamily: "var(--font-body)",
              }}
              onClick={() => setOpen(false)}
            >
              Book a Session
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
