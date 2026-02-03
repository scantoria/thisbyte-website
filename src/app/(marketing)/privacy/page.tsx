import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - ThisByte",
  description: "Privacy policy for ThisByte, LLC website and services.",
};

export default function PrivacyPage() {
  const currentDate = new Date().toISOString().split("T")[0];
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: "Introduction",
      content:
        'ThisByte, LLC ("we", "our", or "us") respects your privacy and is committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you visit our website or use our services.',
    },
    {
      title: "Information We Collect",
      content: `We may collect personal information that you voluntarily provide to us when you:

• Contact us through our website
• Request information about our services
• Engage with us for professional services

This information may include your name, email address, company name, and any other details you choose to provide.`,
    },
    {
      title: "How We Use Your Information",
      content: `We use the information we collect to:

• Respond to your inquiries
• Provide requested services
• Communicate about projects and services
• Improve our website and services
• Comply with legal obligations`,
    },
    {
      title: "Data Security",
      content:
        "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.",
    },
    {
      title: "Third-Party Services",
      content:
        "We may use third-party services (such as hosting providers and email services) that may collect and process your data. These services have their own privacy policies.",
    },
    {
      title: "Your Rights",
      content: `You have the right to:

• Access your personal data
• Request correction of your data
• Request deletion of your data
• Object to processing of your data
• Request restriction of processing`,
    },
    {
      title: "Analytics and Cookies",
      content: `We use Google Analytics and Firebase Analytics to understand how visitors interact with our website. These services use cookies to collect anonymous information such as:

• Pages visited
• Time spent on site
• Traffic sources
• Geographic location (city/country level)
• Device and browser information

This information helps us improve our website and services. You can opt out of Google Analytics by installing the Google Analytics Opt-out Browser Add-on available at https://tools.google.com/dlpage/gaoptout`,
    },
    {
      title: "Contact Us",
      content:
        "If you have questions about this privacy policy or our data practices, please contact us through our website contact form.",
    },
  ];

  return (
    <section className="px-5 md:px-20 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)]">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-[var(--color-text-muted)]">
          Last updated: {currentDate}
        </p>

        <div className="mt-12 md:mt-16 space-y-10">
          {sections.map((section, index) => (
            <div key={index}>
              <h2 className="text-2xl font-semibold text-[var(--color-text-primary)]">
                {section.title}
              </h2>
              <p className="mt-4 text-base text-[var(--color-text-secondary)] leading-relaxed whitespace-pre-line">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-16 text-sm text-[var(--color-text-muted)]">
          © {currentYear} ThisByte, LLC. All rights reserved.
        </p>
      </div>
    </section>
  );
}
