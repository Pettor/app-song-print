import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";
import { SongPrintToolbar as Component } from "./SongPrintToolbar";
import type { SongPrintToolbarProps as ComponentProps } from "./SongPrintToolbar";
import type { Preset } from "~/core/song-print/SongTypes";

const meta: Meta<typeof Component> = {
  title: "Views/Song Print/Toolbar",
  component: Component,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof meta>;

const songs: Preset[] = [
  { id: "example", label: "Example Song", data: { title: "Example Song" } },
  { id: "another-song", label: "Another Song", data: { title: "Another Song" } },
];

const defaultArgs = {
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
} satisfies ComponentProps;

export const Default: Story = {
  args: defaultArgs,
};

export const TwoColumnsSelected: Story = {
  args: { ...defaultArgs, columns: 2 },
};

export const LiveMode: Story = {
  args: { ...defaultArgs, mode: "live" },
};

export const SourceHidden: Story = {
  args: { ...defaultArgs, isSourceOpen: false },
};

export const DarkTheme: Story = {
  args: { ...defaultArgs, isDarkTheme: true },
};

export const Exporting: Story = {
  args: { ...defaultArgs, isExporting: true },
};

export const OpenedFromFile: Story = {
  args: { ...defaultArgs, selectedPresetId: "" },
};

export const SelectingColumns: Story = {
  args: defaultArgs,
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("radio", { name: "2" }));

    await expect(args.onColumnsChange).toHaveBeenCalledWith(2);
  },
};

export const OpeningTools: Story = {
  args: defaultArgs,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("button", { name: "Tools" }));

    // The popover renders in a portal, so it is looked up on the document, and
    // it fades in — hence waiting for it to actually be on screen.
    await waitFor(() => expect(within(document.body).getByText("Transpose sheet")).toBeVisible());
  },
};
