import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor } from "storybook/test";
import { SongPrintExportStage as Component } from "./SongPrintExportStage";
import type { SongPrintExportStageProps as ComponentProps } from "./SongPrintExportStage";
import type { Song } from "~/core/song-print/SongTypes";

const meta: Meta<typeof Component> = {
  title: "Views/Song Print/Export Stage",
  component: Component,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const exampleSong: Song = {
  title: "Example Song",
  artist: "The Placeholders",
  key: "C",
  page: { format: "A4", columns: 1, fontSize: 13 },
  sections: [
    { name: "Intro", chords: ["C", "G", "Am", "F"] },
    { name: "Verse 1", lines: ["[C]Type your lyrics here, with [G]chords in brackets"] },
  ],
};

const defaultArgs = {
  song: exampleSong,
  songId: "example",
  chordStyle: "chip",
  keyBasis: "transposed",
  containerRef: { current: null },
} satisfies ComponentProps;

/**
 * A song staged for capture. The sheet is drawn at full page size and parked
 * off-screen, so the story itself looks empty — what matters is in the DOM.
 */
export const Staged: Story = {
  args: defaultArgs,
  play: async ({ canvasElement }) => {
    const stage = canvasElement.querySelector<HTMLElement>("[data-song-id]");
    if (!stage) throw new Error("Nothing was staged");

    await expect(stage.dataset.songId).toBe("example");
    // `data-measured` is the signal a capture waits for: the sheet has packed
    // itself into pages and is no longer showing the unpacked fallback.
    await waitFor(async () => {
      await expect(stage.querySelector(".sp-doc[data-measured]")).not.toBeNull();
    });
    await expect(stage.querySelectorAll(".sp-page")).toHaveLength(1);
  },
};

/** Between exports nothing is mounted at all. */
export const Idle: Story = {
  args: { ...defaultArgs, song: null },
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelector("[data-song-id]")).toBeNull();
  },
};
