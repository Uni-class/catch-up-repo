import { apiClient } from "@/utils/axios";
import {
  Box,
  Editor,
  exportToBlob,
  TLEditorSnapshot,
} from "tldraw";

export const getSelfDrawFromServer = async (
  pageCount: number,
  sessionId: number,
  fileId: number
) => {
  const promises = [];
  for (let i = 0; i < pageCount; i++) {
    promises.push(
      apiClient.get<TLEditorSnapshot>(
        `/user/session/${sessionId}/file/${fileId}/note/${i}`
      )
    );
  }
  const results = await Promise.allSettled(promises);
  const finalResult: (TLEditorSnapshot | null)[] = [];
  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      finalResult.push(result.value.data);
    } else {
      finalResult.push(null);
    }
  });
  return finalResult;
};

export const setTempEditor = (
  editor: Editor | null,
  snapshots: TLEditorSnapshot | null
) => {
  if (editor === null) {
    console.error("editor is null.");
    return false;
  }
  if (snapshots === null) {
    // Error while server req & res
    return false;
  }
  const records = snapshots.document.store;
  if (Object.keys(records).length === 2) {
    // If it is empty, it has only two IDs:"document:document & page:page".
    return false;
  }
  editor.store.clear();
  editor.store.put(Object.values(records));
  return true;
};
export const exportTldrawEditorAsBlob = async (
  editor: Editor | null,
  boxOpts: [X: number, Y: number, W: number, H: number]
) => {
  if (editor === null) {
    console.error("editor is null.");
    return null;
  }
  const ids = Array.from(editor.getCurrentPageShapeIds().values());
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
