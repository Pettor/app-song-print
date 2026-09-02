import { atomWithStorage } from "jotai/utils";
import type { ChordStyle } from "./ChordStyle";
import { DEFAULT_CHORD_STYLE } from "./ChordStyle";

/**
 * How chords are drawn on the sheet. A viewing preference rather than part of
 * the song, so it lives here instead of in the JSON — the same sheet reads
 * differently on a laptop and on a music stand.
 */
export const chordStyleAtom = atomWithStorage<ChordStyle>("songprint.chordStyle", DEFAULT_CHORD_STYLE);

/** Lyric size in live mode, in px. Set once per stage, remembered per device. */
export const liveFontSizeAtom = atomWithStorage<number>("songprint.liveFontSize", 30);

/** Whether the JSON source panel is showing. */
export const sourceOpenAtom = atomWithStorage<boolean>("songprint.sourceOpen", true);
