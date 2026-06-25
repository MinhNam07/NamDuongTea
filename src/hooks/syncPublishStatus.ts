import type { CollectionBeforeChangeHook } from "payload";

/** Keep legacy `status` field in sync with Payload `_status` for drafts. */
export const syncPublishStatus: CollectionBeforeChangeHook = ({ data }) => {
  if (!data || typeof data !== "object") return data;

  if ("status" in data && typeof data.status === "string") {
    if (data.status === "published") {
      data._status = "published";
    } else if (data.status === "draft") {
      data._status = "draft";
    }
  } else if ("_status" in data && typeof data._status === "string") {
    data.status = data._status === "published" ? "published" : "draft";
  }

  return data;
};
