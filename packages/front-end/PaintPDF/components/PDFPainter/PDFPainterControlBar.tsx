import { memo, ReactNode, useEffect, useState } from "react";
import type { PDFPainterController } from "./types";
import ToolPointerIcon from "@/PaintPDF/assets/icons/tool-pointer.svg";
import ToolHandIcon from "@/PaintPDF/assets/icons/tool-hand.svg";
import ToolEditIcon from "@/PaintPDF/assets/icons/tool-edit.svg";
import ArrowLeftIcon from "@/PaintPDF/assets/icons/arrow-left.svg";
import ArrowRightIcon from "@/PaintPDF/assets/icons/arrow-right.svg";
import CloseIcon from "@/PaintPDF/assets/icons/close.svg";
import ShareIcon from "@/PaintPDF/assets/icons/share.svg";
import { PDFPainterControlBarButton } from "@/PaintPDF/components";
import { css } from "@/styled-system/css";
import { ModeContainer } from "@/app/view/_components/Common/Mode";

const PDFPainterControlBarComponent = ({
  pdfPainterController,
  modeComponent,
  downloadComponent,
  showCodeOverlay,
  setShowCodeOverlay,
}: {
  pdfPainterController: PDFPainterController;
  modeComponent?: ReactNode;
  downloadComponent?: ReactNode;
  showCodeOverlay: boolean;
  setShowCodeOverlay: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  useEffect(() => {
    pdfPainterController.setDragModeEnabled(
      pdfPainterController.getPaintMode() === "move"
    );
  }, [pdfPainterController]);

  const [showModeToolTip, setShowModeToolTip] = useState(false);
  const [showDownloadToolTip, setShowDownloadToolTip] = useState(false);

  return (
    <div
      className={css({
        display: "flex",
        padding: "1em",
        color: "#ffffff",
        backgroundColor: "#aaaaaa",
        height: "4em",
      })}
    >
      <div
        className={css({
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "1em",
          flexGrow: 1,
        })}
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
      <div
        className={css({
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "1em",
          padding: "0 2rem",
        })}
      >
        <PDFPainterControlBarButton
          onClick={() => {
            setShowCodeOverlay(!showCodeOverlay);
          }}
        >
          {showCodeOverlay ? (
            <CloseIcon width={"1.6em"} height={"1.6em"}></CloseIcon>
          ) : (
            <ShareIcon width={"1.6em"} height={"1.6em"} />
          )}
        </PDFPainterControlBarButton>
        <div className={css({ position: "relative" })}>
          <PDFPainterControlBarButton
            onClick={() => {
              setShowModeToolTip(!showModeToolTip);
            }}
          >
            <p>{showModeToolTip ? "닫기" : "모드"}</p>
          </PDFPainterControlBarButton>
          {showModeToolTip && (
            <ModeContainer setVisible={setShowModeToolTip}>
              {modeComponent}
            </ModeContainer>
          )}
        </div>
        <div className={css({ position: "relative" })}>
          <PDFPainterControlBarButton
            onClick={() => {
              setShowDownloadToolTip(!showDownloadToolTip);
            }}
            className={css({ width: "6em" })}
          >
            <p>{showDownloadToolTip ? "닫기" : "다운로드"}</p>
          </PDFPainterControlBarButton>
          {showDownloadToolTip && (
            <ModeContainer setVisible={setShowDownloadToolTip} title="다운로드 옵션">
              {downloadComponent}
            </ModeContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export const PDFPainterControlBar = memo(PDFPainterControlBarComponent);
