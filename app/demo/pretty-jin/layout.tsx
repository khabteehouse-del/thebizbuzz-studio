import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "@/components/pretty-jin/pj.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--pj-serif",
  display: "swap",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const sans = Jost({
  subsets: ["latin"],
  variable: "--pj-sans",
  display: "swap",
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Pretty Jin Aesthetics | Demo preview",
  description: "Design preview for Pretty Jin Aesthetics, prepared by BizBuzz.",
  robots: { index: false, follow: false },
  openGraph: { title: "Pretty Jin Aesthetics | Demo preview", type: "website" },
};

export const viewport: Viewport = {
  themeColor: "#fbf5ef",
};

export default function PrettyJinLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className={`${serif.variable} ${sans.variable}`}>{children}</div>;
}
