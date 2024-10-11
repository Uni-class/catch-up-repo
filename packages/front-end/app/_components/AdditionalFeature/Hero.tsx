import { css, cx } from "@/styled-system/css";
import { ReactNode } from "react";

export default function Hero({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cx(
        css({
          fontSize: "7.5rem",
          fontWeight: "bold",
          position: "absolute",
          top: 0,
          zIndex:0,
        }),
        className
      )}
    >
      {children}
    </p>
  );
}
