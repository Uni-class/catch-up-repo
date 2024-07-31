import Button from "@/components/Button";
import FileUploader from "@/components/FileUploader/FileUploader";
import { Heading } from "@/components/Text";
import { css } from "@/styled-system/css";
import { overlay } from "overlay-kit";
import CloseIcon from "@/public/icons/close.svg";

export default function FileUploadModal() {
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
        gap: "1em",
      })}
    >
      <div
        className={css({
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        })}
      >
        <Heading>파일 업로드</Heading>
        <Button
          className={css({
            padding: "0.1em",
          })}
          onClick={() => {
            overlay.close("File Upload");
          }}
        >
          <CloseIcon width={"2em"} />
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
