import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { SongPrintToolsMenu as Component } from "./SongPrintToolsMenu";
import type { SongPrintToolsMenuProps as ComponentProps } from "./SongPrintToolsMenu";

const meta: Meta<typeof Component> = {
  title: "Views/Song Print/Tools Menu",
  component: Component,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  fontSize: 13,
  onFontSizeStep: fn(),
  format: "A4",
  onFormatChange: fn(),
  chordStyle: "chip",
  onChordStyleChange: fn(),
  onOpenTranspose: fn(),
  isDisabled: false,
} satisfies ComponentProps;

export const Default: Story = {
  args: defaultArgs,
};

export const LargeTypeOnLetter: Story = {
  args: { ...defaultArgs, fontSize: 18, format: "Letter", chordStyle: "accent" },
};

export const Disabled: Story = {
  args: { ...defaultArgs, isDisabled: true },
};

export const IncreasingFontSize: Story = {
  args: defaultArgs,
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("button", { name: "Increase font size" }));

    await expect(args.onFontSizeStep).toHaveBeenCalledWith(1);
  },
};

export const OpeningTranspose: Story = {
  args: defaultArgs,
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByText("Transpose sheet"));

    await expect(args.onOpenTranspose).toHaveBeenCalled();
  },
};
