import { describe, it, expect, beforeEach, afterAll } from "vitest";
import { testDb } from "../setup/db";

describe("Subscription", () => {
  beforeEach(async () => {
    await testDb.subscription.deleteMany();
    await testDb.plan.deleteMany();
    await testDb.user.deleteMany();
  });

  afterAll(async () => {
    await testDb.$disconnect();
  });

  it("creates a subscription linked to a user and plan", async () => {
    const user = await testDb.user.create({
      data: { name: "Test User", email: "sub-test@example.com" },
    });

    const plan = await testDb.plan.create({
      data: {
        name: "Test Plan",
        price: 1000,
        interval: "month",
        paddlePriceId: "pri_test_123",
      },
    });

    const subscription = await testDb.subscription.create({
      data: {
        userId: user.id,
        planId: plan.id,
        status: "ACTIVE",
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    });

    expect(subscription.status).toBe("ACTIVE");
    expect(subscription.userId).toBe(user.id);
    expect(subscription.planId).toBe(plan.id);
  });

  it("enforces unique paddleSubscriptionId", async () => {
    const user = await testDb.user.create({
      data: { name: "Test User", email: "sub-unique@example.com" },
    });

    const plan = await testDb.plan.create({
      data: {
        name: "Test Plan",
        price: 1000,
        interval: "month",
        paddlePriceId: "pri_test_456",
      },
    });

    await testDb.subscription.create({
      data: {
        userId: user.id,
        planId: plan.id,
        status: "ACTIVE",
        paddleSubscriptionId: "sub_duplicate",
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(),
      },
    });

    await expect(
      testDb.subscription.create({
        data: {
          userId: user.id,
          planId: plan.id,
          status: "ACTIVE",
          paddleSubscriptionId: "sub_duplicate",
          currentPeriodStart: new Date(),
          currentPeriodEnd: new Date(),
        },
      }),
    ).rejects.toThrow();
  });

  it("upserts subscription correctly on webhook-style update (idempotency)", async () => {
    const user = await testDb.user.create({
      data: { name: "Test User", email: "sub-upsert@example.com" },
    });

    const plan = await testDb.plan.create({
      data: {
        name: "Test Plan",
        price: 1000,
        interval: "month",
        paddlePriceId: "pri_test_789",
      },
    });

    await testDb.subscription.upsert({
      where: { paddleSubscriptionId: "sub_idempotent" },
      create: {
        userId: user.id,
        planId: plan.id,
        status: "ACTIVE",
        paddleSubscriptionId: "sub_idempotent",
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(),
      },
      update: { status: "ACTIVE" },
    });

    await testDb.subscription.upsert({
      where: { paddleSubscriptionId: "sub_idempotent" },
      create: {
        userId: user.id,
        planId: plan.id,
        status: "ACTIVE",
        paddleSubscriptionId: "sub_idempotent",
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(),
      },
      update: { status: "CANCELED" },
    });

    const count = await testDb.subscription.count({
      where: { paddleSubscriptionId: "sub_idempotent" },
    });

    expect(count).toBe(1);
  });
});
