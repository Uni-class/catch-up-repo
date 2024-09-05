import { Editor, TLEditorSnapshot, IdOf, TLRecord } from "tldraw";

import { PDFDocument, PDFItemClickHandlerArguments, PDFPage, PDFViewerController } from "../../PDF/types";
import { ExternalAssetStore } from "../../Painter/types";

export type PaintMode = "default" | "move" | "draw";

export type EditorSnapshot = TLEditorSnapshot;

export type PainterShapeId = IdOf<TLRecord>;

export type PainterShape = TLRecord;

export type PDFPainterController = {
	getPaintMode: () => PaintMode;
	setPaintMode: (paintMode: PaintMode) => void;
	registerEditor: (editorId: string, editor: Editor) => void;
	unregisterEditor: (editorId: string) => void;
	getEditor: (editorId: string) => Editor | null;
	getEditorSnapshot: (editorId: string, pageIndex: number) => EditorSnapshot | null;
	setEditorSnapshot: (editorId: string, pageIndex: number, snapshot: EditorSnapshot) => void;
	clearEditorSnapshot: (editorId: string, pageIndex: number) => void;
} & PDFViewerController;

export type PDFPainterControllerHook = {
	pdfPainterController: PDFPainterController;
	onPdfDocumentChange: (pdfDocument: PDFDocument | null) => void;
	onPdfPageChange: (pdfPage: PDFPage | null) => void;
	onPdfItemClick: ({ pageIndex, destination }: PDFItemClickHandlerArguments) => void;
	onPdfMouseMoveEvent: (event: MouseEvent) => void;
	onPdfWheelEvent: (event: WheelEvent) => void;
	externalAssetStore: ExternalAssetStore | null;
};

export type PDFPainterInstanceController = {
	getEditor: () => Editor | null;
	getEditorSnapshot: (pageIndex: number) => EditorSnapshot | null;
	setEditorSnapshot: (pageIndex: number, snapshot: EditorSnapshot) => void;
	clearEditorSnapshot: (pageIndex: number) => void;
	getPaintElement: (elementId: PainterShapeId) => PainterShape | null;
	addPaintElement: (elementData: PainterShape[]) => void;
	updatePaintElement: (elementId: PainterShapeId, elementData: PainterShape) => void;
	removePaintElement: (elementIds: PainterShapeId[]) => void;
	updatePaintElementByGenerator: (elementId: PainterShapeId, elementGenerator: (previousElementData: PainterShape) => PainterShape) => void;
};

export type PDFPainterInstanceControllerHook = {
	pdfPainterInstanceController: PDFPainterInstanceController;
	onEditorLoad: (editor: Editor) => void;
};

export type PDFPainterInstanceStoreUpdateHandler = (changes: { added?: any; updated?: any; removed?: any }) => void;
