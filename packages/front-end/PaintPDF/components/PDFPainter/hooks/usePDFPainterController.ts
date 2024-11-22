import { useState, useMemo, useEffect, useCallback, useRef } from "react";

import { usePDFViewerController } from "../../PDF";

import { ExternalAssetStore } from "../../Painter/types";
import {
  PaintTool,
  EditorSnapshot,
  PDFPainterController,
  PDFPainterControllerHook,
  PaintColor,
} from "../types";

import CleanPainterSnapshot from "../../../assets/data/snapshot.json";
import { usePDFPainterEventHandler } from "./usePDFPainterEventHandler";
import { Editor, DefaultColorStyle, defaultColorNames } from "tldraw";
import { DefaultColorThemePalette } from "@tldraw/tlschema";

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

  const prevPageEventHandle = usePDFPainterEventHandler();
  const currentPageEventHandle = usePDFPainterEventHandler();

  const [currentTool, setCurrentTool] = useState<PaintTool>("text-select");
  const [currentColor, setCurrentColor] = useState<PaintColor>("black");

  const [isInstanceHidden, setIsInstanceHidden] = useState<{
    [key: string]: boolean;
  }>({});

  const editors = useRef<{ [editorId: string]: Editor }>({});

  const currentPageId = useRef<number | null>(null);

  const [autoSaveEnabledState, setAutoSaveEnabledState] = useState(true);

  const isPaintMode = useCallback(() => {
    return currentTool !== "text-select" && currentTool !== "drag";
  }, [currentTool]);

  useEffect(() => {
    Object.values(editors.current).forEach((editor: Editor) => {
      editor.selectNone();
      pdfViewerController.setControlLockEnabled(currentTool !== "drag");
      switch (currentTool) {
        case "text-select":
          break;
        case "drag":
          break;
        case "area-select":
          editor.setCurrentTool("select");
          break;
        case "pen":
          editor.setCurrentTool("draw");
          break;
        case "eraser":
          editor.setCurrentTool("eraser");
          break;
        case "text":
          editor.setCurrentTool("text");
          break;
        default:
          break;
      }
    });
  }, [pdfViewerController, currentTool]);

  useEffect(() => {
    Object.values(editors.current).forEach((editor: Editor) => {
      editor.setStyleForSelectedShapes(DefaultColorStyle, currentColor);
      editor.setStyleForNextShapes(DefaultColorStyle, currentColor);
    });
  }, [currentColor]);

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
    [painterId],
  );

  const getEditorSnapshotFromStorage = useCallback(
    (editorId: string, pageIndex: number): EditorSnapshot | null => {
      const snapshotId = getSnapshotId(editorId, pageIndex);
      const data = localStorage.getItem(snapshotId);
      if (data !== null) {
        try {
          return JSON.parse(data);
        } catch (e) {}
      }
      return null;
    },
    [getSnapshotId],
  );

  const setEditorSnapshotToStorage = useCallback(
    (editorId: string, pageIndex: number, snapshot: EditorSnapshot) => {
      const snapshotId = getSnapshotId(editorId, pageIndex);
      localStorage.setItem(snapshotId, JSON.stringify(snapshot));
    },
    [getSnapshotId],
  );

  const clearEditorSnapshotFromStorage = useCallback(
    (editorId: string, pageIndex: number) => {
      const snapshotId = getSnapshotId(editorId, pageIndex);
      localStorage.removeItem(snapshotId);
    },
    [getSnapshotId],
  );

  const loadEmptySnapshot = useCallback(
    (editorId: string) => {
      const editor = getEditor(editorId);
      if (editor === null) {
        return;
      }
      try {
        editor.loadSnapshot(CleanPainterSnapshot as unknown as EditorSnapshot);
      } catch {}
    },
    [getEditor],
  );

  const loadEditorSnapshot = useCallback(
    (editorId: string, pageIndex: number) => {
      const editor = getEditor(editorId);
      if (editor === null) {
        return;
      }
      const snapshotId = getSnapshotId(editorId, pageIndex);
      const snapShot = getEditorSnapshotFromStorage(editorId, pageIndex);
      editor.store.mergeRemoteChanges(() => {
        if (snapShot === null) {
          loadEmptySnapshot(editorId);
        } else {
          try {
            editor.loadSnapshot(snapShot);
          } catch {
            loadEmptySnapshot(editorId);
          }
        }
      });
    },
    [getEditor, getSnapshotId, getEditorSnapshotFromStorage, loadEmptySnapshot],
  );

  const loadPageSnapshots = useCallback(
    (pageIndex: number) => {
      for (const editorId of Object.keys(editors.current)) {
        loadEditorSnapshot(editorId, pageIndex);
      }
    },
    [loadEditorSnapshot],
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
      } catch {}
    },
    [getEditor, getSnapshotId, setEditorSnapshotToStorage],
  );

  const savePageSnapshots = useCallback(
    (pageIndex: number) => {
      for (const editorId of Object.keys(editors.current)) {
        saveEditorSnapshot(editorId, pageIndex);
      }
    },
    [saveEditorSnapshot],
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
    [loadEditorSnapshot],
  );

  const unregisterEditor = useCallback((editorId: string) => {
    if (editorId in editors.current) {
      delete editors.current[editorId];
    }
  }, []);

  useEffect(() => {
    if (currentPageId.current !== pdfViewerController.getPageIndex()) {
      if (currentPageId.current !== null) {
        prevPageEventHandle.executeAll(currentPageId.current);
        savePageSnapshots(currentPageId.current);
      }
      currentPageId.current = pdfViewerController.getPageIndex();
      currentPageEventHandle.executeAll(currentPageId.current);
      loadPageSnapshots(currentPageId.current);
    }
    return () => {
      // prevPageEventHandle.clear();
      // currentPageEventHandle.clear();
    };
  }, [
    pdfViewerController,
    loadPageSnapshots,
    savePageSnapshots,
    currentPageEventHandle,
    prevPageEventHandle,
  ]);

  useEffect(() => {
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
        },
      );
    }
  }, [pdfViewerController]);

  const getEditorSnapshot = useCallback(
    (editorId: string, pageIndex: number): EditorSnapshot | null => {
      saveEditorSnapshot(editorId, pageIndex);
      return getEditorSnapshotFromStorage(editorId, pageIndex);
    },
    [saveEditorSnapshot, getEditorSnapshotFromStorage],
  );

  const setEditorSnapshot = useCallback(
    (editorId: string, pageIndex: number, snapshot: EditorSnapshot) => {
      setEditorSnapshotToStorage(editorId, pageIndex, snapshot);
      loadEditorSnapshot(editorId, pageIndex);
    },
    [loadEditorSnapshot, setEditorSnapshotToStorage],
  );

  const clearEditorSnapshot = useCallback(
    (editorId: string, pageIndex: number) => {
      clearEditorSnapshotFromStorage(editorId, pageIndex);
      loadEditorSnapshot(editorId, pageIndex);
    },
    [loadEditorSnapshot, clearEditorSnapshotFromStorage],
  );

  const autoSave = useCallback(() => {
    savePageSnapshots(pdfViewerController.getPageIndex());
  }, [pdfViewerController, savePageSnapshots]);

  const isAutoSaveEnabled = useCallback(() => {
    return autoSaveEnabledState;
  }, [autoSaveEnabledState]);

  const setAutoSaveEnabled = useCallback(
    (enabled: boolean) => {
      setAutoSaveEnabledState(enabled);
    },
    [setAutoSaveEnabledState],
  );

  useEffect(() => {
    if (autoSaveEnabledState && currentTool) {
      const interval = setInterval(() => {
        autoSave();
      }, 10000);
      return () => {
        autoSave();
        clearInterval(interval);
      };
    }
  }, [autoSaveEnabledState, currentTool, autoSave]);

  const getInstanceHidden = useCallback(
    (editorId: string) => {
      return !!isInstanceHidden[editorId];
    },
    [isInstanceHidden],
  );

  const setInstanceHidden = useCallback(
    (editorId: string, isHidden: boolean) => {
      setIsInstanceHidden({ ...isInstanceHidden, [editorId]: isHidden });
    },
    [isInstanceHidden],
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
      getCurrentTool: () => {
        return currentTool;
      },
      setCurrentTool: (paintTool: PaintTool) => {
        setCurrentTool(paintTool);
      },
      getCurrentColor: () => {
        return currentColor;
      },
      getCurrentColorValue: () => {
        return DefaultColorThemePalette.lightMode[currentColor].solid;
      },
      setCurrentColor: (paintColor: PaintColor) => {
        setCurrentColor(paintColor);
      },
      getAvailableColors: () => {
        return defaultColorNames.map((colorName: PaintColor) => {
          return {
            name: colorName,
            value: DefaultColorThemePalette.lightMode[colorName].solid,
          };
        });
      },
      isPaintMode: () => {
        return isPaintMode();
      },
      registerEditor: registerEditor,
      unregisterEditor: unregisterEditor,
      getEditor: getEditor,
      getEditorSnapshotFromStorage,
      getEditorSnapshot: getEditorSnapshot,
      setEditorSnapshot: setEditorSnapshot,
      clearEditorSnapshot: clearEditorSnapshot,
      isAutoSaveEnabled: isAutoSaveEnabled,
      setAutoSaveEnabled: setAutoSaveEnabled,
      getInstanceHidden,
      setInstanceHidden,
      isIdEnsureVisibleWhileDraw,
      addIdEnsureVisibleWhileDraw,
      deleteIdEnsureVisibleWhileDraw,
      addPrevPageEventListener: prevPageEventHandle.listen,
      addCurrentPageEventListener: currentPageEventHandle.listen,
    };
  }, [
    pdfViewerController,
    isPaintMode,
    registerEditor,
    unregisterEditor,
    getEditor,
    getEditorSnapshotFromStorage,
    getEditorSnapshot,
    setEditorSnapshot,
    clearEditorSnapshot,
    isAutoSaveEnabled,
    setAutoSaveEnabled,
    getInstanceHidden,
    setInstanceHidden,
    isIdEnsureVisibleWhileDraw,
    addIdEnsureVisibleWhileDraw,
    deleteIdEnsureVisibleWhileDraw,
    prevPageEventHandle.listen,
    currentPageEventHandle.listen,
    currentTool,
    currentColor,
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
