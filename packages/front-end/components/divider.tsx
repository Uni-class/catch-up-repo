import { styled } from "@/styled-system/jsx";

const Divider = styled('hr', {
  variants: {
    direction: {
      horizontal: {
        borderTop: '1px solid #ccc',
        width: '100%',
        margin: '1rem 0',
        background: 'linear-gradient(to right, rgba(0, 0, 0, 0), #ccc, rgba(0, 0, 0, 0))'
      },
      vertical: {
        borderLeft: '1px solid #ccc',
        height: '100%',
        margin: '0 1rem',
        background: "'linear-gradient(to bottom, rgba(0, 0, 0, 0), #ccc, rgba(0, 0, 0, 0))';"
      },
    },
  },
  defaultVariants: {
    direction: 'horizontal',
  },
});

export default Divider;