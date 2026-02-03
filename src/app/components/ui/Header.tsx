"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

const mobileNavLinks = [
  ...navLinks,
  { label: "Privacy", href: "/privacy" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-[var(--color-background)] border-b border-[var(--color-border)]">
      <div className="max-w-7xl mx-auto px-5 md:px-20">
        <div className="flex items-center justify-between h-[96px]">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/thisbyte-branding.png"
              alt="ThisByte"
              width={160}
              height={80}
              className="h-20 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                label={link.label}
                isActive={pathname === link.href}
              />
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 text-[var(--color-accent)]"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50"
          onClick={() => setMobileMenuOpen(false)}
        >
          {/* Mobile Menu Panel */}
          <div
            className="fixed bottom-0 left-0 right-0 bg-[var(--color-surface)] rounded-t-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4">
              <div className="w-12 h-1 bg-[var(--color-border)] rounded-full mx-auto mb-4" />
              <nav className="space-y-1">
                {mobileNavLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-3 text-[var(--color-text-primary)] text-base font-medium hover:bg-[var(--color-secondary)] rounded-lg transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
                <button
                  className="w-full px-4 py-3 text-[var(--color-text-muted)] text-sm"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function NavLink({
  href,
  label,
  isActive,
}: {
  href: string;
  label: string;
  isActive: boolean;
}) {
  return (
    <Link
      href={href}
      className={`text-sm font-medium tracking-wide transition-colors ${
        isActive
          ? "text-[var(--color-accent)]"
          : "text-[var(--color-text-secondary)] hover:text-[var(--color-accent-light)]"
      }`}
    >
      {label}
    </Link>
  );
}
