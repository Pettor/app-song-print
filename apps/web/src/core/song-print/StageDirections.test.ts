import { describe, expect, it } from "vitest";
import { splitStageDirections } from "./StageDirections";

describe("splitStageDirections", () => {
  it("keeps a plain line whole", () => {
    expect(splitStageDirections("Tack kamrat")).toEqual([{ text: "Tack kamrat", direction: false }]);
  });

  it("splits out a direction in parentheses, keeping the brackets", () => {
    expect(splitStageDirections("Hej. (går ut) Hej då.")).toEqual([
      { text: "Hej. ", direction: false },
      { text: "(går ut)", direction: true },
      { text: " Hej då.", direction: false },
    ]);
  });

  it("runs an unclosed direction to the end of the line", () => {
    expect(splitStageDirections("Klart. (fram med tumstock")).toEqual([
      { text: "Klart. ", direction: false },
      { text: "(fram med tumstock", direction: true },
    ]);
  });

  it("treats a line that is only a direction as one", () => {
    expect(splitStageDirections("(musik)")).toEqual([{ text: "(musik)", direction: true }]);
  });

  it("returns nothing for an empty line", () => {
    expect(splitStageDirections("")).toEqual([]);
  });
});
