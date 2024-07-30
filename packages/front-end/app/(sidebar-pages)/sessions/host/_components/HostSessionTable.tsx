import Button from "@/components/Button";
import LinkButton from "@/components/LinkButton";
import { useRouter } from "@/hook/useRouter";
import { Session } from "@/schema/backend.schema";
import { css } from "@/styled-system/css";
import { formatDate } from "date-fns";
import { useState } from "react";
import SelectableTable from "@/components/SelectableTable";
import { PROJECT_NAME } from "@/const/config";


export function HostSessionTable({ data }: { data: Session[] }) {
  const router = useRouter();

  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  return (
    <div className={css({
      display: "flex",
      flexDirection: "column",
      gap: "0.6em",
    })}>
      <div className={css({
        display: "flex",
        gap: "1em",
        justifyContent: "flex-end",
      })}>
        <LinkButton
          className={css({
            padding: "0.5em 0.8em",
          })}
          href="/sessions/create"
        >
          새로 만들기
        </LinkButton>
        <Button
          className={css({
            padding: "0.5em 0.8em"
          })}
          disabled={selectedItems.length === 0}
          onClick={() => {
            console.log(`Delete Button Clicked`);
            console.log(selectedItems);
            setSelectedItems([]);
          }}
        >
          선택한 세션 삭제
        </Button>
      </div>
      <SelectableTable
        head={[
          {
            id: 0,
            value: "제목"
          },
          {
            id: 1,
            value: "생성 시간"
          },
          {
            id: 2,
            value: "상태"
          },
          {
            id: 3,
            value: "빠른 작업"
          }
        ]}
        body={data.map((item) => {
          return {
            id: item.sessionId,
            values: [
              <div key={0}>{item.sessionName}</div>,
              <div key={1}>{formatDate(item.createdAt, "yyyy-MM-dd HH:mm:ss")}</div>,
              <div key={2}>{item.closedAt ? `${item.closedAt}에 종료됨` : "진행 중"}</div>,
              <Button
                key={3}
                className={css({
                  padding: "0.5em 0.8em",
                })}
                onClick={(event) => {
                  event.stopPropagation()
                }}
              >
                세션 참여
              </Button>
            ],
            onClick: () => router.push(`/sessions/detail/${item.sessionId}`)
          };
        })}
        placeholder={
          <div className={css({
            display: "flex",
            padding: "1em",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.5em",
          })}>
            <p>표시할 데이터가 없습니다.</p>
            <p>새로운 {PROJECT_NAME} 세션을 생성해 보세요!</p>
            <LinkButton
              className={css({
                padding: "0.5em 0.8em",
              })}
              href="/sessions/create"
            >
              새로 만들기
            </LinkButton>
          </div>
        }
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
      />
    </div>
  );
}
