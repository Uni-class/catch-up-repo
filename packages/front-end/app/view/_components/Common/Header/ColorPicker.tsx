import { css } from "@/styled-system/css";
import { ToolButton } from "@/app/view/_components/Common/Header/ToolButton";
import { PDFPainterController } from "@/PaintPDF/components";
import Button from "@/components/Button/Button";
import CloseIcon from "@/public/icons/close.svg";
import { Dispatch, SetStateAction, useEffect } from "react";

export function ColorPicker({
  pdfPainterController,
  setWindowVisible,
}: {
  pdfPainterController: PDFPainterController;
  setWindowVisible: Dispatch<SetStateAction<boolean>>;
}) {
  useEffect(() => {
    const handleKeydownEvent = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Esc") {
        setWindowVisible(false);
      }
    };

    window.addEventListener("keydown", handleKeydownEvent);

    return () => {
      window.removeEventListener("keydown", handleKeydownEvent);
    };
  }, [setWindowVisible]);

  return (
    <div
      className={css({
        position: "absolute",
        top: "150%",
        left: "0%",
        display: "flex",
        padding: "2.5em 1em 1em 1em",
        width: "15em",
        flexWrap: "wrap",
        gap: "0.2em",
        backgroundColor: "#ffffff",
        border: "2px solid #f0f0f0",
        borderRadius: "1rem",
        zIndex: 1000,
        overflow: "hidden",
      })}
    >
      <Button
        className={css({
          position: "absolute",
          top: "0.2em",
          right: "0.2em",
          padding: "0.1em",
          borderRadius: "0.5rem",
        })}
        color={"dangerous"}
        onClick={() => setWindowVisible(false)}
      >
        <CloseIcon width={"1.5rem"} height={"1.5rem"} />
      </Button>
      {pdfPainterController.getAvailableColors().map((color, index) => (
        <ToolButton
          key={index}
          onClick={() => pdfPainterController.setCurrentColor(color.name)}
          disabled={pdfPainterController.getCurrentColor() === color.name}
          className={css({
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#ffffff",
            _disabled: {
              border: "3px solid #808080",
              backgroundColor: "secondary.200",
            },
          })}
        >
          <div
            className={css({
              width: "2em",
              height: "2em",
              borderRadius: "100%",
              border: "0.2em solid #000000",
            })}
            style={{ backgroundColor: color.value }}
          ></div>
        </ToolButton>
      ))}
    </div>
  );
}
