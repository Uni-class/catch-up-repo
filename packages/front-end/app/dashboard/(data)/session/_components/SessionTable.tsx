import {
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Td,
  Th,
} from "@/components/Table";
import { CheckType, useCheckBoxes } from "@/hook/useCheckBoxes";
import { useRouter } from "@/hook/useRouter";
import { css } from "@/styled-system/css";
import { apiClient } from "@/util/axios";
import { useSuspenseQuery } from "@tanstack/react-query";
import { formatDate } from "date-fns";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

export default function SessionTable() {
  const { queryObj } = useRouter();
  if (!queryObj["role"]) {
    queryObj["role"] = "participant";
  }
  const { data } = useSuspenseQuery({
    queryKey: ["user", "sessions", queryObj["role"]],
    queryFn: async () => {
      const { data }: { data: any[] } = await apiClient.get("/user/sessions", {
        params: queryObj,
      });

      return data;
    },
  });
  const {
    areChecked,
    setAreChecked,
    isTotalChecked,
    setIsTotalChecked,
    setCheckOne,
  } = useCheckBoxes<any, number>({ data: data, id: "id" });

  return (
    <TableContainer>
      <colgroup>
        <col width="45px" />
        <col />
        <col width="30%" />
      </colgroup>
      <Head
        setIsTotalChecked={setIsTotalChecked}
        isTotalChecked={isTotalChecked}
      />
      <TableBody>
        {data.map((e: any) => (
          <Row
            el={e}
            key={e.id}
            setAreChecked={setAreChecked}
            areChecked={areChecked}
          />
        ))}
      </TableBody>
    </TableContainer>
  );
}

function Head({
  setIsTotalChecked,
  isTotalChecked,
}: {
  setIsTotalChecked: Dispatch<SetStateAction<boolean>>;
  isTotalChecked: boolean;
}) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsTotalChecked(e.target.checked);
  };
  return (
    <TableHead>
      <TableRow>
        <Th>
          <input type="checkbox" onChange={handleChange} checked={isTotalChecked}/>
        </Th>
        <Th>제목</Th>
        <Th>참여 시간</Th>
      </TableRow>
    </TableHead>
  );
}

function Row({
  el,
  setAreChecked,
  areChecked,
}: {
  el: any;
  setAreChecked: Dispatch<SetStateAction<CheckType<number>[]>>;
  areChecked: CheckType<number>[];
}) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAreChecked(
      areChecked.map((x: any) =>
        el.id === x.id ? { id: x.id, checked: e.target.checked } : x
      )
    );
  };
  return (
    <TableRow
      className={css({
        "&:hover": {
          bg: "rose.50",
        },
        cursor: "pointer",
        transition: "background 0.2s",
      })}
    >
      <Td>
        <input
          type="checkbox"
          onChange={handleChange}
          checked={areChecked.find((e) => e.id === el.id)?.checked}
        />
      </Td>
      <Td>{el.displayName}</Td>
      <Td>{formatDate(el.joinedAt, "yyyy-MM-dd")}</Td>
    </TableRow>
  );
}
