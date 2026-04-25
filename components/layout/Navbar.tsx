"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const navLinks = [{ href: "/events", label: "Events" }];

export function Navbar() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isTransparentState = !scrolled;

  useEffect(() => {
    if (!isHomePage) {
      setScrolled(true);
      return;
    }

    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-caya-navbar-solid backdrop-blur-md shadow-caya-navbar"
            : "bg-caya-navbar-overlay backdrop-blur-caya-soft",
        )}
      >
        <div className="container-wide flex items-center justify-between h-18 py-4">
          {/* Logo */}
          <Link href="/#hero" className="block shrink-0">
            <Logo
              className="h-10 w-auto"
              wordmark={
                isTransparentState
                  ? "var(--color-caya-warm-white)"
                  : "var(--color-caya-charcoal)"
              }
              foreground={
                isTransparentState
                  ? "var(--color-caya-warm-white)"
                  : "var(--color-caya-warm-white)"
              }
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium font-body transition-colors duration-200 hover:text-caya-clay",
                  isTransparentState
                    ? "text-caya-warm-white-90"
                    : "text-caya-charcoal-soft",
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/book"
              className="hover-scale-caya rounded-full bg-caya-clay px-5 py-2.5 text-sm font-medium font-body text-caya-warm-white transition-all duration-300 hover:shadow-(--shadow-warm)"
            >
              Book a Session
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className={cn(
              "p-2 md:hidden",
              isTransparentState
                ? "text-caya-warm-white"
                : "text-caya-charcoal",
            )}
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
          className="absolute inset-0 bg-caya-modal-overlay"
          onClick={() => setOpen(false)}
        />
        <div
          className={cn(
            "absolute inset-y-0 right-0 flex h-full w-[min(22rem,calc(100vw-2rem))] max-w-full flex-col overflow-y-auto bg-caya-canvas px-6 pb-8 pt-24 shadow-(--shadow-warm) transition-transform duration-500 sm:px-8 sm:pt-28",
            open ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="border-b border-caya-sand py-3 text-2xl font-display text-caya-charcoal transition-colors duration-200 hover:text-caya-clay"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="mt-auto pt-8">
            <Link
              href="/book"
              className="block w-full rounded-full bg-caya-clay px-5 py-3 text-center text-sm font-medium font-body text-caya-warm-white"
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
