import { css, cx } from "@/styled-system/css";
import { memo, CSSProperties } from "react";

interface PlaceholderProps {
  type?: "box" | "circle" | "text";
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  lineCount?: number;
  lineHeight?: CSSProperties["lineHeight"];
  lineGap?: CSSProperties["gap"];
  borderRadius?: CSSProperties["borderRadius"];
}

const Placeholder = ({
  type = "box",
  width = "1em",
  height = "1em",
  lineCount = 1,
  lineHeight = "1em",
  lineGap = "1em",
  borderRadius = "0.2em",
}: PlaceholderProps) => {
  if (type === "text") {
    return (
      <div
        className={css({
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        })}
        style={{ gap: lineGap }}
      >
        {Array.from({ length: lineCount }, (_, index) => (
          <div
            key={index}
            className={cx(
              css({
                backgroundImage:
                  "linear-gradient(90deg, #d0d0d0 calc(50% - 1.5em), #e8e8e8 50%, #d0d0d0 calc(50% + 1.5em))",
                backgroundSize: "400%",
                animation: "placeholderLoading 3s infinite linear",
              }),
            )}
            style={{
              width: width,
              height: lineHeight,
              borderRadius: borderRadius,
            }}
          ></div>
        ))}
      </div>
    );
  }
  return (
    <div
      className={css({
        backgroundImage:
          "linear-gradient(90deg, #d0d0d0 calc(50% - 1.5em), #e8e8e8 50%, #d0d0d0 calc(50% + 1.5em))",
        backgroundSize: "400%",
        animation: "placeholderLoading 3s infinite linear",
      })}
      style={{
        width: width,
        height: height,
        borderRadius: type === "circle" ? "100%" : borderRadius,
      }}
    ></div>
  );
};

export default memo(Placeholder);
