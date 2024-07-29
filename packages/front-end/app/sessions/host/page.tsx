"use client";

import { ErrorBoundary } from "react-error-boundary";
import SessionHeader from "./_components/SessionHeader";
import SessionTableFetch from "./_components/SessionTable";

export default function Page() {
  return (
    <>
      <SessionHeader />
      <ErrorBoundary fallback={<h1>에러</h1>}>
        <SessionTableFetch />
      </ErrorBoundary>
    </>
  );
}
