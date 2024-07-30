import Button from "@/components/Button";
import { Heading } from "@/components/Text";
import { css } from "@/styled-system/css";
import { overlay } from "overlay-kit";
import LocalFileUpload from "./LocalFileUpload";

export default function FileUploadModal() {
  return (
    <div
      className={css({
        width: "700px",
        height: "500px",
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
        <Heading>강의 자료 업로드</Heading>
        <Button
          onClick={() => {
            overlay.close("file upload");
          }}
        >
          X
        </Button>
      </div>

      <LocalFileUpload />
    </div>
  );
}
