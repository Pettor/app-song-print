import type { PageSpec } from "./SongTypes";

/** Page dimensions in CSS px at 96dpi, alongside the mm jsPDF needs. */
const FORMATS = {
  A4: { w: 794, h: 1122, mmW: 210, mmH: 297 },
  A5: { w: 559, h: 794, mmW: 148, mmH: 210 },
  Letter: { w: 816, h: 1056, mmW: 216, mmH: 279 },
} as const;

export interface ResolvedPage {
  width: number;
  height: number;
  mmWidth: number;
  mmHeight: number;
  columns: number;
  fontSize: number;
  padLeft: number;
  padRight: number;
  padBottom: number;
}

export interface PageOptions {
  /** Widen the side margins so a hole punch clears the text. */
  punchMargin?: boolean;
  /** Leave out the footer, and give its room back to the columns. Defaults to shown. */
  hideFooter?: boolean;
}

/** Sheet font sizes the tools menu offers, and the renderer honours. */
export const SHEET_FONT_MIN = 9;
export const SHEET_FONT_MAX = 22;

export const PAGE_PAD_X = 48;
/**
 * Extra side margin for a hole punch: 48 + 48px is ~25mm, clear of the holes.
 * Added to both sides so the page still sits centred.
 */
export const PUNCH_MARGIN = 48;
export const PAGE_PAD_TOP = 40;
export const PAGE_PAD_BOTTOM = 52;
/** Bottom margin with no footer to make room for: the same as the top. */
export const PAGE_PAD_BOTTOM_BARE = PAGE_PAD_TOP;
export const COLUMN_GUTTER = 32;
export const SECTION_GAP = 18;

function clamp(n: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, n));
}

/** Fill in every default so a half-written JSON still renders. */
export function getPageSpec(page?: PageSpec, options?: PageOptions): ResolvedPage {
  const f = FORMATS[page?.format ?? "A4"] ?? FORMATS.A4;
  const landscape = page?.orientation === "landscape";

  const columns = clamp(Math.round(page?.columns ?? 1), 1, 3);
  const fontSize = clamp(page?.fontSize ?? 13, 7, 28);

  const padX = PAGE_PAD_X + (options?.punchMargin ? PUNCH_MARGIN : 0);

  return {
    width: landscape ? f.h : f.w,
    height: landscape ? f.w : f.h,
    mmWidth: landscape ? f.mmH : f.mmW,
    mmHeight: landscape ? f.mmW : f.mmH,
    columns,
    fontSize,
    padLeft: padX,
    padRight: padX,
    padBottom: options?.hideFooter ? PAGE_PAD_BOTTOM_BARE : PAGE_PAD_BOTTOM,
  };
}

/** Usable width of a single column, accounting for padding and the gutters. */
export function columnWidth(p: ResolvedPage): number {
  const inner = p.width - p.padLeft - p.padRight;
  return (inner - COLUMN_GUTTER * (p.columns - 1)) / p.columns;
}

/** Usable height of a column. */
export function columnHeight(p: ResolvedPage): number {
  return p.height - PAGE_PAD_TOP - p.padBottom;
}
