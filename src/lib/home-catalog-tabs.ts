/** Client-safe tabs for home “Danh Mục Sản Phẩm” (no server imports). */
export const HOME_CATALOG_TABS = [
  { key: "green" as const, label: "Chè xanh", category: "che-xanh" as const },
  { key: "black" as const, label: "Chè đen", category: "che-den" as const },
  {
    key: "tra-quan" as const,
    label: "Nam Dương trà quán",
    category: "nam-duong-tra-quan" as const,
  },
] as const;

export type HomeCatalogTabKey = (typeof HOME_CATALOG_TABS)[number]["key"];
