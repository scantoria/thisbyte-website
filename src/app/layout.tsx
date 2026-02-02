import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google';
import "./globals.css";

// Font configurations remain unchanged
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// **COMPLIANCE: Metadata must reflect "Full Stack and Beneath" brand**
export const metadata: Metadata = {
  title: "ThisByte - Full Stack and Beneath",
  description: "Enterprise solutions engineered for federal compliance, CMMI maturity, and scalable innovation.",
  keywords: ["CMMI", "federal compliance", "React.js", "Next.js", "enterprise development"],
  authors: [{ name: "ThisByte, LLC" }],
  robots: "index, follow",
};

// **COMPLIANCE: GA_TRACKING_ID must be defined in environment**
const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* COMPLIANCE: Google Analytics included in head */}
        {GA_TRACKING_ID && <GoogleAnalytics gaId={GA_TRACKING_ID} />}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
