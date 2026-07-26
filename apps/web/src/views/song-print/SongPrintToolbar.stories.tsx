import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { SongPrintToolbar as Component } from "./SongPrintToolbar";
import type { SongPrintToolbarProps as ComponentProps } from "./SongPrintToolbar";
import type { Preset } from "~/core/song-print/SongTypes";

const meta: Meta<typeof Component> = {
  title: "Views/Song Print/Toolbar",
  component: Component,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const songs: Preset[] = [
  { id: "example", label: "Example Song", data: { title: "Example Song" } },
  { id: "another-song", label: "Another Song", data: { title: "Another Song" } },
];

const defaultArgs = {
  columns: 1,
  onColumnsChange: fn(),
  isColumnsDisabled: false,
  songs,
  selectedPresetId: "example",
  onSelectPreset: fn(),
  onExportPdf: fn(),
  isExporting: false,
} satisfies ComponentProps;

export const Default: Story = {
  args: defaultArgs,
};

export const TwoColumnsSelected: Story = {
  args: { ...defaultArgs, columns: 2 },
};

export const Exporting: Story = {
  args: { ...defaultArgs, isExporting: true },
};

export const OpenedFromFile: Story = {
  args: { ...defaultArgs, selectedPresetId: "", isColumnsDisabled: false },
};
