"use client";

import { Suspense } from "react";
import FileTable from "./_components/FileTable";
import { ErrorBoundary } from "react-error-boundary";

export default function Page() {
  return (
    <>
      <Suspense fallback={<h1>로딩...</h1>}>
        <ErrorBoundary fallback={<h1>에러</h1>}>
          <FileTable />
        </ErrorBoundary>
      </Suspense>
    </>
  );
}
