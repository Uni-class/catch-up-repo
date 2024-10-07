import { openDB } from "idb";

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
  await store.put({
    sessionId,
    fileId,
    pageIndex,
    instanceId,
    notes,
  });
  await tx.done;
};

export const getPageNoteDB = async (
  sessionId: number,
  fileId: number,
  pageIndex: number,
  instanceId: string
) => {
  const db = await initDB();
  const tx = db.transaction("notes", "readonly");
  const store = tx.objectStore("notes");
  const data = await store.get([sessionId, fileId, instanceId, pageIndex]);
  return data ? data.notes : null;
};
