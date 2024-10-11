import { css, cx } from "@/styled-system/css";
import { ReactNode, memo, CSSProperties } from "react";

interface PlaceholderLayoutProps {
  type?: "vertical" | "horizontal";
  padding?: CSSProperties["padding"];
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  gap?: CSSProperties["gap"];
  justifyContent?: CSSProperties["justifyContent"];
  alignItems?: CSSProperties["alignItems"];
  children: ReactNode;
}

const PlaceholderLayout = ({
  type = "vertical",
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
        type === "vertical"
          ? css({ flexDirection: "column" })
          : css({ flexDirection: "row" }),
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
