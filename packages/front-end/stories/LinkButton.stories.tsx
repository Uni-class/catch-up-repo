import type { Meta, StoryObj } from "@storybook/react";
import Icon from "@/public/icons/settings.svg";
import LinkButton from "@/components/Button/LinkButton";

const meta = {
  title: "Components/Button/LinkButton",
  component: LinkButton,
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
    startIcon: {
      control: false,
    },
  },
} satisfies Meta<typeof LinkButton>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Default: Story = {
    args: {
        children: "LinkButton",
        size: "mid",
        color: "primary",
        href: "/",
        startIcon: <Icon width={"1em"} height={"1em"} />, // Inline JSX directly
    },
};