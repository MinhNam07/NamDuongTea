import "server-only";

import { getSiteSettings } from "@/data/site-settings";
import {
  FOOTER_PRODUCT_LINKS,
  FOOTER_QUICK_LINKS,
  PRIMARY_NAV,
  SOCIAL_LINKS,
  SUPPORT_CHAT_URL,
} from "@/lib/site-navigation";
import { WEBSITE_DATA } from "@/lib/website-data";

/** Server-side navigation loader with CMS + legacy fallback. */
export async function loadSiteNavigation() {
  const settings = await getSiteSettings();
  return {
    primaryNav:
      settings.primaryNav.length > 0 ? settings.primaryNav : PRIMARY_NAV,
    footerQuickLinks:
      settings.footerQuickLinks.length > 0
        ? settings.footerQuickLinks
        : FOOTER_QUICK_LINKS,
    footerProductLinks:
      settings.footerProductLinks.length > 0
        ? settings.footerProductLinks
        : FOOTER_PRODUCT_LINKS,
    social: settings.social ?? SOCIAL_LINKS,
    supportChatUrl: settings.social?.supportChatUrl ?? SUPPORT_CHAT_URL,
    contact: settings.contact ?? WEBSITE_DATA.navigation.footer.contact,
  };
}
