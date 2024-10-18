import { File } from "@/schema/backend.schema";
import { css } from "@/styled-system/css";
import { formatDate } from "date-fns";
import { useState } from "react";
import Button from "@/components/Button/Button";
import SelectableTable from "@/components/SelectableTable";
import { overlay } from "overlay-kit";
import ModalContainer from "@/components/ModalContainer";
import FileUploadModal from "@/components/FileUploader/FileUploadModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/utils/axios";

const showFileUploadModal = () => {
  overlay.open(
    ({ isOpen, close }) => (
      <ModalContainer isOpen={isOpen} onClose={close}>
        <FileUploadModal />
      </ModalContainer>
    ),
    { overlayId: "File-Upload" },
  );
};

const DataEmptyPlaceholder = (
  <div
    className={css({
      display: "flex",
      padding: "1em",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: "0.5em",
    })}
  >
    <p>표시할 데이터가 없습니다.</p>
    <p>새로운 파일을 업로드해 보세요!</p>
    <Button
      className={css({
        padding: "0.5em 0.8em",
      })}
      onClick={() => showFileUploadModal()}
    >
      새 파일 업로드
    </Button>
  </div>
);

const LoadingPlaceholder = (
  <div
    className={css({
      display: "flex",
      padding: "1em",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: "0.5em",
    })}
  >
    <p>불러오는 중...</p>
  </div>
);

const ErrorPlaceholder = (
  <div
    className={css({
      display: "flex",
      padding: "1em",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: "0.5em",
    })}
  >
    <p>오류가 발생하였습니다.</p>
  </div>
);

export function FileTable({
  data,
  status = null,
}: {
  data: File[];
  status?: "loading" | "error" | null;
}) {
  const queryClient = useQueryClient();
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const fileMutate = useMutation({
    mutationFn: async (selectedItems: number[]) =>
      Promise.all(
        selectedItems.map(async (e) => {
          await apiClient.delete(`/file/${e}`);
        }),
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "files"] });
      queryClient.refetchQueries({ queryKey: ["user", "files"] });
    },
    onError: (e) => {
      console.error(e);
    },
  });

  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        gap: "0.6em",
      })}
    >
      <div
        className={css({
          display: "flex",
          gap: "1em",
          justifyContent: "flex-end",
        })}
      >
        <Button
          className={css({
            padding: "0.5em 0.8em",
          })}
          onClick={() => showFileUploadModal()}
        >
          새 파일 업로드
        </Button>
        <Button
          className={css({
            padding: "0.5em 0.8em",
          })}
          disabled={selectedItems.length === 0}
          onClick={() => {
            console.log(`Delete Button Clicked`);
            console.log(selectedItems);
            fileMutate.mutate(selectedItems);
            setSelectedItems([]);
          }}
        >
          선택한 파일 삭제
        </Button>
      </div>
      <SelectableTable
        head={[
          {
            id: 0,
            value: "이름",
          },
          {
            id: 1,
            value: "업로드 시간",
            width: "20vw",
            minWidth: "13em",
          },
        ]}
        body={data.map((item) => {
          return {
            id: item.fileId,
            values: [
              <div key={0}>{item.name}</div>,
              <div key={1}>
                {formatDate(item.createdAt, "yyyy-MM-dd HH:mm:ss")}
              </div>,
            ],
            onClick: () => window.open(`/viewer/${item.fileId}`, "_blank"),
          };
        })}
        placeholder={
          status === null
            ? DataEmptyPlaceholder
            : status === "loading"
              ? LoadingPlaceholder
              : ErrorPlaceholder
        }
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
      />
    </div>
  );
}
