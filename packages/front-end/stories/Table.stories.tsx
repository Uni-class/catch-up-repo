import { TableBody, TableContainer, TableHead, TableRow } from "@/components/Table";
import { Meta, StoryFn, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Table",
  component: TableContainer,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof TableContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template: StoryFn = (_args) => {
    return(
        <TableContainer>
            <TableHead>
                <TableRow>

                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>

                </TableRow>
            </TableBody>
        </TableContainer>
    )
};

export const Primary: Story = Template.bind({});