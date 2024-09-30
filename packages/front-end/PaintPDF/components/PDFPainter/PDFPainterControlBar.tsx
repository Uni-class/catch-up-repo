import { memo, useEffect } from "react";
import type { PDFPainterController } from "./types";
import ToolPointerIcon from "@/PaintPDF/assets/icons/tool-pointer.svg";
import ToolHandIcon from "@/PaintPDF/assets/icons/tool-hand.svg";
import ToolEditIcon from "@/PaintPDF/assets/icons/tool-edit.svg";
import ArrowLeftIcon from "@/PaintPDF/assets/icons/arrow-left.svg";
import ArrowRightIcon from "@/PaintPDF/assets/icons/arrow-right.svg";
import { PDFPainterControlBarButton } from "@/PaintPDF/components";

const PDFPainterControlBarComponent = ({
  pdfPainterController,
}: {
  pdfPainterController: PDFPainterController;
}) => {
  useEffect(() => {
    pdfPainterController.setDragModeEnabled(
      pdfPainterController.getPaintMode() === "move",
    );
  }, [pdfPainterController]);

  return (
    <div
      style={{
        display: "flex",
        padding: "1em",
        color: "#ffffff",
        backgroundColor: "#aaaaaa",
        justifyContent: "center",
        alignItems: "center",
        gap: "1em",
        height:"4em",
      }}
    >
      <PDFPainterControlBarButton
        onClick={() => pdfPainterController.setPaintMode("default")}
        disabled={pdfPainterController.getPaintMode() === "default"}
      >
        <ToolPointerIcon width={"1.6em"} height={"1.6em"} />
      </PDFPainterControlBarButton>
      <PDFPainterControlBarButton
        onClick={() => pdfPainterController.setPaintMode("move")}
        disabled={pdfPainterController.getPaintMode() === "move"}
      >
        <ToolHandIcon width={"1.6em"} height={"1.6em"} />
      </PDFPainterControlBarButton>
      <PDFPainterControlBarButton
        onClick={() => pdfPainterController.setPaintMode("draw")}
        disabled={pdfPainterController.getPaintMode() === "draw"}
      >
        <ToolEditIcon width={"1.6em"} height={"1.6em"} />
      </PDFPainterControlBarButton>
      <PDFPainterControlBarButton
        onClick={pdfPainterController.moveToPreviousPage}
        disabled={!pdfPainterController.hasPreviousPage()}
      >
        <ArrowLeftIcon width={"1.6em"} height={"1.6em"} />
      </PDFPainterControlBarButton>
      <div>
        {pdfPainterController.getPageIndex() + 1}/
        {pdfPainterController.getPageCount()}
      </div>
      <div>
        {Math.round(pdfPainterController.getRenderOptions().scale * 100)}%
      </div>
      <PDFPainterControlBarButton
        onClick={pdfPainterController.moveToNextPage}
        disabled={!pdfPainterController.hasNextPage()}
      >
        <ArrowRightIcon width={"1.6em"} height={"1.6em"} />
      </PDFPainterControlBarButton>
    </div>
  );
};

export const PDFPainterControlBar = memo(PDFPainterControlBarComponent);
