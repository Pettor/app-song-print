import type { Meta, StoryObj } from "@storybook/react-vite";
import { BrandMark as Component } from "./BrandMark";
import type { BrandMarkProps as ComponentProps } from "./BrandMark";

const meta: Meta<typeof Component> = {
  title: "Display/BrandMark",
  component: Component,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {} satisfies ComponentProps,
};

export const Large: Story = {
  args: { className: "size-16" } satisfies ComponentProps,
};
