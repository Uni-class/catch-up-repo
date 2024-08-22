import { useEffect, useState } from "react";
import { pdfjs } from "react-pdf";
import { Document, Page } from "react-pdf";
import { css } from "@/styled-system/css";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { useSetSize } from "../hooks/useSetSize";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

/**
* Warning: 레거시 PDF에만 적용돠는 옵션
* PDF 1.3이전 한글 문서에 필요하지만 어떤 문제가 발생할지 모름
* 
* [참고 링크 1: stack overflow](https://stackoverflow.com/questions/32764773/what-is-a-pdf-bcmap-file)
* 
* [참고 링크 2: 관련 github 이슈](https://github.com/huridocs/uwazi/issues/3723)
*/
const cmapOption = {
  cMapUrl: `//unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
  cMapPacked: true,
};

export default function PDFViewer({
  documentURL,
  defaultPageIndex = 0,

}: {
  documentURL: string;
  defaultPageIndex?: number;
}) {
  const { containerRef, pageWidth, pageHeight, onPageLoadSuccess } =
    useSetSize();

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
          overflow: "hidden",
        })}
      >
        <Document
          file={documentURL}
          onLoadSuccess={onDocumentLoadSuccess}
          options={cmapOption} // JSDocs
        >
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
