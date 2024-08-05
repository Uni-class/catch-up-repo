import { useEffect, useState } from "react";
import { pdfjs } from "react-pdf";
import { Document, Page } from "react-pdf";
import { css } from "@/styled-system/css";
import { PDFDocumentProxy } from "pdfjs-dist/types/src/pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   "pdfjs-dist/build/pdf.worker.min.mjs",
//   import.meta.url
// ).toString();
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PDFViewer({ documentURL, defaultPageIndex = 0 }: { documentURL: string, defaultPageIndex?: number }) {
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(defaultPageIndex);

  useEffect(() => {
    if (pageCount === null)
      return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        setCurrentPageIndex((index) => Math.min(pageCount - 1, index + 1));
      }
      else if (event.key === "ArrowLeft") {
        setCurrentPageIndex((index) => Math.max(0, index - 1));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [pageCount]);

  const onDocumentLoadSuccess = (pdf: PDFDocumentProxy) => {
    setPageCount(pdf.numPages);
    setCurrentPageIndex(Math.min(Math.max(0, currentPageIndex), pdf.numPages - 1));
  }

  return (
    <div>
      <Document
        file={documentURL}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageIndex={currentPageIndex} />
      </Document>
      <div className={css({
        padding: "1em",
        color: "#ffffff",
        backgroundColor: "#000000",
      })}>
        {currentPageIndex + 1} / {pageCount}
      </div>
    </div>
  );
}
