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
} satisfies Meta<typeof TableContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

const headData: string[] = ["name", "location", "tel"];
const bodyData: { name: string; location: string; tel: string }[] = [
  { name: "John", location: "USA", tel: "010-1234-5678" },
  { name: "Younsang", location: "KOR", tel: "010-2468-1357" },
  { name: "Aru", location: "JAP", tel: "010-9876-5432" },
];

const Template: StoryFn = (_args) => {
  return (
    <TableContainer>
      <TableHead>
        <TableRow>
            <Th><input type="checkbox"/></Th>
          {headData.map((e, i) => (
            <Th key={i}>{e}</Th>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {bodyData.map((e, i) => (
          <TableRow key={i}>
            <Td><input type="checkbox"/></Td>
            <Td>{e.name}</Td>
            <Td>{e.location}</Td>
            <Td>{e.tel}</Td>
          </TableRow>
        ))}
      </TableBody>
    </TableContainer>
  );
};

export const Primary: Story = Template.bind({});
