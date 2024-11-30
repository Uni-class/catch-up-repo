import { useQuery } from '@tanstack/react-query';
import { File } from '@/schema/backend.schema';
import { apiClient } from '@/utils/axios';
import { FileTable } from '../_components/FileTable';
import { useState } from 'react';
import { AxiosResponse } from 'axios';

export default function FileTableFetcher() {
  const size = 5;

  const [page, setPage] = useState(0);

  const {
    data: response,
    isLoading,
    isError,
  } = useQuery<
    AxiosResponse<{
      page: number;
      totalPages: number;
      files: File[];
    }>
  >({
    queryKey: ['user', 'files', size, page],
    queryFn: async () => {
      return await apiClient.get('/user/files', {
        params: {
          size: size,
          page: page + 1,
        },
      });
    },
  });
  const data = response?.data;
  const status = isLoading
    ? 'loading'
    : isError || !Array.isArray(data)
      ? 'error'
      : null;
  return (
    <FileTable
      data={data ? { ...data, page: data.page - 1 } : undefined}
      pagination={{
        size: size,
        index: page,
        setIndex: setPage,
      }}
      status={status}
    />
  );
}
