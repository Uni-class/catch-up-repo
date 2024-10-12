import { memo, ReactNode } from "react";
import { css } from "@/styled-system/css";

const FooterGroup = ({
  name,
  children,
}: {
  name: string;
  children: ReactNode;
}) => {
  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        minWidth: "15em",
        padding: "1em",
        alignItems: "center",
      })}
    >
      <div
        className={css({
          width: "100%",
          padding: "0.5em 0",
          fontSize: "1.1em",
          fontWeight: "bold",
          color: "secondary",
        })}
      >
        {name}
      </div>
      <div
        className={css({
          width: "100%",
        })}
      >
        {children}
      </div>
    </div>
  );
};

export default memo(FooterGroup);
