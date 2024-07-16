import { css } from "@/styled-system/css";
import { ChangeEventHandler } from "react";

interface PropType {
  checked?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  name?: "string";
}

export default function Switch({ checked, onChange, name }: PropType) {
  return (
    <label className={switchContainer}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={switchInput}
        name={name}
      />
      <span className={`${switchTrack} ${checked ? "checked" : ""}`}>
        <span className={`${switchThumb} ${checked ? "checked" : ""}`} />
      </span>
    </label>
  );
}

const switchContainer = css({
  display: "inline-flex",
  alignItems: "center",
  cursor: "pointer",
  userSelect: "none",
});

const switchInput = css({
  position: "absolute",
  opacity: 0,
  width: 0,
  height: 0,
});

const switchTrack = css({
  width: "50px",
  height: "calc(1.5rem + 4px)",
  background: "#ccc",
  borderRadius: "12px",
  position: "relative",
  transition: "background 0.2s",
  "&.checked": {
    bg: "emerald.400",
  },
});

const switchThumb = css({
  width: "1.5rem",
  height: "1.5rem",
  background: "#fff",
  borderRadius: "50%",
  position: "absolute",
  top: "2px",
  left: "2px",
  transition: "left 0.2s",
  "&.checked": {
    left: "calc(50px - 1.5rem - 2px)",
  },
});
