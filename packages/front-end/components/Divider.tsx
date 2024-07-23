import { styled } from "@/styled-system/jsx";

const Divider = styled('hr', {
    base:{
        borderColor:"gray.200"
    },
  variants: {
    direction: {
      horizontal: {
        borderTop: '1px solid',
        width: '100%',
        margin: '0.5rem 0',
        minWidth: "1rem",
      },
      vertical: {
        borderLeft: '1px solid',
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