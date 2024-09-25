import { PDFPainterController } from "@/PaintPDF/components";
import { css } from "@/styled-system/css";
import { MouseEventHandler, ReactNode, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";

const options = {
  cMapUrl: `//unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
  cMapPacked: true,
};

export function PreviewPages({
  pdfDocumentURL,
  PDFPainterController,
  getBadgeContent,
  getBadgeVisible,
}: {
  pdfDocumentURL: string;
  PDFPainterController: PDFPainterController;
  getBadgeVisible: (index: number) => boolean;
  getBadgeContent: () => ReactNode;
}) {
  const currentPageIndex = PDFPainterController.getPageIndex();
  const pageCount = PDFPainterController.getPageCount();
  return (
    <div
      className={css({
        width: "13rem",
        height: "100%",
        borderRight: "1px solid",
        borderColor: "gray.300",
        display: "flex",
        overflow: "scroll",
        justifyContent: "center",
        bg: "gray.100",
        padding: "1rem 0",
      })}
    >
      <Document
        file={pdfDocumentURL}
        className={css({
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          alignItems: "center",
        })}
        options={options}
      >
        {Array.from(new Array(pageCount), (el, index) => (
          <PageElement
            key={`page-${index}`}
            index={index}
            onClick={() => {
              PDFPainterController.setPageIndex(index);
            }}
            currentIndex={currentPageIndex}
            isBadgeVisible={getBadgeVisible(index)}
            badgeContent={getBadgeContent()}
          />
        ))}
      </Document>
    </div>
  );
}

function PageElement({
  index,
  onClick,
  currentIndex,
  isBadgeVisible = false,
  badgeContent,
}: {
  index: number;
  currentIndex: number;
  onClick?: MouseEventHandler<HTMLDivElement>;
  isBadgeVisible?: boolean;
  badgeContent?: ReactNode;
}) {
  return (
    <div>
      <div
        onClick={onClick}
        className={css({
          cursor: "pointer",
          border: currentIndex === index ? "2px solid white" : "",
          outline: currentIndex === index ? "3px solid black" : "",
          position: "relative",
        })}
      >
        <Page
          pageNumber={index + 1}
          width={1600}
          height={900}
          renderTextLayer={false}
          renderAnnotationLayer={false}
          scale={0.1}
        />
        {isBadgeVisible && (
          <div
            className={css({
              position: "absolute",
              right: "-0.75rem",
              top: "-1rem",
              borderRadius: "50%",
              width: "2rem",
              height: "2rem",
              border: "2px solid black",
              backgroundColor: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            })}
          >
            {badgeContent}
          </div>
        )}
      </div>
      <p className={css({ textAlign: "center" })}>{index + 1}</p>
    </div>
  );
}
