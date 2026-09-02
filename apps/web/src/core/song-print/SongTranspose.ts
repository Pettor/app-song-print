import { parseLine } from "./ParseLine";
import type { Section, Song } from "./SongTypes";
import { transposeChord } from "./TransposeChord";

const CHROMATIC = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const FLAT_NAMES = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];

/** The twelve keys offered as transpose targets, in chromatic order. */
export const KEYS: string[] = CHROMATIC;

/** Keys conventionally written with flats — everything else gets sharps. */
const FLAT_KEYS = ["F", "Bb", "Eb", "Ab", "Db", "Gb", "Dm", "Gm", "Cm", "Fm", "Bbm", "Ebm"];

const ROOT = /^([A-G])([#b]?)/;

/** Pitch class of a key or chord root, or -1 when it does not start on a note. */
function pitchClass(name: string): number {
  const m = ROOT.exec(name.trim());
  if (!m) return -1;
  const root = (m[1] ?? "") + (m[2] ?? "");
  const sharp = CHROMATIC.indexOf(root);
  return sharp >= 0 ? sharp : FLAT_NAMES.indexOf(root);
}

/** Whether a sheet in `key` should be spelled with flats. */
export function keyPrefersFlats(key: string): boolean {
  return FLAT_KEYS.includes(key.trim());
}

/**
 * Semitones from `from` up to `to`, always as a value in 0..11 — the shortest
 * upward distance, since a sheet is transposed by pitch class, not octave.
 * Unrecognisable keys mean no shift.
 */
export function semitonesBetween(from: string, to: string): number {
  const a = pitchClass(from);
  const b = pitchClass(to);
  if (a < 0 || b < 0) return 0;
  return (((b - a) % 12) + 12) % 12;
}

/** The same interval as `semitonesBetween`, signed to the nearer direction (-5..6). */
export function signedSemitones(steps: number): number {
  return steps > 6 ? steps - 12 : steps;
}

/** Every chord in the song, in reading order, without duplicates. */
export function distinctChords(song: Song): string[] {
  const seen = new Set<string>();
  const out: string[] = [];

  function add(chord: string | undefined): void {
    if (!chord || seen.has(chord)) return;
    seen.add(chord);
    out.push(chord);
  }

  for (const section of song.sections ?? []) {
    section.chords?.forEach(add);
    for (const line of section.lines ?? []) {
      parseLine(line).forEach((segment) => add(segment.chord));
    }
  }

  return out;
}

/** Rewrite every bracketed chord in a lyric line, leaving the lyrics alone. */
function transposeLine(line: string, semitones: number, preferFlats: boolean): string {
  return line.replace(/\[([^\]]*)\]/g, (match, chord: string) =>
    chord === "" ? match : `[${transposeChord(chord.trim(), semitones, preferFlats)}]`
  );
}

function transposeSection(section: Section, semitones: number, preferFlats: boolean): Section {
  const next: Section = { ...section };
  if (section.chords) next.chords = section.chords.map((c) => transposeChord(c, semitones, preferFlats));
  if (section.lines) next.lines = section.lines.map((l) => transposeLine(l, semitones, preferFlats));
  return next;
}

/** The key the sheet actually sounds in: the written key plus any live offset. */
export function effectiveKey(song: Song): string {
  const offset = Math.round(song.transpose ?? 0);
  const key = song.key ?? "C";
  return offset === 0 ? key : transposeChord(key, offset);
}

/**
 * Rewrite a whole song into `targetKey`.
 *
 * Unlike the `transpose` field — a live offset the renderer applies on the way
 * to the page — this bakes the new chords into the song itself, sets `key` and
 * resets `transpose` to 0, so what is saved is what is seen. Any offset already
 * in effect is baked in along the way.
 */
export function transposeSong(song: Song, targetKey: string): Song {
  const offset = Math.round(song.transpose ?? 0);
  const semitones = offset + semitonesBetween(effectiveKey(song), targetKey);
  const preferFlats = keyPrefersFlats(targetKey);

  return {
    ...song,
    key: targetKey,
    transpose: 0,
    sections: (song.sections ?? []).map((s) => transposeSection(s, semitones, preferFlats)),
  };
}
