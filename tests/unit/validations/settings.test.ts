import { describe, it, expect } from "vitest";
import { updateThemeSchema } from "@/lib/validations/settings";

describe("updateThemeSchema", () => {
  it("accepts LIGHT", () => {
    const result = updateThemeSchema.safeParse({ theme: "LIGHT" });
    expect(result.success).toBe(true);
  });

  it("accepts DARK", () => {
    const result = updateThemeSchema.safeParse({ theme: "DARK" });
    expect(result.success).toBe(true);
  });

  it("accepts SYSTEM", () => {
    const result = updateThemeSchema.safeParse({ theme: "SYSTEM" });
    expect(result.success).toBe(true);
  });

  it("rejects an invalid theme value", () => {
    const result = updateThemeSchema.safeParse({ theme: "BLUE" });
    expect(result.success).toBe(false);
  });

  it("rejects lowercase values (case-sensitive enum)", () => {
    const result = updateThemeSchema.safeParse({ theme: "light" });
    expect(result.success).toBe(false);
  });
});
