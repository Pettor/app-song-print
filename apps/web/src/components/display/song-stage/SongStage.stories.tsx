import type { Meta, StoryObj } from "@storybook/react-vite";
import { SongStage as Component } from "./SongStage";
import type { SongStageProps as ComponentProps } from "./SongStage";
import type { Song } from "~/core/song-print/SongTypes";

const meta: Meta<typeof Component> = {
  title: "Display/SongStage",
  component: Component,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="bg-[#07080a] p-8">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const exampleSong: Song = {
  title: "Example Song",
  artist: "The Placeholders",
  key: "C",
  tempo: 100,
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
  fontSize: 30,
} satisfies ComponentProps;

export const Default: Story = {
  args: defaultArgs,
};

export const LargeType: Story = {
  args: { ...defaultArgs, fontSize: 48 },
};

export const TwoColumns: Story = {
  args: { ...defaultArgs, columns: 2 },
};

export const Transposed: Story = {
  args: { ...defaultArgs, song: { ...exampleSong, transpose: 2 } },
};
