import {
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Td,
  Th,
} from "@/components/Table";
import { apiClient } from "@/util/axios";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { CreateSessionDto, File } from "@/schema/backend.schema";
import Button from "@/components/Button";
import { formatDate } from "date-fns";
import { overlay } from "overlay-kit";
import { useAtom } from "jotai";
import { currentFormDataAtom } from "@/client/FileSelectAtom";
import { MutableRefObject } from "react";

export default function DriveFileUploadFetch() {
  const { data: fileRes, isLoading } = useQuery<AxiosResponse<File[]>>({
    queryKey: ["user", "files"],
    queryFn: async () => await apiClient.get("user/files"),
    throwOnError: true,
  });
  if (isLoading) {
    return <h1>로딩...</h1>;
  }
  const data = fileRes?.data;
  return data !== undefined && <DriveFileUpload data={data} />;
}

export function DriveFileUpload({ data }: { data: File[] }) {
  return (
    <TableContainer>
      <TableHead>
        <TableRow>
          <Th>파일명</Th>
          <Th>업로드 일시</Th>
          <Th align="center">선택</Th>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((e) => (
          <Row file={e} key={e.fileId} />
        ))}
      </TableBody>
    </TableContainer>
  );
}

function Row({ file }: { file: File }) {
  const [currentFormData, setCurrentFormData] =
    useAtom<MutableRefObject<CreateSessionDto>>(currentFormDataAtom);
  const handleRowButtonClick = () => {
    setCurrentFormData({
      ...currentFormData,
      current: {
        ...currentFormData.current,
        sessionFileIds: [String(file.fileId)],
      },
    });
    overlay.close("file upload");
  };
  return (
    <TableRow>
      <Td>{file.name}</Td>
      <Td>{formatDate(file.createdAt, "yyyy-MM-dd")}</Td>
      <Td align="center">
        <Button onClick={handleRowButtonClick}>선택하기</Button>
      </Td>
    </TableRow>
  );
}
