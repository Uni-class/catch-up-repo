import Button from "@/components/Button/Button";
import { PDFPainterController } from "@/PaintPDF/components";
import { css } from "@/styled-system/css";
import { useState } from "react";
import PlusIcon from "@/public/icons/plus.svg";
import MinusIcon from "@/public/icons/minus.svg";

interface PropType {
  pdfPainterController: PDFPainterController;
}
export function PageZoomControl({ pdfPainterController }: PropType) {
  const [zoomValue, setZoomValue] = useState<number>(0);
  return (
    <div
      className={css({
        display: "flex",
        height: "2rem",
        fontSize: "1rem",
      })}
    >
      <Button
        className={css({
          borderRadius: "0.35rem 0 0 0.35rem",
          bg: "primary.500",
          _hover: {
            bg: "primary.200",
          },
        })}
        startIcon={<MinusIcon width={"1em"} height={"1em"} />}
      >
        축소
      </Button>
      <input
        className={css({
          bg: "white",
          color: "black",
          width: "5rem",
          paddingLeft: "0.5rem",
          borderTop: "1px solid",
          borderBottom: "2px solid",
          borderLeft: "none",
          borderRight: "none",
          borderRadius: "0",
          _hover: {
            borderColor: "primary.100",
          },
          _focus: {
            borderColor: "primary.500",
          },
        })}
        placeholder="확대 및 축소"
        value={zoomValue}
        onChange={(e) => {
          const value = Number(e.target.value);
          if (Number.isNaN(value)) {
            return;
          }
          setZoomValue(value);
        }}
      />
      <Button
        className={css({
          borderRadius: "0 0.35rem 0.35rem 0",
          bg: "primary.500",
          _hover: {
            bg: "primary.200",
          },
        })}
        startIcon={<PlusIcon width={"1em"} height={"1em"} />}
        onClick={() => {
          
        }}
      >
        확대
      </Button>
    </div>
  );
}
