import {
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Td,
  Th,
} from '@/components/Table';
import { apiClient } from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { File } from '@/schema/backend.schema';
import Button from '@/components/Button/Button';
import { formatDate } from 'date-fns';
import { overlay } from 'overlay-kit';
import { FileFormDataContext } from '.';
import { useContext, useState } from 'react';
import { css } from '@/styled-system/css';

export default function DriveFileUploadFetch() {
  const size = 1000; //need fix

  const [page, setPage] = useState(0);

  const { data: fileRes, isLoading } = useQuery<
    AxiosResponse<{
      page: number;
      totalPages: number;
      files: File[];
    }>
  >({
    queryKey: ['user', 'files', size, page],
    queryFn: async () =>
      await apiClient.get('user/files', {
        params: {
          size: size,
          page: page + 1,
        },
      }),
    throwOnError: true,
  });
  if (isLoading) {
    return <h1>로딩...</h1>;
  }
  const data = fileRes?.data;
  if (!data) return;
  return (
    <div
      className={css({
        height: '100%',
        overflowY: 'auto',
      })}
    >
      <DriveFileUpload
        data={data ? { ...data, page: data.page - 1 } : undefined}
        pagination={{
          size: size,
          index: page,
          setIndex: setPage,
        }}
      />
    </div>
  );
}

export function DriveFileUpload({
  data = {
    page: 0,
    totalPages: 0,
    files: [],
  },
  pagination,
}: {
  data?: {
    page: number;
    totalPages: number;
    files: File[];
  };
  pagination: {
    size: number;
    index: number;
    setIndex: (index: number) => void;
  };
}) {
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
        {data.files.map((e) => (
          <Row file={e} key={e.fileId} />
        ))}
      </TableBody>
    </TableContainer>
  );
}

function Row({ file }: { file: File }) {
  const { setControlledData, idRef } = useContext(FileFormDataContext);
  const handleRowButtonClick = () => {
    setControlledData({ sessionFiles: [file] });
    overlay.unmount(`File-Select`);
  };
  return (
    <TableRow>
      <Td>{file.name}</Td>
      <Td>{formatDate(file.createdAt, 'yyyy-MM-dd')}</Td>
      <Td align="center">
        <Button onClick={handleRowButtonClick}>선택하기</Button>
      </Td>
    </TableRow>
  );
}
