"use client";

import { ErrorBoundary } from "react-error-boundary";
import SessionHeader from "./_components/SessionHeader";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import SessionTableFetch from "./_components/SessionTable";

export default function Page() {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <>
      <SessionHeader />
      <ErrorBoundary fallback={<h1>에러</h1>} onReset={reset}>
        <SessionTableFetch />
      </ErrorBoundary>
    </>
  );
}
