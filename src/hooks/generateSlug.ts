import type { CollectionBeforeValidateHook } from "payload";

function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

type SlugSourceField = "name" | "title";

export function generateSlugFromField(
  sourceField: SlugSourceField,
): CollectionBeforeValidateHook {
  return ({ data, operation }) => {
    if (!data) return data;

    const source = data[sourceField];
    const existingSlug = data.slug;

    if (
      typeof source === "string" &&
      source.trim() &&
      (!existingSlug || (operation === "create" && !existingSlug.trim()))
    ) {
      data.slug = slugify(source);
    } else if (typeof existingSlug === "string" && existingSlug.trim()) {
      data.slug = slugify(existingSlug);
    }

    return data;
  };
}
