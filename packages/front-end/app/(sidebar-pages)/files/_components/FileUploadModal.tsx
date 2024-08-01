import Button from "@/components/Button";
import FileUploader from "@/components/FileUploader/FileUploader";
import { Heading } from "@/components/Text";
import { css } from "@/styled-system/css";
import { overlay } from "overlay-kit";
import { useState, useRef } from "react";


export default function FileUploadModal() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadStarted, setUploadStarted] = useState(false);
  const [uploadFinished, setUploadFinished] = useState(false);
  const fileUploaderRef = useRef<{
    upload: () => void;
  }>();

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
        uploadFinishHandler={() => setUploadFinished(true)}
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
          disabled={selectedFiles.length === 0 || uploadStarted}
          onClick={() => {
            if (fileUploaderRef.current) {
              setUploadStarted(true);
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
          disabled={uploadStarted && !uploadFinished}
          onClick={() => {
            overlay.close("File-Upload");
          }}
        >
          {
            uploadFinished
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
