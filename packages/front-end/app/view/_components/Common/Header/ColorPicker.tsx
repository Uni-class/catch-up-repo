import { css } from "@/styled-system/css";
import { ToolButton } from "@/app/view/_components/Common/Header/ToolButton";
import TypeIcon from "@/public/icons/type.svg";
import { PDFPainterController } from "@/PaintPDF/components";

export function ColorPicker({
  pdfPainterController,
}: {
  pdfPainterController: PDFPainterController;
}) {
  return (
    <div
      className={css({
        display: "flex",
        width: "15em",
        flexWrap: "wrap",
      })}
    >
      {pdfPainterController.getAvailableColors().map((color, index) => (
        <ToolButton
          key={index}
          onClick={() => pdfPainterController.setCurrentColor(color.name)}
          disabled={pdfPainterController.getCurrentColor() === color.name}
          className={css({
            padding: "0.2em",
            _disabled: {
              backgroundColor: "#ffffff",
            },
          })}
        >
          <div
            className={css({
              width: "100%",
              height: "100%",
              borderRadius: "100%",
            })}
            style={{ backgroundColor: color.value }}
          ></div>
        </ToolButton>
      ))}
    </div>
  );
}
