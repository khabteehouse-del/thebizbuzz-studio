import type { Metadata } from "next";
import { Newsreader, Geist } from "next/font/google";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { SmoothScroll } from "@/components/shared/smooth-scroll";
import { Cursor } from "@/components/shared/cursor";
import { site } from "@/data/site";
import "./globals.css";

/*
  Two families, one job each.
  Newsreader carries the editorial voice on headlines, Geist handles
  everything functional. The pairing tracks the positioning directly:
  a written, considered display face against a precise interface face.
*/
const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
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
    <html lang="en" className={`${newsreader.variable} ${geist.variable}`}>
      <body className="min-h-dvh bg-ink text-paper antialiased">
        <SmoothScroll />
        <Cursor />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
