import { Paragraph } from "@/components/Text";
import { css } from "@/styled-system/css";
import { DropEvent, FileRejection, useDropzone } from "react-dropzone";

interface PropType {
  onDrop?: <T extends File>(
    acceptedFiles: T[],
    fileRejections: FileRejection[],
    event: DropEvent
  ) => void;
}

export default function FileUploader({
  onDrop = (acceptedFiles) => {
    console.log(acceptedFiles);
  },
}: PropType) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDrop,
    accept:{
      'application/pdf': ['.pdf']
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
        {isDragActive ? (
          <Paragraph variant="body1">여기로 파일을 끌어오세요.</Paragraph>
        ) : (
          <div>
            <Paragraph variant="body1">여기로 파일을 끌어오세요.</Paragraph>
            <Paragraph variant="body1">또는</Paragraph>
            <Paragraph variant="body1">파일 선택하기</Paragraph>
          </div>
        )}
      </div>
    </div>
  );
}
