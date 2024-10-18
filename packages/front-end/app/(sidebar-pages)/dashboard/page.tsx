"use client";

import { useRouter } from "@/hook/useRouter";
import { useAtomValue } from "jotai";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  useEffect(() => {
    const storage = window.sessionStorage;
    const prevURL = storage.getItem("prevURL");
    router.push(prevURL !== null ? prevURL : "/sessions/participant");
    storage.removeItem("prevURL");
  }, [router]);
  return <></>;
}
