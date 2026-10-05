import SONGS_RAW, { SONGS_SOURCE as SONGS_SOURCE_RAW } from "virtual:songs";
import { type Preset, SongSchema } from "./SongTypes";

// virtual:songs is built by `songsDirPlugin` (@config/vite) straight from
// disk, with no Zod validation on the Node side — re-validate here so a
// malformed file in SONGS_DIR degrades to an empty song instead of crashing
// the renderer downstream.
function normalize(preset: Preset): Preset {
  const result = SongSchema.safeParse(preset.data);
  return result.success ? { ...preset, data: result.data } : { ...preset, data: {} };
}

/**
 * Setlist order: songs carrying an `order` come first, lowest number first.
 * The rest keep the library's own (filename) order behind them — `sort` is
 * stable, so an unnumbered library is left exactly as it was loaded.
 */
function bySetlistOrder(a: Preset, b: Preset): number {
  const left = a.data.order;
  const right = b.data.order;
  if (left === undefined) return right === undefined ? 0 : 1;
  if (right === undefined) return -1;
  return left - right;
}

/** The song library loaded from `SONGS_DIR` (or the bundled example, see `SONGS_SOURCE`). */
export const SONGS: Preset[] = SONGS_RAW.map(normalize).sort(bySetlistOrder);

/** Whether `SONGS` came from a real `SONGS_DIR`, or the bundled fallback example. */
export const SONGS_SOURCE: "directory" | "example" = SONGS_SOURCE_RAW;
