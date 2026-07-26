import { describe, it, expect } from "vitest";
import { mapPaddleStatus } from "./route";

describe("mapPaddleStatus", () => {
  it("maps active to ACTIVE", () => {
    expect(mapPaddleStatus("active")).toBe("ACTIVE");
  });

  it("maps canceled to CANCELED", () => {
    expect(mapPaddleStatus("canceled")).toBe("CANCELED");
  });

  it("maps past_due to PAST_DUE", () => {
    expect(mapPaddleStatus("past_due")).toBe("PAST_DUE");
  });

  it("maps trialing to TRIALING", () => {
    expect(mapPaddleStatus("trialing")).toBe("TRIALING");
  });

  it("maps paused to EXPIRED", () => {
    expect(mapPaddleStatus("paused")).toBe("EXPIRED");
  });

  it("maps unknown status to INCOMPLETE", () => {
    expect(mapPaddleStatus("some_unexpected_value")).toBe("INCOMPLETE");
  });
});
