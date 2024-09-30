import { css, cx } from "@/styled-system/css";
import { ReactNode, memo } from "react";

interface PlaceholderLayoutProps {
  type?: "vertical" | "horizontal";
  padding?: number | string;
  width?: number | string;
  height?: number | string;
  gap?: number | string;
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
