import { Paragraph } from "@/components/Text";
import { css } from "@/styled-system/css";
import { format } from "date-fns";
import { useState } from "react";
import { DropEvent, FileRejection, useDropzone } from "react-dropzone";

interface PropType {
  onDrop?: <T extends File>(
    acceptedFiles: T[],
    fileRejections: FileRejection[],
    event: DropEvent
  ) => void;
}

export default function LocalFileUpload({
  onDrop = (acceptedFiles) => {
    console.log(acceptedFiles);
  },
}: PropType) {
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles, fileRejections, event) => {
      onDrop(acceptedFiles, fileRejections, event);
      setCurrentFile(acceptedFiles[0]);
    },
    accept: {
      "application/pdf": [".pdf"],
    },
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
          border: "2px dashed #ccc",
          borderRadius: "5px",
          padding: "20px",
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
        <StatusText isDragActive={isDragActive} currentFile={currentFile} />
      </div>
    </div>
  );
}

function StatusText({
  isDragActive,
  currentFile,
}: {
  isDragActive: boolean;
  currentFile: File | null;
}) {
  if (currentFile !== null) {
    const lastModified = new Date(currentFile.lastModified);
    return (
      <div>
        <Paragraph variant="body3">{currentFile.name}</Paragraph>
        <Paragraph variant="body4">{`파일 용량: ${formatFileSize(currentFile.size)}`}</Paragraph>
        <Paragraph variant="body4">{`최종 수정: ${format(lastModified, "yyyy-MM-dd")}`}</Paragraph>
        <Paragraph variant="body2">눌러서 다시 선택</Paragraph>
      </div>
    );
  }
  return isDragActive ? (
    <Paragraph variant="body1">이곳에 드래그 & 드랍</Paragraph>
  ) : (
    <Paragraph variant="body1">내 장치에서 업로드</Paragraph>
  );
}

const formatFileSize = (size: number) => {
  if (size < 1024) return `${size} bytes`;
  const units = ["KB", "MB", "GB", "TB"];
  let unitIndex = -1;
  do {
    size /= 1024;
    unitIndex++;
  } while (size >= 1024 && unitIndex < units.length - 1);
  return `${size.toFixed(2)} ${units[unitIndex]}`;
};
