import type { Meta, StoryFn, StoryObj } from "@storybook/react";
import { Paragraph } from "@/components/Text";
import { css } from "@/styled-system/css";
import { styled } from "@/styled-system/jsx";

const meta = {
  title: "Text/Paragraph",
  component: Paragraph,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Paragraph>;

export default meta;
type Story = StoryObj<typeof meta>;

const variants: (
  | "body1"
  | "body2"
  | "body3"
  | "body4"
  | "sub1"
  | "sub2"
  | "sub3"
  | "sub4"
)[] = ["body1", "body2", "body3", "body4", "sub1", "sub2", "sub3", "sub4"];

const Td = styled("td",{
    base:{
        border:"1px solid",
        padding:"0.5rem",
        borderColor:"gray.200",
    }
})

const Th = styled("th",{
    base:{
        border:"1px solid",
        padding:"0.5rem",
        borderColor:"gray.200",
        bg:"gray.50",
    }
})

const Template: StoryFn = (_args) => {
  return (
    <table className={css({
        margin: "0 auto",
        borderCollapse:"collapse",
    })}>
      <thead>
        <tr>
          <Th>variant</Th>
          <Th>view</Th>
        </tr>
      </thead>
      <tbody>
        {variants.map((variant, i) => (
          <tr key={i}>
            <Td>{variant}</Td>
            <Td>
              <Paragraph variant={variant}>본문 텍스트 입니다</Paragraph>
            </Td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export const Primary: Story = Template.bind({});
