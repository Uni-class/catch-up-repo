import { useEffect, useState } from "react";
import "../_util/pdfWorkerPolyfill";
import { pdfjs } from "react-pdf";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export default function PDFViewer() {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  useEffect(() => {
    if (numPages === null) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        setPageNumber((pageNumber) =>
          pageNumber < numPages ? pageNumber + 1 : pageNumber
        );
      } else if (event.key === "ArrowLeft") {
        setPageNumber((pageNumber) =>
          pageNumber - 1 > 0 ? pageNumber - 1 : pageNumber
        );
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [numPages]);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }
  return (
    <div>
      <Document
        file="https://catch-up-dev-s3.s3.ap-northeast-2.amazonaws.com/1722418206623-[9-2] Index.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
}
