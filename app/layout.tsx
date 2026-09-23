import type { Metadata } from "next";
import Script from "next/script";
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
  verification: {
    google: "yvby638ucQqLtFLQVAitAmDg_zh_K1xif3WSyw5tnIE",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "The Biz Buzz",
  alternateName: "Biz Buzz",
  url: "https://www.thebizbuzz.studio/",
  logo: "https://www.thebizbuzz.studio/images/logo/logo.png",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "",
    contactType: "customer service",
    areaServed: ["AE", "PK"],
    availableLanguage: "en",
  },
  sameAs: "https://www.linkedin.com/company/bizbuzzstudio",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${geist.variable}`}>
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-NR2FWM8L');`}
        </Script>

        {/* Google tag (gtag.js) for GA4 */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-CKHWKZ10L3"
          strategy="afterInteractive"
        />
        <Script id="ga4" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-CKHWKZ10L3');`}
        </Script>

        {/* Organization schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="min-h-dvh bg-ink text-paper antialiased">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NR2FWM8L"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

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