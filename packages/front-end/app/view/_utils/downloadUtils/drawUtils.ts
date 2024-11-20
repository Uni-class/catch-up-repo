import { Editor, TLEditorSnapshot, SerializedStore, TLRecord } from "tldraw";
import {
  convertBlobToUint8Array,
  exportTldrawEditorAsBlob,
} from "./convertUtils";
import { NoteAPIResType } from "../../_types/apiType";

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
  Object.keys(snapshot.document.store).forEach((_key) => {
    const key = _key as keyof SerializedStore<TLRecord>;
    snapshot.document.store[key].meta = {};
  });
  editor.loadSnapshot(snapshot);
  return true;
};
/**
 * @deprecated change logic
 */
export const pageEachDrawCallback = async ({
  index,
  checked,
  editor,
  responses,
}: {
  index: number;
  checked: boolean | undefined;
  editor: Editor | null;
  responses: { note: TLEditorSnapshot | null; width: number; height: number }[];
}) => {
  if (checked) {
    const snapshot = responses[index];
    if (!snapshot) {
      return null;
    }
    const flag = setTempEditor(editor, snapshot.note);
    if (!flag) {
      return null;
    }
    const blob = await exportTldrawEditorAsBlob(editor, [
      0,
      0,
      snapshot.width,
      snapshot.height,
    ]);
    if (blob === null) {
      return null;
    }
    return await convertBlobToUint8Array(blob);
  }
  return null;
};

export const getShapes = (snapshots: (NoteAPIResType | null)[]) => {
  const shapes: TLRecord[] = [];
  let width: number = 0;
  let height: number = 0;
  snapshots.forEach((snapshot) => {
    if (snapshot === null) return;
    if (!snapshot.note) return;
    width = snapshot.width;
    height = snapshot.height;
    const records = snapshot.note.document.store;
    Object.values(records).forEach((record) => {
      if (record.id === "document:document" || record.id === "page:page")
        return;
      shapes.push(record);
    });
  });
  return { shapes, width, height };
};

export const convertSnapshotToPNG = async (
  snapshots: (NoteAPIResType | null)[],
  editor: Editor
) => {
  const { shapes, width, height } = getShapes(snapshots);
  if (shapes.length === 0) return null;
  editor.store.put(shapes);
  const blob = await exportTldrawEditorAsBlob(editor, [0, 0, width, height]);
  // delay 200ms
  //await new Promise((resolve) => setTimeout(resolve, 200));
  editor.store.remove(shapes.map((shape) => shape.id));
  if (blob === null) {
    return null;
  }
  return await convertBlobToUint8Array(blob);
};
