const SHARPS = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const FLATS = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];

const ROOT = /^([A-G])([#b]?)(.*)$/;

function shiftRoot(root: string, accidental: string, semitones: number): string | null {
  const table = accidental === "b" ? FLATS : SHARPS;
  const from = table.indexOf(root + accidental);
  if (from === -1) return null;
  const to = (((from + semitones) % 12) + 12) % 12;
  return table[to] ?? null;
}

/**
 * Transpose a single chord symbol by `semitones`.
 *
 * Slash chords transpose both halves ("D/F#" -> "E/G#"). Anything that does not
 * start with a note letter — "N.C.", "%", "|" — is returned untouched, so
 * performance markers survive.
 */
export function transposeChord(chord: string, semitones: number): string {
  if (!chord || semitones === 0) return chord;

  if (chord.includes("/")) {
    const [top, bottom, ...rest] = chord.split("/");
    if (rest.length || top === undefined || bottom === undefined) return chord;
    return `${transposeChord(top, semitones)}/${transposeChord(bottom, semitones)}`;
  }

  const m = ROOT.exec(chord);
  if (!m) return chord;

  const next = shiftRoot(m[1] ?? "", m[2] ?? "", semitones);
  return next === null ? chord : next + m[3];
}
