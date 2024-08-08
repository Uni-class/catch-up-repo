import { useEffect, useState, useRef } from "react";
import { pdfjs } from "react-pdf";
import { Document, Page } from "react-pdf";
import { css } from "@/styled-system/css";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { useResizeObserver } from 'usehooks-ts';


pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;


export default function PDFViewer({ documentURL, defaultPageIndex = 0 }: { documentURL: string, defaultPageIndex?: number }) {
  const documentRef = useRef(null)
  const { width = 0, height = 0 } = useResizeObserver({
    ref: documentRef,
    box: "border-box",
  });

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

  const onDocumentLoadSuccess = (pdf: pdfjs.PDFDocumentProxy) => {
    setPageCount(pdf.numPages);
    setCurrentPageIndex(Math.min(Math.max(0, currentPageIndex), pdf.numPages - 1));
  }

  return (
    <div
      ref={documentRef}
      className={css({
        position: "relative",
        width: "100%",
      })}
    >
      <Document
        file={documentURL}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page width={width} pageIndex={currentPageIndex} />
      </Document>
      <div className={css({
        position: "sticky",
        bottom: "0",
        left: "0",
        display: "flex",
        padding: "1em",
        color: "#ffffff",
        backgroundColor: "#000000",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2,
      })}>
        {currentPageIndex + 1} / {pageCount}
      </div>
    </div>
  );
}