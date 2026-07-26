import { describe, it, expect, beforeEach, afterAll } from "vitest";
import { testDb } from "../setup/db";

describe("Session", () => {
  beforeEach(async () => {
    await testDb.session.deleteMany();
    await testDb.user.deleteMany();
  });

  afterAll(async () => {
    await testDb.$disconnect();
  });

  it("creates a session linked to a user", async () => {
    const user = await testDb.user.create({
      data: { name: "Test User", email: "session-test@example.com" },
    });

    const session = await testDb.session.create({
      data: {
        userId: user.id,
        token: "test-token-123",
        expiresAt: new Date(Date.now() + 60 * 60 * 1000),
      },
    });

    expect(session.userId).toBe(user.id);
  });

  it("cascades session deletion when user is deleted", async () => {
    const user = await testDb.user.create({
      data: { name: "Test User", email: "session-cascade@example.com" },
    });

    await testDb.session.create({
      data: {
        userId: user.id,
        token: "test-token-456",
        expiresAt: new Date(Date.now() + 60 * 60 * 1000),
      },
    });

    await testDb.user.delete({ where: { id: user.id } });

    const session = await testDb.session.findFirst({
      where: { userId: user.id },
    });

    expect(session).toBeNull();
  });

  it("enforces unique session token", async () => {
    const user = await testDb.user.create({
      data: { name: "Test User", email: "session-unique@example.com" },
    });

    await testDb.session.create({
      data: {
        userId: user.id,
        token: "duplicate-token",
        expiresAt: new Date(),
      },
    });

    await expect(
      testDb.session.create({
        data: {
          userId: user.id,
          token: "duplicate-token",
          expiresAt: new Date(),
        },
      }),
    ).rejects.toThrow();
  });
});
