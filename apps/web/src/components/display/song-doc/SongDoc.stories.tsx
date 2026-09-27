import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { SongDoc as Component } from "./SongDoc";
import type { SongDocProps as ComponentProps } from "./SongDoc";
import type { Song } from "~/core/song-print/SongTypes";

const meta: Meta<typeof Component> = {
  title: "Display/SongDoc",
  component: Component,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const exampleSong: Song = {
  title: "Example Song",
  artist: "The Placeholders",
  key: "C",
  capo: 0,
  tempo: 100,
  transpose: 0,
  page: { format: "A4", orientation: "portrait", columns: 1, fontSize: 13 },
  sections: [
    { name: "Intro", chords: ["C", "G", "Am", "F"] },
    {
      name: "Verse 1",
      lines: ["[C]Type your lyrics here, with [G]chords in brackets", "[Am]One bracket per chord [F]change"],
    },
    { name: "Chorus", lines: ["[C]This line repeats [G]as needed"], note: "repeat x2" },
  ],
};

/**
 * The header chips of the drawn page, as label \u2192 value.
 *
 * The off-screen measurement pass renders a second, hidden copy of the header,
 * and chord badges repeat the key names all over the sheet \u2014 so reading the
 * chips off `.sp-page` is the only unambiguous way to assert on them.
 */
function metaChips(canvasElement: HTMLElement): Record<string, string> {
  const drawn = canvasElement.querySelector(".sp-page");
  if (!drawn) throw new Error("No page was drawn");

  return Object.fromEntries(
    Array.from(drawn.querySelectorAll(".sp-metachip")).map((chip) => [
      chip.querySelector(".sp-metalabel")?.textContent ?? "",
      chip.querySelector(".sp-metavalue")?.textContent ?? "",
    ])
  );
}

/** The chord badges on the drawn page, in reading order. */
function chords(canvasElement: HTMLElement): string[] {
  const drawn = canvasElement.querySelector(".sp-page");
  if (!drawn) throw new Error("No page was drawn");

  return Array.from(drawn.querySelectorAll(".sp-chord")).map((c) => c.textContent ?? "");
}

/** The setlist badge on the drawn page, or null when the song has no `order`. */
function orderBadge(canvasElement: HTMLElement): string | null {
  const drawn = canvasElement.querySelector(".sp-page");
  if (!drawn) throw new Error("No page was drawn");

  return drawn.querySelector(".sp-order")?.textContent ?? null;
}

export const Default: Story = {
  args: { song: exampleSong } satisfies ComponentProps,
  play: async ({ canvasElement }) => {
    // No `order`, no badge — the header is the title alone.
    await expect(orderBadge(canvasElement)).toBeNull();
  },
};

/** A song placed in a setlist: its position is printed beside the title. */
export const SetlistOrder: Story = {
  args: { song: { ...exampleSong, order: 3 } } satisfies ComponentProps,
  play: async ({ canvasElement }) => {
    await expect(orderBadge(canvasElement)).toBe("3");
  },
};

export const Transposed: Story = {
  args: { song: { ...exampleSong, transpose: 2 } } satisfies ComponentProps,
  play: async ({ canvasElement }) => {
    // One key and no offset chip: the sheet is read, not diffed.
    await expect(metaChips(canvasElement).Key).toBe("D");
    await expect(metaChips(canvasElement).Transpose).toBeUndefined();
    await expect(chords(canvasElement).slice(0, 4)).toEqual(["D", "A", "Bm", "G"]);
  },
};

/**
 * The offset is in effect but the chords stay in the written key, for a player
 * transposing by hand while the band reads the transposed sheet: the key chip
 * names both keys and a fourth chip states the offset.
 */
export const TransposedOriginalKey: Story = {
  args: { song: { ...exampleSong, transpose: 2 }, keyBasis: "original" } satisfies ComponentProps,
  play: async ({ canvasElement }) => {
    await expect(metaChips(canvasElement).Key).toBe("C \u2192 D");
    await expect(metaChips(canvasElement).Transpose).toBe("+2");
    await expect(chords(canvasElement).slice(0, 4)).toEqual(["C", "G", "Am", "F"]);
  },
};

export const TransposedDownOriginalKey: Story = {
  args: { song: { ...exampleSong, transpose: -3 }, keyBasis: "original" } satisfies ComponentProps,
  play: async ({ canvasElement }) => {
    await expect(metaChips(canvasElement).Key).toBe("C \u2192 A");
    await expect(metaChips(canvasElement).Transpose).toBe("-3");
  },
};

export const TwoColumns: Story = {
  args: { song: { ...exampleSong, page: { ...exampleSong.page, columns: 2 } } } satisfies ComponentProps,
};

export const AccentChords: Story = {
  args: { song: exampleSong, chordStyle: "accent" } satisfies ComponentProps,
};

export const PlainChords: Story = {
  args: { song: exampleSong, chordStyle: "plain" } satisfies ComponentProps,
};

export const Empty: Story = {
  args: { song: { title: "Untitled" } } satisfies ComponentProps,
};
