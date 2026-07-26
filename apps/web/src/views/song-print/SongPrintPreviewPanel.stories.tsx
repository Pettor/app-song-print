import type { Decorator, Meta, StoryObj } from "@storybook/react-vite";
import { SongPrintPreviewPanel as Component } from "./SongPrintPreviewPanel";
import type { SongPrintPreviewPanelProps as ComponentProps } from "./SongPrintPreviewPanel";
import type { Song } from "~/core/song-print/SongTypes";

const FixedHeightDecorator: Decorator = (Story) => (
  <div style={{ height: "700px" }}>
    <Story />
  </div>
);

const meta: Meta<typeof Component> = {
  title: "Views/Song Print/Preview Panel",
  component: Component,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  decorators: [FixedHeightDecorator],
};

export default meta;
type Story = StoryObj<typeof meta>;

const exampleSong: Song = {
  title: "Example Song",
  key: "C",
  sections: [
    { name: "Intro", chords: ["C", "G", "Am", "F"] },
    { name: "Verse 1", lines: ["[C]Type your lyrics here, with [G]chords in brackets"] },
  ],
};

export const Default: Story = {
  args: { song: exampleSong, scale: 1, containerRef: { current: null } } satisfies ComponentProps,
};

export const ScaledDown: Story = {
  args: { song: exampleSong, scale: 0.6, containerRef: { current: null } } satisfies ComponentProps,
};
