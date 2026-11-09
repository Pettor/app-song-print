/**
 * How a section's repeat count is printed: `4` becomes `x4`, beside the
 * section name.
 *
 * Only two plays and up are worth printing — `x1` is noise — and the raw JSON
 * is re-read on every keystroke, so a half-typed or nonsense number has to
 * drop out rather than reach the page.
 */
export function repeatLabel(repeat?: number): string | null {
  return typeof repeat === "number" && Number.isFinite(repeat) && repeat > 1 ? `x${repeat}` : null;
}
