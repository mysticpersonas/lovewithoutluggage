import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

// Serif — headings. Soft, warm, human; its italic carries the emotional words.
const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

// Sans — everything else. Built for screen readability at small sizes.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const DESCRIPTION =
  "A 6-week live coaching journey for couples ready to release past relationship trauma, break emotional cycles, and build love rooted in safety, clarity, and trust.";

export const metadata: Metadata = {
  metadataBase: new URL("https://lovewithoutluggage.com"),
  title: "Love Without Luggage™ | Heal From Past Relationship Trauma",
  description: DESCRIPTION,
  authors: [{ name: "Dr. Travis & Michelle Fox" }],
  keywords: ["relationship coaching", "couples coaching", "relationship trauma", "healing", "Mind Personas"],
  openGraph: {
    type: "website",
    title: "Love Without Luggage™ | Heal From Past Relationship Trauma",
    description: DESCRIPTION,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Dr. Travis & Michelle Fox" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Love Without Luggage™ | Heal From Past Relationship Trauma",
    description: DESCRIPTION,
    images: ["/og-image.jpg"],
  },
};

export const viewport = { themeColor: "#0f0911" };

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <head>
        {/* Poster is the first thing painted in the hero — fetch it early */}
        <link rel="preload" as="image" href="/hero-poster.jpg" fetchPriority="high" />
      </head>
      <body>{children}</body>
    </html>
  );
}
