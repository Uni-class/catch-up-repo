import { css, cx } from "@/styled-system/css";
import { format } from "date-fns";
import formatByteSize from "@/utils/formatByteSize";
import DocumentIcon from "@/public/icons/document.svg";
import PdfIcon from "@/public/icons/pdf.svg";
import { ReactNode } from "react";


const FileIcons: {
  [key: string]: ReactNode;
} = {
  "": <DocumentIcon />,
  "pdf": <PdfIcon />,
};

function getFileIcon(fileName: string): ReactNode {
  return FileIcons[fileName.split(".").at(-1) as string] || FileIcons[""];
}


interface PropType {
  className?: string;
  file: File;
}

export default function FilePreview({className, file}: PropType) {
  return (
    <div className={cx(css({
      display: "flex",
      padding: "0.5em",
      backgroundColor: "gray.200",
      borderRadius: "0.5em",
      _hover: {
        backgroundColor: "gray.300",
      },
      _active: {
        color: "#ffffff",
        backgroundColor: "gray.600",
      }
    }), className)}>
      <div className={css({
        width: "4em",
        height: "4em",
      })}>
        {getFileIcon(file.name)}
      </div>
      <div className={css({
        padding: "0 1em 0 0.5em",
        textAlign: "left",
      })}>
        <div className={css({
          fontSize: "1.2em",
          fontWeight: "bold",
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
    </div>
  );
};
