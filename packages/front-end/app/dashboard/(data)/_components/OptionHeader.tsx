import { css } from "@/styled-system/css";

export default function OptionHeader() {
  return (
    <div
      className={css({
        width: "100%",
        height: "120px",
        padding: "1.5rem",
        display: "flex",
        alignItems: "flex-end",
        borderBottom: "1px solid",
        borderColor: "gray.200",
      })}
    ></div>
  );
}
