import type { Metadata } from "next";
import { Space_Grotesk, Geist } from "next/font/google";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { SmoothScroll } from "@/components/shared/smooth-scroll";
import { Cursor } from "@/components/shared/cursor";
import { Grain } from "@/components/shared/grain";
import { GbpWidget } from "@/components/tools/gbp-widget";
import { site } from "@/data/site";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display-family",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${geist.variable}`}>
      <body className="min-h-dvh bg-ink text-paper antialiased">
        <div style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}>
          <SmoothScroll />
          <Grain />
          <Cursor />
          <Nav />
          <main>{children}</main>
          <Footer />
          <GbpWidget />
        </div>
      </body>
    </html>
  );
}