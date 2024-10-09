import { Box, Editor, exportToBlob, RecordId, TLEditorSnapshot } from "tldraw";


export const exportTldrawEditorAsBlob = async (
  editor: Editor | null,
  boxOpts: [X: number, Y: number, W: number, H: number]
) => {
  if (editor === null) {
    console.error("editor is null.");
    return null;
  }
  const ids = Array.from(editor.getCurrentPageShapeIds().values());
  
  if (ids.length === 0) {
    return null;
  }
  const bounds = new Box(...boxOpts);
  return await exportToBlob({
    editor,
    ids,
    format: "png",
    opts: {
      padding: 0,
      bounds: bounds,
    },
  });
};

export const convertBlobToUint8Array = async (blob: Blob) => {
  try {
    return new Promise<Uint8Array>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () =>
        resolve(new Uint8Array(reader.result as ArrayBuffer));
      reader.onerror = () => reject(new Error("Uint8Array 변환 오류"));
      reader.readAsArrayBuffer(blob);
    });
  } catch (error) {
    throw new Error("Base64 인코딩 오류: " + error);
  }
};
