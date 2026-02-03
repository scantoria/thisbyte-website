import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google';
import ServiceWorkerRegistration from "./components/ServiceWorkerRegistration";
import "./globals.css";

// Font configurations matching Flutter site
const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "600"],
});

// Viewport configuration
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#00D4FF",
};

// Metadata with PWA configuration
export const metadata: Metadata = {
  title: "ThisByte - Full Stack and Beneath",
  description: "Enterprise solutions engineered for federal compliance, CMMI maturity, and scalable innovation.",
  keywords: ["CMMI", "federal compliance", "React.js", "Next.js", "enterprise development", "infrastructure", "IT engineering"],
  authors: [{ name: "ThisByte, LLC" }],
  robots: "index, follow",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.png",
    apple: "/Icon-192.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "ThisByte",
  },
  formatDetection: {
    telephone: false,
  },
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
        className={`${ibmPlexSans.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ServiceWorkerRegistration />
        {children}
      </body>
    </html>
  );
}
