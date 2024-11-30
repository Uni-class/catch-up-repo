'use client';

import { useRouter } from '@/hook/useRouter';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string; status: number };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    if (error.status === 401) {
      const prevURL = `${router.pathname}?${router.query.toString()}`;
      const storage = window.sessionStorage;
      storage.setItem('prevURL', prevURL);
      router.push('/login');
    }
  }, [error.status, router]);
  return <h1>{error.message}</h1>;
}
