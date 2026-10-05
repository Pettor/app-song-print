/**
 * Which key the sheet is written in when a live transpose offset is in effect:
 * the transposed key everyone else is reading, or the original key — for a
 * player who reads the chords they know while the band plays somewhere else.
 */
export const KEY_BASES = ["transposed", "original"] as const;

export type KeyBasis = (typeof KEY_BASES)[number];

export const DEFAULT_KEY_BASIS: KeyBasis = "transposed";
