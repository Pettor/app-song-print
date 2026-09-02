import { describe, expect, it } from "vitest";
import { distinctChords, effectiveKey, keyPrefersFlats, semitonesBetween, transposeSong } from "./SongTranspose";
import type { Song } from "./SongTypes";

const song: Song = {
  title: "Example Song",
  key: "C",
  sections: [
    { name: "Intro", chords: ["C", "G", "Am", "F"] },
    { name: "Verse 1", lines: ["[C]Type your lyrics [G]here", "[Am]and a second [F]line"] },
  ],
};

describe("semitonesBetween", () => {
  it("measures upward distance between two keys", () => {
    expect(semitonesBetween("C", "D")).toBe(2);
  });

  it("wraps downward intervals into the octave above", () => {
    expect(semitonesBetween("D", "C")).toBe(10);
  });

  it("treats enharmonic spellings as the same key", () => {
    expect(semitonesBetween("C#", "Db")).toBe(0);
  });

  it("does not shift when a key is unrecognisable", () => {
    expect(semitonesBetween("H", "D")).toBe(0);
  });
});

describe("keyPrefersFlats", () => {
  it("is true for flat keys", () => {
    expect(keyPrefersFlats("Eb")).toBe(true);
  });

  it("is false for sharp keys", () => {
    expect(keyPrefersFlats("A")).toBe(false);
  });
});

describe("distinctChords", () => {
  it("collects chords from both chord rows and lyric lines, without duplicates", () => {
    expect(distinctChords(song)).toEqual(["C", "G", "Am", "F"]);
  });

  it("returns nothing for a song with no sections", () => {
    expect(distinctChords({})).toEqual([]);
  });
});

describe("effectiveKey", () => {
  it("is the written key when there is no offset", () => {
    expect(effectiveKey(song)).toBe("C");
  });

  it("applies a live transpose offset", () => {
    expect(effectiveKey({ ...song, transpose: 2 })).toBe("D");
  });
});

describe("transposeSong", () => {
  it("rewrites chord rows and lyric chords into the target key", () => {
    const result = transposeSong(song, "D");

    expect(result.sections?.[0]?.chords).toEqual(["D", "A", "Bm", "G"]);
    expect(result.sections?.[1]?.lines).toEqual(["[D]Type your lyrics [A]here", "[Bm]and a second [G]line"]);
  });

  it("records the new key and clears the live offset", () => {
    const result = transposeSong({ ...song, transpose: 2 }, "F");

    expect(result.key).toBe("F");
    expect(result.transpose).toBe(0);
  });

  it("bakes in an existing offset so the sheet sounds unchanged", () => {
    // Written in C but sounding in D, retargeted at D: the chords move by 2.
    const result = transposeSong({ ...song, transpose: 2 }, "D");

    expect(result.sections?.[0]?.chords).toEqual(["D", "A", "Bm", "G"]);
  });

  it("spells the result with flats when the target key takes flats", () => {
    const result = transposeSong(song, "Eb");

    expect(result.sections?.[0]?.chords).toEqual(["Eb", "Bb", "Cm", "Ab"]);
  });

  it("leaves lyrics and section names untouched", () => {
    const result = transposeSong(song, "D");

    expect(result.sections?.[1]?.name).toBe("Verse 1");
    expect(result.title).toBe("Example Song");
  });
});
