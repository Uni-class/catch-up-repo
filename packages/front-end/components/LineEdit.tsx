import { css } from "@/styled-system/css";
import { ChangeEventHandler } from "react";


interface PropType {
    placeholder?: string;
    text: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
}


export default function LineEdit({placeholder = "", text, onChange}: PropType) {
    return (
        <input
            type="text"
            placeholder={placeholder}
            value={text}
            onChange={onChange}
            className={css({
                padding: "0.3em 0.5em",
                color: "#000000",
                background: "#ededed",
                borderBottom: "0.15em solid transparent",
                outline: "none",
                transition: "all 0.2s ease-in-out",
                _hover: {
                    background: "#dcdcdc",
                    borderBottom: "0.15em solid #000000",
                },
                _focus: {
                    background: "#dcdcdc",
                    borderBottom: "0.15em solid #000000",
                }
            })}
        />
    );
};