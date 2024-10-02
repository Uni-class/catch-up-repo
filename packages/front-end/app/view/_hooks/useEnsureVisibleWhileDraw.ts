import { PDFPainterController } from "@/PaintPDF/components";
import { useEffect } from "react";

export const useEnsureVisibleWhileDraw = (
  editorId: string,
  pdfPainterController: PDFPainterController
) => {
  useEffect(() => {
    pdfPainterController.addIdEnsureVisibleWhileDraw(editorId);
  }, [editorId, pdfPainterController]);
};
