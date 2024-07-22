import { styled } from "@/styled-system/jsx";

export const TableContainer = styled("table", {
  base: {
    borderCollapse: "collapse",
    border: "1px solid",
    borderColor: "gray.200",
    borderRadius: "0.75rem",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    boxSizing: "border-box",
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
  base: {
    fontWeight: "700",
  },
});

export const TableBody = styled("tbody", {
  base: {},
});

export const TableRow = styled("tr", {
  base: {
    borderBottom: "1px solid",
    borderColor: "gray.300",
  },
});

export const Th = styled("th", {
  base: {
    padding:"1rem 0.5rem 0.25rem 0.5rem"
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
    padding:"0.5rem 0.5rem",
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
