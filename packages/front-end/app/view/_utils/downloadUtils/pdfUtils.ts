import { PDFDocument, PDFPage } from "pdf-lib";
import { pdfjs } from "react-pdf";
import { TLEditorSnapshot } from "tldraw";

export type PNGType = string | Uint8Array | ArrayBuffer | null;
export const getPDFDocumentProxy = async (
  src: string | URL,
  cMapUrl?: string | undefined,
) => {
  const loadingTask = pdfjs.getDocument({
    url: src,
    cMapUrl: cMapUrl,
    cMapPacked: !!cMapUrl,
  });
  const pdf = await loadingTask.promise;
  return pdf;
};

export const convertPdfDocumentProxyToPdfLib = async (
  pdfDocumentProxy: pdfjs.PDFDocumentProxy,
) => {
  const pdfData = await pdfDocumentProxy.getData();
  const pdfLibDocument = await PDFDocument.load(pdfData);
  return pdfLibDocument;
};

export const drawPNGOnPDFPage = async (
  mergeDoc: PDFDocument,
  mergePage: PDFPage,
  index: number,
  getPageDrawCallback: (index: number) => Promise<(TLEditorSnapshot | null)[]>,
) => {
  const { width, height } = mergePage.getSize();
  const snapshots = await getPageDrawCallback(index);
  // TODO: make a PNGType image from snapshots
  const encodedPNG = convertSnapshotToPNG(snapshots)
  if (encodedPNG === null) return;
  const pngImage = await mergeDoc.embedPng(encodedPNG);
  mergePage.drawImage(pngImage, {
    x: 0,
    y: 0,
    width: width,
    height: height,
  });
};
