import { describe, it, expect } from "vitest";
import { contactSchema } from "@/lib/validations/contact";

describe("contactSchema", () => {
  it("accepts valid contact form data", () => {
    const result = contactSchema.safeParse({
      name: "John Doe",
      email: "john@example.com",
      message: "This is a valid message with enough length.",
    });
    expect(result.success).toBe(true);
  });

  it("rejects name shorter than 2 characters", () => {
    const result = contactSchema.safeParse({
      name: "J",
      email: "john@example.com",
      message: "This is a valid message with enough length.",
    });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid email", () => {
    const result = contactSchema.safeParse({
      name: "John Doe",
      email: "not-an-email",
      message: "This is a valid message with enough length.",
    });
    expect(result.success).toBe(false);
  });

  it("rejects message shorter than 10 characters", () => {
    const result = contactSchema.safeParse({
      name: "John Doe",
      email: "john@example.com",
      message: "short",
    });
    expect(result.success).toBe(false);
  });

  it("accepts message exactly at the 10 character minimum", () => {
    const result = contactSchema.safeParse({
      name: "John Doe",
      email: "john@example.com",
      message: "1234567890",
    });
    expect(result.success).toBe(true);
  });
});
