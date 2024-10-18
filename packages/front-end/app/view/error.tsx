"use client";

import { useLoginRedirectWithError } from "@/hook/useLoginRedirectWithError";



export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string; status: number };
  reset: () => void;
}) {
  useLoginRedirectWithError(error);
  return <h1>{error.message}</h1>;
}
