"use client";

import FileHeader from "./_components/FileHeader";
import FileTableFetch from "./_components/FileTable";
import { ErrorBoundary } from "react-error-boundary";

export default function Page() {
  return (
    <>
      <FileHeader />
      <ErrorBoundary fallback={<h1>에러</h1>}>
        <FileTableFetch />
      </ErrorBoundary>
    </>
  );
}
