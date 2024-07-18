import type { Meta, StoryFn, StoryObj } from "@storybook/react";
import { Heading } from "@/components/Text";
import { css } from "@/styled-system/css";
import { styled } from "@/styled-system/jsx";

const meta = {
  title: "Text/Heading",
  component: Heading,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

const variants: (
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
)[] = ["h1", "h2", "h3", "h4", "h5", "h6",];

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
              <Heading variant={variant}>제목 텍스트 입니다</Heading>
            </Td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export const Primary: Story = Template.bind({});