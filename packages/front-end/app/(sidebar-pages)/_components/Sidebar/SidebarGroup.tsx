import { ReactNode } from "react";
import { css, cx } from "@/styled-system/css";

interface PropType {
  className?: string;
  name: string;
  icon: ReactNode;
  children?: ReactNode;
}

export default function SidebarGroup({
  className,
  name,
  children,
  icon,
}: PropType) {
  return (
    <div
      className={cx(
        css({ borderBottom: "1px solid", borderColor: "primary.dark" }),
        className
      )}
    >
      <div
        className={css({
          height: "2.66rem",
          width: "100%",
          display: "flex",
          alignItems: "center",
          border: "1px solid",
          borderColor: "primary.dark",
        })}
      >
        <div
          className={css({
            width: "2.66rem",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bg: "primary.mid",
          })}
        >
          {icon}
        </div>
        <p
          className={css({
            fontSize: "1.125rem",
            paddingLeft: "0.625rem",
            color: "tertiary",
          })}
        >
          {name}
        </p>
      </div>
      <ul
        className={css({
          display: "flex",
          flexDirection: "column",
          bg: "primary.light",
        })}
      >
        {children}
      </ul>
    </div>
  );
}
