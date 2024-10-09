import { css, cx } from "@/styled-system/css";
import { ReactNode, memo, CSSProperties } from "react";

interface PlaceholderLayoutProps {
  type?: "vertical" | "horizontal";
  padding?: CSSProperties["padding"];
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  gap?: CSSProperties["gap"];
  children: ReactNode;
}

const PlaceholderLayout = ({
  type = "vertical",
  padding,
  width,
  height,
  gap = "0.2em",
  children,
}: PlaceholderLayoutProps) => {
  return (
    <div
      className={cx(
        css({
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }),
        type === "vertical"
          ? css({ flexDirection: "row" })
          : css({ flexDirection: "column" }),
      )}
      style={{
        padding: padding,
        width: width,
        height: height,
        gap: gap,
      }}
    >
      {children}
    </div>
  );
};

export default memo(PlaceholderLayout);
