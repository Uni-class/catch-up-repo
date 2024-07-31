import Button from "@/components/Button";
import FileUploader from "@/components/FileUploader/FileUploader";
import { Heading } from "@/components/Text";
import { css } from "@/styled-system/css";
import { overlay } from "overlay-kit";

export default function FileUploadModal() {
  return (
    <div
      className={css({
        width: "70vw",
        height: "60vh",
        backgroundColor: "#fff",
        borderRadius: "1rem",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
      })}
    >
      <div
        className={css({ display: "flex", justifyContent: "space-between" })}
      >
        <Heading>파일 업로드</Heading>
        <Button
          onClick={() => {
            overlay.close("File Upload");
          }}
        >
          X
        </Button>
      </div>
      <FileUploader
        accept={{
          "application/pdf": [".pdf"],
        }}
      />
    </div>
  );
}
