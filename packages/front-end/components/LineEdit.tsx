import { css, cx } from "@/styled-system/css";
import {
  DetailedHTMLProps,
  InputHTMLAttributes,
} from "react";

interface PropType
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

export default function LineEdit({ className, ...attr }: PropType) {
  return (
    <input
      {...attr}
      type="text"
      className={cx(
        className,
        css({
          padding: "0.5em 0.8em",
          color: "#000000",
          background: "#ededed",
          borderRadius: "0.4em",
          outline: "none",
          transition: "all 0.2s ease-in-out",
          _hover: {
            background: "#dcdcdc",
          },
          _focus: {
            background: "#dcdcdc",
          },
        })
      )}
    />
  );
}