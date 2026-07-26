import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { SongPrintView as Component } from "./SongPrintView";
import type { SongPrintViewProps as ComponentProps } from "./SongPrintView";
import type { Preset, Song } from "~/core/song-print/SongTypes";

const meta: Meta<typeof Component> = {
  title: "Views/Song Print",
  component: Component,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
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

const songs: Preset[] = [{ id: "example", label: "Example Song", data: exampleSong }];

const defaultArgs = {
  toolbar: {
    columns: 1,
    onColumnsChange: fn(),
    isColumnsDisabled: false,
    songs,
    selectedPresetId: "example",
    onSelectPreset: fn(),
    onExportPdf: fn(),
    isExporting: false,
  },
  editor: {
    fileName: null,
    text: JSON.stringify(exampleSong, null, 2),
    onTextChange: fn(),
    onTabKey: fn(),
    error: null,
    canImportTab: false,
    onImportTab: fn(),
    onOpenFile: fn(),
    onSaveFile: fn(),
    onDownloadFile: fn(),
    onFormat: fn(),
    canSave: true,
    saveTitle: "Save to SONGS_DIR",
    saved: false,
    saveError: null,
  },
  preview: {
    song: exampleSong,
    scale: 1,
    containerRef: { current: null },
  },
  editorWidth: 448,
  onSplitterMouseDown: fn(),
} satisfies ComponentProps;

export const Default: Story = {
  args: defaultArgs,
};
