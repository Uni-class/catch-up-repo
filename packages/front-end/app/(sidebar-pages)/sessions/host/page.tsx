"use client";


import { ErrorBoundary } from "react-error-boundary";
import { Heading } from "@/components/Text";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import HostSessionTableFetcher from "./_fetcher/HostSessionTableFetcher";
import Divider from "@/components/Divider";

export default function Page() {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <>
      <Heading>내가 주최한 세션</Heading>
      <Divider/>
      <ErrorBoundary fallback={<h1>에러</h1>} onReset={reset}>
        <HostSessionTableFetcher />
      </ErrorBoundary>
    </>
  );
}
