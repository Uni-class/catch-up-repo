import { css, cx } from "@/styled-system/css";
import { format } from "date-fns";
import formatByteSize from "@/utils/formatByteSize";
import Button from "@/components/Button";
import CloseIcon from "@/public/icons/close.svg";
import DocumentIcon from "@/public/icons/document.svg";
import PdfIcon from "@/public/icons/pdf.svg";
import { apiClient } from "@/utils/axios";
import { ReactNode, useState, useImperativeHandle, forwardRef } from "react";


const FileIcons: {
  [key: string]: ReactNode;
} = {
  "": <DocumentIcon />,
  "pdf": <PdfIcon />,
};

function getFileIcon(fileName: string): ReactNode {
  return FileIcons[fileName.split(".").at(-1) as string] || FileIcons[""];
}

function openFileInNewTab(file: File): void {
  console.log(file);
  const reader = new FileReader();
  reader.onload = (event) => {
    if (!event.target?.result)
      return;
    const url = URL.createObjectURL(
      new Blob([event.target.result],
      {
        type: file.type
      }
    ));
    window.open(url, "_blank");
  };
  reader.onerror = (event) => {
    console.log(`Unable to load file: ${file.name}`);
  }
  reader.readAsArrayBuffer(file);
}


interface PropType {
  className?: string;
  file: File;
  removeButtonClickHandler?: () => void;
  uploadResultHandler?: (success: boolean) => void;
}


const FileUploadPreview = forwardRef(({ className, file, removeButtonClickHandler, uploadResultHandler }: PropType, ref) => {
  const [status, setStatus] = useState<"ready" | "uploading" | "error" | "finished">("ready");
  const [progress, setProgress] = useState(0);

  const uploadFile = () => {
    setStatus("uploading");

    const formData = new FormData();
    formData.append("file", file);

    apiClient.post("file", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      onUploadProgress: async (event) => {
        if (event.lengthComputable) {
          setProgress((event.loaded / (event.total || event.loaded)) * 100);
        }
      }
    })
      .then(() => {
        setProgress(100);
        setStatus("finished");
        if (uploadResultHandler)
          uploadResultHandler(true);
      })
      .catch((error) => {
        setStatus("error");
        if (uploadResultHandler)
          uploadResultHandler(false);
      });
  }

  useImperativeHandle(ref, () => ({
    uploadFile
  }));

  return (
    <div
      className={cx(css({
        position: "relative",
        display: "flex",
        padding: "0.5em 1em",
        backgroundColor: "gray.200",
        borderRadius: "0.5em",
        overflow: "hidden",
        gap: "0.3em",
        alignItems: "center",
        userSelect: "none",
        cursor: "pointer",
        _hover: {
          backgroundColor: "gray.300",
        },
        _active: {
          color: "#ffffff",
          backgroundColor: "gray.600",
        }
      }), className)}
      onClick={() => openFileInNewTab(file)}
    >
      <div className={css({
        width: "3.2em",
        height: "3.2em",
      })}>
        {getFileIcon(file.name)}
      </div>
      <div className={css({
        padding: "0 0.5em",
        width: "100%",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textAlign: "left",
      })}>
        <div className={css({
          fontSize: "1.1em",
          textOverflow: "ellipsis",
          overflow: "hidden",
        })}>
          {file.name}
        </div>
        <div className={css({
          fontSize: "0.8em",
        })}>
          {format(file.lastModified, "yyyy-MM-dd HH:mm:ss")}
        </div>
        <div className={css({
          fontSize: "0.8em",
        })}>
          {formatByteSize(file.size)}
        </div>
      </div>
      {
        status === "ready"
        ?
          <Button
            className={css({
              padding: "0.1em",
              borderRadius: "0.3em",
            })}
            onClick={(event) => {
              event.stopPropagation();
              if (removeButtonClickHandler)
                removeButtonClickHandler();
            }}
          >
            <CloseIcon width={"2em"} />
          </Button>
          :
          null
      }
      <div
        className={css({
          position: "absolute",
          bottom: "0",
          left: "0",
          height: "0.5em",
          transition: "all 0.1s ease",
        })}
        style={{
          width: `${progress}%`,
          backgroundColor: (
            status === "uploading"
            ?
              "#fc7328"
              :
              (
                status === "error"
                ?
                  "#e80000"
                  :
                  "#00c40a"
              )
          )
        }}
      >
      </div>
    </div>
  );
});

FileUploadPreview.displayName = "FileUploadPreview";
export default FileUploadPreview;