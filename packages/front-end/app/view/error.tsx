"use client";

import { useRouter } from "@/hook/useRouter";
import { useCallback, useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string; status: number };
  reset: () => void;
}) {
  const router = useRouter();
  const getLoginURL = useCallback(() => {
    return `/login?url=${encodeURIComponent(`${router.pathname}?${router.query.toString()}`)}`; //need fix
  }, [router]);
  const goToLogin = useCallback(() => {
    router.push(getLoginURL());
  }, [router, getLoginURL]);
  useEffect(()=>{
    if (error.status === 401) {
      goToLogin();
    }
  
  },[error.status, goToLogin])
  return <h1>{error.message}</h1>;
}
