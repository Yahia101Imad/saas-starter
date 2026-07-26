import { describe, it, expect, beforeEach, afterAll } from "vitest";
import { testDb } from "../setup/db";

describe("User creation", () => {
  beforeEach(async () => {
    // تنظيف الجداول قبل كل اختبار لضمان عزل تام
    await testDb.userSettings.deleteMany();
    await testDb.user.deleteMany();
  });

  afterAll(async () => {
    await testDb.$disconnect();
  });

  it("creates a user with correct default values", async () => {
    const user = await testDb.user.create({
      data: {
        name: "Test User",
        email: "test@example.com",
      },
    });

    expect(user.name).toBe("Test User");
    expect(user.email).toBe("test@example.com");
    expect(user.emailVerified).toBe(false);
  });

  it("enforces unique email constraint", async () => {
    await testDb.user.create({
      data: { name: "First User", email: "duplicate@example.com" },
    });

    await expect(
      testDb.user.create({
        data: { name: "Second User", email: "duplicate@example.com" },
      }),
    ).rejects.toThrow();
  });

  it("cascades deletion of user settings when user is deleted", async () => {
    const user = await testDb.user.create({
      data: { name: "Test User", email: "cascade@example.com" },
    });

    await testDb.userSettings.create({
      data: { userId: user.id, theme: "DARK" },
    });

    await testDb.user.delete({ where: { id: user.id } });

    const settings = await testDb.userSettings.findFirst({
      where: { userId: user.id },
    });

    expect(settings).toBeNull();
  });
});
