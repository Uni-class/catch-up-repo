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
import { File } from "@/schema/backend.schema";
import { css } from "@/styled-system/css";
import { apiClient } from "@/util/axios";
import { useQuery } from "@tanstack/react-query";
import { formatDate } from "date-fns";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

export default function FileTableFetch() {
  const { data: fileRes, isLoading } = useQuery({
    queryKey: ["user", "files"],
    queryFn: async () => {
      return await apiClient.get<File[]>("/user/files");
    },
    throwOnError: true,
  });
  if (isLoading) {
    return <h1>로딩중...</h1>;
  }
  const data = fileRes?.data;
  return <>{data && <FileTable data={data} />}</>;
}

export function FileTable({ data }: { data: File[] }) {
  const { isTotalChecked, setIsTotalChecked, setIsCheckedOne, isCheckedOne } =
    useCheckBoxes<File, number>({
      data: data,
      id: "fileId",
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
      <TableBody>
        {data.map((e) => (
          <Row
          key={e.fileId}
            el={e}
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
      </TableRow>
    </TableHead>
  );
}

function Row({
  el,
  setIsCheckedOne,
  isCheckedOne,
}: {
  el: File;
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
          checked={isCheckedOne(el.fileId)}
        />
      </Td>
      <Td>{el.name}</Td>
      <Td>{formatDate(el.createdAt, "yyyy-MM-dd")}</Td>
    </TableRow>
  );
}
