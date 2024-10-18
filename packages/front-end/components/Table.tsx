import { styled } from "@/styled-system/jsx";
import { css, cx } from "@/styled-system/css";
import { ReactNode } from "react";


export const TableContainer = styled("table", {
  base: {
    borderCollapse: "collapse",
    border: "1px solid",
    borderColor: "grey.300",
    borderLeft:"none",
    borderRight:"none",
    borderTop:"none",
  },
  variants: {
    fullWidth: {
      true: {
        width: "100%",
      },
      false: {},
    },
  },
  defaultVariants: {
    fullWidth: true,
  },
});

export const TableHead = styled("thead", {
  base: {},
});

export const TableBody = styled("tbody", {
  base: {},
});

export function TableRow({ children, onClick }: { children: ReactNode, onClick?: () => void }) {
  return (
    <tr className={cx(
      css({
        borderBottom: "1px solid",
        borderColor: "gray.300",
      }),
      css(
        onClick
        ?
        {
          cursor: "pointer",
          _hover: {
            backgroundColor: "gray.200",
          },
          _active: {
            backgroundColor: "gray.300",
          },
        }
        :
        {}
      )
    )} onClick={onClick}>{children}</tr>
  );
};

export const Th = styled("th", {
  base: {
    padding: "1em 0.8em",
    fontWeight: 600,
    minWidth: 0,
  },
  variants: {
    align: {
      left: {
        textAlign: "left",
      },
      center: {
        textAlign: "center",
      },
      right: {
        textAlign: "right",
      },
    },
  },
  defaultVariants: {
    align: "left",
  },
});

export const Td = styled("td", {
  base: {
    padding: "0.4em 0.8em",
    minWidth: 0,
  },
  variants: {
    align: {
      left: {
        textAlign: "left",
      },
      center: {
        textAlign: "center",
      },
      right: {
        textAlign: "right",
      },
    },
    size: {
      sm: {
        paddingY: "0.4rem",
      },
      md: {
        paddingY: "0.6rem",
      },
      lg: {
        paddingY: "1rem",
      },
    },
  },
  defaultVariants: {
    align: "left",
    size: "md",
  },
});

/*
사용법
<TableContainer>
    <TableHead>
        <TableRow>
            {headData.map(e)=><Th key={e.id}>{e.name}</Th>}
        </TableRow>
    </TableHead>
    <TableBody>
        <TableRow>
            {tableData.map(e)=><Td key={e.id}>{e.name}</Td>}
        </TableRow>
    </TableBody>
</TableContainer>
*/
