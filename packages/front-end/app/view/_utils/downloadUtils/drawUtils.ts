import { Editor, TLEditorSnapshot,SerializedStore, TLRecord } from "tldraw";
import {
  convertBlobToUint8Array,
  exportTldrawEditorAsBlob,
} from "./convertUtils";
import { EditorSnapshot } from "@/PaintPDF/components";
import CleanPainterSnapshot from "@/PaintPDF/assets/data/snapshot.json";

export const setTempEditor = (
  editor: Editor | null,
  snapshot: TLEditorSnapshot | null
) => {
  if (editor === null) {
    console.error("editor is null.");
    return false;
  }
  if (snapshot === null) {
    // Error while server req & res
    return false;
  }
  const records = snapshot.document.store;
  if (Object.keys(records).length <= 2) {
    // If it is empty, it has only two IDs:"document:document & page:page".
    return false;
  }
  Object.keys(snapshot.document.store).forEach((_key)=>{
    const key = _key as keyof SerializedStore<TLRecord>
    snapshot.document.store[key].meta = {};
  })
  editor.loadSnapshot(snapshot);
  return true;
};

export const pageEachDrawCallback = async ({
  index,
  checked,
  editor,
  responses,
}: {
  index: number;
  checked: boolean | undefined;
  editor: Editor | null;
  responses: {note:(TLEditorSnapshot | null),width:number,height:number}[];
}) => {
  if (checked) {
    const snapshot = responses[index];
    const flag = setTempEditor(editor, snapshot.note);
    if (!flag) {
      return null;
    }
    const blob = await exportTldrawEditorAsBlob(editor, [0, 0, snapshot.width, snapshot.height]);
    if (blob === null) {
      return null;
    }
    return await convertBlobToUint8Array(blob);
  }
  return null;
};
