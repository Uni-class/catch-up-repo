import { openDB } from "idb";

export interface NoteType {
  sessionId: number;
  fileId: number;
  instanceId: string;
  pageIndex: number;
  notes: unknown;
}

const ids = ["sessionId", "fileId", "instanceId", "pageIndex"];
export const initDB = async () => {
  return await openDB("Catchup-DB", 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("notes")) {
        const store = db.createObjectStore("notes", { keyPath: ids });
        ids.forEach((id) => {
          store.createIndex(`${id}-index`, id);
        });
      }
    },
  });
};

export const saveNoteDB = async (
  sessionId: number,
  fileId: number,
  pageIndex: number,
  instanceId: string,
  notes: unknown
) => {
  const db = await initDB();
  const tx = db.transaction("notes", "readwrite");
  const store = tx.objectStore("notes");
  const data: NoteType = {
    sessionId,
    fileId,
    pageIndex,
    instanceId,
    notes,
  };
  await store.put(data);
  await tx.done;
};

export const getPageNoteDB = async (
  sessionId: number,
  fileId: number,
  pageIndex: number,
  instanceId: string
): Promise<null | unknown> => {
  const db = await initDB();
  const tx = db.transaction("notes", "readonly");
  const store = tx.objectStore("notes");
  const data = (await store.get([
    sessionId,
    fileId,
    instanceId,
    pageIndex,
  ])) as NoteType;
  return data ? data.notes : null;
};
