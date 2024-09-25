import { PDFPainterController } from "@/PaintPDF/components";
import { css } from "@/styled-system/css";
import { EventHandler, MouseEventHandler, useRef } from "react";
import { Document, Page } from "react-pdf";

export function PreviewPages({
  pdfDocumentURL,
  PDFPainterController,
}: {
  pdfDocumentURL: string;
  PDFPainterController: PDFPainterController;
}) {
  const currentPageIndex = PDFPainterController.getPageIndex();
  const pageCount = PDFPainterController.getPageCount();
  const loadRef = useRef<boolean>(false);
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
        padding:"1rem 0"
      })}
    >
      <Document
        file={pdfDocumentURL}
        onLoadSuccess={() => {
          loadRef.current = true;
        }}
        className={css({
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          alignItems: "center",
        })}
      >
        {loadRef.current &&
          Array.from(new Array(pageCount), (el, index) => (
            <PageElement
              key={`page-${index}`}
              index={index}
              onClick={() => {
                PDFPainterController.setPageIndex(index);
              }}
              currentIndex={currentPageIndex}
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
}: {
  index: number;
  currentIndex: number;
  onClick?: MouseEventHandler<HTMLDivElement>;
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
        <div
          className={css({
            position: "absolute",
            right: "-0.75rem",
            top: "-1rem",
            borderRadius: "50%",
            width: "2rem",
            height: "2rem",
            border: "1px solid black",
            backgroundColor: "white",
          })}
        />
      </div>
      <p className={css({ textAlign: "center" })}>{index + 1}</p>
    </div>
  );
}
