import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Next 16 only serves the image qualities listed here (default is 75 only).
     Without this, a quality prop of 80 or 90 is rejected or pushed back to 75. */
  images: {
    qualities: [75, 80, 90],
  },
  /*
    Client demo pages under /demo are private previews. This header tells search
    engines not to index, cache or follow them. They are also left out of the
    sitemap and linked from nowhere on the site.
  */
  async headers() {
    return [
      {
        source: "/demo/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive, nosnippet" },
        ],
      },
    ];
  },
  /* The design studio now lives on the brand page, below its details. */
  async redirects() {
    return [
      {
        source: "/design",
        destination: "/services/brand-identity-and-creative",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
