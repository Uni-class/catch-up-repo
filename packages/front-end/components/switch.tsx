import { css } from "@/styled-system/css";
import { styled } from "@/styled-system/jsx";
import { ChangeEventHandler } from "react";

interface PropType {
  checked?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  name?: string;
  size?: "sm" | "md" | "lg";
}

export default function Switch({
  checked,
  onChange,
  name = "switch",
  size = "md",
}: PropType) {
  return (
    <label className={switchContainer}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={switchInput}
        name={name}
      />
      <SwitchTrack className={`${checked ? "checked" : ""}`} size={size}>
        <SwitchThumb className={`${checked ? "checked" : ""}`} size={size} />
      </SwitchTrack>
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

const SwitchTrack = styled("span", {
  base: {
    background: "#ccc",
    position: "relative",
    transition: "background 0.2s",
    "&.checked": {
      bg: "emerald.400",
    },
  },
  variants: {
    size: {
      lg: {
        width: "50px",
        height: "calc(1.5rem + 4px)",
        borderRadius: "12px",
      },
      md: {
        width: "40px",
        height: "calc(1.25rem + 4px)",
        borderRadius: "10px",
      },
      sm: {
        width: "33px",
        height: "calc(1rem + 4px)",
        borderRadius: "8px",
      },
    },
  },
});

const SwitchThumb = styled("span", {
  base: {
    background: "#fff",
    borderRadius: "50%",
    position: "absolute",
    top: "2px",
    left: "2px",
    transition: "left 0.2s",
  },
  variants: {
    size: {
      lg: {
        width: "1.5rem",
        height: "1.5rem",
        "&.checked": {
          left: "calc(50px - 1.5rem - 2px)",
        },
      },
      md: {
        width: "1.25rem",
        height: "1.25rem",
        "&.checked": {
          left: "calc(40px - 1.25rem - 2px)",
        },
      },
      sm: {
        width: "1rem",
        height: "1rem",
        "&.checked": {
          left: "calc(33px - 1rem - 2px)",
        },
      },
    },
  },
});
