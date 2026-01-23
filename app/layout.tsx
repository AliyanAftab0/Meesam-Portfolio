import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import ClientLayout from "@/components/ClientLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Premium Portfolio | Creative Director & Video Editor",
    template: "%s | Premium Portfolio",
  },
  description:
    "Professional video editor and motion graphics artist specializing in cinematic edits, high-end commercials, and engaging social media content. Based in Pakistan, working with clients globally.",
  keywords: [
    "video editing",
    "motion graphics",
    "graphic design",
    "video editor",
    "creative director",
    "portfolio",
  ],
  authors: [{ name: "Your Name" }],
  creator: "Your Name",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Premium Portfolio | Creative Director & Video Editor",
    description:
      "Professional video editor and motion graphics artist specializing in cinematic edits and high-end commercials.",
    siteName: "Premium Portfolio",
    images: [
      {
        url: `${siteUrl}/pf.png`,
        width: 1200,
        height: 630,
        alt: "Premium Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Premium Portfolio | Creative Director & Video Editor",
    description: "Professional video editor and motion graphics artist",
    images: [`${siteUrl}/pf.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${inter.variable} ${outfit.variable}`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
