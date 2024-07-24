"use client";

import { Suspense } from "react";
import SessionTable from "./_components/SessionTable";
import { ErrorBoundary } from "react-error-boundary";

export default function Page() {
  return (
    <>
      <Suspense fallback={<h1>로딩...</h1>}>
        <ErrorBoundary fallback={<h1>에러</h1>}>
          <SessionTable />
        </ErrorBoundary>
      </Suspense>
    </>
  );
}
