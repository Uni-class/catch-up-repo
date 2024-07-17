import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import Switch from "@/components/switch";

const meta = {
  title: "Components/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Large: Story = {
  args: {
    size: "lg",
  },
};

export const Medium: Story = {
  args: {
    size: "md",
  },
};
