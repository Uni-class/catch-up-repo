import {
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Td,
  Th,
} from "@/components/Table";
import { Meta, StoryFn, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Table",
  component: TableContainer,
  argTypes: {
    align: {
      control: {
        type: "radio",
      },
      options: ["left", "center", "right"],
    },
    size: {
      control: {
        type: "radio",
      },
      options: ["sm", "md", "lg"],
    },
  },
} satisfies Meta<
  React.ComponentProps<typeof TableContainer> & {
    align?: "left" | "center" | "right";
    size?: "sm" | "md" | "lg";
  }
>;

export default meta;
type Story = StoryObj<typeof meta>;

const headData: string[] = ["name", "location", "tel", "comment"];
const bodyData: {
  name: string;
  location: string;
  tel: string;
  comment: string;
}[] = [
  {
    name: "John",
    location: "USA",
    tel: "010-1234-5678",
    comment: "blahblah~~~",
  },
  { name: "Younsang", location: "KOR", tel: "010-2468-1357", comment: "hello" },
  {
    name: "Aru",
    location: "JAP",
    tel: "010-9876-5432",
    comment: "blahblah~~~ hihi",
  },
];

const Template: StoryFn = (args) => {
  return (
    <TableContainer>
      <colgroup>
        <col width="45px" />
        <col width="20%" />
        <col width="100px" />
        <col width="20%" />
        <col />
      </colgroup>
      <TableHead>
        <TableRow>
          <Th align={args.align}>
            <input type="checkbox" />
          </Th>
          {headData.map((e, i) => (
            <Th align={args.align} key={i}>
              {e}
            </Th>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {bodyData.map((e, i) => (
          <TableRow key={i}>
            <Td {...args}>
              <input type="checkbox" />
            </Td>
            <Td {...args}>{e.name}</Td>
            <Td {...args}>{e.location}</Td>
            <Td {...args}>{e.tel}</Td>
            <Td {...args}>{e.comment}</Td>
          </TableRow>
        ))}
      </TableBody>
    </TableContainer>
  );
};

export const Primary: Story = Template.bind({});
