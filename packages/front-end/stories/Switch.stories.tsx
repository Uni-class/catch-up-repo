import type { Meta, StoryFn, StoryObj } from "@storybook/react";
import Switch from "@/components/Switch";

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
  return (
    <Switch
      {...args}
    />
  );
};

export const Default: Story = Template.bind({});
Default.args = {
  size: "md",
};
