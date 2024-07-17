import type { Meta, StoryFn, StoryObj } from "@storybook/react";
import Divider from "@/components/divider";
import { css } from "@/styled-system/css";

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
  return (
    <div>
      <div>
        <p>안녕하세요</p>
        <Divider />
        <p>반갑습니다</p>
      </div>
      <div className={css({ display: "flex" })}>
        <p>안녕하세요</p>
        <Divider direction="vertical" />
        <p>반갑습니다</p>
      </div>
    </div>
  );
};

export const Primary: Story = Template.bind({});
