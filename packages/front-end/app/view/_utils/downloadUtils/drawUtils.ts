import { Editor, TLEditorSnapshot } from "tldraw";
import {
  convertBlobToUint8Array,
  exportTldrawEditorAsBlob,
} from "./convertUtils";
import { EditorSnapshot } from "@/PaintPDF/components";
import CleanPainterSnapshot from "@/PaintPDF/assets/data/snapshot.json"

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
  if (Object.keys(records).length <= 2) {
    // If it is empty, it has only two IDs:"document:document & page:page".
    return false;
  }
  editor.loadSnapshot(CleanPainterSnapshot as unknown as EditorSnapshot);
  editor.store.put(
    Object.values(records).filter((e) => {
      e.id !== "document:document" || e.id !== "page:page";
    })
  );
  return true;
};

export const pageEachDrawCallback = async ({
  index,
  checked,
  width,
  height,
  editor,
  snapshots,
}: {
  index: number;
  checked: boolean | undefined;
  width: number;
  height: number;
  editor: Editor | null;
  snapshots: (TLEditorSnapshot | null)[];
}) => {
  if (checked) {
    const snapshot = snapshots[index];
    const flag = setTempEditor(editor, snapshot);
    if (!flag) {
      return null;
    }
    const blob = await exportTldrawEditorAsBlob(editor, [0, 0, width, height]);
    if (blob === null) {
      return null;
    }
    return await convertBlobToUint8Array(blob);
  }
  return null;
};
