import { css, cx } from "@/styled-system/css";
import { ChangeEventHandler, MouseEventHandler } from "react";


interface PropType {
  className?: string;
  checked?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onClick?: MouseEventHandler<HTMLInputElement>;
  disabled?: boolean;
}

export default function Checkbox({className, checked, onChange, onClick, disabled}: PropType) {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      onClick={onClick}
      disabled={disabled}
      className={cx(css({
        display: "block",
        width: "1.3em",
        height: "1.3em",
      }), className)}
    />
  );
};