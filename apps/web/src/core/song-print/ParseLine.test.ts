import { describe, expect, it } from "vitest";
import { isPlainLyric, parseLine } from "./ParseLine";

describe("parseLine", () => {
  it("attaches a chord to the text that follows it", () => {
    expect(parseLine("En [Dm]enda sak är [Gm]säker")).toEqual([
      { text: "En " },
      { chord: "Dm", text: "enda sak är " },
      { chord: "Gm", text: "säker" },
    ]);
  });

  it("returns a single chord-less segment for plain text", () => {
    expect(parseLine("no chords here")).toEqual([{ text: "no chords here" }]);
  });

  it("treats [[ as a literal [", () => {
    expect(parseLine("[[C] not a chord")).toEqual([{ text: "[C] not a chord" }]);
  });

  it("preserves a blank line as a spacer segment", () => {
    expect(parseLine("")).toEqual([{ text: "" }]);
  });

  it("keeps adjacent chords with no text between them", () => {
    expect(parseLine("[C][G]word")).toEqual([
      { chord: "C", text: "" },
      { chord: "G", text: "word" },
    ]);
  });
});

describe("isPlainLyric", () => {
  it("is true for a line with no chord brackets", () => {
    expect(isPlainLyric("just lyrics")).toBe(true);
  });

  it("is false for a line with a chord bracket", () => {
    expect(isPlainLyric("[C]just lyrics")).toBe(false);
  });

  it("ignores a literal [[ when deciding", () => {
    expect(isPlainLyric("[[literal bracket")).toBe(true);
  });
});
