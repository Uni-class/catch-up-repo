import { css } from '@/styled-system/css';
import UsersIcon from '@/public/icons/users.svg';
import { apiClient } from '@/utils/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from '@/hook/useRouter';

const getUUID = () => {
  const existUUID = localStorage.getItem('catchup-guest-id');
  if (existUUID) {
    return existUUID;
  }
  const newUUID = crypto.randomUUID();
  localStorage.setItem('catchup-guest-id', newUUID);
  return newUUID;
};

export const GuestLoginButton = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const profileMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiClient.post(
        '/auth/guest',
        { id: id },
        {
          validateStatus: (status) => {
            return status === 302;
          },
        }
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user', 'profile'],
      });
      router.push('/dashboard');
    },
    onError: (error: AxiosError<any>) => {
      alert('게스트 로그인중 오류가 발생했어요.');
    },
  });
  return (
    <button
      className={css({
        cursor: 'pointer',
        backgroundColor: 'grey.300',
        color: 'black',
        display: 'flex',
        padding: '1.5rem 1rem',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        fontSize: '1.2em',
        fontWeight: 'bold',
        borderRadius: '6px',
        boxSizing: 'border-box',
        _hover: {
          backgroundColor: 'gray.400',
        },
      })}
      onClick={async () => {
        const guestID = getUUID();
        profileMutation.mutate(guestID);
      }}
    >
      <UsersIcon width={'30px'} height={'30px'} />
      게스트 로그인
    </button>
  );
};
