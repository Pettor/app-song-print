import type { Meta, StoryObj } from "@storybook/react-vite";
import { SettingsModal as Component } from "./SettingsModal";
import type { SettingsModalProps as Props } from "./SettingsModal";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Feedback/Settings Modal",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const aboutArgs = {
  appName: "My App",
  appVersion: "1.0.0",
  serverVersion: "2.0.0",
};

const appearanceArgs = {
  themeSelector: {
    mode: "auto" as const,
    onSelect: (mode: string) => console.log("onSelect", mode),
  },
};

const allSections = ["appearance", "about"] as Props["sections"];

const defaultArgs = {
  isOpen: true,
  sections: allSections,
  onClose: () => console.log("onClose"),
  appearance: appearanceArgs,
  aboutDetails: aboutArgs,
} satisfies Props;

export const Default: Story = {
  args: defaultArgs,
};

export const Appearance: Story = {
  args: {
    ...defaultArgs,
    initialSection: "appearance",
  },
};

export const About: Story = {
  args: {
    ...defaultArgs,
    initialSection: "about",
  },
};

export const Phone: Story = {
  args: defaultArgs,
  globals: { viewport: { value: "iphonex" } },
};
