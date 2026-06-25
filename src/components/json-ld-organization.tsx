import { WEBSITE_DATA } from "@/lib/website-data";
import { absoluteUrl } from "@/lib/utils";

export function JsonLdOrganization() {
  const { contact } = WEBSITE_DATA.navigation.footer;
  const { social } = WEBSITE_DATA.navigation;

  const sameAs = [
    social.facebook,
    social.zalo,
    social.youtube,
  ].filter((url) => url && !url.endsWith("/"));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: WEBSITE_DATA.site.name,
    url: absoluteUrl("/"),
    logo: absoluteUrl(WEBSITE_DATA.brand.assets.logo),
    description: WEBSITE_DATA.site.defaultDescription,
    email: contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.location,
      addressCountry: "VN",
    },
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
