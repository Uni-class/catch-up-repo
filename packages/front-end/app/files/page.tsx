"use client";

import { Suspense } from "react";
import FileTable from "./_components/FileTable";
import { ErrorBoundary } from "react-error-boundary";
import {Heading} from "@/components/Text";
import Divider from "@/components/Divider";

export default function Page() {
  return (
    <div>
      <Heading>드라이브</Heading>
      <Divider/>
      <Suspense fallback={<h1>불러오는 중... [임시 컴포넌트]</h1>}>
        <ErrorBoundary fallback={<h1>예기치 못한 오류가 발생하였습니다. [임시 컴포넌트]</h1>}>
          <FileTable />
        </ErrorBoundary>
      </Suspense>
    </div>
  );
}
