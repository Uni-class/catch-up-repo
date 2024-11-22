import { PDFPainterController } from "@/PaintPDF/components";
import LogoTextIcon from "@/public/logo-horizontal-white.svg";
import { css } from "@/styled-system/css";
import { ToolPanel } from "@/app/view/_components/Common/Header/ToolPanel";
import { ToolButton } from "./ToolButton";
import PointerIcon from "@/public/icons/pointer.svg";
import MoveIcon from "@/public/icons/move.svg";
import RegionSelectIcon from "@/public/icons/region-select.svg";
import PenIcon from "@/public/icons/pen.svg";
import EraserIcon from "@/public/icons/eraser.svg";
import TypeIcon from "@/public/icons/type.svg";
import DownloadIcon from "@/public/icons/download.svg";
import SettingsIcon from "@/public/icons/settings.svg";
import ShareIcon from "@/public/icons/share.svg";
import { HeaderTooltipButton } from "./HeaderToolTipButton";
import { ReactNode, useState } from "react";
import { overlay } from "overlay-kit";
import { ModeContainer } from "../Mode";
import Divider from "@/components/Divider";

interface PropType {
  pdfPainterController?: PDFPainterController;
  downloadRender?: ReactNode;
  modeRender?: ReactNode;
  codeRender?: ReactNode;
}

/**
 * 역할에 따라 달라지는 것들
 * - 호스트
 *   - 모드는 내필기 가리기
 *   - 다운로드는 내필기 선택
 * - 참여자
 *   - 모드는 내필기 가리기, 호스트필기 가리기, 자동추적
 *   - 다룬로드는 내필기, 호스트필기 선택
 */
export function Header({
  pdfPainterController,
  codeRender,
  downloadRender,
  modeRender,
}: PropType) {
  const [isModeOpen, setIsModeOpen] = useState(false);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  return (
    <header
      className={css({
        width: "100%",
        height: "4.2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        bg: "primary.200",
      })}
    >
      <a
        className={css({
          display: "flex",
          height: "100%",
          padding: "0 2rem",
          alignItems: "center",
          justifyContent: "center",
        })}
        href={"/"}
      >
        <LogoTextIcon height={"1.352rem"} width={"7.08rem"} />
      </a>
      {pdfPainterController ? (
        <>
          <ToolPanel>
            <ToolButton
              onClick={() => pdfPainterController.setCurrentTool("text-select")}
              disabled={pdfPainterController.getCurrentTool() === "text-select"}
            >
              <PointerIcon width={"1em"} height={"1em"} />
            </ToolButton>
            <ToolButton
              onClick={() => pdfPainterController.setCurrentTool("drag")}
              disabled={pdfPainterController.getCurrentTool() === "drag"}
            >
              <MoveIcon width={"1em"} height={"1em"} />
            </ToolButton>
            <ToolButton
              onClick={() => pdfPainterController.setCurrentTool("area-select")}
              disabled={pdfPainterController.getCurrentTool() === "area-select"}
            >
              <RegionSelectIcon width={"1em"} height={"1em"} />
            </ToolButton>
            <Divider
              direction="vertical"
              className={css({
                margin: "0 0.3em",
              })}
            />
            <ToolButton
              onClick={() => pdfPainterController.setCurrentTool("pen")}
              disabled={pdfPainterController.getCurrentTool() === "pen"}
            >
              <PenIcon width={"1em"} height={"1em"} />
            </ToolButton>
            <ToolButton
              onClick={() => pdfPainterController.setCurrentTool("eraser")}
              disabled={pdfPainterController.getCurrentTool() === "eraser"}
            >
              <EraserIcon width={"1em"} height={"1em"} />
            </ToolButton>
            <ToolButton
              onClick={() => pdfPainterController.setCurrentTool("text")}
              disabled={pdfPainterController.getCurrentTool() === "text"}
            >
              <TypeIcon width={"1em"} height={"1em"} />
            </ToolButton>
          </ToolPanel>
          <div
            className={css({
              display: "flex",
              alignItems: "center",
              gap: "1.54rem",
              padding: "0 2rem",
            })}
          >
            <HeaderTooltipButton
              text={"공유"}
              startIcon={<ShareIcon width={"1rem"} height={"1rem"} />}
              onClick={() => {
                overlay.open(() => codeRender, { overlayId: "code-overlay" });
              }}
            />
            <HeaderTooltipButton
              text={"모드"}
              startIcon={<SettingsIcon width={"1rem"} height={"1rem"} />}
              onClick={() => {
                setIsModeOpen(!isModeOpen);
              }}
              tooltip={
                isModeOpen && (
                  <ModeContainer setVisible={setIsModeOpen}>
                    {modeRender}
                  </ModeContainer>
                )
              }
            />
            <HeaderTooltipButton
              text={"다운로드"}
              startIcon={<DownloadIcon width={"1rem"} height={"1rem"} />}
              onClick={() => {
                setIsDownloadOpen(!isDownloadOpen);
              }}
              tooltip={
                isDownloadOpen && (
                  <ModeContainer setVisible={setIsDownloadOpen}>
                    {downloadRender}
                  </ModeContainer>
                )
              }
            />
          </div>
        </>
      ) : null}
    </header>
  );
}
