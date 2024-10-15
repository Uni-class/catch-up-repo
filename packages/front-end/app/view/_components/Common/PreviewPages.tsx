import { PDFPainterController } from "@/PaintPDF/components";
import { css } from "@/styled-system/css";
import { MouseEventHandler, ReactNode } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import Placeholder from "@/components/Placeholder/Placeholder";
import PlaceholderLayout from "@/components/Placeholder/PlaceholderLayout";

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
  getBadgeContent: (index?: number) => ReactNode;
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
        loading={
          <PlaceholderLayout
            width={160}
            type={"vertical"}
            gap={"1em"}
            alignItems={"flex-start"}
          >
            <Placeholder width={160} height={90} type={"box"} />
            <Placeholder width={160} height={90} type={"box"} />
            <Placeholder width={160} height={90} type={"box"} />
            <Placeholder width={160} height={90} type={"box"} />
            <Placeholder width={160} height={90} type={"box"} />
          </PlaceholderLayout>
        }
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
            width={160}
            height={90}
            index={index}
            onClick={() => {
              PDFPainterController.setPageIndex(index);
            }}
            currentIndex={currentPageIndex}
            isBadgeVisible={getBadgeVisible(index)}
            badgeContent={getBadgeVisible(index) && getBadgeContent(index)}
          />
        ))}
      </Document>
    </div>
  );
}

function PageElement({
  width,
  height,
  index,
  onClick,
  currentIndex,
  isBadgeVisible = false,
  badgeContent,
}: {
  width: number;
  height: number;
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
          loading={
            <PlaceholderLayout
              padding={"0.3em"}
              height={height}
              type={"vertical"}
              gap={"0.5em"}
              alignItems={"flex-start"}
            >
              <Placeholder
                width={width / 2}
                type={"text"}
                lineCount={1}
                lineHeight={"1em"}
                lineGap={0}
              />
              <Placeholder
                width={width}
                height={"100%"}
                type={"text"}
                lineCount={4}
                lineHeight={"0.7em"}
                lineGap={0}
              />
            </PlaceholderLayout>
          }
          pageNumber={index + 1}
          width={width}
          height={height}
          renderTextLayer={false}
          renderAnnotationLayer={false}
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
