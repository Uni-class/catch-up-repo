"use client";

import FileTableFetch from "./_components/FileTable";
import { ErrorBoundary } from "react-error-boundary";

export default function Page() {
  return (
    <>
      <ErrorBoundary fallback={<h1>에러</h1>}>
        <FileTableFetch />
      </ErrorBoundary>
    </>
  );
}
