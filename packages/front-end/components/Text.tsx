import { Styles } from "@/styled-system/css";
import { styled } from "@/styled-system/jsx";

const subStyle: Styles = {
  opacity: 0.65,
};

export const Paragraph = styled("p", {
  variants: {
    variant: {
      body1: {
        fontSize: "1.5rem",
      },
      body2: {
        fontSize: "1.25rem",
      },
      body3: {
        fontSize: "1rem",
      },
      body4: {
        fontSize: "0.75rem",
      },
      sub1: {
        fontSize: "1.25rem",
        ...subStyle,
      },
      sub2: {
        fontSize: "1rem",
        ...subStyle,
      },
      sub3: {
        fontSize: "0.75rem",
        ...subStyle,
      },
      sub4: {
        fontSize: "0.5rem",
        ...subStyle,
      },
    },
  },
  defaultVariants: {
    variant: "body1",
  },
});

export const Heading = styled("h1", {
  base:{
    fontWeight:750,
  },
  variants: {
    variant: {
      h1: {
        fontSize: "3.5rem",
      },
      h2: {
        fontSize: "3rem",
      },
      h3: {
        fontSize: "2.5rem",
      },
      h4: {
        fontSize: "2rem",
      },
      h5: {
        fontSize: "1.75rem",
      },
      h6: {
        fontSize: "1.5rem",
      },
    },
  },
  defaultVariants:{
    variant:"h1",
  }
});
