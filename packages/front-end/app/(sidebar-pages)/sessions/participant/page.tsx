"use client";

import { ErrorBoundary } from "react-error-boundary";
import SessionHeader from "./_components/SessionHeader";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import SessionTableFetch from "./_components/SessionTable";
import Divider from "@/components/Divider";

export default function Page() {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <>
      <SessionHeader />
      <Divider/>
      <ErrorBoundary fallback={<h1>에러</h1>} onReset={reset}>
        <SessionTableFetch />
      </ErrorBoundary>
    </>
  );
}
