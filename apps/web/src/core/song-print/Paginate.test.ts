import { describe, expect, it } from "vitest";
import { buildColumns, chunkPages } from "./Paginate";

describe("buildColumns", () => {
  it("packs items into a single column while they fit", () => {
    expect(buildColumns([10, 10, 10], 100, 5)).toEqual([[0, 1, 2]]);
  });

  it("starts a new column when the next item would overflow", () => {
    expect(buildColumns([60, 60], 100, 5)).toEqual([[0], [1]]);
  });

  it("gives an over-height item its own column rather than looping", () => {
    expect(buildColumns([200], 100, 5)).toEqual([[0]]);
  });

  it("supports a per-column height function", () => {
    function heightFor(i: number): number {
      return i === 0 ? 50 : 100;
    }
    expect(buildColumns([40, 40], heightFor, 5)).toEqual([[0], [1]]);
  });

  it("returns an empty array for no items", () => {
    expect(buildColumns([], 100, 5)).toEqual([]);
  });
});

describe("chunkPages", () => {
  it("groups columns into pages of the given size", () => {
    expect(chunkPages([[0], [1], [2]], 2)).toEqual([[[0], [1]], [[2]]]);
  });

  it("puts every column on its own page when columnsPerPage is 1", () => {
    expect(chunkPages([[0], [1]], 1)).toEqual([[[0]], [[1]]]);
  });

  it("returns a single empty page for no columns", () => {
    expect(chunkPages([], 1)).toEqual([[[]]]);
  });
});
