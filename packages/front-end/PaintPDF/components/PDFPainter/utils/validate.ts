import { TLEditorSnapshot } from "tldraw";
/**
 * 
 * If the snapshot is empty, it just has "document:document" and "page:page".
 * 
 */
export const isEmptySnapshot = (snapshot:TLEditorSnapshot) => {
    return (Object.keys(snapshot.document.store).length <= 2)
}