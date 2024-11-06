import { PDFPainterController } from "@/PaintPDF/components";
import RightIcon from "@/public/icons/chevron-right.svg";
import LeftIcon from "@/public/icons/chevron-left.svg";
import { css } from "@/styled-system/css";
import { styled } from "@/styled-system/jsx";

interface PropType {
  pdfPainterController: PDFPainterController;
}
export function PageIndexShow({ pdfPainterController }: PropType) {
  const pageIndex = pdfPainterController.getPageIndex();
  const pageCount = pdfPainterController.getPageCount();
  return (
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
    borderColor: "gray.400",
    _hover: {
      borderColor: "black",
    },
  },
});
