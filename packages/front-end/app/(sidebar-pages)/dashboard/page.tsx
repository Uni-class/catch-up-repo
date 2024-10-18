"use client";

import { LoginRedirectAtom } from "@/client/LoginRedirectAtom";
import { useRouter } from "@/hook/useRouter";
import { useAtomValue } from "jotai";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  const loginRedirect = useAtomValue(LoginRedirectAtom);
  useEffect(() => {
    console.log({loginRedirect})
    router.push(
      loginRedirect !== null ? loginRedirect : "/sessions/participant"
    );
  }, [loginRedirect, router]);
  return <></>;
}
