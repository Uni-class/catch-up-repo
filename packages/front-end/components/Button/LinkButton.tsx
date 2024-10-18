import { styled } from "@/styled-system/jsx";
import { LinkPropsReal } from "@/type/PropTypes/LinkPropType";
import Link from "next/link";
import {
  AnchorHTMLAttributes,
  DetailedHTMLProps,
  forwardRef,
  ReactNode,
} from "react";

const ButtonContainer = styled(Link, {
  base: {
    padding: "0.48rem 0.38rem",
    bg: "primary.200",
    borderRadius: "0.3rem",
    color: "white",
    cursor: "pointer",
    fontWeight: "medium",
    display: "flex",
    gap: "0.375rem",
    alignItems: "center",
  },
  variants: {
    isIcon: {
      true: {
        justifyContent: "",
      },
      false: {
        justifyContent: "center",
      },
    },
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
        bg: "secondary.200",
        color: "black",
        _hover: {
          bg: "secondary.dark",
        },
      },
      gray: {
        bg: "grey.500",
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
  extends LinkPropsReal {
  children?: ReactNode;
  startIcon?: ReactNode;
  size?: "small" | "mid" | undefined;
  color?: "primary" | "secondary" | "gray" | undefined;
}

const LinkButton = forwardRef<HTMLAnchorElement, PropType>(
  ({ children, startIcon, ...attr }, ref) => {
    return (
      <ButtonContainer ref={ref} {...attr} isIcon={!!startIcon}>
        {startIcon}
        {children}
      </ButtonContainer>
    );
  }
);

LinkButton.displayName = "LinkButton";

export default LinkButton;
