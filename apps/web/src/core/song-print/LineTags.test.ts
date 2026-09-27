import { describe, expect, it } from "vitest";
import { expandLines } from "./LineTags";

describe("expandLines", () => {
  it("leaves untagged lines alone", () => {
    expect(expandLines(["[C]hello", "", "world"])).toEqual({
      lines: [{ text: "[C]hello" }, { text: "" }, { text: "world" }],
      breakAfter: false,
    });
  });

  it("turns a lone [bl] into a single blank spacer line", () => {
    expect(expandLines(["one", "[bl]", "two"]).lines).toEqual([{ text: "one" }, { text: "" }, { text: "two" }]);
  });

  it("stacks a blank line per [bl]", () => {
    expect(expandLines(["[bl][bl]"]).lines).toEqual([{ text: "" }, { text: "" }]);
  });

  it("breaks a line in two at [bl] and spaces the halves apart", () => {
    expect(expandLines(["first[bl]second"]).lines).toEqual([{ text: "first" }, { text: "" }, { text: "second" }]);
  });

  it("adds a spacer after a trailing [bl]", () => {
    expect(expandLines(["first[bl]"]).lines).toEqual([{ text: "first" }, { text: "" }]);
  });

  it("marks the line after a [bp] as starting a new page", () => {
    expect(expandLines(["one", "[bp]", "two"]).lines).toEqual([{ text: "one" }, { text: "two", pageBreak: true }]);
  });

  it("splits a line at a mid-line [bp] without adding a spacer", () => {
    expect(expandLines(["first[bp]second"]).lines).toEqual([{ text: "first" }, { text: "second", pageBreak: true }]);
  });

  it("reports a trailing [bp] as breakAfter, for the next section to honour", () => {
    expect(expandLines(["one", "[bp]"])).toEqual({ lines: [{ text: "one" }], breakAfter: true });
  });

  it("keeps chords and literal brackets in the text", () => {
    expect(expandLines(["[Am]a [[bl] b[bl][G]c"]).lines).toEqual([
      { text: "[Am]a [[bl] b" },
      { text: "" },
      { text: "[G]c" },
    ]);
  });

  it("ignores case and padding inside the tag", () => {
    expect(expandLines(["a[ BP ]b"]).lines).toEqual([{ text: "a" }, { text: "b", pageBreak: true }]);
  });

  it("returns nothing for a section whose only content is a page break", () => {
    expect(expandLines(["[bp]"])).toEqual({ lines: [], breakAfter: true });
  });
});
