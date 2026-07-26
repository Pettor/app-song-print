import { describe, expect, it } from "vitest";
import { columnHeight, columnWidth, getPageSpec } from "./PageFormats";

describe("getPageSpec", () => {
  it("defaults to A4 portrait, 1 column, 13px font", () => {
    const spec = getPageSpec();
    expect(spec).toMatchObject({ width: 794, height: 1122, mmWidth: 210, mmHeight: 297, columns: 1, fontSize: 13 });
  });

  it("swaps dimensions for landscape orientation", () => {
    const spec = getPageSpec({ format: "A4", orientation: "landscape" });
    expect(spec).toMatchObject({ width: 1122, height: 794, mmWidth: 297, mmHeight: 210 });
  });

  it("resolves A5 and Letter formats", () => {
    expect(getPageSpec({ format: "A5" })).toMatchObject({ width: 559, height: 794 });
    expect(getPageSpec({ format: "Letter" })).toMatchObject({ width: 816, height: 1056 });
  });

  it("clamps columns to 1-3", () => {
    expect(getPageSpec({ columns: 0 }).columns).toBe(1);
    expect(getPageSpec({ columns: 5 }).columns).toBe(3);
    expect(getPageSpec({ columns: 2 }).columns).toBe(2);
  });

  it("clamps fontSize to 7-28", () => {
    expect(getPageSpec({ fontSize: 1 }).fontSize).toBe(7);
    expect(getPageSpec({ fontSize: 100 }).fontSize).toBe(28);
  });
});

describe("columnWidth / columnHeight", () => {
  it("splits usable width evenly across columns, accounting for gutters", () => {
    const spec = getPageSpec({ columns: 2 });
    // (794 - 48*2 - 32) / 2
    expect(columnWidth(spec)).toBeCloseTo(333, 0);
  });

  it("computes usable height from top/bottom padding", () => {
    const spec = getPageSpec();
    expect(columnHeight(spec)).toBe(1122 - 40 - 52);
  });
});
