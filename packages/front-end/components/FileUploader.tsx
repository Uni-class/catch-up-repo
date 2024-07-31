import { Paragraph } from "@/components/Text";
import { css } from "@/styled-system/css";
import { format } from "date-fns";
import { FormEvent, useState } from "react";
import { DropEvent, FileRejection, useDropzone } from "react-dropzone";
import Button from "@/components/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/util/axios";

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
  const queryClient = useQueryClient();
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles, fileRejections, event) => {
      onDrop(acceptedFiles, fileRejections, event);
      setCurrentFile(acceptedFiles[0]);
    },
    accept: {
      "application/pdf": [".pdf"],
    },
  });
  const fileMutate = useMutation({
    mutationFn: async (body: FormData) =>
      await apiClient.post("/file", body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user files"] });
    },
    onError: (e) => {
      console.error(e);
    },
  });
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    if (!currentFile) {
      alert("파일을 선택해라");
      return;
    }
    formData.append("file", currentFile);
    fileMutate.mutate(formData);
  };
  return (
    <form
      className={css({
        padding: "1rem",
        textAlign: "center",
        flexGrow: 1,
        marginTop: "1rem",
        display: "flex",
        flexDirection: "column",
      })}
      onSubmit={handleSubmit}
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
          flexGrow: 1,
        })}
      >
        <input {...getInputProps()} />
        <StatusText isDragActive={isDragActive} currentFile={currentFile} />
      </div>
      <Button type="submit">업로드</Button>
    </form>
  );
}

function StatusText({
  isDragActive,
  currentFile,
}: {
  isDragActive: boolean;
  currentFile: File | null;
}) {
  if (currentFile !== null) {
    const lastModified = new Date(currentFile.lastModified);
    return (
      <div>
        <Paragraph variant="body3">{currentFile.name}</Paragraph>
        <Paragraph variant="body4">{`파일 용량: ${formatFileSize(currentFile.size)}`}</Paragraph>
        <Paragraph variant="body4">{`최종 수정: ${format(lastModified, "yyyy-MM-dd")}`}</Paragraph>
        <Button
        className={css({
          padding: "0.5em 0.8em",
          width: "fit-content",
        })}
        type = "button"
      >
        눌러서 다시 선택
      </Button>
      </div>
    );
  }
  return isDragActive ? (
    <Paragraph variant="body2">여기로 파일을 끌어오세요.</Paragraph>
  ) : (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        justifyContent: "center",
        alignItems: "center",
      })}
    >
      <Paragraph variant="body2">여기로 파일을 끌어오세요.</Paragraph>
      <Paragraph variant="body3">또는</Paragraph>
      <Button
        className={css({
          padding: "0.5em 0.8em",
          width: "fit-content",
        })}
        type = "button"
      >
        파일 선택하기
      </Button>
    </div>
  );
}

const formatFileSize = (size: number) => {
  if (size < 1024) return `${size} bytes`;
  const units = ["KB", "MB", "GB", "TB"];
  let unitIndex = -1;
  do {
    size /= 1024;
    unitIndex++;
  } while (size >= 1024 && unitIndex < units.length - 1);
  return `${size.toFixed(2)} ${units[unitIndex]}`;
};
