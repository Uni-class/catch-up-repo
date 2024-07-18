import { css } from "@/styled-system/css";
import { MouseEventHandler } from "react";


interface PropType {
    text?: string;
    disabled?: boolean;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}


export default function Button({text = "", disabled = false, onClick}: PropType) {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={css({
                padding: "0.3em 0.7em",
                color: "#000000",
                background: "#ededed",
                outline: "none",
                transition: "all 0.2s ease-in-out",
                cursor: "pointer",
                _enabled: {
                    _hover: {
                        background: "#dcdcdc",
                    },
                    _active: {
                        color: "#ffffff",
                        background: "#a8a8a8",
                    },
                },
                _disabled: {
                    background: "#ffe4e4",
                    cursor: "not-allowed",
                }
            })}
        >
            {text}
        </button>
    );
};