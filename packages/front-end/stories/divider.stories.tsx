import type { Meta, StoryFn, StoryObj } from "@storybook/react";
import Divider from "@/components/Divider";
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

const Template: StoryFn = (_args) => {
  return (
    <div
      className={css({
        display: "flex",
        width: "50%",
        height: "50%",
      })}
    >
      <div className={css({ flex: 1 })}>
        <p>안녕하세요</p>
        <Divider />
        <p>반갑습니다</p>
      </div>
      <div className={css({ flex: 1, display: "flex" })}>
        <p>안녕하세요</p>
        <Divider direction="vertical" />
        <p>반갑습니다</p>
      </div>
    </div>
  );
};

export const Primary: Story = Template.bind({});
