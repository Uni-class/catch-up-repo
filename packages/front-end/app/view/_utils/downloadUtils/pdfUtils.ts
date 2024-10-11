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
