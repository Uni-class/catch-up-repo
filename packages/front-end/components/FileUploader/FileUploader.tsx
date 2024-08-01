import { Paragraph } from "@/components/Text";
import { css } from "@/styled-system/css";
import { Dispatch, SetStateAction, useState, forwardRef, useImperativeHandle, useRef, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Button from "@/components/Button";
import FileUploadPreview from "@/components/FileUploader/FileUploadPreview";
import PlusCircleIcon from "@/public/icons/plus-circle.svg";
import PlusIcon from "@/public/icons/plus.svg";
import RepeatIcon from "@/public/icons/repeat.svg";


const FileUploader = forwardRef(({ selectedFiles, setSelectedFiles, accept, allowMultipleFiles = true, uploadFinishHandler }: {
  selectedFiles: File[]
  setSelectedFiles: Dispatch<SetStateAction<File[]>>
  accept?: {
    [name: string]: string[]
  }
  allowMultipleFiles?: boolean
  uploadFinishHandler?: () => void
}, ref) => {
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
  const [uploadStarted, setUploadStarted] = useState(false);
  const selectedFilesViewRef = useRef<{
    uploadFiles: () => void;
  }>();

  const upload = () => {
    if (selectedFilesViewRef.current) {
      setUploadStarted(true);
      selectedFilesViewRef.current.uploadFiles();
    }
  };

  useImperativeHandle(ref, () => ({
    upload
  }));

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
        selectedFiles.length === 0 || uploadStarted
          ?
          null
          :
          <Button
            className={css({
              display: "flex",
              margin: "0 0.5em 0 auto",
              padding: "0.5em 0.7em",
              gap: "0.3em",
              justifyContent: "center",
              alignItems: "center",
            })}
            onClick={open}
          >
            {
              allowMultipleFiles
                ?
                <>
                  <PlusIcon width={"1.5em"} />
                  <p>파일 추가하기</p>
                </>
                :
                <>
                  <RepeatIcon width={"1.5em"} />
                  <p>파일 변경하기</p>
                </>
            }
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
          <div className={css({
            padding: "0.2em",
            width: "100%",
            height: "100%",
          })}>
            <SelectedFilesView
              ref={selectedFilesViewRef}
              selectedFiles={selectedFiles}
              setSelectedFiles={setSelectedFiles}
              uploadFinishHandler={uploadFinishHandler}
            />
          </div>
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
});
FileUploader.displayName = "FileUploader";
export default FileUploader;



const SelectedFilesView = forwardRef(({ selectedFiles, setSelectedFiles, uploadFinishHandler }: {
  selectedFiles: File[]
  setSelectedFiles: Dispatch<SetStateAction<File[]>>
  uploadFinishHandler?: () => void
}, ref) => {
  const [status, setStatus] = useState<"ready" | "uploading" | "finished">("ready");
  const [finishedCount, setFinishedCount] = useState(0);
  const fileUploadPreviewRefs = useRef<{
    uploadFile: () => void;
  }[]>([]);

  useEffect(() => {
    if (status === "uploading" && finishedCount === selectedFiles.length) {
      setStatus("finished");
      if (uploadFinishHandler)
        uploadFinishHandler();
    }
  }, [status, selectedFiles, uploadFinishHandler, finishedCount]);

  const uploadFiles = () => {
    setStatus("uploading");
    fileUploadPreviewRefs.current.forEach(ref => {
      if (ref && ref.uploadFile) {
        ref.uploadFile();
      }
    });
  };

  useImperativeHandle(ref, () => ({
    uploadFiles
  }));

  return (
    <div
      className={css({
        width: "100%",
        height: "100%",
        overflowY: "auto",
      })}
    >
      <div
        className={css({
          display: "flex",
          padding: "0.3em",
          width: "100%",
          flexDirection: "column",
          gap: "0.5em",
        })}
        onClick={(event) => event.stopPropagation()}
      >
        {
          selectedFiles.map((file, index) => {
            return (
              <FileUploadPreview
                key={index}
                ref={(element: { uploadFile: () => void }) => {
                  fileUploadPreviewRefs.current[index] = element;
                }}
                file={file}
                removeButtonClickHandler={
                  () => setSelectedFiles(selectedFiles.toSpliced(index, 1))
                }
                uploadResultHandler={
                  (success: boolean) => {
                    setFinishedCount((count) => count + 1);
                  }
                }
              />
            );
          })
        }
      </div>
    </div>
  );
});
SelectedFilesView.displayName = "SelectedFilesView";


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
        userSelect: "none",
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
