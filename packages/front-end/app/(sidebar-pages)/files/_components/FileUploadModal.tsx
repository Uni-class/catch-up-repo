import Button from "@/components/Button";
import FileUploader from "@/components/FileUploader/FileUploader";
import { Heading } from "@/components/Text";
import { css } from "@/styled-system/css";
import { overlay } from "overlay-kit";
import { useEffect, useState, useRef, SetStateAction, Dispatch } from "react";


export default function FileUploadModal({ setClosingBlocked }: { setClosingBlocked: Dispatch<SetStateAction<boolean>> }) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<"ready" | "uploading" | "finished">("ready");
  const fileUploaderRef = useRef<{
    upload: () => void;
  }>();

  useEffect(() => {
    setClosingBlocked(status === "uploading");
  }, [status]);

  return (
    <div
      className={css({
        display: "flex",
        padding: "1.5em 2em",
        width: "70vw",
        maxWidth: "50em",
        height: "60vh",
        maxHeight: "50em",
        backgroundColor: "#ffffff",
        borderRadius: "1em",
        flexDirection: "column",
        gap: "0.5em",
      })}
    >
      <Heading>파일 업로드</Heading>
      <FileUploader
        ref={fileUploaderRef}
        accept={{
          "application/pdf": [".pdf"],
        }}
        selectedFiles={selectedFiles}
        setSelectedFiles={setSelectedFiles}
        uploadFinishHandler={() => setStatus("finished")}
      />
      <div className={css({
        display: "flex",
        gap: "0.5em",
        justifyContent: "right",
      })}>
        <Button
          className={css({
            padding: "0.5em 1em",
          })}
          disabled={selectedFiles.length === 0 || status !== "ready"}
          onClick={() => {
            if (fileUploaderRef.current) {
              setStatus("uploading");
              fileUploaderRef.current.upload();
            }
          }}
        >
          업로드
        </Button>
        <Button
          className={css({
            padding: "0.5em 1em",
          })}
          preset={"secondary"}
          disabled={status === "uploading"}
          onClick={() => {
            overlay.close("File-Upload");
          }}
        >
          {
            status === "finished"
            ?
              "닫기"
              :
              "취소"
          }
        </Button>
      </div>
    </div>
  );
}
