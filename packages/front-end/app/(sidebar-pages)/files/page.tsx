"use client";

import FileHeader from "./_components/FileHeader";
import FileTableFetch from "./_components/FileTable";
import { ErrorBoundary } from "react-error-boundary";
import {Heading} from "@/components/Text";
import Divider from "@/components/Divider";

export default function Page() {
  return (
    <div>
      <Heading>드라이브</Heading>
      <Divider/>
      <FileHeader />
      <ErrorBoundary fallback={<h1>에러</h1>}>
        <FileTableFetch />
      </ErrorBoundary>
    </div>
  );
}
