import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Dev only: Next blocks cross-origin requests to its own dev resources, which
   * stops a phone on the same wifi from loading the HMR client. The whole
   * private range is allowed rather than one address, because DHCP hands out a
   * different one every few days. None of this applies to a build. */
  allowedDevOrigins: ["192.168.1.*", "192.168.0.*", "10.0.0.*", "*.local"],

  images: {
    remotePatterns: [
      // GitHub's per-repo social cards — the project grid's imagery
      { protocol: "https", hostname: "opengraph.githubassets.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
    ],
  },

  /* The old domain answers with a permanent redirect so links and search
   * ranking carry over. Matched on the exact host: fana. and s3. under the old
   * domain are separate deployments and must not be caught here. */
  async redirects() {
    return ["jstnlt.my.id", "www.jstnlt.my.id"].map((host) => ({
      source: "/:path*",
      has: [{ type: "host" as const, value: host }],
      destination: "https://jstnlt.id/:path*",
      permanent: true,
    }));
  },
};

export default nextConfig;
