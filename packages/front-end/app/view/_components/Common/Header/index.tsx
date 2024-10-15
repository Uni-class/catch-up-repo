import { PDFPainterController } from "@/PaintPDF/components";
import LogoIcon from "@/public/logo-horizontal-white.svg";
import { css } from "@/styled-system/css";
import { HeaderControlButton } from "./HeaderControlButton";
import BrushIcon from "@/public/icons/brush.svg";
import ViewIcon from "@/public/icons/view.svg";
import MoveIcon from "@/public/icons/zoom.svg";
import DownloadIcon from "@/public/icons/download.svg";
import SettingsIcon from "@/public/icons/settings.svg";
import ShareIcon from "@/public/icons/share.svg";
import { HeaderTooltipButton } from "./HeaderToolTipButton";

interface PropType {
  pdfPainterController: PDFPainterController;
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
export function Header({ pdfPainterController }: PropType) {
  return (
    <header
      className={css({
        width: "100%",
        height: "4.2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        bg: "primary.light",
        padding: "0 2.5rem",
      })}
    >
      <LogoIcon height={"1.352rem"} width={"7.08rem"} />
      <div
        className={css({
          display: "flex",
          alignItems: "center",
          flex: 1,
          paddingLeft: "7rem",
          gap: "1.92rem",
        })}
      >
        <HeaderControlButton
          onClick={() => pdfPainterController.setPaintMode("default")}
          disabled={pdfPainterController.getPaintMode() === "default"}
        >
          <ViewIcon width={"1em"} height={"1em"} />
        </HeaderControlButton>
        <HeaderControlButton
          onClick={() => pdfPainterController.setPaintMode("move")}
          disabled={pdfPainterController.getPaintMode() === "move"}
        >
          <MoveIcon width={"1em"} height={"1em"} />
        </HeaderControlButton>
        <HeaderControlButton
          onClick={() => pdfPainterController.setPaintMode("draw")}
          disabled={pdfPainterController.getPaintMode() === "draw"}
        >
          <BrushIcon width={"1em"} height={"1em"} />
        </HeaderControlButton>
      </div>
      <div className={css({ display: "flex", alignItems: "center", gap: "1.54rem", })}>
        <HeaderTooltipButton text={"공유"} startIcon={<ShareIcon width={"1rem"} height={"1rem"} />} />
        <HeaderTooltipButton text={"모드"} startIcon={<SettingsIcon width={"1rem"} height={"1rem"} />} />
        <HeaderTooltipButton text={"다운로드"} startIcon={<DownloadIcon width={"1rem"} height={"1rem"} />} />
      </div>
    </header>
  );
}
