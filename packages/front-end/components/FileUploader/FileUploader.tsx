import { Paragraph } from "@/components/Text";
import { css } from "@/styled-system/css";
import { Dispatch, SetStateAction, useState } from "react";
import { DropEvent, FileRejection, useDropzone } from "react-dropzone";
import Button from "@/components/Button";
import FileUploadPreview from "@/components/FileUploader/FileUploadPreview";
import PlusCircleIcon from "@/public/icons/plus-circle.svg";


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
        height: "100%",
        border: "1px dashed #ccc",
        borderRadius: "0.5em",
        overflow: "hidden",
      })}
    >
      <div
        {...getRootProps()}
        className={css({
          display: "flex",
          height: "100%",
          alignItems: "center",
          textAlign: "center",
          justifyContent: "center",
        })}
      >
        <input {...getInputProps()} />
        <div className={css({
          position: "relative",
          width: "100%",
          height: "100%",
        })}>
          <SelectedFilesView selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles}/>
          {
            selectedFiles.length === 0 || isDragActive
              ?
              <FileDropArea isDragActive={isDragActive}/>
              :
              null
          }
        </div>
      </div>
    </div>
  );
}

function SelectedFilesView({selectedFiles, setSelectedFiles}: {
  selectedFiles: File[],
  setSelectedFiles: Dispatch<SetStateAction<File[]>>
}) {
  return (
    <div
      className={css({
        display: "flex",
        padding: "0.5em",
        width: "100%",
        height: "100%",
        flexDirection: "column",
        gap: "0.5em",
        overflow: "scroll",
      })}
      onClick={(event) => event.stopPropagation()}
    >
      {
        selectedFiles.map((file, index) => {
          return (
            <FileUploadPreview key={index} file={file} removeButtonClickHandler={
              () => setSelectedFiles(selectedFiles.toSpliced(index, 1))
            }/>
          );
        })
      }
    </div>
  );
}


function FileDropArea({isDragActive}: { isDragActive: boolean }) {
  return (
    <div className={css({
      position: "absolute",
      top: "0",
      left: "0",
      display: "flex",
      width: "100%",
      height: "100%",
      flexDirection: "column",
      gap: "0.5em",
      justifyContent: "center",
      alignItems: "center",
      color: "#000000",
      backgroundColor: "#dddddd80",
      cursor: "pointer",
    })}>
      {
        isDragActive
          ?
          <>
            <PlusCircleIcon width={"3em"} />
            <Paragraph variant="body2">이곳에 파일을 놓아주세요.</Paragraph>
          </>
          :
          <>
            <Paragraph variant="body2">이곳에 파일을 끌어오세요.</Paragraph>
            <Paragraph variant="body3">또는</Paragraph>
            <Button
              className={css({
                padding: "0.5em 0.8em",
                width: "fit-content",
              })}
            >
              파일 선택하기
            </Button>
          </>
      }
    </div>
  );
}
