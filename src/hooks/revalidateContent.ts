import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from "payload";
import { revalidatePath, revalidateTag } from "next/cache";

import {
  CACHE_TAGS,
  postTag,
  productLineTag,
  productTag,
} from "@/data/cache";

type DocWithSlug = { slug?: string };

function runRevalidation(revalidate: () => void): void {
  try {
    revalidate();
  } catch {
    // Next.js cache APIs only work inside the app runtime, not CLI scripts.
  }
}

export function revalidateProductCollection(
  doc: DocWithSlug,
  operation: string,
): void {
  runRevalidation(() => {
    revalidateTag(CACHE_TAGS.products);
    if (doc.slug) {
      revalidateTag(productTag(doc.slug));
      revalidatePath(`/san-pham/${doc.slug}`);
    }
    revalidatePath("/san-pham");
    revalidatePath("/");
    if (operation === "create" || operation === "update") {
      revalidatePath("/api/public/products");
    }
  });
}

export function revalidateProductLineCollection(
  doc: DocWithSlug,
  operation: string,
): void {
  runRevalidation(() => {
    revalidateTag(CACHE_TAGS.productLines);
    if (doc.slug) {
      revalidateTag(productLineTag(doc.slug));
      revalidatePath(`/dong-tra/${doc.slug}`);
    }
    revalidatePath("/san-pham");
    if (operation === "create" || operation === "update") {
      revalidatePath("/api/public/products");
    }
  });
}

export function revalidatePostCollection(
  doc: DocWithSlug,
  operation: string,
): void {
  runRevalidation(() => {
    revalidateTag(CACHE_TAGS.posts);
    if (doc.slug) {
      revalidateTag(postTag(doc.slug));
      revalidatePath(`/tin-tuc/${doc.slug}`);
    }
    revalidatePath("/tin-tuc");
    if (operation === "create" || operation === "update") {
      revalidatePath("/");
    }
  });
}

export const revalidateProductAfterChange: CollectionAfterChangeHook = ({
  doc,
  operation,
}) => {
  revalidateProductCollection(doc as DocWithSlug, operation);
};

export const revalidateProductAfterDelete: CollectionAfterDeleteHook = ({
  doc,
}) => {
  revalidateProductCollection(doc as DocWithSlug, "delete");
};

export const revalidateProductLineAfterChange: CollectionAfterChangeHook = ({
  doc,
  operation,
}) => {
  revalidateProductLineCollection(doc as DocWithSlug, operation);
};

export const revalidateProductLineAfterDelete: CollectionAfterDeleteHook = ({
  doc,
}) => {
  revalidateProductLineCollection(doc as DocWithSlug, "delete");
};

export const revalidatePostAfterChange: CollectionAfterChangeHook = ({
  doc,
  operation,
}) => {
  revalidatePostCollection(doc as DocWithSlug, operation);
};

export const revalidatePostAfterDelete: CollectionAfterDeleteHook = ({ doc }) => {
  revalidatePostCollection(doc as DocWithSlug, "delete");
};

export const revalidateSiteSettingsAfterChange: GlobalAfterChangeHook = () => {
  runRevalidation(() => {
    revalidateTag(CACHE_TAGS.siteSettings);
    revalidatePath("/", "layout");
  });
};

export const revalidateHomePageAfterChange: GlobalAfterChangeHook = () => {
  runRevalidation(() => {
    revalidateTag(CACHE_TAGS.homePage);
    revalidatePath("/");
  });
};
