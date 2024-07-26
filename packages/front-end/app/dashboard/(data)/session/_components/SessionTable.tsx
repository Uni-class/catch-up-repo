import {
  sessionAreCheckedAtom,
  sessionIsTotalCheckedAtom,
} from "@/client/CheckBoxAtom";
import Button from "@/components/Button";
import {
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Td,
  Th,
} from "@/components/Table";
import { useCheckBoxes } from "@/hook/useCheckBoxes";
import { useRouter } from "@/hook/useRouter";
import { Session } from "@/schema/backend.schema";
import { css } from "@/styled-system/css";
import { apiClient } from "@/util/axios";
import { useSuspenseQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { formatDate } from "date-fns";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

export default function SessionTable() {
  const { queryObj } = useRouter();
  if (!queryObj["role"]) {
    queryObj["role"] = "participant";
  }
  const { data: response } = useSuspenseQuery<AxiosResponse<Session[]>>({
    queryKey: ["user", "sessions", queryObj["role"]],
    queryFn: async () => {
      return await apiClient.get("/user/sessions", {
        params: queryObj,
      });
    },
  });

  const data = response.data;
  console.log(data);
  const { isTotalChecked, setIsTotalChecked, setIsCheckedOne, isCheckedOne } =
    useCheckBoxes<Session, number>({
      data: data,
      id: "sessionId",
      isTotalCheckedAtom: sessionIsTotalCheckedAtom,
      areCheckedAtom: sessionAreCheckedAtom,
    });

  return (
    <TableContainer>
      <colgroup>
        <col width="45px" />
        <col />
        <col width="20%" />
        <col width="180px" />
        <col width="180px" />
      </colgroup>
      <Head
        setIsTotalChecked={setIsTotalChecked}
        isTotalChecked={isTotalChecked}
      />
      <TableBody>
        {data.map((e) => (
          <Row
            el={e}
            key={e.sessionId}
            isCheckedOne={isCheckedOne}
            setIsCheckedOne={setIsCheckedOne}
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
          <input
            type="checkbox"
            onChange={handleChange}
            checked={isTotalChecked}
          />
        </Th>
        <Th>제목</Th>
        <Th>참여 시간</Th>
        <Th align="center">세션 상세보기</Th>
        <Th align="center">세션 참여</Th>
      </TableRow>
    </TableHead>
  );
}

function Row({
  el,
  setIsCheckedOne,
  isCheckedOne,
}: {
  el: Session;
  setIsCheckedOne: (id: number, value: boolean) => void;
  isCheckedOne: (id: number) => boolean;
}) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsCheckedOne(el.sessionId, e.target.checked);
  };
  return (
    <TableRow
      className={css({
        transition: "background 0.2s",
      })}
    >
      <Td>
        <input
          type="checkbox"
          onChange={handleChange}
          checked={isCheckedOne(el.sessionId)}
        />
      </Td>
      <Td>{el.sessionName}</Td>
      <Td>{formatDate(el.createdAt, "yyyy-MM-dd-HH")}</Td>
      <Td align="center">
        <Button>상세보기</Button>
      </Td>
      <Td align="center">
        <Button>세션 참여</Button>
      </Td>
    </TableRow>
  );
}
