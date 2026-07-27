const SHARPS = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const FLATS = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];

const ROOT = /^([A-G])([#b]?)(.*)$/;

function shiftRoot(root: string, accidental: string, semitones: number, preferFlats?: boolean): string | null {
  // Without a spelling preference a chord keeps the accidental it was written
  // with; with one, the whole sheet is respelled to suit the target key.
  const source = accidental === "b" ? FLATS : SHARPS;
  const target = preferFlats === undefined ? source : preferFlats ? FLATS : SHARPS;
  const from = source.indexOf(root + accidental);
  if (from === -1) return null;
  const to = (((from + semitones) % 12) + 12) % 12;
  return target[to] ?? null;
}

/**
 * Transpose a single chord symbol by `semitones`.
 *
 * Slash chords transpose both halves ("D/F#" -> "E/G#"). Anything that does not
 * start with a note letter — "N.C.", "%", "|" — is returned untouched, so
 * performance markers survive.
 *
 * `preferFlats` forces the spelling of the result: flats when true, sharps when
 * false. Left out, each chord keeps its own accidental style.
 */
export function transposeChord(chord: string, semitones: number, preferFlats?: boolean): string {
  if (!chord) return chord;
  if (semitones === 0 && preferFlats === undefined) return chord;

  if (chord.includes("/")) {
    const [top, bottom, ...rest] = chord.split("/");
    if (rest.length || top === undefined || bottom === undefined) return chord;
    return `${transposeChord(top, semitones, preferFlats)}/${transposeChord(bottom, semitones, preferFlats)}`;
  }

  const m = ROOT.exec(chord);
  if (!m) return chord;

  const next = shiftRoot(m[1] ?? "", m[2] ?? "", semitones, preferFlats);
  return next === null ? chord : next + m[3];
}
