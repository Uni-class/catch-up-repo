'use client';

import '@/utils/pdfWorkerPolyfill';
import { User, SessionResponseDto } from '@/schema/backend.schema';
import HostViewer from './_components/Host/HostViewer';
import { useQueries } from '@tanstack/react-query';
import { apiClient, refreshClient } from '@/utils/axios';
import ParticipantViewer from './_components/Participant/ParticipantViewer';
import { useAtom } from 'jotai';
import { socketAtom } from '@/client/socketAtom';
import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useRouter } from '@/hook/useRouter';
import Placeholder from '@/components/Placeholder/Placeholder';
import PlaceholderLayout from '@/components/Placeholder/PlaceholderLayout';
import { css } from '@/styled-system/css';
import { Header } from '@/app/view/_components/Common/Header';

/**
 * This is internal interface from `@socket.io/component-emitter` used in `socket.io-client`.
 * `socket.io-client` doesn't export this interface, so we have to define it here.
 */
interface DefaultEventsMap {
  [event: string]: (...args: any[]) => void;
}

const getAPIQueryParam = (obj: {
  id?: number;
  code?: string;
}): { id: number } | { code: string } => {
  if (obj.id !== undefined) {
    return { id: obj.id };
  }
  if (obj.code !== undefined) {
    return { code: obj.code };
  }
  throw new Error('You must specify id or code.');
};
export default function Page() {
  const router = useRouter();
  const queryObj = router.queryObj as unknown as { id?: number; code?: string };
  const apiQueryParam = getAPIQueryParam(queryObj);
  const isSessionInvalid = useRef(false);

  useEffect(() => {
    const exitingFunction = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };

    window.addEventListener('beforeunload', exitingFunction);

    return () => {
      window.removeEventListener('beforeunload', exitingFunction);
    };
  }, []);

  const [userQuery, sessionQuery] = useQueries({
    queries: [
      {
        queryKey: ['user', 'profile'],
        queryFn: async () => await apiClient.get<User>('/user/profile'),
        throwOnError: false,
      },
      {
        queryKey: ['session', apiQueryParam],
        queryFn: async () =>
          await apiClient.get<SessionResponseDto>(`/session`, {
            params: apiQueryParam,
          }),
        throwOnError: false,
      },
    ],
  });
  const [, setSocket] = useAtom(socketAtom);
  useEffect(() => {
    let newSocket: null | Socket<DefaultEventsMap, DefaultEventsMap> = null;
    const disConnectHandler = async (_reason: Socket.DisconnectReason) => {
      await refreshClient.get('/auth/token-refresh');
    };
    const init = async () => {
      await refreshClient.get('/auth/token-refresh');
      newSocket = io(process.env.NEXT_PUBLIC_SOCKET_SERVER as string, {
        withCredentials: true,
        transports: ['websocket'],
      });
      setSocket(newSocket);
      newSocket.on('disconnect', disConnectHandler);
    };
    init();
    return () => {
      if (newSocket !== null) {
        newSocket.off('disconnect', disConnectHandler);
        newSocket.disconnect();
      }
    };
  }, [setSocket]);

  if (userQuery.isLoading || sessionQuery.isLoading) {
    return (
      <div
        className={css({
          display: 'flex',
          width: '100%',
          height: '100%',
        })}
      >
        <PlaceholderLayout type={'vertical'} gap={'1em'} alignItems={'center'}>
          <Header />
          <PlaceholderLayout
            type={'horizontal'}
            gap={'1em'}
            alignItems={'flex-start'}
          >
            <PlaceholderLayout
              padding={'0 0.8em'}
              width={200}
              type={'vertical'}
              gap={'1em'}
              alignItems={'center'}
              justifyContent={'flex-start'}
            >
              <Placeholder width={160} height={90} type={'box'} />
              <Placeholder width={160} height={90} type={'box'} />
              <Placeholder width={160} height={90} type={'box'} />
              <Placeholder width={160} height={90} type={'box'} />
              <Placeholder width={160} height={90} type={'box'} />
            </PlaceholderLayout>
            <PlaceholderLayout
              type={'vertical'}
              gap={'0.5em'}
              alignItems={'center'}
            >
              <Placeholder width={'100%'} height={'100%'} />
              <Placeholder width={'100%'} height={'4.2rem'} />
            </PlaceholderLayout>
          </PlaceholderLayout>
        </PlaceholderLayout>
      </div>
    );
  }

  if (userQuery.data === undefined || sessionQuery.data === undefined) {
    if (!isSessionInvalid.current) {
      isSessionInvalid.current = true;
      alert('유효하지 않은 세션입니다.');
      router.push('/sessions/join');
    }
    return null;
  }
  const userData = userQuery.data.data;
  const sessionData = sessionQuery.data.data;
  const userId = userData.userId;
  const isHost = userData.userId === sessionData.hostId;
  return isHost ? (
    <HostViewer {...{ ...sessionData, userId: userId }} />
  ) : (
    <ParticipantViewer {...{ ...sessionData, userId: userId }} />
  );
}
