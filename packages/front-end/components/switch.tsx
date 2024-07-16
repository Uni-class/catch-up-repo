import { css } from "@/styled-system/css";
import { ChangeEventHandler } from "react";

interface PropType {
  checked: boolean;
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
  width: "42px",
  height: "24px",
  background: "#ccc",
  borderRadius: "12px",
  position: "relative",
  transition: "background 0.2s",
  "&.checked": {
    bg: "emerald.400",
  },
});

const switchThumb = css({
  width: "20px",
  height: "20px",
  background: "#fff",
  borderRadius: "50%",
  position: "absolute",
  top: "2px",
  left: "2px",
  transition: "left 0.2s",
  "&.checked": {
    left: "20px",
  },
});
