import { css, cx } from "@/styled-system/css";
import {
  DetailedHTMLProps,
  Dispatch,
  InputHTMLAttributes,
  ReactNode,
  SetStateAction,
  useEffect,
} from "react";

export function ModeControl({
  labelText,
  ...attr
}: DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & { labelText: string }) {
  return (
    <div>
      <input
        type="checkbox"
        onChange={() => {
          alert("아직 미구현된 기능입니다.");
        }}
        {...attr}
        className={cx(
          css({ margin: "0.5rem 0.25rem 0.5rem 0" }),
          attr.className
        )}
      />
      <label htmlFor={attr.id}>{labelText}</label>
    </div>
  );
}

export function ModeContainer({
  setVisible,
  children,
  title="모드 설정"
}: {
  setVisible: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  title?: string;
}) {
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Esc") {
        setVisible(false);
      }
    };

    window.addEventListener("keydown", handleEscKey);

    return () => {
      window.removeEventListener("keydown", handleEscKey);
    };
  }, [setVisible]);
  return (
    <div
      className={css({
        position: "absolute",
        bottom: "110%",
        right: "10%",
        backgroundColor: "#fff",
        border: "2px solid black",
        borderRadius: "0.5rem",
        padding: "1rem",
        color: "#000",
        whiteSpace: "normal",
        zIndex: 1000,
        width: "15rem",
      })}
    >
      <div
        className={css({
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.5rem 0",
        })}
      >
        <p>
          {title}
        </p>
        <button
          onClick={() => {
            setVisible(false);
          }}
          className={css({ cursor: "pointer" })}
        >
          X
        </button>
      </div>
      {children}
    </div>
  );
}
