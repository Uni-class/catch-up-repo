import { styled } from "@/styled-system/jsx";

const Divider = styled('hr', {
  variants: {
    direction: {
      horizontal: {
        borderTop: '1px solid #ccc',
        width: '100%',
        margin: '1rem 0',
        minWidth: "1rem",
      },
      vertical: {
        borderLeft: '1px solid #ccc',
        height: '100%',
        minHeight: "1rem",
        margin: '0 1rem',
      },
    },
  },
  defaultVariants: {
    direction: 'horizontal',
  },
});

export default Divider;