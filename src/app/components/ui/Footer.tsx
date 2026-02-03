import Link from "next/link";
import Image from "next/image";

const footerLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Powerball Analyst Privacy", href: "/powerball-analyst-privacy" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-background)] border-t border-[var(--color-border)]">
      <div className="max-w-7xl mx-auto px-5 md:px-20 py-8 md:py-12">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8">
          {/* Logo Section */}
          <div>
            <Image
              src="/thisbyte-branding.png"
              alt="ThisByte"
              width={200}
              height={100}
              className="h-24 w-auto"
            />
          </div>

          {/* Links Section */}
          <nav className="flex flex-wrap gap-x-8 gap-y-4">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent-light)] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div className="border-t border-[var(--color-border)] mt-8 pt-6">
          <p className="text-center text-sm text-[var(--color-text-muted)]">
            © {currentYear} ThisByte, LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
