import { ReactNode } from "react";
import { Paragraph } from "@/components/Text";
import { css, cx } from "@/styled-system/css";

interface PropType {
  className?: string;
  name?: string;
  children: ReactNode;
}

export default function SidebarGroup({ className, name, children }: PropType) {
  return (
    <div
      className={cx(
        className,
        css({
          display: "flex",
          flexDirection: "column",
          gap: "0.3em",
        }),
      )}
    >
      {name === "" ? undefined : (
        <Paragraph variant="sub3" className={css({ margin: "0.3em 0" })}>
          {name}
        </Paragraph>
      )}
      {children}
    </div>
  );
}
