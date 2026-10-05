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
  { id: "example", label: "Example Song", data: { title: "Example Song", order: 1 } },
  { id: "another-song", label: "Another Song", data: { title: "Another Song", order: 2 } },
];

const defaultArgs = {
  isSourceOpen: true,
  onToggleSource: fn(),
  columns: 1,
  onColumnsChange: fn(),
  isColumnsDisabled: false,
  keyBasis: "transposed",
  onKeyBasisChange: fn(),
  isTransposed: false,
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

export const Transposed: Story = {
  args: { ...defaultArgs, isTransposed: true },
};

export const OriginalKeySelected: Story = {
  args: { ...defaultArgs, isTransposed: true, keyBasis: "original" },
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

export const ChoosingTheOriginalKey: Story = {
  args: { ...defaultArgs, isTransposed: true },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("radio", { name: "Original" }));

    await expect(args.onKeyBasisChange).toHaveBeenCalledWith("original");
  },
};

export const KeyBasisHiddenWithoutAnOffset: Story = {
  args: defaultArgs,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Nothing to choose between until the song carries a transpose offset.
    await expect(canvas.queryByRole("radiogroup", { name: "Printed key" })).toBeNull();
  },
};

/** Setlist positions lead the picker, so the list reads as the running order. */
export const SetlistOrderInThePicker: Story = {
  args: defaultArgs,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: /Song/ });

    // The trigger names the song on the sheet, with the position it plays in.
    await expect(trigger).toHaveTextContent("1");
    await expect(trigger).toHaveTextContent("Example Song");

    await userEvent.click(trigger);

    // The listbox renders in a portal, so it is looked up on the document.
    const option = await waitFor(() => within(document.body).getByRole("option", { name: /Another Song/ }));
    await expect(option).toHaveTextContent("2");
  },
};

/** A library nobody has numbered yet: the picker is labels only. */
export const UnorderedLibrary: Story = {
  args: {
    ...defaultArgs,
    songs: songs.map((song) => ({ ...song, data: { title: song.data.title } })),
  },
};
