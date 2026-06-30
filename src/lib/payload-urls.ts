/** Strip trailing slash so CSRF checks match browser Origin headers. */
export function normalizeOrigin(url: string): string {
  return url.replace(/\/+$/, "");
}

export function getServerURL(): string {
  const url =
    process.env.NEXT_PUBLIC_PAYLOAD_URL ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    "http://localhost:3000";

  return normalizeOrigin(url);
}

/** Origins trusted for CORS, CSRF, and JWT cookie extraction. */
export function getAllowedOrigins(): string[] {
  const origins = new Set<string>();

  for (const value of [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.NEXT_PUBLIC_PAYLOAD_URL,
  ]) {
    if (value) origins.add(normalizeOrigin(value));
  }

  if (process.env.NODE_ENV !== "production") {
    origins.add("http://localhost:3000");
    origins.add("http://127.0.0.1:3000");
  }

  if (origins.size === 0) {
    origins.add("http://localhost:3000");
  }

  return [...origins];
}
