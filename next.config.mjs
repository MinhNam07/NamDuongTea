function s3RemotePatterns() {
  const publicBase = process.env.S3_PUBLIC_BASE_URL;
  if (!publicBase) return [];

  try {
    const url = new URL(publicBase);
    return [
      {
        protocol: url.protocol.replace(":", ""),
        hostname: url.hostname,
        pathname: "/**",
      },
    ];
  } catch {
    return [];
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/dong-tra/:slug",
        destination: "/san-pham/:slug",
        permanent: true,
      },
      {
        source: "/set-tra-tet",
        destination: "/nam-duong-tra-quan",
        permanent: true,
      },
      {
        source: "/set-tra-tet/:path*",
        destination: "/nam-duong-tra-quan/:path*",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.namduongtea.vn" },
      ...s3RemotePatterns(),
    ],
  },
  reactCompiler: false,
};

export default nextConfig;
