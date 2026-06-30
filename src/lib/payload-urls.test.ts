import { describe, expect, it } from "vitest";

import { getAllowedOrigins, normalizeOrigin } from "@/lib/payload-urls";

describe("normalizeOrigin", () => {
  it("strips trailing slashes", () => {
    expect(normalizeOrigin("https://example.com/")).toBe("https://example.com");
    expect(normalizeOrigin("http://localhost:3000///")).toBe(
      "http://localhost:3000",
    );
  });
});

describe("getAllowedOrigins", () => {
  it("includes localhost in development", () => {
    const origins = getAllowedOrigins();
    expect(origins).toContain("http://localhost:3000");
  });
});
