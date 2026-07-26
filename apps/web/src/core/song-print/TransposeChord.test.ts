import { describe, expect, it } from "vitest";
import { transposeChord } from "./TransposeChord";

describe("transposeChord", () => {
  it("returns the chord unchanged when semitones is 0", () => {
    expect(transposeChord("Dm", 0)).toBe("Dm");
  });

  it("shifts a natural root up using sharps", () => {
    expect(transposeChord("C", 2)).toBe("D");
  });

  it("shifts a sharp root, preserving the chord quality suffix", () => {
    expect(transposeChord("F#m", 1)).toBe("Gm");
  });

  it("shifts a flat root using flats", () => {
    expect(transposeChord("Bb", 2)).toBe("C");
  });

  it("wraps around the octave downward", () => {
    expect(transposeChord("C", -1)).toBe("B");
  });

  it("transposes both halves of a slash chord", () => {
    expect(transposeChord("D/F#", 2)).toBe("E/G#");
  });

  it("leaves non-chord performance markers untouched", () => {
    expect(transposeChord("N.C.", 3)).toBe("N.C.");
    expect(transposeChord("%", 3)).toBe("%");
    expect(transposeChord("|", 3)).toBe("|");
  });

  it("leaves an empty chord untouched", () => {
    expect(transposeChord("", 5)).toBe("");
  });
});
