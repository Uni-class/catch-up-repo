import { css, cx } from "@/styled-system/css";
import { ReactNode, memo, CSSProperties } from "react";

interface PlaceholderLayoutProps {
  type?: "horizontal" | "vertical";
  padding?: CSSProperties["padding"];
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  gap?: CSSProperties["gap"];
  justifyContent?: CSSProperties["justifyContent"];
  alignItems?: CSSProperties["alignItems"];
  children: ReactNode;
}

const PlaceholderLayout = ({
  type = "horizontal",
  padding,
  width,
  height,
  gap = "0.2em",
  justifyContent = "center",
  alignItems = "center",
  children,
}: PlaceholderLayoutProps) => {
  return (
    <div
      className={cx(
        css({
          display: "flex",
        }),
        type === "horizontal"
          ? css({ flexDirection: "row" })
          : css({ flexDirection: "column" }),
      )}
      style={{
        padding: padding,
        width: width,
        height: height,
        justifyContent: justifyContent,
        alignItems: alignItems,
        gap: gap,
      }}
    >
      {children}
    </div>
  );
};

export default memo(PlaceholderLayout);
