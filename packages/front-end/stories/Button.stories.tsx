import type { Meta, StoryFn, StoryObj } from "@storybook/react";
import Button from "@/components/Button";
import Icon from "@/public/icons/share.svg";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      control: {
        type: "radio",
      },
      options: ["mid", "small"],
    },
    color: {
      control: {
        type: "radio",
      },
      options: ["primary", "secondary", "gray"],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template: StoryFn = (args) => {
  return <Button {...args} startIcon={<Icon width={"1em"} height={"1em"} />} />;
};

export const Default: Story = Template.bind({});
Default.args = {
  children: "Button",
};
