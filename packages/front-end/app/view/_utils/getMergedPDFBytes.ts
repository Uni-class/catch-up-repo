import { PDFDocument } from "pdf-lib";
import {
  convertPdfDocumentProxyToPdfLib,
  drawPNGOnPDFPage,
  getPDFDocumentProxy,
  PNGType,
} from "./pdfUtils";

export const getMergedPDFBytes = async (
  src: string | URL,
  getPageDrawCallback: (index: number) => Promise<PNGType[]>,
  cMapUrl?: string | undefined
): Promise<Uint8Array> => {
  const originalDocProxy = await getPDFDocumentProxy(src, cMapUrl);
  const originalDoc = await convertPdfDocumentProxyToPdfLib(originalDocProxy);
  const mergeDoc = await PDFDocument.create();
  const mergePages = await mergeDoc.copyPages(
    originalDoc,
    originalDoc.getPageIndices()
  );
  mergePages.forEach((mergePage) => {
    mergeDoc.addPage(mergePage);
  });

  for (let i = 0; i < mergePages.length; i++) {
    await drawPNGOnPDFPage(mergeDoc, mergePages[i], i, getPageDrawCallback);
  }

  const encodedPDF = await mergeDoc.save();

  return encodedPDF;
};
