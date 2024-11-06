import Button from "@/components/Button/Button";
import { PDFPainterController } from "@/PaintPDF/components";
import { css } from "@/styled-system/css";
import PlusIcon from "@/public/icons/plus.svg";
import MinusIcon from "@/public/icons/minus.svg";

interface PropType {
  pdfPainterController: PDFPainterController;
}

function formatNumber(num: number) {
  const result = (num * 100).toFixed(1); // 100을 곱하고 소수점 1자리까지 반올림
  return parseFloat(result); // 필요 시 소수점 제거
}

export function PageZoomControl({ pdfPainterController }: PropType) {
  const currentRenderOptions = pdfPainterController.getRenderOptions();

  return (
    <div
      className={css({
        display: "flex",
        height: "2rem",
        fontSize: "1rem",
        alignItems: "center",
      })}
    >
      <Button
        className={css({
          borderRadius: "0.35rem",
          bg: "primary.500",
          _hover: {
            bg: "primary.200",
          },
        })}
        startIcon={<MinusIcon width={"1em"} height={"1em"} />}
        onClick={() => {
          const scale = currentRenderOptions.scale - 0.1;
          pdfPainterController.setRenderOptions({
            ...currentRenderOptions,
            scale,
          });
        }}
      >
        축소
      </Button>
      <p
        className={css({
          width: "4rem",
          textAlign: "center",
          fontWeight: "semibold",
        })}
      >
        {formatNumber(currentRenderOptions.scale)}
        <span className={css({
            fontWeight:400
        })}>
            %
        </span>
      </p>
      <Button
        className={css({
          borderRadius: "0.35rem",
          bg: "primary.500",
          _hover: {
            bg: "primary.200",
          },
        })}
        startIcon={<PlusIcon width={"1em"} height={"1em"} />}
        onClick={() => {
          const scale = currentRenderOptions.scale + 0.1;
          pdfPainterController.setRenderOptions({
            ...currentRenderOptions,
            scale,
          });
        }}
      >
        확대
      </Button>
    </div>
  );
}
