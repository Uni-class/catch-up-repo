import { css, cx } from "@/styled-system/css";
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

interface PropType
    extends DetailedHTMLProps<
        ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > {
    startIcon?: ReactNode;
    text: string;
    tooltip?: ReactNode;
}

export function HeaderTooltipButton({ tooltip, startIcon, text, ...attr }: PropType) {
    return (
        <div className={css({ position: "relative" })}>
            <button
                {...attr}
                className={cx(
                    css({
                        display: "flex",
                        alignItems: "center",
                        gap: "0.4rem",
                        fontSize: "0.83rem",
                        color: "#fff",
                        cursor: "pointer",
                        position: "relative",
                        _hover: {
                            color: "primary.50",
                        },
                    }),
                    attr.className
                )}
            >
                {startIcon}
                <p>{text}</p>
            </button>
            {tooltip}
        </div>
    );
}
