import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { SongPrintLiveOverlay as Component } from "./SongPrintLiveOverlay";
import type { SongPrintLiveOverlayProps as ComponentProps } from "./SongPrintLiveOverlay";
import type { Song } from "~/core/song-print/SongTypes";

const meta: Meta<typeof Component> = {
  title: "Views/Song Print/Live Overlay",
  component: Component,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof meta>;

const exampleSong: Song = {
  title: "Example Song",
  artist: "The Placeholders",
  key: "C",
  tempo: 100,
  capo: 2,
  sections: [
    { name: "Intro", chords: ["C", "G", "Am", "F"] },
    {
      name: "Verse 1",
      lines: ["[C]Type your lyrics here, with [G]chords in brackets", "[Am]One bracket per chord [F]change"],
    },
    { name: "Chorus", lines: ["[C]This line repeats [G]as needed"], note: "repeat x2" },
  ],
};

const defaultArgs = {
  song: exampleSong,
  columns: 1,
  fontSize: 30,
  onFontSizeChange: fn(),
  isScrolling: false,
  onToggleScroll: fn(),
  onExit: fn(),
  scrollRef: { current: null },
} satisfies ComponentProps;

export const Default: Story = {
  args: defaultArgs,
};

export const Scrolling: Story = {
  args: { ...defaultArgs, isScrolling: true },
};

export const TwoColumns: Story = {
  args: { ...defaultArgs, columns: 2, fontSize: 22 },
};

export const Exiting: Story = {
  args: defaultArgs,
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("button", { name: "Exit" }));

    await expect(args.onExit).toHaveBeenCalled();
  },
};

export const StartingAutoScroll: Story = {
  args: defaultArgs,
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("button", { name: "Auto-scroll" }));

    await expect(args.onToggleScroll).toHaveBeenCalled();
  },
};
