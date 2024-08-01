import { Paragraph } from "@/components/Text";
import { css } from "@/styled-system/css";
import { Dispatch, SetStateAction, useState } from "react";
import { DropEvent, FileRejection, useDropzone } from "react-dropzone";
import Button from "@/components/Button";
import FileUploadPreview from "@/components/FileUploader/FileUploadPreview";
import PlusCircleIcon from "@/public/icons/plus-circle.svg";


export default function FileUploader({ accept, allowMultipleFiles = true }: {
  accept?: {
    [name: string]: string[];
  };
  allowMultipleFiles?: boolean;
}) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    onDrop: (acceptedFiles, fileRejections, event) => {
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
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
        gap: "0.5em",
      })}
    >
      {
        selectedFiles.length === 0
          ?
          null
          :
          <Button
            className={css({
              display: "block",
              margin: "0 0.5em 0 auto",
              padding: "0.5em 1em",
            })}
            onClick={open}
          >
            {allowMultipleFiles ? "파일 추가하기" : "파일 변경하기"}
          </Button>
      }
      <input {...getInputProps()} />
      <div
        {...getRootProps()}
        className={css({
          display: "flex",
          height: "100%",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          justifyContent: "center",
          gap: "0.5em",
          overflow: "hidden",
        })}
      >
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
        padding: "0.3em 0.5em",
        width: "100%",
        height: "100%",
        flexDirection: "column",
        gap: "0.5em",
        overflowY: "auto",
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
    <div
        className={css({
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
        border: "1px dashed #ccc",
        borderRadius: "0.5em",
        cursor: "pointer",
      })}
    >
      {
        isDragActive
          ?
          <>
            <PlusCircleIcon width={"3em"}/>
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
