/**
 * Greedy column packer.
 *
 * Takes measured flowable heights and fills one column at a time. A flowable
 * taller than a whole column gets its own column rather than looping forever —
 * callers split those at line boundaries before calling here.
 */
export function buildColumns(
  heights: number[],
  colHeight: number | ((columnIndex: number) => number),
  gap: number
): number[][] {
  const heightFor = typeof colHeight === "function" ? colHeight : () => colHeight;
  const columns: number[][] = [];
  let current: number[] = [];
  let used = 0;

  for (let i = 0; i < heights.length; i++) {
    const h = heights[i] ?? 0;
    const need = h + (current.length ? gap : 0);

    if (need > heightFor(columns.length) - used && current.length > 0) {
      columns.push(current);
      current = [];
      used = 0;
    }

    current.push(i);
    used += h + (current.length > 1 ? gap : 0);
  }

  if (current.length) columns.push(current);
  return columns;
}

/** Group packed columns into pages of `columnsPerPage`. */
export function chunkPages(columns: number[][], columnsPerPage: number): number[][][] {
  const per = Math.max(1, columnsPerPage);
  const pages: number[][][] = [];
  for (let i = 0; i < columns.length; i += per) {
    pages.push(columns.slice(i, i + per));
  }
  return pages.length ? pages : [[[]]];
}
