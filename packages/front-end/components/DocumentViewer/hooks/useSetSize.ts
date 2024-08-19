import { useCallback, useEffect, useRef, useState } from "react";
import { useResizeObserver } from "usehooks-ts";
import { pdfjs } from "react-pdf";

export const useSetSize = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pageWidth, setPageWidth] = useState(0);
  const [pageHeight, setPageHeight] = useState(0);
  const [pageOriginalWidth, setPageOriginalWidth] = useState<null | number>(
    null
  );
  const [pageOriginalHeight, setPageOriginalHeight] = useState<null | number>(
    null
  );

  const handleResize = useCallback(
    (size: { width: number | undefined; height: number | undefined }) => {
      const { width, height } = size;
      if (width === undefined || height === undefined) return;
      if (pageOriginalHeight === null || pageOriginalWidth === null) return;
      const aspectRatio = pageOriginalHeight / pageOriginalWidth;
      const sizeRefFromWidth = { width: width, height: width * aspectRatio };
      const sizeRefFromHeight = { width: height / aspectRatio, height: height };
      if (sizeRefFromWidth.height > sizeRefFromHeight.height) {
        setPageWidth(sizeRefFromHeight.width);
        setPageHeight(sizeRefFromHeight.height);
      } else {
        setPageWidth(sizeRefFromWidth.width);
        setPageHeight(sizeRefFromWidth.height);
      }
    },
    [pageOriginalHeight, pageOriginalWidth]
  );

  const onPageLoadSuccess = (
    page: {
      width: number;
      height: number;
      originalWidth: number | null;
      originalHeight: number | null;
    } & pdfjs.PDFPageProxy
  ) => {
    setPageOriginalWidth(page.originalWidth);
    setPageOriginalHeight(page.originalHeight);
  };

  useEffect(() => {
    const handleResizeEvent = () => {
      if (containerRef.current === null) return;
      const size = containerRef.current.getBoundingClientRect();
      handleResize(size);
    };
    handleResizeEvent();
    window.addEventListener("resize", handleResizeEvent);
    return () => window.removeEventListener("resize", handleResizeEvent);
  }, [handleResize]);

  return { containerRef, pageWidth, pageHeight, onPageLoadSuccess };
};
