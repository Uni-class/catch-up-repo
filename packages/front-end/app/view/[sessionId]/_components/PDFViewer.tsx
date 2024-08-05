import { useEffect, useState } from "react";
import { pdfjs } from "react-pdf";
import { Document, Page } from "react-pdf";
import { PDFDocumentProxy } from "pdfjs-dist/types/src/pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   "pdfjs-dist/build/pdf.worker.min.mjs",
//   import.meta.url
// ).toString();
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PDFViewer() {
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(1);


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

  const onDocumentLoadSuccess = (pdf: PDFDocumentProxy) => {
    setPageCount(pdf.numPages);
  }

  return (
    <div>
      <Document
        file="https://catch-up-dev-s3.s3.ap-northeast-2.amazonaws.com/1722418206623-[9-2] Index.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageIndex={currentPageIndex} />
      </Document>
      <p>
        Page {currentPageIndex} of {pageCount}
      </p>
    </div>
  );
}
