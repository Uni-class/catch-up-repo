import { css, cx } from "@/styled-system/css";
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

interface PropType
    extends DetailedHTMLProps<
        ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > {
    startIcon?: ReactNode;
    text: string;
}

export function HeaderTooltipButton({ startIcon, text, ...attr }: PropType) {
    return (
        <button {...attr} className={cx(css({
            display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.83rem",color:"#fff",
            cursor:"pointer",
            _hover:{
                color:"primary.50"
            }
        }), attr.className)}>
            {startIcon}
            <p>{text}</p>
        </button>
    );
}
