import { PDFDocument, PDFPage } from "pdf-lib";
import { getDocument, PDFDocumentProxy } from "pdfjs-dist";

export type PNGType = string | Uint8Array | ArrayBuffer | null;
export const getPDFDocumentProxy = async (
  src: string | URL,
  cMapUrl?: string | undefined
) => {
  const loadingTask = getDocument({
    url: src,
    cMapUrl: cMapUrl,
    cMapPacked: !!cMapUrl,
  });
  const pdf = await loadingTask.promise;
  return pdf;
};

export const convertPdfDocumentProxyToPdfLib = async (
  pdfDocumentProxy: PDFDocumentProxy
) => {
  const pdfData = await pdfDocumentProxy.getData();
  const pdfLibDocument = await PDFDocument.load(pdfData);
  return pdfLibDocument;
};

export const drawPNGOnPDFPage = async (
  mergeDoc: PDFDocument,
  mergePage: PDFPage,
  index: number,
  getPageDrawCallback: (index: number) => Promise<PNGType[] | null>
) => {
  const { width, height } = mergePage.getSize();
  const encodedPNGs = await getPageDrawCallback(index);
  if (encodedPNGs === null) {
    return;
  }
  const drawPromises = encodedPNGs.map(async (encodedPNG) => {
    if (encodedPNG === null) return;
    const pngImage = await mergeDoc.embedPng(encodedPNG);
    mergePage.drawImage(pngImage, {
      x: 0,
      y: 0,
      width: width,
      height: height,
    });
  });
  Promise.all(drawPromises);
};

export const getPdfPageSize = async (
  pdfUrl: string | URL
): Promise<{ width: number; height: number }[]> => {
  // PDF를 로드합니다.
  const loadingTask = getDocument(pdfUrl);
  const pdf: PDFDocumentProxy = await loadingTask.promise;

  // 모든 페이지의 크기를 가져옵니다.
  const pageSizes: { width: number; height: number }[] = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 1 }); // scale은 1로 설정하여 원본 크기를 가져옵니다.
    pageSizes.push({
      width: viewport.width,
      height: viewport.height,
    });
  }

  return pageSizes;
};
