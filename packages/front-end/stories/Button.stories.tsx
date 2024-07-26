import type { Meta, StoryFn, StoryObj } from "@storybook/react";
import Button from "@/components/Button";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    disabled: {
      control: 'boolean'
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template: StoryFn = (args) => {
  return (
    <Button
      {...args}
    />
  );
};

export const Default: Story = Template.bind({});
Default.args = {
  children: "Button",
};
