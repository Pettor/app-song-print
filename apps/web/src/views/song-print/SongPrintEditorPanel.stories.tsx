import type { Decorator, Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { SongPrintEditorPanel as Component } from "./SongPrintEditorPanel";
import type { SongPrintEditorPanelProps as ComponentProps } from "./SongPrintEditorPanel";

const FixedHeightDecorator: Decorator = (Story) => (
  <div style={{ height: "600px" }}>
    <Story />
  </div>
);

const meta: Meta<typeof Component> = {
  title: "Views/Song Print/Editor Panel",
  component: Component,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  decorators: [FixedHeightDecorator],
};

export default meta;
type Story = StoryObj<typeof meta>;

const exampleJson = JSON.stringify(
  {
    title: "Example Song",
    key: "C",
    sections: [{ name: "Verse 1", lines: ["[C]Type your lyrics here, with [G]chords in brackets"] }],
  },
  null,
  2
);

const defaultArgs = {
  fileName: null,
  text: exampleJson,
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
} satisfies ComponentProps;

export const Default: Story = {
  args: defaultArgs,
};

export const InvalidJson: Story = {
  args: { ...defaultArgs, text: "{ not valid json", error: "Unexpected token n in JSON at position 2" },
};

export const TabPasted: Story = {
  args: {
    ...defaultArgs,
    text: "[Verse]\nC        G\nHello world",
    error: "Unexpected token [ in JSON at position 0",
    canImportTab: true,
  },
};

export const OpenedFile: Story = {
  args: { ...defaultArgs, fileName: "my-song.json", saveTitle: "Save my-song.json" },
};

export const SaveFailed: Story = {
  args: { ...defaultArgs, saveError: "save failed (500)", saveTitle: "Save failed: save failed (500)" },
};
