import { Paragraph } from "@/components/Text";
import { css } from "@/styled-system/css";
import { useDropzone } from "react-dropzone";

export default function LocalFileUpload() {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      console.log(acceptedFiles);
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
        <input {...getInputProps()} accept=".pdf" />
        {isDragActive ? (
          <Paragraph variant="body1">이곳에 드래그 & 드랍</Paragraph>
        ) : (
          <Paragraph variant="body1">내 장치에서 업로드</Paragraph>
        )}
      </div>
    </div>
  );
}