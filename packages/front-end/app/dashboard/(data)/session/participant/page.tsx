"use client";

import { Suspense } from "react";
import SessionTable from "./_components/SessionTable";
import { ErrorBoundary } from "react-error-boundary";
import SessionHeader from "./_components/SessionHeader";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";

export default function Page() {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <>
      <SessionHeader />
      <Suspense fallback={<h1>로딩...</h1>}>
        <ErrorBoundary fallback={<h1>에러</h1>} onReset={reset}>
          <SessionTable />
        </ErrorBoundary>
      </Suspense>
    </>
  );
}
