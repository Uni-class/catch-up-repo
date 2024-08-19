import { useEffect, useState, useRef } from "react";
import { pdfjs } from "react-pdf";
import { Document, Page } from "react-pdf";
import { css } from "@/styled-system/css";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { useSetSize } from "../\bhooks/useSetSize";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PDFViewer({
  documentURL,
  defaultPageIndex = 0,
}: {
  documentURL: string;
  defaultPageIndex?: number;
}) {
  const { containerRef, pageWidth, pageHeight,onPageLoadSuccess } = useSetSize();

  const [pageCount, setPageCount] = useState<number | null>(null);
  const [currentPageIndex, setCurrentPageIndex] =
    useState<number>(defaultPageIndex);

  useEffect(() => {
    if (pageCount === null) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        setCurrentPageIndex((index) => Math.min(pageCount - 1, index + 1));
      } else if (event.key === "ArrowLeft") {
        setCurrentPageIndex((index) => Math.max(0, index - 1));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [pageCount]);

  const onDocumentLoadSuccess = (pdf: pdfjs.PDFDocumentProxy) => {
    setPageCount(pdf.numPages);
    setCurrentPageIndex(
      Math.min(Math.max(0, currentPageIndex), pdf.numPages - 1)
    );
  };

  return (
    <div
      className={css({
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      })}
    >
      <div
        className={css({
          display: "flex",
          padding: "1em",
          color: "#ffffff",
          backgroundColor: "#000000",
          justifyContent: "center",
          alignItems: "center",
        })}
      >
        {currentPageIndex + 1} / {pageCount}
      </div>
      <div
        ref={containerRef}
        className={css({
          position: "relative",
          flexGrow: 1,
          overflow:"hidden",
        })}
      >
        <Document file={documentURL} onLoadSuccess={onDocumentLoadSuccess}>
          <Page
            pageIndex={currentPageIndex}
            onLoadSuccess={onPageLoadSuccess}
            width={pageWidth}
            height={pageHeight}
          />
        </Document>
      </div>
    </div>
  );
}
