const serverURL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export function productPreviewUrl(slug: string): string {
  return `${serverURL}/san-pham/${slug}`;
}

export function postPreviewUrl(slug: string): string {
  return `${serverURL}/tin-tuc/${slug}`;
}

export function productLinePreviewUrl(slug: string): string {
  return `${serverURL}/dong-tra/${slug}`;
}
