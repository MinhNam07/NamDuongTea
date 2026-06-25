import { describe, expect, it } from "vitest";

import {
  canPublish,
  hasRole,
  publishedOnly,
  ROLES,
} from "@/access";

describe("access roles", () => {
  it("admin can publish", () => {
    expect(canPublish({ role: ROLES.ADMIN })).toBe(true);
  });

  it("manager can publish", () => {
    expect(canPublish({ role: ROLES.MANAGER })).toBe(true);
  });

  it("editor cannot publish", () => {
    expect(canPublish({ role: ROLES.EDITOR })).toBe(false);
  });

  it("hasRole checks multiple roles", () => {
    expect(hasRole({ role: ROLES.MANAGER }, ROLES.ADMIN, ROLES.MANAGER)).toBe(
      true,
    );
  });
});

describe("publishedOnly", () => {
  it("allows authenticated users full read", () => {
    const result = publishedOnly({
      req: { user: { id: 1, role: "editor" } },
    } as Parameters<typeof publishedOnly>[0]);
    expect(result).toBe(true);
  });

  it("restricts anonymous users to published docs", () => {
    const result = publishedOnly({
      req: { user: null },
    } as Parameters<typeof publishedOnly>[0]);
    expect(result).toEqual({
      and: [
        { _status: { equals: "published" } },
        { status: { equals: "published" } },
      ],
    });
  });
});
