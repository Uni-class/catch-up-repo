import { PDFPainterController } from "@/PaintPDF/components";
import { css } from "@/styled-system/css";
import { styled } from "@/styled-system/jsx";
import RightIcon from "@/public/icons/chevron-right.svg";
import LeftIcon from "@/public/icons/chevron-left.svg";
import { useRef } from "react";
import { toast } from "react-toastify";

interface PropType {
  pdfPainterController: PDFPainterController;
}

export function PageControl({ pdfPainterController }: PropType) {
  const pageIndex = pdfPainterController.getPageIndex();
  const pageCount = pdfPainterController.getPageCount();
  const inputRef = useRef<null | HTMLInputElement>(null);
  return (
    <div
      className={css({
        height: "4.16rem",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      })}
    >
      <div
        className={css({
          display: "flex",
          fontSize: "1rem",
          width: "10rem",
          alignItems: "center",
          justifyContent: "space-between",
          color: "black",
        })}
      >
        <PageButton
          onClick={() => {
            pdfPainterController.setPageIndex(Math.max(pageIndex - 1, 0));
          }}
        >
          <LeftIcon width={"1em"} height={"1em"} />
        </PageButton>
        <p>
          <span className={css({ color: "primary.400", fontWeight: "bold" })}>
            {pageIndex + 1}
          </span>
          {` / ${pageCount}`}
        </p>
        <PageButton
          onClick={() => {
            pdfPainterController.setPageIndex(
              Math.min(pageIndex + 1, pageCount - 1)
            );
          }}
        >
          <RightIcon width={"1em"} height={"1em"} />
        </PageButton>
      </div>
      <div
        className={css({
          display: "flex",
          height: "2rem",
          fontSize: "1rem",
          right: "5%",
          position: "absolute",
        })}
      >
        <input
          className={css({
            bg: "white",
            color: "black",
            width: "6rem",
            paddingLeft: "0.5rem",
            border: "1px solid",
              borderRadius: "0.35rem 0 0 0.35rem",
            _hover: {
              borderColor: "primary.100",
            },
            _focus: {
              borderColor: "primary.500",
            },
          })}
          placeholder="페이지 입력"
          ref={inputRef}
          required
        />
        <button
          className={css({
            cursor: "pointer",
            width: "4rem",
            bg: "primary.500",
            color: "white",
            borderRadius:"0 0.35rem 0.35rem 0",
            _hover: {
              bg: "primary.200",
            },
          })}
          onClick={() => {
            if (inputRef.current === null) return;
            const value = inputRef.current.value;
            if (value.trim() === "") {
              return;
            }
            const number = Number(value);
            if (Number.isNaN(number)) {
              toast("숫자를 입력해주세요.", { type: "error" });
              return;
            }
            if (number <= 0 || number > pageCount) {
              toast(`유효한 범위:${1} ~ ${pageCount} 를 입력해주세요.`, {
                type: "error",
              });
              return;
            }
            pdfPainterController.setPageIndex(number - 1);
          }}
        >
          이동
        </button>
      </div>
    </div>
  );
}

const PageButton = styled("button", {
  base: {
    width: "2rem",
    height: "2rem",
    borderRadius: "50%",
    bg: "white",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid",
    borderColor:"gray.400",
    _hover: {
      borderColor: "black",
    },
  },
});
