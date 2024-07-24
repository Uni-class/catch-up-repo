"use client";

import { Suspense } from "react";
import SessionTable from "./_components/SessionTable";

export default function Page() {
  return (
    <>
      <Suspense fallback={<h1>로딩...</h1>}>
        <SessionTable />
      </Suspense>
    </>
  );
}
