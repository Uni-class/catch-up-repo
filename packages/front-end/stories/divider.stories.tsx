import type { Meta, StoryFn, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import Switch from "@/components/switch";
import { useState } from "react";
import Divider from "@/components/divider";

const meta = {
  title: "Components/Divider",
  component: Divider,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template: StoryFn = (args) => {
  const [checked, setChecked] = useState(false);

  return (
    <Switch
      {...args}
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
  );
};

export const Large: Story = Template.bind({});
Large.args = {
  size: "lg",
};

export const Medium: Story = Template.bind({});
Medium.args = {
  size: "md",
};

export const Small: Story = Template.bind({});
Small.args = {
  size: "sm",
};