export const getUint8ArrayURL = (file: Uint8Array) => {
  const blob = new Blob([file], { type: "application/pdf" });
  return URL.createObjectURL(blob);
};

export const downloadPDF = (pdfData: Uint8Array, fileName: string) => {
  const url = getUint8ArrayURL(pdfData);
  // make dummy <a/> & action
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  // clean-up
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
