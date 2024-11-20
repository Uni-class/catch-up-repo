import { TLEditorSnapshot } from "tldraw";

export interface NoteAPIResType {
    note:TLEditorSnapshot|null;
    width:number;
    height:number;
} 