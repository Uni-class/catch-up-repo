import { css, cx } from "@/styled-system/css";
import {
  ChangeEventHandler,
  DetailedHTMLProps,
  InputHTMLAttributes,
  MouseEventHandler,
} from "react";

interface PropType
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

export default function Checkbox({
  className,
  checked,
  onChange,
  onClick,
  disabled,
  ...attr
}: PropType) {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      onClick={onClick}
      disabled={disabled}
      className={cx(
        css({
          display: "block",
          width: "1.3em",
          height: "1.3em",
          fontSize:"1em",
          accentColor:"primary.200",
        }),
        className
      )}
      {...attr}
    />
  );
}
