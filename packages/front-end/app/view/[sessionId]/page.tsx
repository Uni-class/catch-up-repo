"use client";

import "./_util/pdfWorkerPolyfill";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export default function Page() {
  return <>lkj</>;
}
