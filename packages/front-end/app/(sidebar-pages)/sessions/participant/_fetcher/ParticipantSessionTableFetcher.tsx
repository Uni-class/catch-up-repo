import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { Session } from '@/schema/backend.schema';
import { apiClient } from '@/utils/axios';
import { ParticipantSessionTable } from '../_components/ParticipantSessionTable';
import { useState } from 'react';

export default function ParticipantSessionTableFetcher() {
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
      sessions: Session[];
    }>
  >({
    queryKey: ['user', 'sessions', 'participant', size, page],
    queryFn: async () => {
      return await apiClient.get('/user/sessions', {
        params: {
          role: 'participant',
          size: size,
          page: page + 1,
        },
      });
    },
  });
  const data = response?.data;
  const status = isLoading
    ? 'loading'
    : isError || !Array.isArray(data?.sessions)
      ? 'error'
      : null;
  return (
    <ParticipantSessionTable
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
