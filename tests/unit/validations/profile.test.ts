import { describe, it, expect } from "vitest";
import {
  updateProfileSchema,
  changeEmailSchema,
} from "@/lib/validations/profile";

describe("updateProfileSchema", () => {
  it("accepts a valid name", () => {
    const result = updateProfileSchema.safeParse({ name: "John Doe" });
    expect(result.success).toBe(true);
  });

  it("rejects name shorter than 2 characters", () => {
    const result = updateProfileSchema.safeParse({ name: "J" });
    expect(result.success).toBe(false);
  });

  it("rejects name longer than 100 characters", () => {
    const result = updateProfileSchema.safeParse({ name: "a".repeat(101) });
    expect(result.success).toBe(false);
  });

  it("accepts name exactly at the 100 character limit", () => {
    const result = updateProfileSchema.safeParse({ name: "a".repeat(100) });
    expect(result.success).toBe(true);
  });
});

describe("changeEmailSchema", () => {
  it("accepts a valid email", () => {
    const result = changeEmailSchema.safeParse({ email: "test@example.com" });
    expect(result.success).toBe(true);
  });

  it("rejects an invalid email format", () => {
    const result = changeEmailSchema.safeParse({ email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("rejects an empty string", () => {
    const result = changeEmailSchema.safeParse({ email: "" });
    expect(result.success).toBe(false);
  });
});
