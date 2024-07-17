import type { Meta, StoryFn, StoryObj } from "@storybook/react";
import Switch from "@/components/Switch";
import { useState } from "react";

const meta = {
  title: "Components/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Switch>;

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