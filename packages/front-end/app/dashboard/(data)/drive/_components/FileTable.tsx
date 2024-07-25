import {
  fileAreCheckedAtom,
  fileIsTotalCheckedAtom,
} from "@/client/CheckBoxAtom";
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
import { css } from "@/styled-system/css";
import { apiClient } from "@/util/axios";
import { useSuspenseQuery } from "@tanstack/react-query";
import { formatDate } from "date-fns";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

export default function FileTable() {
  const { queryObj } = useRouter();
  if (!queryObj["role"]) {
    queryObj["role"] = "participant";
  }
  const { data } = useSuspenseQuery({
    queryKey: ["user", "sessions", queryObj["role"]],
    queryFn: async () => {
      const { data } = await apiClient.get<any[]>("/user/files", {
        params: queryObj,
      });
      return data;
    },
  });
  const { isTotalChecked, setIsTotalChecked, setIsCheckedOne, isCheckedOne } =
    useCheckBoxes<any, number>({
      data: data,
      id: "id",
      areCheckedAtom: fileAreCheckedAtom,
      isTotalCheckedAtom: fileIsTotalCheckedAtom,
    });

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
      <TableBody>{/* add row component */}</TableBody>
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
      </TableRow>
    </TableHead>
  );
}

function Row({
  el,
  setIsCheckedOne,
  isCheckedOne,
}: {
  el: any;
  setIsCheckedOne: (id: number, value: boolean) => void;
  isCheckedOne: (id: number) => boolean;
}) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsCheckedOne(el.fileId, e.target.checked);
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
          checked={isCheckedOne(el.sessionId)}
        />
      </Td>
      <Td>{el.fileName}</Td>
      <Td>{formatDate(el.createdAt, "yyyy-MM-dd")}</Td>
    </TableRow>
  );
}
