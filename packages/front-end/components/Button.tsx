import { styled, StyledComponent } from "@/styled-system/jsx";
import { ReactNode } from "react";

const ButtonContainer = styled("button", {
  base: {
    padding: "0.48rem 0.38rem",
    bg: "primary.200",
    borderRadius: "0.3rem",
    color: "white",
    cursor: "pointer",
    fontWeight:"medium",
    display:"flex",
    gap:"0.375rem",
    alignItems:"center",
  },
  variants: {
    size: {
      mid: {
        fontSize: "1rem",
      },
      small: {
        fontSize: "0.8rem",
        padding: "0.3rem 0.38rem",
      },
    },
    color: {
      primary: {
        bg: "primary.200",
        _hover: {
          bg: "primary.400",
        },
      },
      secondary: {
        bg: "secondary",
        color:"black",
        _hover: {
          bg: "secondary.dark",
        },
      },
      gray: {
        bg: "#8084AA",
        _hover: {
        bg: "#6F7291",
        },
      },
    },
  },
  defaultVariants: {
    color: "primary",
    size: "mid",
  },
});

interface PropType
  extends StyledComponent<
    "button",
    {
      size?: "small" | "mid" | undefined;
      color?: "primary" | "secondary" | "gray" | undefined;
    }
  > {
  children?: ReactNode;
  startIcon?: ReactNode;
  size?: "small" | "mid" | undefined;
  color?: "primary" | "secondary" | "gray" | undefined;
}

const Button = ({ children, startIcon, ...attr }: PropType) => {
  return (
    <ButtonContainer {...attr}>
      {startIcon}
      {children}
    </ButtonContainer>
  );
};

export default Button;
