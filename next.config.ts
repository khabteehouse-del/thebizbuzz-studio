import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Next 16 only serves the image qualities listed here (default is 75 only).
     Without this, a quality prop of 80 or 90 is rejected or pushed back to 75. */
  images: {
    qualities: [75, 80, 90],
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
