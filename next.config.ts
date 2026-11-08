import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
