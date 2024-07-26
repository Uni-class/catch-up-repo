import { ReactNode } from "react";
import { css, cx } from "@/styled-system/css";


interface PropType {
  className?: string;
  active?: boolean;
  onClick?: () => void;
  children?: ReactNode;
}


export default function SidebarBaseElement({className, active, onClick, children}: PropType) {
  return (
    <div
      onClick={onClick}
      className={cx(
        className,
        css({
          display: "block",
          padding: "0.8em",
          borderRadius: "0.5em",
          cursor: "pointer",
          userSelect: "none",
        }),
        css(
          active
            ?
            {
              color: "#ffffff",
              backgroundColor: "orange.400",
              fontWeight: "bold",
            }
            :
            {
              "&:hover": {
                backgroundColor: "gray.200",
              },
              "&:active": {
                color: "#ffffff",
                backgroundColor: "orange.300",
                fontWeight: "bold",
              }
            }
        )
      )}
    >
      {children}
    </div>
  );
}
