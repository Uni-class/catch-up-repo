import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { Editor } from "tldraw";
import { usePDFViewerController } from "../../PDF";

import { ExternalAssetStore } from "../../Painter/types";
import {
  PaintMode,
  EditorSnapshot,
  PDFPainterController,
  PDFPainterControllerHook,
} from "../types";

import CleanPainterSnapshot from "../../../assets/data/snapshot.json";

export const usePDFPainterController = ({
  painterId,
  externalAssetStore = null,
}: {
  painterId: string;
  externalAssetStore?: ExternalAssetStore | null;
}): PDFPainterControllerHook => {
  const {
    pdfViewerController,
    onPdfDocumentChange,
    onPdfPageChange,
    onPdfItemClick,
    onPdfMouseMoveEvent,
    onPdfWheelEvent,
  } = usePDFViewerController();

  const [paintMode, setPaintMode] = useState<PaintMode>("default");

  const [isInstanceHidden, setIsInstanceHidden] = useState<{
    [key: string]: boolean;
  }>({});

  const editors = useRef<{ [editorId: string]: Editor }>({});

  const currentPageId = useRef<number | null>(null);

  useEffect(() => {
    pdfViewerController.setDragModeEnabled(paintMode === "move");
    Object.values(editors.current).forEach((editor: Editor) => {
      editor.selectNone();
    });
  }, [pdfViewerController, paintMode]);

  const getEditor = useCallback((editorId: string): Editor | null => {
    if (editorId in editors.current) {
      return editors.current[editorId];
    }
    return null;
  }, []);

  const getSnapshotId = useCallback(
    (editorId: string, pdfPageIndex: number) => {
      return `${painterId}_${editorId}_${pdfPageIndex}`;
    },
    [painterId]
  );

  const getEditorSnapshotFromStorage = useCallback(
    (editorId: string, pageIndex: number): EditorSnapshot | null => {
      const snapshotId = getSnapshotId(editorId, pageIndex);
      console.log(
        `[Editor: ${editorId} - Page: ${pageIndex}] Get Editor Snapshot: ${snapshotId}`
      );
      const data = localStorage.getItem(snapshotId);
      if (data !== null) {
        try {
          return JSON.parse(data);
        } catch (e) {
          console.log(
            `[Editor: ${editorId} - Page: ${pageIndex}] Invalid Snapshot: ${snapshotId}`
          );
          console.log(e);
        }
      }
      return null;
    },
    [getSnapshotId]
  );

  const setEditorSnapshotToStorage = useCallback(
    (editorId: string, pageIndex: number, snapshot: EditorSnapshot) => {
      const snapshotId = getSnapshotId(editorId, pageIndex);
      console.log(
        `[Editor: ${editorId} - Page: ${pageIndex}] Set Editor Snapshot: ${snapshotId}`
      );
      localStorage.setItem(snapshotId, JSON.stringify(snapshot));
    },
    [getSnapshotId]
  );

  const clearEditorSnapshotFromStorage = useCallback(
    (editorId: string, pageIndex: number) => {
      const snapshotId = getSnapshotId(editorId, pageIndex);
      console.log(
        `[Editor: ${editorId} - Page: ${pageIndex}] Clear Editor Snapshot: ${snapshotId}`
      );
      localStorage.removeItem(snapshotId);
    },
    [getSnapshotId]
  );

  const loadEmptySnapshot = useCallback(
    (editorId: string) => {
      const editor = getEditor(editorId);
      if (editor === null) {
        return;
      }
      console.log(`[Editor: ${editorId}] Load empty snapshot.`);
      try {
        editor.loadSnapshot(CleanPainterSnapshot as unknown as EditorSnapshot);
      } catch {
        console.log(`[Editor: ${editorId}] Unable to load empty snapshot.`);
      }
    },
    [getEditor]
  );

  const loadEditorSnapshot = useCallback(
    (editorId: string, pageIndex: number) => {
      const editor = getEditor(editorId);
      if (editor === null) {
        return;
      }
      const snapshotId = getSnapshotId(editorId, pageIndex);
      console.log(
        `[Editor: ${editorId} - Page: ${pageIndex}] Load snapshot: ${snapshotId}`
      );
      const snapShot = getEditorSnapshotFromStorage(editorId, pageIndex);
      editor.store.mergeRemoteChanges(() => {
        if (snapShot === null) {
          console.log(
            `[Editor: ${editorId} - Page: ${pageIndex}] Snapshot not found: ${snapshotId}`
          );
          loadEmptySnapshot(editorId);
        } else {
          try {
            editor.loadSnapshot(snapShot);
          } catch {
            console.log(
              `[Editor: ${editorId} - Page: ${pageIndex}] Unable to load snapshot: ${snapshotId}`
            );
            loadEmptySnapshot(editorId);
          }
        }
      });
    },
    [getEditor, getSnapshotId, getEditorSnapshotFromStorage, loadEmptySnapshot]
  );

  const loadPageSnapshots = useCallback(
    (pageIndex: number) => {
      for (const editorId of Object.keys(editors.current)) {
        loadEditorSnapshot(editorId, pageIndex);
      }
    },
    [loadEditorSnapshot]
  );

  const saveEditorSnapshot = useCallback(
    (editorId: string, pageIndex: number) => {
      const editor = getEditor(editorId);
      if (editor === null) {
        return;
      }
      const snapshotId = getSnapshotId(editorId, pageIndex);
      try {
        editor.selectNone();
        setEditorSnapshotToStorage(editorId, pageIndex, editor.getSnapshot());
      } catch {
        console.log(
          `[Editor: ${editorId} - Page: ${pageIndex}] Unable to save snapshot: ${snapshotId}`
        );
      }
    },
    [getEditor, getSnapshotId, setEditorSnapshotToStorage]
  );

  const savePageSnapshots = useCallback(
    (pageIndex: number) => {
      for (const editorId of Object.keys(editors.current)) {
        saveEditorSnapshot(editorId, pageIndex);
      }
    },
    [saveEditorSnapshot]
  );

  const registerEditor = useCallback(
    (editorId: string, editor: Editor) => {
      editor.updateInstanceState({
        isDebugMode: false,
      });
      editor.setCameraOptions({
        isLocked: true,
      });
      if (editorId in editors.current) {
        editors.current[editorId] = editor;
      } else {
        editors.current[editorId] = editor;
        if (currentPageId.current !== null) {
          loadEditorSnapshot(editorId, currentPageId.current);
        }
      }
    },
    [loadEditorSnapshot]
  );

  const unregisterEditor = useCallback((editorId: string) => {
    if (editorId in editors.current) {
      delete editors.current[editorId];
    }
  }, []);

  useEffect(() => {
    if (currentPageId.current !== pdfViewerController.getPageIndex()) {
      if (currentPageId.current !== null) {
        savePageSnapshots(currentPageId.current);
      }
      currentPageId.current = pdfViewerController.getPageIndex();
      loadPageSnapshots(currentPageId.current);
    }
  }, [pdfViewerController, loadPageSnapshots, savePageSnapshots]);

  useEffect(() => {
    console.log("Update Camera");
    const { width, height, baseX, baseY, scale } =
      pdfViewerController.getRenderOptions();
    const pdfRenderScaleX =
      width / (pdfViewerController.getPage()?.originalWidth || 0) || 1;
    const pdfRenderScaleY =
      height / (pdfViewerController.getPage()?.originalHeight || 0) || 1;
    const pdfRenderScale = (pdfRenderScaleX + pdfRenderScaleY) / 2;
    for (const editor of Object.values(editors.current)) {
      editor.setCamera(
        {
          x: -baseX / pdfRenderScale,
          y: -baseY / pdfRenderScale,
          z: scale * pdfRenderScale,
        },
        {
          force: true,
        }
      );
    }
  }, [pdfViewerController]);

  const getEditorSnapshot = useCallback(
    (editorId: string, pageIndex: number): EditorSnapshot | null => {
      saveEditorSnapshot(editorId, pageIndex);
      return getEditorSnapshotFromStorage(editorId, pageIndex);
    },
    [saveEditorSnapshot, getEditorSnapshotFromStorage]
  );

  const setEditorSnapshot = useCallback(
    (editorId: string, pageIndex: number, snapshot: EditorSnapshot) => {
      setEditorSnapshotToStorage(editorId, pageIndex, snapshot);
      loadEditorSnapshot(editorId, pageIndex);
    },
    [loadEditorSnapshot, setEditorSnapshotToStorage]
  );

  const clearEditorSnapshot = useCallback(
    (editorId: string, pageIndex: number) => {
      clearEditorSnapshotFromStorage(editorId, pageIndex);
      loadEditorSnapshot(editorId, pageIndex);
    },
    [loadEditorSnapshot, clearEditorSnapshotFromStorage]
  );

  const getInstanceHidden = useCallback(
    (editorId: string) => {
      return !!isInstanceHidden[editorId];
    },
    [isInstanceHidden]
  );

  const setInstanceHidden = useCallback(
    (editorId: string, isHidden: boolean) => {
      setIsInstanceHidden({ ...isInstanceHidden, [editorId]: isHidden });
    },
    [isInstanceHidden]
  );

  const ensureVisibleWhileDrawRef = useRef<Set<string>>(new Set());

  const isIdEnsureVisibleWhileDraw = useCallback((editorId: string) => {
    return ensureVisibleWhileDrawRef.current.has(editorId);
  }, []);

  const addIdEnsureVisibleWhileDraw = useCallback((editorId: string) => {
    ensureVisibleWhileDrawRef.current.add(editorId);
  }, []);

  const deleteIdEnsureVisibleWhileDraw = useCallback((editorId: string) => {
    ensureVisibleWhileDrawRef.current.delete(editorId);
  }, []);

  const pdfPainterController: PDFPainterController = useMemo(() => {
    return {
      ...pdfViewerController,
      getPaintMode: () => {
        return paintMode;
      },
      setPaintMode: (paintMode: PaintMode) => {
        setPaintMode(paintMode);
      },
      registerEditor: registerEditor,
      unregisterEditor: unregisterEditor,
      getEditor: getEditor,
      getEditorSnapshot: getEditorSnapshot,
      setEditorSnapshot: setEditorSnapshot,
      clearEditorSnapshot: clearEditorSnapshot,
      getInstanceHidden,
      setInstanceHidden,
      isIdEnsureVisibleWhileDraw,
      addIdEnsureVisibleWhileDraw,
      deleteIdEnsureVisibleWhileDraw,
    };
  }, [
    pdfViewerController,
    registerEditor,
    unregisterEditor,
    getEditor,
    getEditorSnapshot,
    setEditorSnapshot,
    clearEditorSnapshot,
    getInstanceHidden,
    setInstanceHidden,
    isIdEnsureVisibleWhileDraw,
    addIdEnsureVisibleWhileDraw,
    deleteIdEnsureVisibleWhileDraw,
    paintMode,
  ]);

  return {
    pdfPainterController: pdfPainterController,
    onPdfDocumentChange: onPdfDocumentChange,
    onPdfPageChange: onPdfPageChange,
    onPdfItemClick: onPdfItemClick,
    onPdfMouseMoveEvent: onPdfMouseMoveEvent,
    onPdfWheelEvent: onPdfWheelEvent,
    externalAssetStore: externalAssetStore,
  };
};
