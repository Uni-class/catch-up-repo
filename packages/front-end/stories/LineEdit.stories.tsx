import type { Meta, StoryFn, StoryObj } from "@storybook/react";
import LineEdit from "@/components/LineEdit";
import { css } from "@/styled-system/css";
import { Label } from "@/components/Label";

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
    <div
      className={css({
        display: "flex",
        width: "400px",
        alignItems: "center",
        justifyContent: "space-between",
      })}
    >
      <Label>라벨</Label>
      <LineEdit {...args} className={css({width:"300px"})}/>
    </div>
  );
};

export const Default: Story = Template.bind({});
