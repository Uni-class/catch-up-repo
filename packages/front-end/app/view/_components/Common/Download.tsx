import Button from "@/components/Button";
import { ModeControl } from "./Mode";
import { css } from "@/styled-system/css";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Editor, Tldraw, useEditor } from "tldraw";
import { PDFPainterController } from "@/PaintPDF/components";
import { getMergedPDFBytes } from "../../_utils/downloadUtils/getMergedPDFBytes";
import { downloadPDF } from "../../_utils/downloadUtils/downloadUtils";
import { getSelfDrawFromServer } from "../../_utils/downloadUtils/apiUtils";
import { pageEachDrawCallback } from "../../_utils/downloadUtils/drawUtils";

interface PropType {
  fileName: string;
  src: string;
  fileId: number;
  sessionId: number;
  pdfPainterController: PDFPainterController;
}

const EditorSetter = ({
  setEditorState,
}: {
  setEditorState: Dispatch<SetStateAction<Editor | null>>;
}) => {
  const editor = useEditor();
  useEffect(() => {
    setEditorState(editor);
  }, []);
  return null;
};

export function HostViewerDownload({
  src,
  fileId,
  sessionId,
  pdfPainterController,
  fileName,
}: PropType) {
  const [editorState, setEditorState] = useState<null | Editor>(null);
  const hostDrawControlRef = useRef<null | HTMLInputElement>(null);
  const handleButtonClick = async () => {
    if (editorState === null || hostDrawControlRef.current === null) {
      return;
    }
    const snapshotsFromServer = hostDrawControlRef.current.checked
      ? await getSelfDrawFromServer(
          pdfPainterController.getPageCount(),
          sessionId,
          fileId
        )
      : [];
    const pdfBytes = await getMergedPDFBytes(src, async (index) => [
      await pageEachDrawCallback({
        index,
        editor: editorState,
        checked: hostDrawControlRef.current?.checked,
        responses: snapshotsFromServer,
      }),
    ]);
    downloadPDF(pdfBytes, fileName);
  };
  return (
    <>
      <ModeControl
        labelText="내 필기 포함"
        id="host-draw"
        checkboxRef={hostDrawControlRef}
      />
      <Button
        className={css({
          width: "100%",
          height: "2rem",
          padding: "0.25rem",
          marginTop: "0.25rem",
        })}
        onClick={handleButtonClick}
      >
        다운로드
      </Button>
      <div
        className={css({
          position: "relative",
          overflow: "hidden",
          visibility: "hidden",
        })}
      >
        <div
          className={css({
            visibility: "hidden",
            position: "absolute",
            zIndex: -1000,
            top: 0,
            left: 0,
            width: "5000px",
            height: "5000px",
            overflow: "hidden",
          })}
        >
          <Tldraw>
            <EditorSetter setEditorState={setEditorState} />
          </Tldraw>
        </div>
      </div>
    </>
  );
}

export function ParticipantViewerDownload({
  src,
  fileId,
  sessionId,
  pdfPainterController,
  fileName,
}: PropType) {
  const [editorState, setEditorState] = useState<null | Editor>(null);
  const hostDrawControlRef = useRef<null | HTMLInputElement>(null);
  const partiDrawControlRef = useRef<null | HTMLInputElement>(null);
  const handleButtonClick = async () => {
    if (
      editorState === null ||
      hostDrawControlRef.current === null ||
      partiDrawControlRef.current === null
    ) {
      return;
    }
    const snapshotsFromServer = partiDrawControlRef.current.checked
      ? await getSelfDrawFromServer(
          pdfPainterController.getPageCount(),
          sessionId,
          fileId
        )
      : [];
    const hostSnapshotsFromServer = hostDrawControlRef.current.checked
      ? await getSelfDrawFromServer(
          pdfPainterController.getPageCount(),
          sessionId,
          fileId,
          true
        )
      : [];
    const pdfBytes = await getMergedPDFBytes(src, async (index) => [
      await pageEachDrawCallback({
        index,
        editor: editorState,
        checked: hostDrawControlRef.current?.checked,
        responses: snapshotsFromServer,
      }),
      await pageEachDrawCallback({
        index,
        editor: editorState,
        checked: partiDrawControlRef.current?.checked,
        responses: hostSnapshotsFromServer,
      }),
    ]);
    downloadPDF(pdfBytes, fileName);
  };
  return (
    <>
      <ModeControl
        labelText="내 필기 포함"
        id="parti-draw"
        checkboxRef={partiDrawControlRef}
      />
      <ModeControl
        labelText="호스트 필기 포함"
        id="host-draw"
        checkboxRef={hostDrawControlRef}
      />
      <Button
        className={css({
          width: "100%",
          height: "2rem",
          padding: "0.25rem",
          marginTop: "0.25rem",
        })}
        onClick={handleButtonClick}
      >
        다운로드
      </Button>
      <div
        className={css({
          position: "relative",
          overflow: "hidden",
          visibility: "hidden",
        })}
      >
        <div
          className={css({
            position: "absolute",
            zIndex: -1000,
            top: 0,
            left: 0,
            width: "5000px",
            height: "5000px",
          })}
        >
          <Tldraw>
            <EditorSetter setEditorState={setEditorState} />
          </Tldraw>
        </div>
      </div>
    </>
  );
}
