import { css, cx } from "@/styled-system/css";
import { ChangeEventHandler } from "react";


interface PropType {
  className?: string;
  placeholder?: string;
  text?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export default function LineEdit({className, placeholder, text, onChange}: PropType) {
    return (
        <input
            type="text"
            placeholder={placeholder}
            value={text}
            onChange={onChange}
            className={cx(css({
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
                }
            }), className)}
        />
    );
};