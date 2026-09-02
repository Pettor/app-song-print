import type { Meta, StoryObj } from "@storybook/react-vite";
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

export const Default: Story = {
  args: { song: exampleSong } satisfies ComponentProps,
};

export const Transposed: Story = {
  args: { song: { ...exampleSong, transpose: 2 } } satisfies ComponentProps,
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
