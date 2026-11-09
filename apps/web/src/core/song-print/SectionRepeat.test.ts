import { describe, expect, it } from "vitest";
import { repeatLabel } from "./SectionRepeat";

describe("repeatLabel", () => {
  it("prints a count of two or more", () => {
    expect(repeatLabel(2)).toBe("x2");
    expect(repeatLabel(4)).toBe("x4");
  });

  it("leaves off a single play", () => {
    expect(repeatLabel(1)).toBeNull();
  });

  it("leaves off a missing, zero or negative count", () => {
    expect(repeatLabel(undefined)).toBeNull();
    expect(repeatLabel(0)).toBeNull();
    expect(repeatLabel(-2)).toBeNull();
  });

  it("leaves off a number that is not one", () => {
    expect(repeatLabel(Number.NaN)).toBeNull();
    expect(repeatLabel(Number.POSITIVE_INFINITY)).toBeNull();
  });
});
