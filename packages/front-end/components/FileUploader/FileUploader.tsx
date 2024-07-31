import { Paragraph } from "@/components/Text";
import { css } from "@/styled-system/css";
import { useState } from "react";
import { DropEvent, FileRejection, useDropzone } from "react-dropzone";
import Button from "@/components/Button";
import FileUploadPreview from "@/components/FileUploader/FileUploadPreview";

interface PropType {
  accept?: {
    [name: string]: string[];
  };
  onDrop?: <T extends File>(
    acceptedFiles: T[],
    fileRejections: FileRejection[],
    event: DropEvent
  ) => void;
  allowMultipleFiles?: boolean;
}

export default function FileUploader({
  accept,
  onDrop = (acceptedFiles) => {
    console.log(acceptedFiles);
  },
  allowMultipleFiles = true
}: PropType) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles, fileRejections, event) => {
      onDrop(acceptedFiles, fileRejections, event);
      if (allowMultipleFiles) {
        setSelectedFiles([...selectedFiles, ...acceptedFiles]);
      }
      else {
        setSelectedFiles(acceptedFiles.slice(0, 1));
      }
    },
    accept: accept
  });
  return (
    <div
      className={css({
        padding: "1rem",
        textAlign: "center",
        flexGrow: 1,
        marginTop: "1rem",
      })}
    >
      <div
        {...getRootProps()}
        className={css({
          border: "1px dashed #ccc",
          borderRadius: "0.5em",
          padding: "0.5em",
          cursor: "pointer",
          backgroundColor: isDragActive ? "#f0f0f0" : "transparent",
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          justifyContent: "center",
          height: "100%",
        })}
      >
        <input {...getInputProps()} />
        <SelectedFilesView isDragActive={isDragActive} selectedFiles={selectedFiles} />
      </div>
    </div>
  );
}

function SelectedFilesView({
  isDragActive,
  selectedFiles,
}: {
  isDragActive: boolean;
  selectedFiles: File[];
}) {
  if (selectedFiles.length === 0) {
    return (
      isDragActive
        ?
        <Paragraph variant="body2">이곳에 파일을 놓아주세요.</Paragraph>
        :
        <div className={css({
          display: "flex",
          flexDirection: "column",
          gap: "0.5em",
          justifyContent: "center",
          alignItems: "center",
        })}>
          <Paragraph variant="body2">여기로 파일을 끌어오세요.</Paragraph>
          <Paragraph variant="body3">또는</Paragraph>
          <Button
            className={css({
              padding: "0.5em 0.8em",
              width: "fit-content",
            })}
          >
            파일 선택하기
          </Button>
        </div>
    )
  }
  else {
    return (
      <div className={css({
        display: "flex",
        width: "100%",
        height: "100%",
        flexDirection: "column",
        gap: "0.5em",
      })}>
        {
          selectedFiles.map((file, index) => {
            return (
              <FileUploadPreview key={index} file={file}/>
            );
          })
        }
      </div>
    );
  }
}
