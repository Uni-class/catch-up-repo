import { useMemo, useCallback } from "react";

import {
	EditorSnapshot,
	PainterShape,
	PainterShapeId,
	PDFPainterController,
	PDFPainterInstanceController,
	PDFPainterInstanceControllerHook,
	PDFPainterInstanceStoreUpdateHandler,
} from "../types";
import { Editor } from "tldraw";

export const usePDFPainterInstanceController = ({
	editorId,
	pdfPainterController,
	onStoreUpdate = () => {},
}: {
	editorId: string;
	pdfPainterController: PDFPainterController;
	onStoreUpdate?: PDFPainterInstanceStoreUpdateHandler;
}): PDFPainterInstanceControllerHook => {
	const onEditorLoad = useCallback(
		(editor: Editor) => {
			pdfPainterController.registerEditor(editorId, editor);
			editor.store.listen(({ changes }) => onStoreUpdate(changes), { source: "user", scope: "document" });
		},
		[editorId, pdfPainterController, onStoreUpdate],
	);

	const pdfPainterInstanceController: PDFPainterInstanceController = useMemo(() => {
		return {
			getEditor: () => pdfPainterController.getEditor(editorId),
			getEditorSnapshot: (pageIndex: number) => pdfPainterController.getEditorSnapshot(editorId, pageIndex),
			setEditorSnapshot: (pageIndex: number, snapshot: EditorSnapshot) => pdfPainterController.setEditorSnapshot(editorId, pageIndex, snapshot),
			clearEditorSnapshot: (pageIndex: number) => pdfPainterController.clearEditorSnapshot(editorId, pageIndex),
			getPaintElement: (elementId: PainterShapeId) => {
				const editor = pdfPainterController.getEditor(editorId);
				if (editor === null) {
					return null;
				}
				if (editor.store.has(elementId)) {
					return editor.store.get(elementId) as PainterShape;
				}
				return null;
			},
			setPaintElement: (elementId: PainterShapeId | null, elementData?: PainterShape) => {
				const editor = pdfPainterController.getEditor(editorId);
				if (editor === null) {
					return;
				}
				if (elementId === null) {
					if (elementData) {
						editor.store.put([elementData]);
					}
				} else if (editor.store.has(elementId)) {
					if (elementData) {
						editor.store.update(elementId, () => elementData);
					} else {
						editor.store.remove([elementId]);
					}
				}
			},
			updatePaintElementByGenerator: (elementId: PainterShapeId, elementGenerator: (previousElementData: PainterShape) => PainterShape) => {
				const editor = pdfPainterController.getEditor(editorId);
				if (editor === null) {
					return;
				}
				if (editor.store.has(elementId)) {
					editor.store.update(elementId, elementGenerator);
				}
			},
		};
	}, [editorId, pdfPainterController]);

	return {
		pdfPainterInstanceController: pdfPainterInstanceController,
		onEditorLoad: onEditorLoad,
	};
};
