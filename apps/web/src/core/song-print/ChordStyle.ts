/**
 * How chord symbols are drawn above the lyrics: as filled chips, as coloured
 * text, or as plain text that disappears into the page in black and white.
 */
export const CHORD_STYLES = ["chip", "accent", "plain"] as const;

export type ChordStyle = (typeof CHORD_STYLES)[number];

export const DEFAULT_CHORD_STYLE: ChordStyle = "chip";
