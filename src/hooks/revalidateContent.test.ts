import { describe, expect, it, vi } from "vitest";

import {
  revalidatePostCollection,
  revalidateProductCollection,
} from "@/hooks/revalidateContent";

vi.mock("next/cache", () => ({
  revalidateTag: vi.fn(),
  revalidatePath: vi.fn(),
}));

import { revalidatePath, revalidateTag } from "next/cache";

describe("revalidateContent", () => {
  it("revalidates product tags and paths", () => {
    revalidateProductCollection({ slug: "tra-dinh-ngoc" }, "update");
    expect(revalidateTag).toHaveBeenCalledWith("products");
    expect(revalidateTag).toHaveBeenCalledWith("product:tra-dinh-ngoc");
    expect(revalidatePath).toHaveBeenCalledWith("/san-pham/tra-dinh-ngoc");
    expect(revalidatePath).toHaveBeenCalledWith("/san-pham");
  });

  it("revalidates post tags and paths", () => {
    revalidatePostCollection({ slug: "bai-viet-1" }, "update");
    expect(revalidateTag).toHaveBeenCalledWith("posts");
    expect(revalidateTag).toHaveBeenCalledWith("post:bai-viet-1");
    expect(revalidatePath).toHaveBeenCalledWith("/tin-tuc/bai-viet-1");
  });
});
