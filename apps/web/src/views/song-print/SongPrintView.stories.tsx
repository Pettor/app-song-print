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
  artist: "The Placeholders",
  key: "C",
  tempo: 100,
  sections: [
    { name: "Intro", chords: ["C", "G", "Am", "F"] },
    { name: "Verse 1", lines: ["[C]Type your lyrics here, with [G]chords in brackets"] },
  ],
};

const songs: Preset[] = [{ id: "example", label: "Example Song", data: exampleSong }];

const defaultArgs = {
  toolbar: {
    isSourceOpen: true,
    onToggleSource: fn(),
    columns: 1,
    onColumnsChange: fn(),
    isColumnsDisabled: false,
    songs,
    selectedPresetId: "example",
    onSelectPreset: fn(),
    mode: "print",
    onModeChange: fn(),
    tools: {
      fontSize: 13,
      onFontSizeStep: fn(),
      format: "A4",
      onFormatChange: fn(),
      chordStyle: "chip",
      onChordStyleChange: fn(),
      onOpenTranspose: fn(),
      isDisabled: false,
    },
    isDarkTheme: false,
    onToggleTheme: fn(),
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
    chordStyle: "chip",
    scale: 1,
    containerRef: { current: null },
  },
  transpose: {
    isOpen: false,
    onClose: fn(),
    currentKey: "C",
    targetKey: "C",
    onTargetKeyChange: fn(),
    beforeChords: ["C", "G", "Am", "F"],
    afterChords: ["C", "G", "Am", "F"],
    semitones: 0,
    onApply: fn(),
  },
  live: {
    song: exampleSong,
    columns: 1,
    fontSize: 30,
    onFontSizeChange: fn(),
    isScrolling: false,
    onToggleScroll: fn(),
    onExit: fn(),
    scrollRef: { current: null },
  },
  isLive: false,
  isSourceOpen: true,
  editorWidth: 448,
  onSplitterMouseDown: fn(),
} satisfies ComponentProps;

export const Default: Story = {
  args: defaultArgs,
};

export const SourceHidden: Story = {
  args: {
    ...defaultArgs,
    isSourceOpen: false,
    toolbar: { ...defaultArgs.toolbar, isSourceOpen: false },
  },
};

export const LiveMode: Story = {
  args: {
    ...defaultArgs,
    isLive: true,
    toolbar: { ...defaultArgs.toolbar, mode: "live" },
  },
};

export const Transposing: Story = {
  args: {
    ...defaultArgs,
    transpose: {
      ...defaultArgs.transpose,
      isOpen: true,
      targetKey: "D",
      afterChords: ["D", "A", "Bm", "G"],
      semitones: 2,
    },
  },
};
