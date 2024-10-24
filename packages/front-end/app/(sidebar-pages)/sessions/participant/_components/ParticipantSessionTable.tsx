import Button from "@/components/Button/Button";
import { useRouter } from "@/hook/useRouter";
import { Session } from "@/schema/backend.schema";
import { css } from "@/styled-system/css";
import { formatDate } from "date-fns";
import { useState } from "react";
import SelectableTable from "@/components/SelectableTable";
import { PROJECT_NAME } from "@/const/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/utils/axios";
import { Heading } from "@/components/Text";
import DeleteIcon from "@/public/icons/delete.svg";
import LinkButton from "@/components/Button/LinkButton";
import JoinIcon from "@/public/icons/join.svg";

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
    <p>새로운 {PROJECT_NAME} 세션에 참가해 보세요!</p>
    <LinkButton
      className={css({
        padding: "0.5em 0.8em",
      })}
      href="/sessions/join"
    >
      새 세션 참여하기
    </LinkButton>
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

export function ParticipantSessionTable({
  data,
  status = null,
}: {
  data: Session[];
  status?: "loading" | "error" | null;
}) {
  const router = useRouter();
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const queryClient = useQueryClient();
  const sessionMutate = useMutation({
    mutationFn: async (selectedItems: number[]) =>
      Promise.all(
        selectedItems.map(async (selectedItem) => {
          await apiClient.delete(`user/session/${selectedItem}`);
        })
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user", "sessions", "participant"],
      });
      queryClient.refetchQueries({
        queryKey: ["user", "sessions", "participant"],
      });
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
        fontSize: "0.8rem",
        fontWeight: "semibold",
      })}
    >
      <div
        className={css({ display: "flex", justifyContent: "space-between" })}
      >
        <Heading>내가 참가한 세션</Heading>
        <div
          className={css({
            display: "flex",
            gap: "1em",
            justifyContent: "flex-end",
            fontWeight: "medium",
          })}
        >
          <LinkButton
            href="/sessions/join"
            startIcon={<JoinIcon width={"1em"} height={"1em"} />}
          >
            새 세션 참여하기
          </LinkButton>
          <Button
            disabled={selectedItems.length === 0}
            onClick={() => {
              sessionMutate.mutate(selectedItems);
              setSelectedItems([]);
            }}
            color="gray"
            startIcon={<DeleteIcon width={"1em"} height={"1em"} />}
          >
            선택한 세션 삭제
          </Button>
        </div>
      </div>
      <SelectableTable
        head={[
          {
            id: 0,
            value: "제목",
            align: "left",
          },
          {
            id: 1,
            value: "참여 시간",
            width: "20vw",
            minWidth: "13em",
          },
          {
            id: 2,
            value: "상태",
            width: "10vw",
            minWidth: "6em",
          },
          {
            id: 3,
            value: "빠른 작업",
            width: "10vw",
            minWidth: "8em",
          },
        ]}
        body={data.map((item) => {
          return {
            id: item.sessionId,
            values: [
              <div key={0}>{item.sessionName}</div>,
              <div key={1}>
                {formatDate(item.createdAt, "yyyy-MM-dd HH:mm:ss")}
              </div>,
              <div
                key={2}
                className={css({
                  color: item.closedAt ? "grey.500" : "primary.200",
                })}
              >
                {item.closedAt ? `종료됨` : "진행중"}
              </div>,
              <div
                key={3}
                className={css({ display: "flex", justifyContent: "center" })}
              >
                <LinkButton
                  size="small"
                  href={{ pathname: "/view", query: { id: item.sessionId } }}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  startIcon={<JoinIcon width={"1em"} height={"1em"} />}
                >
                  세션 참여
                </LinkButton>
              </div>,
            ],
            onClick: () => router.push(`/sessions/detail/${item.sessionId}`),
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
