import type { Meta, StoryFn, StoryObj } from "@storybook/react";
import LineEdit from "@/components/LineEdit";

const meta = {
  title: "Components/LineEdit",
  component: LineEdit,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof LineEdit>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template: StoryFn = (args) => {
  return (
    <LineEdit
      {...args}
    />
  );
};

export const Primary: Story = Template.bind({});
