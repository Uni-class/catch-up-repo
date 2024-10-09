import Button from "@/components/Button";
import { ModeControl } from "./Mode";
import { css } from "@/styled-system/css";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Editor, Tldraw, useEditor } from "tldraw";
import { PDFPainterController } from "@/PaintPDF/components";
import { getMergedPDFBytes } from "../_utils/downloadUtils/getMergedPDFBytes";
import { downloadPDF } from "../_utils/downloadUtils/downloadUtils";
import { toast } from "react-toastify";
import { getSelfDrawFromServer } from "../_utils/downloadUtils/apiUtils";
import { pageEachDrawCallback } from "../_utils/downloadUtils/drawUtils";
import { getPdfPageSize } from "../_utils/downloadUtils/pdfUtils";

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
    toast("서버로부터 필기를 받아오고 있습니다.");

    const snapshotsFromServer = hostDrawControlRef.current.checked
      ? await getSelfDrawFromServer(
          pdfPainterController.getPageCount(),
          sessionId,
          fileId
        )
      : [];
    toast("pdf 문서를 만들고 있습니다.");
    const pdfSizes = await getPdfPageSize(src);
    const pdfBytes = await getMergedPDFBytes(src, async (index) => [
      await pageEachDrawCallback({
        index,
        editor: editorState,
        checked: hostDrawControlRef.current?.checked,
        width: pdfSizes[index].width,
        height: pdfSizes[index].height,
        snapshots: snapshotsFromServer,
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
          display: "none",
          position: "absolute",
          zIndex: -1000,
        })}
      >
        <Tldraw>
          <EditorSetter setEditorState={setEditorState} />
        </Tldraw>
      </div>
    </>
  );
}

export function ParticipantViewerDownload({ fileId, sessionId }: PropType) {
  const hostDrawControlRef = useRef<null | HTMLInputElement>(null);
  const partiDrawControlRef = useRef<null | HTMLInputElement>(null);
  return (
    <>
      <ModeControl
        labelText="내 필기 포함"
        id="parti-draw"
        checkboxRef={hostDrawControlRef}
      />
      <ModeControl
        labelText="호스트 필기 포함"
        id="host-draw"
        checkboxRef={partiDrawControlRef}
      />
      <Button
        className={css({
          width: "100%",
          height: "2rem",
          padding: "0.25rem",
          marginTop: "0.25rem",
        })}
      >
        다운로드
      </Button>
    </>
  );
}
