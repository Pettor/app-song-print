import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { SongPrintTransposeModal as Component } from "./SongPrintTransposeModal";
import type { SongPrintTransposeModalProps as ComponentProps } from "./SongPrintTransposeModal";

const meta: Meta<typeof Component> = {
  title: "Views/Song Print/Transpose Modal",
  component: Component,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  isOpen: true,
  onClose: fn(),
  currentKey: "C",
  targetKey: "D",
  onTargetKeyChange: fn(),
  beforeChords: ["C", "G", "Am", "F"],
  afterChords: ["D", "A", "Bm", "G"],
  semitones: 2,
  onApply: fn(),
} satisfies ComponentProps;

export const Default: Story = {
  args: defaultArgs,
};

export const NoChange: Story = {
  args: {
    ...defaultArgs,
    targetKey: "C",
    afterChords: defaultArgs.beforeChords,
    semitones: 0,
  },
};

export const DownwardInterval: Story = {
  args: {
    ...defaultArgs,
    targetKey: "A",
    afterChords: ["A", "E", "F#m", "D"],
    semitones: -3,
  },
};

export const Applying: Story = {
  args: defaultArgs,
  play: async ({ args }) => {
    const dialog = within(document.body);

    await userEvent.click(await dialog.findByRole("button", { name: "Transpose & save" }));

    await expect(args.onApply).toHaveBeenCalled();
  },
};

export const Cancelling: Story = {
  args: defaultArgs,
  play: async ({ args }) => {
    const dialog = within(document.body);

    await userEvent.click(await dialog.findByRole("button", { name: "Cancel" }));

    await expect(args.onClose).toHaveBeenCalled();
  },
};
